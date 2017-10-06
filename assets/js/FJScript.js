; (function (global, $) {

    // 'new' an object 
    var FJScript = function (firstName, lastName, lang) {
        return new FJScript.init(firstName, lastName, lang);
    }

    var supportedLangs = ['en', 'ms', 'es', 'ar', 'hi', 'zh', 'fa'];

    greetings = {
        en: 'Hello',
        ms: 'Apa khabar',
        es: 'Hola',
        ar: 'مرحبا',
        hi: 'नमस्ते',
        zh: '你好',
        fa: 'سلام'
    };

    var logMsg = {
        en: 'Logged in',
        ms: 'Log masuk',
        es: 'Conectado',
        ar: 'تسجيل الدخول',
        hi: 'ं लॉग इन',
        zh: '登录',
        fa: 'وارد شده'
    }

    // prototype holds methods (save memory space) 
    FJScript.prototype = {
        // 'this' refers to the calling object at execution time  
        fullName: function () {
            return this.firstName + " " + this.lastName;
        },
        validate: function () {
            if (supportedLangs.indexOf(this.lang) === -1) {
                throw "Invalid language";
            }
        },
        // retrieve messages from obj by referring to properties using [] 
        greeting: function () {
            return greetings[this.lang] + ' ' + this.firstName;
        },
        greet: function () {
            var msg = this.greeting();
            if (console) {
                console.log(msg);
            }
            // make chainable 
            return this;
        },
        log: function () {
            if (console) {
                console.log(logMsg[this.lang] + ': ' + this.fullName());
            }

            return this;
        },
        setLang: function (lang) {
            this.lang = lang;
            this.validate();

            return this;
        },
        HTMLGreeting: function (selector) {
            if (!$) {
                throw "jQuery not loaded";
            }
            if (!selector) {
                throw "Missing jQuery selector";
            }
            var msg = this.greeting();

            // inject msg in the chosen place in DOM (Document Object Model) 
            $(selector).html(msg);

            return this;
        }

    };

    // Function constructors - the actual obj is created here, allowing to use 'new' an obj without calling 'new'
    FJScript.init = function (firstName, lastName, lang) {

        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.lang = lang || 'en';

        self.validate();
    }

    // trick borrowed from jQuery instead of using 'new' keyword 
    FJScript.init.prototype = FJScript.prototype;

    // atach FJScript to global object, and provide a shorthand 'FJScript' 
    global.FJScript = global.FJ = FJScript;

}(window, jQuery));