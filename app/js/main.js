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
    $(window).scrollTop(1);
    $(window).scroll(function () { 
        $('.watching').each(function (index, element) {
            var top_of_element = $(this).offset().top;
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var top_of_screen = $(window).scrollTop();
            if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
                $(this).addClass('fade');
            }
            //else {
            //     $(this).removeClass('fade');
            // }            
        });
    });
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
});