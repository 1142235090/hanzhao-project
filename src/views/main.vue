<template>
  <div style="height: 100%; width: 100%">
    <!-- 头部区域 -->
    <div class="body-header-div">
      <sellheader></sellheader>
    </div>
    <!-- 功能导航 -->
    <div class="body-nav">
      <sellnav></sellnav>
    </div>
    <!-- 数据展示区域 -->
    <div class="body-content">
      <sellcontent></sellcontent>
    </div>
    <!-- 尾部 -->
    <div class="body-footer">
      <sellfooter></sellfooter>
    </div>
    <!-- 左侧弹出框 -->
    <el-drawer title="菜单导航"
               v-model="leftDrawer"
               :direction="'ltr'"
               destroy-on-close>
    </el-drawer>
    <!-- 右侧弹出框 -->
    <el-drawer title="个人中心"
               v-model="rightDrawer"
               :direction="'rtl'"
               destroy-on-close>
    </el-drawer>
  </div>
</template>

<script>
import sellheader from './header/header'
import sellnav from './nav/nav'
import sellcontent from './content/content'
import sellfooter from './footer/footer.vue'

export default {
  name: 'mainView',
  props: {
    msg: String
  },
  components: {
    sellheader,
    sellnav,
    sellfooter,
    sellcontent
  },
  data () {
    return {
      // 左侧弹出框
      leftDrawer: false,
      // 右侧弹出框
      rightDrawer: false
    }
  }
}
</script>

<style scoped lang="less">
@import url("./main.less");
</style>
