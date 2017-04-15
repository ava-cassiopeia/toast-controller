(function(){
    /**
     * Creates a new ToastController, which is a manager for Toasts. Should only
     * ever be one of these on a page.
     * @class
     */
    var ToastController = function(){
        this.activeToasts = {};
        this.iconBase = "material-icons";

        // Setup the container for Toasts
        this.createContainer();
    };

    /**
     * Creates a hidden div on the page to contain Toasts inside of it. The div
     * will be a child of the document body.
     */
    ToastController.prototype.createContainer = function() {
        if(this.container) {
            return;
        }

        const body = document.getElementsByTagName("body")[0];
        this.container = document.createElement("div");
        this.container.id = "__toast_container";
        body.appendChild(this.container);
    };

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
    ToastController.prototype.openToast = function(config){
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
    };

    /**
     * Closes an existing Toast given the Toast's name (assuming it exists)
     *
     * @param {string} name the name of the Toast set when calling openToast
     */
    ToastController.prototype.closeToast = function(name){
        if(this.activeToasts[name]){
            this.activeToasts[name].close();
        }
    };

    /**
     * Alias to open a "success" type Toast, which has a low priority, green
     * background, and the Material "done" icon.
     *
     * @param {string} text the text to put inside the Toast
     *
     * @returns {Toast}
     */
    ToastController.prototype.success = function(text) {
        return this.openToast({
            name: "sucess",
            text: text,
            icon: "done",
            className: "success"
        });
    };

    /**
     * Alias to open an "error" type Toast, which has a high priority, red
     * background, and the Material "error" icon.
     *
     * @param {string} text the text to put inside the Toast
     *
     * @returns {Toast}
     */
    ToastController.prototype.error = function(text) {
        return this.openToast({
            name: "error",
            text: text,
            icon: "error",
            className: "error",
            priority: window.ToastPriority.HIGH
        });
    };

    /**
     * Alias to open a "warning" type Toast, which has a high priority, yellow
     * background, and the Materal "warning" icon.
     *
     * @param {string} text the text to put inside the Toast
     *
     * @returns {Toast}
     */
    ToastController.prototype.warn = function(text) {
        return this.openToast({
            name: "warning",
            text: text,
            icon: "warning",
            className: "warn",
            priority: window.ToastPriority.HIGH
        });
    };

    /**
     * Creates a new Toast object based on the configuration passed in.
     *
     * @class
     *
     * @param {string} name the name of the Toast (used programmatically, never
     * displayed)
     *
     * @param {string} text the text to appear inside the Toast
     *
     * @param {ToastController} controller the controller that manages this
     * Toast (so the Toast can tell its controller that it is going to destroy
     * itself)
     */
    var Toast = function(name, text, controller){
        this.className = "";
        this.closed = false;
        this.controller = controller;
        this.delay = 5000;
        this.icon = false;
        this.isOpen = false;
        this.name = name;
        this.text = text;
        this.priority = window.ToastPriority.LOW;
    };

    /**
     * Actually spawns the Toast's HTMLElement in the DOM, and starts the timer
     * for it to dissapear.
     */
    Toast.prototype.create = function(){
        var self = this;
        var textContainer = document.createElement("span");
        this.element = document.createElement("div");

        this.assignPriority();

        this.element.className = "toast " + this.className;
        textContainer.className = "text";
        textContainer.innerHTML = this.text;

        if(this.icon) {
            this.element.appendChild(this.buildIcon());
        }

        this.element.appendChild(textContainer);

        // Bindings
        this.element.addEventListener("transitionend", function(e){
            self.transitionEnd(e);
        }, false);

        this.element.onclick = function(e){
            self.onClick(e);
        };

        // Finally, open it up
        requestAnimationFrame(function(){
            self.controller.container.appendChild(self.element);

            self.open();
        });

        setTimeout(function(){
            self.close();
        }, this.delay);
    };

    /**
     * Sets the primary element for the Toast to have the proper priority and
     * ARIA attributes.
     */
    Toast.prototype.assignPriority = function() {
        if(this.priority === window.ToastPriority.HIGH) {
            this.element.setAttribute("role", "alert");
        } else {
            this.element.setAttribute("role", "dialog");
            this.element.setAttribute("aria-label", "Toast Notification");
        }
    };

    /**
     * Builds the <i> icon HTMLElement for the icon specified for the Toast
     *
     * @returns {HTMLElement} the "i" tag element that represents the icon
     */
    Toast.prototype.buildIcon = function() {
        var icon = document.createElement("i");

        icon.className = window.ToastController.iconBase + " icon";
        icon.innerHTML = this.icon;

        icon.setAttribute("aria-hidden", "true");

        return icon;
    };

    /**
     * Handler for "onclick" events fired on the Toast; will close the Toast
     * when the Toast is clicked.
     */
    Toast.prototype.onClick = function(e){
        this.close();
    };

    /**
     * Handler for "transitionend" events fired on the Toast; will destroy the
     * Toast assuming that the Toast just closed and finished its closing
     * animation.
     */
    Toast.prototype.transitionEnd = function(e){
        if(!this.isOpen){
            // destroy element and tell controller to forget about the Toast
            this.element.parentElement.removeChild(this.element);

            this.controller.activeToasts[this.name] = undefined;
        }
    };

    /**
     * Opens the Toast (assumes that the Toast's DOM compontent has been
     * generated).
     */
    Toast.prototype.open = function(){
        var self = this;

        this.isOpen = true;

        requestAnimationFrame(function(){
            self.element.className = "toast open " + self.className;
        });
    };

    /**
     * Closes the Toast. Warning: once the Toast is finished closing, it will
     * destroy itself.
     */
    Toast.prototype.close = function(){
        if(this.closed){
            return;
        }

        var self = this;

        this.isOpen = false;
        this.closed = true;

        requestAnimationFrame(function(){
            self.element.className = "toast " + self.className;
        });
    };

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
