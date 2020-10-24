import WorldObject from "../worldobject";
import {Watchable} from "../interfaces";
import {Vector} from "matter-js";
import AbstractBehavior from "./abstractbehavior";

export default class WatchObject extends AbstractBehavior {
    private person: WorldObject;
    private watchable: Watchable;
    private finalized: boolean = false;

    public constructor(id: number, person: WorldObject, watchable: Watchable) {
        super(id);
        this.person = person;
        this.watchable = watchable;
    }

    public doAction():void {
        let playerPosition = this.person.getPosition();
        let mousePosition = this.watchable.getPosition();
        let cursorByPlayer = Vector.sub(mousePosition, playerPosition);
        let normalVector = Vector.create(-1, 0);
        let targetAngle = Vector.angle(cursorByPlayer, normalVector);
        this.person.setAngle(targetAngle);
    }

    public isFinalized(): boolean {
        return this.finalized;
    }
}