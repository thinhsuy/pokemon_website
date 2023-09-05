let side1 = document.querySelector('#side1');
let side2 = document.querySelector('#side2');
let textTitle1 = document.querySelector('.text1');
let textTitle2 = document.querySelector('.text2');
let body = document.querySelector('body');
let cardHover = document.querySelectorAll('.cardHover');
let secondBg = document.querySelector('.secondBg');
let hoverPointer = document.querySelector('.hover-pointer');
let cardContentWords = document.querySelectorAll('.card-content-words');
let cardHoverColorList = ["#DD5353", "#FFC4DD", "#FAEA48"];
let contentHoverColorList = ["white", "#224B0C", "#2C3639"];
let GifImage = document.querySelectorAll('.gif-image');
body.style.overflowY = 'hidden';

document.querySelector('#c1').addEventListener("mousedown", function(){
  document.querySelector('#c1').style.left = "-15%";
});
document.querySelector('#c2').addEventListener("mousedown", function(){
  document.querySelector('#c2').style.left = "-10%";
});
document.querySelector('#c1').addEventListener("mouseout", function(){
  document.querySelector('#c1').style.left = "10%";
});
document.querySelector('#c2').addEventListener("mouseout", function(){
  document.querySelector('#c2').style.left = "20%";
});

for (let i=0; i<cardHover.length; i++){
    cardHover[i].addEventListener("mouseover", function(){
        secondBg.style.backgroundColor = cardHoverColorList[i];
        for (let j=0; j<cardContentWords.length; j++){
            cardContentWords[j].style.color = contentHoverColorList[i];
        }
        GifImage[i].style.opacity = '1';
    }, false);
    cardHover[i].addEventListener("mouseout", function(){
        secondBg.style.backgroundColor = "#F8EDE3";
        cardContentWords.forEach(p => p.style.color = 'black');
        GifImage[i].style.opacity = '0';
    }, false);
}

function onMouseHover(e, id){
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    let point = document.querySelector(id);
    point.style.top = y+20+'px';
    point.style.left = x+30+'px';
    point.style.opacity = '1';
    point.style.transform = 'scale(1)';
}

function onMouseOut(id){
    let point = document.querySelector(id);
    point.style.opacity = '0';
    point.style.transform = 'scale(0.1)';
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function SmoothScrollToTop(){
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(SmoothScrollToTop);
        window.scrollTo (0,currentScroll - (currentScroll/40));
    }
};

function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      a = values[0];
      b = values[1];
      angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
      return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    }
    return 0;
}

function CardMoveByScroll(){
    let offset = window.pageYOffset;
    if (offset>100 || offset<1600){
        let valueChange = (offset*15/1600)-10;
        let card = document.querySelectorAll('.card');
        for (let i=0; i<card.length; i++){
            valueChange=valueChange+i*5;
            card[i].style.transform = "rotate(" + valueChange + "deg)";
        }
    }
}

function OnScroll(){
    CardMoveByScroll();
}

function removeLoader(){
  let loader = document.querySelector('.loader');
  let header = document.querySelector('.introHeader');
  loader.style.opacity = '0';
  sleep(1000).then(()=>{
    header.style.opacity = '1';
    header.style.letterSpacing = '0px';
  });
}


function TextClipPath(){
  textTitle1.style.clipPath = "inset(0 0 0 0)";
  textTitle2.style.clipPath = "inset(0 0 0 0)";
  body.style.overflowY = 'scroll';
  window.addEventListener('scroll', OnScroll);
}


function FirstIntro(){
    sleep(5000).then(removeLoader());
    sleep(3000).then(()=>{
      side1.style.height = '0vh';
      side2.style.height = '0vh';
      document.querySelector('.introHeader').style.opacity='0';
      for (let i=0; i<10; i++){
          if (i==0){
              side1.style.transition = 'height 0.1s';
              side2.style.transition = 'height 0.1s';
          } else if (i==9){
              side1.style.transition = 'height 2s';
              side2.style.transition = 'height 2s';
          }
          sleep(50);
      }
    });
}


jarallax(document.querySelectorAll('.jarallax'), {speed: 0.5});
setTimeout(FirstIntro, 4000);
setTimeout(TextClipPath, 8500);

var xValues = ["HP", "Atk", "Def", "SpAtk", "Spdef", "Speed"];
var ScizorStat = [70, 130, 100, 55, 80, 65];
var MiltankStat = [95, 80, 105, 40, 70, 100];
var ZeraoraStat = [88, 112, 75, 102, 80, 143];
var barColors = ["red", "green","blue","orange","brown"];

new Chart("Scizor-chart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: ScizorStat
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Base Stats"
    }
  }
});

new Chart("Miltank-chart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: MiltankStat
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Base Stats"
      }
    }
  });

  new Chart("Zeraora-chart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: ZeraoraStat
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Base Stats"
      }
    }
  });

