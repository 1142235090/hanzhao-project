import cesiumComponent from '@/views/menu/cesium/main'
import leafletComponent from '@/views/menu/leaflet/main'
import echarsmapComponent from '@/views/menu/echarsmap/main'
import jsplumpComponent from '@/views/menu/jsplumb/jsplumb'

const routers = [
  {
    code: '0',
    value: '地图展示',
    typeOptions: [
      { code: '0', value: '3D地球展示界面', index: 1, path: '/cesium', name: 'cesium', component: cesiumComponent },
      { code: '1', value: '2D地图展示', index: 2, path: '/leaflet', name: 'leaflet', component: leafletComponent },
      { code: '2', value: 'echars地图展示', index: 3, path: '/echarsmap', name: 'echarsmap', component: echarsmapComponent }
    ]
  },
  {
    code: '1',
    value: '流程展示',
    typeOptions: [
      { code: '0', value: '流程图显示', index: 3, path: '/jsplumb', name: 'jsplumb', component: jsplumpComponent }
    ]
  }
]

export default routers
