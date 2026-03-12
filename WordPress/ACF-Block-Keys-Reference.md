# ACF Block Keys Reference for PHP Registration

Complete reference for block keys available when registering a `wp/acf` block via PHP.

This guide covers both approaches:

- `acf_register_block_type()` (ACF PHP API)
- `register_block_type()` with ACF-specific settings

## Table of Contents

- [ACF PHP Registration Keys](#acf-php-registration-keys)
- [ACF Supports Keys](#acf-supports-keys)
- [ACF Metadata Keys](#acf-metadata-keys)
- [Core Block Supports Keys](#core-block-supports-keys)
- [Core Block Type Keys (PHP)](#core-block-type-keys-php)
- [Asset and Render Keys (Core)](#asset-and-render-keys-core)
- [Complete PHP Example](#complete-php-example)

---

## ACF PHP Registration Keys

Keys used with `acf_register_block_type()`:

| Key                 | Type         | Required | Description                                                                               |
| ------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------- |
| `name`              | string       | Yes      | Block slug without prefix. ACF registers it as `acf/{name}`.                              |
| `title`             | string       | Yes      | Block title shown in inserter.                                                            |
| `description`       | string       | No       | Inserter/help description.                                                                |
| `category`          | string       | No       | Inserter category (for example `formatting`, `widgets`, `layout`).                        |
| `icon`              | string/array | No       | Dashicon slug, SVG, or icon config array.                                                 |
| `keywords`          | array        | No       | Search keywords in inserter.                                                              |
| `post_types`        | array        | No       | Restrict block to specific post types.                                                    |
| `mode`              | string       | No       | Default display mode: `preview`, `edit`, or `auto`.                                       |
| `align`             | string       | No       | Default alignment: `left`, `center`, `right`, `wide`, `full`.                             |
| `align_text`        | string       | No       | Default text alignment: `left`, `center`, or `right`.                                     |
| `align_content`     | string       | No       | Default content alignment: `top`, `center`, `bottom`, or matrix positions when supported. |
| `supports`          | array        | No       | Supports map for block features (see sections below).                                     |
| `render_template`   | string       | No       | PHP template path used to render block output.                                            |
| `render_callback`   | callable     | No       | Callback to render block output.                                                          |
| `enqueue_style`     | string       | No       | Style URL enqueued when block appears.                                                    |
| `enqueue_script`    | string       | No       | Script URL enqueued when block appears.                                                   |
| `enqueue_assets`    | callable     | No       | Callback to enqueue scripts/styles for the block.                                         |
| `example`           | array        | No       | Inserter preview/example configuration.                                                   |
| `acf_block_version` | int          | No       | ACF block engine version. Common values are `2` or `3`.                                   |

### Notes

- Provide either `render_template` or `render_callback` (or both if your callback routes logic to templates).
- `name` should be lowercase and slug-safe.
- ACF recommends block metadata (`block.json`) for new projects, but PHP registration is still common.

---

## ACF Supports Keys

These are commonly used ACF-specific keys inside `supports`:

| Key             | Type              | Default | Description                                                     |
| --------------- | ----------------- | ------- | --------------------------------------------------------------- |
| `jsx`           | bool              | `false` | Enables JSX-powered live preview behavior for ACF blocks.       |
| `mode`          | bool              | `true`  | Allows toggling between edit and preview modes.                 |
| `multiple`      | bool              | `true`  | Allows multiple instances of the block in content.              |
| `anchor`        | bool              | `false` | Enables HTML anchor input in block settings.                    |
| `align`         | bool/array        | `true`  | Enable alignments globally or limit to allowed values.          |
| `align_text`    | bool              | `false` | Adds text alignment controls for supported blocks.              |
| `align_content` | bool/string/array | `false` | Adds content alignment controls (varies by UI support/version). |
| `full_height`   | bool              | `false` | Adds full-height toggle support.                                |

---

## ACF Metadata Keys

When using ACF Blocks v3 (`block.json`) with PHP registration/loading, ACF-specific keys live under the `acf` object.

| Key                   | Type                      | Description                                                                            |
| --------------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `mode`                | string                    | Default mode: `preview`, `edit`, or `auto`.                                            |
| `renderTemplate`      | string                    | Template path for server rendering.                                                    |
| `renderCallback`      | string/callable reference | Callback used for server rendering.                                                    |
| `postTypes`           | array                     | Allowed post types for this block.                                                     |
| `blockVersion`        | int                       | ACF block schema version (commonly `3`).                                               |
| `validate`            | bool                      | Enables/disables ACF field validation for the block.                                   |
| `usePostMeta`         | bool                      | Stores block field values in post meta instead of block comment JSON (when supported). |
| `hideFieldsInSidebar` | bool                      | Hides ACF fields from the editor sidebar for supported v3 block UIs.                   |
| `autoInlineEditing`   | bool                      | Enables automatic inline editing for supported field output in v3 blocks.              |

---

## Core Block Supports Keys

Core `supports` keys are passed under `supports` and handled by WordPress block editor.

| Key                    | Type       | Description                                                                        |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------- |
| `allowedBlocks`        | bool       | Adds UI for choosing allowed child blocks for container blocks.                    |
| `align`                | bool/array | Alignment toolbar support.                                                         |
| `alignWide`            | bool       | Enables or disables wide alignment support for the block.                          |
| `anchor`               | bool       | HTML anchor field.                                                                 |
| `ariaLabel`            | bool       | Accessible label UI support.                                                       |
| `autoRegister`         | bool       | Auto-registers a PHP-only block in the editor when using server-side registration. |
| `background`           | bool/array | Background image and sizing controls.                                              |
| `className`            | bool       | Enables the default generated block class name.                                    |
| `color`                | bool/array | Text/background/link color controls and related options.                           |
| `contentRole`          | bool       | Marks the block as content for content-only editing modes.                         |
| `customClassName`      | bool       | Enables the custom class name field.                                               |
| `dimensions`           | bool/array | Dimension controls such as min-height/aspect ratio.                                |
| `filter`               | bool/array | Visual filter support where available.                                             |
| `html`                 | bool       | Allow editing as raw HTML.                                                         |
| `inserter`             | bool       | Show/hide in inserter.                                                             |
| `interactivity`        | bool/array | Interactivity API support.                                                         |
| `layout`               | bool/array | Layout settings for container-style blocks.                                        |
| `listView`             | bool       | Adds a block-specific List View panel for inner blocks.                            |
| `lock`                 | bool/array | Block locking capabilities.                                                        |
| `multiple`             | bool       | Limits whether the block can be inserted more than once.                           |
| `position`             | bool/array | Position controls where supported.                                                 |
| `renaming`             | bool       | Allow block rename in list view.                                                   |
| `reusable`             | bool       | Reusable/synced pattern support.                                                   |
| `shadow`               | bool/array | Shadow controls.                                                                   |
| `spacing`              | bool/array | Margin/padding/blockGap controls.                                                  |
| `splitting`            | bool       | Enter-to-split behavior for text blocks.                                           |
| `typography`           | bool/array | Font size/line height/letter spacing/etc.                                          |
| `visibility`           | bool       | Controls whether the block can be hidden in the editor UI.                         |
| `__experimentalBorder` | bool/array | Border controls (older/experimental naming in some versions).                      |
| `border`               | bool/array | Border controls (stable naming in newer WP versions).                              |

### Important

- Available supports and exact subkeys vary by WordPress version.
- If a support key is unknown in your target WP version, it is ignored.

---

## Core Block Type Keys (PHP)

If you register blocks with `register_block_type()`, these are the main structural keys used in PHP args or metadata mapping:

| Key                | Type         | Description                                          |
| ------------------ | ------------ | ---------------------------------------------------- |
| `api_version`      | int          | Block API version.                                   |
| `name`             | string       | Fully-qualified block name (for example `acf/hero`). |
| `title`            | string       | Block title.                                         |
| `category`         | string       | Inserter category.                                   |
| `parent`           | array        | Allowed direct parent blocks.                        |
| `ancestor`         | array        | Allowed ancestor blocks.                             |
| `allowed_blocks`   | array        | Allowed child blocks for container blocks.           |
| `icon`             | string/array | Block icon config.                                   |
| `description`      | string       | Block description.                                   |
| `keywords`         | array        | Inserter search keywords.                            |
| `textdomain`       | string       | Translation domain.                                  |
| `attributes`       | array        | Block attribute schema.                              |
| `provides_context` | array        | Context provided to descendants.                     |
| `uses_context`     | array        | Context consumed from ancestors.                     |
| `selectors`        | array        | CSS selectors map used by style engine features.     |
| `supports`         | array        | Feature support map.                                 |
| `styles`           | array        | Block style variations.                              |
| `variations`       | array        | Block variations list.                               |
| `example`          | array        | Inserter preview/example data.                       |
| `block_hooks`      | array        | Automatic block placement hooks.                     |

---

## Asset and Render Keys (Core)

Core registration also supports asset and render keys:

| Key                        | Type     | Description                             |
| -------------------------- | -------- | --------------------------------------- |
| `render_callback`          | callable | Server-side render callback.            |
| `editor_script_handles`    | array    | Script handles for editor only.         |
| `script_handles`           | array    | Script handles for editor and frontend. |
| `view_script_handles`      | array    | Script handles for frontend only.       |
| `editor_style_handles`     | array    | Style handles for editor only.          |
| `style_handles`            | array    | Style handles for editor and frontend.  |
| `view_style_handles`       | array    | Style handles for frontend only.        |
| `editor_script_module_ids` | array    | ES module IDs for editor scripts.       |
| `view_script_module_ids`   | array    | ES module IDs for frontend scripts.     |

For ACF blocks, you typically still render via `render_template` or `render_callback`, while assets can be handled by ACF enqueue keys or standard WordPress handles.

---

## Complete PHP Example

```php
add_action('acf/init', function () {
    if (!function_exists('acf_register_block_type')) {
        return;
    }

    acf_register_block_type([
        'name'            => 'hero',
        'title'           => 'Hero',
        'description'     => 'Homepage hero section.',
        'category'        => 'layout',
        'icon'            => 'cover-image',
        'keywords'        => ['hero', 'banner', 'header'],
        'post_types'      => ['page'],
        'mode'            => 'preview',
        'align'           => 'wide',
        'render_template' => get_theme_file_path('template-parts/blocks/hero.php'),
        'enqueue_style'   => get_theme_file_uri('assets/css/blocks/hero.css'),
        'supports'        => [
            'jsx'          => true,
            'align'        => ['wide', 'full'],
            'anchor'       => true,
            'mode'         => true,
            'multiple'     => true,
            'spacing'      => [
                'margin'   => true,
                'padding'  => true,
            ],
            'typography'   => [
                'fontSize' => true,
            ],
        ],
        'example'         => [
            'attributes' => [
                'mode' => 'preview',
                'data' => [
                    'headline' => 'Example Hero Headline',
                ],
            ],
        ],
    ]);
});
```

---

## Reference Sources

- [ACF Blocks Configuration via block.json](https://www.advancedcustomfields.com/resources/acf-block-configuration-via-block-json/)
- [acf_register_block_type() Function](https://www.advancedcustomfields.com/resources/acf_register_block_type/)
- [WordPress Block Supports API](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)
- [WordPress Block Registration](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/)

---

**Generated on:** March 12, 2026  
**Generated by:** Copilot
