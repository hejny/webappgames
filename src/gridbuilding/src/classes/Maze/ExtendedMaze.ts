/*import {createGrid, createStarts, finishGrid} from './PerfectMaze';
import { IVector2 } from '../../interfaces/IVectors';
import BuildingDataModel from '../BuildingDataModel';

function createStartsExtended(size:IVector2){
    return createStarts(size).filter((position)=>Math.random()>.5);
}

function finishGridExtended(grid:boolean[][],starts:IVector2[]) {
    for(let i=0;i<5;i++){
        const randomStart = starts[Math.floor(Math.random() * starts.length)];
        grid[randomStart.y][randomStart.x] = true;
    }
    finishGrid(grid,starts);
}


export default class ExtendedMaze extends BuildingDataModel{
    constructor(size:IVector2) {
        const grid = createGrid(size);
        //finishGridExtended;createStartsExtended;
        finishGridExtended(grid,createStartsExtended(size));
        super([grid]);
    }
}*/