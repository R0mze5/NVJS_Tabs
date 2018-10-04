NVJS_Tabs
==========

NVJS_Tabs - is the free and responsive script, which allow create Tabs and control it

- **No dependencies**
- All modern browsers are supported
- Fully **responsive**

NVJS_Tabs is not compatible with all platforms, because it used ES6. it is a modern menu which is focused only on modern apps/platforms to bring the best experience and simplicity.

**[Example on Codepen](https://codepen.io/r0mzes/pen/NOrbRZ)**

# Supported Browsers

- Edge
- Chrome
- Safari
- Mobile Safari
- Android Default Browser

# API

API description is available on [API documentation](documentation/api.md).

# Get Started

## Include NVJS_Tabs Files To Website/App

```html
<!DOCTYPE html>
<html lang="en">
<head>
    ...
    <link rel="stylesheet" href="path/to/NVJS_Tabs.css">
</head>
<body>
    ...
    <script src="path/to/NVJS_Tabs.js"></script>
</body>
</html>
```

## Add NVJS_Tabs HTML Layout

```html
  <div class="tab__area">
      <div class="tab__button" data-target="block_1"> show block_1</div>
      <div class="tab__button" data-target="block_2"> show block_2</div>
      <div class="tab__button" data-target="block_3"> show block_3</div>
      <div class="tab__block" data-name="block_1">
        block_1 
        <br>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam neque nemo sed atque harum repellendus autem distinctio repellat vero. Quos ab voluptatum eius nobis pariatur exercitationem excepturi assumenda aut quis.</div>
      <div class="tab__block" data-name="block_2">
        block_2 
        <br>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus quam eos corporis doloribus corrupti facere? Expedita sed commodi consectetur distinctio autem porro, et pariatur veniam quis atque nulla ex cumque!</div>
      <div class="tab__block" data-name="block_3">
        block_3 
        <br>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia itaque accusantium, sapiente non ratione voluptatibus reprehenderit minima qui iusto adipisci modi totam, perferendis quam molestiae consequatur odit nesciunt, ad molestias.</div>
    </div>
  </div>
```

## Initialize NVJS_Tabs

```js
    new NVJSTabs({
      tabButtons: '.tab__button',
      ButtonActiveClass: 'active',
      tabBlocks: '.tab__block',
      BlockActiveClass: 'shown',
      container: '.tab__area'
    });
```

# Changelog

Changelog is available on [Changelog documentation](documentation/changelog.md).

# License

 NVJS_Tabs is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.