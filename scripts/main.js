
import '/style.css'
import { AmbientLight, Camera, Mesh } from 'three';

let loader = new THREE.GLTFLoader();
const scene = new THREE.Scene();

// perspective camera paramaters (field of view (360 deg) , aspect ratio,viewfrustum)
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background'),
});
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30); // better perspective w/ adding shapes

renderer.render(scene,camera); // render = draw
const shape = new THREE.TorusGeometry(10,3,15,5); 
//const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe:true}); // "wrapping" for shape -- basic does NOT require light source
const material = new THREE.MeshStandardMaterial({color: 0xFF6347}); // uses lighting
const torus = new THREE.Mesh(shape,material);
//scene.add(torus); //ADDS SHAPE INTO SCENE

const pointLight = new THREE.PointLight(0x759D68);
pointLight.position.set(0,0,50);
// 5 5 22   
// -110 110 55
// 
const ambientLight = new THREE.AmbientLight(0xffffff);


const lightHelper = new THREE.PointLightHelper(pointLight);

//scene.add(ambientLight);
scene.add(lightHelper);
scene.add(pointLight);
// generate 1s and 0s alternating for the entire screen
//function addBinary(){
  //  const newNumber = new TH.

//}
//let num1 = "/models/number_one/scene.gltf"
//let num2 = "/models/number_zero/scene.gltf"
let num1 = "/models/zero_test/0.gltf"
let num2 = "models/one_test/1.gltf"
//num1.scale(10,10,10);

// Determine how many numbers to generate based on screen size
/*
function numberCount{
    window.innerHeight 
}
*/

const array = [];
function binary(){

    let number = num1;
    for(let j = 20; j > -30; j = j-7){

    
    for(let i = -39; i < 40; i = i+4)
    {   
        if(Math.floor(Math.random()*2) == 1)
        {
            number = num2;
        }
        else{
            number = num1;
        }

        loader.load(number,function(gltf){
            var model = gltf.scene;
            model.scale.set(10,10,4);
            model.position.set(i,j,0);
            scene.add(gltf.scene);
        });

    }
}
}
binary();


// FIND A WAY TO CHANGE THE POSITION 
console.log(window.innerHeight);
console.log(window.innerWidth);
// to move light position
var lightX = .10;
var lightY = .07    ;
// infinite loop function to call the renderer automatically
function animate(){
    requestAnimationFrame(animate);

    //torus.rotation.x += 0.5;
    //torus.rotation.y += 0.5;
    //torus.rotation.z += 0.5;

    // cause window to resize permanently, better efficiency???
    renderer.setSize(window.innerWidth,window.innerHeight);
    const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.setZ(30); 
    renderer.render(scene,camera);
    if(pointLight.position.x >= 110)
    {
        lightX = -.10; 
    }
    if(pointLight.position.x <= -110)
    {
        lightX = .10;
    }
    if(pointLight.position.y >= 55)
    {
        lightY = -.07;
    }
    if(pointLight.position.y <= -55)
    {
        lightY = .07;
    }
    pointLight.position.x += lightX;
    pointLight.position.y += lightY;
}

animate();  



// DIVIDE SCREEN WIDTH BY SIZE OF NUMBER TO DETERMINE HOW MANY NUMBERS TO GENERATE ON SCREEN
// IF RESIZING WINDOW, RESET AMOUNT?
// ^ IF (X) : FUNCTION () --> REDO AMOUNT