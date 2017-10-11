; (function (global, $) {

    // 'new' an object 
    var FJScript = function (firstName, lastName, email, tel, web, message, lang) {
        return new FJScript.init(firstName, lastName, email, tel, web, message, lang);
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

    var formLangs = {
        en: {
            fn: 'First Name',
            ln: 'Last Name',
            email: 'Email',
            tel: 'Phone Number',
            web: 'Web Site',
            msj: 'Type your message here..'
        },
        ms: {
            fn: 'Nama Pertama',
            ln: 'Nama Akhir',
            email: 'Emel',
            tel: 'No Telefon',
            web: 'Laman Sesawang',
            msj: 'Kata kata terakhir (sebelum mati)..'
        },
        es: {
            fn: 'Nombre de pila',
            ln: 'Apellido',
            email: 'Email',
            tel: 'Número de teléfono',
            web: 'Sitio web',
            msj: 'Escribe tu mensaje aquí'
        },
        ar: {
            fn: 'الاسم الاول',
            ln: 'الكنية',
            email: 'البريد الإلكتروني',
            tel: 'رقم هاتف',
            web: 'موقع الكتروني',
            msj: 'اكتب رسالتك هنا'
        },
        hi: {
            fn: 'पहला नाम',
            ln: 'अंतिम नाम',
            email: 'ईमेल',
            tel: 'टेलीफोन नंबर',
            web: 'वेबसाइट',
            msj: 'अपना संदेश यहां टंकित करें'
        },
        zh: {
            fn: '名字',
            ln: '姓',
            email: '电子邮件',
            tel: '电话号码',
            web: '网站',
            msj: '在这里输入你的消息'
        },
        fa: {
            fn: 'نام کوچک',
            ln: 'نام خانوادگی',
            email: 'پست الکترونیک',
            tel: 'شماره تلفن',
            web: 'سایت اینترنتی',
            msj: 'پیام خود را اینجا بنویسید'
        },

    }

    // prototype holds methods (save memory space) 
    FJScript.prototype = {
        // 'this' refers to the calling object at execution time  
        formalFullName: function () {
            return this.lastName + ", " + this.firstName;
        },
        validate: function () {
            if (supportedLangs.indexOf(this.lang) === -1) {
                throw "Invalid language";
            }
        },
        // retrieve messages from obj by referring to properties using [] 
        greeting: function () {
            // let info = '';
            return greetings[this.lang] + ' ' + this.firstName[0].toUpperCase() + this.firstName.slice(1);
        },
        greet: function () {
            var msg = this.greeting();
            if (console) {
                console.log(msg);
            }
            // make chainable 
            return this;
        },
        information: function () {
            var self = this;
            var info = '';

            formalFullName = self.formalFullName()
                .toLowerCase()
                .split(' ')
                .map(function (word) {
                    return word[0].toUpperCase() + word.substr(1);
                })
                .join(' ');

            info += "<h4><center>" + formalFullName + ' </center></h4>';
            info += formLangs[self.lang].email + ' :<br> ' + self.email + ' <br><br>';
            info += formLangs[self.lang].tel + ' :<br> ' + self.tel + ' <br><br>';
            info += formLangs[self.lang].web + ' :<br> ' + self.web + ' <br><br>';
            info += formLangs[self.lang].msj + ' :<br> ' + self.message + ' <br><br>';

            return info;
        },
        formLang: function () {
            return formLangs[this.lang];
        },
        log: function () {
            if (console) {
                console.log(logMsg[this.lang] + ': ' + this.formalFullName());
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
        },
        HTMLInfo: function (selector) {
            if (!selector) {
                throw "Missing jQuery selector";
            }

            var info = this.information();
            $(selector).html(info);

            return this;
        },
        setHTMLFormLang: function () {
            var selFormLang = this.formLang();
            // console.log(selFormLang);
            $('input[name="firstName"]').attr('placeholder', selFormLang.fn);
            $('input[name="lastName"]').attr('placeholder', selFormLang.ln);
            $('input[name="email"]').attr('placeholder', selFormLang.email);
            $('input[name="tel"]').attr('placeholder', selFormLang.tel);
            $('input[name="web"]').attr('placeholder', selFormLang.web);
            $('textarea[name="message"]').attr('placeholder', selFormLang.msj);
        },


    };

    // Function constructors - the actual obj is created here, allowing to use 'new' an obj without calling 'new'
    FJScript.init = function (firstName, lastName, email, tel, web, message, lang) {

        var self = this;
        self.firstName = firstName || '&lt; firstname &gt;';
        self.lastName = lastName || '&lt; lastname &gt;';
        self.email = email || '&lt; email &gt;';
        self.tel = tel || '&lt; tel &gt;';
        self.web = web || '&lt; web site &gt;'
        self.message = message || '&lt;Your Message&gt;';
        self.lang = lang || 'en';

        self.validate();
    }

    // trick borrowed from jQuery instead of using 'new' keyword 
    FJScript.init.prototype = FJScript.prototype;

    // atach FJScript to global object, and provide a shorthand 'FJScript' 
    global.FJScript = global.FJ = FJScript;

}(window, jQuery));