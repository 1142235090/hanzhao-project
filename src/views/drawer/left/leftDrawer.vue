<template>
  <div style="z-index:999">
    <div style="marginLeft:30px">
      <hzEnum ref="hyEnum"
              :stageOptions="stageOptions"
              :subClick="subClick"></hzEnum>
    </div>
  </div>
</template>

<script>
import routers from '@/views/router'

export default {
  name: 'leftdrawer',
  data () {
    return {
      stageOptions: routers
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
    subClick (j, subitem, item) {
      this.$router.push(subitem.path)
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
