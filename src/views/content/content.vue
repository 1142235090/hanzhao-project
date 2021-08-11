<template>
  <dv-scroll-ranking-board class="content-ranking-board"
                           :config="rankingConfig" />
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
  <dv-scroll-board class="content-right-scroll"
                   :config="scrollConfig" />
</template>

<script>
import { rankingConfig } from './rankingConfig'
import { chartsOptions } from './chartsOptions'
import { scrollConfig } from './scrollConfig'
import { ringConfig } from './ringConfig'

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
      mergeColor: {}
    }
  },
  props: {
    prop: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang='less'>
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
