// (function(){
    var form   = document.getElementById('rotation'),
        out = document.getElementById('result')
        orig   = out.innerHTML,
        obj = document.getElementById('object');


    var onchange = function(e){
        if( e.target.toString() == '[object HTMLInputElement]' ){
            var str, deg, o = obj, op = out,
                tf = Modernizr.prefixed('transform');

            if( e.target.type == 'checkbox' ){

                if( e.target.checked === true ){
                    o.classList.add('transition');
                } else {
                    o.classList.remove('transition');
                }

            } else {

                deg = (e.target.value * 1);
                str = 'rotate('+deg+'deg)';
                o.style[tf] = str;
                tn = document.createTextNode( str );

                if( op.firstChild ){
                    op.replaceChild(tn,op.firstChild);
                } else {
                    op.appendChild(tn);
                }
            }
        }
    }

    form.addEventListener('change',onchange,false);
    form.addEventListener('submit',function(e){ e.preventDefault(); },false);

    form.addEventListener('reset', function(e){
        o = obj, op = out, or = orig;
        o.style[Modernizr.prefixed('transform')] = 'none';
        op.innerHTML = or;
    },false);

    // Reset on esc
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 27){
           form.reset();
        }
    },false);

// })();