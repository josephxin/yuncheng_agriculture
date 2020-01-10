import React, {Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import BarPic from './barBg.png';

class BarChart extends Component {
  constructor(props) {
    super(props);
    const me = this;
    const width = props.width || 500;
    const height = props.height || 500;
    me._renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    me._renderer.setSize(width, height);
    me._scene = new THREE.Scene();
    me._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    me._camera.position.set(100, 50, 100);
    me._width = width;
    me._height = height;
  }

  get renderer() {
    return this._renderer;
  }

  get domElement() {
    return this._renderer.domElement;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get scene() {
    return this._scene;
  }

  get camera() {
    return this._camera;
  }

  render() {
    return (
      <div style={{position: 'relative', top: 100, left: -60}}>
        <img style={{position: 'absolute', top: 43, left: 645, zIndex: 1}} src={'./static/image/zhny.png'}
             alt={'智慧农业底座背景'}/>
        <div ref={'box'} style={{position: 'absolute', top: 100, left: '40%'}}></div>
      </div>
    )
  }

  componentDidMount() {
    const me = this;
    const light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(1, 1, 1);
    const dLight = new THREE.DirectionalLight(0xffffff);
    dLight.position.set(100, 200, 50);
    me.scene.add(dLight);
    me.scene.add(light);
    // 添加物体
    const sphereBufferGeometry = new THREE.CylinderGeometry(50, 50, 15, 50, 50, true);
    const geoMesh = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(BarPic)});
    const mesh = new THREE.Mesh(sphereBufferGeometry, geoMesh);

    me.scene.add(mesh);
    me.renderer.render(me.scene, me.camera);
    me.refs.box.appendChild(me.domElement);

    console.log(me.scene);
    const orbitControls = new OrbitControls(me.camera, me.domElement);
    orbitControls.autoRotate = true;

    function animate() {
      me.renderer.render(me.scene, me.camera);
      orbitControls.update();
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default BarChart;
