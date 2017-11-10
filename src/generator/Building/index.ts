import BuildingDataModel from '../BuildingDataModel';
import AbstractMultiBrick from '../AbstractMultiBrick';
import World from '../../world/classes/World';
import Box from '../../world/classes/bricks/Box';
import * as BABYLON from 'babylonjs';

interface IBuildingOptions{
    sizes: {
        cells: {
          width: number;
          height: number;
        };
        walls:{
            width: number;
            height: number;
        }
    }
}

export default class Building extends AbstractMultiBrick{

    private _building: BuildingDataModel;

    constructor(
        building: BuildingDataModel,
        center: BABYLON.Vector3,
        options: IBuildingOptions,
        world: World
    ){


        const boxes: Box[] = [];

        const floorSize = building.getFloorSize(0);
        console.log('floorSize',floorSize);
        const moveBy = center.add(new BABYLON.Vector3(
            options.sizes.cells.width * (floorSize.x),
            0,
            options.sizes.cells.width * (floorSize.y),
        ).scale(-.5));


        //---------------------------Walls
        const {horizontal, vertical} = building.getFloorWalls(0);
        [{walls: horizontal, rotation: 0}, {walls: vertical, rotation: Math.PI / 2}].forEach(({walls, rotation}) => {

            for (let y = 0; y < walls.length; y++) {
                for (let x = 0; x < walls[y].length; x++) {


                    if (walls[y][x]) {
                        boxes.push(new Box(
                            world,
                            'clay-bricks',
                            new BABYLON.Vector3(
                                options.sizes.cells.width,// - options.wallThick,
                                options.sizes.cells.height,
                                options.sizes.walls.width
                            ),
                            new BABYLON.Vector3(
                                -moveBy.x - (x + Math.cos(rotation) * .5) * options.sizes.cells.width,
                                moveBy.y + options.sizes.walls.height / 2,
                                moveBy.z + (y + Math.sin(rotation) * .5) * options.sizes.cells.width
                            ),
                            new BABYLON.Vector3(
                                0,
                                rotation,
                                0
                            )
                        ));
                    }
                }
            }

        });
        //---------------------------


        //---------------------------Pillars
        const pillars = building.getFloorPillars(0);
        for (let y = 0; y < pillars.length; y++) {
            for (let x = 0; x < pillars[y].length; x++) {
                if(pillars[y][x]){
                    boxes.push(new Box(
                        world,
                        'clay-bricks',
                        new BABYLON.Vector3(
                            options.sizes.walls.width,
                            options.sizes.cells.height,
                            options.sizes.walls.width
                        ),
                        new BABYLON.Vector3(
                            -moveBy.x - x * options.sizes.cells.width,
                            moveBy.y  + options.sizes.cells.height / 2,
                            moveBy.z  + y * options.sizes.cells.width
                        )
                    ));

                }
            }
        }
        //---------------------------


        //---------------------------Plates
        const plateSize = new BABYLON.Vector3(
            options.sizes.cells.width+options.sizes.walls.width,
            options.sizes.walls.height,
            options.sizes.cells.width+options.sizes.walls.width
        );

        const plates = building.getFloorPlates(0);
        for (let y = 0; y < plates.length; y++) {
            for (let x = 0; x < plates[y].length; x++) {
                if(plates[y][x]){
                    boxes.push(new Box(
                        world,
                        'clay-bricks',
                        plateSize,
                        new BABYLON.Vector3(
                            -moveBy.x - x * options.sizes.cells.width - plateSize.x/2,
                            moveBy.y  + options.sizes.cells.height + plateSize.y/2,
                            moveBy.z  + y * options.sizes.cells.width + plateSize.z/2
                        )
                    ));

                }
            }
        }
        //---------------------------


        super(...boxes);
        this._building = building;
    }

    toString():string{
            return this._building.toString();
    }
}