<template>
  <div class="lucky_box">
    <el-alert :title=sucessStr
              type="success"
              style="width: 50%;height: 300px;margin:0 auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"
              :center="true"
              v-if="show"
              @close="close"
              effect="dark"></el-alert>
    <div style="margin:0 auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);">
      <LuckyWheel ref="myLucky"
                  width="300px"
                  height="300px"
                  v-if="lucky"
                  :prizes="prizes"
                  :blocks="blocks"
                  :buttons="buttons"
                  @start="startCallback"
                  @end="endCallback" />
    </div>
  </div>
</template>

<script>
import { LuckyWheel } from '@lucky-canvas/vue'

// createApp(App).use(VueLuckyCanvas).mount('#app')

export default {
  name: 'lucky-canvas',
  components: {
    LuckyWheel
  },
  data () {
    return {
      sucessStr: " ",
      show: false,
      lucky: true,
      blocks: [{ padding: '13px', background: '#617df2' }],
      prizes: [
        { fonts: [{ text: '星巴克', top: '30%' }], background: '#e9e8fe' },
        { fonts: [{ text: '察颜悦色', top: '30%' }], background: '#b8c5f2' },
        { fonts: [{ text: '茶百道', top: '30%' }], background: '#e9e8fe' },
        { fonts: [{ text: 'CoCo', top: '30%' }], background: '#b8c5f2' },
        { fonts: [{ text: '蜜雪冰城', top: '30%' }], background: '#e9e8fe' },
        { fonts: [{ text: '给我介绍一个170女朋友', top: '10%' }], background: '#b8c5f2' },
      ],
      buttons: [{
        radius: '35%',
        background: '#8a9bf3',
        pointer: true,
        fonts: [{ text: '开始', top: '-10px' }]
      }]
    }
  },
  mounted () {
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback () {
      this.close()
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = this.chance()
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index)
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      this.sucessStr = "恭喜您中奖了" + prize.fonts[0].text
      this.show = true
      this.lucky = false
    },
    // 中奖概率计算
    chance () {
      // 生成0-1的随机数
      var rand = Math.random();
      // num代表第几个奖品
      var num = 0;
      // 各个奖品的概率
      if (rand < 0.001) num = 0;
      else if (rand < 0.002) num = 1;
      else if (rand < 0.004) num = 2;
      else if (rand < 0.006) num = 3;
      else if (rand < 0.01) num = 4;
      else if (rand < 1) num = 5;
      return num
    },
    close () {
      this.show = false
      this.lucky = true
    }
  }
}
</script>

<style scoped>
</style>
