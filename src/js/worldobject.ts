import {Bodies, Body, Vector} from "matter-js";
import Converter from "./util/converter";

export default class WorldObject {
    get freezed(): boolean {
        return this._freezed;
    }

    set freezed(value: boolean) {
        this._freezed = value;
    }

    protected components: any;

    private worldObject: Body;
    protected speed: number = 1;
    private _freezed: boolean = false;
    protected id: number = 0;


    public worldObjectParams(): any {
        return {
            width: 30,
            height: 30
        }
    }

    public constructor(id: number, components: any = {}) {
        let params = this.worldObjectParams();
        this.id = id;
        this.components = components;
        this.worldObject = Bodies.rectangle(0, 0, params.width, params.height, params.options);
    }

    public getWorldObject(): Body {
        return this.worldObject;
    };

    public setPosition(position: Vector) {
       Body.setPosition( this.getWorldObject(), position);
    };

    public getPosition(): Vector {
        return this.getWorldObject().position;
    };

    public getAngle(): number {
       return this.getWorldObject().angle;
    };

    public setAngle(angle: number): void {
        this.rotate(angle - this.getAngle());
    }

    public rotate(angle: number) {
        Body.rotate(this.getWorldObject(), angle);
    };

    public moveUp = function () {
        this.move(Vector.create(0, -1), this.speed);
    };

    public moveDown = function () {
        this.move(Vector.create(0, 1), this.speed);
    };

    public moveLeft = function () {
        this.move(Vector.create(1, 0), this.speed);
    };

    public moveRight = function () {
        this.move(Vector.create(-1, 0), this.speed);
    };

    public moveByDirection(vector: Vector) {
        this.move(vector, this.speed);
    }

    protected move(vector: Vector, speed: number) {
        if (this._freezed) return;
        let scaledVector = Vector.mult(vector, speed);

        Body.setVelocity(this.getWorldObject(), scaledVector);
    };

    public getId(): number {
        return this.id;
    }
}