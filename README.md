### 넷러너 (NETRUNNER)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 소개
**NETRUNNER**는 다양한 해킹 활동을 통제되고 교육적인 환경에서 시뮬레이션하는 자바스크립트 해킹 시뮬레이터 게임입니다. 이 게임은 React 기반의 프론트엔드와 NestJS 기반의 백엔드로 구성되어 있습니다. 유저는 리눅스와 유사한 방식의 터미널과 파일 관리자를 사용하여 미션을 수행합니다. 터미널과 파일 관리자는 동기화되어 있으며, 유저는 가상 해킹 도구를 활용해 해킹 실습을 진행합니다. 미션을 완료하면 레벨과 포인트를 얻어 상점에서 추가 도구를 구매할 수 있습니다.

## 기능
- 해킹 시뮬레이션
- 다양한 해킹 도구와 기술 사용 가능

## 스크린샷
![스크린샷](https://i.imgur.com/tlv0pTY.png)

## 설치 방법
1. 이 저장소를 클론합니다.
    ```bash
    git clone https://github.com/Jaemnie/NETRUNNER.git
    ```
2. 프로젝트 디렉터리로 이동합니다.
    ```bash
    cd NETRUNNER
    ```
3. 필요한 패키지를 설치합니다.
    ```bash
    npm install
    ```

## 실행 방법
1. 애플리케이션을 시작합니다.
    ```bash
    npm start
    ```

## 사용된 라이브러리
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## 코드 구조
```
src
├── assets
│   ├── mainbgm.mp3
│   └── wallpaper.jpg
├── components
│   ├── Background
│   │   ├── AudioContext.js
│   │   └── BackgroundMusic.js
│   ├── Directory
│   │   ├── menu
│   │   │   ├── Menu.jsx
│   │   │   └── menu.css
│   │   ├── modals
│   │   │   ├── Modal.jsx
│   │   │   └── modal.css
│   │   ├── DirectoryViewer.jsx
│   │   └── DirectoryViewer.module.css
│   ├── Lank
│   │   ├── Lanking.jsx
│   │   └── Lanking.module.css
│   ├── MainPageComp
│   │   ├── MainPageComp.jsx
│   │   └── MainPageComp.module.css
│   ├── Profile
│   │   ├── ProfileCard.jsx
│   │   └── ProfileCard.module.css
│   ├── Quest
│   │   ├── Quest.jsx
│   │   └── Quest.module.css
│   ├── Shop
│   │   ├── shop.jsx
│   │   └── shop.module.css
│   └── Terminal
│       ├── TerminalInteraction.jsx
│       ├── termPage.jsx
│       ├── termsocket.jsx
│       └── xterm-custom.css
├── pages
│   ├── loginPages
│   │   ├── modals
│   │   │   ├── Modal.jsx
│   │   │   └── modal.css
│   │   ├── LoginPage.jsx
│   │   └── login.module.css
│   └── mainPages
│       ├── Setting
│       │   ├── Setting.jsx
│       │   └── Setting.module.css
│       ├── MainPage.jsx
│       └── MainPage.module.css
├── services
│   ├── AuthService.jsx
│   └── socket
│       ├── Gsocket.jsx
│       └── socket.jsx
├── App.css
├── App.js
├── App.test.js
├── config.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```

## 기여 방법
1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 만듭니다.
    ```bash
    git checkout -b feature/새로운기능
    ```
3. 기능을 추가하거나 버그를 수정합니다.
4. 변경 사항을 커밋합니다.
    ```bash
    git commit -am '새 기능 추가'
    ```
5. 브랜치에 푸시합니다.
    ```bash
    git push origin feature/새로운기능
    ```
6. 풀 리퀘스트를 생성합니다.

## 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 작성자
- [JAEMNI](https://github.com/Jaemnie)
- [LEESBEOM](https://github.com/LEESBEOM)
- [JSH9298](https://github.com/jsh9298)
- [yoonsangha](https://github.com/yoonsangha)

## 문의
질문이나 문의 사항이 있으면, [issues](https://github.com/Jaemnie/NETRUNNER/issues) 섹션에 남겨주세요.
