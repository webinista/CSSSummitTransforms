var init = function(){
    var togglebf,
        persphandler,
        persporiginhandler,
        faces = document.getElementsByTagName('figure'),
        bf = document.getElementById('backface'),
        ct = document.getElementById('ctn'),
        cb = document.getElementById('cube'),
        form = document.getElementById('controls'),
        resetform,
        per = document.getElementById('per'),
        perorx = document.getElementById('perorx'),
        perory = document.getElementById('perory'),

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

    persphandler = function(){
        var c = ct, p = per.value, b = cb;
        ctcurtrans = c.style[ Modernizr.prefixed('perspective') ] = p+'px';
    },

    persporiginhandler = function(e){
        var ct = ctn,
            pox = perorx,
            poy = perory,
            psv = per,
            changepersp = document.createEvent('Event');

        ctn.style[ Modernizr.prefixed('perspectiveOrigin') ] = Lib.sprintf('%0px %1px',[pox.value,poy.value]);

        if( per.value == 0 ){
            per.value = 500;
        }
        changepersp.initEvent('change',false,true);
        per.dispatchEvent(changepersp);

    }

    resethandler = function(e){
        var resetbf;

        /* Reset cube and container upon form reset */
        ct.style.cssText = '';

        cb.removeAttribute('style');
        ct.removeAttribute('style');

        // Reset the back face setting
        bf.checked = true;
        resetbf = document.createEvent('Event');
        resetbf.initEvent('change',false,false);
        bf.dispatchEvent(resetbf);
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

    per.addEventListener('change',persphandler,false);

    /* Taking advantage of event delegation */
    t3d.addEventListener('change',persporiginhandler,false);

}

window.addEventListener('DOMContentLoaded',init,false);
