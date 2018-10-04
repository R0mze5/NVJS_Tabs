# API

## Initialize NVJS_Tabs

``` js
new NVJS_Tabs(parameters);
```

- `parameters` - object with NVJS parameters. Optional.

## NVJS_Tabs Parameters

**example:**
``` js
new NVJS_Tabs({
      tabButtons: '.tab__button',
      ButtonActiveClass: 'dark_btn'
})
``` 

> **`container`** \
> string (with CSS Selector) of NVJS_Tabs container HTML element. \
> **type**  `String with CSS Selector`\
> **default**  `body`

> **`tabButtons`** \
> Used for `show content` of block on click this elements. \
> **type**  `String with CSS Selector`\
> **default**  `.tab__header`

> **`buttonActiveClass`** \
> CSS class name added to header (buttons) elements when it becomes active \
> **type**  `String`\
> **default**  `active`

> **`tabButtonsTarget`** \
> data attribute to link button with tab \
> **type**  `String`\
> **default**  `data-target`

> **`tabBlocks`** \
> String with tab shown block CSS Selector \
> **type**  `String with CSS Selector`\
> **default**  `.tab__block`

> **`blockActiveClass`** \
> CSS class name added to block elements when it becomes opened \
> **type**  `String`\
> **default**  `shown`

> **`tabBlockTarget`** \
> data attribute to connect tab with button \
> **type**  `String`\
> **default**  `data-name`

> **`autoSetFirstTab`** \
> Whether NVJS_Tabs should be initialised, first tab becomes active automatically \
> **type**  `Boolean`\
> **default**  `true`

> **`autoInitialize`** \
> Whether NVJS_Tabs should be initialised automatically when you create an instance. If disabled, then you need to init it manually by calling mytab.initialize() \
> **type**  `Boolean`\
> **default**  `true`

## NVJS_Tabs Methods & Properties

**example:**

``` js
    let mytab = new NVJS_Tabs();
    mytab.initialize();
```

> **`.initialize();`** \
> Initialize NVJS_Tabs if autoinitialize false in config
