# NETRUNNER

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 소개

**NETRUNNER**는 웹 기반 해킹 시뮬레이션 게임으로, 사용자가 해킹의 기본 개념과 기법을 체험할 수 있는 환경을 제공합니다. 이 프로젝트는 해킹의 복잡하고 다양한 개념을 게임 형식으로 단순화하여 사용자에게 흥미롭고 교육적인 경험을 제공합니다.

게임 내에서 사용자는 다양한 해킹 도구를 사용해 시스템에 침입하거나 방어하며, 이를 통해 네트워크 보안, 암호 해제, 정보 수집 등의 해킹 기법을 배우고 익힐 수 있습니다. 교육적인 목적과 엔터테인먼트를 조화롭게 결합한 이 게임은 IT 보안과 해킹에 관심 있는 사람들뿐만 아니라 일반 사용자도 쉽게 접근할 수 있도록 설계되었습니다.

## 주요 기능

- **🛠 해킹 시뮬레이션**
  - 다양한 해킹 도구와 기술을 사용해 실제 시뮬레이션 환경을 경험.

- **🔐 네트워크 보안 체험**
  - 방어 기술 및 침입 기법을 학습할 수 있는 실습형 콘텐츠 제공.

- **🎮 미니게임 형식의 해킹 미션**
  - 다양한 퍼즐과 미션을 통해 재미있고 창의적인 문제 해결.

## 스크린샷

![스크린샷](https://i.imgur.com/tlv0pTY.png)

---

## 설치 방법

### 1️⃣ 저장소 클론하기

```bash
git clone https://github.com/Jaemnie/NETRUNNER.git
```

### 2️⃣ 프로젝트 디렉터리 이동

```bash
cd NETRUNNER
```

### 3️⃣ 의존성 설치

```bash
npm install
```

### 4️⃣ 애플리케이션 실행

```bash
npm start
```

애플리케이션은 **http://localhost:3000**에서 실행됩니다.

---

## 코드 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📜mainbgm.mp3
 ┃ ┣ 📜tuto.png
 ┃ ┣ 📜wallpaper.jpg
 ┃ ┗ 📜Worm.jsx
 ┣ 📂components
 ┃ ┣ 📂Background
 ┃ ┃ ┣ 📜AudioContext.js
 ┃ ┃ ┗ 📜BackgroundMusic.js
 ┃ ┣ 📂Directory
 ┃ ┃ ┗ 📜DirectoryViewer.jsx
 ┃ ┣ 📂MainPageComp
 ┃ ┃ ┗ 📜MainPageComp.jsx
 ┃ ┗ 📂Terminal
 ┃ ┃ ┗ 📜TerminalInteraction.jsx
 ┣ 📂pages
 ┃ ┗ 📜MainPage.jsx
 ┣ 📂services
 ┃ ┗ 📜AuthService.jsx
 ┣ 📂socket
 ┃ ┗ 📜socket.jsx
 ┣ 📜App.js
 ┣ 📜index.css
 ┗ 📜index.js
```

---

## 사용된 라이브러리

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## 기술 스택

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## GitHub 통계

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=Jaemnie&show_icons=true&theme=radical)

---

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

---

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

---

## 작성자

- [JAEMNI](https://github.com/Jaemnie)
- [LEESBEOM](https://github.com/LEESBEOM)
- [JSH9298](https://github.com/jsh9298)
- [yoonsangha](https://github.com/yoonsangha)

---

## 문의

질문이나 문의 사항이 있으면, [issues](https://github.com/Jaemnie/NETRUNNER/issues) 섹션에 남겨주세요.
