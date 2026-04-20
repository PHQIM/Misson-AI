# 전도 피드백 AI (Gemini 무료 버전)

## 파일 구조
```
evangelism-feedback-gemini/
├── api/
│   └── feedback.js      ← 서버 코드
├── public/
│   └── index.html       ← 화면
├── vercel.json
└── README.md
```

---

## Gemini API 키 발급 (무료)

1. https://aistudio.google.com 접속
2. Google 계정으로 로그인
3. 왼쪽 메뉴 "Get API key" 클릭
4. "Create API key" → 키 복사

무료 한도: 하루 1,500건 요청 (소규모 팀엔 충분)

---

## 배포 방법

### 1단계 — GitHub 저장소 만들기
- github.com → 로그인 → 우측 상단 + → New repository
- 이름: evangelism-feedback → Create repository

### 2단계 — 파일 업로드
- 저장소 페이지에서 "uploading an existing file" 클릭
- 이 폴더 파일들을 폴더 구조 그대로 드래그 앤 드롭
- "Commit changes" 클릭

### 3단계 — Vercel 연결
- vercel.com → GitHub 로그인
- "Add New Project" → evangelism-feedback 선택
- "Deploy" 클릭

### 4단계 — API 키 등록
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
- Name: GEMINI_API_KEY
- Value: (발급받은 Gemini API 키 붙여넣기)
- Save → Deployments 탭 → Redeploy

### 5단계 — 완료!
- 제공된 주소(예: evangelism-feedback.vercel.app)를 팀원들과 공유

---

## 비용
- GitHub: 무료
- Vercel: 무료
- Gemini API: 무료 (하루 1,500건 한도)
