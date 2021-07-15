<template>
  <dv-decoration-8 class="header-left-decorate" />

  <div class="header-center-div">
    <h1>大屏数据展示平台</h1>
    <dv-decoration-5 class="header-center-decorate" />
  </div>

  <dv-decoration-8 :reverse="true"
                   class="header-right-decorate" />
</template>

<script>
export default {
  name: 'sellheader',
  data () {
    return {

    }
  },
  props: {
    prop: {
      type: String,
      required: false
    }
  },
  methods: {
    // type your function
  }
}
</script>

<style scoped lang='less'>
@import url("./header.less");
</style>
