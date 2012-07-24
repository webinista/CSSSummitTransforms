var init = function(){
    var sides = document.getElementById('sides'),
        sideshandler, togglebf, twodhandler,
        persphandler, r3dhandler, t3dhandler,
        s3dhandler, resetform,
        trigger = document.getElementsByClassName('trigger'),
        faces = document.getElementsByTagName('figure'),
        bf = document.getElementById('backface'),
        ct = document.getElementById('ctn'),
        cb = document.getElementById('cube'),
        rotate = document.getElementById('rotate'),
        skewx = document.getElementById('skewX'),
        skewy = document.getElementById('skewY'),
        scale = document.getElementById('scale'),
        transx = document.getElementById('translatex'),
        transy = document.getElementById('translatey'),
        form = document.getElementById('controls'),
        mtfm = Modernizr.prefixed('transform'),
        per = document.getElementById('per'),
        rx = document.getElementById('rx'),
        ry = document.getElementById('ry'),
        rz = document.getElementById('rz'),
        ra = document.getElementById('ra'),
        tx = document.getElementById('tx'),
        ty = document.getElementById('ty'),
        tz = document.getElementById('tz'),
        sx = document.getElementById('sx'),
        sy = document.getElementById('sy'),
        sz = document.getElementById('sz'),
        curtrans = '';

    sideshandler = function(e){
        var figs = document.getElementsByTagName('figure'),
            len  = figs.length,
            i, backface = bf, psv = per,
            evt, pevt;
        /* Hide everything except the first one*/
        for(i = 1; i < len; i++){
            figs[i].classList.add('hide');
        }
        for(i = 1; i < e.target.value; i++){
            figs[i].classList.remove('hide');
        }

        if( e.target.value > 1 ){

            backface.disabled = false;
            backface.checked = true;

            evt = document.createEvent('Event');
            evt.initEvent('change',false,true);
            backface.dispatchEvent(evt);

            psv.value = 500;
            psv.dispatchEvent(evt);

            Lib.addclass(document.getElementById('t2d'),'close');
            Lib.removeclass(document.getElementById('t3d'),'close');
            Lib.removeclass(document.getElementById('toggle'),'disable');

        } else {
             backface.disabled = true;

             Lib.addclass(document.getElementById('toggle'),'disable');
             document.getElementById('t2d').classList.remove('close');
             document.getElementById('t3d').classList.add('close');
        }
    }

togglebf = function(e){
        var i,
            frontfaces = document.getElementsByTagName('figure'),
            len = frontfaces.length,
            bvp = document.getElementById('bvp'),
            bvptext;


        if( e.target.checked === true){
            for(i = 0; i < len; i++){
                frontfaces[i].classList.add('bf');
            }
            bvptext = 'visible';
        } else {
            for(i = 0; i < len; i++){
                frontfaces[i].classList.remove('bf');
            }
            bvptext = 'hidden'
        }
        bvp.replaceChild( document.createTextNode(bvptext), bvp.firstChild);
    },
    twodhandler = function(){
       var cub = cb,
           r = rotate,
           skx = skewx,
           sky = skewy,
           sc = scale,
           t2x = transx,
           t2y = transy,
           str = 'rotate('+r.value+'deg) skewX('+skx.value+'deg) skewY('+sky.value+'deg) scale('+sc.value+') translate('+transx.value+'px,'+transy.value+'px)';

        curtrans = cb.style[mtfm] = str;

        console.log( str );

    }

    persphandler = function(){
        var c = ct, p = per.value, b = cb;
        ctcurtrans = c.style[ Modernizr.prefixed('perspective') ] = p+'px';
    }

    r3dhandler = function(){
        var x = rx.value,
            y = ry.value,
            z = rz.value,
            a = ra.value,
            c = cb;

        /* Remove existing rotate function. */
        if( c.style[mtfm].indexOf('rotate3d(') > -1 ){
            c.style[mtfm] = c.style[mtfm].replace(/rotate3d\((-|)[0-9]{1,}, (-|)[0-9]{1,}, (-|)[0-9]{1,}, (-|)[0-9]{1,}deg\)/g,'');
        }
        c.style[mtfm] += ' rotate3d('+x+','+y+','+z+','+a+'deg)';

        curtrans = c.style[mtfm];
    }


    t3dhandler = function(){
        var x = tx.value,
            y = ty.value,
            z = tz.value,
            c = cb;

        /* Remove existing translate function. */
        if( c.style[mtfm].indexOf('translate3d(') > -1 ){
            c.style[mtfm] = c.style[mtfm].replace(/translate3d\((-|)[0-9]{1,}px, (-|)[0-9]{1,}px, (-|)[0-9]{1,}px\)/g,'');
        }
        c.style[mtfm] += ' translate3d('+x+'px,'+y+'px,'+z+'px)';

        curtrans = c.style[mtfm]
    }

    s3dhandler = function(){
        var x = sx.value,
            y = sy.value,
            z = sz.value,
            c = cb;

        /* Remove existing scale function. */
        if( c.style[mtfm].indexOf('scale3d(') > -1 ){
            c.style[mtfm] = c.style[mtfm].replace(/scale3d\((-|)[\.0-9]{1,}, (-|)[\.0-9]{1,}, (-|)[\.0-9]{1,}\)/g,'');
        }

        c.style[mtfm] += ' scale3d('+x+', '+y+', '+z+')';

        curtrans = c.style[mtfm];
    }

    resethandler = function(e){

        /* Reset cube upon form reset */
        cb.style.cssText = '';
        ct.style.cssText = '';

        cb.removeAttribute('style');
        ct.removeAttribute('style');

        /* Hide panels 2 - 6 */
        figs = document.getElementsByTagName('figure'),
        len = figs.length;

        for(i = 1; i < len; i++){
            figs[i].classList.add('hide');
        }

        bf.disabled = true;
        Lib.addclass(document.getElementById('toggle'),'disable');

    }

    /*----- Add event listeners ----*/

    /* Prevent form submission */
    form.addEventListener('submit',function(e){
        e.preventDefault();
    }, false);

    form.addEventListener('reset',resethandler, false);

    /* Reset form when the escape key is hit */
    Lib.escapetoreset(form);

    /* Trigger change event when enter/return key is hit (for Opera) */
    Lib.changeonenter();

    bf.addEventListener('change',togglebf,false);
    sides.addEventListener('change',sideshandler,false);

    rotate.addEventListener('change',twodhandler,false);
    skewx.addEventListener('change',twodhandler,false);
    skewy.addEventListener('change',twodhandler,false);
    scale.addEventListener('change',twodhandler,false);
    transx.addEventListener('change',twodhandler,false);
    transy.addEventListener('change',twodhandler,false);

    per.addEventListener('change',persphandler,false);

    rx.addEventListener('change',r3dhandler,false);
    ry.addEventListener('change',r3dhandler,false);
    rz.addEventListener('change',r3dhandler,false);
    ra.addEventListener('change',r3dhandler,false);

    tx.addEventListener('change',t3dhandler,false);
    ty.addEventListener('change',t3dhandler,false);
    tz.addEventListener('change',t3dhandler,false);

    sx.addEventListener('change',s3dhandler,false);
    sy.addEventListener('change',s3dhandler,false);
    sz.addEventListener('change',s3dhandler,false);

    for( var i = 0; i < trigger.length; i++){
        trigger[i].addEventListener('click', function(e){
            e.target.parentNode.classList.toggle('close');
        }, false);
    }

    /* var getcss = document.getElementById('getcss');

    getcss.addEventListener('click', function(){

        alert( ctcurtrans );
        alert( curtrans );

    },false); */
}
window.addEventListener('DOMContentLoaded',init,false);
