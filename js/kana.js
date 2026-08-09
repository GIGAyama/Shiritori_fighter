/* ================================================================
   かな変換ユーティリティ (外部ライブラリ不要・オフライン対応)
================================================================ */
const Kana = (() => {
    // ローマ字 → ひらがな 変換テーブル (長いキー優先でマッチ)
    const R = {
        kya:'きゃ',kyu:'きゅ',kyo:'きょ',gya:'ぎゃ',gyu:'ぎゅ',gyo:'ぎょ',
        sha:'しゃ',shu:'しゅ',sho:'しょ',sya:'しゃ',syu:'しゅ',syo:'しょ',
        ja:'じゃ',ju:'じゅ',jo:'じょ',jya:'じゃ',jyu:'じゅ',jyo:'じょ',zya:'じゃ',zyu:'じゅ',zyo:'じょ',
        cha:'ちゃ',chu:'ちゅ',cho:'ちょ',tya:'ちゃ',tyu:'ちゅ',tyo:'ちょ',
        nya:'にゃ',nyu:'にゅ',nyo:'にょ',hya:'ひゃ',hyu:'ひゅ',hyo:'ひょ',
        bya:'びゃ',byu:'びゅ',byo:'びょ',pya:'ぴゃ',pyu:'ぴゅ',pyo:'ぴょ',
        mya:'みゃ',myu:'みゅ',myo:'みょ',rya:'りゃ',ryu:'りゅ',ryo:'りょ',
        shi:'し',chi:'ち',tsu:'つ',
        ka:'か',ki:'き',ku:'く',ke:'け',ko:'こ',ga:'が',gi:'ぎ',gu:'ぐ',ge:'げ',go:'ご',
        sa:'さ',si:'し',su:'す',se:'せ',so:'そ',za:'ざ',ji:'じ',zi:'じ',zu:'ず',ze:'ぜ',zo:'ぞ',
        ta:'た',ti:'ち',tu:'つ',te:'て',to:'と',da:'だ',di:'ぢ',du:'づ',de:'で',do:'ど',
        na:'な',ni:'に',nu:'ぬ',ne:'ね',no:'の',
        ha:'は',hi:'ひ',fu:'ふ',hu:'ふ',he:'へ',ho:'ほ',
        ba:'ば',bi:'び',bu:'ぶ',be:'べ',bo:'ぼ',pa:'ぱ',pi:'ぴ',pu:'ぷ',pe:'ぺ',po:'ぽ',
        ma:'ま',mi:'み',mu:'む',me:'め',mo:'も',
        ya:'や',yu:'ゆ',yo:'よ',ra:'ら',ri:'り',ru:'る',re:'れ',ro:'ろ',
        wa:'わ',wo:'を',fa:'ふぁ',fi:'ふぃ',fe:'ふぇ',fo:'ふぉ',
        va:'ゔぁ',vi:'ゔぃ',vu:'ゔ',ve:'ゔぇ',vo:'ゔぉ',
        a:'あ',i:'い',u:'う',e:'え',o:'お',
        nn:'ん','n\'':'ん','-':'ー'
    };
    const VOWELS = 'aiueo';

    function romajiToHiragana(src) {
        let s = src.toLowerCase(), out = '', i = 0;
        while (i < s.length) {
            // 促音: 子音の連続 (nn以外)
            if (i + 1 < s.length && s[i] === s[i + 1] && !VOWELS.includes(s[i]) && s[i] !== 'n' && /[a-z]/.test(s[i])) {
                out += 'っ'; i++; continue;
            }
            // 「ん」: n の後に子音 or 文末
            if (s[i] === 'n' && (i + 1 >= s.length || (!VOWELS.includes(s[i + 1]) && s[i + 1] !== 'y' && s[i + 1] !== 'n' && s[i + 1] !== '\''))) {
                out += 'ん'; i++; continue;
            }
            let matched = false;
            for (const len of [3, 2, 1]) {
                const chunk = s.slice(i, i + len);
                if (R[chunk]) { out += R[chunk]; i += len; matched = true; break; }
            }
            if (!matched) { out += s[i]; i++; }
        }
        return out;
    }

    function toHiragana(input) {
        let s = (input || '').trim().normalize('NFKC');
        if (/[a-zA-Z]/.test(s)) s = romajiToHiragana(s);
        // カタカナ → ひらがな (ヴ含む)
        s = s.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
        return s;
    }

    const isValidWord = s => /^[ぁ-ゔー]+$/.test(s);

    // 小書き文字 → 通常文字 (しりとりの次の文字用)
    const SMALL = { 'ぁ':'あ','ぃ':'い','ぅ':'う','ぇ':'え','ぉ':'お','っ':'つ','ゃ':'や','ゅ':'ゆ','ょ':'よ','ゎ':'わ' };

    function nextChar(word) {
        // 末尾の長音符を(連続していても)読み飛ばす
        let i = word.length - 1;
        while (i > 0 && word[i] === 'ー') i--;
        const c = word[i];
        return SMALL[c] || c;
    }

    return { toHiragana, isValidWord, nextChar };
})();
