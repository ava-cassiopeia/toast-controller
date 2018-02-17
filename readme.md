# ToastController.js

[![Build Status](https://travis-ci.org/aeolingamenfel/toast-controller.svg?branch=master)](https://travis-ci.org/aeolingamenfel/toast-controller)

Vanilla JS, performant implementation of the Toast, a popular UI element used primarily by
Google and material design applications. Built to be plug-and-play, but you can
easily extend and modify the JS and CSS to your liking.

Basic useage and examples are provided below. If you require additional
documentation, please check out the
[project wiki](https://github.com/aeolingamenfel/toast-controller/wiki). If you
are still having trouble/questions, feel free to open an issue.

**Major Features:**

 - Vanilla JS, CSS; no frameworks/plugins required
 - Follows the [Material Design spec](https://material.io/guidelines/components/snackbars-toasts.html#) for Toasts/Snackbars
 - Performant (uses proper layers and transformations)
 - #a11y (accessibility friendly)
 - Integrates with existing build systems/projects
 - No inline JS

## Installation

You can either download the latest release of the project, or install it from
NPM using:

```
npm i --save toast-controller
```

## Importing into Your Project

To import this into your project/website, download the lastest copy of the
ToastController, then import the `ToastController.min.js` into your site
wherever needed.

If you use webpack, you can import the ToastController into your output using:

```Javascript
import * as ToastController from "toast-controller";
```

In addition, you'll need the styles associated with it. You can either import
the included `sass/toast.scss` into your SASS/SCSS, the included
`less/toast.less`, or just import the prebuilt stylesheet in the `dist/css/`
folder, which is called `toast-controller.min.css`.

## Useage

This is just a sample of how to use the ToastController, check out the wiki to
get more detailed information on methods and options.

### Basics

To open a Toast, just call `ToastController.openToast()`. The Toast will
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

### Options

You can also specify different options to control the behavior of the Toast.
For example, you can specify how long of a delay before the Toast
automatically closes itself. This is by default 5 seconds.

```
ToastController.openToast({
    name: "delayed",
    text: "Hello, World!",
    delay: 10000 // the Toast will stay open for 10 seconds
});
```

## Icons

A Toast can also optionally have an icon. By default, this comes from the
[Google Material Icons](https://material.io/icons/), and you will have to
import the Material Icons stylesheet in order to use those icons.

To add an icon to a Toast, when you open it, you can specify the `icon`
parameter, and the name of the icon. For example:

```
ToastController.openToast({
    name: "success.with-icon",
    text: "Success",
    icon: "done" // adds a checkmark icon
});
```

Please see the Wiki for more information on how to configure support for
custom icons/other icon sets.

## Feedback, Bugs, Etc.

If you encounter any bugs, wish there was some feature that I didn't think
of, or just wish to provide feedback, feel free to
[open an issue](https://github.com/aeolingamenfel/toast-controller/issues),
or contact me directly. I'm more than happy to help.

## Legal

This code is open source, and licensed under the popular ISC license for you
to use at your discretion. TL;DR: you can use it however you want, just make
sure to mention my name somewhere in your project.

The name Google is a trademark of Google Inc.
