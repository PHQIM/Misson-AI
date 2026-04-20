# 전도 피드백 AI — 배포 가이드

## 파일 구조

```
evangelism-feedback/
├── api/
│   └── feedback.js      ← 서버 코드 (API 키 여기서 관리)
├── public/
│   └── index.html       ← 화면 (사용자가 보는 페이지)
├── vercel.json          ← Vercel 설정
└── README.md
```

---

## 배포 방법 (단계별)

### 1단계 — GitHub 계정 만들기
- https://github.com 접속 → Sign up

### 2단계 — 새 저장소 만들기
1. 로그인 후 우측 상단 + 버튼 → "New repository"
2. Repository name: `evangelism-feedback`
3. Public 선택 → "Create repository" 클릭

### 3단계 — 파일 업로드
1. 만들어진 저장소 페이지에서 "uploading an existing file" 클릭
2. 이 폴더 안의 파일을 **폴더 구조 그대로** 드래그 앤 드롭
   - api/feedback.js
   - public/index.html
   - vercel.json
3. "Commit changes" 클릭

### 4단계 — Vercel 연결
1. https://vercel.com 접속 → GitHub 계정으로 로그인
2. "Add New Project" → GitHub 저장소 `evangelism-feedback` 선택
3. "Deploy" 클릭 (설정 건드리지 말고 그냥)

### 5단계 — API 키 등록 (가장 중요!)
1. Vercel 대시보드 → 내 프로젝트 클릭
2. 상단 "Settings" 탭 → 왼쪽 "Environment Variables"
3. 아래처럼 입력:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (Anthropic Console에서 복사한 API 키)
4. "Save" 클릭
5. 상단 "Deployments" 탭 → 최근 배포 오른쪽 "..." → "Redeploy"

### 6단계 — 완료!
- Vercel이 제공하는 주소 (예: `evangelism-feedback.vercel.app`)로 접속
- 이 주소를 팀원들과 공유하면 됩니다

---

## API 키 발급 방법
1. https://console.anthropic.com 접속
2. 로그인 → 왼쪽 "API Keys" → "Create Key"
3. 이름 입력 후 키 복사 (한 번만 보여요, 꼭 복사!)

---

## 비용 안내
- Vercel 호스팅: 무료
- Claude API: 사용량에 따라 과금 (요청 1건당 약 $0.003 수준)
