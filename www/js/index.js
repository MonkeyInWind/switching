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

let Switching = window.Switching('.main_container');

Switching.on("slide", (e) => {
  switch (e.index) {
    case 0:
      console.log(0);
      anime1.play();
      break;
    case 1:
      console.log(1);
      break;
    case 2:
      console.log(2);
      break;
    case 3:
      console.log(3);
      break;
  }
});
