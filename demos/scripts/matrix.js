(function(){
    var inputs = document.querySelectorAll('input[type=text]'),
        ilen   = inputs.length;
        obj    = document.getElementById('object'),
        form   = document.getElementById('matrix'),
        out    = document.getElementById('result'),
        orig   = out.innerHTML;


    var onchange = function(e){
        if( e.target.toString() == '[object HTMLInputElement]' ){
            var inp = inputs,
            ilen = inp.length,
            arr = [],
            o = obj,
            op = out,
            tf = Modernizr.prefixed('transform'),
            str, tn;

            for(var i = 0; i < ilen; i++){
               arr[i] = inp[i].value;
            }

            ( ilen > 6 ) ? str = 'matrix3d(' : str = 'matrix(';
            str += arr.join(',') +')';

            o.style[tf] = str;

            tn = document.createTextNode( str );

            if( op.firstChild ){
                op.replaceChild(tn,op.firstChild);
            } else {
                op.appendChild(tn);
            }
        }
    }

    form.addEventListener('change',onchange,false);

    form.addEventListener('reset', function(e){
        obj.style[Modernizr.prefixed('transform')] = 'none';
        out.innerHTML = orig;
    },false);

    // Reset on esc
    window.addEventListener('keydown', function(e){
        if(e.keyCode == 27){
           form.reset();
        }
    },false);
})();