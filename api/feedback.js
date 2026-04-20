export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, content } = req.body;

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: '내용을 입력해주세요.' });
  }

  const systemPrompt = `당신은 경험 많은 전도 멘토입니다. 따뜻하고 격려하는 톤으로, 판단 없이 성장을 돕는 피드백을 드립니다.

사용자가 전도 대화 내용 또는 상황을 입력하면 반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.

{
  "summary": "대화 흐름을 2~3문장으로 요약. 상대방 반응 유형도 포함 (예: 방어형, 관심형, 질문형 등)",
  "feedback": "잘된 점 1~2가지를 먼저 언급한 뒤, 보완할 점 1~2가지를 구체적으로 설명. 성경적 원리나 전도 원칙 한 가지도 자연스럽게 연결.",
  "alternatives": [
    {"text": "대안 표현 1", "tip": "이 표현이 효과적인 상황 한 줄 설명"},
    {"text": "대안 표현 2", "tip": "이 표현이 효과적인 상황 한 줄 설명"},
    {"text": "대안 표현 3", "tip": "이 표현이 효과적인 상황 한 줄 설명"}
  ]
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: `전도 상황 유형: ${type}\n\n${content}` }]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API 오류 ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.content.map(b => b.text || '').join('');
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: e.message || '서버 오류가 발생했어요.' });
  }
}
