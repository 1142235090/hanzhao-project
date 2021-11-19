<template>
  <div>
    <div id='map'
         style="width:100%;height:937px">
    </div>
  </div>
</template>

<script>
import * as L from 'leaflet'
import { beijing } from './beijing'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'heatmap.js'
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap.js'

export default {
  name: 'leafletView',
  data () {
    return {
      map: null,
      token: 'pk.eyJ1IjoiY2hyaXNld2Fybm5lciIsImEiOiJja3NwbjF6bjUwNGJtMm5rdHdlbjhyYm05In0.6bXLpBBZJCFXeYMX6pjL9w'
    }
  },
  components: {

  },
  created () {
    // 替换掉默认的标记图
    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    })
    L.Marker.prototype.options.icon = DefaultIcon
  },
  mounted () {
    // 初始化
    this.initMap()
    // 增加边界
    this.addBoundary()
    // 增加北京中心点的maker
    this.addMaker()
    this.addText()
    this.setHeatMap()
  },
  methods: {
    initMap () {
      this.map = L.map('map').setView([40.28, 116.48], 9)
      // 设置地图切片
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + this.token, {
        id: 'mapbox/satellite-v9',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map)
    },
    addMaker () {
      // 添加maker
      L.marker([40.28, 116.48]).addTo(this.map)
    },
    addBoundary () {
      // 增加瓦片
      const style = {
        color: '#ffffff', // 边框颜色
        weight: 3, // 边框粗细
        opacity: 0.8, // 透明度
        fillColor: 'transparent', // 区域填充颜色
        fillOpacity: 0 // 区域填充颜色的透明
      }
      L.geoJSON(beijing, {
        style: style,
        onEachFeature: function (feature, layer) { // 绑定区域的点击事件
          layer.bindPopup('<h1>' + feature.properties.name + '</h1>')
        }
      }).addTo(this.map) // features是指geojson数据
    },
    addText () {
      // 添加文字
      const myIcon = L.divIcon({
        html: '狗子',
        className: 'my-div-icon',
        iconSize: 30
      })
      L.marker([40.28, 116.48], { icon: myIcon }).addTo(this.map)
    },
    setHeatMap () {
      const option = {
        // 热力图的配置项
        radius: 0.2, // 设置每一个热力点的半径
        maxOpacity: 0.5, // 设置最大的不透明度
        // minOpacity: 0.3,     // 设置最小的不透明度
        scaleRadius: true, // 设置热力点是否平滑过渡
        blur: 0.95, // 系数越高，渐变越平滑，默认是0.85,
        // 滤镜系数将应用于所有热点数据。
        useLocalExtrema: true, // 使用局部极值
        latField: 'lat', // 维度
        lngField: 'lng', // 经度
        valueField: 'count', // 热力点的值
        gradient: { // 调整热力颜色和范围
          0.99: 'rgba(255,0,0,1)',
          0.8: 'rgba(255,255,0,1)',
          0.7: 'rgba(0,255,0,1)',
          0.5: 'rgba(0,255,255,1)',
          0: 'rgba(0,0,255,1)'
        }
      }
      const points = {
        max: 15,
        data: [
          { lng: 116.48, lat: 40.01, count: 1 },
          { lng: 116.48, lat: 40.05, count: 1 },
          { lng: 116.63, lat: 40.13, count: 5 },
          { lng: 116.58, lat: 40.16, count: 1 },
          { lng: 116.68, lat: 40.26, count: 5 },
          { lng: 117.01, lat: 40.31, count: 5 },
          { lng: 116.50, lat: 40.52, count: 4 },
          { lng: 116.47, lat: 40.88, count: 5 },
          { lng: 116.66, lat: 40.91, count: 7 }
        ]
      }
      this.heatmapLayer = new HeatmapOverlay(option)
      this.heatmapLayer.addTo(this.map)
      this.heatmapLayer.setData(points)
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../../node_modules/leaflet/dist/leaflet.css";
:deep(.leaflet-bottom.leaflet-right) {
  display: none;
}
</style>
