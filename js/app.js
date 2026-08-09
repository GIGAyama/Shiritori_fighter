'use strict';

/* ================================================================
   CPU用ことば辞書 (小学生向けの一般名詞・「ん」で終わる語なし)
================================================================ */
const CPU_DICT = {
    'あ': ['あり', 'あめ', 'あさがお', 'あいすくりーむ', 'あしか', 'あくしゅ'],
    'い': ['いぬ', 'いちご', 'いるか', 'いす', 'いのしし', 'いちょう'],
    'う': ['うさぎ', 'うみ', 'うた', 'うちわ', 'うぐいす', 'うきわ'],
    'え': ['えんぴつ', 'えび', 'えんそく', 'えだまめ', 'えがお', 'えき'],
    'お': ['おにぎり', 'おかし', 'おもちゃ', 'おんがく', 'おはじき', 'おてだま'],
    'か': ['かめ', 'かさ', 'かぼちゃ', 'かみなり', 'かるた', 'かき'],
    'き': ['きつね', 'きんぎょ', 'きのこ', 'きって', 'きゅうり', 'きしゃ'],
    'く': ['くま', 'くじら', 'くつ', 'くり', 'くるま', 'くじゃく'],
    'け': ['けむし', 'けしごむ', 'けいと', 'けやき', 'けいさつ', 'けーき'],
    'こ': ['こあら', 'こま', 'ことり', 'こおり', 'こたつ', 'こむぎ'],
    'が': ['がっこう', 'がけ', 'がちょう', 'がいこつ', 'がらす'],
    'ぎ': ['ぎんこう', 'ぎたー', 'ぎょうざ', 'ぎんが'],
    'ぐ': ['ぐろーぶ', 'ぐみ', 'ぐんて', 'ぐらす'],
    'げ': ['げた', 'げーむ', 'げじげじ', 'げつようび'],
    'ご': ['ごりら', 'ごま', 'ごぼう', 'ごむ'],
    'さ': ['さくら', 'さかな', 'さる', 'さいころ', 'さつまいも', 'さら'],
    'し': ['しか', 'しまうま', 'しりとり', 'しお', 'しっぽ', 'しゃぼんだま'],
    'す': ['すいか', 'すずめ', 'すし', 'すな', 'すべりだい', 'すみれ'],
    'せ': ['せみ', 'せかい', 'せーたー', 'せんべい', 'せなか'],
    'そ': ['そら', 'そば', 'そうじき', 'そり', 'そふとくりーむ'],
    'ざ': ['ざりがに', 'ざる', 'ざっし', 'ざくろ'],
    'じ': ['じてんしゃ', 'じゃがいも', 'じしゃく', 'じどうしゃ'],
    'ず': ['ずこう', 'ずけい'],
    'ぜ': ['ぜりー', 'ぜんまい'],
    'ぞ': ['ぞう', 'ぞうり', 'ぞうすい'],
    'た': ['たぬき', 'たいこ', 'たまご', 'たこ', 'たけのこ', 'たんぽぽ'],
    'ち': ['ちず', 'ちくわ', 'ちょこれーと', 'ちりとり', 'ちきゅう', 'ちーず'],
    'つ': ['つき', 'つくえ', 'つばめ', 'つみき', 'つる', 'つりざお'],
    'て': ['てぶくろ', 'てがみ', 'てんとうむし', 'てつぼう', 'てるてるぼうず'],
    'と': ['とけい', 'とまと', 'とんぼ', 'とら', 'とうもろこし', 'とびばこ'],
    'だ': ['だるま', 'だちょう', 'だんご', 'だいず'],
    'で': ['でんしゃ', 'でんわ', 'でこぼこ', 'でんき', 'でぐち'],
    'ど': ['どーなつ', 'どんぐり', 'どらむ', 'どろだんご', 'どうぶつ'],
    'な': ['なす', 'なつ', 'なわとび', 'なべ', 'なし', 'なまえ'],
    'に': ['にじ', 'にわとり', 'にもつ', 'にんぎょう', 'におい'],
    'ぬ': ['ぬいぐるみ', 'ぬま', 'ぬりえ', 'ぬの'],
    'ね': ['ねこ', 'ねずみ', 'ねぎ', 'ねんど', 'ねっこ'],
    'の': ['のり', 'のこぎり', 'のはら', 'のど', 'のりもの'],
    'は': ['はさみ', 'はな', 'はち', 'はしご', 'はくちょう', 'はっぱ'],
    'ひ': ['ひこうき', 'ひまわり', 'ひつじ', 'ひよこ', 'ひげ', 'ひやしんす'],
    'ふ': ['ふえ', 'ふくろう', 'ふゆ', 'ふろ', 'ふでばこ'],
    'へ': ['へび', 'へや', 'へちま', 'へそ', 'へりこぷたー'],
    'ほ': ['ほし', 'ほうき', 'ほたる', 'ほっとけーき', 'ほうれんそう'],
    'ば': ['ばなな', 'ばった', 'ばけつ', 'ばら', 'ばしょ'],
    'び': ['びーだま', 'びわ', 'びすけっと', 'びっくりばこ'],
    'ぶ': ['ぶどう', 'ぶた', 'ぶらんこ', 'ぶんぼうぐ'],
    'べ': ['べんとう', 'べる', 'べすと'],
    'ぼ': ['ぼうし', 'ぼーる', 'ぼんおどり', 'ぼたもち'],
    'ぱ': ['ぱんだ', 'ぱいなっぷる', 'ぱとかー', 'ぱじゃま', 'ぱれっと'],
    'ぴ': ['ぴあの', 'ぴえろ', 'ぴくにっく'],
    'ぷ': ['ぷーる', 'ぷれぜんと', 'ぷらもでる'],
    'ぺ': ['ぺんき', 'ぺだる', 'ぺんち', 'ぺーじ'],
    'ぽ': ['ぽけっと', 'ぽすと', 'ぽんぷ'],
    'ま': ['まくら', 'まど', 'まつり', 'まめ', 'まほう', 'まんが'],
    'み': ['みず', 'みみず', 'みどり', 'みそしる', 'みつばち'],
    'む': ['むし', 'むぎちゃ', 'むらさき', 'むかで', 'むぎわらぼうし'],
    'め': ['めがね', 'めだか', 'めじろ', 'めいろ', 'めざましどけい'],
    'も': ['もも', 'もぐら', 'もみじ', 'もち', 'もり'],
    'や': ['やま', 'やさい', 'やぎ', 'やきいも', 'やね'],
    'ゆ': ['ゆき', 'ゆびわ', 'ゆかた', 'ゆめ', 'ゆず', 'ゆりかご'],
    'よ': ['よる', 'よっと', 'ようふく', 'よこづな', 'よーぐると'],
    'ら': ['らっぱ', 'らくだ', 'らむね', 'らっこ', 'らじお'],
    'り': ['りんご', 'りす', 'りゅう', 'りれー', 'りっとる'],
    'る': ['るびー', 'るーれっと', 'るーぺ', 'るすばんでんわ'],
    'れ': ['れいぞうこ', 'れたす', 'れきし', 'れんが'],
    'ろ': ['ろうそく', 'ろぼっと', 'ろば', 'ろけっと', 'ろっかー'],
    'わ': ['わに', 'わた', 'わかめ', 'わなげ', 'わがし', 'わりばし'],
};

/* ================================================================
   効果音 (WebAudioで合成・音源ファイル不要)
================================================================ */
class SFX {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem('sf-muted') === '1';
    }
    ensure() {
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            this.ctx = new AC();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return this.ctx;
    }
    setMuted(m) { this.muted = m; localStorage.setItem('sf-muted', m ? '1' : '0'); }
    tone({ freq = 440, type = 'sine', dur = .15, vol = .2, delay = 0, slide = 0 }) {
        const ctx = this.ensure();
        if (!ctx || this.muted) return;
        const t0 = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t0);
        if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + dur);
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(vol, t0 + .012);
        g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
        osc.connect(g).connect(ctx.destination);
        osc.start(t0); osc.stop(t0 + dur + .05);
    }
    noise({ dur = .18, vol = .18, delay = 0, freq = 1200 }) {
        const ctx = this.ensure();
        if (!ctx || this.muted) return;
        const t0 = ctx.currentTime + delay;
        const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.setValueAtTime(vol, t0);
        g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
        src.connect(filter).connect(g).connect(ctx.destination);
        src.start(t0);
    }
    click()   { this.tone({ freq: 880, type: 'triangle', dur: .07, vol: .12 }); }
    select()  { this.tone({ freq: 660, type: 'triangle', dur: .09, vol: .14 }); this.tone({ freq: 990, type: 'triangle', dur: .1, vol: .12, delay: .06 }); }
    attack()  { this.tone({ freq: 300, type: 'sawtooth', dur: .12, vol: .16, slide: 700 }); this.noise({ dur: .16, vol: .22, delay: .08, freq: 2400 }); this.tone({ freq: 160, type: 'square', dur: .18, vol: .18, delay: .09, slide: -80 }); }
    damage()  { this.tone({ freq: 140, type: 'square', dur: .25, vol: .2, slide: -70 }); this.noise({ dur: .2, vol: .15, freq: 700 }); }
    error()   { this.tone({ freq: 220, type: 'square', dur: .12, vol: .14 }); this.tone({ freq: 175, type: 'square', dur: .18, vol: .14, delay: .1 }); }
    tick()    { this.tone({ freq: 1200, type: 'sine', dur: .05, vol: .1 }); }
    timeup()  { this.tone({ freq: 320, type: 'sawtooth', dur: .3, vol: .18, slide: -180 }); this.tone({ freq: 240, type: 'sawtooth', dur: .4, vol: .16, delay: .18, slide: -140 }); }
    start()   { [523, 659, 784, 1047].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: .16, vol: .16, delay: i * .1 })); }
    win()     { [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => this.tone({ freq: f, type: 'triangle', dur: .2, vol: .17, delay: i * .13 })); }
    micOn()   { this.tone({ freq: 660, type: 'sine', dur: .1, vol: .14 }); this.tone({ freq: 880, type: 'sine', dur: .12, vol: .14, delay: .09 }); }
}

/* ================================================================
   演出 (紙吹雪・ヒットパーティクル)
================================================================ */
class FxCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.confettiOn = false;
        this.running = false;
        this.colors = ['#ff5e7d', '#38bdf8', '#fbbf24', '#34d399', '#f472b6', '#a78bfa'];
        this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.w = window.innerWidth; this.h = window.innerHeight;
    }
    burst(x, y, color, count = 18) {
        if (this.reduced) return;
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = 2 + Math.random() * 5;
            this.particles.push({
                kind: 'spark', x, y,
                vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2,
                size: 3 + Math.random() * 5, life: 1,
                decay: .02 + Math.random() * .02,
                color: color || this.colors[Math.floor(Math.random() * this.colors.length)],
            });
        }
        this.run();
    }
    startConfetti() {
        if (this.reduced) return;
        this.confettiOn = true;
        for (let i = 0; i < 130; i++) this.particles.push(this.makeConfetto(true));
        this.run();
    }
    stopConfetti() { this.confettiOn = false; }
    makeConfetto(scatterY = false) {
        return {
            kind: 'confetti',
            x: Math.random() * this.w,
            y: scatterY ? Math.random() * -this.h : -20,
            vx: (Math.random() - .5) * 1.6,
            vy: 2 + Math.random() * 3,
            size: 6 + Math.random() * 8,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - .5) * .25,
            sway: Math.random() * Math.PI * 2,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            life: 1, decay: 0,
        };
    }
    run() {
        if (this.running) return;
        this.running = true;
        const step = () => {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.w, this.h);
            this.particles = this.particles.filter(p => {
                if (p.kind === 'spark') {
                    p.x += p.vx; p.y += p.vy; p.vy += .18;
                    p.life -= p.decay;
                    if (p.life <= 0) return false;
                    ctx.globalAlpha = Math.max(0, p.life);
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    return true;
                }
                // confetti
                p.sway += .06;
                p.x += p.vx + Math.sin(p.sway) * 1.2;
                p.y += p.vy;
                p.angle += p.spin;
                if (p.y > this.h + 30) {
                    if (this.confettiOn) { Object.assign(p, this.makeConfetto()); return true; }
                    return false;
                }
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                ctx.restore();
                return true;
            });
            if (this.particles.length > 0) {
                this.raf = requestAnimationFrame(step);
            } else {
                this.running = false;
                ctx.clearRect(0, 0, this.w, this.h);
            }
        };
        this.raf = requestAnimationFrame(step);
    }
}

/* ================================================================
   音声入力 (Web Speech API)
================================================================ */
class VoiceInput {
    constructor({ onInterim, onFinal, onStateChange, onError }) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.supported = !!SR;
        this.listening = false;
        if (!SR) return;
        this.rec = new SR();
        this.rec.lang = 'ja-JP';
        this.rec.interimResults = true;
        this.rec.maxAlternatives = 5;
        this.rec.continuous = false;
        this.rec.onresult = (e) => {
            const res = e.results[e.results.length - 1];
            if (res.isFinal) {
                const alternatives = Array.from(res).map(a => a.transcript.trim()).filter(Boolean);
                onFinal(alternatives);
            } else {
                onInterim(res[0].transcript);
            }
        };
        this.rec.onstart = () => { this.listening = true; onStateChange(true); };
        this.rec.onend = () => { this.listening = false; onStateChange(false); };
        this.rec.onerror = (e) => { this.listening = false; onStateChange(false); onError(e.error); };
    }
    start() { if (this.rec && !this.listening) { try { this.rec.start(); } catch (_) {} } }
    stop() { if (this.rec && this.listening) { try { this.rec.stop(); } catch (_) {} } }
    toggle() { this.listening ? this.stop() : this.start(); }
}

/* ================================================================
   ゲーム本体
================================================================ */
const CHARACTERS = ['🦸‍♂️', '🦸‍♀️', '🥷', '🐱', '🐶', '🐻', '🦁', '🐯', '🐵', '🦊', '🐰', '🐲', '🦄', '🦖', '👻', '👽', '🤖', '🐧'];
const CPU_CHAR = '🤖';
const TIMEOUT_PENALTY = 5;
const CPU_LEVELS = {
    easy:   { label: 'やさしい', failRate: .18, pick: 'short',  delay: [3500, 6500] },
    normal: { label: 'ふつう',   failRate: .05, pick: 'random', delay: [2000, 4500] },
    hard:   { label: 'つよい',   failRate: 0,   pick: 'long',   delay: [1200, 2800] },
};

class ShiritoriFighter {
    constructor() {
        this.$ = this.collectElements();
        this.sfx = new SFX();
        this.fx = new FxCanvas(this.$.fxCanvas);
        this.timers = { turn: null, cpu: [], transition: [] };

        // セットアップ状態 (ゲーム状態とは分離して保持 — 再戦時にも維持される)
        this.setup = {
            mode: 'pvp',
            cpuLevel: 'normal',
            chars: [CHARACTERS[0], CHARACTERS[1]],
            hp: 50,
            time: 20,
        };
        this.state = null;

        this.voice = new VoiceInput({
            onInterim: (text) => { if (!this.isInputLocked()) this.$.wordInput.value = text; },
            onFinal: (alts) => this.handleVoiceResult(alts),
            onStateChange: (listening) => this.$.micBtn.classList.toggle('listening', listening),
            onError: (err) => this.handleVoiceError(err),
        });
        if (this.voice.supported) this.$.micBtn.classList.add('supported');

        this.bindEvents();
        this.buildCharacterGrids();
        this.updateSoundIcon();
        this.setupInstallPrompt();
    }

    collectElements() {
        const byId = id => document.getElementById(id);
        return {
            setupScreen: byId('setup-screen'), gameScreen: byId('game-screen'),
            resultScreen: byId('result-screen'),
            modeTabs: document.querySelectorAll('.mode-tab'),
            p1Name: byId('p1-name'), p2Name: byId('p2-name'),
            p1Chars: byId('p1-chars'), p2Chars: byId('p2-chars'),
            p2Setup: byId('p2-setup'), p2SetupTitle: byId('p2-setup-title'),
            cpuLevelWrap: byId('cpu-level-wrap'), cpuLevel: byId('cpu-level'),
            hpSelect: byId('hp-select'), timeSelect: byId('time-select'),
            startBtn: byId('start-game-btn'),
            cards: [byId('player1-card'), byId('player2-card')],
            charEls: [byId('player1-char'), byId('player2-char')],
            nameEls: [byId('player1-name'), byId('player2-name')],
            hpBars: [byId('player1-hp'), byId('player2-hp')],
            hpNums: [byId('player1-hp-num'), byId('player2-hp-num')],
            nextCharDisc: byId('next-char-disc'), turnIndicator: byId('turn-indicator'),
            timerWrap: byId('timer-wrap'), timerNum: byId('timer-num'), timerFill: byId('timer-fill'),
            messageBox: byId('message-box'), alertLive: byId('alert-live'),
            wordForm: byId('wordForm'), wordInput: byId('wordInput'),
            micBtn: byId('mic-btn'), submitBtn: byId('submitBtn'),
            historyArea: byId('history-area'),
            turnBanner: byId('turn-banner'), turnBannerText: byId('turn-banner-text'),
            resultWord: byId('result-word'), winnerChar: byId('winner-char'),
            winnerName: byId('winner-name'), resultSub: byId('result-sub'),
            statWords: byId('stat-words'), statMaxDmg: byId('stat-maxdmg'), statTime: byId('stat-time'),
            rematchBtn: byId('rematch-btn'), homeBtn: byId('home-btn'),
            soundBtn: byId('sound-btn'), installBtn: byId('install-btn'),
            presentBtn: byId('present-btn'), fullscreenBtn: byId('fullscreen-btn'),
            fxCanvas: byId('fx-canvas'),
        };
    }

    /* ---------- セットアップ画面 ---------- */
    bindEvents() {
        this.$.modeTabs.forEach(tab => tab.addEventListener('click', () => {
            this.sfx.click();
            this.$.modeTabs.forEach(t => { t.classList.remove('selected'); t.setAttribute('aria-checked', 'false'); });
            tab.classList.add('selected');
            tab.setAttribute('aria-checked', 'true');
            this.setup.mode = tab.dataset.mode;
            this.applyModeUI();
        }));

        this.bindSegGroup(this.$.cpuLevel, 'level', v => this.setup.cpuLevel = v);
        this.bindSegGroup(this.$.hpSelect, 'hp', v => this.setup.hp = parseInt(v, 10));
        this.bindSegGroup(this.$.timeSelect, 'time', v => this.setup.time = parseInt(v, 10));

        this.$.startBtn.addEventListener('click', () => this.startGame());
        this.$.wordForm.addEventListener('submit', e => { e.preventDefault(); this.submitWord(); });
        this.$.micBtn.addEventListener('click', () => {
            if (this.isInputLocked()) return;
            this.sfx.micOn();
            this.voice.toggle();
        });
        this.$.rematchBtn.addEventListener('click', () => { this.sfx.select(); this.startGame(); });
        this.$.homeBtn.addEventListener('click', () => { this.sfx.click(); this.goHome(); });
        this.$.soundBtn.addEventListener('click', () => {
            this.sfx.setMuted(!this.sfx.muted);
            this.updateSoundIcon();
            this.sfx.click();
        });

        // 提示モード（電子黒板で一斉に見せるとき）
        this.$.presentBtn.addEventListener('click', () => {
            this.sfx.click();
            const on = !document.body.classList.contains('presentation');
            document.body.classList.toggle('presentation', on);
            this.$.presentBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
            this.$.presentBtn.setAttribute('aria-label', on ? 'もとの大きさに もどす' : '大きく表示（提示モード）');
            this.fx.resize();   // 画面の大きさが変わるので、演出のキャンバスも測り直す
        });

        this.$.fullscreenBtn.addEventListener('click', () => {
            this.sfx.click();
            if (document.fullscreenElement) {
                document.exitFullscreen?.();
            } else {
                document.documentElement.requestFullscreen?.().catch(() => {
                    // 端末やブラウザによっては使えない。押しても何も起きないより、理由を出す
                    this.showMessage('この<ruby>端末<rt>たんまつ</rt></ruby>では<ruby>全画面<rt>ぜんがめん</rt></ruby>にできませんでした');
                });
            }
        });

        // 結果画面（モーダル）は Esc で閉じられること・フォーカスが外へ逃げないこと
        document.addEventListener('keydown', (e) => {
            if (!this.$.resultScreen.classList.contains('show')) return;
            if (e.key === 'Escape') { e.preventDefault(); this.sfx.click(); this.goHome(); return; }
            if (e.key !== 'Tab') return;
            const focusable = [this.$.rematchBtn, this.$.homeBtn];
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            else if (!focusable.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
        });
    }

    bindSegGroup(container, dataKey, onChange) {
        container.addEventListener('click', e => {
            const btn = e.target.closest('.seg-btn');
            if (!btn) return;
            this.sfx.click();
            container.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            onChange(btn.dataset[dataKey]);
        });
    }

    buildCharacterGrids() {
        [this.$.p1Chars, this.$.p2Chars].forEach((grid, playerIndex) => {
            grid.textContent = '';
            CHARACTERS.forEach((char, i) => {
                const el = document.createElement('button');
                el.type = 'button';
                el.className = 'char-option';
                el.textContent = char;
                el.setAttribute('aria-label', `キャラクター ${char}`);
                if (this.setup.chars[playerIndex] === char) el.classList.add('selected');
                el.addEventListener('click', () => {
                    this.sfx.select();
                    grid.querySelectorAll('.char-option').forEach(o => o.classList.remove('selected'));
                    el.classList.add('selected');
                    this.setup.chars[playerIndex] = char;
                });
                grid.appendChild(el);
            });
        });
    }

    applyModeUI() {
        const isCpu = this.setup.mode === 'cpu';
        this.$.cpuLevelWrap.classList.toggle('visible', isCpu);
        this.$.p2SetupTitle.textContent = isCpu ? 'コンピュータ' : 'PLAYER 2';
        this.$.p2Name.style.display = isCpu ? 'none' : '';
        this.$.p2Chars.style.display = isCpu ? 'none' : '';
    }

    updateSoundIcon() { this.$.soundBtn.textContent = this.sfx.muted ? '🔇' : '🔊'; }

    /* ---------- ゲーム開始・状態 ---------- */
    startGame() {
        this.clearAllTimers();
        this.fx.stopConfetti();
        this.sfx.start();

        const isCpu = this.setup.mode === 'cpu';
        const hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ';
        const p1Name = this.$.p1Name.value.trim() || 'プレイヤー1';
        const p2Name = isCpu
            ? `CPU (${CPU_LEVELS[this.setup.cpuLevel].label})`
            : (this.$.p2Name.value.trim() || 'プレイヤー2');

        this.state = {
            players: [
                { name: p1Name, char: this.setup.chars[0], hp: this.setup.hp, maxHp: this.setup.hp, isCpu: false, words: 0 },
                { name: p2Name, char: isCpu ? CPU_CHAR : this.setup.chars[1], hp: this.setup.hp, maxHp: this.setup.hp, isCpu, words: 0 },
            ],
            current: 0,
            nextChar: hiragana[Math.floor(Math.random() * hiragana.length)],
            usedWords: new Set(),
            history: [],
            baseTimer: this.setup.time,
            over: false,
            locked: false,
            startedAt: Date.now(),
            maxDamage: { word: null, value: 0 },
        };

        this.$.resultScreen.classList.remove('show');
        this.$.setupScreen.classList.remove('active');
        this.$.gameScreen.classList.add('active');
        this.$.historyArea.textContent = '';
        this.$.wordInput.value = '';

        this.updateHUD();
        this.setNextChar(this.state.nextChar, false);
        this.showBanner(`${p1Name} のターン！`);
        this.showMessage(`「<span class="accent">${this.state.nextChar}</span>」から<ruby>始<rt>はじ</rt></ruby>まることばで<ruby>攻撃<rt>こうげき</rt></ruby>しよう！`);
        this.beginTurn();
    }

    goHome() {
        this.clearAllTimers();
        this.voice.stop();
        this.fx.stopConfetti();
        this.state = null;
        this.$.resultScreen.classList.remove('show');
        this.$.gameScreen.classList.remove('active');
        this.$.setupScreen.classList.add('active');
    }

    clearAllTimers() {
        clearInterval(this.timers.turn);
        this.timers.turn = null;
        this.timers.cpu.forEach(clearTimeout);
        this.timers.cpu = [];
        this.timers.transition.forEach(clearTimeout);
        this.timers.transition = [];
    }

    later(ms, fn, bucket = 'transition') {
        const id = setTimeout(() => {
            this.timers[bucket] = this.timers[bucket].filter(t => t !== id);
            fn();
        }, ms);
        this.timers[bucket].push(id);
        return id;
    }

    isInputLocked() {
        return !this.state || this.state.over || this.state.locked || this.currentPlayer().isCpu;
    }
    currentPlayer() { return this.state.players[this.state.current]; }
    opponentIndex() { return 1 - this.state.current; }

    /* ---------- ターン進行 ---------- */
    beginTurn() {
        if (this.state.over) return;
        const player = this.currentPlayer();
        this.state.locked = false;
        this.updateHUD();
        this.setTurnIndicator();
        this.startTimer();

        const humanTurn = !player.isCpu;
        this.$.wordInput.disabled = !humanTurn;
        this.$.submitBtn.disabled = !humanTurn;
        this.$.micBtn.disabled = !humanTurn;
        if (humanTurn) {
            // モバイルでキーボードが暴発しないよう、PCのみ自動フォーカス
            if (!('ontouchstart' in window)) this.$.wordInput.focus();
        } else {
            this.runCpuTurn();
        }
    }

    switchTurn() {
        if (this.state.over) return;
        // 前ターンのCPU動作(思考・タイピング)が残っていたら破棄する
        this.timers.cpu.forEach(clearTimeout);
        this.timers.cpu = [];
        this.state.current = this.opponentIndex();
        const player = this.currentPlayer();
        this.showBanner(`${player.name} のターン！`);
        this.showMessage(`「<span class="accent">${this.state.nextChar}</span>」から<ruby>始<rt>はじ</rt></ruby>まることば！`);
        this.beginTurn();
    }

    /* ---------- 単語の判定 (しりとりの基本ルールは従来どおり) ---------- */
    submitWord(fromCpu = false) {
        if (!this.state || this.state.over || this.state.locked) return;
        if (!fromCpu && this.currentPlayer().isCpu) return;

        const rawWord = this.$.wordInput.value.trim();
        if (rawWord === '') return;
        this.voice.stop();

        const word = Kana.toHiragana(rawWord);

        if (!Kana.isValidWord(word)) {
            this.rejectWord('ひらがな か カタカナで<ruby>入力<rt>にゅうりょく</rt></ruby>してね！');
            return;
        }
        if (word.charAt(0) !== this.state.nextChar) {
            this.rejectWord(`「<span class="accent">${this.state.nextChar}</span>」から<ruby>始<rt>はじ</rt></ruby>まることばだよ！`);
            return;
        }
        if (this.state.usedWords.has(word)) {
            this.rejectWord('そのことばは もう<ruby>使<rt>つか</rt></ruby>われたよ！');
            return;
        }
        if (word.slice(-1) === 'ん') {
            const loser = this.currentPlayer();
            this.showMessage(`「ん」がついた！ ${this.escape(loser.name)} の<ruby>負<rt>ま</rt></ruby>け…`);
            this.sfx.timeup();
            this.endGame(this.opponentIndex(), '「ん」で終わる言葉を言ってしまった！');
            return;
        }

        this.performAttack(word, rawWord);
    }

    rejectWord(messageHTML) {
        this.sfx.error();
        this.showMessage(messageHTML);
        // 差し戻しは読み上げでも割り込ませたいので role="alert" の入れ物へも入れる。
        // aria-live="polite" だけだと、次の操作まで読まれないことがある。
        this.$.alertLive.textContent = this.$.messageBox.textContent;
        this.$.wordInput.select();
    }

    performAttack(word, rawWord) {
        const attackerIndex = this.state.current;
        const defenderIndex = this.opponentIndex();
        const attacker = this.state.players[attackerIndex];
        const defender = this.state.players[defenderIndex];

        this.state.locked = true;
        this.stopTimer();
        this.$.wordInput.value = '';
        this.$.wordInput.disabled = true;
        this.$.submitBtn.disabled = true;
        this.$.micBtn.disabled = true;

        // ダメージ計算 (従来ルール: 文字数 + 拗音・長音ボーナス×2)
        const bonusChars = ['ゃ', 'ゅ', 'ょ', 'ー'];
        const bonus = word.split('').filter(c => bonusChars.includes(c)).length;
        const damage = word.length + bonus * 2;

        defender.hp = Math.max(0, defender.hp - damage);
        attacker.words++;
        this.state.usedWords.add(word);
        this.state.history.push({ word, rawWord, playerIndex: attackerIndex, damage });
        if (damage > this.state.maxDamage.value) this.state.maxDamage = { word, value: damage };
        this.state.nextChar = Kana.nextChar(word);

        this.addHistoryChip(word, rawWord, attackerIndex, damage);

        // 演出
        this.sfx.attack();
        this.$.cards[attackerIndex].classList.add(attackerIndex === 0 ? 'attack-r' : 'attack-l');
        this.later(220, () => {
            this.sfx.damage();
            this.$.cards[defenderIndex].classList.add('hit');
            this.$.gameScreen.classList.add('shake');
            this.showDamagePop(defenderIndex, damage);
            const rect = this.$.cards[defenderIndex].getBoundingClientRect();
            this.fx.burst(rect.left + rect.width / 2, rect.top + rect.height / 2,
                          defenderIndex === 0 ? '#ff5e7d' : '#38bdf8', 22);
            this.updateHUD();
        });
        this.later(750, () => {
            this.$.cards[attackerIndex].classList.remove('attack-r', 'attack-l');
            this.$.cards[defenderIndex].classList.remove('hit');
            this.$.gameScreen.classList.remove('shake');
        });

        const bonusText = bonus > 0 ? ` <span class="accent">ボーナス +${bonus * 2}!</span>` : '';
        this.showMessage(`${this.escape(attacker.name)} の「${this.escape(rawWord)}」！ <span class="accent">${damage}</span> ダメージ！${bonusText}`);
        this.setNextChar(this.state.nextChar, true);

        if (defender.hp <= 0) {
            this.later(900, () => this.endGame(attackerIndex, 'HPを0にした！'));
        } else {
            this.later(1000, () => this.switchTurn());
        }
    }

    /* ---------- タイマー ---------- */
    startTimer() {
        this.stopTimer();
        const durMs = this.state.baseTimer * 1000;
        const endAt = Date.now() + durMs;
        let lastSec = this.state.baseTimer;
        this.$.timerWrap.classList.remove('hurry');
        this.renderTimer(durMs, durMs);

        this.timers.turn = setInterval(() => {
            const remain = Math.max(0, endAt - Date.now());
            this.renderTimer(remain, durMs);
            const sec = Math.ceil(remain / 1000);
            if (sec !== lastSec) {
                lastSec = sec;
                if (sec <= 5 && sec > 0) {
                    this.$.timerWrap.classList.add('hurry');
                    this.sfx.tick();
                }
            }
            if (remain <= 0) {
                this.stopTimer();
                this.handleTimeout();
            }
        }, 100);
    }
    stopTimer() { clearInterval(this.timers.turn); this.timers.turn = null; }
    renderTimer(remainMs, durMs) {
        this.$.timerFill.style.width = `${(remainMs / durMs) * 100}%`;
        this.$.timerNum.textContent = `${Math.ceil(remainMs / 1000)}びょう`;
    }

    handleTimeout() {
        if (this.state.over || this.state.locked) return;
        this.state.locked = true;
        this.voice.stop();
        this.$.wordInput.disabled = true;
        this.$.submitBtn.disabled = true;
        this.$.micBtn.disabled = true;

        const victimIndex = this.state.current;
        const victim = this.state.players[victimIndex];
        victim.hp = Math.max(0, victim.hp - TIMEOUT_PENALTY);

        this.sfx.timeup();
        this.showMessage(`<ruby>時間切<rt>じかんぎ</rt></ruby>れ！ ${this.escape(victim.name)} に <span class="accent">${TIMEOUT_PENALTY}</span> ダメージ！`);
        this.$.cards[victimIndex].classList.add('hit');
        this.$.gameScreen.classList.add('shake');
        this.showDamagePop(victimIndex, TIMEOUT_PENALTY);
        this.later(600, () => {
            this.$.cards[victimIndex].classList.remove('hit');
            this.$.gameScreen.classList.remove('shake');
        });
        this.updateHUD();

        if (victim.hp <= 0) {
            this.later(900, () => this.endGame(1 - victimIndex, '相手が時間切れでたおれた！'));
        } else {
            this.later(1400, () => this.switchTurn());
        }
    }

    /* ---------- CPU ---------- */
    runCpuTurn() {
        const level = CPU_LEVELS[this.setup.cpuLevel];
        this.showMessage('🤖 かんがえちゅう…');

        // わざと失敗 → タイマー切れに任せる (時間切れペナルティを受ける)
        if (Math.random() < level.failRate) return;

        const candidates = (CPU_DICT[this.state.nextChar] || []).filter(w => !this.state.usedWords.has(w));
        if (candidates.length === 0) {
            // 思いつかない → CPUの負け
            this.later(2200, () => {
                if (this.state.over) return;
                this.stopTimer();
                this.showMessage('🤖 まいった！ ことばが<ruby>思<rt>おも</rt></ruby>いつかない…');
                this.later(1200, () => this.endGame(0, 'コンピュータが降参した！'));
            }, 'cpu');
            return;
        }

        let word;
        if (level.pick === 'short') {
            word = candidates.reduce((a, b) => (a.length <= b.length ? a : b));
        } else if (level.pick === 'long') {
            word = candidates.reduce((a, b) => (a.length >= b.length ? a : b));
        } else {
            word = candidates[Math.floor(Math.random() * candidates.length)];
        }

        const [dMin, dMax] = level.delay;
        const thinkMs = Math.min(dMin + Math.random() * (dMax - dMin), this.state.baseTimer * 1000 - 2500);
        this.later(Math.max(600, thinkMs), () => this.cpuType(word), 'cpu');
    }

    cpuType(word) {
        if (this.state.over || this.currentPlayer() !== this.state.players[1]) return;
        // 1文字ずつタイプする演出
        let i = 0;
        const typeNext = () => {
            if (this.state.over || !this.currentPlayer().isCpu) return;
            i++;
            this.$.wordInput.value = word.slice(0, i);
            if (i < word.length) {
                this.later(90, typeNext, 'cpu');
            } else {
                this.later(350, () => this.submitWord(true), 'cpu');
            }
        };
        typeNext();
    }

    /* ---------- 音声入力 ---------- */
    handleVoiceResult(alternatives) {
        if (this.isInputLocked()) return;
        // 候補の中から「かなに変換して有効になるもの」を優先して選ぶ
        let best = null;
        for (const alt of alternatives) {
            const kana = Kana.toHiragana(alt);
            if (Kana.isValidWord(kana)) {
                if (kana.charAt(0) === this.state.nextChar) { best = alt; break; }
                if (!best) best = alt;
            }
        }
        if (best) {
            this.$.wordInput.value = best;
            this.submitWord();
        } else if (alternatives.length > 0) {
            this.$.wordInput.value = alternatives[0];
            this.showMessage('うまく<ruby>聞<rt>き</rt></ruby>き<ruby>取<rt>と</rt></ruby>れなかったかも。なおして「こうげき！」を<ruby>押<rt>お</rt></ruby>してね');
        }
    }

    handleVoiceError(err) {
        if (err === 'not-allowed' || err === 'service-not-allowed') {
            this.showMessage('マイクが<ruby>使<rt>つか</rt></ruby>えないよ。ブラウザのマイク<ruby>許可<rt>きょか</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>してね');
        } else if (err === 'no-speech') {
            this.showMessage('<ruby>声<rt>こえ</rt></ruby>が<ruby>聞<rt>き</rt></ruby>こえなかったよ。もういちど🎤を<ruby>押<rt>お</rt></ruby>してね');
        }
    }

    /* ---------- ゲーム終了 ---------- */
    endGame(winnerIndex, reason) {
        if (this.state.over) return;
        this.state.over = true;
        this.clearAllTimers();
        this.voice.stop();

        const winner = this.state.players[winnerIndex];
        const elapsed = Math.floor((Date.now() - this.state.startedAt) / 1000);
        const totalWords = this.state.players[0].words + this.state.players[1].words;

        this.$.winnerChar.textContent = winner.char;
        this.$.winnerName.textContent = `${winner.name} のかち！`;
        this.$.resultSub.textContent = reason;
        this.$.statWords.textContent = String(totalWords);
        this.$.statMaxDmg.textContent = this.state.maxDamage.word
            ? `${this.state.maxDamage.value} (${this.state.maxDamage.word})` : '-';
        this.$.statTime.textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;

        this.later(600, () => {
            this.$.resultScreen.classList.add('show');
            // モーダルを開いたらフォーカスも中へ移す。移さないと、キーボードだけで
            // 使っている人は背後の画面を触り続けることになる。
            this.$.rematchBtn.focus();
            this.sfx.win();
            this.fx.startConfetti();
        });
    }

    /* ---------- UI更新 ---------- */
    updateHUD() {
        this.state.players.forEach((player, i) => {
            this.$.nameEls[i].textContent = player.name;
            this.$.charEls[i].textContent = player.char;
            this.$.hpNums[i].textContent = `${player.hp}/${player.maxHp}`;
            const pct = (player.hp / player.maxHp) * 100;
            const bar = this.$.hpBars[i];
            bar.style.width = `${pct}%`;
            bar.classList.toggle('low', pct <= 25);
            bar.classList.toggle('mid', pct > 25 && pct <= 55);
            this.$.cards[i].classList.toggle('active', !this.state.over && this.state.current === i);
        });
    }

    setTurnIndicator() {
        const el = this.$.turnIndicator;
        el.textContent = `${this.currentPlayer().name} のターン`;
        el.className = 'q-turn ' + (this.state.current === 0 ? 'p1-turn' : 'p2-turn');
    }

    setNextChar(char, animate) {
        const disc = this.$.nextCharDisc;
        if (animate) {
            disc.classList.remove('flip');
            void disc.offsetWidth; /* アニメーション再生のためのリフロー */
            disc.classList.add('flip');
        }
        disc.textContent = char;
    }

    showMessage(html) {
        // 信頼できる文字列のみHTMLとして扱う (ユーザー入力は escape() 済み)
        this.$.messageBox.innerHTML = html;
        this.$.messageBox.classList.remove('pop');
        void this.$.messageBox.offsetWidth;
        this.$.messageBox.classList.add('pop');
    }

    escape(s) {
        const div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    showBanner(text) {
        this.$.turnBannerText.textContent = text;
        this.$.turnBanner.classList.remove('show');
        void this.$.turnBanner.offsetWidth;
        this.$.turnBanner.classList.add('show');
        this.later(1200, () => this.$.turnBanner.classList.remove('show'));
    }

    showDamagePop(playerIndex, damage) {
        const pop = document.createElement('div');
        pop.className = 'dmg-pop';
        pop.textContent = `-${damage}`;
        this.$.cards[playerIndex].appendChild(pop);
        setTimeout(() => pop.remove(), 1100);
    }

    addHistoryChip(word, rawWord, playerIndex, damage) {
        const chip = document.createElement('span');
        chip.className = `history-item by-p${playerIndex + 1}`;
        const wordSpan = document.createElement('span');
        wordSpan.textContent = (rawWord && rawWord !== word) ? `${rawWord} (${word})` : word;
        const dmgSpan = document.createElement('span');
        dmgSpan.className = 'dmg-tag';
        dmgSpan.textContent = `-${damage}`;
        chip.append(wordSpan, dmgSpan);
        this.$.historyArea.prepend(chip);
    }

    /* ---------- PWAインストール ---------- */
    setupInstallPrompt() {
        // インストールの合図そのものは install-hook.js が <head> の先頭で受け取っている。
        // ここで beforeinstallprompt を待つと、通信が遅い端末では既に飛んだあとで、
        // ボタンが永久に出てこない。ここは「出す・消す」の判断だけを持つ。
        const sync = () => {
            const standalone = matchMedia('(display-mode: standalone)').matches
                || navigator.standalone === true;
            // 案内できるときだけ出す。出せないボタンを置くと
            // 「押しても何も起きない」と言われる。
            this.$.installBtn.classList.toggle('available', !!window.__pwaInstallPrompt && !standalone);
        };
        window.addEventListener('pwa-install-available', sync);
        window.addEventListener('pwa-installed', sync);
        this.$.installBtn.addEventListener('click', async () => {
            const deferred = window.__pwaInstallPrompt;
            if (!deferred) return;
            deferred.prompt();
            await deferred.userChoice;
            window.__pwaInstallPrompt = null;
            sync();
        });
        sync();
    }
}

/* ================================================================
   更新の案内（押されるまで切り替えない）
================================================================ */
function showUpdateToast(onAccept) {
    if (document.getElementById('update-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'update-toast';
    toast.className = 'update-toast';
    toast.setAttribute('role', 'status');

    const text = document.createElement('span');
    text.textContent = 'あたらしい ばんが あります';

    const accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'update-toast__accept tap-44';
    accept.textContent = 'さいしんに する';
    accept.addEventListener('click', () => { accept.disabled = true; onAccept(); });

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'update-toast__close tap-44';
    close.setAttribute('aria-label', 'この おしらせを とじる');
    close.textContent = '✕';
    close.addEventListener('click', () => toast.remove());

    toast.append(text, accept, close);
    document.body.appendChild(toast);
}

function startServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const secure = location.protocol === 'https:'
        || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    if (!secure) return;

    // ⚠️ controllerchange は、はじめて開いたときにも飛んでくる。
    //    activate の clients.claim() でページが管理下に入るためである。
    //    素直に受けると初回訪問が必ず1回リロードされ、並べたばかりの盤面や
    //    打ちかけのことばが消える。見るべきは「利用者が押したかどうか」だけ。
    let userAskedUpdate = false;
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!userAskedUpdate || reloading) return;
        reloading = true;
        location.reload();
    });

    navigator.serviceWorker.register('sw.js').then((registration) => {
        const notify = (worker) => showUpdateToast(() => {
            userAskedUpdate = true;
            worker.postMessage({ type: 'SKIP_WAITING' });
        });
        registration.addEventListener('updatefound', () => {
            const sw = registration.installing;
            if (!sw) return;
            sw.addEventListener('statechange', () => {
                // controller が居る＝初回インストールではなく更新。
                // 初回で知らせると「入れた直後に更新があります」と出て混乱する。
                if (sw.state === 'installed' && navigator.serviceWorker.controller) notify(sw);
            });
        });
        // 前回のうちに入っていた場合も拾う
        if (registration.waiting && navigator.serviceWorker.controller) notify(registration.waiting);
    }).catch(() => { /* 登録できない環境でもゲーム自体は動く */ });
}

/* ================================================================
   起動
================================================================ */
// 「もう読み込みが済んでいる」場合を必ず見る。
// 済んでいるのに DOMContentLoaded を待つと、リスナーは付くが二度と呼ばれず、
// ゲームも Service Worker も起動しないまま黙って終わる。
const boot = () => { new ShiritoriFighter(); startServiceWorker(); };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
