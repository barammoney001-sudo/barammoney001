# 🏫 금성초 6학년 영어 단어 카드 뒤집기 게임 (English Word Memory Match)

> **충청북도 제천 금성초등학교 6학년 학생들을 위한 네온 아케이드 스타일의 스마트 영단어 기억력 게임**  
> 태블릿 기반의 직관적인 터치 조작, 실시간 발음 청취, Gemini AI 도우미 챗봇, 일일 미션과 Firebase 실시간 명예의 전당 랭킹을 제공합니다.

---

## 📌 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| **앱 이름** | 금성초 6학년 영어 단어 카드 게임 (English Word Memory Match) |
| **학교** | 충청북도 제천 금성초등학교 |
| **대상** | 초등학교 6학년 학생 (1인 1태블릿 환경 최적화) |
| **핵심 목표** | 영단어 철자(Spelling)와 의미(그림·한글 뜻)를 직관적으로 연결하고 원어민 발음을 반복 청취하여 자연스럽게 체득 |
| **핵심 재미** | 3D 카드 뒤집기 기억력 게임 + 3분 타임어택 + 연속 콤보 보너스 + AI 도우미 + 실시간 명예의 전당 순위 경쟁 |

---

## 🌟 2. 주요 기능 및 특징

### 🎮 1) 네온 아케이드 3D 카드 판 및 반응형 레이아웃
- **단어 카드 vs 그림 카드 분리 매칭**:
  - **단어 카드 (하늘색)**: 대문자 영단어 철자만 표기 (`GIRAFFE`, `WATERMELON` 등 긴 단어도 카드 한 줄에 자동 반응형 폰트 축소 적용).
  - **그림 카드 (노란색)**: 귀여운 이모지/색상원 + 한글 뜻 표기 (`🦒 기린`, `🟣 보라색`, 금·은색 빛 반사 메탈릭 그라데이션).
- **무작위 셔플 & 3D Flip 애니메이션**: 주제별 12단어 중 10단어(총 20장)를 무작위 추출하여 약 0.4초 입체 회전 뒤집기 연출.
- **태블릿 무스크롤(Zero-Scroll) 화면**:
  - 가로(Landscape): 5열 × 4행 / 세로(Portrait): 4열 × 5행
  - 화면 확대 및 스크롤을 방지하고 최소 64px 이상의 큼직한 터치 영역 확보.

### 🔊 2) 풍부한 사운드 및 다국어 교차 음성 합성 (Web Audio & Speech API)
- **👏 Web Audio API 기반 박수 소리 합성**: 외부 음원 파일 없이 브라우저 노이즈 버퍼를 실시간 변조하여 "짝짝" 박수 소리 구현.
- **교차 발음 학습 (English ⇄ Korean)**:
  - 짝을 맞추면 `박수 2회 👏` ➔ `🇺🇸 영어 (rate 0.85)` ➔ `🇰🇷 한글 (rate 0.9)` ➔ `🇺🇸 영어` ➔ `🇰🇷 한글` 순으로 또박또박 재생.
  - 게임 진행 중 논블로킹(Non-blocking) 재생으로 흐름을 끊지 않음.
- **효과음**: 카드 뒤집기 톡 소리, 오답 시 뿅(Boing) 사운드, 승리 시 축하 팡파르 화음 합성.

### ⭐ 3) 점수 및 연속 정답(Combo) 보너스
- **정답 매칭**: 기본 +10점 획득 (카드 위에 `+10` 떠오르는 플로팅 점수 연출).
- **연속 콤보 보너스**:
  - 2연속: +15점 (+5 보너스)
  - 3연속: +20점 (+10 보너스)
  - 4연속 이상: +25점 (+15 보너스)
  - 연속 정답 시 화면 중앙에 `🔥 COMBO ×3! +10` 네온 배너 연출.
- **타임어택 보너스**: 3분 제한 시간 중 남은 시간 1초당 +1점 추가 가산.
- **오답 시 패널티 없음**: 학생들의 사기 저하를 막기 위해 감점 없이 콤보만 리셋.

### 🤖 4) Gemini 3.8 Flash 기반 AI 영어 버디 (도우미 챗봇)
- **오답 시 자동 격려 (Auto-Cheer)**:
  - 카드가 틀렸을 때 우측 하단 AI 로봇 마스코트가 통통 튀는 말풍선으로 유쾌하고 따뜻한 응원 메시지 자동 출력 및 음성 낭독.
- **💡 수수께끼 힌트 생성**:
  - 정답을 직접 알려주지 않고, 아직 맞추지 못한 단어들의 첫 글자나 특징(예: *"목이 아주 길고 아프리카에 사는 동물이에요! 🦒"*)을 단서로 제공.
- **자유 대화 & 단어 질문**:
  - 학생이 단어 뜻, 철자, 발음 등을 챗봇에게 직접 물어보고 실시간 답변 청취 가능.

### 🎯 5) 일일 미션 & 수집형 명예 배지 보관함
- **매일 갱신되는 3대 일일 미션**:
  1. 🎯 단어 탐험가 (1회 클리어)
  2. 🔥 콤보 마스터 (3연속 콤보 달성)
  3. 🌟 오늘의 추천 주제 탐구 (동물/과일/색깔 중 추천 주제 클리어)
- **7종의 수집형 명예 배지**:
  - 🥉 첫 걸음 배지, 🐾 동물 탐험가, 🍎 과일 챔피언, 🎨 컬러 아티스트, 🔥 콤보의 제왕, ⚡ 번개 기억력, 👑 일일 챔피언
  - 배지 획득 시 황금빛 네온 축하 모달과 팡파르 연출, 배지 터치 시 TTS 설명 낭독.

### 🏆 6) Firebase Firestore 기반 실시간 명예의 전당 & 회원가입
- **초등학생 눈높이 초간편 계정**: 복잡한 이메일 없이 **닉네임**과 **비밀번호**만으로 즉시 가입/로그인 (SHA-256 단방향 암호화 보안).
- **실시간 명예의 전당 (Leaderboard)**:
  - 게임 종료 후 **[내 점수 랭킹에 등록하기]** 버튼으로 Firestore `scores` 컬렉션에 실시간 저장.
  - 시작 화면 및 결과 화면에서 **1위(황금 왕관), 2위, 3위 포디움 시상대** 및 전체 순위 확인.
  - `전체` / `🐾 동물` / `🍎 과일` / `🎨 색깔` 별 필터링 지원, 내 점수는 네온 하이라이트 표시.

---

## 📚 3. 수록 단어 데이터 (초등학교 6학년 수준)

### 🐾 Animals (동물 - 12단어)
| 영어 철자 | 한글 뜻 | 이모지 |
|---|---|---|
| `GIRAFFE` | 기린 | 🦒 |
| `ZEBRA` | 얼룩말 | 🦓 |
| `KANGAROO` | 캥거루 | 🦘 |
| `PENGUIN` | 펭귄 | 🐧 |
| `DOLPHIN` | 돌고래 | 🐬 |
| `OCTOPUS` | 문어 | 🐙 |
| `TURTLE` | 거북 | 🐢 |
| `SQUIRREL` | 다람쥐 | 🐿️ |
| `OWL` | 부엉이 | 🦉 |
| `BUTTERFLY` | 나비 | 🦋 |
| `CROCODILE` | 악어 | 🐊 |
| `CAMEL` | 낙타 | 🐫 |

### 🍎 Fruits (과일 - 12단어)
| 영어 철자 | 한글 뜻 | 이모지 |
|---|---|---|
| `WATERMELON` | 수박 | 🍉 |
| `PINEAPPLE` | 파인애플 | 🍍 |
| `STRAWBERRY` | 딸기 | 🍓 |
| `BLUEBERRY` | 블루베리 | 🫐 |
| `CHERRY` | 체리 | 🍒 |
| `KIWI` | 키위 | 🥝 |
| `MANGO` | 망고 | 🥭 |
| `PEACH` | 복숭아 | 🍑 |
| `PEAR` | 배 | 🍐 |
| `COCONUT` | 코코넛 | 🥥 |
| `LEMON` | 레몬 | 🍋 |
| `GRAPE` | 포도 | 🍇 |

### 🎨 Colors (색깔 - 12단어)
| 영어 철자 | 한글 뜻 | 색상 표현 |
|---|---|---|
| `RED` | 빨간색 | 🔴 `#FF3B3B` |
| `ORANGE` | 주황색 | 🟠 `#FF8C1A` |
| `YELLOW` | 노란색 | 🟡 `#FFD600` |
| `GREEN` | 초록색 | 🟢 `#27AE60` |
| `BLUE` | 파란색 | 🔵 `#2F80ED` |
| `NAVY` | 남색 | 🟣 `#1B2A6B` |
| `PURPLE` | 보라색 | 🟣 `#9B51E0` |
| `PINK` | 분홍색 | 🌸 `#FF7EB6` |
| `BROWN` | 갈색 | 🟤 `#8B5A2B` |
| `GRAY` | 회색 | ⚪ `#9E9E9E` (테두리 포함) |
| `GOLD` | 금색 | ✨ 메탈릭 황금 반사 그라데이션 |
| `SILVER` | 은색 | 🛡️ 메탈릭 실버 반사 그라데이션 |

---

## 🛠️ 4. 기술 스택 및 구조

- **Frontend**:
  - React 19 + TypeScript
  - Tailwind CSS v4 (네온 텍스트 글로우, 박스 섀도우, 3D 카드 플립 시스템)
  - Google Fonts: 영문 `Fredoka`, 국문 `Jua`
  - Lucide React 아이콘
- **Backend / Server**:
  - Node.js + Express (Full-stack API Proxy)
  - `@google/genai` SDK (`gemini-3.8-flash` 연동)
- **Database & Auth**:
  - Google Cloud Firestore (`firebase` v12)
  - Custom Nickname + SHA-256 Password Hash Student Auth
  - Strict `firestore.rules` 보안 규칙 및 `firebase-blueprint.json`
- **Audio**:
  - Web Audio API (노이즈 버퍼 DSP 합성 박수 소리 및 오실레이터 효과음)
  - Web Speech API (`SpeechSynthesisUtterance`)

---

## 📁 5. 프로젝트 디렉토리 구조

```
├── firebase-applet-config.json # Firebase 프로젝트 연결 설정
├── firebase-blueprint.json    # Firestore 엔티티 및 스키마 청사진
├── firestore.rules            # Firestore 보안 규칙 (학생 계정 및 순위표)
├── server.ts                  # Express 풀스택 백엔드 (Gemini AI API 프록시)
├── src/
│   ├── components/
│   │   ├── AiChatbot.tsx          # Gemini AI 영어 버디 챗봇 & 오답 자동 격려 말풍선
│   │   ├── BackgroundStars.tsx    # 우주 네온 네뷸라 및 반짝이는 별 배경
│   │   ├── BadgeUnlockedModal.tsx # 배지 획득 축하 모달
│   │   ├── CardView.tsx           # 3D 뒤집기 카드 컴포넌트 (단어/그림 분리)
│   │   ├── ConfettiCanvas.tsx     # 게임 승리 시 네온 색종이 폭죽 캔버스
│   │   ├── DailyMissionModal.tsx  # 일일 미션 및 배지 보관함 모달
│   │   ├── GameScreen.tsx         # 20장 카드 판, 타이머, 콤보, 점수 관리 게임 보드
│   │   ├── LeaderboardModal.tsx   # Firebase 기반 실시간 명예의 전당 랭킹 모달
│   │   ├── ResultScreen.tsx       # 승리/시간초과 결과 화면, 복습표, 점수 등록 배너
│   │   ├── StartScreen.tsx        # 학교 네온 배지, 시작 버튼, 랭킹 및 계정 바로가기
│   │   ├── StudentAuthModal.tsx   # 닉네임+비밀번호 회원가입/로그인 모달
│   │   └── TopicSelectScreen.tsx  # 동물/과일/색깔 3대 주제 선택 화면
│   ├── data/
│   │   ├── missionsAndBadges.ts   # 일일 미션 템플릿 및 7종 배지 카탈로그
│   │   └── words.ts               # 6학년 동물/과일/색깔 단어 데이터 및 셔플 알고리즘
│   ├── lib/
│   │   └── firebase.ts            # Firebase App 및 Firestore 클라이언트 초기화
│   ├── services/
│   │   └── studentAuthService.ts  # 학생 회원가입, 로그인, 점수 등록 및 랭킹 조회 서비스
│   ├── types/
│   │   ├── mission.ts             # 미션 및 배지 타입 정의
│   │   └── ranking.ts             # 학생 프로필 및 순위표 엔트리 타입 정의
│   ├── utils/
│   │   ├── audio.ts               # Web Audio API 박수/효과음 합성 및 TTS 음성 제어
│   │   ├── missionStorage.ts      # 일일 미션 진행률 및 배지 로컬 저장소 동기화
│   │   └── profileStorage.ts      # 학생 기본 프로필 로컬 저장소
│   ├── App.tsx                    # 화면 라우터 및 상태 통합 관리
│   ├── index.css                  # 커스텀 폰트, 3D 플립, 네온 글로우 스타일
│   └── main.tsx                   # React 진입점
├── package.json
└── tsconfig.json
```

---

## 🚀 6. 실행 및 배포 가이드

### 🔐 환경 변수 설정 (보안 관리)
GitHub 업로드 시 보안을 위해 실제 API 키나 개인 자격증명은 소스코드에 하드코딩되지 않고 `.env` 환경 변수와 예시 템플릿으로 분리되어 있습니다.

1. **Gemini API 키 설정**:
   `.env.example`을 복사하여 `.env` 파일을 생성하고 발급받은 Gemini API 키를 입력합니다.
   ```bash
   cp .env.example .env
   # .env 파일 내 GEMINI_API_KEY="본인의_API_키" 입력
   ```
   *(키가 없더라도 기본 격려/힌트 문구와 함께 게임은 정상 동작합니다.)*

2. **Firebase 연동 설정**:
   `firebase-applet-config.example.json`을 복사하여 `firebase-applet-config.json`을 구성하고 본인의 Firebase 프로젝트 설정을 입력합니다.
   ```bash
   cp firebase-applet-config.example.json firebase-applet-config.json
   ```

### 개발 환경 실행
```bash
# 의존성 설치
npm install

# 풀스택 개발 서버 실행 (Port 3000)
npm run dev
```

### 프로덕션 빌드
```bash
# 프로덕션 빌드
npm run build

# 서버 실행
npm start
```

---

## 🛡️ 7. GitHub 업로드 전 보안 체크리스트
- [x] **하드코딩된 API Key 제거**: Gemini API 키는 `server.ts`의 `process.env.GEMINI_API_KEY`로 격리
- [x] **.gitignore 보호**: `.env`, `.env.local`, `node_modules/`, `dist/` 등 자동 제외 처리
- [x] **비밀번호 암호화**: 학생 비밀번호는 Web Crypto SHA-256 단방향 해시로 암호화 후 Firestore 저장
- [x] **템플릿 제공**: `.env.example`, `firebase-applet-config.example.json` 구비

---

## 👩‍🏫 8. 수업 활용 팁 (선생님용)
1. **QR 코드 배부**: 학급 학생들의 태블릿으로 배포된 웹 URL의 QR 코드를 스캔하여 접속합니다.
2. **닉네임 등록**: 수업 시작 전 첫 화면에서 학생별 닉네임과 비밀번호를 정해 가입하도록 안내합니다.
3. **타임어택 챌린지**: 3분 동안 높은 콤보와 빠른 시간으로 클리어하여 **명예의 전당** 1위 포디움에 오르도록 유도합니다.
4. **복습표 청취**: 게임 종료 후 결과 화면의 단어 복습표에서 스피커 아이콘을 눌러 영어/한글 발음을 다시 확인하도록 지도합니다.

