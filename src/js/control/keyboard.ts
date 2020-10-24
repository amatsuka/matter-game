import {EventEmitter} from "eventemitter3";
/**
 * @TODO add docblock
 */
export default class Keyboard {
    private emitter: EventEmitter;

    /**
     *@TODO add type for list
     */
    private listOfListeners: any = {};

    public constructor($domListener: JQuery) {
        this.emitter = new EventEmitter();
        let __self = this;
        $domListener.on("keypress", function (e) {
            __self.emitKeyPressEvent(String.fromCharCode(e.keyCode));
        });
    }

    private emitKeyPressEvent(char: string) {
        this.emitter.emit(this.getEventByChar(char));
    };

    /**
     * @TODO Add type for listener
     * @param {string} char
     * @param listener
     */
    public addListener(char: string, listener: any) {
        /**
         *@TODO Move to method addtolist
         */
        this.listOfListeners[char] = this.listOfListeners[char] || [];
        if (this.listOfListeners[char].indexOf(listener) > 0) {
            /**
             * Show warning
             */
        } else {
            this.emitter.addListener(this.getEventByChar(char), listener);
        }

    };

    private getEventByChar(char: string) {
        return "KeyPressed" + char;
    };
}