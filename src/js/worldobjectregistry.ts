import WorlObject from "./worldobject";
import Npc from "./npc";
import Wall from "./wall";
import HealthComponent from "./components/healthcomponent";


export default class WorlObjectRegistry {
	private static instance: WorlObjectRegistry;
	private index: number = 0;
	private objects: WorlObject[] = [];
	private constructor() {};

	public static getInstance(): WorlObjectRegistry {
		if (!WorlObjectRegistry.instance) {
			WorlObjectRegistry.instance = new WorlObjectRegistry();
		}

		return WorlObjectRegistry.instance;
	}

	private getIndex(): number {
		return ++this.index;
	}

	public create(typeId: string): WorlObject {
		let newId = this.getIndex();

		let obj = this.factory(typeId, newId);
		this.objects[newId] = obj;

		return obj;
	}

	public add(obj: WorlObject): number {
		let newId = this.getIndex();
		this.objects[newId] = obj;

		return newId;
	}

	public remove(obj: WorlObject): void {
		let id = this.objects.indexOf(obj);
		delete this.objects[id];
	}

	public removeById(id: number): void {
		delete this.objects[id];
	}

	public getById(id: number): WorlObject {
		return this.objects[id];
	}


	private factory(typeId: string, id: number): WorlObject {
		/**
		 * @TODO коды компонент в константы вынести
		 */
		switch (typeId) {
			case "npc":
				return new Npc(id, {health: new HealthComponent(100)});
			case "wall":
				return new Wall(id, {health: new HealthComponent(200)});
		}
	}

	public getAll() {
		return this.objects;
	}
}