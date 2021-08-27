<template>
  <div>
    <div id='echars-map'
         style="width:100%;height:937px">
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { hunan } from './hunanGeo'
export default {
  name: 'echarsMapView',
  data () {
    return {
    }
  },
  components: {

  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const chartDom = document.getElementById('echars-map')
      const myChart = echarts.init(chartDom)
      echarts.registerMap('湖南', hunan)
      var option = {
        tooltip: {
        },
        geo: {
          map: '湖南',
          roam: true,
          emphasis: {
            itemStyle: {
              color: null
            },
            label: {
              show: false
            }
          }
        },
        visualMap: {
          show: false,
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        series: [
          {
            name: '',
            type: 'heatmap',
            blurSize: 10, // 每个点模糊的大小
            minOpacity: 0.03, // 最小的透明度
            maxOpacity: 0.5, // 最大的透明度
            pointSize: 10, // 每个点大小
            coordinateSystem: 'geo', // 采用geo地图坐标模式
            data: this.getHotMapData(),
            zlevel: 1 // z-index
          },
          {
            name: '移动路线',
            type: 'lines',
            coordinateSystem: 'geo',
            geoIndex: 0,
            emphasis: {
              label: {
                show: false
              }
            },
            polyline: true,
            lineStyle: {
              color: '#c46e54',
              width: 5,
              opacity: 1,
              type: 'dotted'
            },
            effect: {
              show: true,
              period: 8,
              color: '#a10000',
              constantSpeed: 80,
              trailLength: 0,
              symbolSize: [20, 12],
              symbol: 'path://M35.5 40.5c0-22.16 17.84-40 40-40s40 17.84 40 40c0 1.6939-.1042 3.3626-.3067 5H35.8067c-.2025-1.6374-.3067-3.3061-.3067-5zm90.9621-2.6663c-.62-1.4856-.9621-3.1182-.9621-4.8337 0-6.925 5.575-12.5 12.5-12.5s12.5 5.575 12.5 12.5a12.685 12.685 0 0 1-.1529 1.9691l.9537.5506-15.6454 27.0986-.1554-.0897V65.5h-28.7285c-7.318 9.1548-18.587 15-31.2715 15s-23.9535-5.8452-31.2715-15H15.5v-2.8059l-.0937.0437-8.8727-19.0274C2.912 41.5258.5 37.5549.5 33c0-6.925 5.575-12.5 12.5-12.5S25.5 26.075 25.5 33c0 .9035-.0949 1.784-.2753 2.6321L29.8262 45.5h92.2098z'
            },
            data: [{
              coords: [
                [111.608019, 26.434516],
                [113.151737, 27.835806],
                [112.607693, 26.900358],
                [111.46923, 27.237842],
                [109.97824, 27, 27.550082],
                [112.008497, 27.728136],
                [112.982279, 28.19409],
                [112.355042, 28.570066],
                [113.132855, 29.37029],
                [111.691347, 29.040225],
                [110.479921, 29.127401]
              ]
            }]
          },
          {
            name: '市名',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.getNameData(),
            encode: {
              value: 2
            },
            symbolSize: function (val) {
              return val[2] / 10
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            zlevel: 99
          }]
      }
      myChart.setOption(option)
    },
    getNameData () {
      const all = []
      hunan.features.forEach(function (value) {
        const item = {}
        item.name = value.properties.name
        item.value = value.properties.cp
        item.value.push(0)
        all.push(item)
      })
      return all
    },
    getHotMapData () {
      const all = []
      hunan.features.forEach(function (value) {
        var item = {}
        item.name = value.properties.name
        item.value = value.properties.cp
        item.value[2] = 0
        all.push(item)
        for (var i = 1; i < 6; i++) {
          item = JSON.parse(JSON.stringify(item))
          item.value[0] = item.value[0] + 0.1
          item.value[1] = item.value[1] + 0.1
          item.value[2] = i
          all.push(item)
        }
      })
      return all
    }
  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
@import "../../../../node_modules/leaflet/dist/leaflet.css";
</style>
