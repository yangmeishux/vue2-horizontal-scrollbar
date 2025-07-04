<template>
  <div class="demo-container">
    <h1>Vue2 Horizontal Scrollbar Demo</h1>

    <!-- 使用 Selector 方式的示例 -->
    <section class="demo-section">
      <h2>1. Using Selectors (Traditional Way)</h2>
      <div class="scroll-container" ref="scrollContainer">
        <div class="wide-content">
          <div v-for="i in 25" :key="i" class="content-block">
            Block {{ i }}
          </div>
        </div>
      </div>

      <VueHorizontalScrollbar 
        ref="scrollbar1" 
        target-selector=".scroll-container" 
        content-selector=".wide-content" 
        @scroll="onScroll1"
      />

      <div class="controls">
        <button @click="scrollTo1(0)">Scroll to Start</button>
        <button @click="scrollToMiddle1">Scroll to Middle</button>
        <button @click="scrollToEnd1">Scroll to End</button>
      </div>
    </section>

    <!-- 使用 Ref 方式的示例 -->
    <section class="demo-section">
      <h2>2. Using Refs (Recommended Way)</h2>
      <div ref="scrollContainer2" class="scroll-container">
        <div ref="scrollContent2" class="wide-content">
          <div v-for="i in 25" :key="`ref-${i}`" class="content-block">
            Ref Block {{ i }}
          </div>
        </div>
      </div>

      <VueHorizontalScrollbar 
        ref="scrollbar2" 
        target-ref="scrollContainer2" 
        content-ref="scrollContent2" 
        @scroll="onScroll2"
      />

      <div class="controls">
        <button @click="scrollTo2(0)">Scroll to Start</button>
        <button @click="scrollToMiddle2">Scroll to Middle</button>
        <button @click="scrollToEnd2">Scroll to End</button>
      </div>
    </section>

    <!-- 状态显示 -->
    <section class="demo-section">
      <h2>Scroll Status</h2>
      <div class="status-panel">
        <div class="status-item">
          <strong>Selector Method:</strong> 
          Scroll: {{ scrollInfo1.scrollLeft }} / {{ scrollInfo1.maxScroll }} 
          ({{ scrollInfo1.scrollPercent.toFixed(1) }}%)
        </div>
        <div class="status-item">
          <strong>Ref Method:</strong> 
          Scroll: {{ scrollInfo2.scrollLeft }} / {{ scrollInfo2.maxScroll }} 
          ({{ scrollInfo2.scrollPercent.toFixed(1) }}%)
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { VueHorizontalScrollbar } from './index'

export default {
  name: 'App',
  components: {
    VueHorizontalScrollbar
  },
  data() {
    return {
      scrollInfo1: {
        scrollLeft: 0,
        maxScroll: 0,
        scrollPercent: 0
      },
      scrollInfo2: {
        scrollLeft: 0,
        maxScroll: 0,
        scrollPercent: 0
      }
    }
  },
  methods: {
    // Selector 方式的方法
    scrollTo1(position) {
      this.$refs.scrollbar1?.scrollToPosition(position)
    },
    scrollToMiddle1() {
      if (this.$refs.scrollbar1) {
        const middle = this.$refs.scrollbar1.maxScroll / 2
        this.scrollTo1(middle)
      }
    },
    scrollToEnd1() {
      this.$refs.scrollbar1?.scrollToEnd()
    },
    onScroll1(info) {
      this.scrollInfo1 = info
    },

    // Ref 方式的方法
    scrollTo2(position) {
      this.$refs.scrollbar2?.scrollToPosition(position)
    },
    scrollToMiddle2() {
      if (this.$refs.scrollbar2) {
        const middle = this.$refs.scrollbar2.maxScroll / 2
        this.scrollTo2(middle)
      }
    },
    scrollToEnd2() {
      this.$refs.scrollbar2?.scrollToEnd()
    },
    onScroll2(info) {
      this.scrollInfo2 = info
    }
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.demo-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
}

.scroll-container {
  width: 100%;
  height: 200px;
  overflow: auto;
  border: 1px solid #eee;
  margin: 20px 0;
  background: white;
}

.wide-content {
  width: 4400px;
  height: 100%;
  background: linear-gradient(45deg, #3498db, #e74c3c, #f39c12, #27ae60);
  display: flex;
  align-items: center;
  padding: 10px;
}

.content-block {
  width: 150px;
  height: 150px;
  margin: 10px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
  flex-shrink: 0;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #3aa876;
}

.status-panel {
  background: #e8f5e8;
  border: 1px solid #c3e6c3;
  border-radius: 4px;
  padding: 16px;
  font-family: monospace;
  font-size: 14px;
}

.status-item {
  margin-bottom: 8px;
  padding: 8px;
  background: white;
  border-radius: 4px;
}

.status-item:last-child {
  margin-bottom: 0;
}

.status-item strong {
  color: #2c3e50;
}
</style>
