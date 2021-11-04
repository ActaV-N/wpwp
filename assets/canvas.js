import { CanvasBackground } from "./canvasBackground/canvasBackground.js";

export class Canvas {
  constructor(color, con, bodyColor, textColor) {
    if(!bodyColor) bodyColor = '#fff';
    if(!textColor) textColor = '#3e3e3e';
    this.bgColor = color;
    this.bodyColor = bodyColor;
    this.textColor = textColor;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.addEventListener(
      "transitionend",
      this.handleActivate.bind(this)
    );

    this.background = new CanvasBackground(color);

    this.baseContainer = document.querySelector(con);
    this.mainContainer = document.querySelector(".main-canvas");
    this.launchBtn = document.querySelector(`.btn-launch[data-to="${con.split('#')[1]}"]`)
    this.container = this.baseContainer;
    this.animationType = "default"; // Default
    this.bgAniType = "";
    this.isBgAnimating = false;

    this.baseContainer.style.backgroundColor = this.bgColor;
    this.container.appendChild(this.canvas);

    this.frameCount = 0;

    this.rafId = null;

    this.opTransitionDuration = 30;

    this.pointerMoveHandler = this.pointerMove.bind(this);
    this.pointerDownHandler = this.pointerDown.bind(this);
    this.pointerUpHandler = this.pointerUp.bind(this);
  }

  checkAnimation(cnt, cb) {
    if (this.frameCount % cnt === 0) {
      cb.call(this);
    }
  }

  animationControl() {
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.filter = "none";

    if (this.isBgAnimating && this.bgAniType === "activate") {
      if (this.background.activate(this.ctx)) {
        this.animationType = "default";
        this.container.style.background = this.bgColor;
        this.bgAniType = ''
      }
    }

    if (this.isBgAnimating && this.bgAniType === "deactivate") {
      if (this.background.deactivate(this.ctx)) {
        this.mainContainer.style.background = 'inherit';
        this.baseContainer.style.background = this.bgColor;
        this.animationType = "default";
        this.init();
        this.bgAniType = "";
      }
    }
  }

  animationCondition() {
    return this.animationType === "default" && this.bgAniType !== "deactivate";
  }

  handleActivate(e) {
    this.cancleAnimation();

    if (e.target.classList.contains("activate")) {
      this.mainContainer.classList.add("active");
      this.canvas.style.opacity = 1;

      this.container = this.mainContainer;

      this.animationType = "stop";
      this.bgAniType = "activate";
      this.isBgAnimating = true;
    }

    // if (e.target.classList.contains("deactivate")) {
    // }

    this.init();
    this.animate();
  }

  setColor(){
    document.body.style.backgroundColor = this.bodyColor;
    document.body.style.color = this.textColor;

    this.launchBtn.style.backgroundColor = this.textColor;
    this.launchBtn.style.border = `1px solid ${this.textColor}`;
    this.launchBtn.style.color = this.bodyColor;
  }

  addEvent(){
    window.addEventListener('pointermove', this.pointerMoveHandler);
    window.addEventListener('pointerdown', this.pointerDownHandler);
    window.addEventListener('pointerup', this.pointerUpHandler);
  }

  init() {
    this.cancleAnimation();
    this.setColor();
    this.container.appendChild(this.canvas);

    this.background.init(this.container);

    this.stageWidth = this.container.clientWidth;
    this.stageHeight = this.container.clientHeight;

    this.canvas.width = this.stageWidth * window.devicePixelRatio;
    this.canvas.height = this.stageHeight * window.devicePixelRatio;

    this.canvas.style.width = `${this.stageWidth}px`;
    this.canvas.style.height = `${this.stageHeight}px`;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.frameCount = 0;

    this.addEvent();
    this.initiation();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.animationControl();

    if (this.animationCondition()) {
      this.globalAlpha = this.frameCount / this.opTransitionDuration;
      this.ctx.globalAlpha = this.globalAlpha;
      this.animation();
      this.frameCount++;
    }

    this.rafId = window.requestAnimationFrame(this.animate.bind(this));
  }

  animation() {}
  initiation() {}
  cancle() {}

  activate() {
    this.mainContainer.classList.remove("inactive");

    this.canvas.style.opacity = 0;
    this.canvas.classList.remove("deactivate");
    this.canvas.classList.add("activate");
  }

  deactivate() {
    this.mainContainer.classList.remove("active");
    this.canvas.style.opacity = 1;
    this.mainContainer.classList.add("inactive");

    this.canvas.classList.remove("activate");
    this.canvas.classList.add("deactivate");

    this.container = this.baseContainer;

    this.animationType = "stop";
    this.bgAniType = "deactivate";
    this.isBgAnimating = true;

    this.background.reset();
  }

  cancleAnimation() {
    window.cancelAnimationFrame(this.rafId);

    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#3e3e3e';

    this.launchBtn.style.backgroundColor = '#3e3e3e';
    this.launchBtn.style.border = `1px solid #3e3e3e`;
    this.launchBtn.style.color ='#fff';

    window.removeEventListener('pointermove', this.pointerMoveHandler);
    window.removeEventListener('pointerdown', this.pointerDownHandler);
    window.removeEventListener('pointerup', this.pointerUpHandler);

    this.cancle()
  }

  pointerMove(){}
  pointerDown(){}
  pointerUp(){}
}
