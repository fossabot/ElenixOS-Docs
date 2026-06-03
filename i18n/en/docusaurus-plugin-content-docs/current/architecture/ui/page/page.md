---
title: Panel
---

## Panel

Panel is a universal dialog component provided by the system for displaying message prompts, confirmation operations, and other interaction scenarios.

### Core Functions

The Panel component provides the following core capabilities:

- **Flexible Content Display**: Supports combined display of icons, titles, and message text
- **Internationalization Support**: Supports setting content through string IDs or direct text
- **Custom Extension**: Provides additional content slots for adding custom UI components
- **Button Interaction**: Supports confirmation and cancel operation buttons with customizable callback behaviors

### Layout Structure

Panel uses a vertically centered layout, from top to bottom:

1. **Icon Area**: Optional circular icon, supporting symbols (such as warning, info) or images
2. **Title Area**: Large font centered title text
3. **Message Area**: Main content with automatic line wrapping
4. **Extension Slot**: Reserved area for custom content
5. **Action Button Area**: Horizontally arranged confirm and cancel buttons

### Creation Methods

#### Create on Activity

This method automatically clears the Activity's view content and hides the application header:

```c
eos_panel_t *panel = eos_panel_create_on_activity(activity, &cfg);
```

#### Create on Any Parent Object

Provides more flexible creation, allowing Panel to be added to any UI container:

```c
eos_panel_t *panel = eos_panel_create(parent, &cfg);
```

### Configuration Description

Panel configuration mainly includes the following aspects:

- **Icon Configuration**: Set icon type (symbol or image), icon source, and background color
- **Text Configuration**: Set title and message content, supporting internationalization string IDs
- **Button Configuration**: Set text and callback functions for confirm and cancel buttons

### Usage Example

```c
eos_panel_cfg_t cfg = {
    .icon_type = EOS_PANEL_ICON_TYPE_SYMBOL,
    .icon_src = LV_SYMBOL_WARNING,
    .title_text = "Warning",
    .message_text = "Are you sure you want to perform this operation?",
    .confirm_btn_text = "OK",
    .confirm_cb = on_confirm,
    .cancel_btn_text = "Cancel",
};

eos_panel_t *panel = eos_panel_create_on_activity(activity, &cfg);
```

### Custom Content

The extension slot can be obtained through the `eos_panel_get_extra_slot()` method to add custom UI components:

```c
lv_obj_t *extra_slot = eos_panel_get_extra_slot(panel);
// Add custom components in extra_slot
```

### Default Behavior

| Button | Default Behavior |
|--------|------------------|
| Confirm Button | No action (requires custom callback) |
| Cancel Button | Return to previous Activity |

### Lifecycle Management

Panel supports two release methods:

- **Automatic Release**: When the Panel's container is deleted, related resources are automatically released
- **Manual Release**: Call `eos_panel_delete(panel)` to release manually