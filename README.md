### 넷러너 (NETRUNNER)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 소개
**NETRUNNER**는 웹 기반 해킹 시뮬레이션 게임으로, 사용자가 해킹의 기본 개념과 기법을 체험할 수 있는 환경을 제공합니다. 이 프로젝트는 해킹의 복잡하고 다양한 개념을 게임이라는 형태로 단순화하여 사용자에게 흥미롭고 교육적인 경험을 제공합니다. NETRUNNER는 실제 해킹 과정에서 사용되는 여러 기법들을 미니게임 형식으로 구현하여, 사용자들이 해킹 과정에 대해 쉽게 이해하고 재미있게 배울 수 있도록 설계되었습니다.

게임 내에서 사용자는 다양한 해킹 도구를 사용하여 시스템에 침입하거나 방어하는 시뮬레이션을 경험하며, 이러한 과정을 통해 네트워크 보안, 암호 해제, 정보 수집 등의 여러 해킹 기법에 대한 기본적인 이해를 높일 수 있습니다. NETRUNNER는 이러한 해킹 기법을 가르치는 과정에서 교육적인 목적과 엔터테인먼트 요소를 조화롭게 결합하였습니다. 이로 인해 IT 보안과 해킹에 관심이 있는 사람들은 물론, 기초적인 컴퓨터 과학 지식을 갖춘 일반 사용자도 재미있게 접근할 수 있는 것이 특징입니다.

NETRUNNER는 다양한 해킹 도구와 퍼즐, 그리고 미니게임을 통해 사용자가 능동적으로 문제를 해결하고, 창의적인 사고를 통해 각종 해킹 미션을 클리어할 수 있도록 구성되어 있습니다. 이와 같은 게임 플레이는 단순한 강의나 읽기 자료를 통해서는 얻기 어려운 실질적인 경험을 제공합니다.

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
📦src
 ┣ 📂assets
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜mainbgm.mp3
 ┃ ┣ 📜tuto.png
 ┃ ┣ 📜tuto2.png
 ┃ ┣ 📜tuto3.png
 ┃ ┣ 📜tuto4.png
 ┃ ┣ 📜tuto5.png
 ┃ ┣ 📜wallpaper.jpg
 ┃ ┗ 📜Worm.jsx
 ┣ 📂components
 ┃ ┣ 📂Background
 ┃ ┃ ┣ 📜AudioContext.js
 ┃ ┃ ┗ 📜BackgroundMusic.js
 ┃ ┣ 📂Directory
 ┃ ┃ ┣ 📂menu
 ┃ ┃ ┃ ┣ 📜menu.css
 ┃ ┃ ┃ ┗ 📜Menu.jsx
 ┃ ┃ ┣ 📂modals
 ┃ ┃ ┃ ┣ 📜Modal.jsx
 ┃ ┃ ┃ ┗ 📜modal.module.css
 ┃ ┃ ┣ 📜DirectoryViewer.jsx
 ┃ ┃ ┗ 📜DirectoryViewer.module.css
 ┃ ┣ 📂Lank
 ┃ ┃ ┣ 📜Lanking.jsx
 ┃ ┃ ┗ 📜Lanking.module.css
 ┃ ┣ 📂MainPageComp
 ┃ ┃ ┣ 📂modals
 ┃ ┃ ┃ ┣ 📜Modal.jsx
 ┃ ┃ ┃ ┗ 📜modal.module.css
 ┃ ┃ ┣ 📜MainPageComp.jsx
 ┃ ┃ ┗ 📜MainPageComp.module.css
 ┃ ┣ 📂NodeMap
 ┃ ┃ ┗ 📜NodeMap.jsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┣ 📜ProfileCard.jsx
 ┃ ┃ ┗ 📜ProfileCard.module.css
 ┃ ┣ 📂Quest
 ┃ ┃ ┣ 📜Quest.jsx
 ┃ ┃ ┗ 📜Quest.module.css
 ┃ ┣ 📂Shop
 ┃ ┃ ┣ 📜shop.jsx
 ┃ ┃ ┗ 📜shop.module.css
 ┃ ┣ 📂Terminal
 ┃ ┃ ┣ 📜TerminalInteraction.jsx
 ┃ ┃ ┣ 📜termPage.jsx
 ┃ ┃ ┣ 📜termsocket.jsx
 ┃ ┃ ┗ 📜xterm-custom.css
 ┃ ┗ 📂Tutorial
 ┃ ┃ ┣ 📂PopOver
 ┃ ┃ ┃ ┣ 📜popOver.css
 ┃ ┃ ┃ ┗ 📜popOverProp.jsx
 ┃ ┃ ┣ 📜tutorial.css
 ┃ ┃ ┗ 📜tutorialPage.jsx
 ┣ 📂pages
 ┃ ┣ 📂loginPages
 ┃ ┃ ┣ 📂modals
 ┃ ┃ ┃ ┣ 📜modal.css
 ┃ ┃ ┃ ┗ 📜Modal.jsx
 ┃ ┃ ┣ 📜login.module.css
 ┃ ┃ ┗ 📜LoginPage.jsx
 ┃ ┗ 📂mainPages
 ┃ ┃ ┣ 📂HackTool
 ┃ ┃ ┃ ┣ 📜DecypeToolModal.jsx
 ┃ ┃ ┃ ┣ 📜PortHack.module.css
 ┃ ┃ ┃ ┣ 📜PortToolmodal.jsx
 ┃ ┃ ┃ ┗ 📜ToolLayout.module.css
 ┃ ┃ ┣ 📂MiniGames
 ┃ ┃ ┃ ┣ 📂Utils
 ┃ ┃ ┃ ┃ ┣ 📜mazeConverter.js
 ┃ ┃ ┃ ┃ ┗ 📜mazeGenerator.js
 ┃ ┃ ┃ ┣ 📜FlipMatrixGame.jsx
 ┃ ┃ ┃ ┣ 📜FlipMatrixGame.module.css
 ┃ ┃ ┃ ┣ 📜JigsawHackingGame.jsx
 ┃ ┃ ┃ ┣ 📜JigsawHackingGame.module.css
 ┃ ┃ ┃ ┣ 📜metrixpuzzle.jsx
 ┃ ┃ ┃ ┣ 📜MetrixPuzzle.module.css
 ┃ ┃ ┃ ┣ 📜RandomMazeGame.jsx
 ┃ ┃ ┃ ┣ 📜RandomMazeGame.module.css
 ┃ ┃ ┃ ┣ 📜RotatePuzzle.jsx
 ┃ ┃ ┃ ┣ 📜RotatePuzzle.module.css
 ┃ ┃ ┃ ┣ 📜WormMazeGame.jsx
 ┃ ┃ ┃ ┗ 📜WormMazeGame.module.css
 ┃ ┃ ┣ 📂Setting
 ┃ ┃ ┃ ┣ 📜Setting.jsx
 ┃ ┃ ┃ ┗ 📜Setting.module.css
 ┃ ┃ ┣ 📜MainPage.jsx
 ┃ ┃ ┗ 📜MainPage.module.css
 ┣ 📂services
 ┃ ┗ 📜AuthService.jsx
 ┣ 📂socket
 ┃ ┣ 📜Gsocket.jsx
 ┃ ┗ 📜socket.jsx
 ┣ 📜.DS_Store
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜config.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
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
