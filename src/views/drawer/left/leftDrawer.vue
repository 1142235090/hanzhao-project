<template>
  <div>
    <el-button @click="to">默认按钮</el-button>
    <el-button @click="to">默认按钮</el-button>
    <el-button @click="to">默认按钮</el-button>
    <el-button @click="to">默认按钮</el-button>
    <el-button @click="to">默认按钮</el-button>
    <el-button @click="to">默认按钮</el-button>
    <el-button @click="to">默认按钮</el-button>
  </div>
</template>

<script>
import component from '@/views/cesium/main'

export default {
  name: 'leftdrawer',
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
  components: {

  },
  computed: {

  },
  watch: {

  },
  methods: {
    to () {
      const router = this.$router
      router.addRoute({
        path: '/cesium',
        name: 'cesium',
        component: component
      })
      this.$router.push('/cesium')
    }
  },
  created () {

  },
  mounted () {

  },
  updated () {

  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
</style>
