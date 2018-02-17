# Contributing to the Toast Controller

First off, before I go into detail on what to do to contribute, I just wanted
to say thanks for taking the time--or even just considering taking the time--to
contribute your time to this project! It means a lot, and is seriously
appreciated.

With that in mind, please follow the below steps to contribute:

## Fork and Clone

Before you get started, make sure to fork the repository onto your own GitHub.
This will allow you to make commits separate from the main repo, and submit a
pull request from your repo when the time comes to submit your code.

Once you've done that, you'll want to clone down that newly forked project, and
make sure at least one build is working. 

First, install all NPM dependencies from the project root:

```
npm i
```

And [Gulp](https://gulpjs.com/) if you don't have it:

```
npm i -g gulp-cli
```

Once you've got the build working, you're ready to start making changes. If
you're having trouble getting a local copy working, please open an issue and
I'll try to help ASAP.

## Editing Code

Most of the code is moderately well commented, and you'll want you go through
and get at least a top level understanding of how the code works before you
start making tweaks.

For the most part, how you write the code, and the function of the code, is up
to you, however in terms of syntax, please generally follow the
[Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html).
This is not rigidly enforced, but should generally be followed. The only main
change from that style guide is you should use 4 space tabs instead of 2 space
tabs.

*Note:* In the future, there will be unit test requirements for the code,
but for the time being, it is up to you to test that the functionality you added
does not break any existing functionality, and works properly in a browser. This
will also be verified when you submit a PR.

Once you're done editing the code and making your changes, it's time to submit
a PR.

## Submitting Code

Submitting code should be done through the standard GitHub pull request system.
Please
[click here](https://github.com/aeolingamenfel/toast-controller/pulls)
for the pull requests related to this project, and to submit your own.

I will verify your code works, and doesn't break anything, and if so, will pull
the code into the main repository. I'll also take care of updating the NPM
version appropriately (so you do not have to) and updating the module on NPM.

## Recognition

I want to make sure that you recieve proper recognition for your efforts. GitHub
will automatically add your name to the list of contributors once your pushes
are accepted onto the `master` branch, but I will also go in and add to you the
`AUTHORS` file.

If you do not see your name appear in these places shortly after your PR is
accepted, please
[drop a line](https://github.com/aeolingamenfel/toast-controller/issues),
as it's possible I just forgot to add you in.

And of course, thanks for contributing!