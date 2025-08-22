$(document).ready(function () {

    $('header').load('include/header.html', function () {

    })

    $('footer').load('include/footer.html', function () {

    })


    $('.small_img li').mouseenter(function () {
        liNum = $(this).index();

        sImgActive()

        clearInterval(rolling)

    })

    // $('.small_img li').first().trigger('mouseenter');

    $('.star').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
    })

    $('.star span').click(function (e) {
        e.stopPropagation();
        e.preventDefault(); // 페이지 위로 올라가는 기본 동작 방지

        let idx = $(this).index();

        $(this).parent().find('span').removeClass('on');

        $(this).parent().find('span').each(function (i) {
            if (i <= idx) {
                $(this).addClass('on');
            }
        });
    });



    $('.small_img li ').mouseleave(function () {
        rolling = setInterval(rollingImg, 3000)
    })


    let rolling = setInterval(rollingImg, 3000)

    let liNum = 0;
    let sLength = $('.small_img li').length;

    function rollingImg() {
        liNum++;
        if (liNum >= 4) {
            liNum = 0
        }

        sImgActive()

    };

    function sImgActive() {
        let sImg = $('.small_img li').eq(liNum).find('img').attr('src');
        let sTitle = $('.small_img li').eq(liNum).find('.title').text();
        let sCategory = $('.small_img li').eq(liNum).find('.category').text();

        //  let sImg = $('.small_img li').eq(liNum).find('img').attr('src'); =  let sImg = $(this).find('img').attr('src');


        $('.big_img img, .big_img .textbox').stop(true, true).fadeOut(200, function () {
            if ($(this).is('img')) {
                $(this).attr('src', sImg);
            } else if ($(this).hasClass('textbox')) {
                $(this).find('.title').text(sTitle);
                $(this).find('.category').text(sCategory);
            }
        }).fadeIn(200);

        // $('.big_img img').attr('src', sImg);
        // $('.big_img .title').text(sTitle)
        // $('.big_img .tcategory').text(sCategory)

        $('.small_img li').eq(liNum).addClass('on').siblings().removeClass('on');
    };


    // sImg1로 시작
    let sImg0 = $('.small_img li').eq(0).find('img').attr('src');
    let sTitle0 = $('.small_img li').eq(0).find('.title').text();
    let sCategory0 = $('.small_img li').eq(0).find('.category').text();

    $('.big_img img').attr('src', sImg0)
    $('.big_img .title').text(sTitle0)
    $('.big_img .category').text(sCategory0)


    // 말줄임
    $('#section3 .review .l_box .detail').each(function () {
        let dot = 400;
        let text = $(this).text().trim();

        if (text.length > dot) {
            let realText = text.substring(0, dot)
            $(this).text(realText + '...')
        }
    });

    // 나중에 이걸 기반으로 밑에거 scrT 해보기
    // $(window).scroll(function () {
    //     let scrT = $(this).scrollTop();
    //     if (scrT > 0) {
    //         $('#hero').addClass('on')
    //     } else {
    //         $('#hero').removeClass('on')
    //     }
    // })


    $(window).scroll(function () {
        let scrT = $(window).scrollTop();
        let winH = $(window).height();

        if ($('#hero').length >= 1) {
            let sec1Top = $('#section1').offset().top;
            let sec2Top = $('#section2').offset().top;
            let sec3Top = $('#section3').offset().top;

            if (scrT > 0) {
                $('#hero').addClass('on');
            } else {
                $('#hero').removeClass('on');
            }

            if (scrT > sec1Top - winH / 2) {
                $('#section1 .imgbox').addClass('on');
            } else {
                $('#section1 .imgbox').removeClass('on');
            }

            if (scrT > sec2Top - winH / 2) {
                $('#section2 .content').addClass('on');
            } else {
                $('#section2 .content').removeClass('on');
            }

            if (scrT > sec3Top - winH / 2) {
                $('#section3 .content').addClass('on');
            } else {
                $('#section3 .content').removeClass('on');
            }
        }
    });

    // 0813 추가

    $(window).scroll(function () {
        let scrT = $(window).scrollTop();
        let sec1Top = $('#section1').offset().top;
        let sec2Top = $('#section2').offset().top;
        let sec3Top = $('#section3').offset().top;
        let winH = $(window).height();

        if (scrT > 0) {
            $('#hero').addClass('on');
        } else {
            $('#hero').removeClass('on');
        }

        if (scrT > sec1Top - winH / 2) {
            $('#section1 .imgbox').addClass('on');
        } else {
            $('#section1 .imgbox').removeClass('on');
        }

        if (scrT > sec2Top - winH / 2) {
            $('#section2 .imgbox').addClass('on')
        } else {
            $('#section2 .imgbox').removeClass('on')

        }

        if (scrT > sec3Top - winH / 2) {
            $('#section3 .review').addClass('on')
        } else {
            $('#section3 .review').removeClass('on')

        }
    });



    $('.fa-eye-slash').click(function(){
        $(this).siblings('input[type = "password"]').attr('type','text');

        $('.fa-eye').show()
        $(this).hide()
    })

    $('.fa-eye').click(function(){
        $(this).siblings('input[type = "text"]').attr('type','password');

        $('.fa-eye-slash').show()
        $(this).hide()
    })

    // $('.login .id_box input').keydown(function(e){
    //     console.log(e.key);
    // })

    $('.selectbox .title').click(function(){
        $('.selectbox ul').stop().slideToggle();
    });

    $('.selectbox ul li').click(function(){
        let sT = $(this).text();
        $('.selectbox .title p').text(sT);
        $('.selectbox ul').slideUp();
    });

    $('.search_input').keyup(function(){
        let searchVal = $(this).val();
        if(searchVal != ''){
            $('.search_wrap i').css({color:'#000'});
        } else {
            $('.search_wrap i').css({color:''});
        };
})
});