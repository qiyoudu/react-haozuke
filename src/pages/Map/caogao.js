// 发送ajax 获取所有的数据 进行渲染
const resRoom = await Axios.get('http://localhost:8080/area/map', {
  params: {
    id: value
  }
})
const citys = resRoom.data.body
// console.log(citys)
// 设置state中的数据
this.setState(
  {
    citys
  },
  () => {
    // 如何把这段函数提取出去? map找不到
    this.state.citys.forEach(item => {
      // console.log(item)
      const point = new BMap.Point(item.coord.longitude, item.coord.latitude)
      var opts = {
        // 指定文本标注所在的地理位置
        position: point,
        // 设置文本x轴和y轴的偏移量
        offset: new BMap.Size(-35, -35)
      }
      // 创建文本标注对象
      var label = new BMap.Label(
        `<div class="bubble">
            <p class="name">${item.label}</p>
            <p>${item.count}套</p>
          </div>`,
        opts
      )
      // 设置label的样式
      label.setStyle({
        cursor: 'pointer',
        border: '0px solid rgb(255, 0, 0)',
        padding: '0px',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        color: 'rgb(255, 255, 255)',
        textAlign: 'center'
      })
      // 把文字覆盖物添加到地图上
      map.addOverlay(label)

      // 给label注册事件
      label.addEventListener('click', () => {
        // console.log(this)
        console.log(item.value)
      })
    })
  }
)
