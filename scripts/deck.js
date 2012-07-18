(function(){
    var transformorigin = document.getElementById('transformtrigger'),
        td    = document.getElementById('twoDtransforms'),
        thd   = document.getElementById('threeDtransforms'),
        thd   = document.getElementById('threeDtransforms'),
        bft   = document.getElementById('backfacetrigger'),
        tfs   = document.getElementById('transformstyletrig'),
        pdbt  = document.getElementById('perspectivedemobtn'),
        perspc = document.getElementById('perpsectivec'),
        sb    = document.getElementById('stackingbtn'),
        cbdt  = document.getElementById('containbtn'),
        /* functions */
        tochange,
        twodchange,
        threedchange,
        twodreset,
        theedreset;

    tochange = function(e){
        var demos = document.getElementsByClassName('transordemof'),
            len = demos.length;

        for(var x=0; x < len; x++){
            demos[x].classList.toggle('rotate');
        }
    }
    transformorigin.addEventListener('click', tochange, false);

    /* Two D Transforms demo */
    twodchange = function(e){
        var twod = document.getElementById('twoDtransformObj'), remove, i;

       if( e.target.toString() == '[object HTMLButtonElement]' && e.target.type == 'button'){

            console.log( twod.classList );

            // Clear every class but stdemo
            for( i = 1; i < twod.classList.length; i++){
                remove = twod.classList.item(i);
                twod.classList.remove(remove);
            }

            twod.classList.toggle(e.target.id);

       }
    }
    twodreset = function(e){
       var twoDObj = document.getElementById('twoDtransformObj')
       var notstdemo = twoDObj.classList.item(1);
       twoDObj.classList.remove(notstdemo);
    }
    td.addEventListener('click',twodchange,false);
    td.addEventListener('reset',twodreset,false);


    /* 3D functions demo */
    threedchange = function(e){
       var threeDObj, remove,i ;

       if( e.target.toString() == '[object HTMLButtonElement]' && e.target.type == 'button'){

            threeDObj = document.getElementById('threeDtransformObj');

            // Clear every class but stdemo
            for( i = 1; i < threeDObj.classList.length; i++){
                remove = threeDObj.classList.item(i);
                threeDObj.classList.remove(remove);
            }
            threeDObj.classList.toggle(e.target.id);

       }
    }
    thd.addEventListener('click', threedchange,false);

    threedreset = function(e){
       var notstdemo, threeDObj = document.getElementById('threeDtransformObj');

       for( var i = 1; i < threeDObj.classList.length; i++){
            var remove = threeDObj.classList.item(i);
       }

       notstdemo = threeDObj.classList.item(1);
       threeDObj.classList.remove(notstdemo);
    }
    thd.addEventListener('reset',threedreset,false);

    /* Toggle back face slide */
    bft.addEventListener('click',function(e){
        var faces = document.getElementById('backfacecube').getElementsByTagName('figure'),
                    len = faces.length;
        for(var i = 0; i < len; i++){
            faces[i].classList.toggle('bf');
        }
    },false);

    /* Toggle transform style */
    tfs.addEventListener('click', function(e){
         document.getElementById('transformstylecube').classList.toggle('threed');
    }, false);


    /* Perspective demo */
    perspc.addEventListener('change', function(e){
        console.log( e.target.value )

        var  po = document.getElementById('perspectivedemowrap'),
            lbl = document.getElementById('perpsectivelabel');

            po.style[Modernizr.prefixed('perspective')] = e.target.value+'px';

    }, false);

    document.getElementById('podform').addEventListener('submit', function(e){
        e.preventDefault();
    },false);

    /* Stacking context */
    sb.addEventListener('click', function(){
        document.getElementById('lipsumscale').classList.toggle('transform');
    }, false);

    /* Containing block */
    cbdt.addEventListener('click', function(){
       document.getElementById('containingblockdemo').classList.toggle('transform');
       document.getElementById('containingblocktext').classList.remove('hidden');
    }, false);
})();