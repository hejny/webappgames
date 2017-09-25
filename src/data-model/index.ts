import {observable,computed} from "mobx";
import {getCategoryFromSpellId} from '../spells/spellTools';

export default class DataModel {
    @observable currentSpellId = 'spell';
    @computed get currentSpellCategory() {
        return getCategoryFromSpellId(this.currentSpellId)
    }
    @observable health = 1;
    @observable energy = 1000000;



    @observable aimed = false;
    @observable aimedEnergyCost = NaN;
    @observable aimedMessage:string = '';


    @computed get aimStatus():string {
        if(!this.aimed){
            return '';
        }else{
            if(this.aimedEnergyCost<=this.energy)
                return '-aimed';
            else
                return '-aimed-disabled';
        }
    }

}