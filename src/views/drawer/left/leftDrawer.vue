<template>
  <div>
    <div style="marginLeft:30px">
      <hzEnum ref="hyEnum"
              :stageOptions="stageOptions"
              :subClick="subClick"></hzEnum>
    </div>
  </div>
</template>

<script>
import cesiumComponent from '@/views/menu/cesium/main'
import leafletComponent from '@/views/menu/leaflet/main'
import echarsmapComponent from '@/views/menu/echarsmap/main'

export default {
  name: 'leftdrawer',
  data () {
    return {
      stageOptions: [
        {
          code: '0',
          value: '3D地球展示',
          typeOptions: [
            { code: '0', value: '3D地球展示界面', index: 1, path: '/cesium', name: 'cesium', component: cesiumComponent },
            { code: '1', value: '2D地图展示', index: 2, path: '/leaflet', name: 'leaflet', component: leafletComponent },
            { code: '2', value: 'echars地图展示', index: 3, path: '/echarsmap', name: 'echarsmap', component: echarsmapComponent }
          ]
        },
        { code: '1', value: '3D地球展示' }
      ]
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
      const router = this.$router
      router.addRoute({
        path: subitem.path,
        name: subitem.name,
        component: subitem.component
      })
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
