<template>
  <div style="height: 100%; width: 100%">
    <div id="enums"
         @click="menusClick()">
      菜单导航
    </div>
    <div id="personal"
         @click="myselfClick()">
      用户中心
    </div>
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
               :size="'20%'"
               destroy-on-close>
      <leftDrawer></leftDrawer>
    </el-drawer>
    <!-- 右侧弹出框 -->
    <el-drawer title="个人中心"
               :size="'20%'"
               v-model="rightDrawer"
               :direction="'rtl'"
               destroy-on-close>
      <rightDrawer></rightDrawer>
    </el-drawer>
  </div>
</template>

<script>
import sellheader from './main/header/header'
import sellnav from './main/nav/nav'
import sellcontent from './main/content/content'
import sellfooter from './main/footer/footer.vue'
import leftDrawer from './drawer/left/leftDrawer.vue'
import rightDrawer from './drawer/right/rightDrawer.vue'

export default {
  name: 'mainView',
  props: {
    msg: String
  },
  components: {
    sellheader,
    sellnav,
    sellfooter,
    sellcontent,
    rightDrawer,
    leftDrawer
  },
  data () {
    return {
      // 左侧弹出框
      leftDrawer: false,
      // 右侧弹出框
      rightDrawer: false
    }
  },
  methods: {
    menusClick () {
      this.leftDrawer = true
    },
    myselfClick () {
      this.rightDrawer = true
    }
  }
}
</script>

<style scoped lang="less">
@import url("./main.less");
</style>
