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
    },
    // 애니메이션 등장 시점, 사라질 시점 정의
    values: {
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
      pinC: document.querySelector('#scroll-section-2 .c .pin')
    },
    values: {
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
      canvasCaption: document.querySelector('.canvas-caption')
    },
    values: {

    }
  },
];

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
window.addEventListener('load', setLayout);
window.addEventListener('resize', setLayout);


}) ();