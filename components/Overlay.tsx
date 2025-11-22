import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// Types for Project Data
type MediaType = 'video' | 'music' | 'web' | 'image';

// Individual Content Item (Child)
interface ContentItem {
  id: string;
  title: string;
  type: MediaType; // Can be different from the parent category
  description: string;
  link: string;
  date?: string;
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
    title: 'Flux & Flow',
    category: 'Generative Video Collection',
    mainType: 'video',
    description: 'Soraとモーショングラフィックスを融合させた、物理法則を超越する流体表現の実験記録。',
    longDescription: 'OpenAIのSoraが生成した物理法則を超越した流体シミュレーション映像をベースに、After Effectsでのポストプロセスを経て、日本の四季や感情の色彩を重ね合わせました。「移ろい」をテーマにしたループ映像集です。',
    technologies: ['Sora', 'After Effects', 'TouchDesigner', 'Runway Gen-2'],
    year: '2024',
    items: [
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
    title: 'Spirit Frequency',
    category: 'AI Ambient Music',
    mainType: 'music',
    description: 'Suno AIと自然音を調和させた、瞑想と集中力を高めるための音響作品集。',
    longDescription: '長野県内の実際の神社の風音や水音をフィールドレコーディングし、それらをプロンプトとしてSuno AIに入力。生成された旋律は、特定の周波数帯域（ソルフェジオ周波数）を意識して調整されています。',
    technologies: ['Suno AI', 'Logic Pro', 'Field Recording'],
    year: '2024',
    items: [
      {
        id: 'm1',
        title: 'Izumo / 出雲',
        type: 'music',
        description: '528Hz。深い森の中で神楽鈴が鳴り響くような、浄化のサウンドスケープ。',
        link: 'https://note.com/azumimusuhi',
        date: '2024.05'
      },
      {
        id: 'm2',
        title: 'Nagare / 流れ',
        type: 'music',
        description: '清流のせせらぎとピアノ生成AIのセッション。作業用BGM。',
        link: 'https://note.com/azumimusuhi',
        date: '2024.03'
      }
    ]
  },
  {
    id: 'p3',
    title: 'Musuhi Labs',
    category: 'Web & SaaS Prototypes',
    mainType: 'web',
    description: 'アニミズム思想をUI/UXに落とし込んだ、実験的アプリケーション開発の記録。',
    longDescription: '「道具には魂が宿る」というアニミズムの思想をシステムデザインに落とし込んだ実験室。LLMエージェントから業務効率化ツールまで、実際に動作するプロトタイプを公開しています。',
    technologies: ['React', 'LangChain', 'Gemini Pro', 'Three.js'],
    year: '2023-2024',
    items: [
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
    title: 'Kami-no-Mori',
    category: 'GenAI Art Series',
    mainType: 'image',
    description: 'Midjourney V6で描く、日本神話とサイバーパンクが交差する架空の風景画集。',
    longDescription: '古事記に登場する「神々の住まう森」が、もし遠未来のネオン街と融合していたら？という思考実験から生まれたビジュアルシリーズ。Midjourneyのパラメータ調整（--s, --w）を駆使しています。',
    technologies: ['Midjourney V6', 'Photoshop', 'Magnific AI'],
    year: '2024',
    items: [
      {
        id: 'i1',
        title: 'Neon Torii / ネオン鳥居',
        type: 'image',
        description: '雨のサイバーパンク都市に佇む、巨大な朱色の鳥居。',
        link: '#'
      },
      {
        id: 'i2',
        title: 'Cyber Miko / 電脳巫女',
        type: 'image',
        description: '回路基板の文様が入った白衣を纏う巫女のポートレート。',
        link: '#'
      },
      {
        id: 'i3',
        title: 'Sacred Beast / 神獣',
        type: 'image',
        description: '機械部品と有機的な毛並みが融合した狛犬のコンセプトアート。',
        link: '#'
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
  const selectedProject = projects.find(p => p.id === selectedProjectId);

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
            開発かクリエイティブか、<br/>その境界を溶かす。
          </motion.h3>
          
          <motion.div variants={fadeUp} className="text-sm md:text-lg leading-loose text-stone-300 font-light space-y-6 text-justify">
            <p>
              生成AIをハブに、コード・デザイン・映像・体験を行き来する。
              新しいモデル、新しいツール、新しいワークフローが次々と生まれ、
              開発とクリエイティブの境界がゆるく曖昧になっていく時代。
            </p>
            <p>
              このポートフォリオでは、そうした最先端の動きをキャッチしつつ、
              「自分が本当に使いたいツール」「自分が見てみたい世界観」を
              小さなプロジェクトとして試し、そのプロセスと結果を記録していきます。
            </p>
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
                  Projects / 実験
                </motion.h3>
                <motion.p variants={fadeUp} className="text-stone-500 text-sm mt-4 md:mt-0 font-light">
                  小さなプロトタイプから、実用的なアプリケーションまで。
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

      {/* ARTICLES SECTION */}
      <Section className="justify-start pt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full max-w-4xl mx-auto"
        >
          <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl font-serif mb-6 text-stone-200 border-b border-emerald-500/30 pb-4 inline-block">
            Articles <span className="text-lg md:text-xl ml-4 opacity-70">noteマガジン</span>
          </motion.h3>
          
          <motion.p variants={fadeUp} className="text-stone-400 mb-12 font-light">
            生成AIとアニミズム、技術と思想、創造と実践。<br className="hidden md:block" />様々な視点から綴る5つのマガジン。
          </motion.p>

          <div className="space-y-6">
            <MagazineItem 
              title="技術修行の記録帖" 
              desc="生成AI × 開発的アプローチの世界に飛び込み、ワークフロー構築や自動化の実践を通して得た気づきや学びを記録。"
            />
            <MagazineItem 
              title="むすひ言挙げ帖" 
              desc="X（旧Twitter）での投稿やスレッドをもとに、その背景や補足、関連する思想や資料などを深掘り。"
            />
            <MagazineItem 
              title="むすひ絵巻" 
              desc="日本の美意識を、生成AIで編むビジュアル記録帖。神話や自然霊といったスピリチュアルな世界観を表現。"
            />
            <MagazineItem 
              title="むすひ創造ノ術" 
              desc="プロンプト技法と制作の裏側を詰め込んだ実践マガジン。MidjourneyやSuno、Kamuiなどの活用術を解説。"
            />
            <MagazineItem 
              title="むすひの杜" 
              desc="アニミズムと生成AI、そのはざまで芽吹く思索たち。日本古来の感性と新たな創造の力を見つめ直す。"
            />
          </div>

          <motion.div variants={fadeUp} className="mt-12 text-center md:text-left">
            <a 
              href="https://note.com/azumimusuhi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-200 transition-all duration-300 rounded-sm font-mono text-sm"
            >
              noteで全ての記事を見る &rarr;
            </a>
          </motion.div>
        </motion.div>
      </Section>

      {/* CONTACT SECTION */}
      <Section className="items-center justify-center text-center md:text-left relative z-10 pb-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="w-full max-w-6xl mx-auto bg-emerald-950/40 backdrop-blur-md p-8 md:p-16 rounded-sm border border-emerald-900/30"
        >
           {/* Header */}
           <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl font-serif mb-12 text-stone-200 text-center md:text-left">
            Contact <span className="block md:inline text-base md:text-lg mt-2 md:mt-0 md:ml-4 opacity-60 font-sans font-light">お仕事のご相談・お問い合わせ</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left Col - Get in Touch */}
            <div className="space-y-10">
              <motion.div variants={fadeUp}>
                <h4 className="text-emerald-400 font-mono text-sm tracking-widest mb-6 border-l-2 border-emerald-500/50 pl-3">GET IN TOUCH</h4>
                <div className="space-y-8">
                  <div>
                    <p className="text-stone-300 font-serif text-lg">X (Twitter)</p>
                    <a href="https://twitter.com/takamasa045" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white transition-colors block text-xl font-light">@takamasa045</a>
                    <p className="text-xs text-stone-500 mt-1">DMでのご連絡を受け付けています</p>
                  </div>
                  <div>
                    <p className="text-stone-300 font-serif text-lg">note</p>
                    <a href="https://note.com/azumimusuhi" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white transition-colors block text-xl font-light">note.com/azumimusuhi</a>
                    <p className="text-xs text-stone-500 mt-1">記事・マガジンをご覧いただけます</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h4 className="text-emerald-400 font-mono text-sm tracking-widest mb-6 border-l-2 border-emerald-500/50 pl-3">LOCATION</h4>
                <p className="text-stone-200 text-xl font-serif">長野県北安曇郡</p>
                <p className="text-sm text-stone-400 mt-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  松本市で生成AIイベント開催中
                </p>
              </motion.div>
            </div>

            {/* Right Col - Work Request */}
            <div className="space-y-8">
              <motion.div variants={fadeUp}>
                <h4 className="text-emerald-400 font-mono text-sm tracking-widest mb-6 border-l-2 border-emerald-500/50 pl-3">WORK REQUEST</h4>
                <p className="text-stone-300 leading-relaxed mb-6 text-sm font-light">
                  生成AIを活用したクリエイティブ制作、開発プロジェクト、<br className="hidden lg:block"/>イベント登壇・ワークショップなど、お気軽にご相談ください。
                </p>
                <ul className="space-y-3 text-stone-200 mb-8 text-sm font-light">
                   <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">❖</span> 生成AI（画像・動画・音声）を使った制作</li>
                   <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">❖</span> Web開発・アプリケーション開発</li>
                   <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">❖</span> 生成AIに関する講演・ワークショップ</li>
                   <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">❖</span> 技術コンサルティング</li>
                </ul>

                <div className="flex flex-col gap-4">
                  <a 
                    href="https://twitter.com/messages/compose?recipient_id=takamasa045" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/50 text-stone-200 py-4 transition-all duration-300 rounded-sm hover:tracking-widest"
                  >
                    X (Twitter) でDMを送る
                  </a>
                  
                  <a 
                    href="https://docs.google.com/forms/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-stone-800/40 hover:bg-stone-700/60 border border-stone-600/50 text-stone-200 py-4 transition-all duration-300 rounded-sm hover:tracking-widest"
                  >
                    Googleフォームでお問い合わせ
                  </a>
                </div>
                
                <p className="text-[10px] text-stone-600 mt-3 text-center">
                  法人向けコンサルティングについては、X (Twitter) のDMよりお問い合わせください
                </p>
              </motion.div>
            </div>
          </div>

          {/* Footer in Contact Section */}
          <motion.div variants={fadeUp} className="mt-20 text-center pt-8 border-t border-emerald-900/30">
             <p className="text-xs text-stone-700">
              © 2024 Takamasa Ito. All rights reserved.
            </p>
          </motion.div>

        </motion.div>
      </Section>

    </div>
  );
};

// --- COMPONENT: LIST CARD (Collection Entry) ---
const RichProjectCard: React.FC<{ data: ProjectCollection; onClick: () => void }> = ({ data, onClick }) => {
  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      className="group relative block bg-emerald-950/20 border border-emerald-900/30 overflow-hidden hover:border-emerald-500/50 transition-colors duration-500 h-80 rounded-sm cursor-pointer"
    >
      {/* Content Container */}
      <div className="absolute inset-0 p-6 z-10 flex flex-col justify-between bg-gradient-to-t from-[#020403] via-transparent to-transparent opacity-90">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-sm px-3 py-1 border border-white/10 text-emerald-400 text-xs font-mono tracking-wider uppercase rounded-sm">
            {data.mainType}
          </div>
          <div className="text-stone-500 text-xs font-mono">{data.year}</div>
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

      {/* Media Preview Background */}
      <MediaBackground type={data.mainType} />
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
             {project.items.map((item) => (
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
      <div className="h-48 w-full relative overflow-hidden bg-black">
        <MediaBackground type={item.type} />
        {/* Type Badge */}
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 text-[10px] text-emerald-400 font-mono uppercase rounded-sm border border-white/5">
          {item.type}
        </div>
      </div>

      {/* Text Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
             <h4 className="text-lg font-serif text-stone-200 group-hover:text-white transition-colors">{item.title}</h4>
             {item.date && <span className="text-[10px] text-stone-600 font-mono mt-1">{item.date}</span>}
          </div>
          <p className="text-sm text-stone-500 leading-relaxed mb-6 font-light">{item.description}</p>
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
    </div>
  );
};

const MagazineItem: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <motion.div 
      variants={fadeUp}
      className="border-l-2 border-stone-800 hover:border-emerald-500 pl-6 py-2 transition-colors duration-300 group cursor-pointer"
    >
      <h4 className="text-xl text-stone-200 font-serif mb-2 group-hover:text-emerald-300 transition-colors">{title}</h4>
      <p className="text-stone-500 text-sm leading-relaxed group-hover:text-stone-400 transition-colors">{desc}</p>
    </motion.div>
  );
};