//import log from '../../tools/log';
import * as BABYLON from 'babylonjs';
import AbstractBrick from './AbstractBrick';
import AbstractBrickFinite from './AbstractBrickFinite';

export default class Box extends AbstractBrickFinite{

    createBabylonMesh(){
        const globalScale = 10;//todo from matrial
        const width = this.size.x;
        const height = this.size.y;
        const depth = this.size.z;
        const faceUV = [
            new BABYLON.Vector4(0, 0, width / globalScale, height / globalScale),
            new BABYLON.Vector4(0, 0, width / globalScale, height / globalScale),

            new BABYLON.Vector4(0, 0, height / globalScale, depth / globalScale),
            new BABYLON.Vector4(0, 0, height / globalScale, depth / globalScale),

            new BABYLON.Vector4(0, 0, depth / globalScale, width / globalScale),
            new BABYLON.Vector4(0, 0, depth / globalScale, width / globalScale),
        ];
        const meshOptions = {width, height, depth, faceUV};
        this.mesh = BABYLON.MeshBuilder.CreateBox('BoxBrick', meshOptions, this.world.scene);
    }

    get physicsImpostor():number {
        return BABYLON.PhysicsImpostor.BoxImpostor;
    }

    clone():AbstractBrick{
        return new Box(
            this.world,
            this.materialId,
            this.size.clone(),
            this.position.clone(),
            this.rotation.clone(),
            this.linearVelocity.clone(),
            this.angularVelocity.clone(),
        )
    }
}


