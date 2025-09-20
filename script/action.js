$(document).ready(function () {
    // 헤더와 푸터 로드
    $('header').load('include/header.html', function () {
        initMobileMenu();
    })

    $('footer').load('include/footer.html', function () {

    })

    // 모바일 메뉴 초기화 함수
    function initMobileMenu() {
        // 모바일 메뉴 버튼 추가
        if ($('.mobile-menu-btn').length === 0) {
            const mobileBtn = `
                <div class="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            $('header .centerbox').append(mobileBtn);
        }

        // 모바일 메뉴 토글
        $(document).on('click', '.mobile-menu-btn', function () {
            $(this).toggleClass('active');
            $('header nav').toggleClass('mobile-active');
            $('body').toggleClass('menu-open');
        });

        // 모바일에서 서브메뉴 토글
        if ($(window).width() <= 768) {
            $('header nav .gnb > li > a').on('click', function (e) {
                if ($(this).siblings('.lnb').length > 0) {
                    e.preventDefault();
                    $(this).siblings('.lnb').slideToggle();
                    $(this).parent().siblings().find('.lnb').slideUp();
                }
            });
        }
    }

    // 윈도우 리사이즈 시 처리
    let resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if ($(window).width() > 768) {
                $('.mobile-menu-btn').removeClass('active');
                $('header nav').removeClass('mobile-active');
                $('body').removeClass('menu-open');
                $('.lnb').removeAttr('style');
            }
        }, 250);
    });

    // Section1 이미지 갤러리
    $('.small_img li').mouseenter(function () {
        if ($(window).width() > 768) {  // 모바일이 아닐 때만
            liNum = $(this).index();
            sImgActive()
            clearInterval(rolling)
        }
    })

    $('.small_img li').mouseleave(function () {
        if ($(window).width() > 768) {  // 모바일이 아닐 때만
            rolling = setInterval(rollingImg, 3000)
        }
    })

    // 모바일에서는 터치 이벤트 처리
    if ('ontouchstart' in window) {
        $('.small_img li').on('touchstart', function (e) {
            if ($(window).width() > 768) {  // 모바일이지만 태블릿 이상일 때
                e.preventDefault();
                liNum = $(this).index();
                sImgActive()
                clearInterval(rolling)

                // 3초 후 자동 롤링 재시작
                setTimeout(function () {
                    rolling = setInterval(rollingImg, 3000)
                }, 3000);
            }
        });
    }

    let rolling = setInterval(rollingImg, 3000)
    let liNum = 0;
    let sLength = $('.small_img li').length || 4; // small_img가 없으면 4개로 설정

    function rollingImg() {
        liNum++;
        if (liNum >= sLength) {
            liNum = 0
        }
        sImgActive()
    };

    function sImgActive() {
        // 모바일에서는 small_img를 직접 참조해서 이미지 변경
        let sImg, sTitle, sCategory;

        if ($('.small_img li').length > 0) {
            sImg = $('.small_img li').eq(liNum).find('img').attr('src');
            sTitle = $('.small_img li').eq(liNum).find('.title').text();
            sCategory = $('.small_img li').eq(liNum).find('.category').text();
        } else {
            // small_img가 없으면 이미지 배열 사용 (모바일용)
            const imgArray = [
                'images/section1_1.jpg',
                'images/section1_2.jpg',
                'images/section1_3.jpg',
                'images/section1_4.jpg'
            ];
            sImg = imgArray[liNum] || imgArray[0];
        }

        $('.big_img img, .big_img .textbox').stop(true, true).fadeOut(200, function () {
            if ($(this).is('img')) {
                $(this).attr('src', sImg);
            } else if ($(this).hasClass('textbox')) {
                $(this).find('.title').text(sTitle);
                $(this).find('.category').text(sCategory);
            }
        }).fadeIn(200);

        if ($(window).width() > 768) {
            $('.small_img li').eq(liNum).addClass('on').siblings().removeClass('on');
        }
    };

    // 초기 이미지 설정
    if ($('.small_img li').length > 0) {
        let sImg0 = $('.small_img li').eq(0).find('img').attr('src');
        let sTitle0 = $('.small_img li').eq(0).find('.title').text();
        let sCategory0 = $('.small_img li').eq(0).find('.category').text();

        if (sImg0) {
            $('.big_img img').attr('src', sImg0)
            $('.big_img .title').text(sTitle0)
            $('.big_img .category').text(sCategory0)
        }
    } else if ($(window).width() <= 768) {
        // 모바일에서 small_img가 없을 때 첫 이미지 설정
        $('.big_img img').attr('src', 'images/section1_1.jpg')
    }

    // 스크롤 애니메이션
    $(window).scroll(function () {
        let scrT = $(window).scrollTop();
        let winH = $(window).height();
        let isMobile = $(window).width() <= 768;

        if ($('#hero').length >= 1) {
            let sec1Top = $('#section1').offset().top;
            let sec2Top = $('#section2').offset().top;

            // 모바일에서는 스케일 효과 조정
            if (scrT > 0) {
                if (isMobile) {
                    $('#hero').css('transform', 'scale(0.98)');
                } else {
                    $('#hero').addClass('on');
                }
            } else {
                $('#hero').removeClass('on').removeAttr('style');
            }

            // 섹션 애니메이션 트리거 조정
            let triggerOffset = isMobile ? winH * 0.7 : winH / 2;

            if (scrT > sec1Top - triggerOffset) {
                $('#section1 .imgbox').addClass('on');
            } else {
                $('#section1 .imgbox').removeClass('on');
            }

            if (scrT > sec2Top - triggerOffset) {
                $('#section2 .content').addClass('on');
                $('#section2 .imgbox').addClass('on');
            } else {
                $('#section2 .content').removeClass('on');
                $('#section2 .imgbox').removeClass('on');
            }
        }
    });
});

// PORTFOLIO 관련 코드
const folderConfig = {
    'sub01_01': { count: 145, type: 'image', ext: 'jpg' },
    'sub01_02': { count: 32, type: 'image', ext: 'jpg' },
    'sub01_03': { count: 11, type: 'video', ext: 'mp4' },
    'sub01_04': { count: 6, type: 'video', ext: 'mp4' }
};

// 현재 페이지 폴더 감지
const currentPathname = window.location.pathname;
let currentFolder = 'sub01_01';

if (currentPathname.includes('sub01_01')) {
    currentFolder = 'sub01_01';
} else if (currentPathname.includes('sub01_02')) {
    currentFolder = 'sub01_02';
} else if (currentPathname.includes('sub01_03')) {
    currentFolder = 'sub01_03';
} else if (currentPathname.includes('sub01_04')) {
    currentFolder = 'sub01_04';
}

const currentConfig = folderConfig[currentFolder] || folderConfig['sub01_01'];

// 배열 랜덤 섞기
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 미디어 데이터 생성
function generateMediaData(folder, config) {
    const items = [];
    const isMobile = window.innerWidth <= 768;

    // 모바일에서는 비율 조정
    const portraitRatios = isMobile ? ['2:3', '3:4'] : ['2:3', '5:7', '9:16', '3:4'];
    const landscapeRatios = isMobile ? ['3:2', '4:3'] : ['3:2', '16:9', '4:3', '7:5'];

    const portraitPercentage = config.type === 'image' ? 0.6 : 0.2;

    const typeArray = [];
    const portraitCount = Math.round(config.count * portraitPercentage);
    const landscapeCount = config.count - portraitCount;

    for (let i = 0; i < portraitCount; i++) typeArray.push('portrait');
    for (let i = 0; i < landscapeCount; i++) typeArray.push('landscape');

    const shuffledTypes = config.type === 'image'
        ? shuffleWithClusterPrevention(typeArray)
        : shuffleArray(typeArray);

    for (let i = 1; i <= config.count; i++) {
        const filename = String(i).padStart(3, '0') + '.' + config.ext;
        const type = shuffledTypes[i - 1];

        let ratio;
        if (type === 'portrait') {
            ratio = portraitRatios[Math.floor(Math.random() * portraitRatios.length)];
        } else {
            ratio = landscapeRatios[Math.floor(Math.random() * landscapeRatios.length)];
        }

        items.push({
            id: i,
            src: `./images/${folder}/${filename}`,
            ratio: ratio,
            mediaType: config.type
        });
    }
    return items;
}

// 클러스터 방지 셔플
function shuffleWithClusterPrevention(array) {
    const shuffled = [...array];
    const maxConsecutive = 3;

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    for (let i = 0; i < shuffled.length - maxConsecutive; i++) {
        let consecutiveCount = 1;

        for (let j = i + 1; j < shuffled.length && shuffled[j] === shuffled[i]; j++) {
            consecutiveCount++;
        }

        if (consecutiveCount >= maxConsecutive) {
            for (let k = i + maxConsecutive; k < shuffled.length; k++) {
                if (shuffled[k] !== shuffled[i]) {
                    [shuffled[i + 2], shuffled[k]] = [shuffled[k], shuffled[i + 2]];
                    break;
                }
            }
        }
    }

    return shuffled;
}

// 비율 계산
function calculateMediaRatio(width, height) {
    const ratio = width / height;

    if (Math.abs(ratio - 2 / 3) < 0.1) return '2:3';
    if (Math.abs(ratio - 3 / 2) < 0.1) return '3:2';
    if (Math.abs(ratio - 5 / 7) < 0.1) return '5:7';
    if (Math.abs(ratio - 7 / 5) < 0.1) return '7:5';
    if (Math.abs(ratio - 3 / 4) < 0.1) return '3:4';
    if (Math.abs(ratio - 4 / 3) < 0.1) return '4:3';
    if (Math.abs(ratio - 16 / 9) < 0.1) return '16:9';
    if (Math.abs(ratio - 9 / 16) < 0.1) return '9:16';

    return ratio > 1 ? '3:2' : '2:3';
}

// CSS 클래스 변환
function getRatioClass(ratio) {
    const ratioMap = {
        '2:3': 'ratio-2-3',
        '5:7': 'ratio-5-7',
        '3:2': 'ratio-3-2',
        '3:4': 'ratio-3-4',
        '4:3': 'ratio-4-3',
        '7:5': 'ratio-7-5',
        '16:9': 'ratio-16-9',
        '9:16': 'ratio-9-16'
    };
    return ratioMap[ratio] || 'ratio-2-3';
}

// 이미지 아이템 생성
function createImageItem(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-item ${getRatioClass(item.ratio)}`;
    div.style.animationDelay = `${index * 0.05}s`;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = `Portfolio ${item.id}`;
    img.loading = 'lazy';

    img.onload = function () {
        const actualRatio = calculateMediaRatio(this.naturalWidth, this.naturalHeight);
        div.className = `portfolio-item ${getRatioClass(actualRatio)}`;
    };

    img.onerror = function () {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
    };

    div.addEventListener('click', () => {
        openLightbox(item.src, 'image');
    });

    div.appendChild(img);
    return div;
}

// 비디오 아이템 생성
function createVideoItem(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-item video-item ${getRatioClass(item.ratio)}`;
    div.style.animationDelay = `${index * 0.05}s`;

    const video = document.createElement('video');
    video.src = item.src;
    video.preload = 'metadata';
    video.muted = true;

    video.onloadedmetadata = function () {
        const actualRatio = calculateMediaRatio(this.videoWidth, this.videoHeight);
        div.className = `portfolio-item video-item ${getRatioClass(actualRatio)}`;
    };

    const playButton = document.createElement('div');
    playButton.className = 'play-overlay';
    playButton.innerHTML = `
        <svg viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="29" stroke="white" stroke-width="2"/>
            <path d="M24 20L40 30L24 40V20Z" fill="white"/>
        </svg>
    `;

    div.addEventListener('click', () => {
        openLightbox(item.src, 'video');
    });

    // 모바일에서는 호버 효과 제거
    if (!('ontouchstart' in window)) {
        div.addEventListener('mouseenter', () => {
            video.play().catch(() => { });
        });

        div.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }

    div.appendChild(video);
    div.appendChild(playButton);
    return div;
}

// 포트폴리오 로드
function loadPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading">미디어를 불러오는 중</div>';

    const mediaItems = generateMediaData(currentFolder, currentConfig);
    const shuffledItems = currentConfig.type === 'image'
        ? shuffleArray(mediaItems)
        : mediaItems;

    setTimeout(() => {
        grid.innerHTML = '';

        shuffledItems.forEach((item, index) => {
            const portfolioItem = item.mediaType === 'video'
                ? createVideoItem(item, index)
                : createImageItem(item, index);
            grid.appendChild(portfolioItem);
        });
    }, 500);
}

// 라이트박스 열기
function openLightbox(src, type) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.innerHTML = '<span class="lightbox-close" onclick="closeLightbox()">&times;</span>';

    if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '90%';
        video.style.maxHeight = '90%';
        lightbox.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.id = 'lightboxImg';
        img.src = src;
        img.alt = 'Portfolio Image';
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';
        lightbox.appendChild(img);
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKey);
}

// 라이트박스 닫기
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const video = lightbox.querySelector('video');
    if (video) {
        video.pause();
    }

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscKey);
}

// ESC 키 핸들러
function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function () {
    loadPortfolio();

    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu ul li a');
    menuItems.forEach(link => {
        const li = link.parentElement;
        li.classList.remove('on');
        if (link.href.includes(currentPage)) {
            li.classList.add('on');
        }
    });

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
});

// 페이지 visibility 변경 처리
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        // 필요시 처리
    }
});