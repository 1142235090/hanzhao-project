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
    // type your function
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
      L.geoJSON(beijing, { style: style }).addTo(this.map) // features是指geojson数据
    },
    addText () {
      // 添加文字
      const myIcon = L.divIcon({
        html: '狗子',
        className: 'my-div-icon',
        iconSize: 30
      })
      L.marker([40.28, 116.48], { icon: myIcon }).addTo(this.map)
    }
  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
@import "../../../../node_modules/leaflet/dist/leaflet.css";
</style>
