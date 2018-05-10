import Switching from './switching';
import anime from './anime.min.js';
import './../css/base.css';
import './../css/style.css';

const $ = function (str) {
  if (!str) return false;
  let el = document.querySelector(str);
  if (el) return el;
  return false;
}

function hasClass(ele, cls) {
  return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(ele, cls) {
  if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

let anime1 = anime ({
  targets: '.div1',
  translateY: '50px',
  duration: 2000,
  delay: 100,
  // loop: true,
  easing: 'easeOutSine',
  opacity: 1,
  autoplay: false,
  complete: () => {
    anime ({
      targets: '.div2',
      translateY: {
        value: '-50px',
        duration: 2000
      },
      opacity: {
        value: 1,
        duration: 2500
      },
      easing: 'easeOutSine'
    });
  }
});

anime1.play();

var Switch = new Switching({
  target: '.main_container'
});

Switch.on("slide", (e) => {
  console.log(e);
});
