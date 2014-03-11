# generator-casper-yadda [![Build Status](https://secure.travis-ci.org/matthis-d/generator-casper-yadda-generator.png?branch=master)](https://travis-ci.org/matthis-d/generator-casper-yadda-generator)

> [Yeoman](http://yeoman.io) generator

## What is it

In my job, I sometimes have to develop some interface tests using [Yadda](https://github.com/acuminous/yadda) and [CasperJS](http://casperjs.org/).
In order no to look for the same files each time I start a new project, I decided to create this Yeoman generator.

At the moment, this plugin just do basic stuff and is only working on Unix environments (due to the use of ```yadda.sh``` in my test).
Please have a look at the [roadmap](#Roadmap) section.

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-casper-yadda-generator from npm, run:

```
$ npm install -g generator-casper-yadda
```

Finally, initiate the generator:

```
$ yo casper-yadda
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Roadmap

### Windows

Generate scripts that can be used both by Windows and Unix systems

### Features definitions

What I would like to do is to add a functionality that generates a list of non implemented step definitions once a feature file is modified and saved.

Any idea would be welcome.

## License

MIT

## Thanks

I would like to thank some of my co-workers who created the file I use for this generator.
(Names will be added after they agree to appear here).
