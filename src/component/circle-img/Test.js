import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

var DOT_SIZE = 16;
var WIDTH = 151;
var HEIGHT = 52;

var renderer, scene, camera, particleSystem;
var uniforms, attributes;
var controls;
var ROTATE = true;
var imageData;

init();

function init() {
  // dom
  var container = document.getElementById('container');

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 300;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.userPan = false;
  controls.userPanSpeed = 0.0;
  controls.maxDistance = 5000.0;
  controls.maxPolarAngle = Math.PI * 0.495;
  //controls.rotateUp(Math.PI * 0.1);
  controls.autoRotate = ROTATE;
  controls.autoRotateSpeed = 4.0;

  // scene
  scene = new THREE.Scene();

  // particle system geometry
  const geometry = new THREE.BufferGeometry();

  // material
  attributes = {
    size: {
      type: 'f',
      value: []
    },
    customColor: {
      type: 'c',
      value: []
    }
  };

  uniforms = {
    amplitude: {
      type: "f",
      value: 1.0
    },
    color: {
      type: "c",
      value: new THREE.Color(0xffffff)
    }
  };

  // material
  var material = new THREE.ShaderMaterial({

    uniforms: uniforms,
    attributes: attributes,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,

    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true

  });

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    var particles = WIDTH * HEIGHT;
    var positions = new Float32Array(particles * 3);
    var colors = new Float32Array(particles * 3);
    var sizes = new Float32Array(particles);
    var color = new THREE.Color();
    var idx = 0;
    for (var y0 = 0; y0 < HEIGHT; y0++) {
      for (var x0 = 0; x0 < WIDTH; x0++) {
        var idx = y0 * WIDTH + x0;
        var i = idx * 4;
        var r = imageData.data[i + 0];
        var g = imageData.data[i + 1];
        var b = imageData.data[i + 2];
        var a = imageData.data[i + 3];

        // positions
        var x = Math.sin(2 * Math.PI * x0 / WIDTH) * DOT_SIZE / 2 * 10;
        var y = (HEIGHT / 2 - y0 + 5) * DOT_SIZE / 2 * 0.4;
        var z = Math.cos(2 * Math.PI * x0 / WIDTH) * DOT_SIZE / 2 * 10;

        positions[idx * 3 + 0] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        // colors
        colors[idx * 3 + 0] = r / 256
        colors[idx * 3 + 1] = g / 256;
        colors[idx * 3 + 2] = b / 256;

        sizes[idx] = DOT_SIZE * 1.0;
        idx++;
      }
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // particle system
    particleSystem = new THREE.Points(geometry, material);
    particleSystem.dynamic = true;

    scene.add(particleSystem);

    animate();

  };
  //img.src = "mario.png";
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAA0CAYAAACHF6o5AAAEq0lEQVR4Xu2cLXLcMBTH5ZnCTFl6gh5hQQ8QGFC4oDSopKAzCeuWbWcKSopKCwIDCnOAgD1CT9BlncLMqPOkffaTLdv6sq2Vn1HWlizpr5/fhyynEnywAhMpUE10X75tRgrIw05id6rNbrY5n62hjLQusitSiBqgGiQh1PwyXOaUd4Q6XeaHwfJo2MDqFDvs1Km1Wq4GqPse47I1zjNoJzn24rLW7vbwXp39svku4G+AicJXnazZHOY7hwnSwvQB1adCA1oOY5hjrqxtAFgAEcKEhYzfG221lOVaEVzSGypQCMBCGDVkqwWMwgVCoOWi1qsma7NbDVzhYKFaDJhAl0ihQrCoqbsVx1nBWvKJDwMLrVYbrub8ai0YzQg7/nNmi0Vc8OzhQjhYQ3CtDDD70oMUkkQIldC/54yzKE1zP+lhYGHwDm6QZoy2JGAFMdjQ0gMC1VgPyJcqNc/gQu/EcbY5n60hWMsLCt6ptaIx1lB2WTBgtfsjGaBpLWxLhGXDFQ6WDS4XT14oYN3Vdqlo0u5PgyX/VqJ6af69F6/UtdIsVxxYoXAVHIMBYLA4qt3cH5dHTZQIVzxYTtINFCrUgtFVeRfASoNrebCQucIAcwdLx1pLHVM1ng9YBQJmZn065mqOZYGaeikiP7AKBGwpa+TTbmrLlS9YDJgPF0nKpoQrf7AYsCTQuN4kFVznAxYD5spGdLkUcJ0fWAxYNDguN4iFKwwsuh/LpZe+ZXzuX9gyha9UU5aPgSscLByR7+7TUz1pbndWZytzb5cu6Xp/BmwSxkLhCgMLhjC2q2FkmDaw2lXqQbnC1fQrVI9JJufcbxoiZjhYCeDaby9rzTsfI/zexcHLFiwpz75whYHlsx9rYHgA1ujHCPrzKT+3SNtkwJIB5gNXGFjUWrnux+oZHoULigx9jFCBFQs9GLBQ5Yx6rnCFg2WDK7Dr6BLHPka4uz8GtkCqMWDRGrrAFQdWQrhwtPJ1v1WKslhtORmwKMDG4IoHK6p73cqYLXb2ivtkhj59YsB81HJ2i9mCBSOgcE0OGgMWBFif5coaLISLjph+UqWup7ZkDJg3YDa4sgMLRlXHWeoDT2n9CEEBhv/NJSZb7JORAfMCrA1XlmAZcKl1rE/WQcrD5/p80sCetsaAOQNG4coWLApXH1h1JnkCbDK4mux3LBlynoRSC6JAWYNliL8lW8bvT923nZt6xtiCjSoMs3M2YNH3iu2F0qFroyqEFmDABpWrnq4v5ObDz8FCL67eiqfrC9Eud/j2TtWbo/5eNC+soc2Pjz8Ebf/r1Y0xBriORw79X1q/Jdqvnh8fJE5SH2Fvfv0Tz48P9WRiub7z7ftw/XXqx3BZHhp+OEwFQo0Dw8VwdTxSqofLCy6MXULdItfXseta9HOGC0QB80gPDBJdYjauvz79nOGCgL59gCWyBfp9ZpXrmwqUrp8XXG0LxdmiPQtMFbOMuc/c9We4OKDPI6Bny6UXjccsClsurYB+/SOEkcW4CkgDfJoFcX03AEvXT7lFkAKCSxtkQ34dr3F91s/GTx1z4ftBLITP3lA2SMHj+vr9LOunjRS6xXaIwL9ZgSQK/AcPml5KUMyndgAAAABJRU5ErkJggg=="

}

function animate() {

  requestAnimationFrame(animate);
  render();
}

function render() {

  controls.update();

  // render
  renderer.render(scene, camera);

}