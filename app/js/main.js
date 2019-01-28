document.addEventListener("DOMContentLoaded", function() {
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
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: true,
            centerPadding: '40px',
            arrows: false
        });
        $(document).scroll(function() {

            var scrollTop = $(window).scrollTop();
                  if (scrollTop >= 100 ) {
                      $('#header').addClass("active");
                      console.log('entrou');
                  }
                  else{
                      $('#header').removeClass("active");
                      console.log('saiu');
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
            arrows: true
        });
});


function webdoor_config(){
    $('.webdoor_principal figure').hide();

    var float_obj = $('.webdoor_principal figure').css('float');
    var img = "<img src='"+$('.webdoor_principal figure img').attr('src')+"'/>";
    var title = "<h2>"+$('.webdoor_principal figure figcaption strong').html()+"</h2>";
    var description = "<p>"+$('.webdoor_principal figure figcaption em').html()+"</p>";
    var filter = '<div class="filter_bg"></div>';
    $('.webdoor_principal').append(img+filter+"<div class='wrapper'>"+"<div class='content_text "+float_obj+"'>"+title+description+"</div></div>");
}