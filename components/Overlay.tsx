import React from 'react';
import { motion, Variants } from 'framer-motion';

// Section Wrapper
const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <section className={`min-h-screen w-full flex flex-col justify-center p-8 md:p-20 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export const Overlay: React.FC = () => {
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

      {/* WORKS SECTION */}
      <Section className="justify-start pt-20">
        <motion.h3 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-serif mb-16 border-b border-emerald-500/30 pb-4 inline-block w-auto self-start text-stone-200"
        >
          Projects / 実験
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Project Card 1 */}
          <ProjectCard 
            title="Zen & AI" 
            category="Generative Video"
            desc="Sora rendering combined with traditional ink wash styles."
            idx={1}
          />
           {/* Project Card 2 */}
           <ProjectCard 
            title="Mountain Echo" 
            category="Interactive WebGL"
            desc="R3F landscape generated from audio input frequencies."
            idx={2}
          />
           {/* Project Card 3 */}
           <ProjectCard 
            title="Spirit Code" 
            category="LLM Agent"
            desc="An experimental coding partner with a spiritual personality."
            idx={3}
          />
        </div>
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
                  
                  {/* Google Form Button - Replace the href with your actual Google Form URL */}
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

const ProjectCard: React.FC<{ title: string; category: string; desc: string; idx: number }> = ({ title, category, desc, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.2 }}
      viewport={{ once: true }}
      className="group relative bg-emerald-950/20 border border-emerald-900/30 p-6 hover:bg-emerald-900/30 transition-all duration-500 cursor-pointer h-64 flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 p-2 text-xs text-stone-600 font-mono">0{idx}</div>
      
      <div className="mt-auto">
        <p className="text-emerald-400 text-xs font-mono mb-2 tracking-wider uppercase">{category}</p>
        <h4 className="text-2xl font-serif mb-2 text-stone-200 group-hover:translate-x-2 transition-transform duration-300">{title}</h4>
        <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
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