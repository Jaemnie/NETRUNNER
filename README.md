# NETRUNNER

NETRUNNER는 웹 기반 해킹 시뮬레이션 게임으로, 사용자가 해킹의 기본 개념과 기법을 체험할 수 있는 환경을 제공합니다. 이 프로젝트는 해킹의 복잡하고 다양한 개념을 게임이라는 형태로 단순화하여 사용자에게 흥미롭고 교육적인 경험을 제공합니다. NETRUNNER는 실제 해킹 과정에서 사용되는 여러 기법들을 미니게임 형식으로 구현하여, 사용자들이 해킹 과정에 대해 쉽게 이해하고 재미있게 배울 수 있도록 설계되었습니다. 

게임 내에서 사용자는 다양한 해킹 도구를 사용하여 시스템에 침입하거나 방어하는 시뮬레이션을 경험하며, 이러한 과정을 통해 네트워크 보안, 암호 해제, 정보 수집 등의 여러 해킹 기법에 대한 기본적인 이해를 높일 수 있습니다. NETRUNNER는 이러한 해킹 기법을 가르치는 과정에서 교육적인 목적과 엔터테인먼트 요소를 조화롭게 결합하였습니다. 이로 인해 IT 보안과 해킹에 관심이 있는 사람들은 물론, 기초적인 컴퓨터 과학 지식을 갖춘 일반 사용자도 재미있게 접근할 수 있는 것이 특징입니다.

NETRUNNER는 다양한 해킹 도구와 퍼즐, 그리고 미니게임을 통해 사용자가 능동적으로 문제를 해결하고, 창의적인 사고를 통해 각종 해킹 미션을 클리어할 수 있도록 구성되어 있습니다. 이와 같은 게임 플레이는 단순한 강의나 읽기 자료를 통해서는 얻기 어려운 실질적인 경험을 제공합니다.

## 스크린샷
![스크린샷](https://i.imgur.com/tlv0pTY.png))

## 프로젝트 구조

```
### 넷러너 (NETRUNNER)
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
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜config.js
 ┣ 📜index.js
 ┗ 📜setupTests.js
```

### 주요 디렉토리 및 파일 설명

- **Tutorial**: 게임의 기본 기능과 조작법을 배우는 튜토리얼과 관련된 컴포넌트를 포함합니다. 사용자가 게임을 원활히 시작할 수 있도록 돕습니다.
- **pages/loginPages**: 로그인 페이지와 관련된 파일을 포함합니다. 인증 관련 UI 및 모달 컴포넌트를 관리합니다.
- **pages/mainPages**: 메인 페이지에서 사용되는 다양한 하위 컴포넌트를 포함합니다. 해킹 도구 및 미니게임 기능도 이곳에 포함되어 있습니다.
- **HackTool**: 해킹 도구와 관련된 다양한 모듈을 포함하고 있습니다. 사용자가 해킹 시뮬레이션에 필요한 도구들을 조작할 수 있습니다.
- **MiniGames**: 다양한 해킹 관련 퍼즐과 미니게임이 포함되어 있어 사용자가 해킹 개념을 재미있게 학습할 수 있도록 도와줍니다. 예를 들면, 미로 퍼즐이나 매트릭스 퍼즐 등이 있습니다.
- **services/AuthService.jsx**: 인증과 관련된 로직을 관리하는 파일입니다. 사용자의 로그인 및 회원가입 처리를 담당합니다.
- **socket**: 소켓 통신을 처리하는 파일들로, 게임의 실시간 인터랙션을 가능하게 합니다.

## 설치 및 실행 방법

NETRUNNER를 로컬에서 실행하기 위해서는 Node.js와 npm이 필요합니다. 다음의 명령어를 통해 설치 및 실행할 수 있습니다.

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/Jaemnie/NETRUNNER.git
   ```
2. 필요한 패키지를 설치합니다.
   ```bash
   npm install
   ```
3. 애플리케이션을 실행합니다.
   ```bash
   npm start
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

질문이나 문의 사항이 있으면, [issues](https://github.com/Jaemnie/NETRUNNER/issues) 섹션에 남겨주세요. 프로젝트에 대한 피드백과 기여는 언제나 환영입니다!
