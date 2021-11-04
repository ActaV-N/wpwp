import { HelloCanvas } from "./helloCanvas/helloCanvas.js";
import { HangangCanvas } from "./hangangCanvas/hangangCanvas.js";
import { MoonCanvas } from "./moonCanvas/moonCanvas.js";
import { ParticleCanvas3D } from "./3DParticleCanvas/3DParticleCanvas.js";
import { ActavTextCanvas } from './actavTextCanvas/actavTextCanvas.js'
import { RippleCanvas } from './rippleCanvas/rippleCanvas.js'
import { QnaCanvas } from "./qnaCanvas/qnaCanvas.js";

import { log } from "../lib/fx.js";
import { HelloEvent } from "./helloEvent/helloEvent.js";
import { MimeticWordCanvas } from "./mimeticWordCanvas/mimeticWordCanvas.js";
import { SunEvent } from "./sunEvent/sunEvent.js";
import { ParticleEvent3D } from "./3DParticleEvent/3DParticleEvent.js";
import { ActavEvent } from "./actavEvent/actavEvent.js";
import { SkimmingStoneEvent } from "./skimmingStoneEvent/skimmingStoneEvent.js";
import { FaqEvent } from "./faqEvent/faqEvent.js";


// Section1 Canvas
const helloCanvas = new HelloCanvas("#85dcbf", "#hello-canvas-con", '#CBEFE3', '#3d3d3d');
const hangangCanvas = new HangangCanvas("#ffe1a8", "#hangang",'#F5F5DC','#452927');
const moonCanvas = new MoonCanvas("#20639b", "#moon", '#074170','#FFFFDE');
const particleCanvas3D = new ParticleCanvas3D("#1e1e1e", "#particle-3d", '#1d1d1d', '#d1d1d1');
const actavTextCanvas = new ActavTextCanvas('#2A3850', '#actav-text', '#303C50', '#F9F9F6')
const rippleCanvas = new RippleCanvas('#f9f9f9','#ripple');
const qnaCanvas = new QnaCanvas('#f9d1d1','#qna','#FFDDDC','#FE7372');

// Section 2 Canvas
const helloEvent = new HelloEvent('#38618c', '#hello-event', '#074170','#8ECAE6')
const mimeticWord = new MimeticWordCanvas('#e3e3db', '#mimetic-word','#CBCBC4','#5e5e5e');
const sunEvent = new SunEvent('#eae2b7', '#sun','#F9F3D5');
const particleEvent3D = new ParticleEvent3D("#1e1e1e", '#particle-upgrade', '#1d1d1d', '#d1d1d1')
const actavEvent = new ActavEvent('#2A3850', '#actav-event', '#303C50', '#F9F9F6');
const skimmingStoneEvent = new SkimmingStoneEvent('#f9f9f9','#skimming-stone');
const faqEvent = new FaqEvent('#f9d1d1','#faq','#FFDDDC','#FE7372')

let prevPageYOffset;
let scrollDirection;

let panelsListElem;

let scrollRatio;

let sectionInfo;
let articleElem;
let closeElem;
let aboutElem;
let aboutModalElem;
let aboutActive = false;

let canvasActive = false;

let currentCanvas = null;

let loadingContainerElem;

// For resizing
let oldWidth = document.body.clientWidth;

const setElems = () => {
  aboutElem = document.querySelector('.about');
  aboutModalElem = document.querySelector('.about-modal');
  
  loadingContainerElem = document.querySelector('.loading-container');
  
  articleElem = document.querySelector(".article");
  closeElem = document.querySelector(".close-main");
  panelsListElem = document.querySelector(".panels-list");
  sectionInfo = [
    {
      canvas: [
        helloCanvas,
        hangangCanvas,
        moonCanvas,
        particleCanvas3D,
        actavTextCanvas,
        rippleCanvas,
        qnaCanvas
      ],
      panelElems: document.querySelectorAll(".panels-1 .panel"),
      panelsElem: document.querySelector(".panels-1"),
      panelListElem: document.querySelector(".panels-1 .panel-list"),
      observeElems: document.querySelectorAll(".observe-1"),
      observeEnd: document.querySelector(".observe-end.observe-1"),
      currentIndex: null,
      rotatePanel: function () {
        this.panelListElem.style.transform = `translateZ(${
          this.panelDist
        }px) rotateY(${-this.panelAngle * this.currentIndex}deg)`;
      },
      activate: function () {
        if (this.currentIndex !== null) {
          this.panelElems[this.currentIndex].classList.add("active");
          if (this.canvas[this.currentIndex]) {
            this.canvas[this.currentIndex].init();
            this.canvas[this.currentIndex].animate();
            currentCanvas = this.canvas[this.currentIndex];
            aboutElem.style.color = currentCanvas.textColor;
          }
        }
      },
      deactivate: function () {
        if (this.currentIndex !== null) {
          this.panelElems[this.currentIndex].classList.remove("active");
          if (this.canvas[this.currentIndex]) {
            this.canvas[this.currentIndex].cancleAnimation();
            aboutElem.style.color = '#1e1e1e';
          }
        }
      }
    },
    {
      canvas:[
        helloEvent,
        mimeticWord,
        sunEvent,
        particleEvent3D,
        actavEvent,
        skimmingStoneEvent,
        faqEvent
      ],
      observeStart: document.querySelector(".observe-start.observe-2"),
      observeEnd: document.querySelector(".observe-end.observe-2"),
      panelElems: document.querySelectorAll(".panels-2 .panel"),
      panelsElem: document.querySelector(".panels-2"),
      panelListElem: document.querySelector(".panels-2 .panel-list"),
      observeElems: document.querySelectorAll(".observe-2"),
      currentIndex: null,
      rotatePanel: function () {
        this.panelListElem.style.transform = `translate3d(${
          this.panelDist
        }px, 0, 0) rotateZ(${-this.panelAngle * this.currentIndex}deg)`;
        // this.panelListElem.style.transform = `rotateZ(${
        //   -this.panelAngle * this.currentIndex
        // }deg)`;
      },
      activate: function () {
        if (this.currentIndex !== null) {
          this.panelElems[this.currentIndex].classList.add("active");
          
          if (this.canvas[this.currentIndex]) {
            this.canvas[this.currentIndex].init();
            this.canvas[this.currentIndex].animate();
            currentCanvas = this.canvas[this.currentIndex];
            aboutElem.style.color = currentCanvas.textColor;
          }
        }
      },
      deactivate: function () {
        if (this.currentIndex !== null) {
          this.panelElems[this.currentIndex].classList.remove("active");
          if (this.canvas[this.currentIndex]) {
            this.canvas[this.currentIndex].cancleAnimation();
            aboutElem.style.color = '#1e1e1e';
          }
        }
      }
    },
    {
      observeStart: document.querySelector(".observe-start.observe-3"),
      observeEnd: document.querySelector(".observe-end.observe-3"),
      panelElems: document.querySelectorAll(".panels-3 .panel"),
      panelsElem: document.querySelector(".panels-3"),
      panelListElem: document.querySelector(".panels-3 .panel-list"),
      observeElems: document.querySelectorAll(".observe-3"),
      currentIndex: null,
      rotatePanel: function () {
        this.panelListElem.style.transform = `translate3d(0, 0, ${
          this.panelDist * this.currentIndex
        }px) rotateY(30deg)`;
      },
      activate: function () {
        if (this.currentIndex !== null) {
          this.panelElems[this.currentIndex].classList.add("active");
          this.panelElems[this.currentIndex].classList.remove("deactivate");

          if(this.panelElems[this.currentIndex - 1]){
            this.panelElems[this.currentIndex - 1].classList.add('deactivate')
          }
          let launchBtn, textColor, bgColor
          if(this.currentIndex === 0){
            launchBtn = document.querySelector('.btn-launch[data-to="https://ramble.actav.be"]')
            textColor = '#d1d1d1';
            bgColor = '#1b1b1b';
          } else if(this.currentIndex === 1){
            launchBtn = document.querySelector('.btn-launch[data-to="https://marathon.actav.be"]')
            textColor = '#3e3e3e';
            bgColor = '#eee';
          }
          document.body.style.backgroundColor = bgColor;
          document.body.style.color = textColor;

          launchBtn.style.backgroundColor = textColor;
          launchBtn.style.border = `1px solid ${textColor}`;
          launchBtn.style.color = bgColor;
        }
      },
      deactivate: function () {
        if (this.currentIndex !== null) {
          this.panelElems[this.currentIndex].classList.remove("active");
          if (scrollDirection === "down") {
            this.panelElems[this.currentIndex].classList.add("deactivate");
          }
        }
      }
    }
  ];
};

let section;

const setPanelInfo = () => {
  section.panelLength = section.panelElems.length;
  section.panelAngle = 360 / section.panelLength;
  section.panelRadian = (Math.PI * 2) / section.panelLength;
};

const setPanels = () => {
  // Section 1 Panels
  let translateZ;

  section = sectionInfo[0];
  setPanelInfo();

  for (const panel of section.panelElems) {
    translateZ = (panel.clientWidth * 1.5) / 2 / (section.panelRadian / 2);

    panel.style.transform = `rotateY(${
      section.panelAngle * panel.dataset.projectIndex
    }deg) translateZ(${-translateZ}px)`;
  }
  section.panelDist = translateZ;

  // Section 2 Panels
  let translateX;

  section = sectionInfo[1];
  setPanelInfo();

  for (const panel of section.panelElems) {
    translateX =
      panel.clientHeight / 2 / Math.tan(section.panelRadian / 2) +
      panel.clientHeight;
    panel.style.transform = `rotate(${
      section.panelAngle * panel.dataset.projectIndex
    }deg) translateX(${-translateX}px)`;

    section.panelListElem.style.transform = `translate3d(0, 0, ${
      -translateX * 1.5
    }px)`;
  }

  section.panelDist = translateX;

  // Section 3 panels
  let dist;
  section = sectionInfo[2];

  for (const panel of section.panelElems) {
    dist = panel.clientWidth * 0.3;
    panel.style.transform = `rotateY(-30deg) translate3d(0, 0, ${
      -dist * panel.dataset.projectIndex
    }px)`;
  }

  section.panelDist = dist;
  section.panelListElem.style.transform = `translate3d(0, 0, ${-dist * 1.5}px)`;
};

const init = () => {
  setElems();
  setPanels();
  setScrollRatio();

  // Loading here
  document.body.setAttribute('id','load-end');
  if(loadingContainerElem){
    loadingContainerElem.addEventListener('transitionend', function(){
      document.body.removeChild(loadingContainerElem);
      document.body.setAttribute('id','')
    })
  }


  // Observer for section 1
  const firstIO = new IntersectionObserver((entries, observer) => {
    const section = sectionInfo[0];
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const projectIndex = entry.target.dataset.projectIndex * 1;
        if (projectIndex >= 0) {
          section.deactivate();

          section.currentIndex = projectIndex;
          section.rotatePanel();
          section.activate();
        }

        if (
          scrollDirection === "up" &&
          entry.target.classList.contains("section-title")
        ) {
          section.panelListElem.style.transform = `translateZ(0px) rotateY(0)`;
          section.deactivate();
        }
      }
    }
  });

  const secondIO = new IntersectionObserver((entries, observer) => {
    const section = sectionInfo[1];
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const projectIndex = entry.target.dataset.projectIndex * 1;

        if (projectIndex >= 0) {
          section.deactivate();

          section.currentIndex = projectIndex;

          section.rotatePanel();
          section.activate();
        }

        if (
          scrollDirection === "up" &&
          entry.target.classList.contains("section-title")
        ) {
          section.panelListElem.style.transform = `translate3d(0, 0, ${
            -section.panelDist * 1.5
          }px)`;
          section.deactivate();
        } else if(scrollDirection === 'down' && entry.target.classList.contains('section-title')){
          sectionInfo[0].deactivate();
        }
      }
    }
  });

  const thirdIO = new IntersectionObserver((entries, observer) => {
    const section = sectionInfo[2];
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if(entry.target.classList.contains('section-title')){
          document.body.style.backgroundColor = '#fff';
          document.body.style.color = '#3e3e3e';
        }

        const projectIndex = entry.target.dataset.projectIndex * 1;

        if (projectIndex >= 0) {
          section.deactivate();

          section.currentIndex = projectIndex;

          section.rotatePanel();
          section.activate();
        }

        if (
          scrollDirection === "up" &&
          entry.target.classList.contains("section-title")
        ) {
          section.panelListElem.style.transform = `translate3d(0, 0, ${
            -section.panelDist * 1.5
          }px) rotateY(0)`;
          section.deactivate();
        }else if(scrollDirection === 'down' && entry.target.classList.contains('section-title')){
          sectionInfo[1].deactivate();
        }
      }
    }
  });

  for (const observe of sectionInfo[0].observeElems) {
    firstIO.observe(observe);
  }

  for (const observe of sectionInfo[1].observeElems) {
    secondIO.observe(observe);
  }

  for (const observe of sectionInfo[2].observeElems) {
    thirdIO.observe(observe);
  }

  articleElem.addEventListener("pointerdown", function (e) {
    if (e.target.classList.contains("btn-launch")) {
      if(e.target.classList.contains('btn-url')){
        const url = e.target.dataset.to;
        window.location = url;
      }else{
        if (!document.body.classList.contains("panel-active")) {
          document.body.classList.add("panel-active");
          
          const panel = document.querySelector(`#${e.target.dataset.to}`);
          const sectionIndex = panel.dataset.sectionIndex * 1;
          const projectIndex = panel.dataset.projectIndex * 1;
          
          currentCanvas = sectionInfo[sectionIndex].canvas[projectIndex];
          currentCanvas.activate();
          canvasActive = true;
        }
      }
    }
  });

  closeElem.addEventListener("pointerdown", function (e) {
    if(currentCanvas && canvasActive && !aboutActive){
      currentCanvas.deactivate();
    } 

    if(!canvasActive || !aboutActive){
      document.body.classList.add("panel-inactive");
    }

    if(aboutActive){
      aboutModalElem.classList.add('deactivate');
      aboutModalElem.classList.remove('active');
    }
    
    setTimeout(() => {
      if(!canvasActive || !aboutActive){
        document.body.classList.remove("panel-active");
      }
      document.body.classList.remove("panel-inactive");

      if(currentCanvas){
        currentCanvas.cancleAnimation();
        currentCanvas.addEvent();
        currentCanvas.animate();
        currentCanvas.setColor();
      }   

      if(canvasActive && !aboutActive){
        canvasActive = false;
      }

      if(aboutActive){
        aboutModalElem.classList.remove('deactivate');
        aboutActive = false;
      }
    }, 2000);
  });

  aboutElem.addEventListener('pointerdown', function(e){
    aboutActive = true;

    document.body.classList.add('panel-active');
    aboutModalElem.classList.add('active');
    
    if(currentCanvas) currentCanvas.cancleAnimation();
  })
};

function setScrollRatio() {
  const firstEnd = sectionInfo[0].observeEnd.offsetTop - window.innerHeight;
  const secondStart = firstEnd + sectionInfo[1].observeStart.offsetTop;
  const secondEnd = firstEnd + sectionInfo[1].observeEnd.offsetTop;
  const thirdStart = secondEnd + sectionInfo[2].observeStart.offsetTop;

  if (window.pageYOffset < firstEnd) {
    scrollRatio = 0;
  } else if (
    window.pageYOffset >= firstEnd &&
    window.pageYOffset <= secondStart
  ) {
    scrollRatio = (window.pageYOffset - firstEnd) / (secondStart - firstEnd);
  } else if (
    window.pageYOffset > secondStart &&
    window.pageYOffset < secondEnd
  ) {
    scrollRatio = 1;
  } else if (
    window.pageYOffset >= secondEnd &&
    window.pageYOffset <= thirdStart
  ) {
    scrollRatio =
      1 + (window.pageYOffset - secondEnd) / (thirdStart - secondEnd);
  } else {
    scrollRatio = 2;
  }

  panelsListElem.scrollTo(
    0,
    scrollRatio * sectionInfo[0].panelsElem.clientHeight
  );

}

const scrollHandler = () => {
  setScrollRatio();
  if (prevPageYOffset < window.pageYOffset) {
    scrollDirection = "down";
  } else {
    scrollDirection = "up";
  }

  prevPageYOffset = window.pageYOffset;
};

const resize = () => {
  if(oldWidth !== document.body.clientWidth){
    init();
  }

  oldWidth = document.body.clientWidth;
}

window.addEventListener("load", init);
window.addEventListener("resize", resize);

window.addEventListener("scroll", scrollHandler);
