class Switching {
  constructor (opts) {
    this.opts = opts;
    this.sceneIndex = 0;
    this.clientW = document.documentElement.clientWidth;
    this.clientH = document.documentElement.clientHeight;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.Len = 0;
    this.isTouchStart = false;
    this.isMoving = false;
    this.isTouchEnd = true;
    this.isTransition = false;
    this.Api = {};
    this.es = {};

    this.on = this.on.bind(this);
    this.aniEnd = this.aniEnd.bind(this);
    this.initialStyle = this.initialStyle.bind(this);
    this.getDirection = this.getDirection.bind(this);
    this.changeScene = this.changeScene.bind(this);
    this.init = this.init.bind(this);
  }

  on (ev, fn) {
    this.init();
    this.es[ev] = this.es[ev] || [];
    this.es[ev].push(fn);
  }

  fire () {
    let ev = arguments[0], args = [];
    if (!this.es[ev]) return;

    for (let i = 1; i < arguments.length; i++) {
      args.unshift(arguments[i]);
    }

    for (let i = 0; i < this.es[ev].length; i++) {
      try {
        this.es[ev][i].apply(null, args);
      } catch (e) {
        console.log(e);
      }
    }
  }

  initialStyle (mainEl) {
    let mainContainer = document.querySelector(mainEl);
    let itemEl = mainContainer.children;
    if (!itemEl.length) return console.log("当前容器没有子元素");
    mainContainer.style.height = "100%";
    mainContainer.style.overflow = "hidden";
    mainContainer.style.position = "relative";
    for (let i = 0; i < itemEl.length; i++) {
      itemEl[i].style.height = "100%";
      itemEl[i].style.width = "100%";
      itemEl[i].style.position = "absolute";
      itemEl[i].style.left = "0";
      itemEl[i].style.top = "0";
      itemEl[i].style.zIndex = this.Len - i + 2;
      if (i != this.sceneIndex) {
        itemEl[i].style.opacity = 0;
      }
    }
  }

  getDirection (diffX, diffY) {
    let direction = "";
    if (Math.abs(diffX) > 30 && Math.abs(diffY) < 15) {
      direction = diffX < 0 ? "left" : "right";
    } else if (Math.abs(diffY) > 30 && Math.abs(diffX) < 15) {
      direction = diffY < 0 ? "up" : "down";
    } else if (diffX > 20 && diffY < -20) {
      direction = "up_right";
    } else if (diffX < -20 && diffY < -20) {
      direction = "up_left";
    } else if (diffX < -20 && diffY > 20) {
      direction = "down_left";
    } else if (diffX > 20 && diffY > 20) {
      direction = "down_right";
    } else {
      direction = "";
    }
    return direction;
  }

  aniEnd () {
    if (this.Api.scene) this.Api.scene.removeEventListener("webkitTransitionEnd", this.aniEnd);
    this.isTransition = false;
    this.Api.index = this.sceneIndex;
    this.fire("slide", this.Api);
  }

  changeScene (direction, els, loop) {
    els[this.sceneIndex].style.transition = "all 0.8s ease";
    this.isTransition = true;
    switch (direction) {
      case "up":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(0, -${this.clientH}px, 0)scale(0.1)`;
        this.sceneIndex = this.sceneIndex >= this.Len - 1 ? 0 : this.sceneIndex + 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(0, ${this.clientH}px, 0)scale(0.1)`;
        break;
      case "up_left":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(-${this.clientW}px, -${this.clientH}px, 0)scale(0.1)rotate(-90deg)`;
        this.sceneIndex = this.sceneIndex >= this.Len - 1 ? 0 : this.sceneIndex + 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(${this.clientW}px, ${this.clientH}px, 0)scale(0.1)rotate(90deg)`;
        break;
      case "up_right":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(${this.clientW}px, -${this.clientH}px, 0)scale(0.1)rotate(90deg)`;
        this.sceneIndex = this.sceneIndex >= this.Len - 1 ? 0 : this.sceneIndex + 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(-${this.clientW}px, ${this.clientH}px, 0)scale(0.1)rotate(-90deg)`;
        break;
      case "right":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(${this.clientW}px, 0, 0)scale(0.1)rotate(90deg)`;
        this.sceneIndex = this.sceneIndex >= this.Len - 1 ? 0 : this.sceneIndex + 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(-${this.clientW}px, 0, 0)scale(0.1)rotate(-90deg)`;
        break;
      case "down":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(0, ${this.clientH}px, 0)scale(0.1)`;
        this.sceneIndex = this.sceneIndex <= 0 ? this.Len - 1 : this.sceneIndex - 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(0, -${this.clientH}px, 0)scale(0.1)`;
        break;
      case "down_left":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(-${this.clientW}px, ${this.clientH}px, 0)scale(0.1)rotate(-90deg)`;
        this.sceneIndex = this.sceneIndex <= 0 ? this.Len - 1 : this.sceneIndex - 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(${this.clientW}px, -${this.clientH}px, 0)scale(0.1)rotate(90deg)`;
        break;
      case "down_right":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(${this.clientW}px, ${this.clientH}px, 0)scale(0.1)rotate(90deg)`;
        this.sceneIndex = this.sceneIndex <= 0 ? this.Len - 1 : this.sceneIndex - 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(-${this.clientW}px, -${this.clientH}px, 0)scale(0.1)rotate(-90deg)`;
        break;
      case "left":
        els[this.sceneIndex].style.opacity = 0;
        els[this.sceneIndex].style.transform = `translate3D(-${this.clientW}px, 0, 0)scale(0.1)rotate(-90deg)`;
        this.sceneIndex = this.sceneIndex <= 0 ? this.Len - 1 : this.sceneIndex - 1;
        els[this.sceneIndex].style.transition = "none";
        els[this.sceneIndex].style.transform = `translate3D(${this.clientW}px, 0, 0)scale(0.1)rotate(90deg)`;
        break;
      default:
        els[this.sceneIndex].style.transition = "none";
        this.isTransition = false;
        console.log("no change");
        break;
    }
    this.Api.scene = els[this.sceneIndex];
    setTimeout (() => {
      els[this.sceneIndex].style.transition = "all 0.8s ease";
      els[this.sceneIndex].style.opacity = 1;
      els[this.sceneIndex].style.transform = `translate3D(0, 0, 0)`;
      if (direction) els[this.sceneIndex].addEventListener("webkitTransitionEnd", this.aniEnd);
    }, 50);
  }

  init () {
    let mainEl = this.opts.target || "";
    let loop = this.opts.loop === false ? false : true;
    this.initialStyle(mainEl);
    let mainContainer = document.querySelector(mainEl);
    let itemEl = mainContainer.children;
    this.Len = itemEl.length;

    mainContainer.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (this.isMoving || !this.isTouchEnd || this.isTransition) return;
      this.isTouchStart = true;
      this.isTouchEnd = false;
      itemEl[this.sceneIndex].style.transition = "none";
      this.moveX = 0;
      this.moveY = 0;
      this.touchStartX = e.touches[0].pageX;
      this.touchStartY = e.touches[0].pageY;
    });

    mainContainer.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (this.isTouchEnd || !this.isTouchStart || this.isTransition) return;
      this.isMoving = true;
      this.moveX = e.changedTouches[0].pageX;
      this.moveY = e.changedTouches[0].pageY;
      this.diffX = this.moveX - this.touchStartX;
      this.diffY = this.moveY - this.touchStartY;
      itemEl[this.sceneIndex].style.transform = `translate3D(${this.diffX}px, ${this.diffY}px, 0)`;
      if ((this.moveX <= 0 || this.moveX >= this.clientW || this.moveY <= 0 || this.moveY >= this.clientH) && (this.diffX !=0 || this.diffY !=0)) {
        let direction = this.getDirection(this.diffX, this.diffY);
        this.Api.direction = direction;
        this.changeScene(direction, itemEl, this.loop);
      }
    });

    mainContainer.addEventListener("touchend", (e) => {
      if (!this.isTouchStart || !this.isMoving || this.isTransition) return;
      this.isTouchStart = false;
      this.isTouchEnd = true;
      this.isMoving = false;
      this.moveX = 0;
      this.moveY = 0;
      this.touchEndX = e.changedTouches[0].pageX;
      this.touchEndY = e.changedTouches[0].pageY;
      this.diffX = this.touchEndX - this.touchStartX;
      this.diffY = this.touchEndY - this.touchStartY;
      let direction = this.getDirection(this.diffX, this.diffY);
      this.Api.direction = direction;
      this.changeScene(direction, itemEl, loop);
    });
    this.Api.index = this.sceneIndex;
    this.Api.scene = itemEl[this.sceneIndex];
    this.Api.sections = itemEl;
    this.Api.direction = this.Api.direction || "";
    document.addEventListener("DOMContentLoaded", () => {
      this.fire("slide", this.Api);
    });
    document.body.addEventListener("touchmove", function (e) {
      e.preventDefault();
    }, { passive: false });
    return this.Api;
  }
}

export default Switching;
