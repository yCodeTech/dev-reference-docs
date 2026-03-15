# ACF Field Keys Reference for PHP Registration

Complete reference guide for all available keys when creating fields and field groups via PHP using `acf_add_local_field_group()`.

## Table of Contents

- [Field Group Keys](#field-group-keys)
- [Universal Field Keys](#universal-field-keys)
- [Field Type Specific Keys](#field-type-specific-keys)
- [Location Rules](#location-rules)
- [Conditional Logic](#conditional-logic)
- [Wrapper Attributes](#wrapper-attributes)
- [ACF Extended Custom Fields](#acf-extended-custom-fields)
- [Complete Example](#complete-example)
- [Reference Sources](#reference-sources)

---

## [Field Group Keys](https://www.advancedcustomfields.com/resources/register-fields-via-php/#group-settings)

These keys are passed to the main `acf_add_local_field_group()` function:

| Key                     | Type   | Default        | Description                                                                                                   |
| ----------------------- | ------ | -------------- | ------------------------------------------------------------------------------------------------------------- |
| `key`                   | string | auto-generated | Unique identifier for the field group. Format: `group_[unique_id]`                                            |
| `title`                 | string | required       | Display name of the field group shown in admin                                                                |
| `fields`                | array  | `[]`           | Array of field arrays to include in this group                                                                |
| `location`              | array  | `[]`           | Array of location rule groups defining where fields appear                                                    |
| `menu_order`            | int    | `0`            | Display order (lower numbers appear first)                                                                    |
| `position`              | string | `normal`       | Position on edit screen: `'normal'` (after content), `'side'` (sidebar), or `'acf_after_title'` (after title) |
| `style`                 | string | `default`      | Metabox style: `'default'` (standard WP metabox) or `'seamless'` (no metabox wrapper)                         |
| `label_placement`       | string | `top`          | Label position: `'top'` (above field) or `'left'` (beside field)                                              |
| `instruction_placement` | string | `label`        | Instructions position: `'label'` (below label) or `'field'` (below input)                                     |
| `hide_on_screen`        | array  | `[]`           | Array of elements to hide on edit screen                                                                      |
| `active`                | bool   | `true`         | Whether the field group is active                                                                             |
| `description`           | string | `''`           | Description/help text for the field group                                                                     |
| `show_in_rest`          | bool   | `false`        | Expose fields to WP REST API                                                                                  |
| `display_title`         | string | `''`           | Alternative title to display (ACF 6.6+)                                                                       |

### Hide on Screen Options

Values for the `hide_on_screen` array:

- `'permalink'` - Permalink field
- `'the_content'` - Content editor
- `'excerpt'` - Excerpt field
- `'discussion'` - Discussion settings
- `'comments'` - Comments panel
- `'revisions'` - Revisions panel
- `'slug'` - Slug field
- `'author'` - Author select
- `'format'` - Post format selector
- `'page_attributes'` - Page attributes (order, parent, template)
- `'featured_image'` - Featured image
- `'categories'` - Categories panel
- `'tags'` - Tags panel
- `'send-trackbacks'` - Send trackbacks field
- `'custom_fields'` - Custom fields metabox

---

## [Universal Field Keys](https://www.advancedcustomfields.com/resources/register-fields-via-php/#field-settings)

These keys are available for all field types:

| Key                 | Type   | Default  | Description                                                           |
| ------------------- | ------ | -------- | --------------------------------------------------------------------- |
| `key`               | string | required | Unique field identifier. Format: `field_[unique_id]`                  |
| `label`             | string | required | Field display label shown in admin                                    |
| `name`              | string | required | Database field name (used in `get_field()`)                           |
| `type`              | string | required | Field type identifier (see field types below)                         |
| `instructions`      | string | `''`     | Help text displayed with the field                                    |
| `required`          | bool   | `false`  | Whether the field is required                                         |
| `conditional_logic` | array  | `0`      | Conditional display rules ([see array structure](#conditional-logic)) |
| `wrapper`           | array  | `[]`     | CSS wrapper settings: `width`, `class`, `id`                          |
| `default_value`     | mixed  | `''`     | Default value for the field                                           |
| `placeholder`       | string | `''`     | Placeholder text for inputs                                           |
| `prepend`           | string | `''`     | Text prepended before input (text fields)                             |
| `append`            | string | `''`     | Text appended after input (text fields)                               |
| `id`                | string | auto     | HTML `id` attribute                                                   |
| `class`             | string | `''`     | HTML `class` attribute(s)                                             |
| `aria-label`        | string | `''`     | Accessibility label                                                   |
| `prefix`            | string | auto     | Internal prefix for field names                                       |
| `menu_order`        | int    | auto     | Field display order                                                   |
| `parent`            | string | `''`     | Parent field key (for sub-fields)                                     |
| `allow_in_bindings` | bool   | `false`  | Allow in Block Bindings/ACF Shortcode (ACF 6.3.6+)                    |

---

## Field Type Specific Keys

### Text-Based Fields

_Applies to: `text`, `email`, `url`, `password`, `textarea`_

| Key             | Type       | Default | Description                                                                   |
| --------------- | ---------- | ------- | ----------------------------------------------------------------------------- |
| `default_value` | string     | `''`    | Default text value                                                            |
| `placeholder`   | string     | `''`    | Placeholder text in empty input                                               |
| `prepend`       | string     | `''`    | Text prepended to input                                                       |
| `append`        | string     | `''`    | Text appended to input                                                        |
| `maxlength`     | int/string | `''`    | Maximum character limit                                                       |
| `readonly`      | bool       | `false` | Make field read-only                                                          |
| `disabled`      | bool       | `false` | Disable field                                                                 |
| `pattern`       | string     | `''`    | HTML5 pattern for validation                                                  |
| `rows`          | int        | `4`     | Number of rows (textarea only)                                                |
| `new_lines`     | string     | `''`    | Convert newlines: `''` (none), `'wpautop'` (auto `<p>`), `'br'` (line breaks) |

### Number & Range Fields

_Applies to: `number`, `range`_

| Key             | Type      | Default | Description             |
| --------------- | --------- | ------- | ----------------------- |
| `default_value` | int/float | `''`    | Default numeric value   |
| `min`           | int/float | `''`    | Minimum value           |
| `max`           | int/float | `''`    | Maximum value           |
| `step`          | int/float | `''`    | Increment step          |
| `prepend`       | string    | `''`    | Text prepended to input |
| `append`        | string    | `''`    | Text appended to input  |

### Date & Time Fields

_Applies to: `date_picker`, `date_time_picker`, `time_picker`_

| Key                       | Type   | Default   | Description                              |
| ------------------------- | ------ | --------- | ---------------------------------------- |
| `display_format`          | string | `'d/m/Y'` | Format shown to user (PHP date format)   |
| `return_format`           | string | `'d/m/Y'` | Format returned by `get_field()`         |
| `first_day`               | int    | `1`       | First day of week (0=Sunday, 6=Saturday) |
| `default_to_current_date` | bool   | `false`   | Pre-fill with current date/time          |

### WYSIWYG Editor

_Applies to: `wysiwyg`_

| Key             | Type   | Default  | Description                                |
| --------------- | ------ | -------- | ------------------------------------------ |
| `default_value` | string | `''`     | Default HTML content                       |
| `tabs`          | string | `'all'`  | Editor tabs: `'all'`, `'visual'`, `'text'` |
| `toolbar`       | string | `'full'` | Toolbar config: `'full'`, `'basic'`        |
| `media_upload`  | bool   | `true`   | Show media upload button                   |
| `delay`         | bool   | `false`  | Delay editor initialization                |

### Image Field

_Applies to: `image`_

| Key             | Type   | Default       | Description                               |
| --------------- | ------ | ------------- | ----------------------------------------- |
| `return_format` | string | `'array'`     | Return format: `'array'`, `'url'`, `'id'` |
| `preview_size`  | string | `'thumbnail'` | Preview image size (WP size name)         |
| `library`       | string | `'all'`       | Media source: `'all'` or `'uploadedTo'`   |
| `min_width`     | int    | `0`           | Minimum image width in pixels             |
| `min_height`    | int    | `0`           | Minimum image height in pixels            |
| `max_width`     | int    | `0`           | Maximum image width in pixels             |
| `max_height`    | int    | `0`           | Maximum image height in pixels            |
| `min_size`      | float  | `0`           | Minimum file size in MB                   |
| `max_size`      | float  | `0`           | Maximum file size in MB                   |
| `mime_types`    | string | `''`          | Comma-separated allowed MIME types        |

### File Field

_Applies to: `file`_

| Key             | Type   | Default   | Description                               |
| --------------- | ------ | --------- | ----------------------------------------- |
| `return_format` | string | `'array'` | Return format: `'array'`, `'url'`, `'id'` |
| `library`       | string | `'all'`   | Media source: `'all'` or `'uploadedTo'`   |
| `min_size`      | float  | `0`       | Minimum file size in MB                   |
| `max_size`      | float  | `0`       | Maximum file size in MB                   |
| `mime_types`    | string | `''`      | Comma-separated allowed MIME types        |

### Gallery Field

_Applies to: `gallery`_

| Key             | Type   | Default       | Description                             |
| --------------- | ------ | ------------- | --------------------------------------- |
| `return_format` | string | `'array'`     | Return format: `'array'` or `'id'`      |
| `preview_size`  | string | `'thumbnail'` | Preview thumbnail size                  |
| `insert`        | string | `'append'`    | Insert mode: `'append'` or `'prepend'`  |
| `library`       | string | `'all'`       | Media source: `'all'` or `'uploadedTo'` |
| `min`           | int    | `0`           | Minimum images required                 |
| `max`           | int    | `0`           | Maximum images allowed                  |
| `min_width`     | int    | `0`           | Minimum image width                     |
| `min_height`    | int    | `0`           | Minimum image height                    |
| `max_width`     | int    | `0`           | Maximum image width                     |
| `max_height`    | int    | `0`           | Maximum image height                    |
| `min_size`      | float  | `0`           | Minimum file size in MB                 |
| `max_size`      | float  | `0`           | Maximum file size in MB                 |
| `mime_types`    | string | `''`          | Allowed MIME types                      |

### Select, Checkbox, Radio, Button Group

_Applies to: `select`, `checkbox`, `radio`, `button_group`_

| Key                         | Type         | Default            | Description                               |
| --------------------------- | ------------ | ------------------ | ----------------------------------------- |
| `choices`                   | array        | `[]`               | Key-value pairs: `['value' => 'Label']`   |
| `default_value`             | string/array | `''`               | Default selected value(s)                 |
| `allow_null`                | bool         | `false`            | Allow empty selection                     |
| `multiple`                  | bool         | `false`            | Allow multiple selections (select only)   |
| `ui`                        | bool         | `false`            | Use enhanced UI (Select2/toggle)          |
| `ajax`                      | bool         | `false`            | Enable AJAX loading for select            |
| `placeholder`               | string       | `''`               | Placeholder text (select only)            |
| `return_format`             | string       | `'value'`          | Return `'value'`, `'label'`, or `'array'` |
| `layout`                    | string       | `'vertical'`       | Display: `'vertical'` or `'horizontal'`   |
| `toggle`                    | bool         | `false`            | Show toggle for all items (checkbox only) |
| `allow_custom`              | bool         | `false`            | Allow custom values                       |
| `save_custom`               | bool         | `false`            | Save custom values to choices             |
| `custom_choice_button_text` | string       | `'Add new choice'` | Button label for custom values            |

### True/False Field

_Applies to: `true_false`_

| Key             | Type   | Default | Description                   |
| --------------- | ------ | ------- | ----------------------------- |
| `message`       | string | `''`    | Text displayed next to toggle |
| `default_value` | bool   | `false` | Default checked state         |
| `ui`            | bool   | `false` | Use styled toggle switch      |
| `ui_on_text`    | string | `'Yes'` | Text when enabled             |
| `ui_off_text`   | string | `'No'`  | Text when disabled            |

### Link Field

_Applies to: `link`_

| Key             | Type   | Default   | Description                 |
| --------------- | ------ | --------- | --------------------------- |
| `return_format` | string | `'array'` | Return `'array'` or `'url'` |

### Post Object & Page Link

_Applies to: `post_object`, `page_link`_

| Key              | Type   | Default    | Description                           |
| ---------------- | ------ | ---------- | ------------------------------------- |
| `post_type`      | array  | `[]`       | Post type(s) to select from           |
| `taxonomy`       | array  | `[]`       | Filter by taxonomy terms              |
| `allow_null`     | bool   | `false`    | Allow empty selection                 |
| `multiple`       | bool   | `false`    | Allow multiple selections             |
| `return_format`  | string | `'object'` | Return `'object'` or `'id'`           |
| `ui`             | bool   | `true`     | Use enhanced UI                       |
| `allow_archives` | bool   | `true`     | Include archive URLs (page_link only) |

### Relationship Field

_Applies to: `relationship`_

| Key                    | Type   | Default                               | Description                       |
| ---------------------- | ------ | ------------------------------------- | --------------------------------- |
| `post_type`            | array  | `[]`                                  | Post type(s) to query             |
| `taxonomy`             | array  | `[]`                                  | Filter by taxonomy terms          |
| `filters`              | array  | `['search', 'post_type', 'taxonomy']` | Available filters                 |
| `elements`             | array  | `['featured_image']`                  | Display elements in results       |
| `min`                  | int    | `0`                                   | Minimum posts required            |
| `max`                  | int    | `0`                                   | Maximum posts allowed             |
| `return_format`        | string | `'object'`                            | Return `'object'` or `'id'`       |
| `bidirectional`        | bool   | `false`                               | Enable bidirectional relationship |
| `bidirectional_target` | array  | `[]`                                  | Target field for bidirectional    |

### Taxonomy Field

_Applies to: `taxonomy`_

| Key             | Type   | Default      | Description                                                       |
| --------------- | ------ | ------------ | ----------------------------------------------------------------- |
| `taxonomy`      | string | `'category'` | Taxonomy slug to query                                            |
| `field_type`    | string | `'checkbox'` | Display as: `'checkbox'`, `'multi_select'`, `'radio'`, `'select'` |
| `allow_null`    | bool   | `false`      | Allow empty selection                                             |
| `add_term`      | bool   | `true`       | Allow adding new terms                                            |
| `save_terms`    | bool   | `false`      | Save terms to post automatically                                  |
| `load_terms`    | bool   | `false`      | Load existing post terms                                          |
| `return_format` | string | `'id'`       | Return `'id'` or `'object'`                                       |
| `multiple`      | bool   | `false`      | Allow multiple selections                                         |

### User Field

_Applies to: `user`_

| Key             | Type   | Default   | Description                             |
| --------------- | ------ | --------- | --------------------------------------- |
| `role`          | array  | `[]`      | Filter by user role(s)                  |
| `allow_null`    | bool   | `false`   | Allow empty selection                   |
| `multiple`      | bool   | `false`   | Allow multiple users                    |
| `return_format` | string | `'array'` | Return `'array'`, `'id'`, or `'object'` |

### Google Map

_Applies to: `google_map`_

| Key          | Type  | Default | Description              |
| ------------ | ----- | ------- | ------------------------ |
| `center_lat` | float | `''`    | Default center latitude  |
| `center_lng` | float | `''`    | Default center longitude |
| `zoom`       | int   | `14`    | Default zoom level       |
| `height`     | int   | `400`   | Map height in pixels     |

### oEmbed

_Applies to: `oembed`_

| Key      | Type | Default | Description  |
| -------- | ---- | ------- | ------------ |
| `width`  | int  | `''`    | Embed width  |
| `height` | int  | `''`    | Embed height |

### Color Picker

_Applies to: `color_picker`_

| Key              | Type   | Default    | Description                                 |
| ---------------- | ------ | ---------- | ------------------------------------------- |
| `default_value`  | string | `''`       | Default color (hex)                         |
| `enable_opacity` | bool   | `false`    | Allow alpha channel/opacity                 |
| `return_format`  | string | `'string'` | Return `'string'`, `'array'`, or `'object'` |

### Message & Accordion

_Applies to: `message`, `accordion`_

| Key            | Type   | Default     | Description                          |
| -------------- | ------ | ----------- | ------------------------------------ |
| `message`      | string | `''`        | Message HTML content                 |
| `new_lines`    | string | `'wpautop'` | Convert newlines (message only)      |
| `esc_html`     | bool   | `false`     | Escape HTML (message only)           |
| `open`         | bool   | `false`     | Start open (accordion only)          |
| `multi_expand` | bool   | `false`     | Allow multiple open (accordion only) |
| `endpoint`     | bool   | `false`     | Mark as endpoint (accordion only)    |

### Tab & Separator

_Applies to: `tab`, `separator`_

| Key         | Type   | Default | Description                        |
| ----------- | ------ | ------- | ---------------------------------- |
| `placement` | string | `'top'` | Tab placement: `'top'` or `'left'` |
| `endpoint`  | bool   | `false` | Mark as endpoint                   |

### Group Field

_Applies to: `group`_

| Key          | Type   | Default   | Description                                   |
| ------------ | ------ | --------- | --------------------------------------------- |
| `sub_fields` | array  | `[]`      | Array of sub-field definitions                |
| `layout`     | string | `'block'` | Display layout: `'block'`, `'table'`, `'row'` |

### Repeater Field (Pro)

_Applies to: `repeater`_

| Key             | Type   | Default     | Description                            |
| --------------- | ------ | ----------- | -------------------------------------- |
| `sub_fields`    | array  | `[]`        | Array of sub-field definitions         |
| `min`           | int    | `0`         | Minimum rows required                  |
| `max`           | int    | `0`         | Maximum rows allowed                   |
| `layout`        | string | `'table'`   | Display: `'table'`, `'block'`, `'row'` |
| `button_label`  | string | `'Add Row'` | Add button label                       |
| `collapsed`     | string | `''`        | Field key to use for row label         |
| `pagination`    | bool   | `false`     | Enable pagination                      |
| `rows_per_page` | int    | `20`        | Rows per page when paginated           |

### Flexible Content (Pro)

_Applies to: `flexible_content`_

| Key            | Type   | Default     | Description                 |
| -------------- | ------ | ----------- | --------------------------- |
| `layouts`      | array  | `[]`        | Array of layout definitions |
| `min`          | int    | `0`         | Minimum layouts required    |
| `max`          | int    | `0`         | Maximum layouts allowed     |
| `button_label` | string | `'Add Row'` | Add button label            |

#### Layout Definition Structure

```php
'layouts' => array(
    'layout_key' => array(
        'key'        => 'layout_key',
        'name'       => 'layout_name',
        'label'      => 'Layout Label',
        'display'    => 'block', // 'block', 'table', 'row'
        'sub_fields' => array(
            // Field definitions
        ),
        'min'        => 0,
        'max'        => 0,
    ),
)
```

### Clone Field (Pro)

_Applies to: `clone`_

| Key            | Type   | Default      | Description                             |
| -------------- | ------ | ------------ | --------------------------------------- |
| `clone`        | array  | `[]`         | Array of field keys/group keys to clone |
| `display`      | string | `'seamless'` | Display: `'seamless'`, `'group'`        |
| `layout`       | string | `'block'`    | Layout: `'block'`, `'table'`, `'row'`   |
| `prefix_label` | bool   | `false`      | Prefix cloned field labels              |
| `prefix_name`  | bool   | `false`      | Prefix cloned field names               |

---

## Location Rules

Location rules determine where field groups appear. Rules are grouped in arrays with AND/OR logic:

```php
'location' => array(
    // Group 1 (all rules must match - AND logic)
    array(
        array(
            'param'    => 'post_type',
            'operator' => '==',
            'value'    => 'post',
        ),
        array(
            'param'    => 'post_status',
            'operator' => '!=',
            'value'    => 'draft',
        ),
    ),
    // Group 2 (alternative - OR logic between groups)
    array(
        array(
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'template-custom.php',
        ),
    ),
)
```

### Available Location Parameters

| Parameter           | Description             | Value Type                                                     |
| ------------------- | ----------------------- | -------------------------------------------------------------- |
| `post_type`         | Match post type         | string (post type slug)                                        |
| `post`              | Match specific post     | int (post ID)                                                  |
| `post_template`     | Match page template     | string (template filename)                                     |
| `post_status`       | Match post status       | string (status slug)                                           |
| `post_format`       | Match post format       | string (format slug)                                           |
| `post_category`     | Match post category     | int (category ID)                                              |
| `post_taxonomy`     | Match taxonomy term     | string (taxonomy:term)                                         |
| `page`              | Match specific page     | int (page ID)                                                  |
| `page_type`         | Match page type         | string (`'front_page'`, `'posts_page'`, `'parent'`, `'child'`) |
| `page_parent`       | Match page parent       | int (parent page ID)                                           |
| `page_template`     | Match page template     | string (template filename)                                     |
| `attachment`        | Match attachment type   | string (`'all'`)                                               |
| `taxonomy`          | Match taxonomy archive  | string (taxonomy slug)                                         |
| `user_form`         | Match user form         | string (`'edit'`, `'add'`, `'register'`)                       |
| `user_role`         | Match user role         | string (role slug)                                             |
| `current_user`      | Match current user      | string (user login)                                            |
| `current_user_role` | Match current user role | string (role slug)                                             |
| `nav_menu`          | Match nav menu          | string (menu slug)                                             |
| `nav_menu_item`     | Match menu item         | string (item type)                                             |
| `widget`            | Match widget            | string (widget ID)                                             |
| `block`             | Match Gutenberg block   | string (block name)                                            |
| `options_page`      | Match options page      | string (page slug) - Pro only                                  |

### Operators

- `==` - Is equal to
- `!=` - Is not equal to

---

## Conditional Logic

Conditional logic controls when fields are displayed based on other field values:

```php
'conditional_logic' => array(
    // Rule group 1 (all rules must match - AND logic)
    array(
        array(
            'field'    => 'field_123abc',  // Field key to check
            'operator' => '==',             // Comparison operator
            'value'    => 'yes',            // Value to compare
        ),
        array(
            'field'    => 'field_456def',
            'operator' => '!=',
            'value'    => '',
        ),
    ),
    // Rule group 2 (alternative - OR logic between groups)
    array(
        array(
            'field'    => 'field_789ghi',
            'operator' => '==',
            'value'    => 'show',
        ),
    ),
)
```

### Conditional Logic Operators

| Operator    | Description           | Works With              |
| ----------- | --------------------- | ----------------------- |
| `==`        | Is equal to           | All field types         |
| `!=`        | Is not equal to       | All field types         |
| `>`         | Greater than          | Number, range           |
| `<`         | Less than             | Number, range           |
| `>=`        | Greater than or equal | Number, range           |
| `<=`        | Less than or equal    | Number, range           |
| `contains`  | Contains value        | Text, textarea, wysiwyg |
| `!contains` | Does not contain      | Text, textarea, wysiwyg |
| `matches`   | Matches pattern       | Text fields             |
| `pattern`   | Regex pattern match   | Text fields             |
| `IN`        | Value in array        | Select, checkbox        |
| `!IN`       | Value not in array    | Select, checkbox        |

---

## Wrapper Attributes

The `wrapper` key controls CSS and HTML attributes for the field wrapper:

```php
'wrapper' => array(
    'width' => '50',              // Width in percent (no % sign needed)
    'class' => 'custom-class',    // Additional CSS classes
    'id'    => 'custom-id',       // HTML id attribute
),
```

You can also add custom data attributes:

```php
'wrapper' => array(
    'width'             => '50',
    'data-custom'       => 'value',
    'data-no-preference' => 1,
)
```

---

## ACF Extended Custom Fields

ACF Extended adds additional field types. Here are some examples:

### Button Field (ACFE)

_Type: `acfe_button`_

| Key            | Type   | Description        |
| -------------- | ------ | ------------------ |
| `button_text`  | string | Button label text  |
| `button_class` | string | Button CSS classes |
| `button_ajax`  | bool   | Load via AJAX      |

### Advanced Link (ACFE)

_Type: `acfe_advanced_link`_

| Key         | Type  | Description          |
| ----------- | ----- | -------------------- |
| `post_type` | array | Filter by post types |
| `taxonomy`  | array | Filter by taxonomies |

### Code Editor (ACFE)

_Type: `acfe_code_editor`_

| Key           | Type   | Description                                               |
| ------------- | ------ | --------------------------------------------------------- |
| `mode`        | string | Language mode: `'html'`, `'css'`, `'javascript'`, `'php'` |
| `theme`       | string | Editor theme                                              |
| `lines`       | bool   | Show line numbers                                         |
| `indent_unit` | int    | Indent unit size                                          |

### Slug (ACFE)

_Type: `acfe_slug`_

| Key           | Type   | Description      |
| ------------- | ------ | ---------------- |
| `placeholder` | string | Placeholder text |

### Hidden (ACFE)

_Type: `acfe_hidden`_

| Key             | Type   | Description  |
| --------------- | ------ | ------------ |
| `default_value` | string | Hidden value |

### Post Statuses (ACFE)

_Type: `acfe_post_statuses`_

| Key          | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| `field_type` | string | Display type: `'checkbox'`, `'select'`, etc. |
| `multiple`   | bool   | Allow multiple selections                    |

### Post Types (ACFE)

_Type: `acfe_post_types`_

| Key          | Type   | Description               |
| ------------ | ------ | ------------------------- |
| `field_type` | string | Display type              |
| `multiple`   | bool   | Allow multiple selections |

### Taxonomies (ACFE)

_Type: `acfe_taxonomies`_

| Key          | Type   | Description               |
| ------------ | ------ | ------------------------- |
| `field_type` | string | Display type              |
| `multiple`   | bool   | Allow multiple selections |

### Taxonomy Terms (ACFE)

_Type: `acfe_taxonomy_terms`_

| Key          | Type   | Description               |
| ------------ | ------ | ------------------------- |
| `taxonomy`   | string | Taxonomy slug             |
| `field_type` | string | Display type              |
| `multiple`   | bool   | Allow multiple selections |

### User Roles (ACFE)

_Type: `acfe_user_roles`_

| Key          | Type   | Description               |
| ------------ | ------ | ------------------------- |
| `field_type` | string | Display type              |
| `multiple`   | bool   | Allow multiple selections |

### Column (ACFE)

_Type: `acfe_column`_

| Key        | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| `columns`  | string | Column width (e.g., `'1/2'`, `'1/3'`, `'2/3'`) |
| `endpoint` | bool   | Mark as endpoint                               |

### reCAPTCHA (ACFE)

_Type: `acfe_recaptcha`_

| Key          | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `version`    | string | reCAPTCHA version: `'v2'`, `'v3'` |
| `site_key`   | string | Google site key                   |
| `secret_key` | string | Google secret key                 |

---

## Complete Example

Here's a comprehensive example showing multiple field types and configurations:

```php
<?php

if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array(
    'key' => 'group_example',
    'title' => 'Example Field Group',
    'fields' => array(

        // Text Field
        array(
            'key' => 'field_text_example',
            'label' => 'Text Field',
            'name' => 'text_field',
            'type' => 'text',
            'instructions' => 'Enter some text here',
            'required' => 1,
            'default_value' => '',
            'placeholder' => 'Type here...',
            'prepend' => '$',
            'append' => '.00',
            'maxlength' => 100,
            'wrapper' => array(
                'width' => '50',
                'class' => 'custom-text-field',
            ),
        ),

        // Image Field
        array(
            'key' => 'field_image_example',
            'label' => 'Featured Image',
            'name' => 'featured_image',
            'type' => 'image',
            'return_format' => 'array',
            'preview_size' => 'medium',
            'library' => 'all',
            'min_width' => 800,
            'min_height' => 600,
            'max_size' => 2,
            'mime_types' => 'jpg,jpeg,png',
            'wrapper' => array(
                'width' => '50',
            ),
        ),

        // WYSIWYG Editor
        array(
            'key' => 'field_wysiwyg_example',
            'label' => 'Content Editor',
            'name' => 'content_editor',
            'type' => 'wysiwyg',
            'tabs' => 'all',
            'toolbar' => 'full',
            'media_upload' => 1,
            'delay' => 0,
        ),

        // Select Field with Conditional Logic
        array(
            'key' => 'field_select_example',
            'label' => 'Category',
            'name' => 'category',
            'type' => 'select',
            'choices' => array(
                'news' => 'News',
                'blog' => 'Blog',
                'review' => 'Review',
            ),
            'default_value' => 'news',
            'allow_null' => 0,
            'multiple' => 0,
            'ui' => 1,
            'ajax' => 0,
            'return_format' => 'value',
        ),

        // Conditional Field (shows only when category is 'review')
        array(
            'key' => 'field_rating_example',
            'label' => 'Rating',
            'name' => 'rating',
            'type' => 'range',
            'min' => 1,
            'max' => 5,
            'step' => 0.5,
            'default_value' => 3,
            'append' => '/ 5 stars',
            'conditional_logic' => array(
                array(
                    array(
                        'field' => 'field_select_example',
                        'operator' => '==',
                        'value' => 'review',
                    ),
                ),
            ),
        ),

        // Tab
        array(
            'key' => 'field_tab_advanced',
            'label' => 'Advanced Settings',
            'name' => '',
            'type' => 'tab',
            'placement' => 'top',
            'endpoint' => 0,
        ),

        // Repeater Field
        array(
            'key' => 'field_repeater_example',
            'label' => 'Team Members',
            'name' => 'team_members',
            'type' => 'repeater',
            'layout' => 'table',
            'min' => 1,
            'max' => 10,
            'button_label' => 'Add Team Member',
            'collapsed' => 'field_member_name',
            'sub_fields' => array(
                array(
                    'key' => 'field_member_name',
                    'label' => 'Name',
                    'name' => 'name',
                    'type' => 'text',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_member_title',
                    'label' => 'Title',
                    'name' => 'title',
                    'type' => 'text',
                ),
                array(
                    'key' => 'field_member_photo',
                    'label' => 'Photo',
                    'name' => 'photo',
                    'type' => 'image',
                    'return_format' => 'id',
                    'preview_size' => 'thumbnail',
                ),
            ),
        ),

        // True/False with UI
        array(
            'key' => 'field_featured_example',
            'label' => 'Featured Post',
            'name' => 'is_featured',
            'type' => 'true_false',
            'message' => 'Display this post on the homepage',
            'default_value' => 0,
            'ui' => 1,
            'ui_on_text' => 'Yes',
            'ui_off_text' => 'No',
        ),

    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'post',
            ),
            array(
                'param' => 'post_status',
                'operator' => '!=',
                'value' => 'trash',
            ),
        ),
        array(
            array(
                'param' => 'page_template',
                'operator' => '==',
                'value' => 'template-custom.php',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => array(
        'the_content',
        'excerpt',
        'discussion',
        'comments',
        'featured_image',
    ),
    'active' => true,
    'description' => 'Example field group showing various field types and configurations',
    'show_in_rest' => false,
));

endif;
```

---

## Reference Sources

- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [ACF Extended Documentation](https://www.acf-extended.com/features)
- [Registering Fields via PHP](https://www.advancedcustomfields.com/resources/register-fields-via-php/)

---

**Generated on:** 11 March 2026  
**Generated by:** GitHub Copilot  
**ACF Version:** Pro 6.x  
**ACF Extended Version:** Latest
