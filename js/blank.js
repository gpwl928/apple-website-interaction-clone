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
        messageA_opacity: [0, 1],
      }
    },
    {
      // id: scroll_section1,
      type: 'normal', // 보통 스크롤
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeigth 세팅
      scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // id: scroll_section2,
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeigth 세팅
      scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // id: scroll_section3,
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeigth 세팅
      scrollHeigth: 0, // 기기마다 높이가 다르기 때문에
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  function setLayout () {
    // 각 스크롤 섹션의 높이 세팅: heightNum * 브러우저 창 높이
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeigth = sceneInfo[i].heightNum * window.innerHeight;
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
  // 현재 Scene에서 스크롤 정도를 나타내는 값(비율)
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeigth;
    
    rv = scrollRatio * (values[1] - values[0] + values[0]);

    return rv;

  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0: 
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1: 
        break;
      case 2: 
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