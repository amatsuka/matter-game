import WorldObject from "./worldobject";

export default class Npc extends WorldObject {
	public worldObjectParams(): any {
        return {
            width: 20,
            height: 20
        }
    }

}