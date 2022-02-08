<template>
  <div id="box">
  </div>
</template>

<script>

import * as THREE from 'three'
import { OrbitControls } from '../../../../node_modules/three/examples/jsm/controls/OrbitControls.js'

let sceneThree = '' // 场景
let meshThree = '' // 网络模型

export default {
  name: 'landing-page',
  data () {
    return {
      renderer: null, // 渲染器
      T0: null, // 计时变量
      camera: null, // 相机
      orbitControls: null // 鼠标监听模块
    }
  },
  mounted () {
    // 1.初始化场景
    this.init()
    // 2.旋转
    // this.rotate()
    // 3.鼠标控制旋转
    this.mouseCtl()
    // 4.添加其他形状物体
    this.addOthers()
    // 5.添加辅助参考坐标系
    this.addHelper()
  },
  methods: {
    init () {
      // 1. 初始化场景
      sceneThree = new THREE.Scene()
      // 2.创建网络模型
      // var geometry = new three.SphereGeometry(60, 40, 40) //创建一个球体几何对象
      var geometry = new THREE.BoxGeometry(100, 100, 100) // 创建一个立方体几何对象Geometry
      // 背景纹理
      // var planeTexture = new THREE.TextureLoader().load('./snow_bg.jpg')
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }) // 材质对象Material
      meshThree = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
      sceneThree.add(meshThree) // 网格模型添加到场景中
      // 3.光源设置
      var point = new THREE.PointLight(0xffffff) // 点光源可添加多个
      point.position.set(-100, -100, -100) // 点光源位置
      sceneThree.add(point) // 点光源添加到场景中
      point = new THREE.PointLight(0xffffff) // 点光源可添加多个
      point.position.set(400, 200, 300) // 点光源位置
      sceneThree.add(point) // 点光源添加到场景中
      var ambient = new THREE.AmbientLight(0x444444) // 环境光
      sceneThree.add(ambient)
      // 4.相机设置
      var width = window.innerWidth // 窗口宽度
      var height = window.innerHeight // 窗口高度
      var k = width / height // 窗口宽高比
      var s = 100 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000) // 创建相机对象
      camera.position.set(200, 200, 200) // 设置相机位置（X 、Y +上-下偏移 、Z +左-右偏移）
      camera.lookAt(sceneThree.position) // 设置相机方向(指向的场景对象)
      this.camera = camera
      // 5.创建渲染器
      var renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height) // 设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色
      document.getElementById('box').appendChild(renderer.domElement) // body元素中插入canvas对象
      renderer.render(sceneThree, camera)// 执行渲染操作   指定场景、相机作为参数
      this.renderer = renderer
    },
    rotate () {
      // 定时旋转
      this.T0 = new Date() // 上次时间
      this.rotateRender()
    },
    rotateRender () {
      // 定时旋转
      const T1 = new Date() // 本次时间
      const t = T1 - this.T0 // 时间差
      this.T0 = T1 // 把本次时间赋值给上次时间
      // requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销
      requestAnimationFrame(this.rotateRender)
      this.renderer.render(sceneThree, this.camera) // 执行渲染操作
      meshThree.rotateY(0.001 * t) // 旋转角速度0.001弧度每毫秒
    },
    mouseCtlRender () {
      // 递归处理
      this.renderer.render(sceneThree, this.camera) // 执行渲染操作
      requestAnimationFrame(this.mouseCtlRender) // 请求再次执行渲染函数render
    },
    mouseCtl () {
      this.mouseCtlRender()
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    addOthers () {
      // 球体网格模型
      var geometry2 = new THREE.SphereGeometry(60, 40, 40)
      var material2 = new THREE.MeshLambertMaterial({
        color: 0xff00ff, // 颜色
        opacity: 0.7, // 透明度设置
        wireframe: true, // 将几何图形渲染成线框 默认false
        transparent: true // 是否开启透明 默认false
      }) // 材质
      var mesh2 = new THREE.Mesh(geometry2, material2) // 网格模型对象Mesh
      mesh2.translateY(120) // 球体网格模型沿Y轴正方向平移120
      sceneThree.add(mesh2)
      // 圆柱网格模型
      var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25)
      var material3 = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        specular: 0x4488ee,
        shininess: 12
      }) // 材质对象
      var mesh3 = new THREE.Mesh(geometry3, material3) // 网格模型对象Mesh
      // mesh3.translateX(120) // 球体网格模型沿Y轴正方向平移120
      mesh3.position.set(120, 0, 0)// 设置mesh3模型对象的xyz坐标为120,0,0
      sceneThree.add(mesh3)
    },
    addHelper () {
      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      var axisHelper = new THREE.AxisHelper(300)
      sceneThree.add(axisHelper)
    }
  }
}
</script>

<style scoped>
</style>
