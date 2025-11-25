import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useScroll } from '@react-three/drei';
import { AboutDetail } from './AboutDetail';

// Types for Project Data
type MediaType = 'video' | 'music' | 'mv' | 'web' | 'saas' | 'image' | 'event';

// Individual Content Item (Child)
interface ContentItem {
  id: string;
  title: string;
  type: MediaType; // Can be different from the parent category
  description: string;
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
  category: string;
  mainType: MediaType; // Determines the overall theme/visual
  description: string;
  longDescription: string;
  technologies: string[];
  year: string;
  items: ContentItem[]; // List of contents within this collection
}

// Mock Data with Hierarchical Structure
const projects: ProjectCollection[] = [
  {
    id: 'p1',
    title: 'AI Video Samples',
    category: 'Generative Video Collection',
    mainType: 'video',
    description: '多数の動画生成AIモデルを使用し、生成結果の違いや組み合わせをテストした映像コレクション。',
    longDescription: '多数の動画生成AIモデルを使用し、生成結果の違いや組み合わせをテストした映像コレクション。Veo3.1・Sora2・Hailuo・PixVerse・Vidu・Kling などを用い、ワークフローの検証を目的として制作しています。',
    technologies: ['Veo3.1', 'Sora2', 'Hailuo', 'PixVerse', 'Vidu', 'Kling'],
    year: '2024',
    items: [
      {
        id: 'v00',
        title: '猫たちの夜会',
        type: 'video',
        description: '飼い主のいない夜、猫たちは密かに集会を開くらしい。🍊🌃\nこたつでぬくぬくしていたはずが、気づけば異次元のパーティーフロアへ…😺✨\nネオンが弾け、ダンスはキレッキレ😹',
        link: 'https://x.com/takamasa045/status/1992409112815276187',
        date: '2024.11',
        videoUrl: '/videos/neko-night-party.mp4',
        technologies: ['Midjourney', 'NanobananaPro', 'Veo 3.1']
      },
      {
        id: 'v0',
        title: '芝犬ドギーダンス',
        type: 'video',
        description: '久しぶりの芝犬ドギーダンス🐕🎶\nHailuo2.3はダンスがかなり良くなった😆\nMidjourneyとnanobananaで画像生成後にHailuoでi2v、Sunoで作った音に合わせて完成🎥',
        link: 'https://x.com/takamasa045/status/1988223314192724155',
        date: '2024.11',
        videoUrl: '/videos/shiba-doggy-dance.mp4',
        technologies: ['Midjourney', 'nanobananapro', 'Hailuo 2.3', 'Suno']
      },
      {
        id: 'v1',
        title: 'Spring Haze / 春霞',
        type: 'video',
        description: '桜色の粒子が霧のように舞う、春の訪れを表現したアンビエントループ。',
        link: 'https://twitter.com/takamasa045',
        date: '2024.04'
      },
      {
        id: 'v2',
        title: 'Frozen Time / 氷結',
        type: 'video',
        description: '時間が止まったかのような氷の世界。クリスタルの屈折表現の実験。',
        link: 'https://twitter.com/takamasa045',
        date: '2024.01'
      },
      {
        id: 'v3',
        title: 'Urban Flow',
        type: 'video',
        description: '東京の夜景を流体として再解釈した、サイバーパンク・テイストの短編。',
        link: 'https://twitter.com/takamasa045',
        date: '2023.12'
      }
    ]
  },
  {
    id: 'p2',
    title: 'MV Collection',
    category: 'AI Music Video',
    mainType: 'mv',
    description: 'Suno AIで生成した楽曲に、動画生成AIで映像を組み合わせたミュージックビデオコレクション。',
    longDescription: 'Suno AIで生成した楽曲をベースに、Hailuo・Veo・Soraなどの動画生成AIで映像を制作。音と映像の両方をAIで生成し、編集・合成することで完成させたMV作品集です。',
    technologies: ['Suno AI', 'Hailuo', 'Veo', 'Sora', 'Premiere Pro'],
    year: '2024',
    items: [
      {
        id: 'm000',
        title: 'MVマルチショットジェネレーター',
        type: 'music',
        description: '自作アプリ「MVマルチショットジェネレーター」で実際にMVを制作🎬✨\nマルチカット画像をkamui codeのwan-v2で動画生成、リップシンクはSync、カット割り・編集はすべてRemotion。\nさらにThree.jsで3Dの星柄アニメーションを重ね、新しい領域に踏み込んだ一作🔥🌌',
        link: 'https://x.com/takamasa045/status/1971568628773658907',
        date: '2025.09.26',
        videoUrl: '/videos/mv-multishot-generator.mp4',
        technologies: ['kamui code', 'wan-v2', 'Sync', 'Remotion', 'Three.js']
      },
      {
        id: 'm00',
        title: 'ボス猿ハラスメント2',
        type: 'music',
        description: '動画編集ソフトを一切使わずにRemotionだけで作り上げたMV。\n画像はMidjourneyで生成→i2vで動かし、音楽はSunoで友人のビート音源から曲化。\nリリックは現場の愚痴をGPTでテキスト化→再構成。\n編集はRemotion × Claude Code × codexでタイムライン制御、同期、演出を完結。\n"理不尽さ"を愚痴からリリックに変えて、音楽と映像で叩き返した一作🦫',
        link: 'https://x.com/takamasa045/status/1960300333240062196',
        date: '2025.08',
        videoUrl: '/videos/boss-monkey-harassment2.mp4',
        technologies: ['Midjourney', 'i2v', 'Suno', 'Remotion', 'Claude Code', 'codex']
      },
      {
        id: 'm0',
        title: '松本生成AIハッカソン MV',
        type: 'music',
        description: 'ClaudeCode sonnet 4.5 × Remotion × Three.js で3DアニメーションMVを試作🎥✨\nsonnet 4.5、動作がサクサクでめちゃ快適だし頭も良い。探り探りでも1時間足らずで形にできちゃった🎬\n題材は、先日松本で大盛況だった生成AIハッカソンのイベントリリック😆🎤\n長野から世界へ🌏',
        link: 'https://x.com/takamasa045/status/1972791745080623556',
        date: '2025.09.30',
        videoUrl: '/videos/matsumoto-genai-mv.mp4',
        technologies: ['Claude Code', 'Remotion', 'Three.js', 'Suno AI']
      },
      {
        id: 'm02',
        title: 'TextAliveでつくるリリックモーション',
        type: 'music',
        description: 'TextAliveでつくるリリックモーション。編集はもちろんRemotion縛り。',
        link: 'https://x.com/takamasa045/status/1966493897703702690',
        date: '2025.09',
        videoUrl: '/videos/textalive-lyric-motion.mp4',
        technologies: ['TextAlive', 'Remotion']
      },
      {
        id: 'm01',
        title: 'プレイリスト（時は戻らない Cover）',
        type: 'music',
        description: 'Midjourney でイメージ生成 → Nanobanana でカット画像生成 → Hailuo でi2v変換 → 編集 → Sync でリップシンク✨\n特にSyncが最高で、顔を自動認識してくれるから動画をそのまま丸投げできるのが便利すぎる！\nもちろん細かいツッコミどころはあるけど、そこも含めてご愛嬌☺️',
        link: 'https://x.com/takamasa045/status/1970796919615287615',
        date: '2024.11',
        videoUrl: '/videos/playlist-cover-mv.mp4',
        technologies: ['Midjourney', 'NanobananaPro', 'Hailuo', 'Sync']
      }
    ]
  },
  {
    id: 'p3',
    title: 'Musuhi Labs',
    category: 'Web & SaaS Prototypes',
    mainType: 'saas',
    description: 'アニミズム思想をUI/UXに落とし込んだ、実験的アプリケーション開発の記録。',
    longDescription: '「道具には魂が宿る」というアニミズムの思想をベースに、SaaS・MCPサーバー・Webアプリ・Webサイトなどのプロトタイプを次々と生み出す実験室。LLMエージェントから業務効率化ツール、データベース連携型のニッチなWebサービスまで、"実際に動かしながら考える"プロダクトを公開しています。',
    technologies: ['React', 'LangChain', 'Gemini Pro', 'Three.js'],
    year: '2023-2024',
    items: [
      {
        id: 'w00',
        title: 'Remotion Studio Monorepo',
        type: 'web',
        description: 'Remotionで映像制作を加速させるモノレポを公開。\nテンプレをコピーするだけで新規プロジェクトを即スタート。Three.jsベースの3Dテンプレも同梱し、3DアニメーションMVや演出を即構築可能。\nアニメーション・デザイン・音声処理などを共通パッケージ化し、複数案件でも一貫した品質を担保。pnpmワークスペース&Gitサブモジュールで環境もすっきり。',
        link: 'https://x.com/takamasa045/status/1973148052916699287',
        date: '2025.10.01',
        videoUrl: '/videos/remotion-studio-monorepo.mp4',
        technologies: ['Remotion', 'Three.js', 'pnpm', 'Monorepo', 'CI/CD']
      },
      {
        id: 'w0',
        title: 'MV Multi-Shot Generator',
        type: 'web',
        description: 'MV制作でマルチカットに困った経験を解決するアプリ。\n写真アップロード＆アスペクト比選択 → リリック分析で楽曲の歌詞から最適なマルチカットを自動提案 → AIプロンプトを確認・編集して調整可能。\nnanobananapro連携でMV用マルチカット画像を高速生成。制作のスピードもクオリティも一気に上がります。',
        link: 'https://x.com/takamasa045/status/1971144667258589337',
        date: '2025.09.25',
        imageUrl: '/images/mv-multishot-generator-app.png',
        technologies: ['You Ware', 'nanobananapro', 'AI駆動分析', 'リリック解析']
      },
      {
        id: 'w1',
        title: 'Musuhi Agent v1',
        type: 'web',
        description: '対話を通じて創造的インスピレーションを与える、人格を持ったAIパートナー。',
        link: '#'
      },
      {
        id: 'w2',
        title: 'Kotodama Editor',
        type: 'web',
        description: '入力した言葉の感情分析を行い、背景色やフォントがリアルタイムに変化する執筆ツール。',
        link: '#'
      },
      {
        id: 'w3',
        title: 'Zen ToDo',
        type: 'web',
        description: '完了したタスクが「枯山水」の石として配置されていく、達成感を可視化する管理アプリ。',
        link: '#'
      }
    ]
  },
  {
    id: 'p4',
    title: 'Events & Community',
    category: 'イベント・コミュニティ',
    mainType: 'event',
    description: '生成AIハッカソンやワークショップなど、地域で開催するイベント活動の記録。',
    longDescription: '「つかう」から「つくる」へ。生成AIを活用したプロトタイピングを、松本を中心に地域で体験できるイベントを企画・運営しています。プログラミング不要で、誰でも"創る側"になれる場づくりを目指しています。',
    technologies: ['Manus', 'Claude', 'Remotion', 'ハッカソン'],
    year: '2025',
    items: [
      {
        id: 'e1',
        title: 'まつもと生成AIハッカソン with Manus',
        type: 'event',
        description: '「またやりたい」第1回の参加者ほぼ全員がそう答えた、まつもと生成AIハッカソン。\nAIを"使う"から"つくる"へ。たった3時間で、アイデアがプロトタイプになる。\nコードが書けなくてもOK。Manus Proを使えば、誰でも"創る側"に。\n仲間と笑いながら、試しながら、ひらめきが形になっていく体験を。\n\n🗓11/30(日) 13:00–16:00\n📍SWEET WORK（松本）\n🎁 Manus Pro当日使い放題＋2,000クレジット',
        link: 'https://x.com/takamasa045/status/1986742405391942026',
        date: '2025.11.07',
        imageUrl: '/images/matsumoto-ai-hackathon-manus.png',
        technologies: ['Manus Pro', 'ハッカソン', '松本', 'SWEET WORK']
      },
      {
        id: 'e2',
        title: 'まつもと生成AIハッカソン Plus',
        type: 'event',
        description: '🚀 まつもと生成AIハッカソン Plus 開催します！\n11/9(日) 11:00〜 @サザンガク（松本）\n\nCodex / Claude Code / MCPで、アイデアを"その日"に形に！\n\n1日でMVPをつくる実践型イベント⚡\n\n参加無料・先着12名👇',
        link: 'https://x.com/takamasa045/status/1985174469053428146',
        date: '2025.11.03',
        imageUrl: '/images/matsumoto-ai-hackathon-plus.jpeg',
        technologies: ['Codex', 'Claude Code', 'MCP', 'ハッカソン', '松本', 'サザンガク']
      }
    ]
  }
];

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

export const Overlay: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAboutDetail, setShowAboutDetail] = useState(false);
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const scroll = useScroll();

  // Handler for showing About detail with scroll to top
  const handleShowAbout = () => {
    // Scroll to top BEFORE state change for immediate effect
    if (scroll.el) {
      scroll.el.scrollTo({ top: 0, behavior: 'instant' });
    }
    setShowAboutDetail(true);
  };

  // Also ensure scroll is at top when AboutDetail is shown
  useEffect(() => {
    if (showAboutDetail && scroll.el) {
      // Force scroll to top with requestAnimationFrame for next frame
      requestAnimationFrame(() => {
        if (scroll.el) {
          scroll.el.scrollTo({ top: 0, behavior: 'instant' });
        }
      });
    }
  }, [showAboutDetail, scroll.el]);

  // Handler for going back from About detail with scroll to top
  const handleBackFromAbout = () => {
    setShowAboutDetail(false);
    // Use multiple attempts to reset scroll position
    const resetScroll = () => {
      if (scroll.el) {
        scroll.el.scrollTop = 0;
        scroll.el.scrollTo({ top: 0, behavior: 'instant' });
      }
    };
    // Immediate reset
    resetScroll();
    // Delayed resets to catch after render
    setTimeout(resetScroll, 0);
    setTimeout(resetScroll, 100);
    setTimeout(resetScroll, 200);
  };

  // Show About Detail page
  if (showAboutDetail) {
    return (
      <div className="w-full text-[#e4e7e5]">
        <AnimatePresence mode="wait">
          <AboutDetail key="about-detail" onBack={handleBackFromAbout} />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full text-[#e4e7e5]">
      
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
          <div className="h-3/4 flex flex-row-reverse gap-8 select-none">
            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-bold vertical-text border-l border-white/10 pl-4 text-stone-100">
              伊藤貴將
            </motion.h1>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl text-stone-400 vertical-text mt-20">
              イトパン
            </motion.h2>
            <motion.div variants={fadeUp} className="text-sm md:text-base text-emerald-500/60 vertical-text mt-40 font-light tracking-widest">
              開発ト創造ノ間
            </motion.div>
          </div>

          {/* English/Modern Text */}
          <div className="absolute bottom-20 left-8 md:left-20">
            <motion.p variants={fadeUp} className="text-xs md:text-sm font-mono tracking-widest text-emerald-400 mb-2">
              // DEVELOPER & CREATOR
            </motion.p>
            <motion.div variants={fadeUp} className="text-lg md:text-xl font-light max-w-md leading-relaxed text-stone-300">
              Exploring the boundaries between<br />
              Nature, Spirit, and Generative AI.
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
          <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl mb-12 font-serif tracking-wide text-stone-200">
            開発とクリエイティブの境界を、<br/>生成AIでなめらかに溶かす。
          </motion.h3>

          <motion.div variants={fadeUp} className="text-sm md:text-lg leading-loose text-stone-300 font-light space-y-6 text-justify">
            <p>
              コード・デザイン・映像・体験── 領域を横断しながら、新しいモデルやツール、ワークフローを実際に手で確かめ、"欲しい世界観"をプロトタイプとして形にしていく。
            </p>
            <p>
              そうした"生成AI時代のものづくり"に向き合う姿勢と、自分が本当に使いたい技術・見てみたい世界観を選び抜いて試したアウトプットを静かにまとめた場所です。
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={handleShowAbout}
              className="inline-block px-8 py-3 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-200 transition-all duration-300 rounded-sm font-mono text-sm"
            >
              About / イトパンについて &rarr;
            </button>
          </motion.div>
        </motion.div>
      </Section>

      {/* WORKS / PROJECTS SECTION - Hierarchical View */}
      <Section className="justify-start pt-20 min-h-[120vh]">
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
                  Works / 制作
                </motion.h3>
                <motion.p variants={fadeUp} className="text-stone-500 text-sm mt-4 md:mt-0 font-light">
                  映像作品からSaasまで。
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {projects.map((project) => (
                  <RichProjectCard 
                    key={project.id} 
                    data={project} 
                    onClick={() => setSelectedProjectId(project.id)} 
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* DETAIL VIEW */
            <ProjectDetail 
              key="detail" 
              project={selectedProject!} 
              onBack={() => setSelectedProjectId(null)} 
            />
          )}
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
            <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">CONTACT</p>
            <h3 className="text-3xl md:text-5xl font-serif text-stone-200 mb-6">
              お仕事のご相談
            </h3>
            <p className="text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
              生成AIを活用したクリエイティブ制作、開発プロジェクト、イベント登壇など、<br className="hidden md:block" />
              お気軽にご相談ください。
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">01</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">映像制作</h4>
              <p className="text-stone-500 text-xs leading-relaxed">AI動画生成を活用したMV・プロモーション映像</p>
            </div>
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">02</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">開発支援</h4>
              <p className="text-stone-500 text-xs leading-relaxed">AIエージェント・MCP・ワークフロー構築</p>
            </div>
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">03</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">イベント登壇</h4>
              <p className="text-stone-500 text-xs leading-relaxed">生成AI活用の事例紹介・ハンズオン</p>
            </div>
            <div className="group bg-stone-950/40 border border-emerald-900/20 hover:border-emerald-500/40 rounded-sm p-6 transition-all duration-300">
              <span className="text-2xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">04</span>
              <h4 className="text-stone-200 font-serif mt-3 mb-2 group-hover:text-emerald-300 transition-colors">伴走支援</h4>
              <p className="text-stone-500 text-xs leading-relaxed">AI活用の壁打ち・導入サポート</p>
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
                <span className="text-emerald-400 font-mono text-xs tracking-widest">AVAILABLE FOR WORK</span>
              </div>

              <h4 className="text-2xl md:text-3xl font-serif text-stone-100 mb-4">
                まずはお気軽にご連絡ください
              </h4>
              <p className="text-stone-400 font-light mb-8 max-w-lg mx-auto">
                「まだぼんやりしているアイデア」や「そもそも何から始めればいいかわからない」といった段階からでも大丈夫です。
              </p>

              <a
                href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500/50 text-white transition-all duration-300 rounded-sm font-mono text-sm group"
              >
                <span>お問い合わせフォーム</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </motion.div>

          {/* Location & About Link */}
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-stone-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm">長野県北安曇郡・松本市を拠点に活動中</span>
            </div>
            <span className="hidden md:block text-stone-700">|</span>
            <button
              onClick={handleShowAbout}
              className="text-emerald-500 hover:text-emerald-300 text-sm font-mono tracking-wide transition-colors"
            >
              About / イトパンについて &rarr;
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div variants={fadeUp} className="text-center pt-8 border-t border-emerald-900/20">
            <p className="text-xs text-stone-700">
              &copy; 2025 Takamasa Ito. All rights reserved.
            </p>
          </motion.div>

        </motion.div>
      </Section>

    </div>
  );
};

// --- COMPONENT: LIST CARD (Collection Entry) ---
interface MediaItem {
  type: 'video' | 'image';
  url: string;
}

const RichProjectCard: React.FC<{ data: ProjectCollection; onClick: () => void }> = ({ data, onClick }) => {
  // Get all media (videos and images) from items, sorted by date (newest first)
  const mediaItems: MediaItem[] = [...data.items]
    .filter(item => item.videoUrl || item.imageUrl)
    .sort((a, b) => {
      const dateA = a.date || '0000.00';
      const dateB = b.date || '0000.00';
      return dateB.localeCompare(dateA);
    })
    .map(item => ({
      type: item.videoUrl ? 'video' : 'image' as 'video' | 'image',
      url: (item.videoUrl || item.imageUrl)!
    }));
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Cycle through media every 8 seconds
  useEffect(() => {
    if (mediaItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex(prev => (prev + 1) % mediaItems.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  const currentMedia = mediaItems[currentMediaIndex];

  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      className="group relative block bg-emerald-950/20 border border-emerald-900/30 overflow-hidden hover:border-emerald-500/50 transition-colors duration-500 h-80 rounded-sm cursor-pointer"
    >
      {/* Content Container */}
      <div className="absolute inset-0 p-6 z-10 flex flex-col justify-between bg-gradient-to-t from-[#020403] via-[#020403]/60 to-transparent opacity-90">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-sm px-3 py-1 border border-white/10 text-emerald-400 text-xs font-mono tracking-wider uppercase rounded-sm">
            {data.mainType}
          </div>
          {/* Media indicator dots */}
          {mediaItems.length > 1 && (
            <div className="flex gap-1.5">
              {mediaItems.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentMediaIndex ? 'bg-emerald-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="transform group-hover:translate-y-[-8px] transition-transform duration-500">
          <p className="text-emerald-300 text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {data.category}
          </p>
          <h4 className="text-2xl font-serif text-stone-100 mb-2 group-hover:text-white">{data.title}</h4>
          <p className="text-sm text-stone-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:text-stone-300">
            {data.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            VIEW COLLECTION <span className="text-lg">→</span>
          </div>
        </div>
      </div>

      {/* Media Preview Background - Show video or image if available */}
      {currentMedia ? (
        <div className="absolute inset-0 z-0">
          {currentMedia.type === 'video' ? (
            <video
              key={currentMedia.url}
              src={currentMedia.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            />
          ) : (
            <img
              key={currentMedia.url}
              src={currentMedia.url}
              alt=""
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
            />
          )}
        </div>
      ) : (
        <MediaBackground type={data.mainType} />
      )}
    </motion.div>
  );
};

// --- COMPONENT: DETAIL VIEW (Collection & Items) ---
const ProjectDetail: React.FC<{ project: ProjectCollection; onBack: () => void }> = ({ project, onBack }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={staggerContainer}
      className="w-full flex flex-col gap-12"
    >
       {/* Navigation Header */}
       <div className="flex justify-between items-center border-b border-emerald-900/50 pb-6">
         <motion.button 
           variants={fadeUp}
           onClick={onBack} 
           className="text-emerald-500 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono tracking-widest"
         >
            ← BACK TO ALL PROJECTS
         </motion.button>
         <motion.div variants={fadeUp} className="text-xs font-mono text-stone-600 hidden md:block">
           COLLECTION ID: {project.id.toUpperCase()}
         </motion.div>
       </div>

       {/* Collection Info Section */}
       <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <motion.div variants={fadeUp} className="w-full lg:w-2/3">
             <div className="flex items-center gap-4 mb-6">
                <span className="text-emerald-500 font-mono text-xs tracking-wider border border-emerald-500/30 px-2 py-1 rounded-sm uppercase">{project.category}</span>
                <span className="text-stone-500 font-mono text-xs">{project.year}</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-serif text-stone-100 mb-8 leading-tight">{project.title}</h2>
             
             <p className="text-stone-300 leading-loose font-light text-justify text-lg mb-8">
                {project.longDescription}
             </p>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full lg:w-1/3 flex flex-col justify-end pb-4">
             <h5 className="text-emerald-600 text-xs font-mono tracking-widest mb-4">TECHNOLOGIES</h5>
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
       <motion.div variants={fadeUp} className="mt-8">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-[1px] w-12 bg-emerald-500/50"></div>
             <h3 className="text-stone-200 font-serif text-xl">Collection Items / 収録コンテンツ</h3>
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
const ContentItemCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-stone-950/40 border border-emerald-900/30 hover:border-emerald-500/50 rounded-sm overflow-hidden group transition-all duration-300 flex flex-col"
    >
      {/* Visual Thumbnail Area */}
      <div className={`${item.videoUrl || item.imageUrl ? 'aspect-video' : 'h-48'} w-full relative overflow-hidden bg-black`}>
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            controls
            loop
            playsInline
            className="w-full h-full object-cover"
            poster=""
          />
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
             <h4 className="text-lg font-serif text-stone-200 group-hover:text-white transition-colors">{item.title}</h4>
             {item.date && <span className="text-[10px] text-stone-600 font-mono mt-1 whitespace-nowrap ml-2">{item.date}</span>}
          </div>
          <p className="text-sm text-stone-500 leading-relaxed mb-4 font-light whitespace-pre-line">{item.description}</p>

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
           VIEW CONTENT ↗
        </a>
      </div>
    </motion.div>
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

