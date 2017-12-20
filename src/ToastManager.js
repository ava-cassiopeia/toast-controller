import {Toast} from "./Toast";

/**
 * Creates a new Toast Manager, which is a manager for Toasts. Should only
 * ever be one of these on a page.
 * @class
 */
export class ToastManager {

    constructor() {
        this.activeToasts = {};
        this.iconBase = "material-icons";

        // setup the container for Toasts
        if (document.readyState === "complete"
            || document.readyState === "loaded"
            || document.readyState === "interactive") {
            this.createContainer();
        } else {
            document.addEventListener("DOMContentLoaded", function(e) {
                this.createContainer();
            }.bind(this), false);
        }
    }

    /**
     * Creates a hidden div on the page to contain Toasts inside of it. The div
     * will be a child of the document body.
     */
    createContainer() {
        if(this.container) {
            return;
        }

        const body = document.getElementsByTagName("body")[0];
        this.container = document.createElement("div");
        this.container.id = "__toast_container";
        body.appendChild(this.container);
    }

    /**
     * Opens a new Toast based on the the configuration data passed in as a map
     *
     * @param {Object} config the configuration data to configure how the Toast
     * is created
     *
     * @param {string} config.name the name of the Toast, to be used to
     * reference it later
     *
     * @param {string} config.text the text to display inside the Toast
     *
     * @param {boolean=} config.centered if true, centers the toast on screen
     *
     * @param {string=} config.icon the icon to display on the left side of the
     * Toast
     *
     * @param {string=} config.className additional class that will be added to
     * the Toast's classes
     *
     * @param {ToastPriority=} config.priority the level of priority that the
     * Toast has, out of two possible priorities: ToastPriority.HIGH or
     * ToastPriority.LOW
     *
     * @returns {Toast} The Toast that was created and opened
     */
    openToast(config) {
        var toast = new Toast(config.name, config.text, this);

        if(config.icon) {
            toast.icon = config.icon;
        }

        if(config.delay) {
            toast.delay = config.delay;
        }

        if(config.className) {
            toast.className = config.className;
        }

        if(config.priority) {
            toast.priority = config.priority;
        }

        if(typeof config.centered !== 'undefined') {
            toast.isCentered = config.centered;
        }

        toast.create();

        this.activeToasts[name] = toast;

        return toast;
    }

    /**
     * Closes an existing Toast given the Toast's name (assuming it exists)
     *
     * @param {string} name the name of the Toast set when calling openToast
     */
    closeToast(name) {
        if(this.activeToasts[name]){
            this.activeToasts[name].close();
        }
    }

}
