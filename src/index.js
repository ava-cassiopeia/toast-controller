import {ToastManager} from "./ToastManager";
import * as ToastPriority from "./ToastPriority";

var controller = new ToastManager();

/**
 * Opens a new Toast and returns the instance of it.
 * 
 * @param {Object} config
 * @param {String} config.name The name of the new Toast. Can be used to
 *  reference it later.
 * @param {String} config.text The text to display within the toast.
 * @param {String=} config.icon The name of the icon to display.
 * @param {Number=} config.delay Defaults to 5000. Amount of time, in whole 
 *  milliseconds, to wait before automatically hiding the Toast.
 * @param {ToastPriority=} config.priority Determines the priority of the Toast,
 *  which informs the screen reader appropriately.
 */
export var openToast = function(config) {
    return controller.openToast(config);
};

/**
 * Closes a toast based on the name set when the Toast was opened.
 * 
 * @param {String} name The name of the toast set when the Toast was opened.
 */
export var closeToast = function(name) {
    controller.closeToast(name);
};

/**
 * Opens a "sucess" style Toast. This Toast has a checkmark next to the text,
 * low priority, and a slightly different style.
 * 
 * @param {String} text The text to display in the Toast.
 */
export var success = function(text) {
    return controller.openToast({
        name: "sucess",
        text: text,
        icon: "done",
        className: "success"
    });
};

/**
 * Opens an "error" style Toast. The Toast has an error symbol next to the text,
 * high priority, and a slightly different style.
 * 
 * @param {String} text The text to display in the Toast.
 */
export var error = function(text) {
    return controller.openToast({
        name: "error",
        text: text,
        icon: "error",
        className: "error",
        priority: ToastPriority.HIGH
    });
};

/**
 * Opens a "warning" style Toast. The Toast has a warning symbol next to the 
 * text, high priority, and a slightly different style.
 * 
 * @param {String} text The text to display in the Toast.
 */
export var warn = function(text) {
    return controller.openToast({
        name: "warning",
        text: text,
        icon: "warning",
        className: "warn",
        priority: ToastPriority.HIGH
    });
};
