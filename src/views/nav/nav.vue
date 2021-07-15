<template>
  <div class="nav-div">
    <h3>当前监控</h3>
    <dv-digital-flop :config="navConfig[0]" />
  </div>
  <div class="nav-div">
    <h3>当前车辆</h3>
    <dv-digital-flop :config="navConfig[1]" />
  </div>
  <div class="nav-div">
    <h3>当前行人</h3>
    <dv-digital-flop :config="navConfig[2]" />
  </div>
  <div class="nav-div">
    <h3>犯罪分子</h3>
    <dv-digital-flop :config="navConfig[3]" />
  </div>
  <div class="nav-div">
    <h3>流动人口</h3>
    <dv-digital-flop :config="navConfig[4]" />
  </div>
  <div class="nav-div">
    <h3>常驻人口</h3>
    <dv-digital-flop :config="navConfig[5]" />
  </div>
  <div class="nav-div">
    <h3>实有人口</h3>
    <dv-digital-flop :config="navConfig[6]" />
  </div>
  <div class="nav-div">
    <h3>当前监控</h3>
    <dv-digital-flop :config="navConfig[7]" />
  </div>
</template>

<script>
export default {
  name: 'sellnav',
  data () {
    return {
      navConfig: [
        {
          number: [Math.ceil(Math.random() * 100)],
          content: '{nt}个'
        }, {
          number: [Math.ceil(Math.random() * 1000)],
          content: '{nt}辆'
        }, {
          number: [Math.ceil(Math.random() * 10000)],
          content: '{nt}人'
        }, {
          number: [Math.ceil(Math.random() * 10)],
          content: '{nt}人'
        }, {
          number: [Math.ceil(Math.random() * 100000)],
          content: '{nt}人'
        }, {
          number: [Math.ceil(Math.random() * 100000)],
          content: '{nt}人'
        }, {
          number: [Math.ceil(Math.random() * 100000)],
          content: '{nt}人'
        }, {
          number: [Math.ceil(Math.random() * 100000)],
          content: '{nt}人'
        }
      ]
    }
  }
}
</script>

<style scoped lang='less'>
@import url("./nav.less");
</style>
