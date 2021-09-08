<template>
  <div id="flow-char-box">
    <div class="item">
      <div id="item-1"
           title="获取格点数据"
           class="state-item">item-1</div>
      <div id="item-2"
           title="获取土壤水分数据"
           class="state-item">item-2</div>
      <div id="item-3"
           title="获取温度降雨数据"
           class="state-item">item-3</div>
    </div>
    <div class="item">
      <div id="item-4"
           title="土壤水分质控"
           class="state-item">item-4</div>
      <div>
        <div id="item-5"
             style="margin-top: 50px;"
             title="格点数据合成"
             class="state-item">item-5</div>
      </div>
    </div>
    <div class="item">
      <div id="item-6"
           title="土壤水分日值平均"
           class="state-item">item-6</div>
      <div id="item-7"
           style="margin-top: 50px;"
           title="格点数据区域切割"
           class="state-item">item-7</div>
    </div>
    <div class="item">
      <div id="item-8"
           title="土壤水分站点融合"
           class="state-item">item-8</div>
    </div>
    <div class="item">
      <div style="width:1px;height:84px"></div>
      <div id="item-9"
           title="OI融合"
           class="state-item">item-9</div>
    </div>
    <div class="item">
      <div style="width:1px;height:84px"></div>
      <div id="item-10"
           title="土壤水分融合产品"
           class="state-item">item-10</div>
    </div>
    <div class="item">
      <div style="width:1px;height:84px"></div>
      <div id="item-11"
           title="创建干旱劳资产品"
           class="state-item">item-11</div>
    </div>
  </div>
</template>

<script>
import { jsPlumb } from 'jsplumb'

export default {
  name: 'landing-page',
  data () {
    return {
      plumbIns: null
    }
  },
  mounted () {
    const $this = this
    const plumbIns = jsPlumb.getInstance()
    this.plumbIns = plumbIns
    plumbIns.ready(function () {
      $this.connect('item-1', 'item-4')
      $this.connect('item-4', 'item-6')
      $this.connect('item-6', 'item-8')
      $this.connect('item-2', 'item-5')
      $this.connect('item-3', 'item-5')
      $this.connect('item-5', 'item-7')
      $this.connect('item-7', 'item-9')
      $this.connect('item-8', 'item-9')
      $this.connect('item-9', 'item-10')
      $this.connect('item-10', 'item-11')
    })
    this.updateColor('item-1', 1)
    this.updateColor('item-2', 1)
    this.updateColor('item-3', 1)
    this.updateColor('item-4', 1)
    this.updateColor('item-5', 1)
    this.updateColor('item-6', 1)
    this.updateColor('item-7', 1)
    this.updateColor('item-8', 1)
    this.updateColor('item-9', 1)
    this.updateColor('item-10', 2)
  },
  methods: {
    connect (sourceClassName, targetClassName) {
      this.plumbIns.connect({
        source: sourceClassName,
        target: targetClassName,
        endpoint: 'Blank', // 端点类型
        connector: ['Flowchart'], // 连接线类型
        anchor: ['Left', 'Right'], // 线段两头连接点位置
        paintStyle: { stroke: '#e2e2e2', strokeWidth: 2 }, // 连接点样式
        overlays: [['Arrow', { width: 12, length: 12, location: 1 }]] // 连接线箭头
      })
    },
    updateColor (className, status) {
      const dom = document.getElementById(className)
      switch (status) {
        case 1:
          dom.style.backgroundColor = '#00ff26b8'
          break
        case 2:
          dom.style.backgroundColor = '#ff0000b8'
          break
      }
      dom.style.color = 'white'
    }
  }
}
</script>

<style scoped>
#flow-char-box {
  height: 100vh;
  width: 100vw;
  background-color: white;
}
.state-item {
  min-width: 80px;
  height: 30px;
  color: #606266;
  background: #f6f6f6;
  border: 2px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  line-height: 30px;
  font-family: sans-serif;
  border-radius: 4px;
  margin: 20px;
  overflow: hidden;
}
.item {
  width: 14.28%;
  height: 200px;
  float: left;
}
</style>
