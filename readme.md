# ToastController.js

Vanilla JS implementation of the Toast, a popular UI element used primarily by
Google and material design applications. Built to be plug-and-play, but you can
easily extend and modify the JS and CSS to your liking. 

# Useage

This is just a sample of how to use the ToastController, check out the wiki to
get more detailed information on methods and options.

# Basics

To open a Toast, just called `ToastController.openToast()`. The Toast will
automatically close after 5 seconds (or a delay of your specification):

```
ToastController.openToast({
    name: "hello.world",
    text: "Hello, World!" 
});
```

To close a Toast manually, just call `ToastController.closeToast()` with the
name of the Toast you specified when you opened it:

```
ToastController.closeToast("hello.world");
```

You can also close the toast by calling the `close()` method on the actual Toast
object, which is returned from the `openToast()` method:

```
var toast = ToastController.openToast({
   name: "hello.world",
   text: "Hello, World!"
});

// Later, when you want to close the toast
toast.close();
```