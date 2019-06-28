_Created by: Alfredo Narváez, 2019_

# 🛡️ Rondel

⚙️ **Travis CI** 🛠️

[![Build Status](https://travis-ci.com/alfdocimo/rondel.svg?branch=master)](https://travis-ci.com/alfdocimo/rondel)

👩‍🔬 **SonarQube** 👨‍🔬

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

Rondel is a library that makes use of the JavaScript Proxy API and exposes certain functionalities to protect & control objects through the use of handlers.

**Why "Rondel"?**

_A rondel (ˈrɒndl) is a circular piece of metal used for protection in suits of armor_

![rondeljs](https://i.imgur.com/St4R0OL.png)

# Installing

First things first! You gotta install `rondel` as a dependency, so go ahead and run:

```
yarn add -D rondel
```

or if you're using npm:

```
npm install --save-dev rondel
```

Okay! Once that's done, you're ready to go!

# Protecting Objects:

Let's say you want to create a protected `Object`

```js
import Rondel from 'rondel';

const rondel = new Rondel();

const myObj = rondel.createProtected({
  obj: { name: 'John', lastName: 'Doe' },
  modifiers: {},
});

console.log(myObj.randomProp); // unset property
```

How about controlling the undefined props of our objects?

```js
import Rondel from 'rondel';

const rondel = new Rondel();

const myObj = rondel.createProtected({
  obj: { name: 'John', lastName: 'Doe' },
  modifiers: { exposeDefault: [] },
});

console.log(myObj.randomProp); // []
```

Alright... how about restricting setting properties?

```js
import Rondel from 'rondel';

const rondel = new Rondel();

const myObj = rondel.createProtected({
  obj: { name: 'John', lastName: 'Doe' },
  modifiers: { exposeDefault: [], setNotAllowed: true },
});

console.log(myObj.randomProp); // []

myObj.addPropHere = 'Hello World!'; // Will throw error
```

# Querying Objects by props

Proxies are very powerful. They also allow us to access dynamically generated properties.

Let's look at the following snippet:

```js
const arr = rondel.getProtected([
  {
    name: 'John',
    age: 30,
    skills: ['React', 'Node'],
    position: 'Sr Dev',
    salary: 100000,
  },
  { name: 'Mathew', age: 26, skills: ['JavaScript'], salary: 0 },
  {
    name: 'Claudia',
    nationality: null,
    age: 33,
    skills: ['AWS', 'Azure', 'DevOps', 'JavaScript'],
    salary: 80000,
  },
]);
```

By using `findWhere<Property>Equals(<String>)` we'll get all the matching results

```js
arr.findWhereNameEquals('John')); // will give us all the object that contains John
```

## Other Examples

```js
arr.findWhereNationalityIsNull()); // will give us all the object that contains Claudia
```

```js
arr.findWhereSkillsIncludes('JavaScript')); // will give us all the object that contains Mathew
```

Currently supported methods:

**findWhereXEquals**

Returns an array of objects of all matching <X> objects to value.

```ts
findWhereXEquals(value: any) : [{}];
```

**findWhereXIsNull**

Returns an array of objects of all matching <X> null objects.

```ts
findWhereXIsNull() : [{}];
```

**findWhereXIsUndefined**

Returns an array of objects of all matching <X> undefined objects.

```ts
findWhereXIsUndefined() : [{}];
```

**findWhereXIsEmpty**

Returns an array of objects of all matching <X> Empty objects.

```ts
findWhereXIsEmpty() : [{}];
```

**findWhereXIsIncludes**

Returns an array of objects of all matching <X> to the value/s provided.

```ts
findWhereXIsIncludes(value: any) : [{}];
```

**findWhereXIsLowerThan** & **findWhereXIsGreaterThan**

Returns an array of objects of all matching <X> wether is lower or greater than a value provided.

```ts
findWhereXIsLowerThan(value: any) : [{}];
findWhereXIsGreaterThan(value: any) : [{}];
```
