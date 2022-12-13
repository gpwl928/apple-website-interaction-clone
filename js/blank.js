// 즉시 호출 함수 - 괄호로 감싼다음에 괄호로 호출?
(() => {

  // 상황에 따라 yOffset에 계산 값을 넣기 위해 변수를 만듦
  let yOffset = 0; // window.pageYoffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작되는 순간 true

const sceneInfo = [
  {
    // id: scroll_section0,
    type: 'sticky', // sticky animaiton 있을 때
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeigth 세팅
    scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
    // 애니메이션으로 조작할 object
    objs: {
      container: document.querySelector('#scroll-section-0'),
      messageA: document.querySelector('#scroll-section-0 .main-message.a'),
      messageB: document.querySelector('#scroll-section-0 .main-message.b'),
      messageC: document.querySelector('#scroll-section-0 .main-message.c'),
      messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      canvas: document.querySelector('#video-canvas-0'),
      context: document.querySelector('#video-canvas-0').getContext('2d'),
      videoImages: [],
    },
    // 애니메이션 등장 시점, 사라질 시점 정의
    values: {
      // 비디오 이미지 개수
      videoImageCount: 300,
      // 이미지 순서 [초깃값, 최종값]
      imageSequence: [0 ,299],
      canvas_opacity: [1, 0, { start: 0.9, end: 1}],
      // start & end = 애니메이션이 재생되는 구간 (비율로 나타냄)
      messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
      messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
      messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
      messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
      messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }], // 20%에서 0%
      messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
      messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
      messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
      messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
      messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
      messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
      messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }], // 0에서 -20%로 (위로 사라져야하기 때문에)
      messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
      messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
      messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
    }
  },
  {
    // id: scroll_section1,
    type: 'normal', // 보통 스크롤
    // heightNum: 5, // normal에선 필요 없음
    scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
    objs: {
      container: document.querySelector('#scroll-section-1'),
      content: document.querySelector('#scroll-section-1 .description')
    }
  },
  {
    // id: scroll_section2,
    type: 'sticky',
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeigth 세팅
    scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
    objs: {
      container: document.querySelector('#scroll-section-2'),
      messageA: document.querySelector('#scroll-section-2 .a'),
      messageB: document.querySelector('#scroll-section-2 .b'),
      messageC: document.querySelector('#scroll-section-2 .c'),
      pinB: document.querySelector('#scroll-section-2 .b .pin'),
      pinC: document.querySelector('#scroll-section-2 .c .pin'),
      canvas: document.querySelector('#video-canvas-1'),
      context: document.querySelector('#video-canvas-1').getContext('2d'),
      videoImages: [],
    },
    values: {
        // 비디오 이미지 개수
        videoImageCount: 960,
        // 이미지 순서 [초깃값, 최종값]
        imageSequence: [0 ,959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1}],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1}],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
    }
  },
  {
    // id: scroll_section3,
    type: 'sticky',
    heightNum: 5, // 브라우저 높이의 5배로 scrollHeigth 세팅
    scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
    objs: {
      container: document.querySelector('#scroll-section-3'),
      canvasCaption: document.querySelector('.canvas-caption'),
      // 스크롤 될 때마다 canvas의 크기를 조절해야하기 때문에 playAnimation()에서 canvas크기 조절 실행
      canvas: document.querySelector('.image-blend-canvas'),
      context: document.querySelector('.image-blend-canvas').getContext('2d'),
      imagesPath: [
        './images/blend-image-1.jpg',
        './images/blend-image-2.jpg'
      ],
      images: [],
    },
    values: {

    }
  },
];

function setCanvasImages() {
  let imgElem;
  let imgElem2;
  let imgElem3;
  for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
    // 이미지 객체가 만들어짐 new Image(); 
    // 이미지 클래스(Image())를 통해 동적으로 이미지를 다룰 수가 있음 -> ex) 이미지 url을 동적으로 제어하거나 이미지를 미리 로딩하려하거나, 크기를 바로 바꿀 때 쓸 수 있음
    imgElem = new Image(); // imgElem = document.createElement('img'); 와 같음
    imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
    sceneInfo[0].objs.videoImages.push(imgElem);
  }
  for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
    // 이미지 객체가 만들어짐 new Image(); 
    // 이미지 클래스(Image())를 통해 동적으로 이미지를 다룰 수가 있음 -> ex) 이미지 url을 동적으로 제어하거나 이미지를 미리 로딩하려하거나, 크기를 바로 바꿀 때 쓸 수 있음
    imgElem2 = new Image(); // imgElem = document.createElement('img'); 와 같음
    imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
    sceneInfo[2].objs.videoImages.push(imgElem2);
  }
  // 그리는 건 아래에 playAnimation함수에서 하면 됨

  for (let i =0; i < sceneInfo[3].objs.imagesPath.length; i++) {
    imgElem3 = new Image(); // imgElem = document.createElement('img'); 와 같음
    imgElem3.src = sceneInfo[3].objs.imagesPath[i];
    sceneInfo[3].objs.images.push(imgElem3);
  }
}

function setLayout () {
  // 각 스크롤 섹션의 높이 세팅: heightNum * 브러우저 창 높이
  for (let i = 0; i < sceneInfo.length; i++) {
    if (sceneInfo[i].type === 'sticky') {
      sceneInfo[i].scrollHeigth = sceneInfo[i].heightNum * window.innerHeight;
    } else if (sceneInfo[i].type === 'normal') {
      sceneInfo[i].scrollHeigth = sceneInfo[i].objs.container.offsetHeight;
    }
    sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeigth}px`;
  }

  //스크롤 위치에 맞는 currentScene 값 세팅
  yOffset = window.pageYOffset;
  let totalScrollHeight = 0;
  for (let i = 0; i < sceneInfo.length; i++) {
    totalScrollHeight += sceneInfo[i].scrollHeigth;
    if (totalScrollHeight >= yOffset) {
      currentScene = i;
      break;
    }
  }
  document.body.setAttribute('id', `show-scene-${currentScene}`);

  // canvas의 고정 높이인 1080과 윈도우창 높이 사이즈를 비교
  const heightRatio = window.innerHeight / 1080;
  console.log('windowInner', window.innerHeight);
  sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
}

// valuse = message_opacity의 배열
function calcValues(values, currentYOffset) {
  let rv; // return value의 줄임말
  // 해당 Scene의 scrollHeight
  const scrollHeigth = sceneInfo[currentScene].scrollHeigth;
  // 현재 Scene에서 스크롤 정도를 나타내는 값(비율)
  const scrollRatio = currentYOffset / scrollHeigth;
  
  if (values.length === 3) {
    // start ~ end 사이에 애니메이션 실행
   const partScrollStart = values[2].start * scrollHeigth;
   const partScrollEnd = values[2].end * scrollHeigth;
   const partScrollHeight = partScrollEnd - partScrollStart;
   const partScrollRatio = (currentYOffset - partScrollStart) / partScrollHeight;

   if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
    rv =  partScrollRatio * (values[1] - values[0]) + values[0];
   } else if (currentYOffset < partScrollStart) {
    rv = values[0];
   } else if (currentYOffset > partScrollEnd) {
    rv = values[1];
   }
  } else {
    rv = scrollRatio * (values[1] - values[0]) + values[0];
  }

  return rv;

}

function playAnimation() {
  const objs = sceneInfo[currentScene].objs;
  const values = sceneInfo[currentScene].values;
  const currentYOffset = yOffset - prevScrollHeight;
  const scrollHeight = sceneInfo[currentScene].scrollHeigth;
  const scrollRatio = currentYOffset / scrollHeight;

  switch (currentScene) {
    case 0: 
      let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
      objs.context.drawImage(objs.videoImages[sequence], 0, 0);
      objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

      if (scrollRatio <= 0.22) {
        // in
        objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
        // translate3d를 쓰면 퍼포먼스가 좋아짐 (하드웨어 가속도가 빨라짐)
        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
      }

      break;
    case 1: 
      break;
    case 2: 
      let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
      objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

      // scrollRatio에 따른 비디오 시작, 끝 opacity설정
      if(scrollRatio <= 0.5) {
        objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
      } else {
        objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
      }

      if (scrollRatio <= 0.25) {
        // in
        objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
      } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
      }

      if (scrollRatio <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
      } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
      }

      if (scrollRatio <= 0.83) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
      } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
      }

      break;
    case 3: 
    // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
    const widthRatio = window.innerWidth / objs.canvas.width;
    const heightRatio = window.innerHeight / objs.canvas.height;
    let canvasScaleRatio;

    if (widthRatio <= heightRatio) {
      // 캔버스보다 브라우저 창이 홀쭉한 경우
      canvasScaleRatio = heightRatio;
    } else {
      // 캔버스보다 브라우저 창이 납짝한 경우
      canvasScaleRatio = widthRatio;
    }
    
    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
    objs.context.drawImage(objs.images[0], 0, 0);

      break;
  }
}

// 현재 몇 번째 스크롤 섹션이 스크롤 중인지를 판별
function scrollLoop() {
  enterNewScene = false;
  prevScrollHeight = 0;

  for (let i = 0; i < currentScene; i++) {
    // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeigth;
    prevScrollHeight += sceneInfo[i].scrollHeigth;
  }

  if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeigth) {
    enterNewScene = true;
    currentScene++;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  if (yOffset < prevScrollHeight) {
    enterNewScene = true;
    // currentSecne이 -값이 될 수 없기 때문에 (바운스 효과가 있을 시 currentScene이 0일 때 -값이 될 수 있음)
    if (currentScene === 0) return;
    currentScene--;
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  // 새로운 scene에 들어갈 때 messageA_opacity_in의 첫번째 값이 -값으로 이상하게 나옴 그걸 넘어 가는 코드
  if (enterNewScene) return;

  playAnimation();
}

//창크기에 맞춰서 높이 변화
window.addEventListener('scroll', () => {
  yOffset = window.pageYOffset;
  scrollLoop();
});

// window.addEventListener('DOMContentLoaded', setLayout);도 아래와 같음
// DOMContentLoaded와 load의 차이 : load는 웹페이지 리소스 이미지까지 다 로딩된 후에 실행 DOMContentLoaded는 DOM구조가 로드가 끝나면 바로 실행 그래서 DOMContentLoaded가 먼저 실행됨 보통 요걸 더 많이 씀
// load시 발생하는 이벤트 함수를 익명함수를 넣어 setLayout을 호출함
window.addEventListener('load', () => {
  setLayout();
// load할 때 첫번째 이미지만 보여주면 되기 때문에 videoImages의 0번째 배열을 호출함
  sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  sceneInfo[2].objs.context.drawImage(sceneInfo[2].objs.videoImages[0], 0, 0);
});
window.addEventListener('resize', setLayout);

setCanvasImages();

}) ();