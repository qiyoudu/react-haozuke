import Axios from 'axios'

// 点击把 value 传入这个函数

function renderOverlays(id) {
  const res = Axios.get('http://localhost:8080/area/map', {
    params: {
      id
    }
  })

  const { nextZoom, type } = this.getTypeAndZoom() //可以获取到下一级的缩放级别和 渲染的形状
  const citys = res.data.body
  // 根据缩放和 形状 创建覆盖物
  citys.forEach(e => {
    this.createOverlays(e, type, nextZoom)
  })
}

function getTypeAndZoom() {
  const zoom = this.map.getZoom() //获取当当前的缩放级别
  let nextZoom, type // 局部变量以供修改
  if (zoom === 11) {
    nextZoom = 13
    type = 'circle'
  } else if (zoom === 13) {
    nextZoom = 15
    type = 'circle'
  } else if (zoom === 15) {
    nextZoom = 15
    type = 'rect'
  }

  return {
    nextZoom,
    type
  }
}
// 创建覆盖物的函数

function createOverlays(item, type, nextZoom) {
  if (type === 'circle') {
    // 创建圆形的覆盖物
    this.createCircle(item, nextZoom)
  } else {
    // 创建方形的覆盖物
    this.createReac(item, nextZoom)
  }
}
