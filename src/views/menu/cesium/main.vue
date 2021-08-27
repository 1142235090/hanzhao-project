<template>
  <div style="height:100%">
    <div id="cesiumContainer"
         style="height:100%"></div>
    <h1 style="position: fixed;left: 25px;bottom: 0px;"
        @click="goBack()">返回</h1>
  </div>
</template>

<script>
import * as Cesium from 'cesium'
import { point } from './beijingMap'

export default {
  name: 'cesium',
  data () {
    return {
      viewer: null,
      tToken: 'f6e0dd069621b5acd0f1e465d7dd8001',
      tUrl: 'https://t{s}.tianditu.gov.cn/',
      tSubdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      cesiumToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NTY1NmJjOC0zODFmLTQ2YTEtYTkzYy0xNzk1OGFkZjM3ZDQiLCJpZCI6NjM3NDYsImlhdCI6MTYyODQ5Njc1Mn0.UHPqDl4B7vQYsliMKq2mDUU9mDtL06pOyoeOgZ0ClxE'
    }
  },
  mounted () {
    // 1.初始化3D地球
    this.initCesium()
    // 2.飞行到北京，并添加坐标点
    this.cesiumFlyTo(117.3, 39.9, 800000, this.addPoint)
    // 3.添加地图影像
    this.addImageryLayers()
    // 4.添加国界线
    this.addCountryLine()
    // 5.添加遮罩层
    this.addMask()
  },
  methods: {
    initCesium () {
      Cesium.Ion.defaultAccessToken = this.cesiumToken
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
        terrainProvider: Cesium.createWorldTerrain()
      })
      // 添加3D建筑
      viewer.scene.primitives.add(Cesium.createOsmBuildings())
      this.viewer = viewer
    },
    cesiumFlyTo (x, y, height, complete) {
      // 飞行到哪个位置
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, height),
        duration: 8, // 多少秒完成跳转
        complete: complete // 完成后的执行函数
      })
    },
    addImageryLayers () {
      // 加载天地图影像
      const imgMap = new Cesium.UrlTemplateImageryProvider({
        url: this.tUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + this.tToken,
        subdomains: this.tSubdomains,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 18
      })
      this.viewer.imageryLayers.addImageryProvider(imgMap)
    },
    addCountryLine () {
      // 叠加国界服务
      var iboMap = new Cesium.UrlTemplateImageryProvider({
        url: this.tUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + this.tToken,
        subdomains: this.tSubdomains,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 10
      })
      this.viewer.imageryLayers.addImageryProvider(iboMap)
    },
    addPoint () {
      // 添加坐标点
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(116.20, 39.56),
        point: {
          pixelSize: 30,
          color: Cesium.Color.RED
        }
      })
      // 添加文字
      this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(116.328327, 39.945162),
        label: {
          text: '北京',
          font: '24px Helvetica',
          fillColor: Cesium.Color.SKYBLUE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE
        }
      })
    },
    addMask () {
      // 添加遮罩层,遮罩层是按照顺序叠加起来的会被覆盖，如果透明则会变色
      const entities = this.viewer.entities
      var stripeMaterial = new Cesium.StripeMaterialProperty({
        evenColor: Cesium.Color.YELLOW.withAlpha(0.5),
        oddColor: Cesium.Color.YELLOW.withAlpha(0.5),
        repeat: 5.0
      })
      entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(point.c100010)
          ),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 4,
          material: stripeMaterial
        }
      })
      stripeMaterial = new Cesium.StripeMaterialProperty({
        evenColor: Cesium.Color.BLUE.withAlpha(0.5),
        oddColor: Cesium.Color.BLUE.withAlpha(0.5),
        repeat: 5.0
      })
      entities.add({
        polygon: {
          hierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(point.c100000)
          ),
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 4,
          material: stripeMaterial
        }
      })
    },
    goBack () {
      // 返回上个界面
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../../node_modules/cesium/Build/Cesium/Widgets/widgets.css";
/deep/ .cesium-widget-credits {
  visibility: hidden;
}
/deep/ .cesium-infoBox-visible {
  visibility: hidden;
}
</style>
