import { IVector2 } from '../../interfaces/IVectors';
import { CHARS } from './config';

export default class BuildingDataModel {

    //private _floorSizes: IVector2[];

    constructor(private _grid: boolean[][][]) {

        /*this._floorSizes =
        this._grid.map((floorGrid)=>{

            if(!(
                floorGrid.length>=3 && floorGrid.length%2===1
            )){
                throw new Error(`Size of floor must be odd number >=3 in every dimension.`);
                //todo check also whole grid
            }

            return {
                x: (floorGrid.length - 1) / 2,
                y: (floorGrid[0].length - 1) / 2
            };


        });*/


    }

    get floors():number{
        return this._grid.length;
    }

    getFloorSize(floorNumber: number):IVector2{
        return {
            y: (this._grid[floorNumber].length-1)/2,
            x: (this._grid[floorNumber][0].length-1)/2,
        };
    }

    getFloorPillars(floorNumber: number) {
        return this._getFloorSubgrid(floorNumber, {x: 0, y: 0});
    }

    getFloorPlates(floorNumber: number) {
        return this._getFloorSubgrid(floorNumber, {x: 1, y: 1});
    }

    getFloorWalls(floorNumber: number) {
        const horizontal = this._getFloorSubgrid(floorNumber, {x: 1, y: 0});
        const vertical = this._getFloorSubgrid(floorNumber, {x: 0, y: 1});
        return {horizontal, vertical}
    }

    private _getFloorSubgrid(floorNumber: number, offset: IVector2): boolean[][] {

        const floorSize = this.getFloorSize(floorNumber);

        let superoffset:number;
        if(offset.x === 1 && offset.y ===1){
            superoffset = -1;
        }else{
            superoffset = 0;
        }

        const subgrid: boolean[][] = [];
        for (let y = 0; y < floorSize.y+offset.x+superoffset; y++) {
            subgrid[y] = [];
            for (let x = 0; x < floorSize.x+offset.y+superoffset; x++) {
                /*console.log(
                    floorSize,
                    this._grid
                    ,floorNumber
                    ,x
                    ,y
                    ,y * 2 + offset.y
                    ,x * 2 + offset.x
                );*/
                //(x<floorSize.x)

                subgrid[y][x] = this._grid
                    [floorNumber]
                    [y * 2 + offset.y]
                    [x * 2 + offset.x];
            }
        }
        return subgrid;
    }

    toString(): string {
        return this._grid
            .map((floorGrid)=>{

                let output = '';
                for (let y = 0; y < floorGrid.length; y++) {
                    for (let x = 0; x < floorGrid[y].length; x++) {
                        output += floorGrid[y][x] ? CHARS.full[y%2][x%2] : CHARS.none[y%2][x%2];
                    }
                    output += '\n';
                }
                return output;

            })
            .join('/n/n');
    }
}