import {HandItem} from "./interfaces";
import {Vector} from "matter-js";
import WorldObject from "./worldobject";
import WorlObjectRegistry from "./worldobjectregistry";
import Sector from "./util/sector";
import {Body} from "matter-js";
import BehaviorRegistry from "./behaviorregistry";

export default class GraviGun implements HandItem {
    private getParams() {
        return {
            radius: 200,
            range: 90,
            force: 0.02
        }
    }
    useToCoordinates(person: WorldObject, point: Vector): void {
        let params = this.getParams();
        let objectRegistry = WorlObjectRegistry.getInstance();

        let sector = new Sector(person.getPosition(), params.radius, person.getAngle(), params.range);


        objectRegistry.getAll().forEach(function (obj) {
            let vector = null;
            if (vector = sector.inSector(obj.getPosition())) {
                let forceVector = Vector.normalise(vector);
                let length = Vector.magnitude(vector);

                Body.applyForce(obj.getWorldObject(), person.getPosition(), Vector.mult(forceVector, params.force * params.radius/length));
                BehaviorRegistry.getInstance().create("freeze", [obj, 120]);
            }
        });
    }

    useToObject(person: WorldObject, object: WorldObject): void {

    }
}