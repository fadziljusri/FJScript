
// Asynchronous callbacks
function threeS(){
    var ms = 3000 + new Date().getTime();
    while (new Date() < ms){
        console.log('finished function 3s');
    }
}

function clickHandler(){
    console.log('click event');
}

document.addEventListener('click', clickHandler);

threeS();
console.log('finished execution');

// coersion - conversion of data types, js logic
// what if name is undefined? use name = name || '<Your name here>'

// function expressions (function is object)
a(); // error, undefined is not a func
var a = function(){
    console.log('this is function expressions');
}
a(); // display 'this is function expressions'
console.log(a); // ??

// parsing func to a func
function log(a){
    a();
}
log(function(){
    console.log('parsing some function to log');
})

// object function & this, set 'self' obj point to 'this'
var obj = {
    name: 'an object',
    log: function(){
        var self = this;

        self.name = 'updated object'; //mutate obj this

        var setname = function(newname){
            self.name = newname;
        }
        setname('updated again object'); // mutate log this which mutate obj this
        
    }
}

obj.log(); // 'updated again object'

// JS array [] can hold collections of anything 

// arguments n spread
// (function(lang = 'en'){}) === (lang = lang || 'en')

// ...other - takes all extra args received in functions
function xtraArg(arg1, ...other){
    console.log(other);
}
xtraArg(1,2,3,4,5) // out: [2,3,4,5] 

// Immediately Invoked Functions Expresstions (IIFEs)
var IIFE = function(msj){
    return msj;
}('Invoked Immediately');
console.log(IIFE);

greet = 'Hola';
(function(global, greet){
    global.greet = greet;
    console.log("Inside IIFE : "+greet);
}(window, 'Howdy!'));
console.log(greet);

// find out more on 'let'
let x = 0;
for(var i=0;i<3;i++){
    let x = 3;
    console.log("inside "+x);
}
console.log(x);
///////////////
function f(){
    var arr = [];

    for(var i=0;i<3;i++){
        let j = i;
        arr.push(
            function(){
                console.log(j);
        });
    }
    return arr;
}
var fs = f();
fs[0]();

// closures and callbacks
function hiLater(){
    var greet = 'Hi';
    setTimeout(function(){
        alert(greet);
    },3000);
}
hiLater();

//  bind() - parsing value using 'this' will result permanent change (f currying) 
var person = {
    fname: 'Fadzil',
    lname: 'Jusri',
    getFullName: function(){
        var fullname = this.fname + ' ' + this.lname;
        return fullname;
    }
}
var logName = function(){
    console.log('Logged : ' + person.getFullName());
}.bind(person);
logName();

//  call()
var person = {
    fname: 'Fadzil',
    lname: 'Jusri',
    getFullName: function(){
        var fullname = this.fname + ' ' + this.lname;
        return fullname;
    }
}
var logName = function(msj){
    console.log(msj + ' : ' + person.getFullName());
}.call(person,'zzz');

// funtional programming
function mapForEach(arr, fn){
    var newArr = [];
    for(var i=0; i<arr.length; i++){
        newArr.push(
            fn(arr[i])
        )
    };
    return newArr;
}
var mulBy1 = [1,2,3];
var mulBy2 = mapForEach(mulBy1, function(item){
    return item * 2;
});
var mulBy3 = mapForEach(mulBy1, function(item){
    return item * 3;
});
var checkLimit = function(limiter){
    return function(limiter, item){
        return item > limiter
    }.bind(this, limiter);
}
var lim2 = mapForEach(mulBy1, checkLimit(2));

// Function Constructors - smart way
function Person(firstName, lastName, ...other){
    this.fname = firstName;
    this.lname = lastName;
}
//add more fx to Person - in case
Person.prototype.getFullName = function(){
    return this.fname + ' ' + this.lname;
}
var khur = new Person('Khursani', '8');

// Polyfill - code that adds a feature which the engine may lack
if(!Object.create){
    Object.create = function(o){
        if(arguments.length > 1){
            throw new Error('Object.create implementation' + ' only accepts the 1st parameter');
        }
        function F(){}
        F.prototype = o;
        return new F();
    }
}
var person = {
    fname: 'Default',
    lname: 'Default',
    greet: function(){
        console.log("Hi " + this.fname);
    }
}
var shahril = Object.create(person);
shahril.fname = "Shahril";

// "use strict"


