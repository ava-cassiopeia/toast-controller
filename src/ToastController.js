import {Toast} from "./Toast.js";

/**
 * Creates a new ToastController, which is a manager for Toasts. Should only
 * ever be one of these on a page.
 * @class
 */
export default class ToastController {

    constructor() {
        this.activeToasts = {};
        this.iconBase = "material-icons";

        // Setup the container for Toasts
        this.createContainer();
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

    /**
     * Alias to open a "success" type Toast, which has a low priority, green
     * background, and the Material "done" icon.
     *
     * @param {string} text the text to put inside the Toast
     *
     * @returns {Toast}
     */
    success(text) {
        return this.openToast({
            name: "sucess",
            text: text,
            icon: "done",
            className: "success"
        });
    }

    /**
     * Alias to open an "error" type Toast, which has a high priority, red
     * background, and the Material "error" icon.
     *
     * @param {string} text the text to put inside the Toast
     *
     * @returns {Toast}
     */
    error(text) {
        return this.openToast({
            name: "error",
            text: text,
            icon: "error",
            className: "error",
            priority: window.ToastPriority.HIGH
        });
    }

    /**
     * Alias to open a "warning" type Toast, which has a high priority, yellow
     * background, and the Materal "warning" icon.
     *
     * @param {string} text the text to put inside the Toast
     *
     * @returns {Toast}
     */
    warn(text) {
        return this.openToast({
            name: "warning",
            text: text,
            icon: "warning",
            className: "warn",
            priority: window.ToastPriority.HIGH
        });
    }

}
