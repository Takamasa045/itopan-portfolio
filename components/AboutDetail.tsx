import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

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
  onPagesChange?: (pages: number) => void;
}

export const AboutDetail: React.FC<AboutDetailProps> = ({ onBack, onPagesChange }) => {
  // Scroll is handled by parent component using drei's useScroll
  const { language } = useLanguage();
  const contentRef = useRef<HTMLElement | null>(null);
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);

  useEffect(() => {
    if (!onPagesChange) return;
    const node = contentRef.current;
    if (!node) return;

    const updatePages = () => {
      const height = node.scrollHeight;
      const viewport = window.innerHeight || 1;
      const pages = Math.max(1, height / viewport);
      onPagesChange(pages);
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
      onPagesChange(0);
    };
  }, [language, onPagesChange]);

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={quickStagger}
      className="w-full min-h-screen"
      ref={contentRef}
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
          <span>{getText('戻る', 'Back')}</span>
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
          <span>{getText('戻る', 'Back')}</span>
        </button>
      </motion.div>

      {/* Hero Section - Full viewport */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 max-w-6xl mx-auto">
        <motion.div variants={quickFade}>
          <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">
            {getText('ABOUT / イトパンについて', 'ABOUT / ITOPAN')}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-100 mb-6 leading-tight">
            {getText('イトパンについて', 'About')}
          </h1>
        </motion.div>

        <motion.div variants={quickFade} className="max-w-3xl">
          <p className="text-xl md:text-2xl text-stone-300 leading-relaxed font-light mb-8">
            {getText(
              <>
                <span className="inline-block">生成AI時代の制作を、</span>
                <br className="hidden md:block" />
                <span className="inline-block">設計して実装する。</span>
                <br className="hidden md:block" />
                <span className="inline-block">コード/デザイン/映像を横断して、</span>
                <br className="hidden md:block" />
                <span className="inline-block">仕組みまでつくる。</span>
                <span className="text-emerald-400 font-normal">伊藤貴將（いとうたかまさ）／イトパン</span>です。
              </>,
              <>
                <span className="inline-block">Design and implement production in the AI era.</span>
                <br className="hidden md:block" />
                <span className="inline-block">Across code, design, and film,</span>
                <br className="hidden md:block" />
                <span className="inline-block">build the system itself.</span>
                <span className="text-emerald-400 font-normal"> I’m Takamasa Ito / ITOPAN.</span>
              </>
            )}
          </p>
          <p className="text-base md:text-lg text-stone-500 leading-relaxed font-light">
            {getText(
              <>
                長野・北アルプス山麓を拠点に、<br />
                コード／デザイン／映像／文章／体験設計を行き来しながら、<br />
                生成AIを前提にしたものづくりとワークフローの設計に取り組んでいます。
              </>,
              <>
                Based in Nagano at the foot of the Northern Alps,<br />
                I move across code, design, film, writing, and experience design,<br />
                building and designing workflows with generative AI as a given.
              </>
            )}
          </p>
        </motion.div>

        <motion.div variants={quickFade} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm">{getText('長野県北安曇郡', 'Kitaazumi-gun, Nagano')}</span>
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
            <h2 className="text-3xl md:text-5xl font-serif text-stone-200">
              {getText('日本のソフトパワーを未来へ', 'Carrying Japan’s Soft Power Forward')}
            </h2>
          </motion.div>

          <motion.div variants={quickFade} className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-stone-300 leading-relaxed font-light">
              {getText(
                '関心の中心にあるのは、日本の土地や文化が内包してきた「ソフトパワー」。',
                'At the center of my interest is the “soft power” embedded in Japanese land and culture.'
              )}
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light">
              {getText(
                '北アルプス山麓に残る地名の由来、史料、暮らしの中に息づく習慣。',
                'Origins of place names in the Northern Alps, historical records, and customs living in daily life.'
              )}
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light">
              {getText(
                '縄文から積み重なってきた土地の層や、安曇氏の系譜のような断片にも目を向け、資料にあたり、現地を歩きながら、手触りのある情報を少しずつ集めています。',
                'I look at layers of land accumulated since the Jomon period and fragments like the Azumi lineage—consulting sources, walking the land, and gathering tactile information piece by piece.'
              )}
            </p>
            <p className="text-base md:text-lg text-stone-400 leading-relaxed font-light">
              {getText(
                'そうした断片を生成AIで整理・再編集し、物語、デザイン、映像、体験へと翻訳し直すことで、現代に通用するコンテンツとして立ち上げていきます。',
                'By organizing and re-editing those fragments with generative AI, I translate them into stories, design, film, and experiences that can stand in the present.'
              )}
            </p>
            <p className="text-base md:text-lg text-stone-300 leading-relaxed font-light bg-emerald-950/30 p-8 rounded-sm border border-emerald-900/30">
              {getText(
                <>
                  また、その過程で生まれる<br />
                  「どう編集し、どう接続し、どう発信するか」という方法論そのものも含めて、<br />
                  日本のソフトパワーを未来へつなぐ実践として発信しています。
                </>,
                <>
                  I also share the methodologies born in that process—<br />
                  how to edit, connect, and communicate—<br />
                  as practices that carry Japan’s soft power into the future.
                </>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-20 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={quickFade} className="mb-20 text-center">
            <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">PHILOSOPHY</p>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-200">
              {getText('私の考え方', 'My Philosophy')}
            </h2>
          </motion.div>

          <div className="space-y-24">
            {/* Philosophy 1 */}
            <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-8xl font-serif text-emerald-900/50">01</span>
                <h3 className="text-xl md:text-2xl text-stone-200 font-serif mt-4 leading-relaxed">
                  {getText(
                    <>
                      身銭と時間をつぎ込んで見えてきた<br />「自分なりのAI」
                    </>,
                    <>
                      Discovering “my own AI”<br />through time and money invested
                    </>
                  )}
                </h3>
              </div>
              <div className="lg:col-span-8 text-stone-400 leading-loose font-light space-y-6">
                <p>
                  {getText(
                    <>
                      2022年から画像生成AI、2024年は動画生成、そして2025年はAIエージェント/MCP・ワークフローに注力してきました。<br />
                      新しいモデルやツールが出るたびに身銭を切って試し、仕事以外の時間もAIの検証と実験に注いできました。
                    </>,
                    <>
                      Since 2022 I focused on image generation AI, in 2024 on video generation, and in 2025 on AI agents/MCP and workflows.<br />
                      Each new model or tool, I paid out of pocket to test, and spent my own time validating and experimenting with AI.
                    </>
                  )}
                </p>
                <div className="bg-stone-900/30 border-l-2 border-emerald-500/50 p-6">
                  <ul className="space-y-2 text-stone-300">
                    <li>{getText('「このモデルはどこまで使えるのか」', '“How far can this model go?”')}</li>
                    <li>{getText('「どこがまだ厳しいのか」', '“Where is it still rough?”')}</li>
                    <li>{getText('「現場で気持ちよく回る組み合わせは何か」', '“What combination works smoothly in the field?”')}</li>
                  </ul>
                </div>
                <p>
                  {getText(
                    'それを自分の手で確かめ続けてきた結果、仕事としての相談や案件も増えてきました。',
                    'By verifying it myself, consultations and projects as work have increased.'
                  )}
                </p>
                <p className="text-stone-200 text-lg bg-emerald-950/30 p-6 rounded-sm border border-emerald-900/30">
                  {getText(
                    <>
                      大事にしたいのは、“正解のAI活用”を押しつけることではなく、<br />
                      その人・そのチームにとってしっくりくる使い方を一緒に見つけること。<br />
                      <span className="text-emerald-400">それぞれの「自分なりのAI活用スタイル」</span>を育てていく伴走役でありたいと思っています。
                    </>,
                    <>
                      What matters isn’t imposing a “correct” way to use AI,<br />
                      but finding what truly fits each person or team together.<br />
                      I want to be a partner who helps grow each <span className="text-emerald-400">“personal AI usage style.”</span>
                    </>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Philosophy 2 */}
            <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-8xl font-serif text-emerald-900/50">02</span>
                <h3 className="text-xl md:text-2xl text-stone-200 font-serif mt-4 leading-relaxed">
                  {getText(
                    <>
                      開発とクリエイティブのあいだを、<br />行き来しやすくする
                    </>,
                    <>
                      Make it easier to move between<br />development and creativity
                    </>
                  )}
                </h3>
              </div>
              <div className="lg:col-span-8 text-stone-400 leading-loose font-light space-y-6">
                <p>
                  {getText(
                    'エンジニアだけ、デザイナーだけ、ではなく、コードも、デザインも、映像も、テキストも、ゆるくまたいで触っていける状態をつくることに関心があります。',
                    'I’m interested in creating a state where it’s not just engineers or just designers—where you can loosely cross over code, design, film, and text.'
                  )}
                </p>
                <div className="bg-stone-900/30 border-l-2 border-emerald-500/50 p-6">
                  <ul className="space-y-2 text-stone-300">
                    <li>{getText('「技術はわからないけど、世界観はある」', '“I don’t know the tech, but I have a vision.”')}</li>
                    <li>{getText('「コードは書けるけど、表現のアイデアが浮かびにくい」', '“I can code, but expression ideas don’t come easily.”')}</li>
                  </ul>
                </div>
                <p>
                  {getText(
                    'そんな人たちが、生成AIを入口に両側へ踏み出せるような橋渡しをしていきたい。',
                    'I want to be a bridge so those people can step to both sides with generative AI as the entry point.'
                  )}
                </p>
                <p className="text-stone-200">
                  {getText(
                    <>
                      プロのエンジニア／クリエイターだけのものにせず、<br />
                      <span className="text-emerald-400">"半歩ずつまたいでいける環境"と"回し方の型"</span>をつくる。
                    </>,
                    <>
                      Not only for professional engineers/creators,<br />
                      build <span className="text-emerald-400">an environment to step across in half-steps</span> and repeatable operating patterns.
                    </>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Philosophy 3 */}
            <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <span className="text-6xl md:text-8xl font-serif text-emerald-900/50">03</span>
                <h3 className="text-xl md:text-2xl text-stone-200 font-serif mt-4 leading-relaxed">
                  {getText(
                    <>
                      AIの「これからの使い方」を<br />一緒にデザインする
                    </>,
                    <>
                      Designing the future ways<br />of using AI together
                    </>
                  )}
                </h3>
              </div>
              <div className="lg:col-span-8 text-stone-400 leading-loose font-light space-y-6">
                <p>
                  {getText(
                    'AIを「効率化ツール」として線を引いてしまうのではなく、これから自分たちは、AIとどう付き合っていくのか。どんな仕事の仕方・表現の仕方があり得るのか。',
                    'Rather than drawing a line and calling AI just an efficiency tool, how will we live and work with AI from here? What ways of working and expression are possible?'
                  )}
                </p>
                <p>
                  {getText(
                    'それを一緒に考え、言語化し、具体的な形に落としていく相棒だと捉えています。',
                    'I see myself as a partner who thinks it through with you, puts it into words, and shapes it into concrete form.'
                  )}
                </p>
                <div className="bg-stone-900/30 border-l-2 border-emerald-500/50 p-6">
                  <p className="text-stone-300 mb-4">
                    {getText('ヒアリングと対話を通して：', 'Through interviews and dialogue:')}
                  </p>
                  <ul className="space-y-2 text-stone-300">
                    <li>{getText('どんなタスクをAIに任せるか', 'Which tasks to delegate to AI')}</li>
                    <li>{getText('どこから先は人がやるのか', 'Where humans should take over')}</li>
                    <li>{getText('どんな未来の働き方・表現を目指したいのか', 'What future ways of working/expression to aim for')}</li>
                  </ul>
                </div>
                <p>
                  {getText(
                    <>
                      <span className="text-emerald-400">その人／そのチームに合った「これからのAIの使い方」</span>を一緒にデザインしていきます。
                    </>,
                    <>
                      <span className="text-emerald-400">We design the future way of using AI that fits each person or team.</span>
                    </>
                  )}
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
            <h2 className="text-3xl md:text-5xl font-serif text-stone-200 mb-6">
              {getText('お手伝いできること', 'How I Can Help')}
            </h2>
            <p className="text-stone-500 font-light max-w-2xl mx-auto">
              {getText('例えば、こんなテーマでご一緒できます。', 'For example, we can work together on themes like these.')}
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div variants={quickFade} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <ServiceCard
              icon="01"
              title={getText('生成AI × 映像・Web・体験のプロトタイプ', 'GenAI × Film/Web/Experience Prototypes')}
              description={getText('Webサイト／画像／動画／音楽モデルを組み合わせた制作', 'Production combining web, images, video, and music models')}
            />
            <ServiceCard
              icon="02"
              title={getText('ワークフロー設計', 'Workflow Design')}
              description={getText('制作フローや業務フローに生成AIを組み込む', 'Embed GenAI into production or business workflows')}
            />
            <ServiceCard
              icon="03"
              title={getText('AIエージェント相談・設計', 'AI Agent Consultation & Design')}
              description={getText('AIエージェントを使ってみたい／どんなことができるか知りたい方向け', 'For those who want to try AI agents or understand what’s possible')}
            />
            <ServiceCard
              icon="04"
              title={getText('アイデアの壁打ち・検証プランづくり', 'Idea Jam & Validation Plan')}
              description={getText('「こういうこと、AIでできる？」といったラフなアイデアの検証', 'Validate rough ideas like “Can AI do this?”')}
            />
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={quickFade} className="bg-emerald-950/30 backdrop-blur-sm border border-emerald-900/30 rounded-sm p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-serif text-stone-200 mb-6">
                  {getText('お仕事・コラボのご相談', 'Work & Collaboration Inquiries')}
                </h3>
                <ul className="space-y-3 text-stone-400 font-light mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">&#10003;</span>
                    {getText('AIエージェントやマルチモーダルな生成AIを試してみたい', 'Want to try AI agents or multimodal generative AI')}
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">&#10003;</span>
                    {getText('自社・自分の活動に、どんなAI活用の余地があるのか整理したい', 'Want to clarify where AI could help in your company or work')}
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1">&#10003;</span>
                    {getText('小さく検証できるプロジェクトから、一緒に組み立ててほしい', 'Want to build starting from a small, testable project')}
                  </li>
                </ul>
                <p className="text-stone-500 text-sm font-light">
                  {getText(
                    <>
                      「まだぼんやりしているアイデア」や「そもそも何から始めればいいかわからない」といった段階からでも大丈夫です。
                      お気軽にご連絡ください。📩
                    </>,
                    <>
                      It’s totally fine to start with a vague idea or not knowing where to begin.
                      Feel free to reach out. 📩
                    </>
                  )}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-stone-300 font-light mb-6 text-center lg:text-left">
                  {getText('お気軽にご連絡ください', 'Feel free to reach out')}
                </p>
                <div className="space-y-4">
                  <a
                    href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-700/50 text-stone-200 transition-all duration-300 rounded-sm group"
                  >
                    <span className="text-emerald-400 group-hover:text-white transition-colors">
                      {getText('お問い合わせフォーム', 'Contact form')}
                    </span>
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
      <footer className="py-20 px-8 md:px-20">
        <motion.div variants={quickFade} className="max-w-6xl mx-auto text-center">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-950/40 hover:bg-emerald-900/60 border-2 border-emerald-700/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 transition-all duration-300 rounded-md font-mono text-sm shadow-lg hover:shadow-emerald-500/20"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{getText('ホームに戻る', 'Back to home')}</span>
          </button>
          <p className="text-stone-700 text-xs mt-8">
            &copy; 2025 Takamasa Ito / ITOPAN
          </p>
        </motion.div>
      </footer>
    </motion.main>
  );
};

const ServiceCard: React.FC<{ icon: string; title: React.ReactNode; description: React.ReactNode }> = ({ icon, title, description }) => {
  return (
    <div className="group bg-stone-950/40 border border-emerald-900/30 hover:border-emerald-500/50 rounded-sm p-8 transition-all duration-300 hover:bg-emerald-950/20">
      <span className="text-3xl font-serif text-emerald-900/50 group-hover:text-emerald-700/50 transition-colors">{icon}</span>
      <h3 className="text-lg text-stone-200 font-serif mt-4 mb-3 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-stone-500 font-light group-hover:text-stone-400 transition-colors">{description}</p>
    </div>
  );
};

export default AboutDetail;
