document.addEventListener("DOMContentLoaded", function() {
    /** map */
    $('.map-action').hover(function(){
        var id = $(this).attr('id');
        $('.item-office[data-target='+id+']').addClass('active');
        
    }, function(){
        $('.item-office').removeClass('active');
    });

    $('.select_cidade').change(function(){
        var cidade = $(this).val();
        var csrfToken = $('#csrfToken').val();

        $.ajax({
            method: "POST",
            url: "/novo/pages/bairros",
            headers: {
                'X-CSRF-Token': csrfToken
            },
            data: { cidade: cidade }
          })
            .done(function( msg ) {
              $('.select_bairros').html(msg);
            });
    });

    setTimeout(function() {
        $('body').addClass('page-start');
        $('.loading').fadeOut();
    }, 300);
    if($(window).width() <= 960) {
        $('.mobile_wrap').insertAfter($('header .wrapper .logo')) ;                 
    }
    $("#search_action").click("click", function(e){
        if(!this.parentNode.classList.contains('open')) {
            e.preventDefault();
            this.parentNode.parentNode.classList.add('open');
        }
    });

    webdoor_config();
    

    $('.webdoor .media').slick({
        appendArrows: $('.webdoor .arrows_wrap'),
        fade: true
    });
    $('.webdoor .text .slider').slick({
        arrows: false,
        draggable: false,
        fade: true
    });
    $('.simple_slider').each(function(index, element) {
        $(this).addClass('item-'+index);
        $('.simple_slider.item-'+index).slick({
            slidesToShow: 3,
            slidesToScroll: 1 ,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    });
    
    $('.webdoor .arrows_wrap .slick-arrow').click(function () {
        if($(this).hasClass('slick-next')) {
            $('.webdoor .text .slider').slick('slickNext');
        }
        else {
            $('.webdoor .text .slider').slick('slickPrev');
        }
    });
    $('#main_menu .has_sub').click(function (e) {
        if($(window).width() <= 960) {
            $(this).toggleClass('active');
        }
    });
    $('#header .menu_handle').click(function (e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('#header .wrapper_menu').toggleClass('active');
    });
   /* $(window).scrollTop(1);
    $(window).scroll(function () { 
        $('#header').each(function (index, element) {
            var top_of_element = $(this).offset().top;
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var top_of_screen = $(window).scrollTop();
            if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
                $(this).addClass('active');
            }
            //else {
            //     $(this).removeClass('fade');
            // }            
        });
    });*/
    //SITE CEDAE
    $(".item nav ul li").click(function(){
        console.log('clicked');
        $(this).find('.dropdown-content').toggleClass('hover_me');
        // $('.dropdown-content').toggleClass("hover_me");
    });
    $("#menu-toogle").click(function(){
        $('.item ul').toggleClass('active');
        $('#menu-toogle span').toggleClass('active');
    });
    $('#banner .wrapper .webdoor_home').slick({
        arrows: false,
        draggable: true,
        fade: true,
        dots: true,
        infinite: true,
        autoplay: true
    });
    $( function() {
        $('.section_interna .wrapper .list_news').accordion(
        );
      } );
      var $doc = $('html, body');
        $('.scrollSuave').click(function() {
            $doc.animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
            return false;
        });
        $('.timeline .box .wrapper .slider').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
            centerPadding: '40px',
            arrows: true
        });
        $(document).scroll(function() {
            if (window.matchMedia("(min-width: 1026px)").matches) {
                var scrollTop = $(window).scrollTop();
                if (scrollTop >= 100 ) {
                    $('#header').addClass("active");
                    // console.log('entrou');
                }
                else{
                    $('#header').removeClass("active");
                    // console.log('saiu');
                }
            }
        });

        //** */
        $('.content_partners').hide();
        $('.content_partners#tabs-1').show();
        $('.menu_partners .item[data-id=tabs-1]').addClass('active');
        $('.menu_partners .item').click(function(event){
            var data_id = $(this).attr('data-id');
            $('.content_partners').hide();
            $('.content_partners#'+data_id).show();
            $('.menu_partners .item').removeClass('active');
            $(this).addClass('active');
        });

        //nossos pilares mobile
                //** */
        $('.mobile-box .item .bottom#tabs-1').addClass('active');
        $('.mobile-box .item .top[data-id=tabs-1]').addClass('active');
        $('.mobile-box .item .top').click(function(event){
            var data_id = $(this).attr('data-id');
            $('.mobile-box .item .top').removeClass('active');
            $('.mobile-box .item .bottom').removeClass('active');
            $('.mobile-box .item .bottom#'+data_id).addClass('active');
            $(this).addClass('active');
        });
                //nossos programs mobile
                //** */
                
        $('.section_projects_mobile .wrapper .box-content .item .item-content#tabs-1').addClass('active');
        $('.section_projects_mobile .wrapper .box-content .item .media[data-id=tabs-1]').addClass('active');
        $('.section_projects_mobile .wrapper .box-content .item .media').click(function(event){
            var data_id = $(this).attr('data-id');
            $('.section_projects_mobile .wrapper .box-content .item .media').removeClass('active');
            $('.section_projects_mobile .wrapper .box-content .item .item-content').removeClass('active');
            $('.section_projects_mobile .wrapper .box-content .item .item-content#'+data_id).addClass('active');
            $(this).addClass('active');
        });
                //nossos programas
                //** */
        $('.content_item').hide();
        $('.content_item#tabs-1').show();
        $('.box-content .nav-box .item[data-id=tabs-1]').addClass('active');
        $('.box-content .nav-box .item').click(function(event){
            var data_id = $(this).attr('data-id');
            $('.content_item').hide();
            $('.content_item#'+data_id).show();
            $('.nav-box .item').removeClass('active');
            $(this).addClass('active');
        });
        $('.transparency .box .slide-title .slider_transparencia').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: "unslick"
                }
            ]
        });
        $('.webdoor_slider .box_slider').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            speed: 2000
        });
        if (window.matchMedia("(max-width: 768px)").matches) {
            /* the viewport is less than 768 pixels wide */
            $('.section_lifes .wrapper .box').slick({
                arrows: false,
                dots: true
            });
            $('.section_news .wrapper .box').slick({
                arrows: false,
                dots: true
            });
          }
          $('.programs .wrapper .programs_slider').slick({
            arrows: false,
            dots: true
        });
});


function webdoor_config(){
    $(".webdoor_principal").each(function(index) {
        try {
            var data_id = $(this).attr('data-id');
            var data_class = $(this).attr('data-class');
            var data_size = $(this).attr('data-size');

            $('.webdoor_principal[data-id='+data_id+'] figure').hide();
            var float_obj = $('.webdoor_principal[data-id='+data_id+'] figure').css('float');
            var img = "<img src='"+$('.webdoor_principal[data-id='+data_id+'] figure img').attr('src')+"'/>";
            var title = "<h2 class='"+data_class+"'>"+$('.webdoor_principal[data-id='+data_id+'] figure figcaption strong').html()+"</h2>";
            var description = "<p>"+$('.webdoor_principal[data-id='+data_id+'] figure figcaption em').html()+"</p>";
            
            $('.webdoor_principal[data-id='+data_id+'] figure figcaption a').addClass(data_class);
            var button = $('.webdoor_principal[data-id='+data_id+'] figure figcaption a')[0].outerHTML;

            if($('.webdoor_principal[data-id='+data_id+'] figure figcaption a').html()=="" || $('.webdoor_principal[data-id='+data_id+'] figure figcaption a').html()=="&nbsp;" || $('.webdoor_principal[data-id='+data_id+'] figure figcaption a').html()==" "){
                button="";
            }
       
            var filter = '<div class="filter_bg"></div>';
            $('.webdoor_principal[data-id='+data_id+']').append(img+filter+"<div class='wrapper'>"+"<div class='content_text "+float_obj+" "+data_size+"'>"+title+description+button+"</div></div>");
        }catch(err){
                
        }
    });
}

// especial dia das mães
var cenaMaes = {
    scene: 0,
    nextScene: 1,
    skinModel: null,
    init: function(){
        console.log('cena mães iniciado');
        this.mount();
        this.listenerButtons();
    },
    mount: function(){
        $('.scene[data-scene='+this.scene+']').addClass('active');
    },
    listenerButtons: function(){
        $('.nextScene').click(function(e){
            e.preventDefault();
            cenaMaes.changeScene();
            console.log('clicked');
        });
        $('.chooseModelBtn').click(function(e){
            e.preventDefault();
            var model = $(this).attr('data-model');
            cenaMaes.chooseModel(model);
            console.log('choose model btn');     
        });
        $(".btnChoseImage").click(function() {
            $("#uploadedImage").click();
        });
        $("#uploadedImage").change(function() {
            console.log('file selected');
            cenaMaes.mountMergeScene();
        });
        $('#sendScene').click(function(e){
            e.preventDefault();
            cenaMaes.sendImage();
            console.log('send imagel btn');
        });
    },
    changeScene: function(){
        $('.scene').removeClass('active');
        $('.scene[data-scene='+this.nextScene+']').addClass('active');
        this.nextScene++;
    },
    chooseModel: function(model){
        this.skinModel = model;
        $('.model-doll[data-model='+model+']').show();
        var mask_a = document.getElementById('mask_a');
        var mask_b = document.getElementById('mask_b');

        var image_mask_a = document.getElementById('image-mask-a');
        var image_mask_b = document.getElementById('image-mask-b');

        var mask = document.getElementById('mask');
        var maskImage = document.getElementById('image-mask');

        console.log(model);
        console.log(image_mask_a.src);

        if(model=="a"){
            mask.src = mask_a.src;
            maskImage.src = image_mask_a.src;
            console.log(model);
            console.log(mask.src);
        }else{
            mask.src = mask_b.src;
            maskImage.src = image_mask_b.src;
        }

        this.changeScene();
    },
    mountMergeScene: function(){
        var output = document.getElementById('uploadedImage');
        var preview = document.getElementById('preview');
        preview.src = window.URL.createObjectURL(output.files[0]);
        preview.addEventListener("load", function(){
            dragControl.resize();
        });

        this.changeScene();
        this.dragImage();
    },
    dragImage: function(){
        dragControl.init();
    },
    mergeImage: function(){
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        var img = document.getElementById("preview");
        var mask = document.getElementById("mask");
        var imageLeft = img.style["left"].substr(0, img.style["left"].indexOf("px"));
        var imageTop = img.style["top"].substr(0, img.style["top"].indexOf("px"));
        console.log(imageTop);

        ctx.drawImage(img, imageLeft, imageTop, img.offsetWidth, img.offsetHeight); 
        ctx.drawImage(mask, 0, 0, 530, 531); 
    },
    sendImage: function(){
        var canvas = document.getElementById("canvas");
        var finalImage = document.getElementById('finalImage');
        finalImage.src = canvas.toDataURL();
        cenaMaes.saveFile();
        cenaMaes.changeScene();
    },
    saveFile: function(){
        var canvas = document.getElementById("canvas");
        var saveFileBtn = document.getElementById("saveFile");
        saveFileBtn.href = canvas.toDataURL('image/png');
    },
    sendMerged: function(){},
    getFinalImage: function(){}
}

var dragControl = {
    // enable drag
    draggable: false,

    // movement
    movement: true,
    mouseX: 0,
    mouseY: 0,
    restMouseX: 0,
    restMouseY: 0,
    image: document.getElementById('preview'),
    workbox: document.getElementById('work-box'),
    scale: 1,
    range_min_px: 120,
    range_max_px: 500,

    // functions
    init: function(){
        console.log('initialized');
        var workbox = document.getElementById('image-mask');
        workbox.addEventListener('mousedown', this.startDrag);
        workbox.addEventListener('mouseup', this.endDrag);
        workbox.addEventListener('mousemove', this.dragging);

        workbox.addEventListener("touchstart", this.startTouch, true);
        workbox.addEventListener('touchmove', this.touching, true);
        workbox.addEventListener('touchend', this.endTouch, true);
        workbox.addEventListener('touchcancel', this.endTouch, true);

        // $(document).on("touchstart", function(){
        //     dragControl.startDrag();
        // });

        // $(document).on("touchend", function(){
        //     dragControl.endDrag();
        // });
        
        // $(document).on("touchmove", function(e){
        //     e.preventDefault();
        //     dragControl.dragging();
        // });
     
        $(".decrease").click(function() {
            dragControl.decrease();
        });
        $(".increase").click(function() {
            dragControl.increase();
        });
        $(".merge").click(function() {
            dragControl.merge();
        });

        $("#rangeSelector").change(function(){
            var rangeSelector = $('#rangeSelector');
            var preview = document.getElementById('preview');
            preview.style['width']=(rangeSelector.val())+'px';
            dragControl.merge();
        });
        
        dragControl.merge();
    },
    resize: function(){
        var preview = document.getElementById('preview');
        preview.style['width']=400+'px';
        dragControl.merge();
    },
    startDrag: function(e){
        dragControl.draggable = true;
        restMouseX = e.clientX;
        restMouseY = e.clientY;
        image_left = dragControl.image.offsetLeft;
        image_top = dragControl.image.offsetTop;

        cenaMaes.mergeImage();
        // $('.mask').addClass('disabled');
        // $('.preview').removeClass('disabled');
    },
    endDrag: function(e){
        dragControl.draggable = false;
        dragControl.merge();
        console.log('can`t drag');

        // $('.preview').addClass('disabled');
    },
    dragging: function(e){
        console.log('foi');
        mouseX = e.clientX;
        mouseY = e.clientY;

        if(dragControl.draggable){
            console.log('draggable');
            deltaX = mouseX - restMouseX;
            deltaY = mouseY - restMouseY;
            image_width = dragControl.image.offsetWidth;
            image_height = dragControl.image.offsetHeight;
            
            dragControl.image.style["left"] = (image_left + deltaX) + 'px';
            dragControl.image.style["top"] = (image_top + deltaY) + 'px';
            
            cenaMaes.mergeImage();
            console.log(mouseX + ' - ' + image_left);
        } else {

        }
    },
    startTouch: function(e){
        console.log('starting touch');
        dragControl.draggable = true;
        dragControl.restMouseX = e.touches[0].clientX;
        dragControl.restMouseY = e.touches[0].clientY;
        dragControl.image_left = dragControl.image.offsetLeft;
        dragControl.image_top = dragControl.image.offsetTop;

        cenaMaes.mergeImage();
        console.log(e.touches[0].clientX);
    },
    touching: function(e){
        e.preventDefault();
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        console.log(mouseX);

        if(dragControl.draggable){
            console.log('draggable');
            deltaX = mouseX - dragControl.restMouseX;
            deltaY = mouseY - dragControl.restMouseY;
            image_width = dragControl.image.offsetWidth;
            image_height = dragControl.image.offsetHeight;
            
            dragControl.image.style["left"] = (dragControl.image_left + deltaX) + 'px';
            dragControl.image.style["top"] = (dragControl.image_top + deltaY) + 'px';
            
            cenaMaes.mergeImage();
            console.log(mouseX + ' - ' + dragControl.image_left);
        } else {

        }
    },
    endTouch: function(e){
        dragControl.draggable = false;
        dragControl.merge();
        console.log('can`t drag');

        // $('.preview').addClass('disabled');
    },
    decrease: function(){
        console.log('decreased');
        dragControl.scale = dragControl.scale - 0.05;
        dragControl.image.style["width"] = (dragControl.image.offsetWidth * dragControl.scale)+"px";
        dragControl.image.style["height"] = (dragControl.image.offsetHeight * dragControl.scale)+"px";
        cenaMaes.mergeImage();
    },
    increase: function(){
        console.log('increased');
        dragControl.scale = dragControl.scale + 0.05;
        dragControl.image.style["width"] = (dragControl.image.offsetWidth * dragControl.scale)+"px";
        dragControl.image.style["height"] = (dragControl.image.offsetHeight * dragControl.scale)+"px";
        cenaMaes.mergeImage();
    },
    merge: function(){
        cenaMaes.mergeImage();
    }
}



document.addEventListener("DOMContentLoaded", function() {
    cenaMaes.init();
});