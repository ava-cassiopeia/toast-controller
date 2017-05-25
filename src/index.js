import {ToastController} from "./ToastController.js";

export var test = function() {
    console.log("test() called");
};

(function() {
    function init() {
        if(!window.ToastController){
            window.ToastController = new ToastController();

            window.ToastPriority = {
                HIGH: 1,
                LOW: 0
            };
        }
    }

    if(document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            init();
        }, false);
    } else {
        init();
    }
})();
