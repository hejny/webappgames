import AbstractResize from './AbstractResize';

export default class Grow extends AbstractResize{
    get scaling():number{
        return 1.2;
    }
}