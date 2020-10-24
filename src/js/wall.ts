import WorldObject from "./worldobject";

export default class Wall extends WorldObject {
    public worldObjectParams(): any {
        return {
            width: 40,
            height: 40,
            options: {
                isStatic: true
            }
        }
    }
}