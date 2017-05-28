import {ToastManager} from "./ToastManager.js";

var controller = new ToastManager();

export var openToast = function(config) {
    return controller.openToast(config);
};

export var closeToast = function(name) {
    controller.closeToast(name);
};

export var success = function(text) {
    return controller.openToast({
        name: "sucess",
        text: text,
        icon: "done",
        className: "success"
    });
};

export var error = function(text) {
    return controller.openToast({
        name: "error",
        text: text,
        icon: "error",
        className: "error",
        priority: window.ToastPriority.HIGH
    });
};

export var warn = function(text) {
    return controller.openToast({
        name: "warning",
        text: text,
        icon: "warning",
        className: "warn",
        priority: window.ToastPriority.HIGH
    });
};

(function() {
    window.ToastPriority = {
        HIGH: 1,
        LOW: 0
    };
})();
