(function(){
    var ToastController = function(){
        var body = document.getElementsByTagName("body")[0];

        this.container = document.createElement("div");
        this.activeToasts = {};
        this.iconBase = "material-icons";

        this.container.id = "__toast_container";
        body.appendChild(this.container);
    };

    ToastController.prototype.openToast = function(data){
        var toast = new Toast(data.name, data.text, this);

        if(data.icon) {
            toast.icon = data.icon;
        }

        if(data.delay) {
            toast.delay = data.delay;
        }

        if(data.className) {
            toast.className = data.className;
        }

        if(data.priority) {
            toast.priority = data.priority;
        }

        toast.create();

        this.activeToasts[name] = toast;

        return toast;
    };

    ToastController.prototype.closeToast = function(name){
        if(this.activeToasts[name]){
            this.activeToasts[name].close();
        }
    };

    ToastController.prototype.success = function(text) {
        return this.openToast({
            name: "sucess",
            text: text,
            icon: "done",
            className: "success"
        });
    };

    ToastController.prototype.error = function(text) {
        return this.openToast({
            name: "error",
            text: text,
            icon: "error",
            className: "error",
            priority: window.ToastPriority.HIGH
        });
    };

    ToastController.prototype.warn = function(text) {
        return this.openToast({
            name: "warning",
            text: text,
            icon: "warning",
            className: "warn",
            priority: window.ToastPriority.HIGH
        });
    };

    var Toast = function(name, text, controller){
        this.name = name;
        this.text = text;
        this.controller = controller;
        this.isOpen = false;
        this.closed = false;
        this.icon = false;
        this.priority = window.ToastPriority.LOW;
        this.className = "";
        this.delay = 5000;
    };

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

    Toast.prototype.assignPriority = function() {
        if(this.priority === window.ToastPriority.HIGH) {
            this.element.setAttribute("role", "alert");
        } else {
            this.element.setAttribute("role", "dialog");
            this.element.setAttribute("aria-label", "Toast Notification");
        }
    };

    Toast.prototype.buildIcon = function() {
        var icon = document.createElement("i");

        icon.className = window.ToastController.iconBase + " icon";
        icon.innerHTML = this.icon;

        return icon;
    };

    Toast.prototype.onClick = function(e){
        this.close();
    };

    Toast.prototype.transitionEnd = function(e){
        if(!this.isOpen){
            // destroy element and tell controller to forget about the Toast
            this.element.parentElement.removeChild(this.element);

            this.controller.activeToasts[this.name] = undefined;
        }
    };

    Toast.prototype.open = function(){
        var self = this;

        this.isOpen = true;

        requestAnimationFrame(function(){
            self.element.className = "toast open " + self.className;
        });
    };

    // Warning: close also destroys the Toast
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

    document.addEventListener("DOMContentLoaded", function() {
        if(!window.ToastController){
            window.ToastController = new ToastController();

            window.ToastPriority = {
                HIGH: 1,
                LOW: 0
            };
        }
    }, false);
})();
