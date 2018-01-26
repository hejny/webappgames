import * as BABYLON from 'babylonjs';

export default function createCamera(scene:BABYLON.Scene):BABYLON.FreeCamera{
    //const camera = new BABYLON.FreeCamera("FreeCamera", BABYLON.Vector3.Zero(),  scene);
    //camera.fov = 1.2;

    const camera = new BABYLON.VRDeviceOrientationFreeCamera ("Camera",  BABYLON.Vector3.Zero(), scene);

    return camera;
}