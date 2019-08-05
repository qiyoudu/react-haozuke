import React from 'react'
// import ReactDOM from 'react-dom'
import './index.scss'
class Map extends React.Component {
  componentDidMount() {
    //访问container  直接访问全局变量 需要通过window
    const map = new window.BMap.Map('container')
    const point = new window.BMap.Point(121, 31)
    const myCity = new window.BMap.LocalCity()
    myCity.get(res => {
      console.log(res.name) //可以获取到本地的名字
    })
    map.centerAndZoom(point, 18)
    var marker = new window.BMap.Marker(point) // 创建标注
    map.addOverlay(marker) // 将标注添加到地图中
    //marker.setAnimation(window.BMAP_ANIMATION_BOUNCE) //跳动的动画
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className="map">
          <div id="container" />
        </div>
      </div>
    )
  }
}

export default Map
