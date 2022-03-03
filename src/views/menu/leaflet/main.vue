<template>
  <div>
    <div id="lat-lon"></div>
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
import iconPlane from './icon_plane.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'heatmap.js'
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap.js'
import 'leaflet-velocity/dist/leaflet-velocity'
import 'leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders'
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator'

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
    // // 设置热力图
    // this.setHeatMap()
    // // 监听热力图放大缩小
    // this.changeMap()
    // 增加风场温度
    this.addWindy()
    // // 添加箭头路径
    // this.addSimplePoly()
    // // 添加不规则图形（支持中空）
    // this.addPolygon()
    // // 添加飞机路径
    // this.addflyPoly()
    // 实时显示鼠标所在经纬度
    this.showLatLon()
  },
  methods: {
    addflyPoly () {
      // 计算偏移量用于显示前进到了哪里
      let offset = 0
      // 初始化路线
      let layer = this.fly(offset)
      const $this = this
      // 每过一秒钟更新一下界面生成动画
      setInterval(function () {
        // 清空上一次的界面显示
        $this.map.removeLayer(layer)
        // 增加前进距离
        offset += 1
        // 一旦前进到了100%则从头开始计算
        if (offset === 100) {
          offset = 0
        }
        // 保存layer用于清空上一次界面显示
        layer = $this.fly(offset)
      }, 1000)
    },
    fly (offset) {
      // 路径节点
      const list = [
        [37.431453, 118.693571],
        [38.117473, 117.688322],
        [38.81423, 116.902799],
        [39.478803, 117.331266],
        [39.850917, 117.413663],
        [40.279721, 116.633634]
      ]
      // 路径的参数配置
      const layer = L.polylineDecorator(
        list,
        {
          patterns: [
            {
              offset: 0, // 与起点之间的偏移量(谨慎修改，最好不要设定值，要与起点一致)
              repeat: 10, // 路径线之间的间隔
              symbol: L.Symbol.dash({
                pixelSize: 5, // 线段长度
                pathOptions: {
                  color: '#fff', // 路径颜色
                  weight: 2, // 线段宽度
                  opacity: 1 // 路径透明度
                }
              })
            },
            {
              offset: offset + '%', // 距离起点的偏移量
              repeat: '100%', // 图标与图标之间的距离
              symbol: L.Symbol.marker({
                rotate: true, // 是否修改图标的方向，使其保持和线段一样的前进方向
                markerOptions: {
                  icon: L.icon({
                    iconUrl: iconPlane, // 图标
                    iconAnchor: [16, 16] // 图标大小
                  })
                }
              })
            }
          ]
        }
      )
      layer.addTo(this.map)
      return layer
    },
    addPolygon () {
      // 传入参数为两个数组，第一个为外圈，第二个为内圈
      var polygon = L.polygon([[[54, -6], [55, -7], [56, -2], [55, 1], [53, 0]], [[54, -3], [54, -2], [55, -1], [55, -5]]], { color: '#ff7800', weight: 1 }).addTo(this.map)
      L.polylineDecorator(polygon, {
        patterns: [
          { offset: 0, repeat: 10, symbol: L.Symbol.dash({ pixelSize: 0 }) }
        ]
      }).addTo(this.map)
    },
    addSimplePoly () {
      // const list = [
      //   [39.013479, 115.741221],
      //   [39.182952, 115.857081],
      //   [39.531234, 116.041102],
      //   [39.801857, 116.222377],
      //   [39.891282, 116.308659],
      //   [39.948688, 116.328309]
      // ]
      const list2 = [[39.013479, 115.741221], [39.948688, 116.328309]]
      var arrow = L.polyline(list2, {}).addTo(this.map)
      const layer = L.polylineDecorator(arrow, {
        patterns: [
          { offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({ pixelSize: 15, polygon: false, pathOptions: { stroke: true } }) }
        ]
      })
      layer.addTo(this.map)
    },
    addWindy () {
      // 风场
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
        velocityScale: 0.04,  // 风速的比例 ( 粒子的小尾巴长度 )
        particleAge: 10,  // 粒子在再生之前绘制的最大帧数
        lineWidth: 1,  // 绘制粒子的线宽
        particleMultiplier: 1 / 3600,  // 粒子计数标量（ 粒子密度 ）
        frameRate: 5,  // 每秒所需的帧数
        colorScale: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(255,255,255)']  // 定义自己的 hex / rgb 颜色数组 ( 粒子颜色 )
      })
      velocityLayer.addTo(this.map) // 添加到图上
    },
    initMap () {
      // 设置地图切片
      this.map = L.map('windy').setView([40.28, 116.48], 9)
      // // 蓝色城市地图
      // L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
      //   maxZoom: 18,
      //   minZoom: 5
      // }).addTo(this.map)
      // 地形图
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
      // 模拟数据
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
      // 先取消监听，再重新绑定，避免出现多次重复绑定的问题
      const $this = this
      function change (e) {
        // 获取当前放大或者缩小的等级
        const num = e.target.getZoom()
        switch (num) {
          case 1:
            $this.option.radius = 1.6384
            break
          case 2:
            $this.option.radius = 0.8192
            break
          case 3:
            $this.option.radius = 0.4096
            break
          case 4:
            $this.option.radius = 0.2048
            break
          case 5:
            $this.option.radius = 0.1024
            break
          case 6:
            $this.option.radius = 0.0512
            break
          case 7:
            $this.option.radius = 0.0256
            break
          case 8:
            $this.option.radius = 0.0128
            break
          case 9:
            $this.option.radius = 0.0096
            break
          case 10:
            $this.option.radius = 0.0064
            break
          case 11:
            $this.option.radius = 0.0032
            break
          case 12:
            $this.option.radius = 0.0016
            break
          case 13:
            $this.option.radius = 0.0008
            break
          case 14:
            $this.option.radius = 0.0004
            break
        }
      }
      this.map.off('zoomend', change)
      this.map.on('zoomend', change)
      // 重新设定热力图
      this.setHeatMap()
    },
    showLatLon () {
      // 监听 mousemove 事件
      this.map.on('mousemove', (e) => {
        const latlng = e.latlng
        document.getElementById('lat-lon').innerHTML = latlng
      })
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
