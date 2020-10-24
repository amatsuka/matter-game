import jQuery from "jquery";

import {Engine, Render, Body, Bodies, Vector, World as MatterWorld, Bounds, Runner, Events} from "matter-js";

import World from "./world";
import WorldObjectRegistry from "./worldobjectregistry";
import BehaviorRegistry from "./behaviorregistry";

import Keyboard from "./control/keyboard";
import Mouse from "./control/mouse";
import Player from "./player";
import Gravigun from "./gravigun";


import TaskTimer from "tasktimer";

let objectRegistry = WorldObjectRegistry.getInstance();
let behaviorRegistry = BehaviorRegistry.getInstance();

let worldComponent = new World();

// create an engine
let engine = Engine.create({world: worldComponent.getWorld()});

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        hasBounds: true,
        showAngleIndicator: true
    }
});

let ceil = Bodies.rectangle(400, 15, 800, 30, { isStatic: true });
let ground = Bodies.rectangle(400, 585, 800, 30, { isStatic: true });
let groundLeft = Bodies.rectangle(15, 300, 30, 600, { isStatic: true });
let groundRight = Bodies.rectangle(785, 300, 30, 600, { isStatic: true });

// add all of the bodies to the world
MatterWorld.add(worldComponent.getWorld(), [
    //ground,
    //groundLeft,
   // groundRight,
   // ceil
    ]);

let playerComponent = new Player();
playerComponent.setHandItem(new Gravigun());
worldComponent.addObject(playerComponent);

let keyboardComponent = new Keyboard(jQuery("body"));

//@TODO бинды на объекты команд
keyboardComponent.addListener("w", jQuery.proxy(playerComponent.moveUp, playerComponent));
keyboardComponent.addListener("s", jQuery.proxy(playerComponent.moveDown, playerComponent));
keyboardComponent.addListener("d", jQuery.proxy(playerComponent.moveLeft, playerComponent));
keyboardComponent.addListener("a", jQuery.proxy(playerComponent.moveRight, playerComponent));
/**
 * @TODO генерация препятствий
 * @TODO обработка столкновений
 */
keyboardComponent.addListener("z", function () {
    let newObject = objectRegistry.create("npc");
    behaviorRegistry.create("watch", [newObject, playerComponent]);
    behaviorRegistry.create("pursue", [newObject, playerComponent]);
    worldComponent.addObject(newObject);
});

keyboardComponent.addListener("x", function () {
    playerComponent.setPosition(Vector.create(100,100));
});

keyboardComponent.addListener("c", function () {
    let newObject = objectRegistry.create("wall");
    let position = Vector.create(Math.random() * 1000, Math.random() * 1000);
    newObject.setPosition(position);
    worldComponent.addObject(newObject);
});

let mouseComponent = new Mouse(jQuery("body"));

behaviorRegistry.create("watch", [playerComponent, mouseComponent]);

mouseComponent.addListener(Mouse.EVENTS.CLICK, function () {
    playerComponent.useHandItem(mouseComponent.getPosition());
});

/**
 * @TODO работа с камерой
 */
// run the renderer
Render.run(render);

let runner = Runner.create();
Runner.run(runner, engine);

var timer = new TaskTimer();
timer.addTask({
    name: 'behavior',       // unique name of the task
    tickInterval: 1,    // run every 5 ticks (5 x interval = 5000 ms)
    callback: function (task) {
        behaviorRegistry.execute();
    }
});
Events.on(runner, "tick", function () {
    timer.tick();
});

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    // change object colours to show those starting a collision
    let i = 0;
    while (pairs[i]) {
        //
        i++;
    }
});

// an example of using collisionActive event on an engine
Events.on(engine, 'collisionActive', function(event) {
    var pairs = event.pairs;

    // change object colours to show those in an active collision (e.g. resting contact)
    let i = 0;
    while (pairs[i]) {
        console.log(pairs[i]);
        let pair = pairs[i];

        let bodyAMass = pair.bodyA.density * pair.bodyA.area;
        let bodyBMass = pair.bodyB.density * pair.bodyB.area;
        let bodyAMomentum = Vector.mult(pair.bodyA.velocity, bodyAMass);
        let bodyBMomentum = Vector.mult(pair.bodyB.velocity, bodyBMass);


        var relativeAMomentum = Vector.sub(bodyAMomentum, bodyBMomentum);
        var relativeBMomentum = Vector.sub(bodyBMomentum, bodyAMomentum);

        console.log(bodyAMomentum);
        console.log(bodyBMomentum);
        console.log(relativeAMomentum);
        console.log(relativeBMomentum);


        i++;
    }
});

// an example of using collisionEnd event on an engine
Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    // change object colours to show those ending a collision
    let i = 0;
    while (pairs[i]) {
        var pair = pairs[i];

        i++;
    }
});