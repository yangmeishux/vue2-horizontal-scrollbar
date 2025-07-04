# Vue2 Horizontal Scrollbar

[![npm version](https://badge.fury.io/js/vue2-horizontal-scrollbar.svg)](https://www.npmjs.com/package/vue2-horizontal-scrollbar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Vue 2](https://img.shields.io/badge/Vue-2.x-4FC08D.svg)](https://vuejs.org/)

A customizable horizontal scrollbar component for Vue 2 that provides smooth scrolling experience with keyboard support and touch gestures.

## ✨ Features

- 🎯 **Vue 2 & TypeScript** - Full TypeScript support with Vue 2 Options API
- 🎨 **Customizable** - Flexible styling and configuration options
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 📱 **Touch Friendly** - Mobile-friendly touch gestures
- 🚀 **Performance** - Optimized with throttling and efficient updates
- 🎪 **Flexible** - Works with any scrollable content
- 🎛️ **Event Rich** - Comprehensive event system for interactions
- 📦 **Lightweight** - Minimal dependencies

## 📦 Installation

### Package Manager

```bash
# npm
npm install vue2-horizontal-scrollbar

# yarn
yarn add vue2-horizontal-scrollbar

# pnpm
pnpm add vue2-horizontal-scrollbar
```

### CDN

```html
<!-- UMD version -->
<script src="https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/vue2-horizontal-scrollbar.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/style.css">

<!-- ES Module version -->
<script type="module">
  import { VueHorizontalScrollbar } from 'https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/vue2-horizontal-scrollbar.es.js';
</script>
```

## 📺 Demo

[Vue2 Horizontal Scrollbar Demo](https://demo.dynaxfy.com/vue2-horizontal-scrollbar)

## 🚀 Quick Start

### CDN Usage

You can also use this component via CDN without any build step:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue2 Horizontal Scrollbar Demo</title>
  <!-- Vue 2 CDN -->
  <script src="https://unpkg.com/vue@2.7.0/dist/vue.js"></script>
  <!-- Vue2 Horizontal Scrollbar CDN -->
  <script src="https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/vue2-horizontal-scrollbar.umd.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/style.css">
</head>
<body>
  <div id="app">
    <!-- Your scrollable content -->
    <div id="scroll-container" style="overflow-x: auto; width: 100%; height: 200px;">
      <div id="scroll-content" style="width: 2000px; height: 200px; background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);">
        <p style="color: white; text-align: center; line-height: 200px;">This content is wider than the container...</p>
      </div>
    </div>
    
    <!-- Horizontal Scrollbar -->
    <vue-horizontal-scrollbar
      target-selector="#scroll-container"
      content-selector="#scroll-content"
      :auto-show="true"
      @scroll="onScroll">
    </vue-horizontal-scrollbar>
  </div>

  <script>
    // Register the plugin globally
    Vue.use(Vue2HorizontalScrollbar.HorizontalScrollbarPlugin);
    
    new Vue({
      el: '#app',
      methods: {
        onScroll(info) {
          console.log('Scroll info:', info);
          // { scrollLeft: 100, maxScroll: 1000, scrollPercent: 10 }
        }
      }
    });
  </script>
</body>
</html>
```

### CDN with ES6 Modules

If you prefer using ES6 modules with CDN:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue2 Horizontal Scrollbar ES6 Demo</title>
  <!-- Vue 2 CDN -->
  <script src="https://unpkg.com/vue@2.7.0/dist/vue.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/style.css">
</head>
<body>
  <div id="app">
    <div id="scroll-container" style="overflow-x: auto; width: 100%; height: 200px;">
      <div id="scroll-content" style="width: 2000px; height: 200px; background: linear-gradient(90deg, #ff6b6b, #4ecdc4);">
        <p style="color: white; text-align: center; line-height: 200px;">Wide content here...</p>
      </div>
    </div>
    
    <vue-horizontal-scrollbar
      target-selector="#scroll-container"
      content-selector="#scroll-content">
    </vue-horizontal-scrollbar>
  </div>

  <script type="module">
    import { VueHorizontalScrollbar } from 'https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/vue2-horizontal-scrollbar.es.js';
    
    Vue.component('vue-horizontal-scrollbar', VueHorizontalScrollbar);
    
    new Vue({
      el: '#app'
    });
  </script>
</body>
</html>
```

### CDN Links

| Type | URL | Description |
|------|-----|-------------|
| **UMD** | `https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/vue2-horizontal-scrollbar.umd.js` | Universal module definition, works in browsers and Node.js |
| **ES Module** | `https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/vue2-horizontal-scrollbar.es.js` | ES6 module format for modern bundlers |
| **CSS** | `https://unpkg.com/vue2-horizontal-scrollbar@0.0.2/dist/style.css` | Component styles |

### Basic Usage

#### Using Ref Names (Recommended)

```vue
<template>
  <div>
    <!-- Your scrollable content -->
    <div ref="scrollContainer" style="overflow-x: auto; width: 100%;">
      <div ref="scrollContent" style="width: 2000px; height: 200px;">
        <!-- Wide content here -->
        <p>This content is wider than the container...</p>
      </div>
    </div>
    
    <!-- Horizontal Scrollbar -->
    <VueHorizontalScrollbar
      target-ref="scrollContainer"
      content-ref="scrollContent"
      :auto-show="true"
      @scroll="onScroll"
    />
  </div>
</template>

<script>
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

export default {
  components: {
    VueHorizontalScrollbar
  },
  methods: {
    onScroll(info) {
      console.log('Scroll info:', info)
      // { scrollLeft: 100, maxScroll: 1000, scrollPercent: 10 }
    }
  }
}
</script>
```

#### Using Selectors (Alternative)

```vue
<template>
  <div>
    <!-- Your scrollable content -->
    <div id="scroll-container" style="overflow-x: auto; width: 100%;">
      <div id="scroll-content" style="width: 2000px; height: 200px;">
        <!-- Wide content here -->
        <p>This content is wider than the container...</p>
      </div>
    </div>
    
    <!-- Horizontal Scrollbar -->
    <VueHorizontalScrollbar
      target-selector="#scroll-container"
      content-selector="#scroll-content"
      :auto-show="true"
      @scroll="onScroll"
    />
  </div>
</template>

<script>
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

export default {
  components: {
    VueHorizontalScrollbar
  },
  methods: {
    onScroll(info) {
      console.log('Scroll info:', info)
      // { scrollLeft: 100, maxScroll: 1000, scrollPercent: 10 }
    }
  }
}
</script>
```

### Global Registration

```ts
// main.ts 
import Vue from 'vue'
import VueHorizontalScrollbar from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

import App from './App.vue'

Vue.use(VueHorizontalScrollbar)

new Vue({
  render: h => h(App)
}).$mount('#app')

```

```vue
<!-- Now you can use it globally -->
<template>
  <VueHorizontalScrollbar
    target-selector="#my-container"
    content-selector="#my-content"
  />
</template>

```

## 📖 API Reference

### Props

| Prop              | Type               | Default                  | Description                                                                 |
|-------------------|--------------------|--------------------------|-----------------------------------------------------------------------------|
| `targetSelector`  | `string \| Function` | —                        | CSS selector or function returning the scroll container element |
| `contentSelector` | `string \| Function` | —                        | CSS selector or function returning the content element         |
| `targetRef`       | `string`           | —                        | Ref name of the scroll container element (alternative to targetSelector)    |
| `contentRef`      | `string`           | —                        | Ref name of the content element (alternative to contentSelector)            |
| `autoShow`        | `boolean`          | `true`                   | Auto show/hide scrollbar based on content width                             |
| `minScrollDistance` | `number`         | `50`                     | Minimum scroll distance to show scrollbar (when `autoShow` is true)         |
| `height`          | `number`           | `16`                     | Scrollbar height in pixels                                                  |
| `enableKeyboard`  | `boolean`          | `true`                   | Enable keyboard navigation (`Arrow` keys, `Home`, `End`)                    |
| `scrollStep`      | `number`           | `50`                     | Scroll step for keyboard navigation                                         |
| `minThumbWidth`   | `number`           | `30`                     | Minimum thumb width in pixels                                               |
| `throttleDelay`   | `number`           | `16`                     | Throttle delay for scroll events in milliseconds                            |
| `zIndex`          | `number`           | `9999`                   | Z-index for the scrollbar                                                   |
| `disabled`        | `boolean`          | `false`                  | Disable the scrollbar                                                       |
| `ariaLabel`       | `string`           | `'Horizontal scrollbar'` | ARIA label for accessibility                                                |
| `teleportTo`      | `string`           | `'body'`                 | Target element for scrollbar positioning (Vue 2 compatibility)             |

---

### Events

| Event       | Payload                 | Description                            |
|-------------|-------------------------|----------------------------------------|
| `scroll`    | `ScrollInfo`            | Emitted when scrolling occurs          |
| `click`     | `MouseEvent`            | Emitted when scrollbar track is clicked|
| `dragStart` | `MouseEvent \| TouchEvent` | Emitted when dragging starts        |
| `dragEnd`   | `MouseEvent \| TouchEvent` | Emitted when dragging ends          |
| `keydown`   | `KeyboardEvent`         | Emitted on keyboard interaction        |
| `ready`     | `-`                     | Emitted when component is initialized  |
| `error`     | `Error`                 | Emitted when an error occurs           |

---

## 🔧 Usage Example

```ts
<HorizontalScrollbar
  :target-selector="'.scroll-container'"
  :content-selector="'.scroll-content'"
  :auto-show="true"
  :scroll-step="60"
  :height="20"
  @scroll="onScroll"
  @dragStart="onDragStart"
  @dragEnd="onDragEnd"
/>


### ScrollInfo Type

```ts
interface ScrollInfo {
  scrollLeft: number      // Current scroll position
  maxScroll: number       // Maximum scroll position
  scrollPercent: number   // Scroll percentage (0-100)
}
```

### Exposed Methods

```ts
interface ExposedAPI {
  scrollToPosition: (position: number) => void
  scrollToEnd: () => void
  updateScrollInfo: () => void
  scrollLeft: number
  maxScroll: number
  scrollPercent: number
}
```

## 🎨 Advanced Usage

### Using Function Selectors

```vue
<template>
  <div ref="containerRef">
    <div ref="contentRef">
      <!-- content -->
    </div>
  </div>
  
  <VueHorizontalScrollbar
    :target-selector="getContainer"
    :content-selector="getContent"
  />
</template>

<script>
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

export default {
  components: {
    VueHorizontalScrollbar
  },
  data() {
    return {
      containerRef: null,
      contentRef: null
    }
  },
  methods: {
    getContainer() {
      return this.$refs.containerRef
    },
    getContent() {
      return this.$refs.contentRef
    }
  }
}
</script>
```

### Using Ref Names (Recommended)

The simplest way to use the component is with ref names:

```vue
<template>
  <div ref="scrollContainer">
    <div ref="scrollContent">
      <!-- Your wide content here -->
      <div v-for="i in 50" :key="i" class="content-block">
        Block {{ i }}
      </div>
    </div>
  </div>
  
  <VueHorizontalScrollbar
    target-ref="scrollContainer"
    content-ref="scrollContent"
    :auto-show="true"
    @scroll="onScroll"
  />
</template>

<script>
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

export default {
  components: {
    VueHorizontalScrollbar
  },
  methods: {
    onScroll(info) {
      console.log('Scroll info:', info)
    }
  }
}
</script>

<style>
.scrollContainer {
  overflow-x: auto;
  width: 100%;
  height: 200px;
}

.scrollContent {
  width: 2000px;
  height: 100%;
}

.content-block {
  width: 150px;
  height: 150px;
  margin: 10px;
  background: #e6f7f0;
  display: inline-block;
  border-radius: 4px;
}
</style>
```

### Element Plus Table Use

```vue
<template>
    <el-table style="width: 100%">
    </el-table>
  
    <HorizontalScrollbar
      :target-selector="getSelector('.el-table__body-wrapper .el-scrollbar .el-scrollbar__wrap')"
      :content-selector="getSelector('.el-table__body-wrapper .el-scrollbar .el-scrollbar__view')"
    />
</template>

<script setup>
import { ref } from 'vue'
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

function getSelector(selector: string) {
  const elements = document.querySelectorAll<HTMLElement>(selector)
  if (elements.length) {
    return elements[elements.length - 1]
  }
  else {
    console.warn(`Selector "${selector}" did not match any elements.`)
    return null
  }
}

</script>
```

### Programmatic Control

```vue
<template>
  <VueHorizontalScrollbar
    ref="scrollbarRef"
    target-selector="#container"
    content-selector="#content"
  />
  
  <div class="controls">
    <button @click="scrollToStart">Start</button>
    <button @click="scrollToMiddle">Middle</button>
    <button @click="scrollToEnd">End</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'
import "vue2-horizontal-scrollbar/dist/style.css"

const scrollbarRef = ref()

function scrollToStart() {
  scrollbarRef.value?.scrollToPosition(0)
}

function scrollToMiddle() {
  const maxScroll = scrollbarRef.value?.maxScroll || 0
  scrollbarRef.value?.scrollToPosition(maxScroll / 2)
}

function scrollToEnd() {
  scrollbarRef.value?.scrollToEnd()
}
</script>
```

### Event Handling

```vue
<template>
  <VueHorizontalScrollbar
    target-selector="#container"
    content-selector="#content"
    @scroll="handleScroll"
    @dragStart="handleDragStart"
    @dragEnd="handleDragEnd"
    @ready="handleReady"
    @error="handleError"
  />
</template>

<script setup>
import { VueHorizontalScrollbar } from 'vue2-horizontal-scrollbar'

function handleScroll(info) {
  console.log(`Scrolled to ${info.scrollPercent.toFixed(1)}%`)
}

function handleDragStart(event) {
  console.log('Drag started')
}

function handleDragEnd(event) {
  console.log('Drag ended')
}

function handleReady() {
  console.log('Scrollbar is ready')
}

function handleError(error) {
  console.error('Scrollbar error:', error)
}
</script>
```

## 🎨 Styling

### CSS Custom Properties

The component uses CSS custom properties for easy theming:

```css
.vue-horizontal-scrollbar {
  --scrollbar-bg: #f5f5f5;
  --scrollbar-track: #e8e8e8;
  --scrollbar-thumb: #c0c0c0;
  --scrollbar-thumb-hover: #a0a0a0;
  --scrollbar-thumb-active: #909090;
}
```

### Custom Styling

```vue
<template>
  <VueHorizontalScrollbar
    target-selector="#container"
    content-selector="#content"
    class="custom-scrollbar"
  />
</template>

<style>
.custom-scrollbar {
  --scrollbar-bg: rgba(0, 0, 0, 0.1);
  --scrollbar-track: rgba(0, 0, 0, 0.2);
  --scrollbar-thumb: #007acc;
  --scrollbar-thumb-hover: #005a9e;
  --scrollbar-thumb-active: #004578;
}

.custom-scrollbar .custom-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
```

## 📱 Responsive Design

The component includes responsive breakpoints:

```css
/* Mobile devices */
@media (max-width: 768px) {
  .bottom-scrollbar-container {
    padding: 2px 4px;
  }
}
```

## ♿ Accessibility

- **ARIA Labels**  
  Uses appropriate `role`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes to describe the scrollbar’s state.

- **Keyboard Navigation**  
  Fully supports keyboard interactions for navigating content:
  - Arrow keys (`←`, `→`)
  - `Home` and `End` keys

- **Focus Management**  
  Includes visible focus indicators to help keyboard users navigate the interface.

- **Screen Reader Support**  
  Designed with semantic HTML and proper ARIA attributes to ensure compatibility with screen readers.

---

## ⌨️ Keyboard Shortcuts

| Key   | Action           |
|-------|------------------|
| `←`   | Scroll left      |
| `→`   | Scroll right     |
| `Home`| Scroll to start  |
| `End` | Scroll to end    |

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```ts
import type { 
  HorizontalScrollbarProps,
  HorizontalScrollbarEmits,
  ScrollInfo,
  ElementSelector 
} from 'vue2-horizontal-scrollbar'
```

## 🌟 Examples

### Table Horizontal Scroll

```vue
<template>
  <div class="table-container">
    <div id="table-wrapper" class="table-wrapper">
      <table id="wide-table" class="wide-table">
        <thead>
          <tr>
            <th v-for="i in 20" :key="i">Column {{ i }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in 10" :key="row">
            <td v-for="col in 20" :key="col">
              Data {{ row }}-{{ col }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <VueHorizontalScrollbar
      target-selector="#table-wrapper"
      content-selector="#wide-table"
      :height="20"
    />
  </div>
</template>

<style>
.table-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
}

.wide-table {
  min-width: 1200px;
  border-collapse: collapse;
}

.wide-table th,
.wide-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  white-space: nowrap;
}
</style>
```

### Image Gallery

```vue
<template>
  <div class="gallery-container">
    <div id="gallery-scroll" class="gallery-scroll">
      <div id="gallery-content" class="gallery-content">
        <img 
          v-for="i in 10" 
          :key="i"
          :src="`https://picsum.photos/300/200?random=${i}`"
          :alt="`Image ${i}`"
          class="gallery-image"
        />
      </div>
    </div>
    
    <VueHorizontalScrollbar
      target-selector="#gallery-scroll"
      content-selector="#gallery-content"
      :scroll-step="300"
    />
  </div>
</template>

<style>
.gallery-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
}

.gallery-content {
  display: flex;
  gap: 16px;
  padding: 16px 0;
}

.gallery-image {
  flex-shrink: 0;
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>
```
