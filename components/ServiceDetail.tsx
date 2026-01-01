import React from 'react';
import { motion, Variants } from 'framer-motion';

// Animations
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
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    },
    exit: { opacity: 0, transition: { duration: 0.15 } }
};

interface ServiceDetailProps {
    onBack: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ onBack }) => {
    return (
        <motion.main
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quickStagger}
            className="w-full min-h-screen pb-20"
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
                    <span>戻る</span>
                </button>
            </motion.div>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8 md:px-20 max-w-7xl mx-auto">
                <motion.div variants={quickFade}>
                    <p className="text-emerald-500/60 font-mono text-sm tracking-widest mb-4">SERVICES / サービス・料金</p>
                    <h1 className="text-4xl md:text-6xl font-serif text-stone-100 mb-6 leading-tight">
                        Webサイト+名刺制作プラン
                    </h1>
                    <p className="text-stone-400 font-light max-w-2xl text-lg leading-relaxed">
                        名刺代わりのポートフォリオから、事業の成長に合わせた本格的なWebサイトまで。<br />
                        「公開方法」と「制作内容」を組み合わせて、あなたに最適な形をご提案します。
                    </p>
                </motion.div>
            </section>

            {/* 1. Public Release Methods (公開方法) */}
            <section className="py-20 px-8 md:px-20 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={quickFade} className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-serif text-stone-200 mb-4 flex items-center gap-4">
                            <span className="text-emerald-500/50 font-mono text-4xl">01</span>
                            公開方法を選ぶ
                        </h2>
                        <p className="text-stone-400 font-light">
                            公開方法を分けることで、「ドメイン更新どうする？」の悩みを必要な人だけの話にできます。
                        </p>
                    </motion.div>

                    <motion.div variants={quickFade} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Plan A */}
                        <div className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl text-emerald-500">A</div>
                            <h3 className="text-xl text-emerald-400 font-bold mb-2">ホスト付きURL</h3>
                            <p className="text-stone-500 text-xs mb-6">おすすめ / まずはここから</p>
                            <p className="text-stone-300 text-sm mb-6 leading-relaxed">
                                ドメイン不要で最も手軽に公開できます。<br />
                                <span className="text-emerald-500/80">早い／低コスト／更新が楽</span>
                            </p>
                            <div className="border-t border-emerald-900/30 pt-4 mt-auto">
                                <p className="text-stone-400 text-sm font-bold">追加費用なし</p>
                                <p className="text-stone-600 text-xs mt-2">※サービス仕様変更の影響を受ける可能性があります<br />※公開先の有料プランが必要な場合は実費</p>
                            </div>
                        </div>

                        {/* Plan B */}
                        <div className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl text-emerald-500">B</div>
                            <h3 className="text-xl text-emerald-400 font-bold mb-2">独自ドメイン資産化</h3>
                            <p className="text-stone-500 text-xs mb-6">事業として信頼を積むなら</p>
                            <p className="text-stone-300 text-sm mb-6 leading-relaxed">
                                「あなた.com」など、住所として残る独自ドメインで運用します。
                            </p>
                            <div className="border-t border-emerald-900/30 pt-4">
                                <p className="text-stone-400 text-sm font-bold">独自ドメイン資産化パック <br /><span className="text-lg text-emerald-400">+19,800円</span></p>
                                <ul className="text-stone-500 text-xs mt-3 space-y-1 list-disc list-inside">
                                    <li>ドメイン取得サポート</li>
                                    <li>DNS設定・接続作業</li>
                                    <li>差し替え可能QR設計</li>
                                    <li>更新見守り（月3,300円〜）</li>
                                </ul>
                            </div>
                        </div>

                        {/* Plan C */}
                        <div className="bg-stone-950/40 border border-emerald-900/30 rounded-sm p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl text-emerald-500">C</div>
                            <h3 className="text-xl text-emerald-400 font-bold mb-2">書き出し・移設設計</h3>
                            <p className="text-stone-500 text-xs mb-6">長期運用・拡張性重視</p>
                            <p className="text-stone-300 text-sm mb-6 leading-relaxed">
                                将来のロックインを避けたい方向け。可能な範囲で書き出しと移設を前提に設計します。
                            </p>
                            <div className="border-t border-emerald-900/30 pt-4">
                                <p className="text-stone-400 text-sm font-bold">設計・構築費 <br /><span className="text-lg text-emerald-400">+49,800円〜</span></p>
                                <p className="text-stone-600 text-xs mt-2">※動的機能の制限や保守コードの制約あり</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Pricing Plans (料金プラン) */}
            <section className="py-20 px-8 md:px-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={quickFade} className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-serif text-stone-200 mb-4 flex items-center gap-4">
                            <span className="text-emerald-500/50 font-mono text-4xl">02</span>
                            制作プラン
                        </h2>
                    </motion.div>

                    <motion.div variants={quickFade} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LITE PLAN */}
                        <div className="bg-stone-900/40 border border-stone-800 rounded-sm flex flex-col hover:border-emerald-500/30 transition-all duration-300">
                            <div className="p-8 border-b border-stone-800">
                                <h3 className="text-stone-400 font-mono tracking-widest text-sm mb-2">CLOUD MEISHI LITE</h3>
                                <h4 className="text-2xl font-serif text-stone-100">クラウド名刺 Lite</h4>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-emerald-400">49,800</span>
                                    <span className="text-stone-500 text-sm">円 (税込)</span>
                                </div>
                                <p className="mt-4 text-stone-500 text-sm leading-relaxed">
                                    まずは名刺から整えたい。<br />活動準備中で入口だけ作りたい方に。
                                </p>
                            </div>
                            <div className="p-8 flex-grow">
                                <ul className="space-y-4 text-sm text-stone-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 1ページ制作
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 世界観ヒアリング 30分
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 自己紹介文の整形
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 差し替え可能QR導線設計
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 名刺デザイン + 印刷100部
                                    </li>
                                    <li className="flex items-start gap-3 pt-4 border-t border-stone-800 text-stone-400">
                                        <span className="text-emerald-500/50">✦</span> 公開方法：A (Host)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* STANDARD PLAN (Featured) */}
                        <div className="bg-emerald-950/20 border-2 border-emerald-500/40 result-card-shadow rounded-sm flex flex-col relative transform lg:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wider">おすすめ / RECOMMENDED</div>
                            <div className="p-8 border-b border-emerald-900/30">
                                <h3 className="text-emerald-500 font-mono tracking-widest text-sm mb-2">CLOUD MEISHI STANDARD</h3>
                                <h4 className="text-2xl font-serif text-white">クラウド名刺 Standard</h4>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-xl text-stone-500 line-through decoration-stone-500/50 mr-2">99,800</span>
                                    <span className="text-4xl font-bold text-emerald-400">69,800</span>
                                    <span className="text-stone-500 text-sm">円〜 (税込)</span>
                                </div>
                                <p className="mt-4 text-stone-400 text-sm leading-relaxed">
                                    「何屋さんか」を一瞬で伝える。<br />SNS運用まで見据えた標準プラン。
                                </p>
                            </div>
                            <div className="p-8 flex-grow bg-emerald-950/10">
                                <ul className="space-y-4 text-sm text-stone-200">
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-400">✦</span> Liteの内容すべて
                                    </li>
                                    <li className="flex items-start gap-3 font-bold text-emerald-200">
                                        <span className="text-emerald-400">✦</span> 肩書き／提供価値の整理
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-400">✦</span> SNS固定文 (自己紹介テンプレ)
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-400">✦</span> 名刺印刷 200部へ増量 (希望者)
                                    </li>
                                    <li className="flex items-start gap-3 pt-4 border-t border-emerald-900/30 text-emerald-100/70">
                                        <span className="text-emerald-500/50">✦</span> 公開方法：A / B(+2万) / C(+5万〜)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* PORTAL PLAN */}
                        <div className="bg-stone-900/40 border border-stone-800 rounded-sm flex flex-col hover:border-emerald-500/30 transition-all duration-300">
                            <div className="p-8 border-b border-stone-800">
                                <h3 className="text-stone-400 font-mono tracking-widest text-sm mb-2">BUSINESS PORTAL</h3>
                                <h4 className="text-2xl font-serif text-stone-100">事業ポータル</h4>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-emerald-400">198,000</span>
                                    <span className="text-stone-500 text-sm">円 (税込)</span>
                                </div>
                                <p className="mt-4 text-stone-500 text-sm leading-relaxed">
                                    実績・サービス・FAQまで網羅。<br />事業の信頼性を高める本格Web。
                                </p>
                            </div>
                            <div className="p-8 flex-grow">
                                <ul className="space-y-4 text-sm text-stone-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 3〜5ページ制作
                                    </li>
                                    <li className="flex items-start gap-3 text-xs text-stone-500 pl-6 -mt-2">
                                        プロフィール/実績/サービス/FAQ等
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> ミニ世界観設計
                                    </li>
                                    <li className="flex items-start gap-3 text-xs text-stone-500 pl-6 -mt-2">
                                        タグライン/色/言葉の辞書
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 名刺デザイン + 印刷200部
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-emerald-500">✓</span> 公開後2週間の微調整
                                    </li>
                                    <li className="flex items-start gap-3 pt-4 border-t border-stone-800 text-stone-400">
                                        <span className="text-emerald-500/50">✦</span> 公開方法：A or B (セット設計可)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Steps & Delivery (ステップ・納品) */}
            <section className="py-20 px-8 md:px-20 bg-stone-950/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div variants={quickFade} className="grid grid-cols-1 md:grid-cols-2 gap-16">

                        {/* Steps */}
                        <div>
                            <h3 className="text-xl text-stone-200 font-serif mb-8 border-b border-emerald-900/30 pb-4">
                                ステップアップの考え方
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-serif border border-emerald-500/30">1</div>
                                    <div>
                                        <h4 className="text-stone-200 font-bold mb-1">まずは公開して名刺を回す</h4>
                                        <p className="text-stone-400 text-sm font-light">LiteまたはStandardで、まずはホスト付きURLで公開。</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-8 bg-stone-800 ml-4 -mt-4 -mb-4"></div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-serif border border-emerald-500/30">2</div>
                                    <div>
                                        <h4 className="text-stone-200 font-bold mb-1">信用と資産を積む</h4>
                                        <p className="text-stone-400 text-sm font-light">活動が育ったら、独自ドメイン資産化で住所を固定。</p>
                                    </div>
                                </div>
                                <div className="w-[2px] h-8 bg-stone-800 ml-4 -mt-4 -mb-4"></div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-serif border border-emerald-500/30">3</div>
                                    <div>
                                        <h4 className="text-stone-200 font-bold mb-1">事業用途に耐える形へ</h4>
                                        <p className="text-stone-400 text-sm font-light">長期運用や拡張が必要になったら、書き出し・移設設計へ。</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery & Operations */}
                        <div>
                            <h3 className="text-xl text-stone-200 font-serif mb-8 border-b border-emerald-900/30 pb-4">
                                納品・運用について
                            </h3>
                            <div className="bg-stone-900/40 p-6 rounded-sm border border-stone-800 mb-6">
                                <h4 className="text-emerald-400 font-bold mb-3 text-sm">納品方法：アカウントの所在を明確化</h4>
                                <ul className="space-y-2 text-stone-300 text-sm list-disc list-inside">
                                    <li>原則お客様アカウントで制作・公開</li>
                                    <li>納品物は「URL」と「管理権限」</li>
                                    <li>制作側は納品後に権限を外します</li>
                                </ul>
                            </div>
                            <div className="bg-stone-900/40 p-6 rounded-sm border border-stone-800">
                                <h4 className="text-emerald-400 font-bold mb-3 text-sm">運用代行オプション</h4>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-stone-200 text-sm">制作側で代理運用・見守り</span>
                                    <span className="text-emerald-400 font-bold">月額 3,300円〜</span>
                                </div>
                                <p className="text-stone-500 text-xs">※解約時の移管は契約範囲に準じて対応します</p>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* 4. FAQ */}
            <section className="py-20 px-8 md:px-20">
                <div className="max-w-4xl mx-auto">
                    <motion.div variants={quickFade}>
                        <h2 className="text-2xl font-serif text-stone-200 mb-10 text-center">よくある質問</h2>
                        <div className="space-y-6">
                            <FaqItem q="ドメインは最初から必要ですか？" a="必要ありません。まずはホスト付きURLで公開し、必要になったタイミングで独自ドメインへ移行できます。" />
                            <FaqItem q="名刺のQRは後から変更できますか？" a="できます。最初から「差し替え可能な導線」として設計するため、印刷した名刺を無駄にせずリンク先を変更可能です。" />
                            <FaqItem q="ドメインは誰の名義になりますか？" a="原則、お客様名義です。「Web上の資産」はお客様の手元に残るように手配します。" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 md:px-20 bg-gradient-to-t from-emerald-950/30 to-transparent">
                <motion.div variants={quickFade} className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif text-stone-100 mb-6">
                        まずは<span className="text-emerald-400">Liteで入口だけ</span><br />
                        でも問題ありません。
                    </h2>
                    <p className="text-stone-400 font-light mb-12">
                        名刺のQRから、あなたの活動が迷わず届く状態を作ります。<br />
                        相談内容は短くてOK。「目的」と「現状」が分かれば、最短ルートをご提案します。
                    </p>

                    <a
                        href="https://forms.gle/BBfLfsDWmWbPiTLb8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-500/50 text-white text-lg transition-all duration-300 rounded-sm font-mono shadow-lg hover:shadow-emerald-500/30 group"
                    >
                        <span>お申し込み・ご相談</span>
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </a>
                </motion.div>
            </section>

        </motion.main>
    );
};

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
    return (
        <div className="bg-stone-900/30 border border-emerald-900/20 rounded-sm p-6 hover:border-emerald-500/30 transition-colors">
            <h4 className="text-emerald-400 font-bold mb-2 flex gap-3 text-lg">
                <span className="opacity-50">Q.</span> {q}
            </h4>
            <p className="text-stone-400 pl-8 leading-relaxed">
                {a}
            </p>
        </div>
    );
};

export default ServiceDetail;
