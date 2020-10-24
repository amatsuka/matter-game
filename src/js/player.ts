import {Bodies, Body, Vector} from "matter-js";
import {HandItem} from "./interfaces";
import WorldObject from "./worldobject";

export default class Player extends WorldObject {
    protected speed: number = 3;

    private handItem: HandItem;

    public useHandItem(point: Vector) {
        if (this.handItem) {
            this.handItem.useToCoordinates(this, point);
        }
    }

    public setHandItem(item: HandItem) {
        this.handItem = item;
    }

}