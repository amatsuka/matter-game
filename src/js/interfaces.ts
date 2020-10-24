import {Vector} from "matter-js";
import WorldObject from "./worldobject";

export interface HandItem {
    useToCoordinates(person: WorldObject, point: Vector): void;
    useToObject(person: WorldObject, object: WorldObject): void;
}

export interface Watchable {
    getPosition(): Vector;
}