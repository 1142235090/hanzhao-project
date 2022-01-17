<template>
  <!-- 左侧轮播图 -->
  <div class="content-ranking-board">
    <div id="basic-chars" />
    <dv-scroll-ranking-board class="dv-scroll-ranking-board"
                             :config="rankingConfig" />
  </div>
  <!-- 四方格子 -->
  <div class="content-center-div">
    <dv-border-box-6 class="content-center-div-dvbox">
      <dv-charts :option="chartsOptions" />
    </dv-border-box-6>
    <dv-border-box-6 class="content-center-div-dvbox">
      <dv-active-ring-chart :config="ringConfig"
                            style="width:100%;height:100%" />
    </dv-border-box-6>
    <dv-border-box-6 class="content-center-div-dvbox">
      <dv-water-level-pond :config="waterLevelConfig"
                           style="width:90%;height:90%;margin:auto;margin-top: 5%;" />
    </dv-border-box-6>
    <dv-border-box-6 class="content-center-div-dvbox">第四个</dv-border-box-6>
  </div>
  <!-- 右侧表格 -->
  <dv-scroll-board class="content-right-scroll"
                   :config="scrollConfig" />
</template>

<script>
import { rankingConfig } from './rankingConfig'
import { chartsOptions } from './chartsOptions'
import { scrollConfig } from './scrollConfig'
import { ringConfig } from './ringConfig'
import { basicChartsOptions } from './basicOptions'
import * as echarts from 'echarts'

export default {
  name: 'sellcontent',
  data () {
    return {
      isShow: false,
      // 表格滑动图
      scrollConfig: scrollConfig,
      // 排名轮播图
      rankingConfig: rankingConfig,
      // 饼图
      chartsOptions: chartsOptions,
      // 动态环图
      ringConfig: ringConfig,
      // 水位图
      waterLevelConfig: {
        data: [66]
      },
      // 基本柱状图
      basicChartsOptions: basicChartsOptions,
      mergeColor: {}
    }
  },
  props: {
    prop: {
      type: String,
      required: false
    }
  },
  mounted () {
    // 基础树状图
    this.basicCharsInit()
  },
  methods: {
    basicCharsInit () { // 基础树状图
      var chartDom = document.getElementById('basic-chars')
      var myChart = echarts.init(chartDom)
      myChart.setOption(this.basicChartsOptions)
      // 每过一秒钟更新一下界面生成动画
      const $this = this
      setInterval(function () {
        const data = $this.basicChartsOptions.series[0].data
        data[0] = Math.round(Math.random() * 500)
        data[1] = Math.round(Math.random() * 500)
        data[2] = Math.round(Math.random() * 500)
        data[3] = Math.round(Math.random() * 500)
        data[4] = Math.round(Math.random() * 500)
        data[5] = Math.round(Math.random() * 500)
        data[6] = Math.round(Math.random() * 500)
        myChart.setOption($this.basicChartsOptions)
      }, 1000)
    }
  }
}
</script>

<style scoped lang='less'>
#basic-chars {
  height: 50%;
}
.dv-scroll-ranking-board {
  width: 100%;
  height: 50%;
  color: #fff;
  overflow: hidden;
}
.content-ranking-board {
  width: 30%;
  height: 100%;
  float: left;
  margin-bottom: -6px;
}
.content-center-div {
  width: 37.87%;
  height: 100%;
  float: left;
  margin-left: 20px;
  margin-right: 20px;
}
.content-center-div-dvbox {
  width: 50%;
  height: 50%;
  float: left;
  display: flex;
}
.content-right-scroll {
  width: 30%;
  height: 100%;
  float: right;
}
</style>
