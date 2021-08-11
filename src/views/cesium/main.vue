<template>
  <div style="height:100%">
    <div id="cesiumContainer"
         style="height:100%"></div>
    <div id="loadingOverlay">
      <h1>Loading...</h1>
    </div>
    <div id="toolbar"></div>
  </div>
</template>

<script>
import * as Cesium from 'cesium'

export default {
  name: 'cesium',
  mounted () {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNWUxOGIyMC04N2M2LTRhNDYtODQzYy03YzhkODNiNmIzMTciLCJpZCI6NjM3NDYsImlhdCI6MTYyODQ5NjgyM30.5f6eO5GBCwlPR5GMYNlZcvkDBHsO9Xh7mTybEMzmBBU'
    // 加载google卫星影像
    const viewer = new Cesium.Viewer('cesiumContainer', {
      baseLayerPicker: false, // 隐藏右上角影像拾取
      animation: false, // 隐藏左下角的动画仪表盘
      fullscreenButton: false, // 隐藏全屏按钮
      homeButton: false, // 隐藏home按钮
      geocoder: false, // 隐藏右上角搜索
      sceneModePicker: false, // 隐藏2d3d切换按钮
      timeline: false, // 隐藏时间轴
      navigationHelpButton: false, // 隐藏导航帮助按钮
      scene3DOnly: true, // 仅以3d模式渲染节省内存
      terrainProvider: Cesium.createWorldTerrain()
    })
    // 添加3D建筑
    viewer.scene.primitives.add(Cesium.createOsmBuildings())
    // 飞行到哪个位置
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(116.20, 39.56, 20000000),
      duration: 8 // 多少秒完成跳转
    })
  }
}
</script>

<style scoped lang='less'>
@import "../../../node_modules/cesium/Build/Cesium/Widgets/widgets.css";
/deep/ .cesium-widget-credits {
  visibility: hidden;
}
</style>
