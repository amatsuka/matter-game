import {Body, Bodies, World as MatterWorld} from "matter-js";
import WorldObject from "./worldobject";

export default class World {
	private worldInstance: MatterWorld;

	public constructor() {
		this.worldInstance = MatterWorld.create({
        gravity: {
            x: 0,
            y: 0,
            scale: 0
        }
    });

	}

    public getWorld(): MatterWorld {
        return this.worldInstance;
    };

    public addObject (obj: WorldObject) {
        MatterWorld.add(this.worldInstance, [obj.getWorldObject()]);
    };

    public removeObject(obj: WorldObject) {
        MatterWorld.remove(this.worldInstance, obj.getWorldObject());
    };
}