<template>
  <div class='container'>
    <img src="//g.csdnimg.cn/common/csdn-footer/images/email.png"
         alt="">
    <a>18833212134@139.com </a>
    <img src="//g.csdnimg.cn/common/csdn-footer/images/cs.png"
         alt="">
    <a> 工作时间早晨七点 </a>
  </div>
</template>

<script>
export default {
  name: 'sellfooter'
}
</script>

<style scoped lang="less">
.container * {
  vertical-align: middle;
}
.container {
  margin-top: 20px;
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
