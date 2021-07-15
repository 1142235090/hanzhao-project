<template>
  <div class='container'>
    <img src="//g.csdnimg.cn/common/csdn-footer/images/email.png"
         alt="">
    <a>18833212134@139.com </a>
    <img src="//g.csdnimg.cn/common/csdn-footer/images/cs.png"
         alt="">
    <a> 工作时间早晨七点 </a>
  </div>
  <dv-border-box-9 class="footer-button footer-menus"
                   @click="menusClick()"><a>菜单导航</a></dv-border-box-9>
  <dv-border-box-9 class="footer-button footer-myself"
                   @click="myselfClick()"><a>个人中心</a></dv-border-box-9>
</template>

<script>
export default {
  name: 'sellfooter',
  methods: {
    menusClick () {
      this.$parent.leftDrawer = true
    },
    myselfClick () {
      this.$parent.rightDrawer = true
    }
  }
}
</script>

<style scoped lang="less">
.container * {
  vertical-align: middle;
}
.footer-myself {
  position: absolute;
  float: left;
  right: 0px;
  bottom: 1%;
}
.footer-menus {
  position: absolute;
  float: left;
  left: 0px;
  bottom: 1%;
}
.footer-button {
  width: 100px;
  height: 50px;
  cursor: pointer;
  a {
    line-height: 50px;
  }
}
</style>
