<template>
  <div>
    <div id='windy'
         style="width:100%;height:937px">
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import { beijing } from './beijing'
import { data } from './windy'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'heatmap.js'
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap.js'
import 'leaflet-velocity/dist/leaflet-velocity'

export default {
  name: 'leafletView',
  data () {
    return {
      map: null,
      token: 'pk.eyJ1IjoiY2hyaXNld2Fybm5lciIsImEiOiJja3NwbjF6bjUwNGJtMm5rdHdlbjhyYm05In0.6bXLpBBZJCFXeYMX6pjL9w',
      option: {
        // 热力图的配置项
        radius: 0.0096, // 设置每一个热力点的半径
        maxOpacity: 1, // 设置最大的不透明度
        minOpacity: 0.1,     // 设置最小的不透明度
        scaleRadius: true, // 设置热力点是否平滑过渡
        blur: 0.95, // 系数越高，渐变越平滑，默认是0.85,
        // 滤镜系数将应用于所有热点数据。始终会出现一个红色斑点
        useLocalExtrema: false, // 使用局部极值
        latField: 'lat', // 维度
        lngField: 'lng', // 经度
        valueField: 'count' // 热力点的值
        // gradient: { // 调整热力颜色和范围
        //   0: 'rgba(255,0,0,1)'
        //   // 0.8: 'rgba(255,255,0,1)',
        //   // 0.7: 'rgba(0,255,0,1)',
        //   // 0.5: 'rgba(0,255,255,1)',
        //   // 0: 'rgba(0,0,255,1)'
        // }
      }
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
      shadowSize: [41, 41],
      points: null
    })
    L.Marker.prototype.options.icon = DefaultIcon
  },
  mounted () {
    // 加载数据
    this.setValue()
    // 初始化
    this.initMap()
    // 增加边界
    this.addBoundary()
    // 增加北京中心点的maker
    this.addMaker()
    // 添加文字
    this.addText()
    // 设置热力图
    this.setHeatMap()
    // 监听热力图放大缩小
    this.changeMap()
    // 增加风场温度
    this.addWindy()
  },
  methods: {
    addWindy () {
      var velocityLayer = L.velocityLayer({
        displayValues: true, // 是否显示当前鼠标移动位置，风场信息
        displayOptions: { // 显示信息配置
          velocityType: 'Global Wind',
          displayPosition: 'bottomleft',
          displayEmptyString: 'No wind data'
        },
        data: data, // 数据  格式可参照
        minVelocity: 0,  // 粒子最小速度（ m/s ）
        maxVelocity: 5,  // 粒子最大速度（ m/s ）
        velocityScale: 0.02,  // 风速的比例 ( 粒子的小尾巴长度 )
        particleAge: 10,  // 粒子在再生之前绘制的最大帧数
        lineWidth: 1,  // 绘制粒子的线宽
        particleMultiplier: 1 / 1200,  // 粒子计数标量（ 粒子密度 ）
        frameRate: 5,  // 每秒所需的帧数
        colorScale: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)']  // 定义自己的 hex / rgb 颜色数组 ( 粒子颜色 )
      })
      velocityLayer.addTo(this.map) // 添加到图上
    },
    initMap () {
      this.map = L.map('windy').setView([40.28, 116.48], 9)
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
      this.heatmapLayer = new HeatmapOverlay(this.option)
      this.heatmapLayer.addTo(this.map)
      this.heatmapLayer.setData(this.points)
    },
    setValue () {
      const data = []
      for (let index = 0; index < 1999; index++) {
        data[index] = {
          lng: (115 + Math.round(Math.random() * 999) / 1000 + Math.round(Math.random() * 1)),
          lat: (39 + Math.round(Math.random() * 999) / 1000 + Math.round(Math.random() * 1)),
          count: 15
        }
      }
      for (let index = 1999; index < 2999; index++) {
        data[index] = {
          lng: (115 + Math.round(Math.random() * 999) / 1000 + Math.round(Math.random() * 2)),
          lat: (39 + Math.round(Math.random() * 999) / 1000 + Math.round(Math.random() * 2)),
          count: 15
        }
      }
      const points = {
        max: 15,
        data: data
      }
      this.points = points
    },
    changeMap () {
      this.map.on('zoomend', e => {
        // 获取当前放大或者缩小的等级
        const num = e.target.getZoom()
        switch (num) {
          case 1:
            this.option.radius = 1.6384
            break
          case 2:
            this.option.radius = 0.8192
            break
          case 3:
            this.option.radius = 0.4096
            break
          case 4:
            this.option.radius = 0.2048
            break
          case 5:
            this.option.radius = 0.1024
            break
          case 6:
            this.option.radius = 0.0512
            break
          case 7:
            this.option.radius = 0.0256
            break
          case 8:
            this.option.radius = 0.0128
            break
          case 9:
            this.option.radius = 0.0096
            break
          case 10:
            this.option.radius = 0.0064
            break
          case 11:
            this.option.radius = 0.0032
            break
          case 12:
            this.option.radius = 0.0016
            break
          case 13:
            this.option.radius = 0.0008
            break
          case 14:
            this.option.radius = 0.0004
            break
        }
        console.log(num)
      })
      // 重新设定热力图
      this.setHeatMap()
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../../node_modules/leaflet/dist/leaflet.css";
@import "../../../../node_modules/leaflet-velocity/dist/leaflet-velocity.css";
:deep(.leaflet-bottom.leaflet-right) {
  display: none;
}
</style>
