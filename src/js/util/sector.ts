import {Vector} from "matter-js";
export default class Sector {
    private center: Vector;
    private radius: number;
    private angle: number;
    private range: number;

    private sectors: number[][] = [];

    public constructor(center: Vector, radius: number, angle: number, range: number) {
        this.center = center;
        this.radius = radius;
        this.angle = angle;
        this.range = range;

        this.recalcSectors();
    }

    private recalcSectors() {
        this.sectors = [];
        let minAngle = this.angle - this.range/2 * Math.PI / 180;
        let maxAngle = this.angle + this.range/2 * Math.PI / 180;


        if (minAngle < -Math.PI) {
            this.sectors.push([Math.PI - Math.abs(minAngle + Math.PI), Math.PI]);
            this.sectors.push([-Math.PI, this.angle]);
        } else {
            this.sectors.push([minAngle, this.angle]);
        }

        if (maxAngle > Math.PI) {
            this.sectors.push([this.angle, Math.PI]);
            this.sectors.push([-Math.PI, -Math.PI + maxAngle - Math.PI]);
        } else {
            this.sectors.push([this.angle, maxAngle]);
        }
    }

    public inSector(point: Vector): Vector {

            let positionByCenter = Vector.sub(point, this.center);

            let length = Vector.magnitude(positionByCenter);

            let angle = Math.PI - Math.acos(positionByCenter.x/length);

            if (positionByCenter.y > 0) {
                angle *= -1;
            }

            let inSector = false;

            for (var k in this.sectors) {
                if (angle >= this.sectors[k][0] && angle <= this.sectors[k][1]) {
                    inSector = true;
                    break;
                }
            }

            if (length <= this.radius && inSector) {
                return Vector.clone(positionByCenter);
            }

            return null;
    }
}
