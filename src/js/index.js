import Switching from './switching';
import anime from './anime.min.js';
import './../css/base.css';
import './../css/style.css';

let anime1 = anime ({
  targets: '.div1',
  translateY: '50px',
  duration: 2000,
  delay: 100,
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

var Switch = new Switching({
  target: '.main_container'
});

Switch.on("slide", (e) => {
  console.log(e);
  switch(e.index) {
    case 0:
      anime1.play();
      break;
  }
});
