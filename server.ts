import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Initialize Gemini API client on the server (Environment variable only, no hardcoded keys)
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // 1. Encouragement API (틀렸을 때 따뜻하고 유쾌하게 격려하는 메시지)
  app.post('/api/ai/cheer', async (req, res) => {
    const fallbacks = [
      '괜찮아요! 실수는 성공의 어머니! 다음엔 맞출 수 있어요! 🌟',
      '아쉽지만 좋은 시도였어요! 카드의 위치를 잘 기억해봐요! ✨',
      '아직 카드가 많이 남아있어요! 침착하게 다음 짝을 찾아봐요! 💪',
      '틀려도 감점은 없으니까 안심해요! 파이팅! 🚀',
      '조금만 더 집중하면 금방 짝을 찾을 수 있어요! 힘내요! 🍀',
    ];
    const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];

    if (!ai) {
      return res.json({ message: randomFallback });
    }

    try {
      const { word1, word2, topic } = req.body;

      const prompt = `당신은 충청북도 제천 금성초등학교 6학년 학생들의 친절하고 신나는 영어 카드 게임 마스코트 로봇 '스마트 버디(Smart Buddy)'입니다.
학생이 카드 뒤집기 게임(주제: ${topic || '영어'})에서 두 장의 카드(${word1?.en || ''} / ${word2?.en || ''})를 열었는데 짝이 맞지 않았습니다.
학생에게 힘을 불어넣고 격려하는 따뜻하고 신나는 한국어 메시지(1~2문장, 이모지 1~2개 포함)를 작성해주세요. 절대 비난하거나 복잡하게 말하지 말고, 6학년 눈높이에 맞춰 유쾌하게 응원해주세요.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const message = response.text?.trim() || randomFallback;
      res.json({ message });
    } catch (err: unknown) {
      console.error('Error in /api/ai/cheer:', err);
      res.json({ message: randomFallback });
    }
  });

  // 2. Hint API (아직 맞추지 못한 단어에 대한 수수께끼/단서 힌트)
  app.post('/api/ai/hint', async (req, res) => {
    const fallbackHint = '💡 힌트: 카드 판의 모서리나 중앙에 아직 열리지 않은 영어 스펠링과 그림을 매칭해 보세요! 파이팅!';

    if (!ai) {
      return res.json({ hint: fallbackHint });
    }

    try {
      const { unmatchedWords, topic } = req.body;

      const wordListStr = Array.isArray(unmatchedWords)
        ? unmatchedWords.map((w: { en: string; ko: string }) => `${w.en} (${w.ko})`).join(', ')
        : '';

      const prompt = `당신은 충청북도 제천 금성초등학교 6학년 영어 단어 도우미 챗봇입니다.
현재 주제는 '${topic || '영어'}'입니다. 아직 맞추지 못한 단어 목록: [${wordListStr}]
위 목록 중 단어 하나를 무작위로 골라, 학생들이 정답 카드를 유추할 수 있도록 재치 있는 힌트 1개를 한국어로 제공해주세요.
규칙:
1. 정답 철자를 직접 다 알려주지 마세요.
2. 예: "첫 글자가 'G'로 시작하고 키가 아주 큰 아프리카 동물이에요! 🦒" 또는 "여름에 시원하게 먹는 초록색 줄무늬 과일이에요!" 처럼 첫 글자 힌트나 특징을 알려주세요.
3. 6학년이 이해하기 쉬운 다정하고 재미있는 말투(1~2문장)로 써주세요.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const hint = response.text?.trim() || fallbackHint;
      res.json({ hint });
    } catch (err: unknown) {
      console.error('Error in /api/ai/hint:', err);
      res.json({ hint: fallbackHint });
    }
  });

  // 3. Interactive Chat API (학생과 챗봇의 자유 대화 & 단어 질문)
  app.post('/api/ai/chat', async (req, res) => {
    const fallbackReply = '멋져요! 지금 아주 잘하고 있어요! 포기하지 말고 다음 짝을 맞춰봐요! 🌟';

    if (!ai) {
      return res.json({ reply: fallbackReply });
    }

    try {
      const { message, history, topic } = req.body;

      const systemInstruction = `당신은 충청북도 제천 금성초등학교 6학년 학생들을 위한 귀엽고 친절한 영어 튜터 챗봇 '버디(Buddy)'입니다.
현재 학생들은 '${topic || '영어 단어'}' 카드 뒤집기 게임을 즐기고 있습니다.
- 학생이 단어 뜻, 철자, 발음, 힌트, 응원을 물어보면 항상 친절하고 밝고 신나게 대답해줍니다.
- 답변은 초등학교 6학년의 이해도에 맞춰 짧고 명확하게(2~3문장 이내) 작성합니다.
- 학생이 영어로 물어보면 영어와 한국어를 친절하게 섞어서 설명해줍니다.`;

      const chat = ai.chats.create({
        model: 'gemini-3.8-flash',
        config: {
          systemInstruction,
        },
      });

      // Send recent history if available
      if (Array.isArray(history)) {
        for (const item of history.slice(-4)) {
          if (item.role === 'user') {
            await chat.sendMessage({ message: item.text });
          }
        }
      }

      const response = await chat.sendMessage({
        message: message || '안녕! 힌트나 응원이 필요해!',
      });

      const reply = response.text?.trim() || fallbackReply;
      res.json({ reply });
    } catch (err: unknown) {
      console.error('Error in /api/ai/chat:', err);
      res.json({ reply: fallbackReply });
    }
  });

  // ================= 4. LEADERBOARD API =================
  interface LeaderboardRecord {
    id: string;
    name: string;
    school: string;
    grade: string;
    score: number;
    timeBonus: number;
    remainingSeconds: number;
    elapsedSeconds: number;
    maxCombo: number;
    topic: string;
    createdAt: string;
  }

  // Pre-seeded classroom friendly rankings for 금성초등학교 6학년
  const leaderboardRecords: LeaderboardRecord[] = [
    {
      id: 'seed-1',
      name: '김민준',
      school: '금성초등학교',
      grade: '6학년 1반',
      score: 235,
      timeBonus: 85,
      remainingSeconds: 85,
      elapsedSeconds: 95,
      maxCombo: 5,
      topic: 'animals',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'seed-2',
      name: '이지우',
      school: '금성초등학교',
      grade: '6학년 1반',
      score: 210,
      timeBonus: 60,
      remainingSeconds: 60,
      elapsedSeconds: 120,
      maxCombo: 4,
      topic: 'fruits',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'seed-3',
      name: '박서윤',
      school: '금성초등학교',
      grade: '6학년 2반',
      score: 195,
      timeBonus: 45,
      remainingSeconds: 45,
      elapsedSeconds: 135,
      maxCombo: 3,
      topic: 'colors',
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
    {
      id: 'seed-4',
      name: '정현우',
      school: '금성초등학교',
      grade: '6학년 1반',
      score: 180,
      timeBonus: 40,
      remainingSeconds: 40,
      elapsedSeconds: 140,
      maxCombo: 3,
      topic: 'animals',
      createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    },
  ];

  // GET /api/leaderboard (with optional ?topic filter)
  app.get('/api/leaderboard', (req, res) => {
    const topicFilter = req.query.topic as string | undefined;

    let filtered = [...leaderboardRecords];
    if (topicFilter && topicFilter !== 'all') {
      filtered = filtered.filter((r) => r.topic === topicFilter);
    }

    // Sort by score desc, then elapsedSeconds asc (faster is better)
    filtered.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.elapsedSeconds - b.elapsedSeconds;
    });

    res.json({
      leaderboard: filtered.slice(0, 50),
      totalCount: filtered.length,
    });
  });

  // POST /api/leaderboard (register score)
  app.post('/api/leaderboard', (req, res) => {
    try {
      const {
        name,
        school,
        grade,
        score,
        timeBonus,
        remainingSeconds,
        elapsedSeconds,
        maxCombo,
        topic,
      } = req.body;

      const newEntry: LeaderboardRecord = {
        id: `rank-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: (name || '익명 학생').trim().slice(0, 15),
        school: (school || '금성초등학교').trim().slice(0, 20),
        grade: (grade || '6학년 1반').trim().slice(0, 15),
        score: Number(score) || 0,
        timeBonus: Number(timeBonus) || 0,
        remainingSeconds: Number(remainingSeconds) || 0,
        elapsedSeconds: Number(elapsedSeconds) || 0,
        maxCombo: Number(maxCombo) || 0,
        topic: topic || 'animals',
        createdAt: new Date().toISOString(),
      };

      leaderboardRecords.push(newEntry);

      // Sort entire list
      leaderboardRecords.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.elapsedSeconds - b.elapsedSeconds;
      });

      // Find rank of newly added entry
      const rank = leaderboardRecords.findIndex((r) => r.id === newEntry.id) + 1;

      res.json({
        success: true,
        rank,
        entry: newEntry,
        leaderboard: leaderboardRecords.slice(0, 50),
      });
    } catch (err) {
      console.error('Error adding score to leaderboard:', err);
      res.status(500).json({ error: 'Failed to register score' });
    }
  });

  // Dev mode: Mount Vite middleware
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve built static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
