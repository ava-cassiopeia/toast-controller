import * as ToastPriority from "ToastPriority";

/**
 * Creates a new Toast object based on the configuration passed in.
 *
 * @class
 */
export class Toast {

    /**
     * @param {string} name the name of the Toast (used programmatically, never
     * displayed)
     *
     * @param {string} text the text to appear inside the Toast
     *
     * @param {boolean} isCentered if true, will center the toast on screen
     *
     * @param {ToastController} controller the controller that manages this
     * Toast (so the Toast can tell its controller that it is going to destroy
     * itself)
     */
    constructor(name, text, controller) {
        this.className = "";
        this.closed = false;
        this.controller = controller;
        this.delay = 5000;
        this.icon = false;
        this.isOpen = false;
        this.isCentered = false;
        this.name = name;
        this.text = text;
        this.priority = ToastPriority.LOW;
    }

    /**
     * Actually spawns the Toast's HTMLElement in the DOM, and starts the timer
     * for it to dissapear.
     */
    create(){
        var textContainer = document.createElement("span");
        this.element = document.createElement("div");

        this.assignPriority();

        this.element.className = "toast " + this.className;
        textContainer.className = "text";
        textContainer.innerHTML = this.text;

        if(this.icon) {
            this.element.appendChild(this.buildIcon());
        }

        if(this.isCentered) {
            this.element.classList.add("centered");
        }

        this.element.appendChild(textContainer);

        // Bindings
        this.element.addEventListener("transitionend", function(e) {
            this.transitionEnd(e);
        }.bind(this), false);

        this.element.onclick = function(e) {
            this.onClick(e);
        }.bind(this);

        // Finally, open it up
        requestAnimationFrame(function() {
            this.controller.container.appendChild(this.element);

            this.open();
        }.bind(this));

        setTimeout(function() {
            this.close();
        }.bind(this), this.delay);
    }

    /**
     * Sets the primary element for the Toast to have the proper priority and
     * ARIA attributes.
     */
    assignPriority() {
        if(this.priority === ToastPriority.HIGH) {
            this.element.setAttribute("role", "alert");
        } else {
            this.element.setAttribute("role", "dialog");
            this.element.setAttribute("aria-label", "Toast Notification");
        }
    }

    /**
     * Handler for "onclick" events fired on the Toast; will close the Toast
     * when the Toast is clicked.
     */
    onClick(e) {
        this.close();
    }

    /**
     * Builds the <i> icon HTMLElement for the icon specified for the Toast
     *
     * @returns {HTMLElement} the "i" tag element that represents the icon
     */
    buildIcon() {
        var icon = document.createElement("i");

        icon.className = this.controller.iconBase + " icon";
        icon.innerHTML = this.icon;

        icon.setAttribute("aria-hidden", "true");

        return icon;
    }

    /**
     * Handler for "transitionend" events fired on the Toast; will destroy the
     * Toast assuming that the Toast just closed and finished its closing
     * animation.
     */
    transitionEnd(e) {
        if(!this.isOpen){
            // destroy element and tell controller to forget about the Toast
            this.element.parentElement.removeChild(this.element);

            this.controller.activeToasts[this.name] = undefined;
        }
    }

    /**
     * Opens the Toast (assumes that the Toast's DOM compontent has been
     * generated).
     */
    open() {
        this.isOpen = true;

        requestAnimationFrame(function(){
            this.element.classList.add("open");
        }.bind(this));
    }

    /**
     * Closes the Toast. Warning: once the Toast is finished closing, it will
     * destroy itself.
     */
    close() {
        if(this.closed) {
            return;
        }

        this.isOpen = false;
        this.closed = true;

        requestAnimationFrame(function(){
            this.element.classList.remove("open");
        }.bind(this));
    }

}
