---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
fonts:
    sans: Sarabun
titleTemplate: '%s - COS3105'
# src: ./pages/chapter5.md
---

---
layout: default
---

````md magic-move {at:4, lines: true}
```js {*|1|2-5} // [!code hl]
let count = 1
function add() {
  count++
}
```

Non-code blocks in between as ignored, you can put some comments.

```js {*}{lines: false}
let count = 1
const add = () => count += 1
```
````
