var lastScrollTop = 0;
let header = document.querySelector('.header');

function DetectScrollDirection(){
    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop){
        lastScrollTop = st <= 0 ? 0 : st;
        return "downscroll";
    } else {
        lastScrollTop = st <= 0 ? 0 : st;
        return "upscroll";   
    }
}

function isDetectScrollOn(element, elementVisible=0){
    var windowHeight = window.innerHeight;
    var elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) return true;
    else return false;
    
}

function CharactersScrollMove() {
    var characters = document.querySelectorAll(".character");
    for (var i = 0; i < characters.length; i++) {
        if (isDetectScrollOn(characters[i], elementVisible=-70))
            characters[i].classList.add("active");
        else 
            characters[i].classList.remove("active");
    }
}

function HeaderScrollMove(){
    if (DetectScrollDirection()=='downscroll'){
        header.style.opacity = '0';
        header.style.transform = 'translateY(-50%)';
    } else{
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }
}

function ContentScrollMove(){
    var content = document.querySelector('.content-screen');
    if (isDetectScrollOn(content, elementVisible=20)){
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    } else {
        content.style.opacity = '0';
        content.style.transform = 'translateY(50%)';
    }
}

function NumericScrollMove(){
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
        if (isDetectScrollOn(tabs[i], elementVisible=0)){
            tabs[i].style.transitionDelay = '0.'+ i + 's';
            tabs[i].style.opacity = '1';
            tabs[i].style.transform = 'translateY(0)';
        } else {
            tabs[i].style.opacity = '0';
            tabs[i].style.transform = 'translateY(50%)';
        }
    }
}

function scrollEvent(){
    CharactersScrollMove();
    HeaderScrollMove();
    ContentScrollMove();
    NumericScrollMove();
}

window.addEventListener("scroll", scrollEvent, false);