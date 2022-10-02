import i180bj from './translate.js'

// Menu Burger
document.querySelector('.header__burger').onclick = function () {
    document.querySelector('.header__burger').classList.toggle('active');
    document.querySelector('.header__menu').classList.toggle('active');
    document.body.classList.toggle('lock');
};

// 1 способ 
// document.querySelectorAll('.menu__link')[0].onclick = function () {
//     document.querySelector('.header__burger').classList.remove('active');
//     document.querySelector('.header__menu').classList.remove('active');
//     document.body.classList.remove('lock');
// };
// ...

// 2 способ (обработчик вешается на каждую ссылку)
const links = document.querySelectorAll('.menu__link');
links.forEach((el) => el.addEventListener('click', closeMenu));
function closeMenu() {
    document.querySelector('.header__burger').classList.remove('active');
    document.querySelector('.header__menu').classList.remove('active');
    document.body.classList.remove('lock');
};

// 3 способ (обработчик вешается на родителя ссылок и функция выполняется после проверки на наличие необходимого класса у дочерних элементов по которым происходит событие)
// const nav = document.querySelector('.header__menu')
// nav.addEventListener('click', closeMenu);
// function closeMenu(event) {
//     if (event.target.classList.contains('menu__link')) {
//         document.querySelector('.header__burger').classList.remove('active');
//         document.querySelector('.header__menu').classList.remove('active');
//         document.body.classList.remove('lock');
//     }
// };

// Выбор картинок по навигации ====================================================================================
const portfolioImages = document.querySelectorAll('.portfolio__item')
const portfolioBtns = document.querySelectorAll('.portfolio__btn')

portfolioBtns.forEach((item) => item.addEventListener('click', function (event) {
    changeImage(event.target.dataset.season);
    changeClass(event);
}));

function changeImage(season) {
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`)
};

function changeClass(event) {
    if (event.target.classList.contains('portfolio__btn')) {
        if (document.body.classList.contains('light-theme')) {
            portfolioBtns.forEach(item => item.classList.remove('light-btn_act'))
            event.target.classList.add('light-btn_act')
        } else {
            portfolioBtns.forEach(item => item.classList.remove('btn_act'))
            event.target.classList.add('btn_act')
        }
    }
};
// изначальный вариант
// const portfolioBtns1 = document.querySelectorAll('.portfolio__btn')[0];
// portfolioBtns1.addEventListener('click', () => {
//     portfolioImages.forEach((img, index) => img.src = `assets/img/winter/${index + 1}.jpg`)
//     document.querySelectorAll('.portfolio__btn')[0].classList.add('btn_act');
//     document.querySelectorAll('.portfolio__btn')[1].classList.remove('btn_act');
//     document.querySelectorAll('.portfolio__btn')[2].classList.remove('btn_act');
//     document.querySelectorAll('.portfolio__btn')[3].classList.remove('btn_act');
// });
// ...

// изменение темы =================================================================================

const button = document.querySelector('.header__theme')
const themeButton = document.querySelector('.header__theme > svg > use')
document.documentElement.style.setProperty('--theme-color', '#fff') // переменные для изменеия цвета в разных блоках
document.documentElement.style.setProperty('--theme-color-title', '#BDAE82')
console.log(themeButton.href.animVal)

function changeTheme() {
    document.body.classList.toggle('light-theme')
    skills.classList.toggle('light-theme-skills')
    if (document.body.classList.contains('light-theme')) {
        themeButton.setAttribute('href', 'assets/svg/header.svg#background-white');
        portfolioBtns.forEach(function (item) {
            item.classList.remove('btn')
            item.classList.add('light-btn')
            if (item.classList.contains('btn_act')) {
                item.classList.remove('btn_act')
                item.classList.add('light-btn_act')
            }
        })
    } else {
        themeButton.setAttribute('href', 'assets/svg/header.svg#background-black');
        portfolioBtns.forEach(function (item) {
            item.classList.remove('light-btn')
            item.classList.add('btn')
            if (item.classList.contains('light-btn_act')) {
                item.classList.remove('light-btn_act')
                item.classList.add('btn_act')
            }
        })
    }
    if (document.documentElement.style.getPropertyValue('--theme-color') == "#fff") {
        document.documentElement.style.setProperty('--theme-color', '#000')
    } else {
        document.documentElement.style.setProperty('--theme-color', '#fff')
    }
    if (document.documentElement.style.getPropertyValue('--theme-color-title') == "#BDAE82") {
        document.documentElement.style.setProperty('--theme-color-title', '#000')
    } else {
        document.documentElement.style.setProperty('--theme-color-title', '#BDAE82')
    }
}

button.addEventListener('click', changeTheme)

// Смена языка ===================================================================================
const english = document.getElementById('en')
english.addEventListener('click', function () {
    getTranslate('en')
})

const russian = document.getElementById('ru')
russian.addEventListener('click', function () {
    getTranslate('ru')
})

function getTranslate(lang) {
    console.log(lang)
    const elementWithDataAttr = document.querySelectorAll('[data-i18n]');
    elementWithDataAttr.forEach((item, i) => {
        if (lang === 'ru') {
            item.textContent = i180bj['ru'][`${item.dataset.i18n}`];

        } else {
            item.textContent = i180bj['en'][`${item.dataset.i18n}`]

        }
    });
}

english.addEventListener('click', buttonLang)
russian.addEventListener('click', buttonLang)

function buttonLang(event) {
    if (event.target.id === 'ru') {
        russian.classList.add('switch-lng__ru_act')
        english.classList.remove('switch-lng__en_act')
    } else {
        russian.classList.remove('switch-lng__ru_act')
        english.classList.add('switch-lng__en_act')
    };
}

// Кастомный видеоплеер ===============================================================================
//const videoProgress = document.querySelector('.video__range_video');
//const volumeProgress = document.querySelector('.video__range_volume');
const video = document.querySelector('video');
const play = document.querySelector('.video__play');
const playBtn = document.querySelector('.video__btn');
const vidProgress = document.querySelector('.video__range_video');
const time = document.querySelector('.video__time');
const volProgress = document.querySelector('.video__range_volume');
const volumeBtn = document.querySelector('.video__mute')

console.log(volProgress.volue)

function toggleVideoStatus() {
    if (video.paused) {
        video.play()
        play.src = 'assets/svg/video/pause.svg'
        playBtn.style.display = 'none'
    } else {
        video.pause()
        play.src = 'assets/svg/video/play.svg'
        playBtn.style.display = 'block'
    }
};

function timeProgress() {
    vidProgress.value = (video.currentTime / video.duration) * 100
    let minutes = Math.floor(video.currentTime / 60)
    if (minutes < 10) {
        minutes = '0' + String(minutes)
    }
    let seconds = Math.floor(video.currentTime % 60)
    if (seconds < 10) {
        seconds = '0' + String(seconds)
    }
    time.innerHTML = `${minutes}:${seconds}`
}

function videoProgress() {
    video.currentTime = (vidProgress.value * video.duration) / 100;
    const percent = (video.currentTime / video.duration) * 100;
    console.log(vidProgress.value)
    vidProgress.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${percent}%, #b3b3b3 ${percent}%, #b3b3b3 100%)`;
    if (video.currentTime == video.duration) {
        video.currentTime = 0
    }
}

function volumeProgress() {
    let v = this.value;
    video.volume = v / 100;
    volProgress.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${volProgress.value}%, #b3b3b3 ${volProgress.value}%)`;
    console.log(v)
}

function volumeToggle() {
    if (volumeBtn.classList.contains('video__mute_mute'))
        unmute();
    else {
        mute();
    }
}

function mute() {
    volumeBtn.classList.add('video__mute_mute');
    video.muted = true;
}

function unmute() {
    volumeBtn.classList.remove('video__mute_mute');
    video.muted = false;
}

play.addEventListener('click', toggleVideoStatus);
playBtn.addEventListener('click', toggleVideoStatus);
video.addEventListener('timeupdate', timeProgress);
vidProgress.addEventListener('input', videoProgress)
volProgress.addEventListener('change', volumeProgress)
volProgress.addEventListener('mousemove', volumeProgress)
volumeBtn.addEventListener('click', volumeToggle)

// События
// timeupdate - cрабатывает, когда текущая позиция воспроизведения изменилась
// change - происходит по окончании изменения значения элемента формы, когда это изменение зафиксировано
// volumechange -	Срабатывает при изменении громкости

// Методы




// let video = new Video();

// function setProgress() {
//     const duration = video.duration;
//     currentTime = duration * audioProgress.value / 100;
//     video.currentTime = currentTime;
//     videoProgress.style.background = `-webkit-linear-gradient(to right, #0bdbac 0%, #0bdbac ${audioProgress.value}%, #ffffff ${audioProgress.value}%)`;
//     displayReadableTime(currentTime);
// }

const mainElement = document.documentElement;
const mainElementWidth = mainElement.clientWidth;
const mainElementHeight = mainElement.clientHeight;
console.log(mainElementWidth);
console.log(mainElementHeight)
