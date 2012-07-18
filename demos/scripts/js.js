/* This depends on the availability of Modernizr. */

window.Lib = (function(window,document){
    if(window.Modernizr === undefined){
        throw new Error('Sorry! This script requires Modernizr.');
    }

    Lib = {};

    Lib.removeclass = function(el,classname){
        if(el.classList !== undefined ){
            el.classList.remove(classname);
        } else {
            el.className = el.className.replace(classname, '');
        }
    }

    Lib.addclass = function(el,classname){
        if(el.classList !== undefined ){
            el.classList.add(classname);
        } else {
            el.className += classname;
        }
    }

    Lib.numclasses = function(el){
        if(el.classList !== undefined ){
            return el.classList.length;
        } else {
            var classes = el.className.split(' ');
            return classes.length;
        }
    }

    Lib.getclasses = function(el){
        if(el.classList !== undefined ){
            return el.classList;
        } else {
            return el.className;
        }
    }


    Lib.transitionend = function(){
        var transitions = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition'    : 'transitionend',
            'OTransition'      : 'oTransitionEnd',
            'msTransition'     : 'MSTransitionEnd',
            'transition'       : 'transitionend'
        }

        return transitions[Modernizr.prefixed('transition')];
    }

    Lib.addhandlers = function(thenodelist, event, thefunction, undefined){
        var x, usecapture, num = thenodelist.length;

        arguments[3] === undefined ? usecapture = false : usecapture = true;

        for(x=0; x < num; x++){
            thenodelist[x].addEventListener(event,thefunction,usecapture);
        }
    }

    Lib.sprintf = function(format){
        var x, num, finds = format.match(/%[0-9]{1,}/gmi), replaces = arguments[1];

        if( replaces === undefined ){
            throw new Error('The second argument must be an array');
        } else {

            num = finds.length;

            for(x=0; x < num; x++){
                format = format.replace(finds[x], replaces[x]);
            }
            return format;
        }
    }

    Lib.changeonenter = function(){
        var keypresshandler = function(e){
            // if we have hit the Enter / Return key...
            if( e.keyCode == 13 ){
               var evt = document.createEvent('Event');
               evt.initEvent('change',false,false);

               // which element has focus?
               document.activeElement.dispatchEvent(evt);
            }
        }
        window.addEventListener('keypress',keypresshandler,false);
    }

    Lib.escapetoreset = function(form){
        var keypresshandler = function(e){
            // if we have hit the Enter / Return key...
            if( e.keyCode == 27 ){
              form.reset();
            }
        }
        window.addEventListener('keydown',keypresshandler,false);
        window.addEventListener('keypress',keypresshandler,false);
    }

    Lib.toggleClass = function(element, classname){
        if( document.body.classList === undefined ){
           var re = new RegExp(classname,'g')
            if( element.className.match(re) ){
                element.className = element.className.replace(re, '');
            } else {
                element.className += classname;
            }
        } else {
            element.classList.toggle(classname);
        }
    }
    return Lib;

})(this,this.document);


