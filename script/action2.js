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

        $('.big_img img, .big_img .textbox').stop(true, true).fadeOut(200, function () {
            if ($(this).is('img')) {
                $(this).attr('src', sImg);
            } else if ($(this).hasClass('textbox')) {
                $(this).find('.title').text(sTitle);
                $(this).find('.category').text(sCategory);
            }
        }).fadeIn(200);

        $('.small_img li').eq(liNum).addClass('on').siblings().removeClass('on');
    };


    // sImg1로 시작
    let sImg0 = $('.small_img li').eq(0).find('img').attr('src');
    let sTitle0 = $('.small_img li').eq(0).find('.title').text();
    let sCategory0 = $('.small_img li').eq(0).find('.category').text();

    $('.big_img img').attr('src', sImg0)
    $('.big_img .title').text(sTitle0)
    $('.big_img .category').text(sCategory0)

    $(window).scroll(function () {
        let scrT = $(window).scrollTop();
        let winH = $(window).height();

        if ($('#hero').length >= 1) {
            let sec1Top = $('#section1').offset().top;
            let sec2Top = $('#section2').offset().top;

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
        }
    });

    // 0813 추가

    $(window).scroll(function () {
        let scrT = $(window).scrollTop();
        let sec1Top = $('#section1').offset().top;
        let sec2Top = $('#section2').offset().top;
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
    });

});


// POLTFOLIO
// 통합 폴더 설정 (이미지 + 영상)
const folderConfig = {
    'sub01_01': { count: 146, type: 'image', ext: 'jpg' },  // OUTDOOR SNAPS
    'sub01_02': { count: 32, type: 'image', ext: 'jpg' },  // WEDDING SNAPS  
    'sub01_03': { count: 11, type: 'video', ext: 'mp4' },  // OUTDOOR FILMS
    'sub01_04': { count: 6, type: 'video', ext: 'mp4' }   // WEDDING FILMS
};

// 현재 페이지 파일명에서 폴더 자동 감지
const currentPathname = window.location.pathname;
let currentFolder = 'sub01_01';  // 기본값

if (currentPathname.includes('sub01_01')) {
    currentFolder = 'sub01_01';
} else if (currentPathname.includes('sub01_02')) {
    currentFolder = 'sub01_02';
} else if (currentPathname.includes('sub01_03')) {
    currentFolder = 'sub01_03';
} else if (currentPathname.includes('sub01_04')) {
    currentFolder = 'sub01_04';
}

// 현재 폴더의 설정 가져오기
const currentConfig = folderConfig[currentFolder] || folderConfig['sub01_01'];

// 미디어 데이터 자동 생성 함수 (순서대로 + 패턴 기반)
function generateMediaData(folder, config) {
    const items = [];
    const portraitRatios = ['2:3', '5:7', '3:4', '9:16'];  // 세로 비율들
    const landscapeRatios = ['3:2', '16:9', '4:3', '7:5'];  // 가로 비율들

    // 폴더별 맞춤 패턴 설정
    const layoutPatterns = {
        'sub01_01': { // 야외스냅 - 세로 중심 믹스
            pattern: ['P', 'L', 'L', 'P', 'P', 'L', 'P', 'L', 'P', 'P',
                'L', 'P', 'P', 'L', 'P', 'L', 'L', 'P', 'L', 'P'],
            portraitRatios: [0, 1, 2, 0, 3, 1, 2, 0, 1, 2], // 세로 비율 순환
            landscapeRatios: [0, 2, 1, 3, 2, 0, 3, 1, 0, 2]  // 가로 비율 순환
        },
        'sub01_02': { // 본식스냅 - 균형잡힌 믹스
            pattern: ['P', 'P', 'L', 'P', 'L', 'P', 'L', 'L', 'P', 'L',
                'P', 'L', 'P', 'P', 'L', 'P'],
            portraitRatios: [0, 2, 1, 3, 0, 2, 1, 0],
            landscapeRatios: [1, 0, 2, 3, 1, 2, 0, 3]
        },
        'sub01_03': { // 야외영상 - 가로 중심
            pattern: ['L', 'L', 'P', 'L', 'L', 'P', 'L', 'L', 'L', 'P', 'L'],
            portraitRatios: [0, 1, 2, 0, 1],
            landscapeRatios: [1, 0, 2, 1, 3, 0, 2, 1]
        },
        'sub01_04': { // 본식영상 - 가로 위주
            pattern: ['L', 'P', 'L', 'L', 'L', 'P'],
            portraitRatios: [0, 2, 1],
            landscapeRatios: [1, 0, 2, 1]
        }
    };

    // 현재 폴더의 패턴 가져오기
    const currentPattern = layoutPatterns[folder] || layoutPatterns['sub01_01'];
    const pattern = currentPattern.pattern;
    const portraitRatioPattern = currentPattern.portraitRatios;
    const landscapeRatioPattern = currentPattern.landscapeRatios;

    let portraitIndex = 0;
    let landscapeIndex = 0;

    // 순서대로 미디어 생성
    for (let i = 1; i <= config.count; i++) {
        // 001.jpg, 002.mp4 ... 형태로 생성
        const filename = String(i).padStart(3, '0') + '.' + config.ext;

        // 패턴에 따라 타입 결정 (패턴을 순환)
        const patternIndex = (i - 1) % pattern.length;
        const type = pattern[patternIndex] === 'P' ? 'portrait' : 'landscape';

        // 타입에 따라 적절한 비율 선택 (순환 패턴 사용)
        let ratio;
        if (type === 'portrait') {
            const ratioIndex = portraitRatioPattern[portraitIndex % portraitRatioPattern.length];
            ratio = portraitRatios[ratioIndex];
            portraitIndex++;
        } else {
            const ratioIndex = landscapeRatioPattern[landscapeIndex % landscapeRatioPattern.length];
            ratio = landscapeRatios[ratioIndex];
            landscapeIndex++;
        }

        items.push({
            id: i,
            src: `./images/${folder}/${filename}`,
            ratio: ratio,
            mediaType: config.type  // 'image' or 'video'
        });
    }
    return items;
}

// 비율 자동 계산 함수
function calculateMediaRatio(width, height) {
    const ratio = width / height;

    // 일반적인 비율로 근사
    if (Math.abs(ratio - 2 / 3) < 0.1) return '2:3';
    if (Math.abs(ratio - 3 / 2) < 0.1) return '3:2';
    if (Math.abs(ratio - 5 / 7) < 0.1) return '5:7';
    if (Math.abs(ratio - 7 / 5) < 0.1) return '7:5';
    if (Math.abs(ratio - 3 / 4) < 0.1) return '3:4';
    if (Math.abs(ratio - 4 / 3) < 0.1) return '4:3';
    if (Math.abs(ratio - 16 / 9) < 0.1) return '16:9';
    if (Math.abs(ratio - 9 / 16) < 0.1) return '9:16';

    // 기본값
    return ratio > 1 ? '3:2' : '2:3';
}

// 비율을 CSS 클래스로 변환
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

// 포트폴리오 아이템 생성 (이미지)
function createImageItem(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-item ${getRatioClass(item.ratio)}`;
    div.style.animationDelay = `${index * 0.05}s`;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = `Portfolio ${item.id}`;
    img.loading = 'lazy';

    // 이미지 로드 시 실제 비율 계산
    img.onload = function () {
        const actualRatio = calculateMediaRatio(this.naturalWidth, this.naturalHeight);
        div.className = `portfolio-item ${getRatioClass(actualRatio)}`;
    };

    // 이미지 로드 실패 시 처리
    img.onerror = function () {
        console.error('이미지 로드 실패:', item.src);
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
    };

    // 클릭 이벤트 - 라이트박스
    div.addEventListener('click', () => {
        openLightbox(item.src, 'image');
    });

    div.appendChild(img);
    return div;
}

// 포트폴리오 아이템 생성 (비디오)
function createVideoItem(item, index) {
    const div = document.createElement('div');
    div.className = `portfolio-item video-item ${getRatioClass(item.ratio)}`;
    div.style.animationDelay = `${index * 0.05}s`;

    const video = document.createElement('video');
    video.src = item.src;
    video.preload = 'metadata';  // 첫 프레임만 로드
    video.muted = true;  // 자동재생을 위해 음소거

    // 비디오 메타데이터 로드 시 실제 비율 계산
    video.onloadedmetadata = function () {
        const actualRatio = calculateMediaRatio(this.videoWidth, this.videoHeight);
        div.className = `portfolio-item video-item ${getRatioClass(actualRatio)}`;
    };

    // 재생 버튼 오버레이 추가
    const playButton = document.createElement('div');
    playButton.className = 'play-overlay';
    playButton.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="29" stroke="white" stroke-width="2"/>
            <path d="M24 20L40 30L24 40V20Z" fill="white"/>
        </svg>
    `;

    // 클릭 이벤트 - 라이트박스
    div.addEventListener('click', () => {
        openLightbox(item.src, 'video');
    });

    // 호버 시 짧은 프리뷰 (선택적)
    div.addEventListener('mouseenter', () => {
        video.play().catch(() => { });  // 자동재생 실패 시 무시
    });

    div.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });

    div.appendChild(video);
    div.appendChild(playButton);
    return div;
}

// 포트폴리오 로드 (셔플 제거, 순서대로 표시)
function loadPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) {
        console.error('portfolioGrid 요소를 찾을 수 없습니다.');
        return;
    }

    grid.innerHTML = '<div class="loading">미디어를 불러오는 중</div>';

    console.log('현재 폴더:', currentFolder);
    console.log('미디어 타입:', currentConfig.type);
    console.log('파일 개수:', currentConfig.count);
    console.log('파일 확장자:', currentConfig.ext);

    // 미디어 데이터 자동 생성 (순서대로)
    const mediaItems = generateMediaData(currentFolder, currentConfig);

    // 실제 렌더링 (셔플 없이 순서대로)
    setTimeout(() => {
        grid.innerHTML = '';

        // 순서대로 렌더링
        mediaItems.forEach((item, index) => {
            const portfolioItem = item.mediaType === 'video'
                ? createVideoItem(item, index)
                : createImageItem(item, index);
            grid.appendChild(portfolioItem);
        });

        // 표시된 개수가 0개인 경우 메시지 표시
        if (mediaItems.length === 0) {
            grid.innerHTML = '<div class="loading">표시할 미디어가 없습니다.</div>';
        }
    }, 500);
}

// 라이트박스 열기 (이미지 + 비디오 통합)
function openLightbox(src, type) {
    const lightbox = document.getElementById('lightbox');

    if (!lightbox) {
        console.error('라이트박스 요소를 찾을 수 없습니다.');
        return;
    }

    // 기존 내용 제거
    lightbox.innerHTML = '<span class="lightbox-close" onclick="closeLightbox()">&times;</span>';

    if (type === 'video') {
        // 비디오 플레이어 생성
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '90%';
        video.style.maxHeight = '90%';
        lightbox.appendChild(video);
    } else {
        // 이미지 표시
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

    // ESC 키로 닫기
    document.addEventListener('keydown', handleEscKey);
}

// 라이트박스 닫기
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // 비디오가 있으면 정지
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

// 페이지 로드시 포트폴리오 로드 및 메뉴 활성화
document.addEventListener('DOMContentLoaded', function () {
    console.log('페이지 로드 완료');
    console.log('현재 경로:', window.location.pathname);
    console.log('감지된 폴더:', currentFolder);

    loadPortfolio();

    // 현재 페이지에 맞는 메뉴 항목 활성화
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu ul li a');
    menuItems.forEach(link => {
        const li = link.parentElement;
        li.classList.remove('on');
        if (link.href.includes(currentPage)) {
            li.classList.add('on');
        }
    });

    // 라이트박스 배경 클릭시 닫기
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
});

// 페이지 visibility 변경 시 처리 (선택적)
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        // 페이지가 다시 보일 때 필요한 처리
    }
});