# SVG Sprites

- 多个 icon 作为 SVG 的 symbol 插入到 sprites.svg 文件里面

``` xml
  <svg>
    <symbol id="icon-1">...</symbol>
    <symbol id="icon-2">...</symbol>
    <symbol id="icon-3">...</symbol>
  </svg>
```

- 到 html 文件里面引入显示 icon

``` xml
  <svg>
    <use xlink:href="sprites.svg#icon-1"></use>
  </svg>
  <svg>
    <use xlink:href="sprites.svg#icon-2"></use>
  </svg>
  <svg>
    <use xlink:href="sprites.svg#icon-3"></use>
  </svg>
```