#!/usr/bin/env node
/**
 * Validates the Home Assistant blueprints in static/assets/blueprints and the
 * import badges in the documentation that reference them.
 *
 * Checks for every blueprint:
 * - The YAML parses (including the Home Assistant `!input` tag).
 * - Required metadata is present: name, description, author, domain and a
 *   `source_url` that matches the file's location in this repository.
 * - A minimum Home Assistant version is set.
 * - The standard inputs (trigger, condition and one or more mobile_app
 *   devices) are present, and every input has a name and a selector.
 * - Every `!input` reference points to a declared input, and every declared
 *   input is referenced.
 * - Select selectors have at least one option.
 * - Every notify call sends a `message`, and only sends the keys the notify
 *   action supports (command parameters belong under `data`).
 *
 * Checks for the documentation:
 * - Every import badge (`blueprint_url=`) points to a blueprint file that
 *   exists in this repository.
 * - Every blueprint file is referenced by at least one import badge.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const repoRoot = path.resolve(__dirname, '..');
const blueprintsDir = path.join(repoRoot, 'static', 'assets', 'blueprints');
const docsDir = path.join(repoRoot, 'docs');
const githubBase = 'https://github.com/home-assistant/companion.home-assistant/blob/master/';

const inputTag = yaml.defineScalarTag('!input', {
  resolve: (source) => ({ __input: source }),
  identify: () => false,
});
const schema = new yaml.Schema([...yaml.CORE_SCHEMA.tags, inputTag]);

function walk(dir, extensions) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(entryPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      result.push(entryPath);
    }
  }
  return result;
}

function findInputReferences(node, result = []) {
  if (node && typeof node === 'object') {
    if (typeof node.__input === 'string') {
      result.push(node.__input);
    }
    for (const value of Object.values(node)) {
      findInputReferences(value, result);
    }
  }
  return result;
}

function findNotifyCalls(node, result = []) {
  if (Array.isArray(node)) {
    for (const item of node) {
      findNotifyCalls(item, result);
    }
  } else if (node && typeof node === 'object') {
    if (node.domain === 'mobile_app' && node.type === 'notify') {
      // Device action.
      result.push({ message: node.message });
    } else if (typeof node.action === 'string' && node.action.startsWith('notify.mobile_app')) {
      // Notify service call.
      result.push({ message: node.data?.message, payload: node.data });
    }
    for (const value of Object.values(node)) {
      findNotifyCalls(value, result);
    }
  }
  return result;
}

function validateInput(name, definition, problems) {
  if (!definition || typeof definition !== 'object') {
    problems.push(`input "${name}" has no definition`);
    return;
  }
  if (!definition.name) {
    problems.push(`input "${name}" has no name`);
  }
  if (!definition.selector || typeof definition.selector !== 'object') {
    problems.push(`input "${name}" has no selector`);
    return;
  }
  const select = definition.selector.select;
  if (select !== undefined && !(Array.isArray(select?.options) && select.options.length > 0)) {
    problems.push(`input "${name}" has a select selector without options`);
  }
}

function validateBlueprint(filePath) {
  const relativePath = path.relative(repoRoot, filePath).split(path.sep).join('/');
  const problems = [];

  let doc;
  try {
    doc = yaml.load(fs.readFileSync(filePath, 'utf8'), { schema });
  } catch (error) {
    problems.push(`does not parse: ${error.message.split('\n')[0]}`);
    return problems;
  }

  const blueprint = doc?.blueprint;
  if (!blueprint || typeof blueprint !== 'object') {
    problems.push('missing "blueprint" key');
    return problems;
  }

  for (const key of ['name', 'description', 'author']) {
    if (!blueprint[key]) {
      problems.push(`missing blueprint ${key}`);
    }
  }
  if (blueprint.domain !== 'automation') {
    problems.push(`blueprint domain is "${blueprint.domain}", expected "automation"`);
    return problems;
  }
  if (blueprint.source_url !== githubBase + relativePath) {
    problems.push(`source_url does not match the file location: ${blueprint.source_url}`);
  }
  if (!/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(String(blueprint.homeassistant?.min_version))) {
    problems.push(`missing or invalid min_version: ${blueprint.homeassistant?.min_version}`);
  }

  const inputs = blueprint.input ?? {};
  const declared = new Map(Object.entries(inputs));
  for (const [name, definition] of Object.entries(inputs)) {
    if (definition && typeof definition === 'object' && definition.input) {
      // An input section: validate and register its nested inputs.
      declared.delete(name);
      for (const [nestedName, nestedDefinition] of Object.entries(definition.input)) {
        declared.set(nestedName, nestedDefinition);
      }
    }
  }
  for (const [name, definition] of declared) {
    validateInput(name, definition, problems);
  }
  for (const name of ['trigger', 'condition']) {
    if (!declared.has(name)) {
      problems.push(`missing standard input "${name}"`);
    }
  }
  const hasDeviceInput = [...declared.values()].some(
    (definition) => definition?.selector?.device?.filter?.integration === 'mobile_app',
  );
  if (!hasDeviceInput) {
    problems.push('missing an input with a mobile_app device selector');
  }

  if (!doc.mode) {
    problems.push('missing mode');
  }
  const body = { triggers: doc.triggers, conditions: doc.conditions, actions: doc.actions };
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined) {
      problems.push(`missing "${key}"`);
    }
  }

  const referenced = new Set(findInputReferences(body));
  for (const name of referenced) {
    if (!declared.has(name)) {
      problems.push(`"!input ${name}" is not a declared input`);
    }
  }
  for (const name of declared.keys()) {
    if (!referenced.has(name)) {
      problems.push(`input "${name}" is declared but never used`);
    }
  }

  // Validate the notify calls.
  const notifyCalls = findNotifyCalls(body);
  if (notifyCalls.length === 0) {
    problems.push('no notify action found');
  }
  for (const call of notifyCalls) {
    if (call.payload) {
      for (const key of Object.keys(call.payload)) {
        if (!['message', 'title', 'data'].includes(key)) {
          problems.push(
            `notify call sends unexpected top-level key "${key}" (command parameters belong under "data")`,
          );
        }
      }
    }
    const message = call.message;
    if (typeof message !== 'string' && typeof message?.__input !== 'string') {
      problems.push('notify call does not send a message');
    }
  }

  return problems;
}

function main() {
  let failed = false;
  const report = (relativePath, problems) => {
    if (problems.length > 0) {
      failed = true;
      console.error(`✖ ${relativePath}`);
      for (const problem of problems) {
        console.error(`    ${problem}`);
      }
    } else {
      console.log(`✔ ${relativePath}`);
    }
  };

  const blueprintFiles = walk(blueprintsDir, ['.yaml', '.yml']).sort();
  if (blueprintFiles.length === 0) {
    console.error(`No blueprints found in ${blueprintsDir}`);
    process.exit(1);
  }
  for (const filePath of blueprintFiles) {
    const relativePath = path.relative(repoRoot, filePath).split(path.sep).join('/');
    report(relativePath, validateBlueprint(filePath));
  }

  // Cross-check the import badges in the documentation.
  const referencedPaths = new Set();
  for (const docPath of walk(docsDir, ['.md', '.mdx']).sort()) {
    const relativeDocPath = path.relative(repoRoot, docPath).split(path.sep).join('/');
    const content = fs.readFileSync(docPath, 'utf8');
    for (const match of content.matchAll(/blueprint_url=([^)\s"'&]+)/g)) {
      const url = decodeURIComponent(match[1]);
      if (!url.startsWith(githubBase)) {
        failed = true;
        console.error(`✖ ${relativeDocPath}: badge does not point to this repository: ${url}`);
        continue;
      }
      const relativePath = url.slice(githubBase.length);
      if (fs.existsSync(path.join(repoRoot, relativePath))) {
        referencedPaths.add(relativePath);
      } else {
        failed = true;
        console.error(`✖ ${relativeDocPath}: badge points to a blueprint that does not exist: ${relativePath}`);
      }
    }
  }
  for (const filePath of blueprintFiles) {
    const relativePath = path.relative(repoRoot, filePath).split(path.sep).join('/');
    if (!referencedPaths.has(relativePath)) {
      failed = true;
      console.error(`✖ ${relativePath}: no import badge in the documentation references this blueprint`);
    }
  }

  if (failed) {
    process.exit(1);
  }
  console.log(`\n${blueprintFiles.length} blueprints and ${referencedPaths.size} badge references validated.`);
}

main();
