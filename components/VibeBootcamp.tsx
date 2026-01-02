import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface VibeBootcampProps {
  onBack: () => void;
  onPagesChange?: (pages: number) => void;
}

const CONSULT_LINK = 'https://forms.gle/BBfLfsDWmWbPiTLb8';

const conceptAxes = {
  ja: [
    {
      label: '一、言葉',
      title: 'テキストは「入口の空気」を決める',
      body: 'AI時代だからこそ、いちばん“自分らしさ”が滲むのは言葉。どんなテンションで話す人なのか。何にモヤっとして、何にワクっとするのか。そこが言語化されていないと、AIは「それっぽいけど、自分じゃない」文章を返し続けます。まずは、あなたの声がちゃんと聞こえる言葉に整えます。'
    },
    {
      label: '二、文脈',
      title: 'コンテクストが、カードの強さを決める',
      body: '誰に向けて、何を伝えて、どこへ誘導したいのか。実績やリンクを並べるだけだと、入口は弱いまま。あなたの今のフェーズに合わせて構成と導線を整理し、AIに渡せる「自己紹介の設計図」としてドキュメント化していきます。'
    },
    {
      label: '三、世界観',
      title: '一枚に、世界を宿す',
      body: '色・余白・質感・言葉づかい。小さな選択の積み重ねが“あなたっぽさ”になります。世界観のキーワード／色／モチーフ／NGラインを整理して、見る人が迷わず「この人だ」と感じる、カードの佇まいをつくります。'
    },
    {
      label: '四、運用',
      title: '公開 → 反応 → 更新 → また公開',
      body: 'クラウド名刺は、作って終わりじゃない。出して、反応を見て、少し直して、また出す。そのループが回り始めたとき、カードは資産になります。更新の手順とテンプレまで整えて、「育てられる状態」にしていきます。'
    }
  ],
  en: [
    {
      label: 'I. Words',
      title: 'Text sets the air at the entrance',
      body: 'In the AI era, what leaks through most is your words. Your tone, what bothers you, what excites you. If that isn’t articulated, AI will keep producing “sounds right but isn’t me” copy. We start by shaping words where your voice is clearly heard.'
    },
    {
      label: 'II. Context',
      title: 'Context defines the strength of the card',
      body: 'Who is it for, what should it communicate, and where should it lead? Just listing achievements and links keeps the entry weak. We organize structure and flow for your current phase and document it as a “self-intro blueprint” you can hand to AI.'
    },
    {
      label: 'III. Worldview',
      title: 'Hold a world in a single card',
      body: 'Color, spacing, texture, wording. Small choices add up to “you.” We organize keywords, colors, motifs, and no-go lines so viewers feel, “Yes, this is them,” at a glance.'
    },
    {
      label: 'IV. Operations',
      title: 'Publish → respond → update → publish again',
      body: 'A cloud card isn’t finished when you make it. You put it out, see reactions, tweak it, and publish again. When that loop starts, the card becomes an asset. We prepare the update steps and templates so it’s a “growable” state.'
    }
  ]
} as const;

const audienceList = {
  ja: [
    'Webサイトほど大げさじゃない入口がほしい',
    '名刺QRの先で、ちゃんとした自己紹介に繋げたい',
    'AIに書かせるほど、文章が自分から離れる感じがする',
    '発信やプロフィールが毎回ブレる',
    'やりたいことはあるのに、入口が整っていない',
    '一人で作り続けるのに少し疲れてきた',
    'ゆるいテンションだけど、中身は本気で整えたい'
  ],
  en: [
    'Want an entry that isn’t as heavy as a full website',
    'Want the business-card QR to lead to a proper introduction',
    'AI-written text feels like it drifts away from you',
    'Your messaging or profile keeps shifting',
    'You know what you want to do, but the entry isn’t set',
    'You’re getting a bit tired of building alone',
    'Your vibe is chill, but you want the substance to be solid'
  ]
} as const;

const steps = {
  ja: [
    {
      number: '一',
      name: 'Card Planning',
      title: '入口と導線の設計',
      items: [
        '「好き」「違和感」「大事にしたいもの」の棚卸し',
        '誰に何を伝えるカードにするかを言語化',
        '構成（見出し・順序・リンク・CTA）を設計',
        '今のフェーズに合った“小さめのゴール”を決める'
      ]
    },
    {
      number: '二',
      name: 'Card Writing',
      title: '自己紹介と言葉のテンプレ',
      items: [
        '一行キャッチ／プロフィール／実績文をAIとペアで作成',
        'トーン＆ボイス（話し方・書き方）の基準を決める',
        'SNSやnoteにも転用できる「自分用テンプレ」をつくる',
        'AIに推敲させるためのプロンプト設計'
      ]
    },
    {
      number: '三',
      name: 'World Direction',
      title: '世界観ガイドの作成',
      items: [
        '色／質感／モチーフ／余白の方向性を整理',
        '写真やビジュアルのトーンを揃えるルールづくり',
        '載せる要素の“足す／引く”の基準を決める',
        '今後の発信にも横展開できる土台にする'
      ]
    },
    {
      number: '四',
      name: 'Launch & Update',
      title: '公開して、育てる準備',
      items: [
        'クラウド名刺ページへ落とし込み（Notion / Webなど）',
        '名刺用QRの導線を整える',
        '更新しやすい運用形（項目・手順・頻度）を設計',
        '公開後の次の一手まで一緒に決める'
      ]
    }
  ],
  en: [
    {
      number: 'I',
      name: 'Card Planning',
      title: 'Design the entry and flow',
      items: [
        'Inventory your likes, frictions, and what you value',
        'Define who it’s for and what it should communicate',
        'Design structure (headings, order, links, CTA)',
        'Set a small goal that fits your current phase'
      ]
    },
    {
      number: 'II',
      name: 'Card Writing',
      title: 'Self-intro & wording templates',
      items: [
        'Create one-line catch, profile, and achievements with AI',
        'Define tone & voice (speaking/writing)',
        'Build personal templates reusable for SNS or note',
        'Design prompts for AI polishing'
      ]
    },
    {
      number: 'III',
      name: 'World Direction',
      title: 'Create a worldview guide',
      items: [
        'Define direction for color/texture/motif/spacing',
        'Rules to align photo and visual tone',
        'Decide add/remove criteria for elements',
        'Build a base that scales to future publishing'
      ]
    },
    {
      number: 'IV',
      name: 'Launch & Update',
      title: 'Prepare to publish and grow',
      items: [
        'Implement into the cloud card page (Notion/Web, etc.)',
        'Set up the business card QR flow',
        'Design an update-friendly operation (items, steps, cadence)',
        'Decide the next move after launch together'
      ]
    }
  ]
} as const;

const outputs = {
  ja: [
    '世界観が伝わるクラウド名刺ページ（URL）',
    '名刺用QR導線（貼るだけで使える状態）',
    '自己紹介テンプレ（短文／長文／用途別）',
    '更新マニュアル（迷わない手順）',
    '世界観ミニガイド（色・言葉・NGライン）'
  ],
  en: [
    'A cloud business card page (URL) that conveys your worldview',
    'Business card QR flow (ready to use)',
    'Self-intro templates (short/long/by use)',
    'Update manual (clear steps)',
    'Mini worldview guide (colors, wording, no-go lines)'
  ]
} as const;

const plans = {
  ja: [
    {
      label: '壱ノ型',
      title: '単発セッション（お試し）',
      price: '¥22,000（税別）',
      subprices: [],
      items: [
        'オンライン 90分',
        '入口の棚卸し＋その場でAIと1〜2アウトプット',
        'セッション後：要点メモ（簡易）共有'
      ]
    },
    {
      label: '弐ノ型',
      title: '1ヶ月ミニ伴走（おすすめ）',
      price: '',
      subprices: [
        '月2回（ライト）：¥72,000（税別）',
        '月3回（標準・おすすめ）：¥98,000（税別）',
        '月4回（集中）：¥128,000（税別）'
      ],
      items: [
        '軽めチャット伴走（返信目安あり）',
        'クラウド名刺（またはプロフィール）を「1つ公開」まで伴走',
        '世界観ガイド v1（Notion/Docの叩き台）を一緒に完成'
      ]
    },
    {
      label: '参ノ型',
      title: '法人・チーム向け Brand Card 導入（3ヶ月〜）',
      price: '¥480,000〜（税別・要見積）',
      subprices: [
        '（標準パッケージ例：¥780,000〜）'
      ],
      items: [
        '会社／事業の“名刺QRの着地点”を統一（営業・採用・広報でブレない）',
        'トーン＆コピーのガイドライン化（社内共有用）',
        '更新フロー（誰が／何を／いつ）まで設計'
      ]
    }
  ],
  en: [
    {
      label: 'Type I',
      title: 'Single Session (Trial)',
      price: '¥22,000 (excl. tax)',
      subprices: [],
      items: [
        'Online 90 minutes',
        'Entry inventory + 1–2 outputs with AI on the spot',
        'After session: share a brief summary memo'
      ]
    },
    {
      label: 'Type II',
      title: '1-Month Mini Support (Recommended)',
      price: '',
      subprices: [
        '2 sessions/month (Light): ¥72,000 (excl. tax)',
        '3 sessions/month (Standard/Recommended): ¥98,000 (excl. tax)',
        '4 sessions/month (Intensive): ¥128,000 (excl. tax)'
      ],
      items: [
        'Light chat support (response guidelines)',
        'Support until you publish one cloud card (or profile)',
        'Complete Worldview Guide v1 together (Notion/Doc draft)'
      ]
    },
    {
      label: 'Type III',
      title: 'Brand Card for Teams (3+ months)',
      price: 'From ¥480,000 (excl. tax, quote required)',
      subprices: [
        '(Typical package from ¥780,000)'
      ],
      items: [
        'Unify the business-card QR destination across sales/recruiting/PR',
        'Create tone & copy guidelines for internal sharing',
        'Design update workflow (who/what/when)'
      ]
    }
  ]
} as const;

const bootcampStyles = `
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Shippori+Mincho:wght@400;500;600;700;800&family=Zen+Old+Mincho&display=swap');

.vibe-bootcamp-page {
  --color-sky-dawn: #e8ddd4;
  --color-sky-mist: #d4cfc8;
  --color-mountain-far: #8b9a8e;
  --color-mountain-mid: #5a6b5e;
  --color-mountain-near: #3d4a3f;
  --color-forest-deep: #2a3429;
  --color-forest-floor: #1a201a;
  --color-water: #7a9b9e;
  --color-moss: #6b7a5e;
  --color-stone: #8a8a82;
  --color-bark: #4a3f35;
  --color-snow: #f5f3f0;
  --color-gold-light: #d4b896;
  --color-vermillion: #c85a44;
  --color-ink: #1a1a18;
  --color-paper: #f7f4ef;
  --color-paper-aged: #ebe6dc;
  --color-text-primary: #2a2a28;
  --color-text-secondary: #5a5a55;
  --color-text-muted: #8a8a82;
  --color-text-light: #f5f3f0;
  --font-jp: 'Zen Kaku Gothic New', sans-serif;
  --font-jp-mincho: 'Shippori Mincho', serif;
  --font-jp-old: 'Zen Old Mincho', serif;
  font-family: var(--font-jp);
  background: var(--color-paper);
  color: var(--color-text-primary);
  line-height: 2;
  letter-spacing: 0.05em;
  position: relative;
  overflow-x: hidden;
}

.vibe-bootcamp-page *,
.vibe-bootcamp-page *::before,
.vibe-bootcamp-page *::after {
  box-sizing: border-box;
}

.vibe-bootcamp-page h1,
.vibe-bootcamp-page h2,
.vibe-bootcamp-page h3,
.vibe-bootcamp-page h4,
.vibe-bootcamp-page p,
.vibe-bootcamp-page ul {
  margin: 0;
  padding: 0;
}

.vibe-bootcamp-page ul {
  list-style: none;
}

.vibe-bootcamp-page ::selection {
  background: var(--color-mountain-mid);
  color: var(--color-snow);
}

.vibe-bootcamp-page .washi-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

.vibe-bootcamp-page .bootcamp-back {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 20;
  border: 1px solid rgba(90, 107, 94, 0.4);
  background: rgba(247, 244, 239, 0.8);
  color: var(--color-mountain-mid);
  font-family: var(--font-jp-mincho);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: all 0.4s ease;
}

.vibe-bootcamp-page .bootcamp-back:hover {
  background: var(--color-mountain-mid);
  color: var(--color-snow);
}

.vibe-bootcamp-page .main-content {
  position: relative;
  z-index: 1;
}

.vibe-bootcamp-page section {
  padding: 10rem 2rem;
  position: relative;
}

.vibe-bootcamp-page .section-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.vibe-bootcamp-page .section-header {
  text-align: center;
  margin-bottom: 6rem;
}

.vibe-bootcamp-page .section-number {
  font-family: var(--font-jp-old);
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  color: var(--color-moss);
  margin-bottom: 1.5rem;
  display: block;
}

.vibe-bootcamp-page .section-title {
  font-family: var(--font-jp-old);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: 0.15em;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .section-subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

.vibe-bootcamp-page .plan-note {
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

.vibe-bootcamp-page .decorative-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 4rem auto;
}

.vibe-bootcamp-page .decorative-line::before,
.vibe-bootcamp-page .decorative-line::after {
  content: '';
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-stone), transparent);
}

.vibe-bootcamp-page .decorative-line .diamond {
  width: 6px;
  height: 6px;
  background: var(--color-moss);
  transform: rotate(45deg);
}

.vibe-bootcamp-page .hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--color-sky-dawn) 0%, var(--color-sky-mist) 30%, var(--color-paper) 100%);
}

.vibe-bootcamp-page .mountain-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.vibe-bootcamp-page .mountain-far { opacity: 0.4; }
.vibe-bootcamp-page .mountain-mid { opacity: 0.6; }
.vibe-bootcamp-page .mountain-near { opacity: 0.8; }

.vibe-bootcamp-page .mist {
  position: absolute;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(212, 207, 200, 0.6) 25%, rgba(212, 207, 200, 0.8) 50%, rgba(212, 207, 200, 0.6) 75%, transparent 100%);
  animation: mistMove 30s linear infinite;
}

.vibe-bootcamp-page .mist-1 {
  bottom: 20%;
  opacity: 0.5;
  animation-duration: 35s;
}

.vibe-bootcamp-page .mist-2 {
  bottom: 30%;
  opacity: 0.3;
  animation-duration: 45s;
  animation-direction: reverse;
}

@keyframes mistMove {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

.vibe-bootcamp-page .hero-content {
  position: relative;
  z-index: 5;
  text-align: center;
  max-width: 900px;
}

.vibe-bootcamp-page .hero-keywords {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 3rem;
  font-family: var(--font-jp-mincho);
  font-size: 0.8rem;
  letter-spacing: 0.4em;
  color: var(--color-text-secondary);
  flex-wrap: wrap;
}

.vibe-bootcamp-page .hero-keywords span::after {
  content: '・';
  margin-left: 2rem;
  opacity: 0.5;
}

.vibe-bootcamp-page .hero-keywords span:last-child::after { display: none; }

.vibe-bootcamp-page .hero-tagline {
  font-family: var(--font-jp-old);
  font-size: clamp(1.4rem, 3.5vw, 2.4rem);
  font-weight: 400;
  line-height: 2.2;
  margin-bottom: 2.5rem;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .hero-tagline .highlight {
  color: var(--color-vermillion);
  font-weight: 500;
}

.vibe-bootcamp-page .hero-title-wrapper { margin-bottom: 1.5rem; }

.vibe-bootcamp-page .hero-title {
  font-family: var(--font-jp-old);
  font-size: clamp(2.2rem, 7vw, 4.5rem);
  font-weight: 400;
  letter-spacing: 0.2em;
  color: var(--color-text-primary);
  position: relative;
  display: inline-block;
}

.vibe-bootcamp-page .hero-title::before,
.vibe-bootcamp-page .hero-title::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-mountain-mid), transparent);
}

.vibe-bootcamp-page .hero-title::before { right: calc(100% + 2rem); }
.vibe-bootcamp-page .hero-title::after { left: calc(100% + 2rem); }

.vibe-bootcamp-page .hero-subtitle {
  font-family: var(--font-jp-mincho);
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
  margin-bottom: 3rem;
}

.vibe-bootcamp-page .hero-description {
  max-width: 600px;
  margin: 0 auto 4rem;
}

.vibe-bootcamp-page .hero-description p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 2.2;
}

.vibe-bootcamp-page .hero-cta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.vibe-bootcamp-page .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 3rem;
  border: 1px solid var(--color-mountain-mid);
  background: transparent;
  color: var(--color-mountain-mid);
  font-family: var(--font-jp-mincho);
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}

.vibe-bootcamp-page .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-mountain-mid);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: -1;
}

.vibe-bootcamp-page .btn:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.vibe-bootcamp-page .btn:hover {
  color: var(--color-snow);
  border-color: var(--color-mountain-mid);
}

.vibe-bootcamp-page .btn-secondary {
  border-color: var(--color-text-muted);
  color: var(--color-text-muted);
}

.vibe-bootcamp-page .btn-secondary::before { background: var(--color-text-muted); }

.vibe-bootcamp-page .scroll-indicator {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.vibe-bootcamp-page .scroll-indicator span {
  font-family: var(--font-jp-mincho);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
  writing-mode: vertical-rl;
}

.vibe-bootcamp-page .scroll-line {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, var(--color-mountain-mid), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.5; transform: scaleY(0.8); }
}

.vibe-bootcamp-page .about-section {
  background: var(--color-paper);
  position: relative;
}

.vibe-bootcamp-page .about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-stone), transparent);
}

.vibe-bootcamp-page .about-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

.vibe-bootcamp-page .about-text p {
  margin-bottom: 2rem;
  font-size: 1.05rem;
  line-height: 2.4;
  color: var(--color-text-secondary);
}

.vibe-bootcamp-page .about-list {
  padding: 3rem;
  background: linear-gradient(135deg, rgba(107, 122, 94, 0.05) 0%, rgba(107, 122, 94, 0.02) 100%);
  border-left: 2px solid var(--color-moss);
}

.vibe-bootcamp-page .about-list li {
  padding: 1rem 0;
  padding-left: 2rem;
  position: relative;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .about-list li::before {
  content: '〇';
  position: absolute;
  left: 0;
  color: var(--color-moss);
  font-size: 0.6rem;
  top: 1.3rem;
}

.vibe-bootcamp-page .concept-section {
  background: linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper-aged) 100%);
  position: relative;
  overflow: hidden;
}

.vibe-bootcamp-page .branch-decoration {
  position: absolute;
  top: 10%;
  right: -5%;
  width: 400px;
  height: 600px;
  opacity: 0.03;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 300 Q80 250 90 200 Q70 180 80 150 Q60 130 70 100 Q50 80 60 50 Q40 30 50 0' stroke='%232a3429' fill='none' stroke-width='2'/%3E%3Cpath d='M90 200 Q110 180 130 190' stroke='%232a3429' fill='none' stroke-width='1.5'/%3E%3Cpath d='M80 150 Q60 140 50 150' stroke='%232a3429' fill='none' stroke-width='1.5'/%3E%3Cpath d='M70 100 Q90 90 100 100' stroke='%232a3429' fill='none' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
}

.vibe-bootcamp-page .concept-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.vibe-bootcamp-page .concept-card {
  padding: 3rem 2.5rem;
  background: var(--color-paper);
  border: 1px solid rgba(138, 138, 130, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.vibe-bootcamp-page .concept-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--color-moss), var(--color-mountain-mid));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.vibe-bootcamp-page .concept-card:hover::before {
  transform: scaleX(1);
}

.vibe-bootcamp-page .concept-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(42, 52, 41, 0.1);
}

.vibe-bootcamp-page .concept-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.vibe-bootcamp-page .concept-number {
  font-family: var(--font-jp-old);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--color-moss);
  margin-bottom: 0.5rem;
}

.vibe-bootcamp-page .concept-title {
  font-family: var(--font-jp-old);
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .concept-description {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 2.2;
}

.vibe-bootcamp-page .target-section {
  background: var(--color-forest-deep);
  color: var(--color-text-light);
  position: relative;
  overflow: hidden;
}

.vibe-bootcamp-page .target-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse 100% 50% at 50% 100%, rgba(107, 122, 94, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.vibe-bootcamp-page .target-section .section-number { color: var(--color-gold-light); }
.vibe-bootcamp-page .target-section .section-title { color: var(--color-snow); }

.vibe-bootcamp-page .target-header-label {
  font-family: var(--font-jp-mincho);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--color-gold-light);
  margin-bottom: 3rem;
  text-align: center;
}

.vibe-bootcamp-page .target-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.vibe-bootcamp-page .target-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease;
}

.vibe-bootcamp-page .target-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(212, 184, 150, 0.3);
}

.vibe-bootcamp-page .target-icon {
  width: 8px;
  height: 8px;
  background: var(--color-gold-light);
  border-radius: 50%;
  margin-top: 0.7rem;
  flex-shrink: 0;
}

.vibe-bootcamp-page .target-text {
  font-size: 1rem;
  color: var(--color-sky-mist);
  line-height: 1.8;
}

.vibe-bootcamp-page .program-section { background: var(--color-paper); }

.vibe-bootcamp-page .program-list {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.vibe-bootcamp-page .program-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 4rem;
  align-items: start;
}

.vibe-bootcamp-page .program-number {
  font-family: var(--font-jp-old);
  font-size: 4rem;
  font-weight: 400;
  color: var(--color-moss);
  opacity: 0.3;
  line-height: 1;
}

.vibe-bootcamp-page .program-content h3 {
  font-family: var(--font-jp-mincho);
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  color: var(--color-moss);
  margin-bottom: 0.5rem;
}

.vibe-bootcamp-page .program-content h4 {
  font-family: var(--font-jp-old);
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .program-details {
  border-left: 1px solid var(--color-stone);
  padding-left: 2rem;
}

.vibe-bootcamp-page .program-details li {
  padding: 0.6rem 0;
  position: relative;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.9;
}

.vibe-bootcamp-page .program-details li::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 1.1rem;
  width: 6px;
  height: 6px;
  background: var(--color-moss);
  border-radius: 50%;
  transform: translateX(-50%);
}

.vibe-bootcamp-page .output-section {
  background: linear-gradient(180deg, var(--color-paper) 0%, var(--color-paper-aged) 100%);
}

.vibe-bootcamp-page .output-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
}

.vibe-bootcamp-page .output-item {
  padding: 1.2rem 2rem;
  background: var(--color-paper);
  border: 1px solid var(--color-stone);
  font-size: 0.9rem;
  font-family: var(--font-jp-mincho);
  color: var(--color-text-primary);
  transition: all 0.4s ease;
}

.vibe-bootcamp-page .output-item:hover {
  background: var(--color-mountain-mid);
  border-color: var(--color-mountain-mid);
  color: var(--color-snow);
}

.vibe-bootcamp-page .plan-section { background: var(--color-paper-aged); }

.vibe-bootcamp-page .plan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.vibe-bootcamp-page .plan-card {
  padding: 3rem 2.5rem;
  background: var(--color-paper);
  border: 1px solid rgba(138, 138, 130, 0.3);
  position: relative;
  transition: all 0.5s ease;
}

.vibe-bootcamp-page .plan-card:hover {
  border-color: var(--color-moss);
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(42, 52, 41, 0.08);
}

.vibe-bootcamp-page .plan-card.featured {
  border-color: var(--color-moss);
  border-width: 2px;
}

.vibe-bootcamp-page .plan-card.featured::before {
  content: 'おすすめ';
  position: absolute;
  top: -1px;
  right: 2rem;
  padding: 0.5rem 1.5rem;
  background: var(--color-moss);
  color: var(--color-snow);
  font-family: var(--font-jp-mincho);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}

html[lang="en"] .vibe-bootcamp-page .plan-card.featured::before {
  content: 'RECOMMENDED';
}

.vibe-bootcamp-page .plan-label {
  font-family: var(--font-jp-mincho);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--color-moss);
  margin-bottom: 0.5rem;
}

.vibe-bootcamp-page .plan-name {
  font-family: var(--font-jp-old);
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .plan-details {
  margin-bottom: 2rem;
}

.vibe-bootcamp-page .plan-details li {
  padding: 0.7rem 0;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  border-bottom: 1px solid rgba(138, 138, 130, 0.15);
  line-height: 1.8;
}

.vibe-bootcamp-page .plan-details li:last-child { border-bottom: none; }

.vibe-bootcamp-page .plan-price {
  font-family: var(--font-jp-mincho);
  font-size: 1rem;
  color: var(--color-mountain-mid);
  letter-spacing: 0.1em;
}

.vibe-bootcamp-page .plan-subprices {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 1px solid rgba(138, 138, 130, 0.2);
}

.vibe-bootcamp-page .plan-subprices li {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}


.vibe-bootcamp-page .boundary-section {
  background: var(--color-paper);
  border-top: 1px solid rgba(138, 138, 130, 0.2);
}

.vibe-bootcamp-page .boundary-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(107, 122, 94, 0.06) 0%, rgba(107, 122, 94, 0.02) 100%);
  border: 1px solid rgba(138, 138, 130, 0.25);
}

.vibe-bootcamp-page .boundary-label {
  font-family: var(--font-jp-mincho);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--color-moss);
  margin-bottom: 1rem;
  display: block;
}

.vibe-bootcamp-page .boundary-title {
  font-family: var(--font-jp-old);
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: 0.12em;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .boundary-subtitle {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
  line-height: 2;
}

.vibe-bootcamp-page .boundary-list li {
  padding: 0.9rem 0;
  padding-left: 2rem;
  position: relative;
  color: var(--color-text-secondary);
  border-bottom: 1px solid rgba(138, 138, 130, 0.2);
  line-height: 1.8;
}

.vibe-bootcamp-page .boundary-list li:last-child { border-bottom: none; }

.vibe-bootcamp-page .boundary-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-moss);
}

.vibe-bootcamp-page .naming-section {
  background: var(--color-paper);
  position: relative;
  overflow: hidden;
}

.vibe-bootcamp-page .naming-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(107, 122, 94, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.vibe-bootcamp-page .naming-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.vibe-bootcamp-page .naming-title {
  font-family: var(--font-jp-old);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  margin-bottom: 1rem;
  letter-spacing: 0.25em;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .naming-subtitle {
  font-family: var(--font-jp-mincho);
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
  margin-bottom: 4rem;
}

.vibe-bootcamp-page .naming-description {
  font-size: 1.1rem;
  line-height: 2.5;
  color: var(--color-text-secondary);
}

.vibe-bootcamp-page .naming-description p { margin-bottom: 2.5rem; }

.vibe-bootcamp-page .naming-emphasis {
  font-family: var(--font-jp-old);
  font-size: 1.2rem;
  color: var(--color-text-primary);
  font-weight: 400;
}

.vibe-bootcamp-page .naming-portrait {
  width: 220px;
  height: 220px;
  margin: 0 auto 2.5rem;
  padding: 0.6rem;
  border: 1px solid var(--color-stone);
  background: var(--color-paper);
}

.vibe-bootcamp-page .naming-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vibe-bootcamp-page .profile-section {
  background: linear-gradient(180deg, var(--color-paper) 0%, var(--color-sky-mist) 100%);
}

.vibe-bootcamp-page .profile-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 5rem;
  align-items: start;
}

.vibe-bootcamp-page .profile-image {
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--color-mountain-mid) 0%, var(--color-forest-deep) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.vibe-bootcamp-page .profile-image::before {
  content: '';
  position: absolute;
  inset: -10px;
  border: 1px solid var(--color-stone);
  pointer-events: none;
}

.vibe-bootcamp-page .profile-image-placeholder {
  font-family: var(--font-jp-mincho);
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  color: var(--color-snow);
  opacity: 0.7;
}

.vibe-bootcamp-page .profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vibe-bootcamp-page .profile-name {
  font-family: var(--font-jp-old);
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.vibe-bootcamp-page .profile-role {
  font-size: 0.9rem;
  color: var(--color-moss);
  margin-bottom: 2.5rem;
  letter-spacing: 0.1em;
}

.vibe-bootcamp-page .profile-bio {
  font-size: 1rem;
  line-height: 2.3;
  color: var(--color-text-secondary);
}

.vibe-bootcamp-page .profile-bio p { margin-bottom: 1.5rem; }

.vibe-bootcamp-page .final-cta-section {
  background: var(--color-forest-deep);
  color: var(--color-text-light);
  padding: 12rem 2rem;
  position: relative;
  overflow: hidden;
}

.vibe-bootcamp-page .final-cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(107, 122, 94, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(212, 184, 150, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.vibe-bootcamp-page .final-cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.vibe-bootcamp-page .final-cta-title {
  font-family: var(--font-jp-old);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  margin-bottom: 3rem;
  letter-spacing: 0.15em;
  color: var(--color-snow);
}

.vibe-bootcamp-page .final-cta-description {
  font-size: 1rem;
  color: var(--color-sky-mist);
  margin-bottom: 3rem;
  line-height: 2.3;
}

.vibe-bootcamp-page .final-cta-description p { margin-bottom: 1.5rem; }

.vibe-bootcamp-page .final-cta-list {
  margin-bottom: 4rem;
  text-align: left;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.vibe-bootcamp-page .final-cta-list li {
  padding: 1rem 0;
  padding-left: 2.5rem;
  position: relative;
  color: var(--color-sky-dawn);
  font-size: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.vibe-bootcamp-page .final-cta-list li:last-child { border-bottom: none; }

.vibe-bootcamp-page .final-cta-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-gold-light);
}

.vibe-bootcamp-page .final-cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
}

.vibe-bootcamp-page .final-cta-section .btn {
  border-color: var(--color-gold-light);
  color: var(--color-gold-light);
}

.vibe-bootcamp-page .final-cta-section .btn::before { background: var(--color-gold-light); }

.vibe-bootcamp-page .final-cta-section .btn:hover { color: var(--color-forest-deep); }

.vibe-bootcamp-page .final-cta-section .btn-secondary {
  border-color: rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.7);
}

.vibe-bootcamp-page .final-cta-section .btn-secondary::before {
  background: rgba(255, 255, 255, 0.2);
}

.vibe-bootcamp-page .final-cta-section .btn-secondary:hover {
  color: var(--color-snow);
}

.vibe-bootcamp-page footer {
  padding: 5rem 2rem;
  text-align: center;
  background: var(--color-ink);
  color: var(--color-text-light);
}

.vibe-bootcamp-page .footer-logo {
  font-family: var(--font-jp-old);
  font-size: 1.3rem;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  color: var(--color-sky-mist);
}

.vibe-bootcamp-page .footer-text {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.1em;
}

@media (max-width: 768px) {
  .vibe-bootcamp-page section { padding: 6rem 1.5rem; }
  .vibe-bootcamp-page .hero-title::before,
  .vibe-bootcamp-page .hero-title::after { display: none; }
  .vibe-bootcamp-page .concept-grid { grid-template-columns: 1fr; }
  .vibe-bootcamp-page .program-item { grid-template-columns: 1fr; gap: 1.5rem; }
  .vibe-bootcamp-page .profile-content { grid-template-columns: 1fr; gap: 3rem; }
}
`;

const conceptIcons = [
  (
    <svg className="concept-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" key="icon-1">
      <path d="M8 40 L8 8 L40 8" strokeLinecap="round" />
      <path d="M14 34 Q24 20 34 28" strokeLinecap="round" />
      <circle cx="14" cy="34" r="2" fill="currentColor" />
      <circle cx="34" cy="28" r="2" fill="currentColor" />
    </svg>
  ),
  (
    <svg className="concept-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" key="icon-2">
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="8" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <path d="M24 8 L24 4" />
      <path d="M24 44 L24 40" />
      <path d="M8 24 L4 24" />
      <path d="M44 24 L40 24" />
    </svg>
  ),
  (
    <svg className="concept-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" key="icon-3">
      <path d="M24 4 L24 44" />
      <path d="M12 16 Q24 8 36 16" />
      <path d="M8 28 Q24 18 40 28" />
      <path d="M4 40 Q24 28 44 40" />
    </svg>
  ),
  (
    <svg className="concept-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" key="icon-4">
      <path d="M8 24 Q16 16 24 24 Q32 32 40 24" />
      <path d="M8 32 Q16 24 24 32 Q32 40 40 32" />
      <path d="M8 16 Q16 8 24 16 Q32 24 40 16" />
      <circle cx="8" cy="24" r="2" fill="currentColor" />
      <circle cx="40" cy="24" r="2" fill="currentColor" />
    </svg>
  )
];

export const VibeBootcamp: React.FC<VibeBootcampProps> = ({ onBack, onPagesChange }) => {
  const contentRef = useRef<HTMLElement | null>(null);
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);
  const locale = isEnglish ? 'en' : 'ja';
  const localizedConceptAxes = conceptAxes[locale];
  const localizedAudienceList = audienceList[locale];
  const localizedSteps = steps[locale];
  const localizedOutputs = outputs[locale];
  const localizedPlans = plans[locale];
  const profileAltText = isEnglish
    ? 'Azumi Musuhi Vibe Card Studio profile'
    : '安曇むすひ Vibe Card Studio プロフィール';

  useEffect(() => {
    const scrollable = document.querySelector('[scrollable="true"]') || window;
    scrollable.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const updatePages = () => {
      const height = node.scrollHeight;
      const viewport = window.innerHeight || 1;
      const pages = Math.max(1, height / viewport);
      onPagesChange?.(pages);
    };

    updatePages();
    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(() => updatePages());
    }
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updatePages());
      resizeObserver.observe(node);
    }
    window.addEventListener('resize', updatePages);
    return () => {
      window.removeEventListener('resize', updatePages);
      resizeObserver?.disconnect();
      onPagesChange?.(0);
    };
  }, [language, onPagesChange]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main ref={contentRef} className="vibe-bootcamp-page">
      <style>{bootcampStyles}</style>
      <div className="washi-overlay" />
      <button className="bootcamp-back" onClick={onBack}>
        {getText('戻る', 'Back')}
      </button>

      <div className="main-content">
        <section className="hero">
          <svg className="mountain-layer mountain-far" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <path fill="#8b9a8e" d="M0,400 L0,280 Q180,200 360,250 Q540,180 720,220 Q900,160 1080,200 Q1260,150 1440,190 L1440,400 Z" />
          </svg>
          <svg className="mountain-layer mountain-mid" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <path fill="#5a6b5e" d="M0,400 L0,320 Q120,260 280,300 Q440,240 600,280 Q760,220 920,270 Q1080,210 1200,250 Q1320,200 1440,240 L1440,400 Z" />
          </svg>
          <svg className="mountain-layer mountain-near" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <path fill="#3d4a3f" d="M0,400 L0,350 Q200,300 400,340 Q600,290 800,330 Q1000,280 1200,320 Q1350,290 1440,310 L1440,400 Z" />
          </svg>

          <div className="mist mist-1" />
          <div className="mist mist-2" />

          <div className="hero-content">
            <div className="hero-keywords">
              <span>{getText('言葉', 'Words')}</span>
              <span>{getText('文脈', 'Context')}</span>
              <span>{getText('世界観', 'Worldview')}</span>
              <span>{getText('運用', 'Operations')}</span>
            </div>

            <p className="hero-tagline">
              {getText(
                <>
                  「好き」と「違和感」を、<br />
                  ちゃんと入口のカードとして<span className="highlight">かたち</span>にする。
                </>,
                <>
                  Turn your “likes” and “frictions”<br />
                  into a real entry card with <span className="highlight">shape</span>.
                </>
              )}
            </p>

            <div className="hero-title-wrapper">
              <h1 className="hero-title">{getText('安曇むすひ', 'Azumi Musuhi')}</h1>
            </div>

            <p className="hero-subtitle">Vibe Card Studio ｜ AI × Writing × Direction</p>

            <div className="hero-description">
              <p>
                {getText(
                  <>
                    ただ作れる人から、<br />
                    “自分の入口を、更新して育てられる人”へ。
                  </>,
                  <>
                    From someone who can just make,<br />
                    to someone who can update and grow their own entry.
                  </>
                )}
              </p>
            </div>

            <div className="hero-cta">
              <a href={CONSULT_LINK} className="btn" target="_blank" rel="noopener noreferrer">
                {getText('まずはゆるく相談してみる', 'Start with a casual consult')}
              </a>
              <button type="button" className="btn btn-secondary" onClick={() => scrollToSection('about')}>
                {getText('Vibe Card Studioについて知る', 'Learn about Vibe Card Studio')}
              </button>
            </div>
          </div>

          <div className="scroll-indicator">
            <span>{getText('巻物', 'Scroll')}</span>
            <div className="scroll-line" />
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-number">{getText('壱', 'I')}</span>
              <h2 className="section-title">
                {getText('これは、どんなサービス？', 'What is this service?')}
              </h2>
            </div>

            <div className="about-content">
              <div className="about-text">
                <p>
                  {getText(
                    '安曇むすひ Vibe Card Studio は、ガチガチの制作代行でも、テンプレ量産でもなく、あなたのペースと世界観に合わせて、AI × 文章 × ディレクションで「名刺QRの着地点」になる一枚を一緒に整える、伴走型の場です。',
                    'Azumi Musuhi Vibe Card Studio is not rigid outsourcing or template mass production. It’s a companion-style place to shape a “business card QR landing page” together with AI × writing × direction, aligned with your pace and worldview.'
                  )}
                </p>
                <p>
                  {getText(
                    '名刺を渡したあとに残るのは、紙じゃなくて“入口”。その入口が、ちゃんと伝わって、ちゃんと更新できる。そこまでを、いっしょに作ります。',
                    'After handing out a card, what remains is not paper but the “entry.” We build it so it communicates clearly and can be updated properly—together.'
                  )}
                </p>
              </div>

              <ul className="about-list">
                <li>{getText('名刺を配っても「結局なにしてる人？」で終わらせたくない人', 'Don’t want handing out cards to end with “So… what do you do?”')}</li>
                <li>{getText('SNSやリンクが散らかっていて、入口が弱いと感じている人', 'Feel your entry is weak because SNS and links are scattered')}</li>
                <li>{getText('自分の言葉とトーンで、ちゃんと紹介できる場所がほしい人', 'Want a place to introduce yourself in your own words and tone')}</li>
                <li>{getText('最終的に「自分で更新できる」状態にしたい人', 'Want to end up able to update it yourself')}</li>
              </ul>
            </div>

            <div className="decorative-line">
              <div className="diamond" />
            </div>
          </div>
        </section>

        <section className="concept-section">
          <div className="branch-decoration" />
          <div className="section-inner">
            <div className="section-header">
              <span className="section-number">{getText('弐', 'II')}</span>
              <h2 className="section-title">{getText('四つの軸', 'Four Axes')}</h2>
            </div>

            <div className="concept-grid">
              {localizedConceptAxes.map((axis, index) => (
                <div className="concept-card" key={axis.title}>
                  {conceptIcons[index]}
                  <div className="concept-number">{axis.label}</div>
                  <h3 className="concept-title">{axis.title}</h3>
                  <p className="concept-description">{axis.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="target-section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-number">{getText('参', 'III')}</span>
              <h2 className="section-title">{getText('こんな人に向いています', 'This is for people who…')}</h2>
              <p className="target-header-label">
                {getText('クリエイター向け / 少人数チーム向け', 'For Creators / For Small Teams')}
              </p>
            </div>

            <div className="target-list">
              {localizedAudienceList.map((item) => (
                <div className="target-item" key={item}>
                  <div className="target-icon" />
                  <span className="target-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="program-section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-number">{getText('肆', 'IV')}</span>
              <h2 className="section-title">{getText('ここで一緒にやること', 'What We Do Together')}</h2>
            </div>

            <div className="program-list">
              {localizedSteps.map((step) => (
                <div className="program-item" key={step.name}>
                  <div className="program-number-wrapper">
                    <div className="program-number">{step.number}</div>
                  </div>
                  <div className="program-content">
                    <h3>{step.name}</h3>
                    <h4>{step.title}</h4>
                    <ul className="program-details">
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="output-section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-number">{getText('伍', 'V')}</span>
              <h2 className="section-title">{getText('アウトプットのイメージ', 'Outputs You’ll Get')}</h2>
            </div>

            <div className="output-grid">
              {localizedOutputs.map((item) => (
                <div className="output-item" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="plan-section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-number">{getText('陸', 'VI')}</span>
              <h2 className="section-title">{getText('プラン', 'Plans')}</h2>
              <p className="section-subtitle">
                {getText('あなたのペースと目的に合わせて選べます', 'Choose based on your pace and goals')}
              </p>
              <p className="plan-note">
                {getText(
                  '迷ったら弐ノ型。公開して、更新できる状態まで整う“いちばん効く1ヶ月”。',
                  'If you’re unsure, choose Type II. The most effective one month to publish and reach an updatable state.'
                )}
              </p>
            </div>

            <div className="plan-grid">
              {localizedPlans.map((plan, index) => (
                <div className={`plan-card ${index === 1 ? 'featured' : ''}`} key={plan.title}>
                  <div className="plan-label">{plan.label}</div>
                  <h3 className="plan-name">{plan.title}</h3>
                  <ul className="plan-details">
                    {plan.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {plan.price && <div className="plan-price">{plan.price}</div>}
                  {plan.subprices && plan.subprices.length > 0 && (
                    <ul className="plan-subprices">
                      {plan.subprices.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="boundary-section">
          <div className="section-inner">
            <div className="boundary-card">
              <span className="boundary-label">{getText('（ご案内）', '(Note)')}</span>
              <h2 className="boundary-title">
                {getText('スムーズに進めるための進行ルール', 'Process guidelines for smooth progress')}
              </h2>
              <p className="boundary-subtitle">
                {getText(
                  'お互いに気持ちよく進めるために、あらかじめ共有しておきたい内容です。',
                  'To move forward comfortably together, here’s what we share in advance.'
                )}
              </p>
              <ul className="boundary-list">
                <li>
                  {getText(
                    'ヒアリングは「初回＋必要に応じて追加」ではなく、各月の回数内で完結します',
                    'Hearings are completed within the monthly session count, not “first + as-needed extras.”'
                  )}
                </li>
                <li>
                  {getText('アウトプットの修正は 2往復まで（以降はオプション対応）', 'Revisions up to two rounds (additional rounds are optional)')}
                </li>
                <li>
                  {getText(
                    'チャットは「軽め」の伴走です。即レス保証ではなく、返信目安を明記します',
                    'Chat support is light; no instant replies, with response guidelines.'
                  )}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="naming-section">
          <div className="section-inner">
            <div className="naming-content">
              <h2 className="naming-title">{getText('安曇むすひ', 'Azumi Musuhi')}</h2>
              <p className="naming-subtitle">Azumi Musubi</p>

              <div className="decorative-line">
                <div className="diamond" />
              </div>

              <div className="naming-portrait">
                <img
                  src={`${import.meta.env.BASE_URL}images/azumi-bootcamp-profile.png`}
                  alt={profileAltText}
                />
              </div>

              <div className="naming-description">
                <p>
                  {getText(
                    <>
                      「安曇むすひ」という名前には、<br />
                      まだ“あわい”にあるものを、静かに結び、形にしていく。<br />
                      そんなイメージを込めています。
                    </>,
                    <>
                      The name “Azumi Musuhi” carries an image of quietly tying together<br />
                      things still in-between and giving them form.<br />
                    </>
                  )}
                </p>
                <p>
                  {getText(
                    <>
                      頭の中にあるだけのアイデアや、ノートの片隅のことばたちを、<br />
                      AIという相棒と一緒に、入口の一枚へと、むすび直していく。
                    </>,
                    <>
                      Ideas only in your head or words in the corner of a notebook—<br />
                      together with AI as a partner, we re-tie them into a single entry card.
                    </>
                  )}
                </p>
                <p className="naming-emphasis">
                  {getText(
                    <>
                      名刺は小さい。<br />
                      でも、入口が整うと、世界はちゃんと広がる。<br />
                      名前も、世界観も、ここから一緒にアップデートしていけたらうれしい。
                    </>,
                    <>
                      A business card is small.<br />
                      But when the entry is aligned, the world opens up.<br />
                      I’d be happy to update your name and worldview from here, together.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
