import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useScroll } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { AboutDetail } from './AboutDetail';
import { useDetailView } from '../contexts/DetailViewContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LazyVideo, LazyImage } from './LazyVideo';
import { ServiceDetail } from './ServiceDetail';
import { VibeBootcamp } from './VibeBootcamp';

// Types for Project Data
type MediaType = 'video' | 'music' | 'mv' | 'web' | 'saas' | 'image' | 'event';
type Pillar = 'creative' | 'development' | 'offline';

// Individual Content Item (Child)
interface ContentItem {
  id: string;
  title: string;
  titleEn: string;
  type: MediaType; // Can be different from the parent category
  description: string;
  descriptionEn: string;
  link: string;
  date?: string;
  videoUrl?: string; // Local video URL for embedded playback
  imageUrl?: string; // Local image URL for thumbnail
  technologies?: string[]; // Technologies used for this specific item
}

// Project Collection (Parent)
interface ProjectCollection {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  pillar: Pillar;
  mainType: MediaType; // Determines the overall theme/visual
  description: string;
  descriptionEn: string;
  longDescription: string;
  longDescriptionEn: string;
  technologies: string[];
  year: string;
  items: ContentItem[]; // List of contents within this collection
}

// Mock Data with Hierarchical Structure
const projects: ProjectCollection[] = [
  {
    id: 'p1',
    title: 'AI Video Samples',
    titleEn: 'AI Video Samples',
    category: 'Generative Video Collection',
    categoryEn: 'Generative Video Collection',
    pillar: 'creative',
    mainType: 'video',
    description: '多数の動画生成AIモデルを使用し、生成結果の違いや組み合わせをテストした映像コレクション。',
    descriptionEn: 'A video collection testing differences and combinations across multiple generative video AI models.',
    longDescription: '多数の動画生成AIモデルを使用し、生成結果の違いや組み合わせをテストした映像コレクション。Veo3.1・Sora2・Hailuo・PixVerse・Vidu・Kling などを用い、ワークフローの検証を目的として制作しています。',
    longDescriptionEn: 'A video collection testing differences and combinations across multiple generative video AI models. Built to validate workflows using Veo 3.1, Sora 2, Hailuo, PixVerse, Vidu, Kling, and more.',
    technologies: ['Veo3.1', 'Sora2', 'Hailuo', 'PixVerse', 'Vidu', 'Kling'],
    year: '2024',
    items: [
      {
        id: 'v00',
        title: '猫たちの夜会',
        titleEn: "Cats' Night Soiree",
        type: 'video',
        description: '飼い主のいない夜、猫たちは密かに集会を開くらしい。🍊🌃\nこたつでぬくぬくしていたはずが、気づけば異次元のパーティーフロアへ…😺✨\nネオンが弾け、ダンスはキレッキレ😹',
        descriptionEn: 'On nights without their humans, the cats secretly gather. 🍊🌃\nThey were warming up in the kotatsu, and before they knew it—an otherworldly party floor. 😺✨\nNeon bursts and the dancing is razor-sharp. 😹',
        link: 'https://x.com/takamasa045/status/1992409112815276187',
        date: '2024.11',
        videoUrl: `${import.meta.env.BASE_URL}videos/neko-night-party.mp4`,
        technologies: ['Midjourney', 'NanobananaPro', 'Veo 3.1']
      },
      {
        id: 'v0',
        title: '芝犬ドギーダンス',
        titleEn: 'Shiba Doggy Dance',
        type: 'video',
        description: '久しぶりの芝犬ドギーダンス🐕🎶\nHailuo2.3はダンスがかなり良くなった😆\nMidjourneyとnanobananaで画像生成後にHailuoでi2v、Sunoで作った音に合わせて完成🎥',
        descriptionEn: 'Back with the Shiba doggy dance 🐕🎶\nHailuo 2.3 handles dance much better now 😆\nGenerated images with Midjourney and nanobanana, i2v in Hailuo, finished to music made with Suno 🎥',
        link: 'https://x.com/takamasa045/status/1988223314192724155',
        date: '2024.11',
        videoUrl: `${import.meta.env.BASE_URL}videos/shiba-doggy-dance.mp4`,
        technologies: ['Midjourney', 'nanobananapro', 'Hailuo 2.3', 'Suno']
      },
    ]
  },
  {
    id: 'p2',
    title: 'MV Collection',
    titleEn: 'MV Collection',
    category: 'AI Music Video',
    categoryEn: 'AI Music Video',
    pillar: 'creative',
    mainType: 'mv',
    description: 'Suno AIで生成した楽曲に、動画生成AIで映像を組み合わせたミュージックビデオコレクション。',
    descriptionEn: 'A music video collection combining Suno AI tracks with AI-generated visuals.',
    longDescription: 'Suno AIで生成した楽曲をベースに、Hailuo・Veo・Soraなどの動画生成AIで映像を制作。音と映像の両方をAIで生成し、編集・合成することで完成させたMV作品集です。',
    longDescriptionEn: 'Based on songs generated by Suno AI, visuals are created with video generation models like Hailuo, Veo, and Sora. Both audio and video are AI-generated, then edited and composited into finished MVs.',
    technologies: ['Suno AI', 'Hailuo', 'Veo', 'Sora', 'Premiere Pro'],
    year: '2024',
    items: [
      {
        id: 'm000',
        title: 'MVマルチショットジェネレーター',
        titleEn: 'MV Multi-Shot Generator',
        type: 'music',
        description: '自作アプリ「MVマルチショットジェネレーター」で実際にMVを制作🎬✨\nマルチカット画像をkamui codeのwan-v2で動画生成、リップシンクはSync、カット割り・編集はすべてRemotion。\nさらにThree.jsで3Dの星柄アニメーションを重ね、新しい領域に踏み込んだ一作🔥🌌',
        descriptionEn: 'Produced an MV with my own app “MV Multi-Shot Generator” 🎬✨\nGenerated video from multi-cut images using kamui code’s wan-v2, lipsync via Sync, and all cutting/editing in Remotion.\nLayered a 3D star-pattern animation in Three.js—stepping into new territory. 🔥🌌',
        link: 'https://x.com/takamasa045/status/1971568628773658907',
        date: '2025.09.26',
        videoUrl: `${import.meta.env.BASE_URL}videos/mv-multishot-generator.mp4`,
        technologies: ['kamui code', 'wan-v2', 'Sync', 'Remotion', 'Three.js']
      },
      {
        id: 'm00',
        title: 'ボス猿ハラスメント2',
        titleEn: 'Boss Monkey Harassment 2',
        type: 'music',
        description: '動画編集ソフトを一切使わずにRemotionだけで作り上げたMV。\n画像はMidjourneyで生成→i2vで動かし、音楽はSunoで友人のビート音源から曲化。\nリリックは現場の愚痴をGPTでテキスト化→再構成。\n編集はRemotion × Claude Code × codexでタイムライン制御、同期、演出を完結。\n"理不尽さ"を愚痴からリリックに変えて、音楽と映像で叩き返した一作🦫',
        descriptionEn: 'An MV made entirely in Remotion—no traditional video editor.\nImages generated in Midjourney → animated via i2v; music created in Suno from a friend’s beat.\nLyrics came from workplace gripes, turned into text by GPT and reworked.\nTimeline control, sync, and direction completed with Remotion × Claude Code × Codex.\nTurned “unfairness” into lyrics and struck back with music and visuals. 🦫',
        link: 'https://x.com/takamasa045/status/1960300333240062196',
        date: '2025.08',
        videoUrl: `${import.meta.env.BASE_URL}videos/boss-monkey-harassment2.mp4`,
        technologies: ['Midjourney', 'i2v', 'Suno', 'Remotion', 'Claude Code', 'codex']
      },
      {
        id: 'm0',
        title: '松本生成AIハッカソン MV',
        titleEn: 'Matsumoto GenAI Hackathon MV',
        type: 'music',
        description: 'ClaudeCode sonnet 4.5 × Remotion × Three.js で3DアニメーションMVを試作🎥✨\nsonnet 4.5、動作がサクサクでめちゃ快適だし頭も良い。探り探りでも1時間足らずで形にできちゃった🎬\n題材は、先日松本で大盛況だった生成AIハッカソンのイベントリリック😆🎤\n長野から世界へ🌏',
        descriptionEn: 'Prototype 3D animated MV with Claude Code Sonnet 4.5 × Remotion × Three.js 🎥✨\nSonnet 4.5 is fast and sharp—I got it into shape in under an hour even while exploring. 🎬\nTheme: lyrics from the GenAI hackathon that recently packed Matsumoto. 😆🎤\nFrom Nagano to the world. 🌏',
        link: 'https://x.com/takamasa045/status/1972791745080623556',
        date: '2025.09.30',
        videoUrl: `${import.meta.env.BASE_URL}videos/matsumoto-genai-mv.mp4`,
        technologies: ['Claude Code', 'Remotion', 'Three.js', 'Suno AI']
      },
      {
        id: 'm02',
        title: 'TextAliveでつくるリリックモーション',
        titleEn: 'Lyric Motion with TextAlive',
        type: 'music',
        description: 'TextAliveでつくるリリックモーション。編集はもちろんRemotion縛り。',
        descriptionEn: 'Lyric motion with TextAlive. Editing is, of course, all Remotion.',
        link: 'https://x.com/takamasa045/status/1966493897703702690',
        date: '2025.09',
        videoUrl: `${import.meta.env.BASE_URL}videos/textalive-lyric-motion.mp4`,
        technologies: ['TextAlive', 'Remotion']
      },
      {
        id: 'm01',
        title: 'プレイリスト（時は戻らない Cover）',
        titleEn: 'Playlist (Time Won’t Return Cover)',
        type: 'music',
        description: 'Midjourney でイメージ生成 → Nanobanana でカット画像生成 → Hailuo でi2v変換 → 編集 → Sync でリップシンク✨\n特にSyncが最高で、顔を自動認識してくれるから動画をそのまま丸投げできるのが便利すぎる！\nもちろん細かいツッコミどころはあるけど、そこも含めてご愛嬌☺️',
        descriptionEn: 'Generated concepts in Midjourney → cut images in Nanobanana → i2v in Hailuo → edit → lipsync with Sync ✨\nSync is especially great—auto face detection makes it absurdly easy to drop in footage.\nThere are tiny quirks, but that’s part of the charm ☺️',
        link: 'https://x.com/takamasa045/status/1970796919615287615',
        date: '2024.11',
        videoUrl: `${import.meta.env.BASE_URL}videos/playlist-cover-mv.mp4`,
        technologies: ['Midjourney', 'NanobananaPro', 'Hailuo', 'Sync']
      }
    ]
  },
  {
    id: 'p3',
    title: 'Musuhi Labs',
    titleEn: 'Musuhi Labs',
    category: 'Web & SaaS Prototypes',
    categoryEn: 'Web & SaaS Prototypes',
    pillar: 'development',
    mainType: 'saas',
    description: 'アニミズム思想をUI/UXに落とし込んだ、実験的アプリケーション開発の記録。',
    descriptionEn: 'Records of experimental app development that translates animist ideas into UI/UX.',
    longDescription: '「道具には魂が宿る」というアニミズムの思想をベースに、SaaS・MCPサーバー・Webアプリ・Webサイトなどのプロトタイプを次々と生み出す実験室。LLMエージェントから業務効率化ツール、データベース連携型のニッチなWebサービスまで、"実際に動かしながら考える"プロダクトを公開しています。',
    longDescriptionEn: 'A lab grounded in the animist idea that tools have spirits, rapidly producing prototypes of SaaS, MCP servers, web apps, and websites. From LLM agents to workflow automation tools and niche database-connected web services, I publish products built by thinking through real use.',
    technologies: ['React', 'LangChain', 'Gemini Pro', 'Three.js'],
    year: '2023-2024',
    items: [
      {
        id: 'w00',
        title: 'Remotion Studio Monorepo',
        titleEn: 'Remotion Studio Monorepo',
        type: 'web',
        description: 'Remotionで映像制作を加速させるモノレポを公開。\nテンプレをコピーするだけで新規プロジェクトを即スタート。Three.jsベースの3Dテンプレも同梱し、3DアニメーションMVや演出を即構築可能。\nアニメーション・デザイン・音声処理などを共通パッケージ化し、複数案件でも一貫した品質を担保。pnpmワークスペース&Gitサブモジュールで環境もすっきり。',
        descriptionEn: 'Published a monorepo to accelerate Remotion video production.\nCopy a template to start a new project instantly. Includes a Three.js-based 3D template for fast 3D animation MVs and effects.\nCommon packages for animation, design, and audio processing ensure consistent quality across projects. Clean setup with pnpm workspaces and Git submodules.',
        link: 'https://x.com/takamasa045/status/1973148052916699287',
        date: '2025.10.01',
        videoUrl: `${import.meta.env.BASE_URL}videos/remotion-studio-monorepo.mp4`,
        technologies: ['Remotion', 'Three.js', 'pnpm', 'Monorepo', 'CI/CD']
      },
      {
        id: 'w0',
        title: 'MV Multi-Shot Generator',
        titleEn: 'MV Multi-Shot Generator',
        type: 'web',
        description: 'MV制作でマルチカットに困った経験を解決するアプリ。\n写真アップロード＆アスペクト比選択 → リリック分析で楽曲の歌詞から最適なマルチカットを自動提案 → AIプロンプトを確認・編集して調整可能。\nnanobananapro連携でMV用マルチカット画像を高速生成。制作のスピードもクオリティも一気に上がります。',
        descriptionEn: 'An app that solves the pain of multi-cut shots in MV production.\nUpload photos & choose aspect ratio → analyze lyrics to auto-suggest the best multi-cut layout → review/edit AI prompts to refine.\nWith nanobananapro integration, it rapidly generates multi-cut images for MVs, boosting both speed and quality.',
        link: 'https://x.com/takamasa045/status/1971144667258589337',
        date: '2025.09.25',
        imageUrl: `${import.meta.env.BASE_URL}images/mv-multishot-generator-app.png`,
        technologies: ['You Ware', 'nanobananapro', 'AI駆動分析', 'リリック解析']
      },

    ]
  },
  {
    id: 'p4',
    title: 'Events & Community',
    titleEn: 'Events & Community',
    category: 'イベント・コミュニティ',
    categoryEn: 'Events & Community',
    pillar: 'offline',
    mainType: 'event',
    description: '生成AIハッカソンやワークショップなど、地域で開催するイベント活動の記録。',
    descriptionEn: 'Records of local events such as generative AI hackathons and workshops.',
    longDescription: `「つかう」から「つくる」へ。\n松本を中心に、生成AIプロトタイピングの体験イベントを月1ペースで開催しています（運営サポート）。\n\nプログラミング不要で、はじめての人でも“創る側”になれる。\nそんな入口を地域に増やすために、企画・進行・場づくりまで伴走しながら、学びと実践がつながるコミュニティづくりを目指しています。`,
    longDescriptionEn: `From “using” to “making”.\nBased in Matsumoto, we host monthly hands-on events for generative AI prototyping (operations support).\n\nNo programming required—first-timers can become makers.\nWe aim to build a community that connects learning and practice by co-creating planning, facilitation, and space.`,
    technologies: ['Manus', 'Claude', 'Remotion', 'ハッカソン'],
    year: '2025',
    items: [
      {
        id: 'e1',
        title: 'まつもと生成AIハッカソン with Manus',
        titleEn: 'Matsumoto GenAI Hackathon with Manus',
        type: 'event',
        description: '「またやりたい」第1回の参加者ほぼ全員がそう答えた、まつもと生成AIハッカソン。\nAIを"使う"から"つくる"へ。たった3時間で、アイデアがプロトタイプになる。\nコードが書けなくてもOK。Manus Proを使えば、誰でも"創る側"に。\n仲間と笑いながら、試しながら、ひらめきが形になっていく体験を。\n\n🗓11/30(日) 13:00–16:00\n📍SWEET WORK（松本）\n🎁 Manus Pro当日使い放題＋2,000クレジット',
        descriptionEn: 'Nearly everyone from the first event said “I want to do it again.” Matsumoto GenAI Hackathon.\nFrom using AI to making with AI. In just 3 hours, ideas become prototypes.\nNo coding required—Manus Pro lets anyone join the maker side.\nLaughing with peers, trying things, and watching sparks turn into form.\n\n🗓 11/30 (Sun) 13:00–16:00\n📍 SWEET WORK (Matsumoto)\n🎁 Manus Pro all-day access + 2,000 credits',
        link: 'https://x.com/takamasa045/status/1986742405391942026',
        date: '2025.11.07',
        imageUrl: `${import.meta.env.BASE_URL}images/matsumoto-ai-hackathon-manus.png`,
        technologies: ['Manus Pro', 'ハッカソン', '松本', 'SWEET WORK']
      },
      {
        id: 'e2',
        title: 'まつもと生成AIハッカソン Plus',
        titleEn: 'Matsumoto GenAI Hackathon Plus',
        type: 'event',
        description: '🚀 まつもと生成AIハッカソン Plus 開催します！\n11/9(日) 11:00〜 @サザンガク（松本）\n\nCodex / Claude Code / MCPで、アイデアを"その日"に形に！\n\n1日でMVPをつくる実践型イベント⚡\n\n参加無料・先着12名👇',
        descriptionEn: '🚀 Matsumoto GenAI Hackathon Plus is on!\n11/9 (Sun) 11:00– @Sazan Gaku (Matsumoto)\n\nBring ideas to life the same day with Codex / Claude Code / MCP!\n\nHands-on event to build an MVP in one day ⚡\n\nFree entry • limited to 12 people 👇',
        link: 'https://x.com/takamasa045/status/1985174469053428146',
        date: '2025.11.03',
        imageUrl: `${import.meta.env.BASE_URL}images/matsumoto-ai-hackathon-plus.jpeg`,
        technologies: ['Codex', 'Claude Code', 'MCP', 'ハッカソン', '松本', 'サザンガク']
      }
    ]
  }
];

const pillarOrder: Pillar[] = ['creative', 'development', 'offline'];

const pillarMeta: Record<Pillar, { labelJa: string; labelEn: string; descriptionJa: string; descriptionEn: string; accent: string; border: string; glow: string; orb: string; pattern: string; patternSize: string; patternOpacity: number; patternHoverOpacity: number; glowColor: string; }> = {
  creative: {
    labelJa: 'クリエイティブ',
    labelEn: 'Creative',
    descriptionJa: '映像・音楽・生成表現',
    descriptionEn: 'Film, music, generative expression',
    accent: 'text-emerald-300',
    border: 'border-emerald-500/30',
    glow: 'from-emerald-500/20 via-emerald-950/10 to-transparent',
    orb: 'bg-emerald-500/20',
    pattern: 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2764%27%20height%3D%2764%27%20viewBox%3D%270%200%2064%2064%27%3E%0A%3Cdefs%3E%0A%3Cpattern%20id%3D%27p%27%20width%3D%2732%27%20height%3D%2732%27%20patternUnits%3D%27userSpaceOnUse%27%3E%0A%3Cpath%20d%3D%27M16%200%20L32%208%20L32%2024%20L16%2032%20L0%2024%20L0%208%20Z%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.12%27%20stroke-width%3D%271%27%2F%3E%0A%3Cpath%20d%3D%27M16%200%20L16%2032%20M0%208%20L32%2024%20M32%208%20L0%2024%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.08%27%20stroke-width%3D%271%27%2F%3E%0A%3C%2Fpattern%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27url%28%23p%29%27%2F%3E%0A%3C%2Fsvg%3E',
    patternSize: '72px 72px',
    patternOpacity: 0.45,
    patternHoverOpacity: 0.75,
    glowColor: 'rgba(110, 231, 183, 0.35)'
  },
  development: {
    labelJa: '開発',
    labelEn: 'Development',
    descriptionJa: 'プロダクト・ツール・実験',
    descriptionEn: 'Products, tools, experiments',
    accent: 'text-cyan-300',
    border: 'border-cyan-500/30',
    glow: 'from-cyan-500/20 via-emerald-950/10 to-transparent',
    orb: 'bg-cyan-500/20',
    pattern: 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2764%27%20height%3D%2764%27%20viewBox%3D%270%200%2064%2064%27%3E%0A%3Cdefs%3E%0A%3Cpattern%20id%3D%27p%27%20width%3D%2764%27%20height%3D%2764%27%20patternUnits%3D%27userSpaceOnUse%27%3E%0A%3Cg%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-width%3D%271%27%3E%0A%3Ccircle%20cx%3D%270%27%20cy%3D%2764%27%20r%3D%2732%27%20stroke-opacity%3D%270.12%27%2F%3E%0A%3Ccircle%20cx%3D%2764%27%20cy%3D%2764%27%20r%3D%2732%27%20stroke-opacity%3D%270.12%27%2F%3E%0A%3Ccircle%20cx%3D%2732%27%20cy%3D%270%27%20r%3D%2732%27%20stroke-opacity%3D%270.12%27%2F%3E%0A%3Ccircle%20cx%3D%270%27%20cy%3D%2764%27%20r%3D%2716%27%20stroke-opacity%3D%270.08%27%2F%3E%0A%3Ccircle%20cx%3D%2764%27%20cy%3D%2764%27%20r%3D%2716%27%20stroke-opacity%3D%270.08%27%2F%3E%0A%3Ccircle%20cx%3D%2732%27%20cy%3D%270%27%20r%3D%2716%27%20stroke-opacity%3D%270.08%27%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fpattern%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27url%28%23p%29%27%2F%3E%0A%3C%2Fsvg%3E',
    patternSize: '96px 96px',
    patternOpacity: 0.4,
    patternHoverOpacity: 0.7,
    glowColor: 'rgba(34, 211, 238, 0.35)'
  },
  offline: {
    labelJa: 'オフライン',
    labelEn: 'Offline',
    descriptionJa: '地域・イベント・コミュニティ',
    descriptionEn: 'Local events and community',
    accent: 'text-amber-300',
    border: 'border-amber-500/30',
    glow: 'from-amber-500/20 via-emerald-950/10 to-transparent',
    orb: 'bg-amber-500/20',
    pattern: 'data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2764%27%20height%3D%2764%27%20viewBox%3D%270%200%2064%2064%27%3E%0A%3Cdefs%3E%0A%3Cpattern%20id%3D%27p%27%20width%3D%2732%27%20height%3D%2732%27%20patternUnits%3D%27userSpaceOnUse%27%3E%0A%3Ccircle%20cx%3D%2716%27%20cy%3D%2716%27%20r%3D%2714%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.12%27%20stroke-width%3D%271%27%2F%3E%0A%3Ccircle%20cx%3D%270%27%20cy%3D%2716%27%20r%3D%2714%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.08%27%20stroke-width%3D%271%27%2F%3E%0A%3Ccircle%20cx%3D%2732%27%20cy%3D%2716%27%20r%3D%2714%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.08%27%20stroke-width%3D%271%27%2F%3E%0A%3Ccircle%20cx%3D%2716%27%20cy%3D%270%27%20r%3D%2714%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.08%27%20stroke-width%3D%271%27%2F%3E%0A%3Ccircle%20cx%3D%2716%27%20cy%3D%2732%27%20r%3D%2714%27%20fill%3D%27none%27%20stroke%3D%27white%27%20stroke-opacity%3D%270.08%27%20stroke-width%3D%271%27%2F%3E%0A%3C%2Fpattern%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27url%28%23p%29%27%2F%3E%0A%3C%2Fsvg%3E',
    patternSize: '64px 64px',
    patternOpacity: 0.35,
    patternHoverOpacity: 0.65,
    glowColor: 'rgba(251, 191, 36, 0.35)'
  }
};

// Section Wrapper
const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`min-h-screen w-full flex flex-col justify-center p-8 md:p-20 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

// Lightweight animations for detail pages (snappy & fast)
const quickFade: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

const quickStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

interface OverlayProps {
  onDetailPagesChange?: (pages: number) => void;
  onPagesChange?: (pages: number) => void;
}

export const Overlay: React.FC<OverlayProps> = ({ onDetailPagesChange, onPagesChange }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAboutDetail, setShowAboutDetail] = useState(false);
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [showVibeBootcamp, setShowVibeBootcamp] = useState(false);
  const listScrollTopRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectGroups = pillarOrder.map((pillar) => ({
    pillar,
    projects: projects.filter((project) => project.pillar === pillar)
  }));
  const scroll = useScroll();
  const { setIsDetailOpen } = useDetailView();
  const { invalidate } = useThree();

  // Sync detail view state with context (controls 3D scene visibility)
  useEffect(() => {
    const isDetailActive = selectedProjectId !== null || showAboutDetail || showServiceDetail || showVibeBootcamp;
    setIsDetailOpen(isDetailActive);
  }, [selectedProjectId, showAboutDetail, showServiceDetail, showVibeBootcamp, setIsDetailOpen]);

  useEffect(() => {
    invalidate();
  }, [language, invalidate]);

  useLayoutEffect(() => {
    if (!onPagesChange) return;
    if (showAboutDetail || showServiceDetail || showVibeBootcamp) return;

    const node = contentRef.current;
    if (!node) return;

    let frame = 0;
    const updatePages = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(() => {
        const height = node.scrollHeight;
        const viewport = window.innerHeight || 1;
        const pages = Math.max(1, height / viewport);
        onPagesChange(pages);
      });
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
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [language, onPagesChange, selectedProjectId, showAboutDetail, showServiceDetail, showVibeBootcamp]);

  const resetScroll = useCallback(() => {
    const applyReset = () => {
      if (!scroll.el) return;
      scroll.el.scrollTop = 0;
      scroll.el.scrollLeft = 0;
      scroll.el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      scroll.offset = 0;
      scroll.delta = 0;
      const fixedRoot = scroll.fixed?.firstElementChild as HTMLElement | null;
      if (fixedRoot) {
        fixedRoot.style.transform = 'translate3d(0px, 0px, 0px)';
      }
      scroll.el.dispatchEvent(new Event('scroll'));
      invalidate();
    };

    applyReset();
    requestAnimationFrame(applyReset);
    setTimeout(applyReset, 80);
    setTimeout(applyReset, 200);
    setTimeout(applyReset, 400);
  }, [invalidate, scroll]);

  // Handler for showing About detail with scroll to top
  const handleShowAbout = () => {
    resetScroll();
    setShowAboutDetail(true);
  };

  // Handler for showing Service detail with scroll to top
  const handleShowService = () => {
    resetScroll();
    setShowServiceDetail(true);
  };

  const handleShowServiceFromAbout = () => {
    resetScroll();
    setShowServiceDetail(true);
  };

  const handleShowBootcamp = () => {
    resetScroll();
    setShowVibeBootcamp(true);
  };

  const handleBackFromBootcamp = () => {
    setShowVibeBootcamp(false);
  };

  // Also ensure scroll is at top when Detail is shown
  useEffect(() => {
    if (showAboutDetail || showServiceDetail || showVibeBootcamp) {
      resetScroll();
    }
  }, [showAboutDetail, showServiceDetail, showVibeBootcamp, resetScroll]);

  // Handler for going back from About detail with scroll to top
  const handleBackFromAbout = () => {
    setShowAboutDetail(false);
    resetScroll();
  };

  const handleBackFromService = () => {
    setShowServiceDetail(false);
    resetScroll();
  };

  const saveWorksScroll = useCallback(() => {
    if (!scroll.el) return;
    listScrollTopRef.current = scroll.el.scrollTop;
  }, [scroll]);

  const restoreWorksScroll = useCallback(() => {
    const savedTop = listScrollTopRef.current;
    if (savedTop === null || !scroll.el) return;
    scroll.el.scrollTop = savedTop;
    scroll.el.scrollTo({ top: savedTop, behavior: 'auto' });
    scroll.el.dispatchEvent(new Event('scroll'));
    invalidate();
  }, [invalidate, scroll]);

  const handleProjectOpen = (id: string) => {
    saveWorksScroll();
    setSelectedProjectId(id);
  };

  useEffect(() => {
    if (!selectedProjectId) return;
    restoreWorksScroll();
    requestAnimationFrame(restoreWorksScroll);
    setTimeout(restoreWorksScroll, 60);
  }, [selectedProjectId, restoreWorksScroll]);

  // Show Service Detail page
  if (showServiceDetail) {
    return (
      <div className="w-full text-[#e4e7e5]">
        <AnimatePresence mode="wait">
          <ServiceDetail key="service-detail" onBack={handleBackFromService} onPagesChange={onDetailPagesChange} />
        </AnimatePresence>
      </div>
    );
  }

  if (showVibeBootcamp) {
    return (
      <div className="w-full text-[#e4e7e5]">
        <AnimatePresence mode="wait">
          <VibeBootcamp key="vibe-bootcamp" onBack={handleBackFromBootcamp} onPagesChange={onDetailPagesChange} />
        </AnimatePresence>
      </div>
    );
  }



  // Show About Detail page
  if (showAboutDetail) {
    return (
      <div className="w-full text-[#e4e7e5]">
        <AnimatePresence mode="wait">
          <AboutDetail
            key="about-detail"
            onBack={handleBackFromAbout}
            onPagesChange={onDetailPagesChange}
            onShowService={handleShowServiceFromAbout}
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <main ref={contentRef} className="w-full text-[#e4e7e5]">

      {/* HERO SECTION */}
      <Section className="items-start relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-row-reverse md:flex-row justify-between w-full h-full items-center"
        >
          {/* Vertical Japanese Text */}
          <div className="h-[50vh] md:h-3/4 flex flex-row-reverse gap-4 md:gap-8 select-none">
            <motion.h1 variants={fadeUp} className="text-4xl md:text-8xl font-bold vertical-text border-l border-white/10 pl-2 md:pl-4 text-stone-100">
              伊藤貴將
            </motion.h1>
            <motion.h2 variants={fadeUp} className="text-xl md:text-3xl text-stone-400 vertical-text mt-10 md:mt-20">
              イトパン
            </motion.h2>
            <motion.div variants={fadeUp} className="text-xs md:text-base text-emerald-500/60 vertical-text mt-20 md:mt-40 font-light tracking-widest hidden sm:block">
              {getText('開発ト創造ノ間', 'Between Dev & Creation')}
            </motion.div>
          </div>

          {/* English/Modern Text */}
          <div className="absolute bottom-8 md:bottom-20 left-4 md:left-20 right-4 md:right-auto">
            <motion.p variants={fadeUp} className="text-[10px] md:text-sm font-mono tracking-widest text-emerald-400 mb-1 md:mb-2">
              // DEVELOPER & CREATOR
            </motion.p>
            <motion.div variants={fadeUp} className="text-sm md:text-xl font-light max-w-md leading-relaxed text-stone-300">
              {getText(
                <>
                  自然、精神、そして生成AIの<br />
                  境界を探求する。
                </>,
                <>
                  Exploring the boundaries between nature, spirit,<br />
                  and generative AI.
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* PHILOSOPHY SECTION */}
      <Section className="items-center text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl bg-emerald-950/20 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-emerald-900/30"
        >
          <motion.h3 variants={fadeUp} className="text-2xl md:text-4xl mb-12 font-serif tracking-wide text-stone-200">
            {getText(
              <>
                <span className="inline-block">生成AI時代の制作を、</span>
                <br className="hidden md:block" />
                <span className="inline-block">設計して実装する。</span>
                <br className="hidden md:block" />
                <span className="inline-block">コード/デザイン/映像を横断して、</span>
                <br className="hidden md:block" />
                <span className="inline-block">仕組みまでつくる。</span>
              </>,
              <>
                <span className="inline-block">Design and implement production in the AI era.</span>
                <br className="hidden md:block" />
                <span className="inline-block">Across code, design, and film,</span>
                <br className="hidden md:block" />
                <span className="inline-block">build the system itself.</span>
              </>
            )}
          </motion.h3>

          <motion.div variants={fadeUp} className="text-sm md:text-lg leading-loose text-stone-300 font-light space-y-6 text-justify">
            <p>
              {getText(
                '長野・北アルプス山麓を拠点に、コード／デザイン／映像／文章／体験設計を行き来しながら、生成AIを前提にしたものづくりとワークフローの設計に取り組んでいます。',
                'Based in Nagano at the foot of the Northern Alps, I move across code, design, film, writing, and experience design—building and designing workflows with generative AI as a given.'
              )}
            </p>
            <p>
              {getText(
                <>
                  関心の中心にあるのは、日本の土地や文化が内包してきた「ソフトパワー」。<br />
                  北アルプス山麓に残る地名の由来、史料、暮らしの中に息づく習慣。
                </>,
                <>
                  At the center is the “soft power” embedded in Japanese land and culture.<br />
                  The origins of place names in the Northern Alps, historical records, and customs living in daily life.
                </>
              )}
            </p>
            <p>
              {getText(
                '縄文から積み重なってきた土地の層や、安曇氏の系譜のような断片にも目を向け、資料にあたり、現地を歩きながら、手触りのある情報を少しずつ集めています。',
                'I look at layers of land accumulated since the Jomon period and fragments like the Azumi lineage—consulting sources, walking the land, and gathering tactile information piece by piece.'
              )}
            </p>
            <p>
              {getText(
                'そうした断片を生成AIで整理・再編集し、物語、デザイン、映像、体験へと翻訳し直すことで、現代に通用するコンテンツとして立ち上げていきます。',
                'By organizing and re-editing those fragments with generative AI, I translate them into stories, design, film, and experiences that can stand in the present.'
              )}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={handleShowAbout}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-950/40 hover:bg-emerald-900/60 border-2 border-emerald-700/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 transition-all duration-300 rounded-md font-mono text-sm shadow-lg hover:shadow-emerald-500/20"
            >
              <span>{getText('About / イトパンについて', 'About')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </Section>

      {/* WORKS / PROJECTS SECTION - Hierarchical View */}
      <Section className="justify-start pt-20 min-h-0">
        <AnimatePresence mode="wait">
          {!selectedProjectId ? (
            /* LIST VIEW */
            <motion.div
              key="list"
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-emerald-500/30 pb-4">
                <motion.h3 variants={fadeUp} className="text-4xl font-serif text-stone-200">
                  {getText('Works / 制作', 'Works')}
                </motion.h3>
                <motion.p variants={fadeUp} className="text-stone-500 text-sm mt-4 md:mt-0 font-light">
                  {getText('映像作品からSaaSまで。', 'From film works to SaaS.')}
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                {projectGroups.map(({ pillar, projects: groupProjects }) => {
                  if (groupProjects.length === 0) return null;
                  return (
                    <div key={pillar} className="flex flex-col gap-6">
                      <PillarCard
                        pillar={pillar}
                        projects={groupProjects}
                      />
                      <div className="flex flex-col gap-6">
                        {groupProjects.map((project) => (
                          <RichProjectCard
                            key={project.id}
                            data={project}
                            onClick={() => handleProjectOpen(project.id)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
          {selectedProjectId ? (
            /* DETAIL VIEW */
            <ProjectDetail
              key="detail"
              project={selectedProject!}
              onBack={() => setSelectedProjectId(null)}
            />
          ) : null}
        </AnimatePresence>
      </Section>

      {/* DIVIDER SECTION */}
      <section className="w-full py-20 px-8 md:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto flex items-center justify-center gap-6"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-emerald-900/50 to-emerald-500/30"></div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></span>
            <span className="w-2 h-2 bg-emerald-500/60 rounded-full animate-pulse"></span>
            <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full"></span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-emerald-900/50 to-emerald-500/30"></div>
        </motion.div>
      </section>

      {/* CONTACT SECTION - Rich */}
      <Section className="items-center justify-center text-center relative z-10 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">
              {getText('SERVICES / サービス・プラン', 'SERVICES')}
            </p>
            <h3 className="text-3xl md:text-5xl font-serif text-stone-200 mb-6">
              {getText('お手伝いできること', 'How I Can Help')}
            </h3>
            <p className="text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
              {getText(
                <>
                  名刺代わりのWebサイト制作「Webca（ウェブカ）」を中心に、<br className="hidden md:block" />
                  生成AIを活用した制作・開発支援を行っています。
                </>,
                <>
                  Centered on “Cloud Business Cards,” web sites that work as your calling card,<br className="hidden md:block" />
                  I provide production and development support using generative AI.
                </>
              )}
            </p>
          </motion.div>

          {/* Service Cards (Clickable) */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {/* 01: Cloud Meishi (Clickable) */}
            <button onClick={handleShowService} className="text-left group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300 hover:bg-emerald-950/20 relative overflow-hidden">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">01</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">
                {getText('Webca（ウェブカ）', 'Cloud Business Card')}
              </h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                {getText(
                  <>
                    Webサイト＋名刺セット<br />
                    渡した瞬間、あなたが伝わる“入口”を
                  </>,
                  <>
                    Website + business card set<br />
                    A gateway that conveys you the moment it’s handed over
                  </>
                )}
              </p>
              <div className="absolute top-4 right-4 text-emerald-500/20 group-hover:text-emerald-500/60 transition-colors">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </button>

            {/* 02: Dev Support (Hover only) */}
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300 relative overflow-hidden">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">02</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">
                {getText('開発支援', 'Development Support')}
              </h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                {getText('AIエージェント・MCP・ワークフロー構築', 'AI agents, MCP, and workflow building')}
              </p>
              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-950/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-emerald-400 text-xs font-mono tracking-wider">
                  {getText('詳細はお問い合わせへ', 'Contact for details')}
                </span>
              </div>
            </div>

            {/* 03: Event (Hover only) */}
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300 relative overflow-hidden">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">03</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">
                {getText('イベント登壇', 'Event Speaking')}
              </h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                {getText('生成AI活用の事例紹介・ハンズオン', 'GenAI use cases & hands-on')}
              </p>
              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-950/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-emerald-400 text-xs font-mono tracking-wider">
                  {getText('詳細はお問い合わせへ', 'Contact for details')}
                </span>
              </div>
            </div>

            {/* 04: Support (Hover only) */}
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300 relative overflow-hidden">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">04</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">
                {getText('伴走支援', 'Ongoing Support')}
              </h4>
              <p className="text-stone-500 text-xs leading-relaxed">
                {getText('安曇むすひ Vibe Bootcamp', 'Azumi Musuhi Vibe Bootcamp')}
              </p>
              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-950/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-emerald-400 text-xs font-mono tracking-wider">
                  {getText('詳細はお問い合わせへ', 'Contact for details')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main CTA Area */}
          <motion.div variants={fadeUp} className="bg-gradient-to-br from-emerald-950/40 via-stone-950/60 to-emerald-950/30 border border-emerald-900/40 rounded-sm p-10 md:p-14 mb-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 font-mono text-xs tracking-widest">
                  {getText('AVAILABLE FOR WORK / お仕事募集中', 'AVAILABLE FOR WORK')}
                </span>
              </div>

              <h4 className="text-2xl md:text-3xl font-serif text-stone-100 mb-4">
                {getText('まずはお気軽にご連絡ください', 'Feel free to reach out')}
              </h4>
              <p className="text-stone-400 font-light mb-8 max-w-lg mx-auto">
                {getText(
                  '「まだぼんやりしているアイデア」や「そもそも何から始めればいいかわからない」といった段階からでも大丈夫です。',
                  'It’s totally fine to start with a vague idea or not knowing where to begin.'
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleShowService}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-emerald-950/30 border border-emerald-700/50 hover:border-emerald-500 text-emerald-400 transition-all duration-300 rounded-sm font-mono text-sm"
                >
                  <span>{getText('プラン・料金を見る', 'View plans & pricing')}</span>
                </button>
                <a
                  href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500/50 text-white transition-all duration-300 rounded-sm font-mono text-sm group"
                >
                  <span>{getText('お問い合わせフォーム', 'Contact form')}</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Location & Social Links */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-center gap-3 text-stone-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm">
                {getText('長野県北安曇郡・松本市を拠点に活動中', 'Based in Kitaazumi-gun and Matsumoto, Nagano')}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5">
              <a
                href="https://x.com/takamasa045"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-8 py-4 bg-stone-900/80 border-2 border-stone-600 hover:border-emerald-500 hover:bg-emerald-950/50 rounded-sm transition-all duration-300"
              >
                <svg className="w-7 h-7 text-stone-200 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-base text-stone-200 group-hover:text-emerald-400 font-mono tracking-wide transition-colors">X / Twitter</span>
              </a>
              <a
                href="https://note.com/azumimusuhi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-8 py-4 bg-stone-900/80 border-2 border-stone-600 hover:border-emerald-500 hover:bg-emerald-950/50 rounded-sm transition-all duration-300"
              >
                <svg className="w-7 h-7 text-stone-200 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <span className="text-base text-stone-200 group-hover:text-emerald-400 font-mono tracking-wide transition-colors">note</span>
              </a>
            </div>

            <button
              onClick={handleShowAbout}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-700/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 transition-all duration-300 rounded-md font-mono text-sm"
            >
              <span>{getText('About / イトパンについて', 'About')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div variants={fadeUp} className="text-center pt-8 border-t border-emerald-900/20 pb-8 md:pb-0">
            <p className="text-xs text-stone-700">
              &copy; 2026 Takamasa Ito. All rights reserved.
            </p>
          </motion.div>

        </motion.div>
      </Section>

    </main>
  );
};

// --- COMPONENT: LIST CARD (Collection Entry) ---
const CardBackdrop: React.FC<{ pillar: Pillar }> = ({ pillar }) => {
  const meta = pillarMeta[pillar];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.glow}`} />
      <div
        className="absolute inset-0 pattern-layer"
        style={{
          backgroundImage: `url(\"${meta.pattern}\")`,
          backgroundSize: meta.patternSize,
          backgroundPosition: 'center',
          mixBlendMode: 'screen',
          ['--pattern-opacity' as any]: String(meta.patternOpacity),
          ['--pattern-opacity-hover' as any]: String(meta.patternHoverOpacity),
          ['--pattern-glow' as any]: meta.glowColor
        } as React.CSSProperties}
      />
      <div className={`absolute -top-12 -right-10 h-40 w-40 rounded-full blur-3xl ${meta.orb}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-transparent opacity-80" />
    </div>
  );
};

const PillarCard: React.FC<{ pillar: Pillar; projects: ProjectCollection[]; onClick?: () => void }> = ({ pillar, projects, onClick }) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);
  const meta = pillarMeta[pillar];
  const title = getText(meta.labelJa, meta.labelEn);
  const description = getText(meta.descriptionJa, meta.descriptionEn);
  const isInteractive = Boolean(onClick);
  const projectNames = projects.map((project) => ({
    id: project.id,
    name: getText(project.title, project.titleEn)
  }));

  return (
    <motion.article
      variants={fadeUp}
      onClick={onClick}
      className={`group relative block bg-emerald-950/20 border border-emerald-900/30 overflow-hidden hover:border-emerald-500/40 transition-colors duration-500 h-80 rounded-sm ${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <CardBackdrop pillar={pillar} />

      <div className="absolute inset-0 p-6 z-10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-sm border ${meta.border} ${meta.accent} bg-black/40`}>
            {title}
          </span>
          <span className="text-[10px] font-mono text-stone-500">
            {projects.length} {getText('件', 'Collections')}
          </span>
        </div>

        <div className="space-y-3">
          <h4 className="text-3xl font-serif text-stone-100 group-hover:text-white transition-colors title-glow" data-text={title}>
            {title}
          </h4>
          <p className="text-sm text-stone-400 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {projectNames.map((project) => (
              <span
                key={project.id}
                className="text-[10px] font-mono text-stone-500 border border-white/10 px-2 py-1 rounded-sm bg-black/30"
              >
                {project.name}
              </span>
            ))}
          </div>
        </div>

        {isInteractive ? (
          <div className={`text-xs font-mono tracking-widest ${meta.accent} opacity-80 group-hover:opacity-100 transition-opacity`}>
            {getText('柱を見る', 'Open Pillar')} <span className="text-base">→</span>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
};

const RichProjectCard: React.FC<{ data: ProjectCollection; onClick: () => void }> = ({ data, onClick }) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);
  const titleText = isEnglish ? data.titleEn : data.title;
  const meta = pillarMeta[data.pillar];

  return (
    <motion.article
      variants={fadeUp}
      onClick={onClick}
      className="group relative block bg-emerald-950/20 border border-emerald-900/30 overflow-hidden hover:border-emerald-500/40 transition-colors duration-500 h-80 rounded-sm cursor-pointer"
    >
      <CardBackdrop pillar={data.pillar} />

      {/* Content Container */}
      <div className="absolute inset-0 p-6 z-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-sm border ${meta.border} ${meta.accent} bg-black/40`}>
            {getText(meta.labelJa, meta.labelEn)}
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-stone-500">
            {getText(data.category, data.categoryEn)}
          </p>
          <h4
            className="text-2xl font-serif text-stone-100 group-hover:text-white transition-colors title-glow"
            data-text={titleText}
          >
            {titleText}
          </h4>
          <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">
            {getText(data.description, data.descriptionEn)}
          </p>
        </div>

        <div className={`text-xs font-mono tracking-widest ${meta.accent} opacity-70 group-hover:opacity-100 transition-opacity`}>
          {getText('コレクションを見る', 'View Collection')} <span className="text-base">→</span>
        </div>
      </div>
    </motion.article>
  );
};

// --- COMPONENT: DETAIL VIEW (Collection & Items) ---
// Uses quickFade/quickStagger for snappy page transitions
const ProjectDetail: React.FC<{ project: ProjectCollection; onBack: () => void }> = ({ project, onBack }) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={quickStagger}
      className="w-full flex flex-col gap-12"
    >
      {/* Navigation Header */}
      <div className="flex justify-between items-center border-b border-emerald-900/50 pb-6">
        <motion.button
          variants={quickFade}
          onClick={onBack}
          className="group text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono tracking-widest bg-emerald-950/40 hover:bg-emerald-900/60 px-4 py-2 rounded-md border border-emerald-700/50 hover:border-emerald-500 transition-all duration-300"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{getText('一覧に戻る', 'Back to list')}</span>
        </motion.button>
        <motion.div variants={quickFade} className="text-xs font-mono text-stone-600 hidden md:block">
          {getText('COLLECTION ID', 'COLLECTION ID')}: {project.id.toUpperCase()}
        </motion.div>
      </div>

      {/* Fixed Back Button - Bottom Right (for scroll visibility) */}
      <motion.div
        variants={quickFade}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={onBack}
          className="group text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono tracking-widest bg-emerald-950/60 hover:bg-emerald-900/60 backdrop-blur-md px-5 py-3 rounded-md border-2 border-emerald-700/50 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{getText('戻る', 'Back')}</span>
        </button>
      </motion.div>

      {/* Collection Info Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <motion.div variants={quickFade} className="w-full lg:w-2/3">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-emerald-500 font-mono text-xs tracking-wider border border-emerald-500/30 px-2 py-1 rounded-sm uppercase">
              {getText(project.category, project.categoryEn)}
            </span>
            <span className="text-stone-500 font-mono text-xs">{project.year}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-stone-100 mb-8 leading-tight">
            {getText(project.title, project.titleEn)}
          </h2>

          <p className="text-stone-300 leading-loose font-light text-justify text-lg mb-8">
            {getText(project.longDescription, project.longDescriptionEn)}
          </p>
        </motion.div>

        <motion.div variants={quickFade} className="w-full lg:w-1/3 flex flex-col justify-end pb-4">
          <h5 className="text-emerald-600 text-xs font-mono tracking-widest mb-4">
            {getText('使用技術 / TECHNOLOGIES', 'TECHNOLOGIES')}
          </h5>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="bg-stone-900/80 text-stone-400 px-3 py-2 text-xs rounded-sm border border-emerald-900/20">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Grid Section */}
      <motion.div variants={quickFade} className="mt-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-emerald-500/50"></div>
          <h3 className="text-stone-200 font-serif text-xl">
            {getText('Collection Items / 収録コンテンツ', 'Collection Items')}
          </h3>
          <div className="h-[1px] flex-grow bg-emerald-900/30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...project.items]
            .sort((a, b) => {
              // Sort by date descending (newest first)
              const dateA = a.date || '0000.00';
              const dateB = b.date || '0000.00';
              return dateB.localeCompare(dateA);
            })
            .map((item) => (
              <ContentItemCard key={item.id} item={item} />
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- COMPONENT: INDIVIDUAL CONTENT ITEM CARD ---
// Uses quickFade for snappy animations
const ContentItemCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);
  const localizedTitle = isEnglish ? item.titleEn : item.title;
  return (
    <motion.article
      variants={quickFade}
      className="bg-stone-950/40 border border-emerald-900/30 hover:border-emerald-500/50 rounded-sm overflow-hidden group transition-all duration-300 flex flex-col"
    >
      {/* Visual Thumbnail Area (Lazy loaded) */}
      <div className={`${item.videoUrl || item.imageUrl ? 'aspect-video' : 'h-48'} w-full relative overflow-hidden bg-black`}>
        {item.videoUrl ? (
          <LazyVideo
            src={item.videoUrl}
            controls
            loop
            playsInline
            className="w-full h-full"
          />
        ) : item.imageUrl ? (
          <LazyImage
            src={item.imageUrl}
            alt={localizedTitle}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <MediaBackground type={item.type} />
        )}
        {/* Type Badge */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 text-[10px] text-emerald-400 font-mono uppercase rounded-sm border border-white/5 z-10">
          {item.type}
        </div>
      </div>

      {/* Text Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-serif text-stone-200 group-hover:text-white transition-colors">
              {localizedTitle}
            </h4>
            {item.date && <span className="text-[10px] text-stone-600 font-mono mt-1 whitespace-nowrap ml-2">{item.date}</span>}
          </div>
          <p className="text-sm text-stone-500 leading-relaxed mb-4 font-light whitespace-pre-line">
            {getText(item.description, item.descriptionEn)}
          </p>

          {/* Technology Tags */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.technologies.map(tech => (
                <span
                  key={tech}
                  className="bg-emerald-950/50 text-emerald-400/80 px-2 py-0.5 text-[10px] rounded-sm border border-emerald-900/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 text-xs font-mono tracking-widest text-emerald-500 border border-emerald-900/50 hover:bg-emerald-900/20 hover:border-emerald-500 rounded-sm transition-all"
        >
          {getText('コンテンツを見る ↗', 'VIEW CONTENT ↗')}
        </a>
      </div>
    </motion.article>
  );
};

// --- COMPONENT: MEDIA BACKGROUND (Visuals) ---
const MediaBackground: React.FC<{ type: MediaType }> = ({ type }) => {
  return (
    <div className="absolute inset-0 z-0 opacity-50 hover:opacity-70 transition-opacity duration-700">
      {type === 'video' && (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-stone-900 to-black">
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent animate-pulse"></div>
          </div>
          {/* Abstract play icon feel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center">
              <div className="ml-0.5 w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-emerald-500/80 border-b-[3px] border-b-transparent"></div>
            </div>
          </div>
        </div>
      )}

      {type === 'music' && (
        <div className="w-full h-full bg-stone-900 flex items-end justify-center gap-1 pb-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 bg-emerald-600/30 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      )}

      {type === 'mv' && (
        <div className="w-full h-full bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-900 flex items-end justify-center gap-1 pb-8 relative">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 bg-emerald-500/40 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.1}s` }}></div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="ml-0.5 w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-emerald-400/80 border-b-[5px] border-b-transparent"></div>
            </div>
          </div>
        </div>
      )}

      {type === 'web' && (
        <div className="w-full h-full bg-stone-900 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border border-emerald-500/10 bg-black/20 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-white/5 flex gap-1 items-center px-2">
              <div className="w-0.5 h-0.5 bg-white/20 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-white/20 rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-900/30 font-mono text-4xl">
              &lt;/&gt;
            </div>
          </div>
        </div>
      )}

      {type === 'image' && (
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-stone-800 via-emerald-950 to-black">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
        </div>
      )}

      {type === 'saas' && (
        <div className="w-full h-full bg-gradient-to-br from-stone-900 via-emerald-950/50 to-stone-900 flex items-center justify-center">
          <div className="w-3/4 h-3/4 border border-emerald-500/20 bg-black/30 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-emerald-900/20 flex gap-1.5 items-center px-3">
              <div className="w-2 h-2 bg-emerald-500/40 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-400/30 rounded-full"></div>
              <div className="w-2 h-2 bg-emerald-300/20 rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500/20 font-mono text-3xl tracking-widest">
              SaaS
            </div>
          </div>
        </div>
      )}

      {type === 'event' && (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-stone-900 to-emerald-950 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-emerald-500/30 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-10 h-10 border border-emerald-400/40 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-emerald-500/50 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-emerald-500/40 rounded-full"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
