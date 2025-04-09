# GitHub Copilot instructions

This repository holds the documentation for our Home Assistant companion applications. The documentation is written in markdown and use Docusaurus as engine to generate the final website.

When writing in this repository you need to follow the defined guidelines.

## General guidelines

You should follow the general guidelines about writing a documentation from Microsoft and their Microsoft Style Guide.

1. **Be clear and concise**:
   - Use simple, straightforward language.
   - Avoid unnecessary jargon or overly complex sentences.

2. **Use active voice**:
   - Write in the active voice whenever possible. For example, "Click the button" instead of "The button should be clicked."

3. **Follow Home Assistant standards**:
   - Ensure all documentation is consistent.
   - Use the correct formatting for code blocks, links, and headings.

4. **Adopt inclusive language**:
   - Avoid terms that may exclude or offend. For example, use "allowlist" instead of "whitelist."
   - Be objective and not gender favoring, polarizing, race related or religion inconsiderate

5. **Be consistent**:
   - Use consistent terminology, formatting, and structure throughout the documentation.
   - Follow the capitalization and punctuation rules outlined in the Microsoft Style Guide.

## Formatting guidelines

1. **Headings**:
   - Use sentence case capitalization, also in headings (e.g., "How to configure a device").
   - Organize content with appropriate heading levels (`#`, `##`, `###`).

2. **Lists**:
   - Use numbered lists for sequential steps and bulleted lists for unordered items.
   - Keep list items parallel in structure.

3. **Code blocks**:
   - Use fenced code blocks (```` ``` ````) with the appropriate language identifier (e.g., `yaml`, `python`).
   - Provide context or explanations for code snippets.

4. **Links**:
   - Use descriptive link text instead of raw URLs. For example, `[Home Assistant Standards](https://developers.home-assistant.io/docs/documenting/standards)`.

5. **Misc**
   - Don't put two spaces after a period.
   - There is no limit for the line length. You are allowed to write in a flowing text style.
   - Do not use ALL CAPITALS for emphasis - use _italics_ instead.
   - Use **bold** to markup UI strings, for example:
     - Under **Settings**, select the three dots menu. Then, select **Restart Home Assistant** > **Quick reload**.

## Writing style

1. **Audience awareness**:
   - Write for a global audience with varying levels of technical expertise.
   - Avoid idioms, cultural references, or region-specific terms.

2. **Second person**:
   - Address the reader directly using "you" to make the documentation more engaging.

3. **Avoid redundancy**:
   - Eliminate repetitive information unless it adds clarity.

4. **Use proper grammar and spelling**:
   - Proofread content for grammatical errors and typos.
   - Use American English spelling (e.g., "color" instead of "colour").
   - The case of brand names, services, protocols, integrations and platforms must match its respective counterpart. For example, "Z-Wave" _not_ "Zwave", "Z-wave", "Z Wave" or "ZWave". Also, "Input Select" _not_ "input select" or "Input select".

5. **Tables**
   - Be succinct. Minimize the number of columns and keep the amount of text as short as possible:
   - When limiting the amount of text is not possible, consider using other data structures for representing the information. For example, lists or `{% configuration_basic %}` can be used.

6. **Misc**
   - Use a serial comma (also known as the Oxford comma) before the conjunction in a list of three or more items. For example, "Through the use of additional adapters, Home Assistant allows the use of Zigbee, Z-Wave, and other protocols".
   - Don't use "e.g.". Instead, use _for example_, _such as_, or _like_.
   - All examples containing Jinja2 templates should be wrapped _outside_ of the code markdown with the `{% raw %}` tag.
