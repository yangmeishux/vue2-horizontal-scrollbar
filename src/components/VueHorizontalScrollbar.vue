<template>
  <div v-if="isVisible" class="vue-horizontal-scrollbar-container" :class="{
    'show': showScrollbar,
    'disabled': disabled
  }" :style="{
    height: `${height}px`,
    zIndex: zIndex
  }" role="scrollbar" :aria-valuenow="scrollPercent" aria-valuemin="0" aria-valuemax="100"
    :aria-label="ariaLabel">
    <div ref="customScrollbarRef" class="vue-horizontal-scrollbar" @click="handleScrollbarClick">
      <div ref="customScrollbarThumbRef" class="vue-horizontal-scrollbar-thumb" :style="thumbStyle" role="slider"
        tabindex="0" :aria-valuenow="scrollPercent" aria-valuemin="0" aria-valuemax="100"
        @mousedown="handleThumbMouseDown" @touchstart="handleThumbTouchStart" @keydown="handleKeyDown" />
    </div>
  </div>
</template>

<script>
import { throttle } from 'lodash'

export default {
  name: 'VueHorizontalScrollbar',
  props: {
    targetSelector: {
      type: [String, Function, Object],
      required: false
    },
    contentSelector: {
      type: [String, Function, Object],
      required: false
    },
    targetRef: {
      type: String,
      required: false
    },
    contentRef: {
      type: String,
      required: false
    },
    autoShow: {
      type: Boolean,
      default: true
    },
    minScrollDistance: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 16
    },
    enableKeyboard: {
      type: Boolean,
      default: true
    },
    scrollStep: {
      type: Number,
      default: 50
    },
    minThumbWidth: {
      type: Number,
      default: 30
    },
    teleportTo: {
      type: String,
      default: 'body'
    },
    throttleDelay: {
      type: Number,
      default: 16
    },
    zIndex: {
      type: Number,
      default: 9999
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: 'Horizontal scrollbar'
    }
  },
  data() {
    return {
      scrollLeft: 0,
      maxScroll: 0,
      scrollPercent: 0,
      showScrollbar: false,
      isVisible: false,
      isDragging: false,
      dragStartX: 0,
      dragStartScrollLeft: 0,
      targetElement: null,
      contentElement: null,
      resizeObserver: null,
      throttledHandleScroll: null
    }
  },
  computed: {
    thumbStyle() {
      const targetWidth = this.targetElement && this.targetElement.clientWidth || 0
      const contentWidth = this.contentElement && this.contentElement.scrollWidth || 1
      const scrollbarWidth = this.$refs.customScrollbarRef && this.$refs.customScrollbarRef.offsetWidth || 0

      const thumbWidth = Math.max(
        this.minThumbWidth,
        (targetWidth / contentWidth) * scrollbarWidth
      )

      const thumbPosition = this.maxScroll > 0
        ? (this.scrollLeft / this.maxScroll) * (scrollbarWidth - thumbWidth)
        : 0

      return {
        width: thumbWidth + 'px',
        left: thumbPosition + 'px',
      }
    }
  },
  mounted() {
    this.throttledHandleScroll = throttle(() => {
      if (!this.isDragging) {
        this.updateScrollInfo()
      }
    }, this.throttleDelay)

    this.initializeTarget()

    if (this.enableKeyboard) {
      document.addEventListener('keydown', this.handleKeyDown)
    }
  },
  beforeDestroy() {
    this.cleanup()
  },
  methods: {
    getElement(selector) {
      try {
        if (typeof selector === 'string') {
          const element = document.querySelector(selector)
          if (element) {
            return element
          } else {
            console.warn(`[VueHorizontalScrollbar] Element not found: ${selector}`)
            this.$emit('error', new Error(`Element not found: ${selector}`))
          }
        } else if (typeof selector === 'function') {
          return selector() || null
        }
        else if (selector instanceof HTMLElement) {
          return selector
        }
        return null
      } catch (error) {
        console.error('[VueHorizontalScrollbar] Error getting element:', error)
        this.$emit('error', error)
        return null
      }
    },

    getElementByRef(refName) {
      try {
        if (!refName) return null
        
        // 查找当前组件的父级组件
        let parent = this.$parent
        while (parent) {
          if (parent.$refs && parent.$refs[refName]) {
            return parent.$refs[refName]
          }
          parent = parent.$parent
        }
        
        // 如果父级没找到，尝试查找根组件
        const root = this.$root
        if (root && root.$refs && root.$refs[refName]) {
          return root.$refs[refName]
        }
        
        console.warn(`[VueHorizontalScrollbar] Ref not found: ${refName}`)
        this.$emit('error', new Error(`Ref not found: ${refName}`))
        return null
      } catch (error) {
        console.error('[VueHorizontalScrollbar] Error getting element by ref:', error)
        this.$emit('error', error)
        return null
      }
    },

    async initializeTarget() {
      try {
        await this.$nextTick()

        // 优先使用 ref，如果没有则使用 selector
        if (this.targetRef) {
          this.targetElement = this.getElementByRef(this.targetRef)
        } else if (this.targetSelector) {
          this.targetElement = this.getElement(this.targetSelector)
        }

        if (this.contentRef) {
          this.contentElement = this.getElementByRef(this.contentRef)
        } else if (this.contentSelector) {
          this.contentElement = this.getElement(this.contentSelector)
        }

        if (!this.targetElement || !this.contentElement) {
          throw new Error('Target or content element not found. Please provide either targetRef/contentRef or targetSelector/contentSelector.')
        }

        this.setupScrollListener()
        this.setupResizeObserver()
        this.updateScrollInfo()
        this.isVisible = true

        this.$emit('ready')
      } catch (error) {
        console.error('[VueHorizontalScrollbar] Initialization error:', error)
        this.$emit('error', error)
      }
    },

    setupResizeObserver() {
      if (!this.targetElement || !this.contentElement) return

      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollInfo()
      })

      this.resizeObserver.observe(this.targetElement)
      this.resizeObserver.observe(this.contentElement)
    },

    setupScrollListener() {
      if (!this.targetElement) return
      this.targetElement.addEventListener('scroll', this.throttledHandleScroll, { passive: true })
    },

    updateScrollInfo() {
      if (!this.targetElement || !this.contentElement) return

      const newScrollLeft = this.targetElement.scrollLeft
      const newMaxScroll = Math.max(0, this.contentElement.scrollWidth - this.targetElement.clientWidth)
      const newScrollPercent = newMaxScroll > 0 ? (newScrollLeft / newMaxScroll) * 100 : 0

      this.scrollLeft = newScrollLeft
      this.maxScroll = newMaxScroll
      this.scrollPercent = newScrollPercent

      if (this.autoShow) {
        this.showScrollbar = this.maxScroll > this.minScrollDistance
      } else {
        this.showScrollbar = true
      }

      const scrollInfo = {
        scrollLeft: newScrollLeft,
        maxScroll: newMaxScroll,
        scrollPercent: newScrollPercent,
      }
      this.$emit('scroll', scrollInfo)
    },

    scrollToPosition(position) {
      if (!this.targetElement) return

      const clampedPosition = Math.max(0, Math.min(this.maxScroll, position))
      this.targetElement.scrollLeft = clampedPosition
    },

    scrollToEnd() {
      this.scrollToPosition(this.maxScroll)
    },

    handleScrollbarClick(e) {
      if (!this.$refs.customScrollbarRef || !this.$refs.customScrollbarThumbRef || this.disabled) return
      if (e.target === this.$refs.customScrollbarThumbRef) return

      const rect = this.$refs.customScrollbarRef.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const scrollbarWidth = this.$refs.customScrollbarRef.offsetWidth
      const thumbWidth = Number.parseFloat(this.thumbStyle.width)

      const targetScrollLeft = ((clickX - thumbWidth / 2) / (scrollbarWidth - thumbWidth)) * this.maxScroll
      this.scrollToPosition(targetScrollLeft)

      this.$emit('click', e)
    },

    handleThumbMouseDown(e) {
      if (this.disabled) return

      this.startDragging(e.clientX)

      document.addEventListener('mousemove', this.handleMouseMove, { passive: true })
      document.addEventListener('mouseup', this.handleMouseUp, { passive: true })

      e.preventDefault()
      this.$emit('dragStart', e)
    },

    handleThumbTouchStart(e) {
      if (this.disabled) return

      this.startDragging(e.touches[0].clientX)

      document.addEventListener('touchmove', this.handleTouchMove, { passive: false })
      document.addEventListener('touchend', this.handleTouchEnd, { passive: true })

      e.preventDefault()
      this.$emit('dragStart', e)
    },

    startDragging(clientX) {
      this.isDragging = true
      this.dragStartX = clientX
      this.dragStartScrollLeft = this.scrollLeft
    },

    handleMouseMove(e) {
      if (!this.isDragging) return
      this.updateDragPosition(e.clientX)
    },

    handleTouchMove(e) {
      if (!this.isDragging) return
      this.updateDragPosition(e.touches[0].clientX)
      e.preventDefault()
    },

    updateDragPosition(clientX) {
      if (!this.$refs.customScrollbarRef) return

      const deltaX = clientX - this.dragStartX
      const scrollbarWidth = this.$refs.customScrollbarRef.offsetWidth
      const thumbWidth = Number.parseFloat(this.thumbStyle.width)

      const scrollRatio = deltaX / (scrollbarWidth - thumbWidth)
      const newScrollLeft = this.dragStartScrollLeft + (scrollRatio * this.maxScroll)

      this.scrollToPosition(newScrollLeft)
      this.updateScrollInfo()
    },

    handleMouseUp() {
      this.stopDragging()
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      this.$emit('dragEnd', new MouseEvent('mouseup'))
    },

    handleTouchEnd() {
      this.stopDragging()
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchend', this.handleTouchEnd)
      this.$emit('dragEnd', new TouchEvent('touchend'))
    },

    stopDragging() {
      this.isDragging = false
    },

    handleKeyDown(e) {
      if (!this.enableKeyboard || !this.targetElement || this.disabled) return

      let handled = false

      switch (e.key) {
        case 'ArrowLeft':
          this.scrollToPosition(this.scrollLeft - this.scrollStep)
          handled = true
          break
        case 'ArrowRight':
          this.scrollToPosition(this.scrollLeft + this.scrollStep)
          handled = true
          break
        case 'Home':
          this.scrollToPosition(0)
          handled = true
          break
        case 'End':
          this.scrollToEnd()
          handled = true
          break
      }

      if (handled) {
        e.preventDefault()
        this.$emit('keydown', e)
      }
    },

    cleanup() {
      if (this.targetElement) {
        this.targetElement.removeEventListener('scroll', this.throttledHandleScroll)
      }

      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
      }

      document.removeEventListener('keydown', this.handleKeyDown)
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchend', this.handleTouchEnd)
    }
  }
}
</script>

<style>
.vue-horizontal-scrollbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  transform: translateY(100%);
  transition: transform 0.2s ease;
  user-select: none;
}

.vue-horizontal-scrollbar-container.show {
  transform: translateY(0);
}

.vue-horizontal-scrollbar-container.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.vue-horizontal-scrollbar {
  flex: 1;
  height: 12px;
  background-color: #e8e8e8;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.vue-horizontal-scrollbar:hover {
  background-color: #d8d8d8;
}

.vue-horizontal-scrollbar-thumb {
  height: 100%;
  background-color: #c0c0c0;
  border-radius: 6px;
  position: absolute;
  top: 0;
  cursor: grab;
  min-width: 20px;
  transition: background-color 0.2s ease;
}

.vue-horizontal-scrollbar-thumb:hover {
  background-color: #a0a0a0;
}

.vue-horizontal-scrollbar-thumb:active {
  cursor: grabbing;
  background-color: #909090;
}

.vue-horizontal-scrollbar-thumb:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .vue-horizontal-scrollbar-container {
    padding: 2px 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vue-horizontal-scrollbar-container,
  .vue-horizontal-scrollbar,
  .vue-horizontal-scrollbar-thumb {
    transition: none;
  }
}
</style>
