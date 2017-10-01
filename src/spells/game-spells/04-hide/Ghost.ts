//import * as BABYLON from 'babylonjs';
import AbstractSpellOnMeshes from '../../classes/AbstractSpellOnMeshes';

export default class Ghost extends AbstractSpellOnMeshes{

    public EFFECT_COLORS = {
        color1: '#45ff00',
        color2: '#13ffed'
    };

    get price():number{
        return 0;
    }

    finish() {
        super.finish();
        this.firstTargetMesh.material = this.materialFactory.getMaterial('stone-plain-ghost');
        this.firstTargetMesh.physicsImpostor.dispose();
        //this.firstTargetMesh.visibility = 0.7;
    }
}