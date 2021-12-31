<template>
  <div id="box">
  </div>
</template>

<script>

import * as THREE from 'three'

export default {
  name: 'landing-page',
  data () {
    return {
    }
  },
  mounted () {
    // 创建场景
    const scene = new THREE.Scene()
    // 创建模型并添加到场景中
    const geometry = new THREE.BoxGeometry(4, 4, 4)
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // const geometry2 = new THREE.BoxGeometry(4, 4)
    // const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    // const cube2 = new THREE.Mesh(geometry2, material2)
    // scene.add(cube2)

    // 创建光源
    const point = new THREE.PointLight(0xffffff)
    point.position.set(4, 2, 3) // 点光源位置
    scene.add(point) // 点光源
    const ambient = new THREE.AmbientLight(0x444444)
    scene.add(ambient) // 环境光源
    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 创建相机
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.3, 10000)
    document.getElementById('box').appendChild(renderer.domElement)

    camera.position.z = 5
    this.renderer = renderer
    this.camera = camera
    this.scene = scene
    this.cube = cube
    this.animate()
  },
  methods: {
    animate () {
      requestAnimationFrame(this.animate)
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style scoped>
</style>
