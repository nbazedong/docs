// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import mediumZoom from 'medium-zoom'
import { onMounted, nextTick } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(async () => {
      await nextTick()
      
      // 创建自定义缩放功能
      const createCustomZoom = () => {
        // 选择所有需要缩放的图片，包括列表项中的图片
        const images = document.querySelectorAll('div[class*="language-"] img, p img, li img, h1 img, h2 img, h3 img, h4 img, h5 img, h6 img, .content img')
        
        // 为每个图片添加点击事件
        images.forEach(img => {
          // 设置基本样式
          img.style.cursor = 'zoom-in'
          img.classList.add('zoomable-image')
          
          // 移除可能已存在的事件监听器，避免重复
          img.removeEventListener('click', img._zoomClickHandler)
          
          // 创建并存储点击处理函数
          img._zoomClickHandler = (e) => {
            e.preventDefault()
            showZoomedImage(img)
          }
          
          // 添加点击事件
          img.addEventListener('click', img._zoomClickHandler)
        })
      }
      
      // 存储当前缩放状态
      let zoomActive = false
      let zoomContainer = null
      let zoomedImg = null
      
      // 拖动变量
      let isDragging = false
      let startX = 0
      let startY = 0
      let initialTranslateX = 0
      let initialTranslateY = 0
      let dragStartTime = 0
      let wasDragging = false // 用于跟踪是否真正发生了拖动
      let dragDistance = 0 // 用于记录拖动距离
      
      // 显示缩放图片
      const showZoomedImage = (img) => {
        if (zoomActive) return
        
        zoomActive = true
        
        // 创建背景遮罩
        const overlay = document.createElement('div')
        overlay.className = 'custom-zoom-overlay'
        document.body.appendChild(overlay)
        
        // 创建缩放容器
        zoomContainer = document.createElement('div')
        zoomContainer.className = 'custom-zoom-container'
        
        // 创建关闭按钮
        const closeButton = document.createElement('div')
        closeButton.className = 'custom-zoom-close'
        closeButton.innerHTML = '×'
        closeButton.title = '关闭预览'
        zoomContainer.appendChild(closeButton)
        
        // 创建提示文本
        const hint = document.createElement('div')
        hint.className = 'custom-zoom-hint'
        hint.textContent = '使用鼠标滚轮缩放，按住鼠标拖动图片，点击图片或背景退出'
        zoomContainer.appendChild(hint)
        
        // 克隆原始图片
        zoomedImg = document.createElement('img')
        zoomedImg.src = img.src
        zoomedImg.className = 'custom-zoomed-image'
        zoomedImg.style.maxWidth = '90vw'
        zoomedImg.style.maxHeight = '90vh'
        zoomContainer.appendChild(zoomedImg)
        
        document.body.appendChild(zoomContainer)
        
        // 等待图片加载完成后显示
        zoomedImg.onload = () => {
          // 居中显示
          zoomContainer.style.display = 'flex'
          zoomContainer.style.opacity = '1'
          
          // 添加关闭事件
          overlay.addEventListener('click', closeZoom)
          closeButton.addEventListener('click', closeZoom)
          
          // 添加图片点击事件
          zoomedImg.addEventListener('click', (e) => {
            // 阻止事件冒泡，确保不触发拖动
            e.stopPropagation()
            // 只有在没有真正拖动的情况下才关闭
            if (!wasDragging) {
              closeZoom()
            }
          })
          
          // 添加拖动事件
          zoomedImg.addEventListener('mousedown', startDrag)
          
          // 添加滚轮缩放事件
          document.addEventListener('wheel', handleWheel, { passive: false })
          
          // 添加ESC键关闭
          document.addEventListener('keydown', handleKeyDown)
        }
      }
      
      // 开始拖动
      const startDrag = (e) => {
        if (!zoomActive || !zoomedImg) return
        
        e.preventDefault()
        e.stopPropagation()
        
        isDragging = true
        wasDragging = false // 重置拖动状态标志
        dragDistance = 0 // 重置拖动距离
        startX = e.clientX
        startY = e.clientY
        
        // 记录拖动开始时间，用于判断是否是点击
        dragStartTime = Date.now()
        
        // 解析当前transform
        const transform = zoomedImg.style.transform || ''
        initialTranslateX = 0
        initialTranslateY = 0
        
        const translateMatch = transform.match(/translate3d\(([^,]+),\s*([^,]+),/)
        if (translateMatch && translateMatch[1] && translateMatch[2]) {
          initialTranslateX = parseFloat(translateMatch[1])
          initialTranslateY = parseFloat(translateMatch[2])
        }
        
        // 添加拖动事件
        document.addEventListener('mousemove', drag)
        document.addEventListener('mouseup', stopDrag)
        
        // 视觉反馈
        zoomedImg.style.cursor = 'grabbing'
      }
      
      // 执行拖动
      const drag = (e) => {
        if (!isDragging || !zoomedImg) return
        
        e.preventDefault()
        e.stopPropagation()
        
        // 计算位移
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        
        // 计算拖动距离
        dragDistance = Math.sqrt(dx * dx + dy * dy)
        
        // 如果拖动距离超过阈值，标记为真正的拖动
        if (dragDistance > 5) {
          wasDragging = true
        }
        
        // 计算新位置
        const translateX = initialTranslateX + dx
        const translateY = initialTranslateY + dy
        
        // 获取当前缩放比例
        let scale = 1
        const transform = zoomedImg.style.transform || ''
        const match = transform.match(/scale\(([0-9.]+)\)/)
        if (match && match[1]) {
          scale = parseFloat(match[1])
        }
        
        // 应用变换，同时保持缩放比例
        applyTransform(scale, translateX, translateY)
      }
      
      // 停止拖动
      const stopDrag = (e) => {
        if (!isDragging || !zoomedImg) return
        
        e.preventDefault()
        e.stopPropagation()
        
        // 计算拖动持续时间
        const dragDuration = Date.now() - dragStartTime
        
        isDragging = false
        
        // 移除拖动事件
        document.removeEventListener('mousemove', drag)
        
        // 视觉反馈
        zoomedImg.style.cursor = 'grab'
      }
      
      // 应用变换
      const applyTransform = (scale, translateX = null, translateY = null) => {
        if (!zoomedImg) return
        
        // 如果未提供位移，保持当前位移
        if (translateX === null || translateY === null) {
          const transform = zoomedImg.style.transform || ''
          const translateMatch = transform.match(/translate3d\(([^,]+),\s*([^,]+),/)
          
          if (translateMatch && translateMatch[1] && translateMatch[2]) {
            translateX = translateX !== null ? translateX : parseFloat(translateMatch[1])
            translateY = translateY !== null ? translateY : parseFloat(translateMatch[2])
          } else {
            translateX = translateX !== null ? translateX : 0
            translateY = translateY !== null ? translateY : 0
          }
        }
        
        // 应用变换
        zoomedImg.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
      }
      
      // 处理ESC键
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeZoom()
        }
      }
      
      // 滚轮缩放逻辑
      const handleWheel = (e) => {
        if (!zoomActive || !zoomedImg) return
        
        e.preventDefault()
        
        // 获取当前缩放比例
        let scale = 1
        const transform = zoomedImg.style.transform || ''
        const match = transform.match(/scale\(([0-9.]+)\)/)
        if (match && match[1]) {
          scale = parseFloat(match[1])
        }
        
        // 调整缩放比例
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        scale = Math.max(0.5, Math.min(4, scale + delta))
        
        // 应用缩放
        applyTransform(scale)
      }
      
      // 关闭缩放视图
      const closeZoom = () => {
        if (!zoomActive) return
        
        // 移除事件监听
        document.removeEventListener('wheel', handleWheel)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', stopDrag)
        
        // 移除DOM元素
        const overlay = document.querySelector('.custom-zoom-overlay')
        if (overlay) {
          document.body.removeChild(overlay)
        }
        
        if (zoomContainer) {
          document.body.removeChild(zoomContainer)
        }
        
        // 重置状态
        zoomActive = false
        zoomContainer = null
        zoomedImg = null
        isDragging = false
        wasDragging = false
      }
      
      // 初始化自定义缩放
      createCustomZoom()
      
      // 监听路由变化，重新初始化
      const observer = new MutationObserver(() => {
        setTimeout(createCustomZoom, 500)
      })
      
      // 监视内容区域的变化
      const content = document.querySelector('.VPContent')
      if (content) {
        observer.observe(content, { childList: true, subtree: true })
      }
    })
  }
}