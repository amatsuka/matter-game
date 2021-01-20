import {EventEmitter} from "eventemitter3";
import JQueryMousewheelEventObject = JQueryMousewheel.JQueryMousewheelEventObject;
import {Vector} from "matter-js";


/**
 * @TODO add docblock
 */
export default class Mouse {

    /**
     *@TODO declare type
     */
    public static readonly EVENTS: any = {
        "MOUSE_UP": "mouseup",
        "MOUSE_DOWN": "mousedown",
        "CLICK": "click",
        "WHEEL_UP": "wheelup",
        "WHEEL_DOWN": "wheeldown",
        "MOVE": "mousemove"
    };

    private emitter: any;

    /**
     *@TODO add type for list
     */
    private listOfListeners: any = {};
    private position: number[] = [0, 0];

    public constructor($domListener: JQuery) {
        this.emitter = new EventEmitter();

        let __self = this;
        $domListener.on("mousedown", function () {
            __self.emitMouseDownEvent();
        });

        $domListener.on("mouseup", function () {
            __self.emitMouseUpEvent();
        });

        $domListener.on("click", function () {
            __self.emitMouseLeftClickEvent();
        });

        $domListener.on("mousewheel", function (e: JQueryMousewheelEventObject) {
            if(e.deltaX / 120 > 0) {
                __self.emitMouseWheelUpEvent();
            } else {
                __self.emitMouseWheelDownEvent();
            }
        });

        $domListener.on("mousemove", function (e: JQuery.Event) {
            __self.position = [e.clientX, e.clientY];
            __self.emitMouseMoveEvent();
        });
    }

    public getPosition(): Vector {
        return Vector.create(this.position[0], this.position[1]);
    }

    public emitMouseDownEvent() {
        this.emitter.emit(Mouse.EVENTS.MOVE);
    }

    public emitMouseUpEvent() {
        this.emitter.emit(Mouse.EVENTS.MOUSE_UP);
    }

    public emitMouseLeftClickEvent() {
        this.emitter.emit(Mouse.EVENTS.CLICK);
    }

    public emitMouseWheelUpEvent() {
        this.emitter.emit(Mouse.EVENTS.WHEEL_UP);
    }

    public emitMouseWheelDownEvent() {
        this.emitter.emit(Mouse.EVENTS.WHEEL_DOWN);
    }

    public emitMouseMoveEvent() {
        this.emitter.emit(Mouse.EVENTS.MOVE);
    }

    /**
     * @TODO Add type for listener
     * @param {string} eventName
     * @param listener
     */
    public addListener(eventName: string, listener: any) {
        /**
         *@TODO Move to method addtolist
         */
        this.listOfListeners[eventName] = this.listOfListeners[eventName] || [];
        if (this.listOfListeners[eventName].indexOf(listener) > 0) {
            /**
             * Show warning
             */
        } else {
            this.emitter.addListener(eventName, listener);
        }

    };
}
