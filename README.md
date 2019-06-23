_Created by: Alfredo Narváez, 2019_

# 🛡️ Rondel

## ⚙️ _Travis CI_ 🛠️

[![Build Status](https://travis-ci.com/alfdocimo/rondel.svg?branch=master)](https://travis-ci.com/alfdocimo/rondel)

## 👩‍🔬 _SonarQube_ 👨‍🔬

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=alert_status)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=bugs)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=code_smells)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=coverage)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=ncloc)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=security_rating)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=alfdocimo_rondel&metric=sqale_index)](https://sonarcloud.io/dashboard?id=alfdocimo_rondel)

Rondel is a library that makes use of the JavaScript Proxy API and exposes certain functionalities to control objects through the use of handlers.

Why "Rondel"?

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Gustav_Vasas_rustning%2C_1540_-_Livrustkammaren_-_91531.tif/lossy-page1-1200px-Gustav_Vasas_rustning%2C_1540_-_Livrustkammaren_-_91531.tif.jpg)

As stated in Wikipedia: _A rondel (ˈrɒndl) is a circular piece of metal used for protection, as part of a harness of plate armour, or attached to a helmet, breastplate, couter or on a gauntlet._ It is mainly used to protect the most fragile parts of humans when using suits of armors in the middle age. So instead of humans, we're protecting `objects` in order to avoid certain bad practices.

# How to use:

First things first! You gotta install `rondel` as a dependency, so go ahead and run:

```
yarn add -D rondel
```

or if you're using npm:

```
npm install --save-dev rondel
```

Okay! Once that's done, you're ready to go!

Let's say you want to create a protected `Object`

```js
import Rondel from "rondel";

const rondel = new Rondel();

const myObj = rondel.createProtected({
  obj: { name: "John", lastName: "Doe" },
  modifiers: {}
});

console.log(myObj.randomProp); // unset property
```

How about controlling the undefined props of our objects?

```js
import Rondel from "rondel";

const rondel = new Rondel();

const myObj = rondel.createProtected({
  obj: { name: "John", lastName: "Doe" },
  modifiers: { exposeDefault: [] }
});

console.log(myObj.randomProp); // []
```

Alright... how about restricting setting properties?

```js
import Rondel from "rondel";

const rondel = new Rondel();

const myObj = rondel.createProtected({
  obj: { name: "John", lastName: "Doe" },
  modifiers: { exposeDefault: [], setNotAllowed: true }
});

console.log(myObj.randomProp); // []

myObj.addPropHere = 'Hello World!' // Will throw error
```

