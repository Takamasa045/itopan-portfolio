import React from 'react';
import { motion, Variants } from 'framer-motion';

// Lightweight animations for snappy page transitions
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

interface AboutDetailProps {
  onBack: () => void;
}

export const AboutDetail: React.FC<AboutDetailProps> = ({ onBack }) => {
  // Scroll is handled by parent component using drei's useScroll

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={quickStagger}
      className="w-full min-h-screen"
    >
      {/* Fixed Back Button - Top Left */}
      <motion.div
        variants={quickFade}
        className="fixed top-6 left-6 z-50"
      >
        <button
          onClick={onBack}
          className="group text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono tracking-widest bg-emerald-950/60 hover:bg-emerald-900/60 backdrop-blur-md px-5 py-3 rounded-md border-2 border-emerald-700/50 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>BACK</span>
        </button>
      </motion.div>

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
          <span>BACK</span>
        </button>
      </motion.div>

      {/* Hero Section - Full viewport */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 max-w-6xl mx-auto">
        <motion.div variants={quickFade}>
          <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">ABOUT</p>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-100 mb-6 leading-tight">
            イトパンについて
          </h1>
        </motion.div>

        <motion.div variants={quickFade} className="max-w-3xl">
          <p className="text-xl md:text-2xl text-stone-300 leading-relaxed font-light mb-8">
            生成AI時代の制作を、<br />
            設計して実装する。<br />
            コード/デザイン/映像を横断して、<br />
            仕組みまでつくる。<br />
            <span className="text-emerald-400 font-normal">伊藤貴將（いとうたかまさ）／イトパン</span>です。
          </p>
          <p className="text-base md:text-lg text-stone-500 leading-relaxed font-light">
            長野・北アルプス山麓を拠点に、<br />
            コード／デザイン／映像／文章／体験設計を行き来しながら、<br />
            生成AIを前提にしたものづくりとワークフローの設計に取り組んでいます。
          </p>
        </motion.div>

        <motion.div variants={quickFade} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm">長野県北安曇郡</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/takamasa045"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-stone-900/80 border border-stone-700 hover:border-emerald-500/70 hover:bg-emerald-950/50 rounded-sm transition-all duration-300"
            >
              <svg className="w-5 h-5 text-stone-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm text-stone-300 group-hover:text-emerald-400 font-mono tracking-wide transition-colors">X / Twitter</span>
            </a>
            <a
              href="https://note.com/azumimusuhi"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-stone-900/80 border border-stone-700 hover:border-emerald-500/70 hover:bg-emerald-950/50 rounded-sm transition-all duration-300"
            >
              <svg className="w-5 h-5 text-stone-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span className="text-sm text-stone-300 group-hover:text-emerald-400 font-mono tracking-wide transition-colors">note</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-8 md:px-20 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={quickFade} className="mb-20 text-center">
            <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">VISION</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-200">日本のソフトパワーを未来へ</h2>
          </motion.div>

          <motion.div variants={quickFade} className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed font-light">
              関心の中心にあるのは、日本の土地や文化が内包してきた「ソフトパワー」。
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light">
              北アルプス山麓に残る地名の由来、史料、暮らしの中に息づく習慣。
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light">
              縄文から積み重なってきた土地の層や、安曇氏の系譜のような断片にも目を向け、資料にあたり、現地を歩きながら、手触りのある情報を少しずつ集めています。
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light">
              そうした断片を生成AIで整理・再編集し、物語、デザイン、映像、体験へと翻訳し直すことで、現代に通用するコンテンツとして立ち上げていきます。
            </p>
            <p className="text-base md:text-lg text-stone-300 leading-relaxed font-light bg-emerald-950/30 p-8 rounded-sm border border-emerald-900/30">
              また、その過程で生まれる<br />
              「どう編集し、どう接続し、どう発信するか」という方法論そのものも含めて、<br />
              日本のソフトパワーを未来へつなぐ実践として発信しています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-20 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={quickFade} className="mb-20 text-center">
            <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">PHILOSOPHY</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-200">私の考え方</h2>
          </motion.div>

          <div className="space-y-24">
            {/* Philosophy 1 */}
            <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-8xl font-serif text-emerald-900/50">01</span>
                <h3 className="text-xl md:text-2xl text-stone-200 font-serif mt-4 leading-relaxed">
                  身銭と時間をつぎ込んで見えてきた<br />「自分なりのAI」
                </h3>
              </div>
              <div className="lg:col-span-8 text-stone-400 leading-loose font-light space-y-6">
                <p>
                  2022年から画像生成AI、2024年は動画生成、2025年はAIエージェント／MCP・ワークフローに注力してきました。
                  新しいモデルやツールが出るたびに自腹で試し続け、仕事以外の多くの時間をAIの検証と実験に注いできました。
                </p>
                <div className="bg-stone-900/30 border-l-2 border-emerald-500/50 p-6">
                  <ul className="space-y-2 text-stone-300">
                    <li>このモデルはどこまで使えるか</li>
                    <li>どこがまだ厳しいのか</li>
                    <li>現場で気持ちよく回る組み合わせは何か</li>
                  </ul>
                </div>
                <p>
                  それを自分の手で確かめ続けてきた結果、お仕事になる案件が少しずつ増えてきています。
                </p>
                <p className="text-stone-200 text-lg bg-emerald-950/30 p-6 rounded-sm border border-emerald-900/30">
                  その人・そのチームにとって、どんなAIの使い方がしっくりくるのか。<br />
                  <span className="text-emerald-400">それぞれの「自分なりのAI活用スタイル」</span>を一緒に見つけていく伴走役でありたいと思っています。
                </p>
              </div>
            </motion.div>

            {/* Philosophy 2 */}
            <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-8xl font-serif text-emerald-900/50">02</span>
                <h3 className="text-xl md:text-2xl text-stone-200 font-serif mt-4 leading-relaxed">
                  開発とクリエイティブのあいだを、<br />行き来しやすくする
                </h3>
              </div>
              <div className="lg:col-span-8 text-stone-400 leading-loose font-light space-y-6">
                <p>
                  エンジニアだけ、デザイナーだけ、ではなく、
                  コードも、デザインも、映像も、テキストも、ゆるくまたいで触っていける状態をつくることに関心があります。
                </p>
                <div className="bg-stone-900/30 border-l-2 border-emerald-500/50 p-6">
                  <ul className="space-y-2 text-stone-300">
                    <li>「技術はわからないけど、世界観はある」</li>
                    <li>「コードは書けるけど、表現のアイデアが浮かびにくい」</li>
                  </ul>
                </div>
                <p>
                  そんな人たちが、生成AIを入口に両側へ踏み出せるような橋渡しをしていきたい。
                </p>
                <p className="text-stone-200">
                  プロのエンジニア／クリエイターだけのものにせず、<br />
                  <span className="text-emerald-400">"半歩ずつまたいでいける環境"と"回し方の型"</span>をつくる。
                </p>
              </div>
            </motion.div>

            {/* Philosophy 3 */}
            <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-8xl font-serif text-emerald-900/50">03</span>
                <h3 className="text-xl md:text-2xl text-stone-200 font-serif mt-4 leading-relaxed">
                  AIの「これからの使い方」を<br />一緒にデザインする
                </h3>
              </div>
              <div className="lg:col-span-8 text-stone-400 leading-loose font-light space-y-6">
                <p>
                  AIを「効率化ツール」として線を引いてしまうのではなく、
                  これから自分たちは、AIとどう付き合っていくのか。
                  どんな仕事の仕方・表現の仕方があり得るのか。
                </p>
                <p>
                  それを一緒に考え、言語化し、具体的な形に落としていく相棒だと捉えています。
                </p>
                <div className="bg-stone-900/30 border-l-2 border-emerald-500/50 p-6">
                  <p className="text-stone-300 mb-4">ヒアリングと対話を通して：</p>
                  <ul className="space-y-2 text-stone-300">
                    <li>どんなタスクをAIに任せるか</li>
                    <li>どこから先は人がやるのか</li>
                    <li>どんな未来の働き方・表現を目指したいのか</li>
                  </ul>
                </div>
                <p>
                  <span className="text-emerald-400">その人／そのチームに合った「これからのAIの使い方」</span>を一緒にデザインしていきます。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Contact Combined Section */}
      <section className="py-32 px-8 md:px-20 bg-gradient-to-b from-transparent to-emerald-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={quickFade} className="mb-20 text-center">
            <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">SERVICES & CONTACT</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-200 mb-6">お手伝いできること</h2>
            <p className="text-stone-500 font-light max-w-2xl mx-auto">
              例えば、こんなテーマでご一緒できます。
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div variants={quickFade} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <ServiceCard
              icon="01"
              title="生成AI × 映像・Web・体験のプロトタイプ"
              description="Webサイト／画像／動画／音楽モデルを組み合わせた制作"
            />
            <ServiceCard
              icon="02"
              title="ワークフロー設計"
              description="制作フローや業務フローに生成AIを組み込む"
            />
            <ServiceCard
              icon="03"
              title="AIエージェント相談・設計"
              description="AIエージェントを使ってみたい／どんなことができるか知りたい方向け"
            />
            <ServiceCard
              icon="04"
              title="アイデアの壁打ち・検証プランづくり"
              description="「こういうこと、AIでできる？」といったラフなアイデアの検証"
            />
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={quickFade} className="bg-emerald-950/30 backdrop-blur-sm border border-emerald-900/30 rounded-sm p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif text-stone-200 mb-6">お仕事・コラボのご相談</h3>
                <ul className="space-y-3 text-stone-400 font-light mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">&#10003;</span>
                    AIエージェントやマルチモーダルな生成AIを試してみたい
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">&#10003;</span>
                    自社・自分の活動に、どんなAI活用の余地があるのか整理したい
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">&#10003;</span>
                    小さく検証できるプロジェクトから、一緒に組み立ててほしい
                  </li>
                </ul>
                <p className="text-stone-500 text-sm font-light">
                  「まだぼんやりしているアイデア」や「そもそも何から始めればいいかわからない」といった段階からでも大丈夫です。
                  お気軽にご連絡ください。📩
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-stone-300 font-light mb-6 text-center lg:text-left">
                  お気軽にご連絡ください
                </p>
                <div className="space-y-4">
                  <a
                    href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/50 text-stone-200 transition-all duration-300 rounded-sm group"
                  >
                    <span className="text-emerald-400 group-hover:text-white transition-colors">お問い合わせフォーム</span>
                    <span className="text-stone-500 text-sm">&rarr;</span>
                  </a>

                  {/* Social Links */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href="https://x.com/takamasa045"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-900/60 border border-stone-700 hover:border-emerald-500/70 hover:bg-emerald-950/50 rounded-sm transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-sm text-stone-400 group-hover:text-emerald-400 font-mono transition-colors">X</span>
                    </a>
                    <a
                      href="https://note.com/azumimusuhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-900/60 border border-stone-700 hover:border-emerald-500/70 hover:bg-emerald-950/50 rounded-sm transition-all duration-300"
                    >
                      <svg className="w-5 h-5 text-stone-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                      </svg>
                      <span className="text-sm text-stone-400 group-hover:text-emerald-400 font-mono transition-colors">note</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Back to Home */}
      <section className="py-20 px-8 md:px-20">
        <motion.div variants={quickFade} className="max-w-6xl mx-auto text-center">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-950/40 hover:bg-emerald-900/60 border-2 border-emerald-700/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 transition-all duration-300 rounded-md font-mono text-sm shadow-lg hover:shadow-emerald-500/20"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>BACK TO HOME</span>
          </button>
          <p className="text-stone-700 text-xs mt-8">
            &copy; 2025 Takamasa Ito / ITOPAN
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
};

const ServiceCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="group bg-stone-950/40 border border-emerald-900/30 hover:border-emerald-500/50 rounded-sm p-8 transition-all duration-300 hover:bg-emerald-950/20">
      <span className="text-3xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">{icon}</span>
      <h3 className="text-lg text-stone-200 font-serif mt-4 mb-3 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-stone-500 font-light group-hover:text-stone-400 transition-colors">{description}</p>
    </div>
  );
};

export default AboutDetail;
