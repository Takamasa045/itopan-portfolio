import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const card: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

export const WebcaLP: React.FC = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const getText = (ja: React.ReactNode, en: React.ReactNode) => (isEnglish ? en : ja);

  return (
    <main className="w-full">
      {/* HERO */}
      <header className="pt-28 pb-20 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">
              {getText('WEBCA / ウェブカ', 'WEBCA')}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif text-stone-100 mb-6 leading-tight">
              {getText('渡した瞬間、あなたが伝わる。', 'A gateway that conveys you—instantly.')}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-stone-400 font-light max-w-2xl text-lg leading-relaxed">
              {getText(
                <>
                  Webca（ウェブカ）は、Webサイト＋名刺をひとつの導線として設計するプランです。<br />
                  プロフィール・活動内容に加えて、趣味や推しの空気感まで一枚に整理して、名刺QRの着地点を「迷わない入口」にします。
                </>,
                <>
                  Webca is a plan that designs your website and business card as one flow.<br />
                  We unify your profile, activities, and even your hobbies or favorites into one page—so your business card QR lands on a clear entry.
                </>
              )}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/webca/"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent hover:bg-emerald-950/30 border border-emerald-700/50 hover:border-emerald-500 text-emerald-400 transition-all duration-300 rounded-sm font-mono text-sm"
              >
                <span>{getText('詳細を見る', 'See details')}</span>
                <span className="opacity-70">&rarr;</span>
              </a>
              <a
                href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-emerald-600/80 hover:bg-emerald-500 border border-emerald-500/50 text-white transition-all duration-300 rounded-sm font-mono text-sm group"
              >
                <span>{getText('お申し込み・ご相談', 'Apply / Consult')}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 text-stone-600 text-xs">
              {getText('※プラン・料金・FAQは詳細ページに掲載しています。', '*Plans, pricing, and FAQ are on the details page.')}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* VALUE */}
      <section className="py-16 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-serif text-stone-100 mb-10">
              {getText('Webcaで整う3つのこと', '3 things Webca clarifies')}
            </motion.h2>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={card} className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-7 hover:border-emerald-500/30 transition-colors">
                <p className="text-emerald-500/70 font-mono text-xs tracking-widest mb-3">01</p>
                <h3 className="text-lg font-serif text-stone-100 mb-3">
                  {getText('入口（見せ方）', 'Your entry (how you show up)')}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {getText('渡した瞬間に「何をしている人か」が伝わる構成へ。', 'A structure that explains who you are at a glance.')}
                </p>
              </motion.div>

              <motion.div variants={card} className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-7 hover:border-emerald-500/30 transition-colors">
                <p className="text-emerald-500/70 font-mono text-xs tracking-widest mb-3">02</p>
                <h3 className="text-lg font-serif text-stone-100 mb-3">
                  {getText('導線（名刺QR）', 'Your flow (business card QR)')}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {getText('名刺→Web→次のアクションまで迷わない動線に。', 'A QR flow that leads to the next action without confusion.')}
                </p>
              </motion.div>

              <motion.div variants={card} className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-7 hover:border-emerald-500/30 transition-colors">
                <p className="text-emerald-500/70 font-mono text-xs tracking-widest mb-3">03</p>
                <h3 className="text-lg font-serif text-stone-100 mb-3">
                  {getText('更新（育て方）', 'Your updates (how it grows)')}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {getText('出して、反応を見て、少し直してまた出す。回る形に。', 'Publish, learn, tweak—repeat. Built for iteration.')}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOR WHO */}
      <section className="py-16 px-8 md:px-20 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-serif text-stone-100 mb-8">
              {getText('こんな方におすすめ', 'Recommended for')}
            </motion.h2>
            <motion.ul variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                getText('名刺QRの着地点がバラバラで、伝わりづらい', 'Your QR destination is scattered and unclear'),
                getText('SNSやプロフィールが長くなって迷子になっている', 'Your bio is long and people get lost'),
                getText('活動を始めたばかりで、まず入口だけ整えたい', 'You’re just starting and want a clean entry first'),
                getText('「世界観」を言語化して、見せ方を揃えたい', 'You want to align your “worldview” and presentation')
              ].map((text, idx) => (
                <motion.li
                  key={idx}
                  variants={card}
                  className="flex items-start gap-3 bg-stone-950/40 border border-emerald-900/30 rounded-sm p-5"
                >
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span className="text-stone-300 text-sm leading-relaxed">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-serif text-stone-100 mb-10">
              {getText('進め方（ざっくり）', 'How it works')}
            </motion.h2>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  n: 'I',
                  title: getText('棚卸し', 'Inventory'),
                  body: getText('何を大事にして、何を伝えるかを整理します。', 'Clarify what matters and what to convey.')
                },
                {
                  n: 'II',
                  title: getText('文章整形', 'Wording'),
                  body: getText('自己紹介・実績・導線テキストを整えます。', 'Refine your profile and copy.')
                },
                {
                  n: 'III',
                  title: getText('デザイン', 'Design'),
                  body: getText('世界観に合わせて、見た目と構成を揃えます。', 'Align structure and visuals to your vibe.')
                },
                {
                  n: 'IV',
                  title: getText('公開・運用', 'Publish'),
                  body: getText('名刺QRで回しながら、更新しやすい形にします。', 'Publish and iterate with an update-friendly setup.')
                }
              ].map((step) => (
                <motion.div
                  key={step.n}
                  variants={card}
                  className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-7 hover:border-emerald-500/30 transition-colors"
                >
                  <p className="text-emerald-500/70 font-mono text-xs tracking-widest mb-3">{step.n}</p>
                  <h3 className="text-lg font-serif text-stone-100 mb-3">{step.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 md:px-20 bg-gradient-to-t from-emerald-950/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="text-center">
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-serif text-stone-100 mb-6">
              {getText('入口だけでも、整うと前に進みます。', 'Even a clean entry moves you forward.')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-stone-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              {getText(
                '相談は短文でOK。「目的」と「現状」が分かれば、最短ルートを提案します。',
                'Short messages are fine. If we know your goal and current state, we’ll suggest the shortest route.'
              )}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/webca/"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent hover:bg-emerald-950/30 border border-emerald-700/50 hover:border-emerald-500 text-emerald-400 transition-all duration-300 rounded-sm font-mono text-sm"
              >
                <span>{getText('プラン・FAQを見る', 'View plans & FAQ')}</span>
              </a>
              <a
                href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-500/50 text-white transition-all duration-300 rounded-sm font-mono text-sm group"
              >
                <span>{getText('お問い合わせフォーム', 'Contact form')}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 text-center text-xs text-stone-700">
              <p>&copy; 2026 Takamasa Ito. All rights reserved.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default WebcaLP;

