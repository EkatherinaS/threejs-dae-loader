import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  directionalLight.position.set(
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
  controls.update();
}

function focusOnObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const distance = (Math.max(size.x, size.y, size.z) * 3) / 4;
  camera.position.set(
    center.x - distance,
    center.y + distance,
    center.z - distance
  );
  controls.target.copy(center);
  controls.update();
}

let canvas = document.getElementById("viewer");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#fdfff5");

const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
scene.add(directionalLight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(3, 4, 5);

// const loader = new DAELibLoader();
// loader.load(
//   "/public/models/model.dae",
//   (result) => {
//     scene.add(result.model);
//     focusOnObject(result.model);
//   },
//   () => {},
//   (e) => {
//     console.log(e);
//   }
// );

animate();
