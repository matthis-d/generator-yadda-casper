# generator-casper-yadda

[![Build Status](https://travis-ci.org/matthis-d/generator-yadda-casper.png?branch=master)](https://travis-ci.org/matthis-d/generator-yadda-casper)

> [Yeoman](http://yeoman.io) generator

## What is it

In my job, I sometimes have to develop some interface tests using [Yadda](https://github.com/acuminous/yadda) and [CasperJS](http://casperjs.org/).
In order no to look for the same files each time I start a new project, I decided to create this Yeoman generator.

At the moment, this plugin just do basic stuff and is only working on Unix environments (due to the use of ```yadda.sh``` in my test).
Please have a look at the [roadmap](#roadmap) section.

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

### Using the application

#### Running tests

In order to use all functionalities of this generator, it is recommended to install [Gulp](http://gulp.js) globally on your system.
All you have to do is to run the command ```sudo npm install -g gulp```.

Once this is done, you can use several features of the generator:

If you want to run tests on only changed features, run the command ```gulp watch```. Every time you change a feature, all the scenario of this issue will be ran.

If you want to run all tests you wrote each time you do a change on a JavaScript or a feature file, run the command ```gulp watch-all```.

When you use the gulp tasks (watch and watch-all), the output will always be on your terminal.
If you want to get results in a XML (in JUnit format), you have to run ```npm test``` or ```./yadda.sh . results/```.

#### Generating features/definitions files

If you want to generate a feature file and a definition file associated to it, you just have to write ```yo casper-yadda:feature yourCoolFeatureName```.
This will automatically create a feature file in the features folder called ```yourCoolFeatureName.feature``` and a JavaScript file called ```yourCoolFeatureName.js``` placed in definitions folder.

**Be careful!** at the moment, if you generate a new feature without having rewritten a previous generated one, there will be conflicts during the tests because two definitions files will have the same regex.

## Roadmap

### Windows

Generate scripts that can be used both by Windows and Unix systems

### Features definitions

What I would like to do is to add a functionality that generates a list of non implemented step definitions once a feature file is modified and saved.

Any idea would be welcome.

## License

MIT

## Thanks

I would like to thank some of my co-workers who created some of the files I use in this generator.
