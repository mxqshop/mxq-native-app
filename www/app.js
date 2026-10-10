/* MXQ 独立前台商城 —— 商品浏览与定制下单（演示） */

/* ------------------------------ 多语言 / 多币种 ------------------------------ */

/** 支持的语言清单（BCP 47 → 本名）。覆盖 50+ 语言。 */
const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'ru', name: 'Русский' },
  { code: 'uk', name: 'Українська' },
  { code: 'pl', name: 'Polski' },
  { code: 'cs', name: 'Čeština' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'hu', name: 'Magyar' },
  { code: 'ro', name: 'Română' },
  { code: 'bg', name: 'Български' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ar', name: 'العربية' },
  { code: 'he', name: 'עברית' },
  { code: 'fa', name: 'فارسی' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ur', name: 'اردو' },
  { code: 'th', name: 'ไทย' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'tl', name: 'Filipino' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'mn', name: 'Монгол' },
  { code: 'kk', name: 'Қазақша' },
  { code: 'uz', name: 'Oʻzbekcha' },
  { code: 'km', name: 'ខ្មែរ' },
  { code: 'lo', name: 'ລາວ' },
  { code: 'my', name: 'မြန်မာ' },
  { code: 'ne', name: 'नेपाली' },
  { code: 'si', name: 'සිංහල' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'am', name: 'አማርኛ' },
  { code: 'ha', name: 'Hausa' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'ig', name: 'Igbo' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'sv', name: 'Svenska' },
  { code: 'da', name: 'Dansk' },
  { code: 'no', name: 'Norsk' },
  { code: 'fi', name: 'Suomi' },
  { code: 'et', name: 'Eesti' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'sr', name: 'Српски' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'sq', name: 'Shqip' },
  { code: 'mk', name: 'Македонски' },
  { code: 'bs', name: 'Bosanski' },
  { code: 'ka', name: 'ქართული' },
  { code: 'hy', name: 'Հայերեն' },
  { code: 'az', name: 'Azərbaycanca' },
]

/** 语言（不含地区）→ 默认国家币种，用于「按国家自动匹配货币」。 */
const LANG_TO_CURRENCY = {
  'pt-BR': 'BRL', 'pt': 'EUR', 'es': 'EUR', 'fr': 'EUR', 'de': 'EUR', 'it': 'EUR',
  'nl': 'EUR', 'ru': 'RUB', 'uk': 'UAH', 'pl': 'PLN', 'cs': 'CZK', 'sk': 'EUR',
  'hu': 'HUF', 'ro': 'RON', 'bg': 'BGN', 'el': 'EUR', 'tr': 'TRY', 'ar': 'AED',
  'he': 'ILS', 'fa': 'IRR', 'hi': 'INR', 'bn': 'BDT', 'ur': 'PKR', 'th': 'THB',
  'vi': 'VND', 'id': 'IDR', 'ms': 'MYR', 'tl': 'PHP', 'zh-CN': 'CNY',
  'zh-TW': 'TWD', 'ja': 'JPY', 'ko': 'KRW', 'mn': 'MNT', 'kk': 'KZT',
  'uz': 'UZS', 'km': 'KHR', 'lo': 'LAK', 'my': 'MMK', 'ne': 'NPR', 'si': 'LKR',
  'ta': 'INR', 'te': 'INR', 'mr': 'INR', 'gu': 'INR', 'kn': 'INR', 'sw': 'KES',
  'am': 'ETB', 'ha': 'NGN', 'yo': 'NGN', 'ig': 'NGN', 'af': 'ZAR', 'zu': 'ZAR',
  'xh': 'ZAR', 'sv': 'SEK', 'da': 'DKK', 'no': 'NOK', 'fi': 'EUR', 'et': 'EUR',
  'lv': 'EUR', 'lt': 'EUR', 'hr': 'EUR', 'sr': 'RSD', 'sl': 'EUR', 'sq': 'ALL',
  'mk': 'MKD', 'bs': 'BAM', 'ka': 'GEL', 'hy': 'AMD', 'az': 'AZN',
}

/** 核心语言（做完整界面文案 + 商品翻译）；其余语言回退英文。 */
const CORE_LANGS = ['en', 'fr', 'es', 'de', 'pt', 'it', 'ru', 'ja', 'ko', 'zh-CN']

/**
 * M1 语种覆盖扩展（2026-10-06）：第二梯队语种。
 * 这些语言此前被 CORE_LANGS 挡住：用户按国家自动切到 nl/uk/pl/… 时界面文案全是英文。
 * 引入 EXTENDED_LANGS（核心 + 第二梯队）后，机翻引擎按需覆盖——只有用户真的切到
 * 该语言才会触发翻译请求（带 4 并发限制 + localStorage 缓存），流量可控。
 */
const SECONDARY_LANGS = [
  'zh-TW', 'nl', 'uk', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'el', 'tr', 'sv', 'da',
  'no', 'fi', 'ar', 'he', 'hi', 'th', 'vi', 'id', 'ms', 'bn', 'ur', 'fa',
]
const EXTENDED_LANGS = [...new Set([...CORE_LANGS, ...SECONDARY_LANGS])]
const isTranslatableLang = (lang) => EXTENDED_LANGS.includes(lang)

/**
 * 国家（ISO 2）→ 主要语言。用于「选配送国 → 联动界面语言」。
 * 覆盖有明确单一官方语言的主要国家；未列出的国家回退英文（en）。
 * 语种码须在 LANGUAGES 清单里，前端会按 base 语言做归并（如 fr-BE → fr）。
 */
const COUNTRY_LANGUAGE = {
  // 英语
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en', SG: 'en',
  // 法语
  FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr', SN: 'fr', CI: 'fr', CM: 'fr',
  MA: 'fr', DZ: 'fr', TN: 'fr',
  // 德语
  DE: 'de', AT: 'de', LI: 'de',
  // 西语
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es',
  GT: 'es', CU: 'es', DO: 'es', BO: 'es', PY: 'es', UY: 'es', HN: 'es', NI: 'es',
  PA: 'es', CR: 'es', SV: 'es',
  // 葡语
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt',
  // 意大利语
  IT: 'it', SM: 'it', VA: 'it',
  // 荷兰语
  NL: 'nl',
  // 俄语
  RU: 'ru', BY: 'ru', KZ: 'ru',
  // 乌克兰语
  UA: 'uk',
  // 波兰语
  PL: 'pl',
  // 捷克 / 斯洛伐克 / 匈牙利 / 罗马尼亚 / 保加利亚
  CZ: 'cs', SK: 'sk', HU: 'hu', RO: 'ro', BG: 'bg',
  // 希腊
  GR: 'el', CY: 'el',
  // 土耳其
  TR: 'tr',
  // 阿拉伯语
  SA: 'ar', AE: 'ar', EG: 'ar', QA: 'ar', KW: 'ar', BH: 'ar', OM: 'ar', JO: 'ar',
  IQ: 'ar', LB: 'ar', LY: 'ar', SY: 'ar', YE: 'ar',
  // 希伯来语
  IL: 'he',
  // 波斯语
  IR: 'fa',
  // 印地语 / 孟加拉 / 乌尔都
  IN: 'hi', BD: 'bn', PK: 'ur',
  // 泰语 / 越南 / 印尼 / 马来 / 菲律宾
  TH: 'th', VN: 'vi', ID: 'id', MY: 'ms', PH: 'tl',
  // 中日韩
  CN: 'zh-CN', TW: 'zh-TW', HK: 'zh-TW', MO: 'zh-TW', JP: 'ja', KR: 'ko',
  // 北欧
  SE: 'sv', DK: 'da', NO: 'no', FI: 'fi', IS: 'is',
  // 波罗的海
  EE: 'et', LV: 'lv', LT: 'lt',
  // 巴尔干
  HR: 'hr', RS: 'sr', SI: 'sl', AL: 'sq', MK: 'mk', BA: 'bs',
  // 高加索 / 中亚
  GE: 'ka', AM: 'hy', AZ: 'az', UZ: 'uz', MN: 'mn',
  // 东南亚其它
  KH: 'km', LA: 'lo', MM: 'my', NP: 'ne', LK: 'si',
  // 非洲
  NG: 'en', GH: 'en', KE: 'en', TZ: 'en', UG: 'en', ET: 'am', RW: 'en', CD: 'fr',
}

/** 语言码归并：地区变体落到 LANGUAGES 里存在的 base 语言（fr-BE→fr 等） */
const normalizeLangCode = (code) => {
  if (!code) return 'en'
  const exact = LANGUAGES.find((l) => l.code === code)
  if (exact) return exact.code
  const base = String(code).split('-')[0]
  const fallback = LANGUAGES.find((l) => l.code === base)
  if (fallback) return fallback.code
  // 中文归并到 zh-CN，葡萄牙语归并到 pt
  if (base === 'zh') return 'zh-CN'
  return 'en'
}

/* ------------------------------ 前端机翻引擎 ------------------------------ */
/**
 * 商品标题/描述与界面文案按需翻译成核心语言。
 * 走 Google 免费翻译端点（client=gtx，无需 key），结果缓存到内存 + localStorage，
 * 同一文本+语言的并发请求合并去重，失败降级返回原文。
 */
const TR_CACHE = new Map()
const TR_PENDING = new Map()
let TR_STORAGE_LOADED = false

function loadTrCache() {
  if (TR_STORAGE_LOADED) return
  TR_STORAGE_LOADED = true
  try {
    const raw = localStorage.getItem('mxq.tr')
    if (!raw) return
    const obj = JSON.parse(raw)
    for (const [k, v] of Object.entries(obj)) TR_CACHE.set(k, v)
  } catch { /* 忽略损坏缓存 */ }
}

function saveTrCache() {
  try {
    const obj = {}
    let n = 0
    for (const [k, v] of TR_CACHE) {
      if (n++ >= 4000) break
      obj[k] = v
    }
    localStorage.setItem('mxq.tr', JSON.stringify(obj))
  } catch { /* 配额满则放弃持久化，仅保留内存缓存 */ }
}

const trKey = (lang, text) => `${lang}|${text}`

/** 全局并发限制：最多 4 个机翻请求同时进行，避免打爆免费翻译端点触发限流 */
let TR_ACTIVE = 0
const TR_WAITERS = []
const TR_LIMIT = 4
function acquireTrSlot() {
  if (TR_ACTIVE < TR_LIMIT) {
    TR_ACTIVE += 1
    return Promise.resolve()
  }
  return new Promise((resolve) => TR_WAITERS.push(resolve))
}
function releaseTrSlot() {
  TR_ACTIVE -= 1
  const next = TR_WAITERS.shift()
  if (next) {
    TR_ACTIVE += 1
    next()
  }
}

/** MyMemory 语言对里的目标语言码（少数语言码需转写） */
const mymemoryLang = (lang) => ({ 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', pt: 'pt-PT', 'pt-BR': 'pt-BR' }[lang] || lang)

/** 解码 MyMemory 返回里可能出现的 HTML 实体（&amp; → & 等） */
function decodeEntities(value) {
  const el = document.createElement('textarea')
  el.innerHTML = String(value ?? '')
  return el.value
}

async function fetchTranslation(text, targetLang) {
  await acquireTrSlot()
  try {
    // 1) Google gtx（额度高，海外用户环境可直接访问，CORS 放行）
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        const out = (Array.isArray(data?.[0]) ? data[0] : []).map((seg) => seg?.[0] || '').join('')
        if (out && out !== text) return out
      }
    } catch { /* 继续下一个源 */ }
    // 2) MyMemory（免费 + CORS 放行，国内/受限网络可达；但每日配额低，仅作兜底）
    try {
      const mm = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${encodeURIComponent(mymemoryLang(targetLang))}`)
      if (mm.ok) {
        const j = await mm.json()
        const out = j?.responseData?.translatedText
        if (out && Number(j?.responseStatus) === 200 && !/MYMEMORY WARNING/i.test(out)) return decodeEntities(out)
      }
    } catch { /* 继续下一个源 */ }
    // 3) 本站服务端代理（云端沙箱环境代理，通常不可达外网翻译源，仅兜底）
    try {
      const proxyUrl = `/api/store/translate?tl=${encodeURIComponent(targetLang)}&q=${encodeURIComponent(text)}`
      const res = await fetch(proxyUrl)
      if (res.ok) {
        const data = await res.json()
        if (data?.text) return data.text
      }
    } catch { /* 全部失败则返回原文 */ }
    return text
  } finally {
    releaseTrSlot()
  }
}

/** 异步机翻（带去重 + 缓存）。targetLang 非核心语言时直接返回原文。 */
async function translateText(text, targetLang) {
  const src = String(text ?? '').trim()
  if (!src) return ''
  if (!isTranslatableLang(targetLang) || targetLang === 'en') return src
  const key = trKey(targetLang, src)
  loadTrCache()
  if (TR_CACHE.has(key)) return TR_CACHE.get(key)
  if (TR_PENDING.has(key)) return TR_PENDING.get(key)
  const p = fetchTranslation(src, targetLang)
    .then((r) => {
      const val = String(r || src)
      TR_CACHE.set(key, val)
      TR_PENDING.delete(key)
      saveTrCache()
      return val
    })
    .catch(() => {
      TR_PENDING.delete(key)
      return src
    })
  TR_PENDING.set(key, p)
  return p
}

/** 同步读取翻译（未翻译/非核心语言返回原文）。配合异步补翻后重渲染使用。 */
const tr = (text, lang) => {
  const s = String(text ?? '').trim()
  if (!s || !lang || !isTranslatableLang(lang) || lang === 'en') return s
  loadTrCache()
  return TR_CACHE.get(trKey(lang, s)) || s
}

/** 商品标题 / 描述的本地化（同步读机翻缓存，未翻译返回原文） */
const localizedTitle = (product) => tr(product?.title || '', state.lang)
const localizedDescription = (product) => (product?.description ? tr(product.description, state.lang) : '')

/**
 * 商品一级分类的固定词表（与后台 catalog.ts 的 CATEGORIES 一一对应）。
 * 分类值是写死在库里的中文，机翻引擎对「足球球衣」这类短词并不总能命中，
 * 所以这里直接给死映射，保证英文站（默认语言）不会漏出中文。
 * 键 = 库里存的原始值；未收录的值回退原文，避免新增分类时显示成空。
 */
/* ---- X 多语言补齐（2026-10-09）----
 * 三处遗留缺口：分类显示名、尺码测量引导、定制选项提示 —— 原先只有 en+zh-CN，
 * 导致非中英访客看到英文（定制提示更糟：会直接把库里的中文渲染出来）。
 * 现各补至 70 语种，与LANGUAGES 语言表一致。
 */
const CATEGORY_I18N = {
  足球球衣: {
    en: `Football Jersey`,
    'pt-BR': `Camisa de Futebol`,
    pt: `Camisola de Futebol`,
    es: `Camiseta de Fútbol`,
    fr: `Maillot de Football`,
    de: `Fußballtrikot`,
    it: `Maglia da Calcio`,
    nl: `Voetbalshirt`,
    ru: `Футбольная футболка`,
    uk: `Футбольна футболка`,
    pl: `Koszulka Piłkarska`,
    cs: `Fotbalové tričko`,
    sk: `Futbalové tričko`,
    hu: `Futballmezt`,
    ro: `Tricou de Fotbal`,
    bg: `Футболна фланелка`,
    el: `Φανέλα Ποδοσφαίρου`,
    tr: `Futbol Forması`,
    ar: `قميص كرة القدم`,
    he: `חולצת כדורגל`,
    fa: `پیراهن فوتبال`,
    hi: `फुटबॉल जर्सी`,
    bn: `ফুটবল জার্সি`,
    ur: `فٹ بال جرسی`,
    th: `เสื้อฟุตบอล`,
    vi: `Áo Bóng Đá`,
    id: `Jersey Sepak Bola`,
    ms: `Jersi Bola Sepak`,
    tl: `Jersey ng Futbol`,
    'zh-CN': `足球球衣`,
    'zh-TW': `足球球衣`,
    ja: `サッカージャージ`,
    ko: `축구 저지`,
    mn: `Хөлбөмбөгийн өглөг`,
    kk: `Футбол жейдесі`,
    uz: `Futbol formasi`,
    km: `អាវបាល់ទាត់`,
    lo: `ເສື້ອບານເຕະ`,
    my: `ဘောလုံးဂျာစီ`,
    ne: `फुटबल जर्सी`,
    si: `පාපන්දු ජර්සිය`,
    ta: `கால்பந்து சட்டை`,
    te: `ఫుట్‌బాల్ జెర్సీ`,
    mr: `फुटबॉल जर्सी`,
    gu: `ફૂટબોલ જર્સી`,
    kn: `ಫುಟ್‌ಬಾಲ್ ಜರ್ಸಿ`,
    sw: `Jezi ya Mpira`,
    am: `የእግር ኳስ ሸሚዝ`,
    ha: `Rigar Kwallon Kafa`,
    yo: `Jesi Bọọlu`,
    ig: `Jerse bọl`,
    af: `Sokkerjersey`,
    zu: `Ijezi yeBhola`,
    xh: `Ijazi yebhola`,
    sv: `Fotbollströja`,
    da: `Fodboldtrøje`,
    no: `Fotballtrøye`,
    fi: `Jalkapalloilupaita`,
    et: `Jalgpallisärk`,
    lv: `Futbola krekls`,
    lt: `Futbolo marškinėliai`,
    hr: `Nogometna Majica`,
    sr: `Фудбалска мајица`,
    sl: `Nogometna Majica`,
    sq: `Fanella Futbolli`,
    mk: `Фудбалска маица`,
    bs: `Nogometna Majica`,
    ka: `ფეხბურთის მაისური`,
    hy: `Ֆուտբոլային մարզაჷაჺիկ`,
    az: `Futbol Forması`,
  },
  鞋子: {
    en: `Shoes`,
    'pt-BR': `Tênis`,
    pt: `Sapatos`,
    es: `Zapatos`,
    fr: `Chaussures`,
    de: `Schuhe`,
    it: `Scarpe`,
    nl: `Schoenen`,
    ru: `Обувь`,
    uk: `Взуття`,
    pl: `Buty`,
    cs: `Boty`,
    sk: `Topánky`,
    hu: `Cipő`,
    ro: `Pantofi`,
    bg: `Обувки`,
    el: `Παπούτσια`,
    tr: `Ayakkabı`,
    ar: `أحذية`,
    he: `נעליים`,
    fa: `کفش`,
    hi: `जूते`,
    bn: `জুতা`,
    ur: `جوتے`,
    th: `รองเท้า`,
    vi: `Giày`,
    id: `Sepatu`,
    ms: `Kasut`,
    tl: `Sapatos`,
    'zh-CN': `鞋子`,
    'zh-TW': `鞋子`,
    ja: `シューズ`,
    ko: `신발`,
    mn: `Шаахай`,
    kk: `Аяқ киім`,
    uz: `Poyabzal`,
    km: `ស្បែកជើង`,
    lo: `ຮອງເທົ້າ`,
    my: `ဖိနပ်`,
    ne: `जुत्ता`,
    si: `පාවහන්`,
    ta: `காலணிகள்`,
    te: `బూట్లు`,
    mr: `जोड़े`,
    gu: `જૂતા`,
    kn: `ಶೂಸ್`,
    sw: `Viatu`,
    am: `ጫማ`,
    ha: `Takalma`,
    yo: `Bata`,
    ig: `Akpụkpọ ụkwụ`,
    af: `Skoene`,
    zu: `Izicathulo`,
    xh: `Iihafi`,
    sv: `Skor`,
    da: `Sko`,
    no: `Sko`,
    fi: `Kengät`,
    et: `Jalatsid`,
    lv: `Kurpes`,
    lt: `Batai`,
    hr: `Cipele`,
    sr: `ципеле`,
    sl: `Čevlji`,
    sq: `Këpucë`,
    mk: `Чевли`,
    bs: `Cipele`,
    ka: `ფეხსაცმელი`,
    hy: `Կոշիկներ`,
    az: `Ayaqqabı`,
  },
  包包: {
    en: `Bags`,
    'pt-BR': `Bolsas`,
    pt: `Malas`,
    es: `Bolsos`,
    fr: `Sacs`,
    de: `Taschen`,
    it: `Borse`,
    nl: `Tassen`,
    ru: `Сумки`,
    uk: `Сумки`,
    pl: `Torby`,
    cs: `Tašky`,
    sk: `Tašky`,
    hu: `Táskák`,
    ro: `Genți`,
    bg: `Чанти`,
    el: `Τσάντες`,
    tr: `Çantalar`,
    ar: `حقائب`,
    he: `תיקים`,
    fa: `کیف`,
    hi: `बैग`,
    bn: `ব্যাগ`,
    ur: `بیگ`,
    th: `กระเป๋า`,
    vi: `Túi`,
    id: `Tas`,
    ms: `Beg`,
    tl: `Bag`,
    'zh-CN': `包包`,
    'zh-TW': `包包`,
    ja: `バッグ`,
    ko: `가방`,
    mn: `Цүнх`,
    kk: `Сөмкелер`,
    uz: `Sumkalar`,
    km: `កាបូប`,
    lo: `ຖົງ`,
    my: `အိတ်`,
    ne: `झोला`,
    si: `බෑග්`,
    ta: `பைகள்`,
    te: `బ్యాగులు`,
    mr: `बॅग`,
    gu: `બૅગ`,
    kn: `ಬ್ಯಾಗ್‌ಗಳು`,
    sw: `Mifuko`,
    am: `ካርታ`,
    ha: `Jaka`,
    yo: `Apo`,
    ig: `Akpa`,
    af: `Tasse`,
    zu: `Izikhwama`,
    xh: `Iingxowa`,
    sv: `Väskor`,
    da: `Tasker`,
    no: `Vesker`,
    fi: `Laukut`,
    et: `Kotid`,
    lv: `Somā`,
    lt: `Krepšiai`,
    hr: `Torbe`,
    sr: `Торбе`,
    sl: `Torbe`,
    sq: `Çanta`,
    mk: `Торби`,
    bs: `Torbe`,
    ka: `ჩანთები`,
    hy: `Պայուսակներ`,
    az: `Çantalar`,
  },
  眼镜: {
    en: `Eyewear`,
    'pt-BR': `Óculos`,
    pt: `Óculos`,
    es: `Gafas`,
    fr: `Lunettes`,
    de: `Brillen`,
    it: `Occhiali`,
    nl: `Brillen`,
    ru: `Очки`,
    uk: `Окуляри`,
    pl: `Okulary`,
    cs: `Brýle`,
    sk: `Okuliare`,
    hu: `Szemüvegek`,
    ro: `Ochelari`,
    bg: `Очила`,
    el: `Γυαλιά`,
    tr: `Gözlükler`,
    ar: `نظارات`,
    he: `משקפיים`,
    fa: `عینک`,
    hi: `चश्मा`,
    bn: `চশমা`,
    ur: `چشمہ`,
    th: `แว่นตา`,
    vi: `Kính`,
    id: `Kacamata`,
    ms: `Cermin Mata`,
    tl: `Salamin`,
    'zh-CN': `眼镜`,
    'zh-TW': `眼镜`,
    ja: `眼鏡`,
    ko: `안경`,
    mn: `Нүдний шил`,
    kk: `Көзілдірік`,
    uz: `Ko'zoynaklar`,
    km: `វ៉ែនតា`,
    lo: `ແວ່ນຕາ`,
    my: `မျက်မှန်`,
    ne: `चश्मा`,
    si: `කණ්ණාඩි`,
    ta: `கண்ணாடிகள்`,
    te: `కళ్ళద్దాలు`,
    mr: `चष्मा`,
    gu: `ચશ્મા`,
    kn: `ಕನ್ನಡಕಗಳು`,
    sw: `Miwani`,
    am: `መዓዛ`,
    ha: `Tabarau`,
    yo: `Gila`,
    ig: `Ugogbe`,
    af: `Brille`,
    zu: `Izibuko`,
    xh: `Iiglasi`,
    sv: `Glasögon`,
    da: `Briller`,
    no: `Briller`,
    fi: `Silmälasit`,
    et: `Prillid`,
    lv: `Brilles`,
    lt: `Akiniai`,
    hr: `Naočale`,
    sr: `наочаре`,
    sl: `Očala`,
    sq: `Syze`,
    mk: `Очила`,
    bs: `Naočale`,
    ka: `სათვალე`,
    hy: `Ակնոցներ`,
    az: `Eynəklər`,
  },
}

const SIZE_MEASURE_STEPS = {
  en: [
    `Lay the jersey flat and measure chest width (armpit to armpit) and length (shoulder top to hem).`,
    `For body measurements: chest = fullest part, keep the tape level and breathe normally.`,
    `Between two sizes? Choose the larger for a relaxed fit, the smaller for an athletic fit.`,
  ],
  'pt-BR': [
    `Deixe a camisa de futebol estendida e meça a largura do peito (de axila a axila) e o comprimento (do ombro à barra).`,
    `Para medidas do corpo: peito = parte mais cheia, mantenha a fita nivelada e respire normalmente.`,
    `Entre dois tamanhos? Escolha o maior para um caimento folgado, o menor para um caimento justo.`,
  ],
  pt: [
    `Estenda a camisola de futebol e meça a largura do peito (de axila a axila) e o comprimento (do ombro à barra).`,
    `Para medidas do corpo: peito = parte mais cheia, mantenha a fita nivelada e respire normalmente.`,
    `Entre dois tamanhos? Escolha o maior para um caimento folgado, o menor para um caimento justo.`,
  ],
  es: [
    `Extiende la camiseta de fútbol y mide el ancho de pecho (de axila a axila) y la longitud (del hombro al dobladillo).`,
    `Para medidas del cuerpo: pecho = parte más ancha, mantén la cinta nivelada y respira con normalidad.`,
    `¿Entre dos tallas? Elige la mayor para un ajuste holgado, la menor para un ajuste ceñido.`,
  ],
  fr: [
    `Étalez le maillot de football à plat et mesurez la largeur de poitrine (d'aisselle à aisselle) et la longueur (de l'épaule à l'ourlet).`,
    `Pour les mesures du corps : poitrine = partie la plus pleine, gardez le mètre à niveau et respirez normalement.`,
    `Entre deux tailles ? Choisissez la plus grande pour une coupe ample, la plus petite pour une coupe ajustée.`,
  ],
  de: [
    `Legen Sie das Fußballtrikot flach hin und messen Sie die Brustweite (von Achselhöhle zu Achselhöhle) und die Länge (von der Schulter bis zum Saum).`,
    `Für Körpermaße: Brust = vollste Partie, halten Sie das Band waagerecht und atmen Sie normal.`,
    `Zwischen zwei Größen? Wählen Sie die größere für eine lockere Passform, die kleinere für eine enganliegende Passform.`,
  ],
  it: [
    `Stendi la maglia da calcio piatta e misura la larghezza del petto (da ascella ad ascella) e la lunghezza (dalla spalla all'orlo).`,
    `Per le misure del corpo: petto = parte più piena, tieni il metro in piano e respira normalmente.`,
    `Tra due taglie? Scegli la più grande per una vestibilità comoda, la più piccola per una vestibilità aderente.`,
  ],
  nl: [
    `Leg het voetbalshirt plat en meet de borstbreedte (van oksel tot oksel) en de lengte (van schouder tot zoom).`,
    `Voor lichaamsmaten: borst = breedste deel, houd het meetlint horizontaal en adem normaal.`,
    `Twijfel je tussen twee maten? Kies de grootste voor een ruime pasvorm, de kleinste voor een strakke pasvorm.`,
  ],
  ru: [
    `Положите футболку на ровную поверхность и измерьте ширину груди (от подмышки до подмышки) и длину (от плеча до низа).`,
    `Для замеров тела: грудь = самая полная часть, держите сантиметр ровно и дышите спокойно.`,
    `Колеблетесь между двумя размерами? Выберите больший для свободного кроя, меньший для облегающего.`,
  ],
  uk: [
    `Покладіть футболку рівно і виміряйте ширину грудей (від пахви до пахви) та довжину (від плеча до низу).`,
    `Для замірів тіла: груди = найповніша частина, тримайте сантиметр рівно і дихайте спокійно.`,
    `Вагаєтесь між двома розмірами? Оберіть більший для вільного крою, менший для облягаючого.`,
  ],
  pl: [
    `Połóż koszulkę piłkarską płasko i zmierz szerokość klatki piersiowej (od pachy do pachy) oraz długość (od ramienia do dołu).`,
    `Dla wymiarów ciała: klatka = najszersza część, trzymaj miarę poziomo i oddychaj normalnie.`,
    `Między dwoma rozmiarami? Wybierz większy dla luźnego kroju, mniejszy dla dopasowanego.`,
  ],
  cs: [
    `Položte fotbalové tričko naplocho a změřte šířku hrudníku (od podpaží k podpaží) a délku (od ramene k lemu).`,
    `Pro tělesné míry: hrudník = nejširší část, držte metr vodorovně a dýchejte normálně.`,
    `Mezi dvěma velikostmi? Zvolte větší pro volnější střih, menší pro těsnější.`,
  ],
  sk: [
    `Položte futbalové tričko naplocho a zmerajte šírku hrudníka (od podpazušia k podpazušiu) a dĺžku (od ramena k lemu).`,
    `Pre telesné miery: hrudník = najširšia časť, držte meter vodorovne a dýchajte normálne.`,
    `Medzi dvoma veľkosťami? Zvoľte väčšiu pre voľnejší strih, menšiu pre tesnejší.`,
  ],
  hu: [
    `Terítse ki a futballmezt, és mérje meg a mellkas szélességét (hónaljtól hónaljig) és a hosszát (válltól a szegélyig).`,
    `Testméretekhez: mellkas = legteltebb rész, tartsa a mérőszalagot vízszintesen, és lélegezzen normálisan.`,
    `Két méret között? Válassza a nagyobbat laza szabáshoz, a kisebbet szűk szabáshoz.`,
  ],
  ro: [
    `Întinde tricoul de fotbal pe o suprafață plată și măsoară lățimea pieptului (de la subraț la subraț) și lungimea (de la umăr la margine).`,
    `Pentru măsurătorile corpului: piept = partea cea mai plină, ține centimetrul orizontal și respiră normal.`,
    `Între două mărimi? Alege cea mai mare pentru o croială lejeră, cea mai mică pentru una strânsă.`,
  ],
  bg: [
    `Поставете футболната фланелка на равна повърхност и измерете ширината на гръдния кош (от мишница до мишница) и дължината (от рамо до долния ръб).`,
    `За измервания на тялото: гръден кош = най-пълната част, дръжте метъра хоризонтално и дишайте нормално.`,
    `Между два размера? Изберете по-големия за свободна кройка, по-малкия за прилепваща.`,
  ],
  el: [
    `Απλώστε τη φανέλα ποδοσφαίρου επίπεδη και μετρήστε το πλάτος του στήθους (από μασχάλη σε μασχάλη) και το μήκος (από τον ώμο στην τελευταία ραφή).`,
    `Για μετρήσεις σώματος: στήθος = το πιο γεμάτο σημείο, κρατήστε τη μεζούρα οριζόντια και αναπνεύστε κανονικά.`,
    `Ανάμεσα σε δύο μεγέθη; Επιλέξτε το μεγαλύτερο για άνετη εφαρμογή, το μικρότερο για στενή.`,
  ],
  tr: [
    `Futbol formasını düz bir zemine serin ve göğüs genişliğini (koltuk altından koltuk altına) ve uzunluğu (omuzdan eteğe) ölçün.`,
    `Vücut ölçüleri için: göğüs = en dolgun kısım, mezura yatay olsun ve normal nefes alın.`,
    `İki beden arasında mı kaldınız? Bol kesim için büyüğü, dar kesim için küçüğü seçin.`,
  ],
  ar: [
    `افرد قميص كرة القدم على سطح مستوٍ وقياس عرض الصدر (من الإبط إلى الإبط) والطول (من الكتف إلى الحافة).`,
    `لقياسات الجسم: الصدر = أعرض جزء، حافظ على الشريط أفقياً وتنفس بشكل طبيعي.`,
    `بين مقاسين؟ اختر الأكبر لقصة واسعة، والأصغر لقصة ضيقة.`,
  ],
  he: [
    `פרוס את חולצת הכדורגל על משטח ישר ומדוד את רוחב החזה (מבית שחי לבית שחי) ואת האורך (מכתף לשוליים).`,
    `למדידות גוף: חזה = החלק הרחב ביותר, החזק את הסרט אופקית ונשום רגיל.`,
    `בין שני מידות? בחר את הגדול יותר לחתך רחב, והקטן יותר לחתך צמוד.`,
  ],
  fa: [
    `پیراهن فوتبال را صاف بگذارید و عرض سینه (از زیر بغل تا زیر بغل) و طول (از شانه تا لبه) را اندازه بگیرید.`,
    `برای اندازه‌گیری بدن: سینه = پرترین قسمت، متر را صاف نگه دارید و طبیعی نفس بکشید.`,
    `بین دو سایز؟ بزرگ‌تر را برای فیت گشاد، کوچک‌تر را برای فیت تنگ انتخاب کنید.`,
  ],
  hi: [
    `फुटबॉल जर्सी को समतल रखें और छाती की चौड़ाई (बगल से बगल) और लंबाई (कंधे से नीचे के किनारे तक) मापें।`,
    `शरीर के माप के लिए: छाती = सबसे भरा हुआ हिस्सा, टेप को सीधा रखें और सामान्य साँस लें।`,
    `दो साइज़ के बीच? ढीली फिट के लिए बड़ा, टाइट फिट के लिए छोटा चुनें।`,
  ],
  bn: [
    `ফুটবল জার্সিটি সমতল করে রাখুন এবং বুকের প্রস্থ (বগল থেকে বগল) ও দৈর্ঘ্য (কাঁধ থেকে নিচ পর্যন্ত) মাপুন।`,
    `শরীরের মাপের জন্য: বুক = সবচেয়ে ভরা অংশ, টেপটি সমান্তরাল রাখুন এবং স্বাভাবিক শ্বাস নিন।`,
    `দুই সাইজের মাঝখানে? ঢিলেঢালা ফিটের জন্য বড়টি, টাইট ফিটের জন্য ছোটটি বেছে নিন।`,
  ],
  ur: [
    `فٹ بال جرسی کو چپٹا رکھیں اور سینے کی چوڑائی (بغل سے بغل) اور لمبائی (کندھے سے نیچے تک) ناپیں۔`,
    `جسم کی پیمائش کے لیے: سینہ = سب سے بھرا حصہ، ٹیپ کو ہموار رکھیں اور معمولی سانس لیں۔`,
    `دو سائز کے بیچ؟ ڈھیلی فٹ کے لیے بڑا، ٹائٹ فٹ کے لیے چھوٹا منتخب کریں۔`,
  ],
  th: [
    `วางเสื้อฟุตบอลให้ราบและวัดความกว้างหน้าอก (รักแร้ถึงรักแร้) และความยาว (ไหล่ถึงชายเสื้อ)`,
    `สำหรับการวัดร่างกาย: หน้าอก = จุดที่กว้างที่สุด จับสายวัดให้ระดับและหายใจตามปกติ`,
    `อยู่ระหว่างสองไซส์? เลือกไซส์ใหญ่สำหรับทรงหลวม ไซส์เล็กสำหรับทรงรัดรูป`,
  ],
  vi: [
    `Trải áo bóng đá phẳng ra và đo rộng ngực (từ nách đến nách) và dài (từ vai đến gấu áo).`,
    `Để đo cơ thể: ngực = phần đầy nhất, giữ thước dây ngang bằng và thở bình thường.`,
    `Nằm giữa hai cỡ? Chọn cỡ lớn hơn cho form rộng, cỡ nhỏ hơn cho form ôm.`,
  ],
  id: [
    `Bentangkan jersey sepak bola rata dan ukur lebar dada (dari ketiak ke ketiak) dan panjangnya (dari bahu ke ujung bawah).`,
    `Untuk ukuran tubuh: dada = bagian terlebar, jaga penggaris tetap datar dan bernapas normal.`,
    `Di antara dua ukuran? Pilih yang lebih besar untuk fit longgar, yang lebih kecil untuk fit ketat.`,
  ],
  ms: [
    `Bentangkan jersi bola sepak secara rata dan ukur lebar dada (dari ketiak ke ketiak) dan panjangnya (dari bahu ke tepi bawah).`,
    `Untuk ukuran badan: dada = bahagian paling penuh, pastikan pita mendatar dan bernafas seperti biasa.`,
    `Antara dua saiz? Pilih yang lebih besar untuk potongan longgar, yang lebih kecil untuk potongan ketat.`,
  ],
  tl: [
    `Iwasang patag ang jersey ng futbol at sukatin ang lapad ng dibdib (mula kilikili hanggang kilikili) at haba (mula balikat hanggang laylayan).`,
    `Para sa sukat ng katawan: dibdib = pinakamapuno na bahagi, panatilihing patayo ang tape at huminga nang normal.`,
    `Nasasaad sa dalawang sukat? Piliin ang mas malaki para sa relaxed fit, ang mas maliit para sa athletic fit.`,
  ],
  'zh-CN': [
    `把球衣平铺，测量胸宽（腋下到腋下）与衣长（肩顶到下摆）。`,
    `量身体数据时：胸围取最丰满处，软尺保持水平，正常呼吸。`,
    `在两个码之间犹豫？想穿宽松选大一号，想穿修身选小一号。`,
  ],
  'zh-TW': [
    `把球衣平鋪，測量胸寬（腋下到腋下）與衣長（肩頂到下擺）。`,
    `量身體數據時：胸圍取最豐滿處，軟尺保持水平，正常呼吸。`,
    `在兩個碼之間猶豫？想穿寬鬆選大一號，想穿修身選小一號。`,
  ],
  ja: [
    `サッカージャージを平らに広げ、胸幅（脇の下から脇の下まで）と着丈（肩から裾まで）を測ります。`,
    `体のサイズを測る時：胸囲は一番膨らんだ部分を、メジャーを水平に保ち普段通り呼吸してください。`,
    `2つのサイズの間なら？ゆったり着たいなら大きい方、タイトに着たいなら小さい方を選んでください。`,
  ],
  ko: [
    `축구 저지를 평평하게 펴고 가슴 너비(겨드랑이에서 겨드랑이까지)와 길이(어깨에서 밑단까지)를 측정하세요.`,
    `신체 치수 측정 시: 가슴 = 가장 풍만한 부위, 줄자를 수평으로 유지하고 평소처럼 호흡하세요.`,
    `두 사이즈 사이라면? 여유 있는 핏은 큰 사이즈, 슬림 핏은 작은 사이즈를 선택하세요.`,
  ],
  mn: [
    `Хөлбөмбөгийн өглөгийг тэгш тавиад цээжний өргөнийг (сугаагаас сугаา хүртэл) болон уртыг (мөрнөөс үзүүр хүртэл) хэмж.`,
    `Биеийн хэмжигдэхүүнд: цээж = хамгийн бүдүүн хэсэг, суулгыг жигд барьж энгийн амьсгаал.`,
    `Хоёр хэмжээний хооронд? Зөөлөн (чөлөөтэй) загварт томыг, нарийн загварт жижигийг сонго.`,
  ],
  kk: [
    `Футбол жейдесін тегіс жайып, кеуде енін (қолтықтан қолтыққа дейін) және ұзындығын (иықтан өңіршеге дейін) өлшеңіз.`,
    `Дене өлшемі үшін: кеуде = ең толық бөлік, сантиметрді көлденең ұстап қалыпты тыныс алыңыз.`,
    `Екі өлшемнің арасындасыз ба? Босаң қима үшін үлкенін, қатты қымталған үшін кішісін таңдаңыз.`,
  ],
  uz: [
    `Futbol formasini tekis yoyib, ko'krak enini (qoltiqdan qoltiquacha) va uzunligini (yelkadan etagigacha) o'lchang.`,
    `Tana o'lchamlari uchun: ko'krak = eng to'la qism, lentani gorizontal ushlab oddiy nafas oling.`,
    `Ikki o'lcham orasida? Bo'shshoq tikish uchun kattasini, qattiq tikish uchun kichigini tanlang.`,
  ],
  km: [
    `ដាក់អាវបាល់ទាត់ឱ្យរាប ហើយវាស់ទទឹងដើមទ្រូង (ពីរច្រមុះដៃទៅរច្រមុះដៃ) និងប្រវែង (ពីស្មាដល់គែមក្រោម)។`,
    `សម្រាប់ការវាស់វែងរាងកាយ៖ ដើមទ្រូង = ផ្នែកពេញបំផុត រក្សាខ្សែវាស់ឱ្យស្មើ ហើយដកដង្ហើមធម្មតា។`,
    `នៅចន្លោះទំហំពីរ? ជ្រើសរើសធំជាងសម្រាប់ការកាត់ធូរ តូចជាងសម្រាប់ការកាត់តឹង។`,
  ],
  lo: [
    `ວາງເສື້ອບານເຕະໃຫ້ລຽບ ແລະວັດຄວາມກວ້າງໜ້າອົກ (ຈາກລັກໄກ່ຊິງຫາລັກໄກ່ຊິງ) ແລະຄວາມຍາວ (ຈາກບ່າຫາປາຍເສື້ອ)។`,
    `ສຳລັບການວັດຂະໜາດຮ່າງກາຍ: ໜ້າອົກ = ສ່ວນທີ່ກວ້າງທີ່ສຸດ ໃຫ້ຖືເສັ້ນວັດໃຫ້ສະເລີມ ແລະຫາຍໃຈປົກກະຕິ.`,
    `ຢູ່ລະຫວ່າງສອງຂະໜາດ? ເລືອກຂະໜາດໃຫຍ່ສຳລັບຟິດຫຼວມ ຂະໜາດນ້ອຍສຳລັບຟິດແຄບ.`,
  ],
  my: [
    `ဘောလုံးဂျာစီကို ပြားအောင်ချပြီး ရင်အုံအနံ (ရင်စေ့မှရင်စေ့) နှင့် အရှည် (ပခုံးမှအောက်ဆူးတိုင်) ကို တိုင်းတာ။`,
    `ခန္ဓာကိုယ်တိုင်းတာရန်- ရင်အုံ = အပြည့်ဆုံးနေရာ၊ တိုင်းတန်းကိုညီမျှထားပြီး ပုံမှန်အသက်ရှူပါ။`,
    `အရွယ်အစားနှစ်ခုကြားလား။ သက်တောင့်သက်သာဖို့ဆိုရင် ပိုကြီးတာကို အသေးကိုက်ဖို့ဆိုရင် ပိုငယ်တာကို ရွေးပါ။`,
  ],
  ne: [
    `फुटबल जर्सीलाई समतल राख्नुहोस् र छातीको चौडाइ (बगलदेखि बगलसम्म) र लम्बाइ (काँधदेखि तलसम्म) नाप्नुहोस्।`,
    `शरीरको मापनका लागि: छाती = सबैभन्दा भरिएको भाग, टेपलाई तेर्सो राख्नुहोस् र सामान्य सास फेर्नुहोस्।`,
    `दुई साइज बीच? ढिलो फिटका लागि ठूलो, टाइट फिटका लागि सानो छान्नुहोस्।`,
  ],
  si: [
    `පාපන්දු ජර්සිය සකස් කර පිළිගත් පරිදි තියන්න කලිප්පු පළල (කලවනින් කලවනට) සහ දිග (ඉරදියේ සිට යටි පැත්ත දක්වා) මැනිය යුතුය.`,
    `දේහ මිනුම් සඳහා: කලිප්පුව = වඩාත් පිරුණු කොටස, රිබින් පටිය සිරස්ව තබා සාමාන්‍ය ලෙස සුසුම් ගන්න.`,
    `ප්‍රමාණ දෙක අතරද? ලිහිල් පැලඳුම සඳහා විශාලය, විචලනය සඳහා කුඩාය තෝරන්න.`,
  ],
  ta: [
    `கால்பந்து சட்டையைத் தட்டையாக விரித்து, மார்பக அகலத்தை (அக்குள் முதல் அக்குள் வரை) மற்றும் நீளத்தை (தோளில் இருந்து அடிப்பகுதி வரை) அளவிடுங்கள்.`,
    `உடல் அளவீடுகளுக்கு: மார்பு = மிகவும் நிரப்பிய பகுதி, நாடாவை சமமாக வைத்து இயல்பாக சுவாசிக்கவும்.`,
    `இரண்டு அளவுகளுக்கு இடையே? தளர்வான பொருத்தத்திற்குப் பெரியதை, இறுக்கமான பொருத்தத்திற்குச் சிறியதைத் தேர்ந்தெடுக்கவும்.`,
  ],
  te: [
    `ఫుట్‌బాల్ జెర్సీని సమంగా పరిచి, రొమ్ము వెడల్పును (చనుముల నుండి చనుముల వరకు) మరియు పొడవును (భుజం నుండి అంచు వరకు) కొలవండి.`,
    `శరీర కొలతల కోసం: రొమ్ము = అత్యంత నిండిన భాగం, టేప్‌ను సమానంగా ఉంచి సాధారణంగా శ్వాసించండి.`,
    `రెండు సైజుల మధ్య? వదులైన ఫిట్ కోసం పెద్దది, టైట్ ఫిట్ కోసం చిన్నది ఎంచుకోండి.`,
  ],
  mr: [
    `फुटबॉल जर्सी सपाट ठेवा आणि छातीची रुंदी (बगल ते बगल) आणि लांबी (खांद्यापासून तळापर्यंत) मोजा.`,
    `शरीरमापनासाठी: छाती = सर्वात भरलेला भाग, टेप सरळ ठेवा आणि सामान्य श्वास घ्या.`,
    `दोन साइजमध्ये? ढिला फिटसाठी मोठा, टाइट फिटसाठी लहान निवडा.`,
  ],
  gu: [
    `ફૂટબોલ જર્સીને સમતળ રાખો અને છાતીની પહોળાઈ (બગલથી બગલ) અને લંબાઈ (ખભાથી તળિયા સુધી) માપો.`,
    `શરીર માપ માટે: છાતી = સૌથી ભરેલો ભાગ, ટેપને સીધી રાખો અને સામાન્ય શ્વાસ લો.`,
    `બે સાઇઝ વચ્ચે? ઢીલી ફિટ માટે મોટી, ટાઇટ ફિટ માટે નાની પસંદ કરો.`,
  ],
  kn: [
    `ಫುಟ್‌ಬಾಲ್ ಜರ್ಸಿಯನ್ನು ಸಮತಟ್ಟಾಗಿ ಇಟ್ಟು, ಎದೆಯ ಅಗಲವನ್ನು (ಕಂಕಣದಿಂದ ಕಂಕಣಕ್ಕೆ) ಮತ್ತು ಉದ್ದವನ್ನು (ಭುಜದಿಂದ ಅಂಚಿನವರೆಗೆ) ಅಳೆಯಿರಿ.`,
    `ದೇಹ ಮಾಪನಕ್ಕೆ: ಎದೆ = ಅತ್ಯಂತ ತುಂಬಿದ ಭಾಗ, ಟೇಪ್ ಅನ್ನು ಸಮತಟ್ಟಾಗಿ ಹಿಡಿದು ಸಾಮಾನ್ಯ ಉಸಿರಾಡಿ.`,
    `ಎರಡು ಗಾತ್ರಗಳ ನಡುವೆ? ವಿಶಾಲ ಫಿಟ್‌ಗಾಗಿ ದೊಡ್ಡದನ್ನು, ಟೈಟ್ ಫಿಟ್‌ಗಾಗಿ ಸಣ್ಣದನ್ನು ಆಯ್ಕೆಮಾಡಿ.`,
  ],
  sw: [
    `Tandaza jezi ya mpira sawasawa na upime upana wa kifua (kutoka kwapa hadi kwapa) na urefu (kutoka bega hadi ukingo).`,
    `Kwa vipimo vya mwili: kifua = sehemu iliyojaa zaidi, shika tepu iwe sawa na pumua kawaida.`,
    `Kati ya ukubwa mbili? Chagua kubwa zaidi kwa mavazi ya raha, ndogo zaidi kwa mavazi ya kushikana.`,
  ],
  am: [
    `የእግር ኳስ ሸሚዙን ሰፊ አድርገው ያምጡ እና የከተት ስፋት (ከእግርጫ እስከ እግርጫ) እና ርዝመት (ከትከሻ እስከ ጫፍ) ይለኩ።`,
    `ለሰው አካል ልኬት፡ ከተት = የበለጠ የተሞላ ክፍል፣ ሜትሩን አውሳኝ ያድርጉ እና እንደተወለደ እየነፉ ይቆዩ።`,
    `በሁለት መጠን መካከል? ለሰቃሚ ፊት ትልቁን ለቋኝ ፊት ትንሹን ይምረጡ።`,
  ],
  ha: [
    `Shimfida rigar kwallon kafa a kwance kuma a auna faɗin kirji (daga hannun riga zuwa hannun riga) da tsayinta (daga kafaɗa zuwa ƙarshe).`,
    `Don auna jiki: kirji = mafi cike, riƙe tef ɗin a kwance kuma a numfasa ta yadda ya dace.`,
    `Tsakanin girma biyu? Zaɓi mafi girma don sako-sako, mafi ƙarami don dacewa sosai.`,
  ],
  yo: [
    `Fi jesi bọọlu naa ni pẹlupẹlu o si wọn iwọn àyà (lati apa de apa) ati giga (lati ejika de ipari).`,
    `Fun wiwọn ara: àyà = apa ti o kun julọ, di teepu naa ni petele ki o si mi laaye deede.`,
    `Laarin iwọn meji? Yan ti o tobi fun ibamu alaimuṣinmi, ti o kere fun ibamu ti o ni wahala.`,
  ],
  ig: [
    `Tọka jerse bọl ahụ n'elu ihe dị larịị wee tụọ obosara ara (site na azụ aka ruo azụ aka) na ogologo (site na ubu ruo ala).`,
    `Maka atụ aka ahụ: ara = akụkụ kacha juru, jide teepu ahụ n'usoro ma saa ụfụfụ nkịtị.`,
    `N'etiti nha abụọ? Họrọ nke ka ibu maka uwe dị nro, nke ka nta maka uwe siri ike.`,
  ],
  af: [
    `Lê die sokkerjersey plat neer en meet die borswydte (van oksel tot oksel) en lengte (van skouer tot soom).`,
    `Vir lyfmate: bors = volste deel, hou die meetband gelyk en asem normaal.`,
    `Tussen twee groottes? Kies die groter vir 'n losser pas, die kleiner vir 'n stywer pas.`,
  ],
  zu: [
    `Beka ijezi yeboli ngokuyiyeka phansi bese uyalinganisa ububanzi besifuba (ukusuka ekhwapheni uye ekhwapheni) nobude (ukusuka ehlomendle uye emaphethelweni).`,
    `Ukuze ulinganise umzimba: isifuba = ingxenye egcwele, gcina umshini wokulinganisa uvundlile futhi uphefumule njengenjalo.`,
    `Phakathi kosayizi ababili? Khetha owesikhulu ngesikhathi sokufaneleka okukhululekile, omncane ngesikhathi sokufaneleka okuqinile.`,
  ],
  xh: [
    `Beka ijazi yebhola phantsi ngokuthe tyaba kwaye ulinganise ububanzi besifuba (ukusuka phantsi kwengalokho ukuya kwenye) nobude (ukusuka egxeni ukuya emaphethelweni).`,
    `Ukulinganisa umzimba: isifuba = elona candelo ligcwele, bamba umtya ngokuthe tyaba kwaye uphefumle ngokuqhelekileyo.`,
    `Phakathi kobukhulu obubini? Khetha obukhulu ngenxa yokuqina okukhululekileyo, obuncinci ngenxa yokuqina okuqinileyo.`,
  ],
  sv: [
    `Lägg fotbollströjan platt och mät bröstbredden (från armhåla till armhåla) och längden (från axel till fåll).`,
    `För kroppsmått: bröst = bredaste delen, håll måttbandet rakt och andas normalt.`,
    `Mellan två storlekar? Välj den större för en lös passform, den mindre för en tät passform.`,
  ],
  da: [
    `Læg fodboldtrøjen fladt og mål brystbredden (fra armhule til armhule) og længden (fra skulder til søm).`,
    `For kropsmål: bryst = bredeste del, hold målebåndet vandret og ånd normalt.`,
    `Mellem to størrelser? Vælg den større til et løsere snit, den mindre til et strammere snit.`,
  ],
  no: [
    `Legg fotballtrøya flat og mål brystbredden (fra armhule til armhule) og lengden (fra skulder til søm).`,
    `For kroppsmål: bryst = bredeste del, hold målebåndet vannrett og pust normalt.`,
    `Mellom to størrelser? Velg den større for en løsere passform, den mindre for en strammere passform.`,
  ],
  fi: [
    `Aseta jalkapalloilupaita tasaiselle alustalle ja mittaa rinnan leveys (kainalosta kainaloon) ja pituus (olkapäästä helmaan).`,
    `Vartalon mittoja varten: rinta = täyteläisin kohta, pidä mittanauha vaakasuorassa ja hengitä normaalisti.`,
    `Kahden koon välillä? Valitse suurempi väljemmän istuvuuden, pienempi tiukemman istuvuuden saamiseksi.`,
  ],
  et: [
    `Laota jalgpallisärk lamele ja mõõtke rinna laius (kaenlast kaenlani) ning pikkus (õlast servani).`,
    `Keha mõõtmiseks: rind = täidlasem osa, hoidke mõõdunau horisontaalselt ja hingake tavaliselt.`,
    `Kahe suuruse vahel? Valige suurem lõdva lõikkemoe jaoks, väiksem tiheda jaoks.`,
  ],
  lv: [
    `Nolieciet futbola kreklu plakani un izmēriet krūšu platumu (no paduses līdz padusei) un garumu (no pleca līdz apmalei).`,
    `Ķermeņa mērījumiem: krūtis = pilnīgākā daļa, turiet mērlenti līmeni un elpojiet normāli.`,
    `Starp diviem izmēriem? Izvēlieties lielāko brīvai piegulei, mazāko ciešai.`,
  ],
  lt: [
    `Padėkite futbolo marškinėlius lygiai ir išmatuokite krūtinės plotį (nuo pažasties iki pažasties) bei ilgį (nuo peties iki apačios).`,
    `Kūno matmenims: krūtinė = pilniausia dalis, laikykite linentą horizontaliai ir kvėpuokite normaliai.`,
    `Tarp dviejų dydžių? Pasirinkite didesnį laisvesnei prievelei, mažesnį prigludusiai.`,
  ],
  hr: [
    `Položite nogometnu majicu ravno i izmjerite širinu prsa (od pazuha do pazuha) i duljinu (od ramena do ruba).`,
    `Za mjere tijela: prsa = najpuniji dio, držite traku vodoravno i dišite normalno.`,
    `Između dvije veličine? Odaberite veću za opušteniji kroj, manju za pripijeni.`,
  ],
  sr: [
    `Положите фудбалску мајицу равно и измерите ширину груди (од пазухе до пазухе) и дужину (од рамена до ивице).`,
    `За мере тела: груди = најпунiji део, држите траку водоравно и дишите нормално.`,
    `Између две величине? Изaberите већу за опуштенији крој, мању за припијени.`,
  ],
  sl: [
    `Položite nogometno majico ravno in izmerite širino prsi (od pazduhe do pazduhe) in dolžino (od ramena do roba).`,
    `Za mere telesa: prsi = najpolnejši del, držite trak vodoravno in normalno dihajte.`,
    `Med dvema velikostma? Izberite večjo za ohlapen kroj, manjšo za oprijemljiv.`,
  ],
  sq: [
    `Shtrini fanellën e futbollit të sheshtë dhe monto gjerësinë e gjoksit (nga sqetulla te sqetulla) dhe gjatësinë (nga supi te skaji).`,
    `Për masa trupore: gjoksi = pjesa më e plotë, mbaj shiritin horizontal dhe merr frymë normalisht.`,
    `Mes dy madhësish? Zgjidh më të madhen për një prerje të lirshme, më të voglin për një të ngushtë.`,
  ],
  mk: [
    `Ставете ја фудбалската маица рамно и измерете ја ширината на градите (од пазувата до пазувата) и должината (од рамото до рабовите).`,
    `За мерење на телото: гради = најполниот дел, држете ја лентата хоризонтално и дишајте нормално.`,
    `Помеѓу две големини? Изберете ја поголемата за порамна кројка, помалата за потесна.`,
  ],
  bs: [
    `Položite nogometnu majicu ravno i izmjerite širinu prsa (od pazuha do pazuha) i dužinu (od ramena do ruba).`,
    `Za mjere tijela: prsa = najpuniji dio, držite traku vodoravno i dišite normalno.`,
    `Između dvije veličine? Odaberite veću za opušteniji kroj, manju za pripijeni.`,
  ],
  ka: [
    `დასვით ფეხბურთის მაისური გაშლილად და გაზომეთ მკერდის სიგანე (გულმკლავიდან გულმკლავამდე) და სიგრძე (მხრიდან კიდემდე).`,
    `სხეულის ზომებისთვის: მკერდი = ყველაზე სქელი ნაწილი, შეინარჩუნეთ ლენტი ჰორიზონტალურად და ჩვეულებრივ მოისვიშთ.`,
    `ორი ზომის შორის? აირჩიეთ დიდი თავისუფალი მორჩისთვის, პატარა მჭიდროსთვის.`,
  ],
  hy: [
    `Դրեք ֆուտբոլային մարզաշապիկը հարթ և չափեք կրծքավանդակի լայնությունը (անութից անութ) և երկարությունը (ուսից մինչև եզր)։`,
    `Մարմնի չափումների համար՝ կրծքավանդակ = ամենալայն հատվածը, պահեք ժապավենը հորիզոնական և բնականոն շնչեք։`,
    `Երկու չափսի միջև։ Փուխր տեսքի համար ընտրեք մեծը, կծկվածի համար՝ փոքրը։`,
  ],
  az: [
    `Futbol formasını düz qoyun və sinə enini (qoltuqdan qoltuğa) və uzunluğunu (çiynindən kənarınadək) ölçün.`,
    `Bədən ölçüləri üçün: sinə = ən dolğun hissə, lentani üfüqi saxlayın və adi nəfəs alın.`,
    `İki ölçü arasındasınız? Boşqab kəsik üçün böyüyünü, sıx kəsik üçün kiçiyini seçin.`,
  ],
}

const LEGACY_OPT_HINTS = {
  '球衣背面印字：名字 ≤ 14 字符，号码 0~99': {
    en: `Back printing: name up to 14 characters, number 0–99`,
    'pt-BR': `Impressão nas costas: nome com até 14 caracteres, número 0–99`,
    pt: `Impressão nas costas: nome até 14 caracteres, número 0–99`,
    es: `Impresión en la espalda: nombre de hasta 14 caracteres, número 0–99`,
    fr: `Impression au dos : nom jusqu'à 14 caractères, numéro 0–99`,
    de: `Rückendruck: Name bis zu 14 Zeichen, Nummer 0–99`,
    it: `Stampa sul retro: nome fino a 14 caratteri, numero 0–99`,
    nl: `Bedrukking op de rug: naam tot 14 tekens, nummer 0–99`,
    ru: `Печать на спине: имя до 14 символов, номер 0–99`,
    uk: `Друк на спині: ім'я до 14 символів, номер 0–99`,
    pl: `Nadruk na plecach: imię do 14 znaków, numer 0–99`,
    cs: `Potisk na zádech: jméno do 14 znaků, číslo 0–99`,
    sk: `Potlač na chrbte: meno do 14 znakov, číslo 0–99`,
    hu: `Háti nyomtatás: név legfeljebb 14 karakter, szám 0–99`,
    ro: `Imprimare pe spate: nume de până la 14 caractere, număr 0–99`,
    bg: `Отпечатване на гърба: име до 14 знака, номер 0–99`,
    el: `Εκτύπωση στην πλάτη: όνομα έως 14 χαρακτήρες, αριθμός 0–99`,
    tr: `Sırt baskısı: isim en fazla 14 karakter, numara 0–99`,
    ar: `طباعة خلفية: الاسم حتى 14 حرفاً، الرقم 0–99`,
    he: `הדפסה על הגב: שם עד 14 תווים, מספר 0–99`,
    fa: `چاپ پشت: نام تا 14 کاراکتر، شماره 0–99`,
    hi: `पीछे की छपाई: नाम 14 अक्षर तक, नंबर 0–99`,
    bn: `পেছনে ছাপ: নাম সর্বোচ্চ 14 অক্ষর, নম্বর 0–99`,
    ur: `پچھلی پرنٹنگ: نام 14 حروف تک، نمبر 0–99`,
    th: `พิมพ์ด้านหลัง: ชื่อสูงสุด 14 ตัวอักษร หมายเลข 0–99`,
    vi: `In mặt sau: tên tối đa 14 ký tự, số 0–99`,
    id: `Cetak belakang: nama hingga 14 karakter, nomor 0–99`,
    ms: `Cetakan belakang: nama sehingga 14 aksara, nombor 0–99`,
    tl: `Back printing: pangalan hanggang 14 na character, numero 0–99`,
    'zh-CN': `球衣背面印字：名字 ≤ 14 字符，号码 0~99`,
    'zh-TW': `球衣背面印字：名字 ≤ 14 字元，號碼 0~99`,
    ja: `背中のプリント：名前は最大14文字、番号は0–99`,
    ko: `등판 인쇄: 이름은 최대 14자, 번호는 0–99`,
    mn: `Ард хэвлэх: нэр хамгийн ихдээ 14 тэмдэгт, дугаар 0–99`,
    kk: `Артқы басып шығару: аты 14 таңбаға дейін, нөмірі 0–99`,
    uz: `Orqa bosib chiqarish: ism 14 belgigacha, raqam 0–99`,
    km: `ការបោះពុម្ពផ្នែកខាងក្រោយ៖ ឈ្មោះរហូតដល់ 14 តួអក្សរ លេខ 0–99`,
    lo: `ພິມດ້ານຫຼັງ: ຊື່ສູງສຸດ 14 ຕົວອັກສອນ ເລກ 0–99`,
    my: `နောက်ကျောပုံနှိပ်ခြင်း- အမည် ၁၄ လုံးထိ၊ နံပါတ် 0–99`,
    ne: `पछाडि छाप: नाम १४ अक्षरसम्म, नम्बर ०–९९`,
    si: `පිටුපස මුද්‍රණය: නම අකුරු 14 දක්වා, අංක 0–99`,
    ta: `பின்புற அச்சிடுதல்: பெயர் 14 எழுத்துகள் வரை, எண் 0–99`,
    te: `వెనుక ముద్రణ: పేరు 14 అక్షరాల వరకు, నంబర్ 0–99`,
    mr: `मागील छपाई: नाव 14 अक्षरांपर्यंत, क्रमांक 0–99`,
    gu: `પાછળની છપાઈ: નામ 14 અક્ષર સુધી, નંબર 0–99`,
    kn: `ಹಿಂಭಾಗದ ಮುದ್ರಣ: ಹೆಸರು 14 ಅಕ್ಷರಗಳವರೆಗೆ, ಸಂಖ್ಯೆ 0–99`,
    sw: `Uchapishaji wa nyuma: jina hadi herufi 14, nambari 0–99`,
    am: `የመደብ ማተም፡ ስም እስከ 14 ቁምፊ፣ ቁጥር 0–99`,
    ha: `Buga baya: suna har haruffa 14, lamba 0–99`,
    yo: `Tẹ̀ ẹ̀yìn: orukọ titi de 14 awọn ohun kikọ, nọmba 0–99`,
    ig: `Mbipụta azụ: aha ruo mkpụrụedemede 14, nọmba 0–99`,
    af: `Agterdruk: naam tot 14 karakters, nommer 0–99`,
    zu: `Ukuphrinta ngemuva: igama elifika ezinhlamvini ezingu-14, inombolo 0–99`,
    xh: `Ukuprinta ngasemva: igama ukuya kutsho kwiimpawu ezili-14, inombolo 0–99`,
    sv: `Tryck på ryggen: namn upp till 14 tecken, nummer 0–99`,
    da: `Tryk på ryggen: navn op til 14 tegn, nummer 0–99`,
    no: `Trykk på ryggen: navn opp til 14 tegn, nummer 0–99`,
    fi: `Takapainatus: nimi enintään 14 merkkiä, numero 0–99`,
    et: `Seljaprintimine: nimi kuni 14 tähemärki, number 0–99`,
    lv: `Muguras druka: vārds līdz 14 rakstzīmēm, numurs 0–99`,
    lt: `Nugaros spauda: vardas iki 14 simbolių, numeris 0–99`,
    hr: `Tisak na leđima: ime do 14 znakova, broj 0–99`,
    sr: `Штампа на леђима: име до 14 знакова, број 0–99`,
    sl: `Tisk na hrbtu: ime do 14 znakov, številka 0–99`,
    sq: `Printim mbrapa: emri deri në 14 karaktere, numri 0–99`,
    mk: `Печатење на грб: име до 14 знаци, број 0–99`,
    bs: `Štampa na leđima: ime do 14 znakova, broj 0–99`,
    ka: `ზურგის ბეჭდვა: სახელი 14 სიმბოლომდე, ნომერი 0–99`,
    hy: `Մեջքի տպագրություն. անունը մինչև 14 նիշ, համարը 0–99`,
    az: `Arxa çap: adı 14 simvola qədər, nömrə 0–99`,
  },
};

/** 分类显示名：非中英语言退回英文（站点基础语言），保证不会出现中文残留 */
function categoryLabel(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return t('uncategorized')
  const hit = CATEGORY_I18N[raw]
  if (!hit) return raw
  return hit[state.lang] || hit.en || raw
}

/**
 * 商品 options 里的 hint 是建品时由后台预写进库的（后台上是中文文案），
 * 而前台是给欧美买家看的，直接把库里那句中文渲染出来就是双语穿帮。
 * 这里有两条兜底：
 *   1. 已知的历史文案 → 静态词表，覆盖现有全部商品，不依赖机翻；
 *   2. 卖家自己另填的中文提示 → 非中文界面下退回通用提示，绝不外露中文。
 */
function optHintLabel(hint) {
  const raw = String(hint ?? '').trim()
  if (!raw) return t('customizeHint')
  const hit = LEGACY_OPT_HINTS[raw]
  if (hit) return hit[state.lang] || hit.en || raw
  if (!isZh(state.lang) && /[\u4e00-\u9fff]/.test(raw)) return t('customizeHint')
  return raw
}

/**
 * 把当前视口内（或前 N 件）商品的标题与描述机翻到当前核心语言，补齐后重渲染。
 * 首次访问一种语言时，卡片先显示原文，机翻回来后自动刷新为本地语言。
 */
async function translateVisibleProducts() {
  const lang = state.lang || 'en'
  if (!isTranslatableLang(lang) || lang === 'en' || isZh(lang)) return
  // 取当前列表已展示的商品（最多 20 件，避免一次性打爆翻译接口配额）
  const list = filteredProducts().slice(0, 20)
  const targets = []
  const seen = new Set()
  const push = (text) => {
    const s = String(text || '').trim()
    if (!s || s.length < 2) return
    const key = trKey(lang, s)
    if (TR_CACHE.has(key) || seen.has(key)) return
    seen.add(key)
    targets.push(s)
  }
  for (const p of list) {
    push(p.title)
    push(p.description)
    push(p.title_local)
  }
  // 分类名也一并翻译（导航 / 面包屑 / 分类卡片）
  for (const g of state.groups) push(g.name)
  if (!targets.length) return
  await Promise.all(targets.map((text) => translateText(text, lang)))
  render()
}

/** 常用货币名（下拉展示用，含未在 LANG_TO_CURRENCY 里的补充币种） */
const CURRENCY_NAMES = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', JPY: 'Japanese Yen',
  KRW: 'South Korean Won', CNY: 'Chinese Yuan', HKD: 'Hong Kong Dollar',
  TWD: 'New Taiwan Dollar', SGD: 'Singapore Dollar', MYR: 'Malaysian Ringgit',
  THB: 'Thai Baht', IDR: 'Indonesian Rupiah', PHP: 'Philippine Peso',
  VND: 'Vietnamese Dong', INR: 'Indian Rupee', PKR: 'Pakistani Rupee',
  BDT: 'Bangladeshi Taka', AED: 'UAE Dirham', SAR: 'Saudi Riyal',
  TRY: 'Turkish Lira', RUB: 'Russian Ruble', PLN: 'Polish Złoty',
  CZK: 'Czech Koruna', BRL: 'Brazilian Real', MXN: 'Mexican Peso',
  ARS: 'Argentine Peso', CLP: 'Chilean Peso', COP: 'Colombian Peso',
  CAD: 'Canadian Dollar', AUD: 'Australian Dollar', NZD: 'New Zealand Dollar',
  ZAR: 'South African Rand', NGN: 'Nigerian Naira', KES: 'Kenyan Shilling',
  EGP: 'Egyptian Pound', MAD: 'Moroccan Dirham', CHF: 'Swiss Franc',
  SEK: 'Swedish Krona', NOK: 'Norwegian Krone', DKK: 'Danish Krone',
  ILS: 'Israeli Shekel', UAH: 'Ukrainian Hryvnia', KZT: 'Kazakhstani Tenge',
  QAR: 'Qatari Riyal', KWD: 'Kuwaiti Dinar', BHD: 'Bahraini Dinar',
  OMR: 'Omani Rial', JOD: 'Jordanian Dinar',
}

/* ------------------------------ 界面文案 i18n ------------------------------ */
/**
 * 界面文案字典。当前完整维护「英文（默认）+ 简体中文」两套，
 * 其余语言回退到英文（价格/币种仍按国家自动换算，不受文案影响）。
 * key 对应界面上的短语，value 形如 { en, 'zh-CN' }。
 */
const I18N = {
  // M7 a11y
  skipToContent: { en: 'Skip to content', 'zh-CN': '跳到主要内容' },
  // M3 PWA 离线兜底
  offlineHint: {
    en: "You're offline — showing saved content. Some prices may be out of date.",
    'zh-CN': '当前处于离线状态，展示的是已缓存内容，部分价格可能不是最新。',
  },
  retry: { en: 'Retry', 'zh-CN': '重试' },
  fAccessibility: { en: 'Accessibility', 'zh-CN': '无障碍' },
  // 顶栏 / 导航
  allProducts: { en: 'All Products', 'zh-CN': '全部商品' },
  viewAll: { en: 'View all', 'zh-CN': '查看全部' },
  noProducts: { en: 'No subcategories yet', 'zh-CN': '暂无下级分类' },
  searchPlaceholder: { en: 'Search jerseys / teams / products', 'zh-CN': '搜索球衣 / 球队 / 商品' },
  cart: { en: 'Cart', 'zh-CN': '购物车' },
  trackOrder: { en: 'Track Order', 'zh-CN': '订单查询' },
  loginRegister: { en: 'Sign in / Register', 'zh-CN': '登录 / 注册' },
  languageCurrency: { en: 'Language & Currency', 'zh-CN': '语言与货币' },
  // 首页 hero
  heroTitle: { en: '2026-27 Season Kits &amp; Gear<br />Sizes · PATCH Badges · Name &amp; Number', 'zh-CN': '2026-27 赛季球衣与装备<br />支持尺码 · PATCH 徽章 · 印字印号定制' },
  heroSub: { en: 'What you see is what you get: pick a size, add PATCH badges, print your name and number — every add-on is priced into the total in real time.', 'zh-CN': '所见即所得：选择尺码、加贴 PATCH 徽章、印上你的名字与号码，每一项的加价都会实时累计到总价里。' },
  heroTagCompare: { en: 'List vs sale price side by side', 'zh-CN': '原价与折扣价同屏对照' },
  // 筛选
  all: { en: 'All', 'zh-CN': '全部' },
  onlineOnly: { en: 'In-stock only', 'zh-CN': '只看已上架' },
  back: { en: '← Back', 'zh-CN': '← 返回' },
  countNote: { en: (n) => `${n} products · data loaded live from the API domain`, 'zh-CN': (n) => `共 ${n} 件商品 · 数据来自接口域名实时读取` },
  gridShown: { en: (shown, total) => `Showing ${shown} of ${total} matching products`, 'zh-CN': (shown, total) => `已显示 ${shown} / ${total} 件匹配商品` },
  emptyFilter: { en: 'No matching products. Try a different filter or add products in the admin panel.', 'zh-CN': '没有匹配的商品，换个筛选条件或到后台「商品管理」新增商品。' },
  loading: { en: 'Loading product data from the API domain…', 'zh-CN': '正在从接口域名加载商品数据…' },
  // 商品卡片
  uncategorized: { en: 'Uncategorized', 'zh-CN': '未分类' },
  customPrintable: { en: 'Customizable', 'zh-CN': '可定制印字' },
  // 商品状态
  statusOnline: { en: 'Online', 'zh-CN': '已上架' },
  statusAuditing: { en: 'Reviewing', 'zh-CN': '审核中' },
  statusRejected: { en: 'Rejected', 'zh-CN': '审核驳回' },
  statusOffline: { en: 'Offline', 'zh-CN': '已下架' },
  statusDraft: { en: 'Draft', 'zh-CN': '草稿' },
  // 详情页
  home: { en: 'Home', 'zh-CN': '首页' },
  notFound: { en: 'Product does not exist or was removed. <a href="/">Back to home</a>', 'zh-CN': '商品不存在或已被删除。<a href="/">返回首页</a>' },
  // Footer（对照 Fanatics 结构）
  footerCs: { en: 'Customer Service', 'zh-CN': '客户服务' },
  fContact: { en: 'Contact Us', 'zh-CN': '联系我们' },
  fHelp: { en: 'Help Center', 'zh-CN': '帮助中心' },
  fTrack: { en: 'Track My Order', 'zh-CN': '订单查询' },
  fShipping: { en: 'Shipping', 'zh-CN': '配送说明' },
  fGetApp: { en: 'Get the App', 'zh-CN': '下载 App' },
  fSizeChart: { en: 'Size Chart', 'zh-CN': '尺寸表' },
  fWorry: { en: 'Worry Free Shopping', 'zh-CN': '无忧购物' },
  fReturns: { en: '30-Day Returns', 'zh-CN': '30 天退换' },
  fAuthentic: { en: 'Authenticity Guarantee', 'zh-CN': '正品保证' },
  fSafe: { en: 'Safe Shopping', 'zh-CN': '安全支付' },
  fPromo: { en: 'Promo Terms', 'zh-CN': '促销条款' },
  fInfo: { en: 'Information', 'zh-CN': '关于我们' },
  fAbout: { en: 'About Us', 'zh-CN': '品牌介绍' },
  fPrivacy: { en: 'Privacy Policy', 'zh-CN': '隐私政策' },
  fTerms: { en: 'Terms of Use', 'zh-CN': '使用条款' },
  footerSocial: { en: 'Follow Us', 'zh-CN': '关注我们' },
  fSignup: { en: 'SIGN UP & SAVE!', 'zh-CN': '订阅优惠！' },
  fSignupNote: { en: 'Stay updated on sales, new items and more.', 'zh-CN': '第一时间获取折扣、新品与更多资讯。' },
  fEmailPh: { en: 'Enter your email', 'zh-CN': '输入你的邮箱' },
  fSubscribe: { en: 'Subscribe', 'zh-CN': '订阅' },
  fSubOk: { en: 'Subscribed! Welcome aboard.', 'zh-CN': '订阅成功，欢迎加入！' },
  fSubErr: { en: 'Subscription failed, please try again.', 'zh-CN': '订阅失败，请稍后再试。' },
  customizeHint: { en: 'Each entry is priced separately; leave blank for no charge', 'zh-CN': '填写后按项加价，留空不加价' },
  customizeNumberHint: { en: '0 ~ 99', 'zh-CN': '0 ~ 99' },
  customizeMaxChars: { en: (n) => `up to ${n} characters`, 'zh-CN': (n) => `最多 ${n} 个字符` },
  pickPatchHint: { en: 'Click to choose the badge to add', 'zh-CN': '点击选择要加贴的徽章' },
  noExtraCharge: { en: 'Free', 'zh-CN': '不加价' },
  chooseSize: { en: 'Choose size', 'zh-CN': '选择尺码' },
  specSku: { en: 'SKU', 'zh-CN': '商品编号' },
  specCategory: { en: 'Category', 'zh-CN': '类目' },
  specBrand: { en: 'Brand', 'zh-CN': '品牌' },
  specStock: { en: 'Stock', 'zh-CN': '库存' },
  specSales: { en: 'Sold', 'zh-CN': '销量' },
  specStatus: { en: 'Status', 'zh-CN': '上架状态' },
  unitPieces: { en: 'pcs', 'zh-CN': '件' },
  descTitle: { en: 'Description', 'zh-CN': '商品描述' },
  descEmpty: { en: 'No description yet.', 'zh-CN': '暂无描述。' },
  infoTitle: { en: 'Details', 'zh-CN': '商品信息' },
  saveNow: { en: (list, save) => `Was ${list}, save ${save}`, 'zh-CN': (list, save) => `原价 ${list}，立省 ${save}` },
  noDiscount: { en: 'No discount — sold at list price', 'zh-CN': '当前无折扣，按原价销售' },
  noOptions: { en: 'This product has no options or customizations yet.', 'zh-CN': '该商品暂无可选规格与定制项。' },
  addToCart: { en: 'Add to Cart', 'zh-CN': '加入购物车' },
  keepShopping: { en: 'Keep Shopping', 'zh-CN': '继续逛' },
  summaryBase: { en: 'Discounted price', 'zh-CN': '商品折扣价' },
  summaryAddon: { en: 'Customization add-ons', 'zh-CN': '定制加价' },
  summaryTotal: { en: 'Total', 'zh-CN': '合计' },
  // 购物车
  cartEmpty: { en: 'Your cart is empty.<br />Pick a jersey and add your name and number.', 'zh-CN': '购物车还是空的。<br />挑一件球衣，再选上你的名字和号码。' },
  defaultSpec: { en: 'Default', 'zh-CN': '默认规格' },
  qtyLabel: { en: 'Qty', 'zh-CN': '数量' },
  remove: { en: 'Remove', 'zh-CN': '移除' },
  checkout: { en: 'Checkout (demo flow)', 'zh-CN': '去结算（演示流程）' },
  checkoutToast: { en: 'Demo flow: payment channel not yet connected to a real merchant account', 'zh-CN': '演示流程：结算与支付通道待接入真实收款账户' },
  // 订单状态
  orderPendingShipment: { en: 'Pending shipment', 'zh-CN': '等待发货' },
  orderShipping: { en: 'In transit', 'zh-CN': '运输中' },
  orderCompleted: { en: 'Completed', 'zh-CN': '已完成' },
  orderRefunding: { en: 'Refunding', 'zh-CN': '退款中' },
  orderCancelled: { en: 'Cancelled', 'zh-CN': '已取消' },
  unknown: { en: 'Unknown', 'zh-CN': '未知' },
  // 账号
  myAccount: { en: 'My Account', 'zh-CN': '我的账户' },
  loginOrRegisterHint: { en: 'Sign in or register a customer account', 'zh-CN': '登录或注册客户账号' },
  fieldAccount: { en: 'Account', 'zh-CN': '账号' },
  fieldPassword: { en: 'Password', 'zh-CN': '密码' },
  fieldConfirm: { en: 'Confirm password', 'zh-CN': '确认密码' },
  fieldCountry: { en: 'Country', 'zh-CN': '国家' },
  pickCountry: { en: 'Please pick your country from the list', 'zh-CN': '请从列表中选择国家' },
  fieldState: { en: 'State / Province', 'zh-CN': '州 / 省' },
  fieldCity: { en: 'City', 'zh-CN': '城市' },
  fieldAddress: { en: 'Address', 'zh-CN': '收货地址' },
  fieldHouse: { en: 'House No.', 'zh-CN': '门牌号' },
  fieldZip: { en: 'ZIP / Postal code', 'zh-CN': '邮编号' },
  fieldPhone: { en: 'Phone', 'zh-CN': '手机号' },
  registerSuccess: { en: (a) => `Registered — welcome ${a}`, 'zh-CN': (a) => `注册成功，欢迎 ${a}` },
  welcomeBack: { en: (a) => `Welcome back, ${a}`, 'zh-CN': (a) => `欢迎回来，${a}` },
  loggedOut: { en: 'Signed out', 'zh-CN': '已退出登录' },
  phoneAccount: { en: 'Phone account', 'zh-CN': '手机号账号' },
  emailAccount: { en: 'Email account', 'zh-CN': '邮箱账号' },
  registeredOn: { en: (d) => `registered on ${d}`, 'zh-CN': (d) => `注册于 ${d}` },
  defaultAddress: { en: 'Default shipping address', 'zh-CN': '默认收货地址' },
  trackOrdersAction: { en: 'Track order / logistics', 'zh-CN': '查询订单 / 物流' },
  logoutAction: { en: 'Sign out', 'zh-CN': '退出登录' },
  // 订单查询
  trackLead: { en: 'Enter an order number or tracking number to view details; live tracking continues on 17TRACK.', 'zh-CN': '输入订单编号或物流单号，查看订单信息；包裹实时轨迹在 17TRACK 继续查询。' },
  trackNoLabel: { en: 'Order number or tracking number', 'zh-CN': '订单编号 或 物流单号' },
  trackNoPlaceholder: { en: 'e.g. GS2604221089 or LP600012193CN', 'zh-CN': '例如 GS2604221089 或 LP600012193CN' },
  query: { en: 'Search', 'zh-CN': '查询' },
  trackingNo: { en: 'Tracking No.', 'zh-CN': '物流单号' },
  carrier: { en: 'Carrier', 'zh-CN': '承运商' },
  orderTime: { en: 'Ordered', 'zh-CN': '下单时间' },
  shipTime: { en: 'Shipped', 'zh-CN': '发货时间' },
  destCountry: { en: 'Destination', 'zh-CN': '收货国家' },
  orderAmount: { en: 'Amount', 'zh-CN': '订单金额' },
  pendingGenerate: { en: 'Pending', 'zh-CN': '待生成' },
  pendingAssign: { en: 'Pending', 'zh-CN': '待分配' },
  trackOn17track: { en: 'Track parcel on 17TRACK', 'zh-CN': '在 17TRACK 查包裹轨迹' },
  trackNoResult: { en: (q) => `No order found for “${q}”. Check the number is complete, or contact the seller.`, 'zh-CN': (q) => `没有查到「${q}」对应的订单。请核对单号是否完整，或联系卖家确认。` },
  trackRetry: { en: 'Try this number on 17TRACK anyway', 'zh-CN': '仍拿这个单号去 17TRACK 试一次' },
  // 表单提示
  fillField: { en: (f) => `Please fill in ${f}`, 'zh-CN': (f) => `请填写${f}` },
  passwordTooShort: { en: 'Password must be at least 6 characters', 'zh-CN': '密码至少 6 位' },
  passwordMismatch: { en: 'Passwords do not match', 'zh-CN': '两次输入的密码不一致' },
  submitProgress: { en: 'Submitting…', 'zh-CN': '提交中…' },
  registerAndLogin: { en: 'Register & Sign in', 'zh-CN': '注册并登录' },
  loginProgress: { en: 'Signing in…', 'zh-CN': '登录中…' },
  signIn: { en: 'Sign in', 'zh-CN': '登录' },
  fillAccountAndPassword: { en: 'Please enter your account and password', 'zh-CN': '请填写账号与密码' },
  queryProgress: { en: 'Searching…', 'zh-CN': '查询中…' },
  enterTrackNo: { en: 'Please enter an order number or tracking number', 'zh-CN': '请输入订单编号或物流单号' },
  requestFailed: { en: (s) => `Request failed (${s})`, 'zh-CN': (s) => `请求失败（${s}）` },
  // 其它
  loadError: { en: 'Failed to load:', 'zh-CN': '加载失败：' },
  loadErrorHint: { en: 'Please confirm the API domain is reachable, or retry later.', 'zh-CN': '请确认接口域名可访问，或稍后重试。' },
  selectFirst: { en: (n) => `Please select “${n}” first`, 'zh-CN': (n) => `请先选择「${n}」` },
  addedToCart: { en: (t, p) => `${t} added to cart · Total ${p}`, 'zh-CN': (t, p) => `${t} 已加入购物车 · 合计 ${p}` },
  footerFront: { en: 'Storefront domain', 'zh-CN': '前台域名' },
  footerApi: { en: 'API domain', 'zh-CN': '接口域名' },
  footerData: { en: 'Data access', 'zh-CN': '取数方式' },
  footerDataValue: { en: 'Server proxy /api/store → cloud data plane', 'zh-CN': '服务端代理 /api/store → 云数据面' },
  footerNote: { en: 'Independent storefront domain · page & API separated deployment', 'zh-CN': '独立前台域名 · 页面与接口分离部署' },
  socialFollow: { en: 'Follow the seller', 'zh-CN': '关注卖家社交账号' },
  socialClick: { en: 'Click an icon to open in a new tab', 'zh-CN': '点击图标在新标签页打开' },
  socialOpen: { en: 'open seller page in a new tab', 'zh-CN': '在新标签页打开卖家主页' },
  marqueeAria: { en: 'Popular clubs', 'zh-CN': '热门球队' },
  viewClubProducts: { en: 'View products', 'zh-CN': '查看商品' },
  localeTitle: { en: 'Language / Currency', 'zh-CN': '语言 / 货币' },
  localeLang: { en: 'Language', 'zh-CN': '语言' },
  localeCurrency: { en: 'Currency', 'zh-CN': '货币' },
  // M1 多市场站点结构
  marketTitle: { en: 'Market / Region', 'zh-CN': '市场 / 地区' },
  localeFoot: { en: (t) => `Base currency USD · rate snapshot ${t} · prices are reference conversions, settlement in USD`, 'zh-CN': (t) => `基准币种 USD · 汇率快照 ${t} · 价格为参考换算，结算以 USD 为准` },
  close: { en: 'Close', 'zh-CN': '关闭' },
  // Ship to / Language / Currency 面板（AliExpress 风格）
  shipTo: { en: 'Ship to', 'zh-CN': '配送至' },
  stateLabel: { en: 'State', 'zh-CN': '州 / 省' },
  cityLabel: { en: 'City', 'zh-CN': '城市' },
  saveAction: { en: 'Save', 'zh-CN': '保存' },
  searchShort: { en: 'Search', 'zh-CN': '搜索' },
  searchByImage: { en: 'Search by image', 'zh-CN': '以图搜款' },
  imgSearchTitle: { en: 'Search by image', 'zh-CN': '以图搜款' },
  imgSearchSub: { en: 'Find what you love with better prices on MXQ by using an image search', 'zh-CN': '上传图片，用图像搜索在 MXQ 找到你心仪的商品' },
  imgSearchDrag: { en: 'Drag an image here', 'zh-CN': '将图片拖到这里' },
  imgSearchOr: { en: 'or', 'zh-CN': '或' },
  imgSearchUpload: { en: 'Upload a photo', 'zh-CN': '上传图片' },
  imgSearchTip: { en: '*For a quick search hit CTRL+V to paste an image into the search box', 'zh-CN': '*快捷操作：按 CTRL+V 把图片直接粘贴到搜索框' },
  imgSearching: { en: 'Searching…', 'zh-CN': '搜索中…' },
  imgSearchBadFile: { en: 'Please choose an image file (PNG / JPG / WebP, up to 15MB)', 'zh-CN': '请选择图片文件（PNG / JPG / WebP，最大 15MB）' },
  imgSearchFailed: { en: 'Image search failed. Please try again.', 'zh-CN': '以图搜款失败，请重试。' },
  imgSearchNoMatch: { en: 'No similar products found. Try another photo.', 'zh-CN': '没有找到相似商品，换张图片试试吧。' },
  imgSearchMatches: { en: (n) => `${n} matches found`, 'zh-CN': (n) => `找到 ${n} 件相似商品` },
  imgSearchAgain: { en: 'Search another image', 'zh-CN': '再搜一张' },
  searchByImage: { en: 'Search by image', 'zh-CN': '以图搜款' },
  imgSearchTitle: { en: 'Search by image', 'zh-CN': '以图搜款' },
  imgSearchSub: { en: 'Find what you love with better prices on MXQ by using an image search', 'zh-CN': '上传图片，用图像搜索在 MXQ 找到你心仪的商品' },
  imgSearchDrag: { en: 'Drag an image here', 'zh-CN': '将图片拖到这里' },
  imgSearchOr: { en: 'or', 'zh-CN': '或' },
  imgSearchUpload: { en: 'Upload a photo', 'zh-CN': '上传图片' },
  imgSearchTip: { en: '*For a quick search hit CTRL+V to paste an image into the search box', 'zh-CN': '*快捷操作：按 CTRL+V 把图片直接粘贴到搜索框' },
  imgSearching: { en: 'Searching…', 'zh-CN': '搜索中…' },
  imgSearchBadFile: { en: 'Please choose an image file (PNG / JPG / WebP, up to 15MB)', 'zh-CN': '请选择图片文件（PNG / JPG / WebP，最大 15MB）' },
  imgSearchFailed: { en: 'Image search failed. Please try again.', 'zh-CN': '以图搜款失败，请重试。' },
  imgSearchNoMatch: { en: 'No similar products found. Try another photo.', 'zh-CN': '没有找到相似商品，换张图片试试吧。' },
  imgSearchMatches: { en: (n) => `${n} matches found`, 'zh-CN': (n) => `找到 ${n} 件相似商品` },
  imgSearchAgain: { en: 'Search another image', 'zh-CN': '再搜一张' },
  localeDataFailed: { en: 'Country list failed to load, please reopen', 'zh-CN': '国家列表加载失败，请重新打开' },
  loadingDots: { en: 'Loading…', 'zh-CN': '加载中…' },
  // 登录/注册弹窗静态标签
  authTitle: { en: 'Customer sign in / register', 'zh-CN': '客户登录 / 注册' },
  loginTab: { en: 'Sign in', 'zh-CN': '登录' },
  registerTab: { en: 'Register', 'zh-CN': '注册' },
  accountLabel: { en: 'Account (email or phone)', 'zh-CN': '账号（电子邮箱或手机号）' },
  accountPlaceholder: { en: 'you@example.com or +8613800138000', 'zh-CN': 'you@example.com 或 +8613800138000' },
  passwordLabel: { en: 'Password', 'zh-CN': '密码' },
  passwordPlaceholder: { en: 'Enter the password you set when registering', 'zh-CN': '请输入注册时设置的密码' },
  noAccount: { en: 'No account yet?', 'zh-CN': '还没有账号？' },
  registerNow: { en: 'Register now', 'zh-CN': '立即注册' },
  accountInfo: { en: 'Account info', 'zh-CN': '账号信息' },
  passwordMinHint: { en: 'At least 8 chars with letters & numbers', 'zh-CN': '至少 8 位，含字母和数字' },
  confirmPlaceholder: { en: 'Enter again', 'zh-CN': '再输入一次' },
  shippingLegend: { en: 'Shipping address', 'zh-CN': '收货地址' },
  shippingLegendHint: { en: 'Used for order delivery — every field below is required', 'zh-CN': '订单配送使用，以下每一项都是必填' },
  addressPlaceholder: { en: 'Street / area / building', 'zh-CN': '街道 / 区域 / 楼栋' },
  hasAccount: { en: 'Already have an account?', 'zh-CN': '已有账号？' },
  loginNow: { en: 'Sign in directly', 'zh-CN': '直接登录' },
  trackModalTitle: { en: 'Order / logistics tracking', 'zh-CN': '订单 / 物流查询' },
  accountModalTitle: { en: 'My account', 'zh-CN': '我的账户' },
  providedBy: { en: 'Live tracking provided by', 'zh-CN': '包裹实时轨迹由' },
}

/* ---- 列表排序 / 价格筛选 / 收藏 / 最近浏览 文案 ---- */
Object.assign(I18N, {
  sortLabel: { en: 'Sort', 'zh-CN': '排序' },
  sortDefault: { en: 'Season: newest first', 'zh-CN': '赛季：新款在前' },
  sortNewest: { en: 'Newest', 'zh-CN': '最新上架' },
  sortPriceAsc: { en: 'Price: low to high', 'zh-CN': '价格从低到高' },
  sortPriceDesc: { en: 'Price: high to low', 'zh-CN': '价格从高到低' },
  sortDiscount: { en: 'Biggest discount', 'zh-CN': '折扣优先' },
  sortSales: { en: 'Best selling', 'zh-CN': '销量优先' },
  saleLabel: { en: 'Discount', 'zh-CN': '折扣' },
  saleAny: { en: 'Any', 'zh-CN': '不限' },
  // 阈值文案带参数，走函数值分支（核心语言下取英文求值，与其它带参文案一致）
  saleAtLeast: { en: (v) => `${v}% off or more`, 'zh-CN': (v) => `≥ ${v}%` },
  priceRangeLabel: { en: 'Price', 'zh-CN': '价格' },
  priceMinPlaceholder: { en: 'Min $', 'zh-CN': '最低 $' },
  priceMaxPlaceholder: { en: 'Max $', 'zh-CN': '最高 $' },
  priceApply: { en: 'Apply', 'zh-CN': '确定' },
  priceClear: { en: 'Reset', 'zh-CN': '重置' },
  priceInvalid: { en: 'Enter a valid price range', 'zh-CN': '请输入有效的价格区间' },
  filterReset: { en: 'Reset filters', 'zh-CN': '重置筛选' },
  favTitle: { en: 'My favourites', 'zh-CN': '我的收藏' },
  favBtnLabel: { en: 'Favorite', 'zh-CN': '收藏' },
  favEmpty: { en: 'No favourites yet — tap the heart on a product to save it here.', 'zh-CN': '还没有收藏，点商品上的爱心即可收藏到这里。' },
  favAdd: { en: 'Add to favourites', 'zh-CN': '加入收藏' },
  favRemove: { en: 'Remove from favourites', 'zh-CN': '取消收藏' },
  favAdded: { en: 'Saved to favourites', 'zh-CN': '已加入收藏' },
  favRemoved: { en: 'Removed from favourites', 'zh-CN': '已取消收藏' },
  favCount: { en: (n) => `${n} saved`, 'zh-CN': (n) => `已收藏 ${n} 件` },
  /* ---- U 系列用户与会员模块词条（2026-10-07） ---- */
  acctCenter: { en: 'Account center', 'zh-CN': '账号中心' },
  acctTabSecurity: { en: 'Security', 'zh-CN': '安全中心' },
  acctTabAddresses: { en: 'Addresses', 'zh-CN': '地址簿' },
  acctTabLoyalty: { en: 'Rewards', 'zh-CN': '会员与积分' },
  acctTabAlerts: { en: 'Price alerts', 'zh-CN': '降价提醒' },
  secChangePw: { en: 'Change password', 'zh-CN': '修改密码' },
  secCurrentPw: { en: 'Current password', 'zh-CN': '当前密码' },
  secNewPw: { en: 'New password', 'zh-CN': '新密码' },
  secPwPolicy: { en: 'At least 8 characters with letters and numbers', 'zh-CN': '至少 8 位，需同时包含字母和数字' },
  sec2faTitle: { en: 'Two-factor authentication (TOTP)', 'zh-CN': '两步验证（动态口令）' },
  sec2faOn: { en: 'Enabled — a 6-digit code is required at sign-in', 'zh-CN': '已开启 — 登录时需输入 6 位动态码' },
  sec2faOff: { en: 'Not enabled — protect your account with an authenticator app', 'zh-CN': '未开启 — 建议用认证器 App 保护账号' },
  sec2faSetup: { en: 'Set up', 'zh-CN': '开启两步验证' },
  sec2faDisable: { en: 'Turn off', 'zh-CN': '关闭两步验证' },
  sec2faScan: { en: 'Scan with Google Authenticator / 1Password etc., then enter the 6-digit code:', 'zh-CN': '用 Google Authenticator / 1Password 等扫码，或手动输入密钥后，填入 6 位动态码：' },
  sec2faSecret: { en: 'Manual setup key', 'zh-CN': '手动输入密钥' },
  sec2faCode: { en: '6-digit code', 'zh-CN': '6 位动态码' },
  sec2faConfirm: { en: 'Confirm & enable', 'zh-CN': '确认开启' },
  sec2faPwFallback: { en: 'Lost your authenticator? Turn off with password', 'zh-CN': '认证器丢了？用密码关闭' },
  secDevices: { en: 'Signed-in devices', 'zh-CN': '登录设备' },
  secCurrentDevice: { en: 'This device', 'zh-CN': '当前设备' },
  secRevoke: { en: 'Sign out', 'zh-CN': '下线' },
  secNoDevices: { en: 'No active devices', 'zh-CN': '暂无活跃设备' },
  secHistory: { en: 'Login history', 'zh-CN': '登录历史' },
  secHistoryEmpty: { en: 'No login records yet', 'zh-CN': '暂无登录记录' },
  secNewDeviceFlag: { en: 'New device', 'zh-CN': '新设备' },
  loginNoticeToast: { en: 'Signed in from a new device or location — if this was not you, change your password now.', 'zh-CN': '检测到新设备/新地点登录，如非本人操作请立即修改密码' },
  twoFactorTitle: { en: 'Two-factor verification', 'zh-CN': '两步验证' },
  twoFactorHint: { en: 'Enter the 6-digit code from your authenticator app', 'zh-CN': '请输入认证器 App 中的 6 位动态码' },
  twoFactorVerify: { en: 'Verify', 'zh-CN': '验证' },
  oauthDivider: { en: 'or continue with', 'zh-CN': '或使用第三方登录' },
  oauthGoogle: { en: 'Google', 'zh-CN': 'Google' },
  oauthFacebook: { en: 'Facebook', 'zh-CN': 'Facebook' },
  oauthApple: { en: 'Apple', 'zh-CN': 'Apple' },
  oauthNotConfigured: { en: 'This sign-in provider is not configured yet — the store admin needs to add OAuth credentials.', 'zh-CN': '该登录方式尚未配置（需卖家后台录入 OAuth 凭据后开放）' },
  oauthWelcome: { en: 'Signed in successfully', 'zh-CN': '第三方登录成功' },
  oauthFailed: { en: 'Third-party sign-in failed', 'zh-CN': '第三方登录未完成' },
  addrAdd: { en: 'Add address', 'zh-CN': '新增地址' },
  addrLabel: { en: 'Label (e.g. Home)', 'zh-CN': '地址标签（如：家）' },
  addrReceiver: { en: 'Receiver', 'zh-CN': '收件人' },
  addrDefault: { en: 'Default', 'zh-CN': '默认' },
  addrSetDefault: { en: 'Set default', 'zh-CN': '设为默认' },
  addrDelete: { en: 'Delete', 'zh-CN': '删除' },
  addrEmpty: { en: 'No saved addresses yet', 'zh-CN': '还没有保存的地址' },
  addrUseAtCheckout: { en: 'Use', 'zh-CN': '使用' },
  addrSaved: { en: 'Address saved', 'zh-CN': '地址已保存' },
  addrDeleted: { en: 'Address deleted', 'zh-CN': '地址已删除' },
  addrZipHint: { en: 'Zip format is validated for your country', 'zh-CN': '邮编将按所选国家的格式校验' },
  ckSavedAddresses: { en: 'Saved addresses', 'zh-CN': '已存地址一键填充' },
  loyaltyEarnRate: { en: (n) => `Earn ${n} pt per $1 paid`, 'zh-CN': (n) => `实付 $${n} = 1 积分` },
  loyaltyRedeemRate: { en: 'Redeem 100 pts = $1 gift card', 'zh-CN': '100 积分 = $1 礼品卡' },
  loyaltyBalance: { en: 'Points balance', 'zh-CN': '积分余额' },
  loyaltyTier: { en: 'Membership tier', 'zh-CN': '会员等级' },
  loyaltyNext: { en: (n) => `Spend $${n} more to level up`, 'zh-CN': (n) => `再消费 $${n} 即可升级` },
  loyaltyTop: { en: 'Top tier — enjoy exclusive perks', 'zh-CN': '已是最高等级，尊享全部权益' },
  loyaltyRedeem: { en: 'Redeem', 'zh-CN': '兑换礼品卡' },
  loyaltyRedeemBtn: { en: 'Exchange for gift card', 'zh-CN': '兑换为礼品卡' },
  loyaltyRedeemOk: { en: (c, u) => `Gift card ${c} ($${u}) created — apply it at checkout`, 'zh-CN': (c, u) => `礼品卡 ${c}（$${u}）已生成，结算时输入卡号即可使用` },
  loyaltyLedger: { en: 'Points history', 'zh-CN': '积分明细' },
  loyaltyLedgerEmpty: { en: 'No points yet — earn points on every paid order', 'zh-CN': '还没有积分 — 每笔实付订单都会自动获得积分' },
  loyaltyBirthday: { en: 'Birthday (for your birthday gift)', 'zh-CN': '生日（用于生日月礼包）' },
  loyaltyBirthdaySave: { en: 'Save', 'zh-CN': '保存' },
  loyaltyBirthdaySaved: { en: 'Birthday saved — your gift arrives on your birthday month', 'zh-CN': '生日已保存，生日月将自动发放礼包' },
  loyaltyBirthdayGift: { en: 'Birthday gift unlocked: 100 pts + 10% coupon!', 'zh-CN': '生日礼已发放：100 积分 + 10% 折扣券！' },
  loyaltyCoupons: { en: 'My coupons', 'zh-CN': '我的专属券' },
  alertsTitle: { en: 'Price-drop alerts', 'zh-CN': '降价提醒' },
  alertsEmpty: { en: 'No price alerts — tap the bell on any product to watch its price.', 'zh-CN': '还没有降价提醒 — 在商品页点小铃铛即可关注价格变化' },
  alertsPriceNow: { en: 'Now', 'zh-CN': '现价' },
  alertsWatched: { en: 'Watched at', 'zh-CN': '关注时' },
  alertsDropped: { en: 'Price dropped!', 'zh-CN': '已降价！' },
  alertsRemove: { en: 'Remove', 'zh-CN': '取消提醒' },
  alertAdded: { en: 'Watching this price — we will flag it here when it drops', 'zh-CN': '已关注该价格，降价时会在这里提醒你' },
  favShare: { en: 'Share', 'zh-CN': '分享' },
  favLinkCopied: { en: 'Link copied', 'zh-CN': '链接已复制' },
  favPriceDropBadge: { en: 'Price dropped', 'zh-CN': '降价了' },
  favPriceAlert: { en: 'Watch price', 'zh-CN': '关注降价' },
  favRestockAlert: { en: 'Notify me at restock', 'zh-CN': '到货提醒' },
  recentTitle: { en: 'Recently viewed', 'zh-CN': '最近浏览' },
  recentClear: { en: 'Clear', 'zh-CN': '清空' },
  qtyLabel: { en: 'Quantity', 'zh-CN': '数量' },
  buyNow: { en: 'Buy now', 'zh-CN': '立即购买' },
  stockLeft: { en: (n) => `${n} in stock`, 'zh-CN': (n) => `库存 ${n} 件` },
  stockLow: { en: (n) => `Only ${n} left`, 'zh-CN': (n) => `仅剩 ${n} 件` },
  backToTop: { en: 'Back to top', 'zh-CN': '回到顶部' },
  stockLimit: { en: (n) => `Only ${n} in stock — quantity capped`, 'zh-CN': (n) => `库存仅 ${n} 件，已按上限调整` },
  /* ----- 商品与目录模块（2026-10-06） ----- */
  searchResultsFor: { en: (q) => `Results for "${q}"`, 'zh-CN': (q) => `“${q}” 的搜索结果` },
  didYouMean: { en: 'Did you mean', 'zh-CN': '您是不是想找' },
  searchEmpty: { en: 'No products matched your search. Try different keywords, or search by image below.', 'zh-CN': '没有找到匹配的商品，换个关键词试试，或用下方「以图搜款」。' },
  filterBrand: { en: 'Brand', 'zh-CN': '品牌' },
  filterSize: { en: 'Size', 'zh-CN': '尺码' },
  filterAny: { en: 'All', 'zh-CN': '全部' },
  stockOut: { en: 'Out of stock', 'zh-CN': '已售罄' },
  oosNote: { en: 'This item is currently out of stock. Leave your email and we will notify you the moment it is back.', 'zh-CN': '该商品暂时缺货，留下邮箱，到货后第一时间通知您。' },
  oosBtn: { en: 'Out of stock', 'zh-CN': '暂时缺货' },
  notifyMe: { en: 'Notify me', 'zh-CN': '到货通知' },
  notifyTitle: { en: 'Back in stock notification', 'zh-CN': '缺货登记（到货通知）' },
  notifyPlaceholder: { en: 'Enter your email', 'zh-CN': '填写您的邮箱' },
  notifyBtn: { en: 'Notify me', 'zh-CN': '提交' },
  notifyOk: { en: 'Done! We will email you when it is back in stock.', 'zh-CN': '登记成功！到货后我们会第一时间邮件通知您。' },
  notifyFail: { en: 'Submission failed. Please try again later.', 'zh-CN': '提交失败，请稍后重试。' },
  shipsFrom: { en: 'Ships from', 'zh-CN': '发货仓' },
  shipsFromGlobal: { en: 'Global warehouse · 5-12 business days', 'zh-CN': '全球发货仓 · 5-12 个工作日' },
  // P1-4 多仓库存与预售（函数值形式，t() 会带参求值）
  preorderLabel: { en: 'Pre-order', 'zh-CN': '预售' },
  preorderHint: { en: 'Ships in 7-15 business days', 'zh-CN': '预计 7-15 个工作日发货' },
  preorderBadge: { en: 'Pre-order', 'zh-CN': '预售' },
  warehouseInStock: { en: (n) => `${n} in stock`, 'zh-CN': (n) => `现货 ${n} 件` },
  warehousePreorderQty: { en: (n) => `${n} available to pre-order`, 'zh-CN': (n) => `预售 ${n} 件` },
  warehouseEta: { en: (n) => `${n} business days`, 'zh-CN': (n) => `${n} 个工作日发货` },
  complianceTitle: { en: 'Product & compliance information', 'zh-CN': '商品与合规信息' },
  complianceHint: { en: 'Detailed material and care information is printed on the product label and packaging.', 'zh-CN': '详细的材质与洗护信息以商品标签及包装实物为准。' },
  fMaterial: { en: 'Material / composition', 'zh-CN': '材质成分' },
  fOrigin: { en: 'Country of origin', 'zh-CN': '原产地' },
  fCare: { en: 'Care instructions', 'zh-CN': '洗护说明' },
  fWarnings: { en: 'Safety warnings', 'zh-CN': '警示信息' },
  fEuResponsible: { en: 'Responsible person (EU)', 'zh-CN': '欧盟责任人' },
  relatedTitle: { en: 'You may also like', 'zh-CN': '相关推荐' },
  // P1-3 搭配购买
  completeTheLook: { en: 'Complete the look', 'zh-CN': '搭配购买' },
  // P2-4 UGC 精选
  ugcTitle: { en: 'What customers are posting', 'zh-CN': '顾客晒单' },
  ugcViewOriginal: { en: 'View original', 'zh-CN': '查看原文' },
  reviewsTitle: { en: 'Customer reviews', 'zh-CN': '商品评价' },
  reviewsCount: { en: (n) => `${n} review${n === 1 ? '' : 's'}`, 'zh-CN': (n) => `${n} 条评价` },
  reviewsEmpty: { en: 'No reviews yet. Be the first to share your thoughts!', 'zh-CN': '还没有评价，快来写下第一条吧！' },
  reviewWrite: { en: 'Write a review', 'zh-CN': '写评价' },
  reviewCancel: { en: 'Close form', 'zh-CN': '收起表单' },
  reviewRatingLabel: { en: 'Your rating', 'zh-CN': '您的评分' },
  reviewName: { en: 'Nickname', 'zh-CN': '昵称' },
  reviewNamePh: { en: 'How should we call you?', 'zh-CN': '我们怎么称呼您？（可留空）' },
  reviewEmail: { en: 'Email (optional)', 'zh-CN': '邮箱（选填）' },
  reviewEmailPh: { en: 'you@example.com', 'zh-CN': 'you@example.com' },
  reviewContent: { en: 'Your review', 'zh-CN': '评价内容' },
  reviewContentPh: { en: 'Share details of your experience: fit, quality, shipping speed…', 'zh-CN': '聊聊您的体验：尺码合身度、质量、物流速度…（至少 10 字）' },
  reviewImages: { en: 'Add photos (up to 3)', 'zh-CN': '晒图（最多 3 张）' },
  reviewAddPhoto: { en: 'Add photo', 'zh-CN': '添加图片' },
  reviewRemove: { en: 'Remove photo', 'zh-CN': '移除图片' },
  reviewSubmit: { en: 'Submit review', 'zh-CN': '提交评价' },
  reviewNote: { en: 'Reviews are moderated. Genuine reviews from real purchases help other shoppers.', 'zh-CN': '评价提交后会经审核展示；请基于真实购买体验，刷评将被移除。' },
  reviewOkApproved: { en: 'Thanks! Your review has been published.', 'zh-CN': '提交成功，您的评价已发布！' },
  reviewOkPending: { en: 'Thanks! Your review has been submitted and is awaiting moderation.', 'zh-CN': '提交成功！您的评价已进入审核，通过后展示。' },
  reviewFail: { en: 'Submission failed. Please try again later.', 'zh-CN': '提交失败，请稍后重试。' },
  reviewBadContent: { en: 'Please pick a star rating and write at least 10 characters.', 'zh-CN': '请先点亮星级评分，并填写至少 10 个字的评价内容。' },
  reviewBadEmail: { en: 'Please enter a valid email address.', 'zh-CN': '请输入有效的邮箱地址。' },
  reviewBadImage: { en: 'Only PNG / JPG / WebP up to 2MB each.', 'zh-CN': '仅支持 PNG / JPG / WebP，单张不超过 2MB。' },
  reviewDup: { en: 'You have already reviewed this product.', 'zh-CN': '您已评价过该商品。' },
  reviewsSeeMore: { en: 'Show more reviews', 'zh-CN': '查看更多评价' },
})

/** 判断当前语言是否为中文（zh-CN / zh-TW 及其它中文变体） */
const isZh = (lang) => (lang || 'en').toLowerCase().startsWith('zh')

/** 求值：函数值传参求值，否则返回字符串 */
const resolveEntry = (value, args) => (typeof value === 'function' ? value(...args) : value)

/**
 * 取词：按当前 state.lang 返回文案。
 *  - en / zh-CN：精确值（zh 统一走 zh-CN）。
 *  - 其它核心语言（fr/es/de/pt/it/ru/ja/ko）：纯字符串走机翻缓存；带参数的函数值回退英文求值。
 */
/* ---- 结算 / 支付 / 订单相关文案（单独一块，便于维护） ---- */
Object.assign(I18N, {
  viewCart: { en: 'View cart', 'zh-CN': '查看购物车' },
  goCheckout: { en: 'Checkout', 'zh-CN': '去结算' },
  cartTitle: { en: 'Shopping cart', 'zh-CN': '购物车' },
  cartCountItems: { en: (n) => `${n} item(s)`, 'zh-CN': (n) => `共 ${n} 件商品` },
  subtotal: { en: 'Subtotal', 'zh-CN': '商品小计' },
  shippingFee: { en: 'Shipping', 'zh-CN': '运费' },
  discount: { en: 'Discount', 'zh-CN': '优惠' },
  grandTotal: { en: 'Total', 'zh-CN': '应付总额' },
  freeShipping: { en: 'FREE', 'zh-CN': '免运费' },
  freeShipHint: { en: (v) => `Add ${v} more for free standard shipping`, 'zh-CN': (v) => `再买 ${v} 即可享标准配送免运费` },
  freeShipReached: { en: 'You have unlocked free standard shipping', 'zh-CN': '已享标准配送免运费' },
  checkoutTitle: { en: 'Checkout', 'zh-CN': '填写订单' },
  stepAddress: { en: 'Shipping address', 'zh-CN': '收货信息' },
  stepShipping: { en: 'Delivery method', 'zh-CN': '配送方式' },
  stepPayment: { en: 'Payment & confirm', 'zh-CN': '支付方式' },
  orderSummary: { en: 'Order summary', 'zh-CN': '订单摘要' },
  sumProduct: { en: 'PRODUCT', 'zh-CN': '商品' },
  sumSubtotal: { en: 'SUBTOTAL', 'zh-CN': '小计' },
  payRedirectHint: { en: 'You will be redirected to PayPal to log in and complete the payment securely.', 'zh-CN': '点击后将跳转 PayPal，登录您的 PayPal 账号即可安全完成支付。' },
  cardPayHint: { en: 'Enter your card details to pay — processed securely by PayPal.', 'zh-CN': '填写您的信用卡 / 借记卡信息即可完成支付，由 PayPal 安全处理。' },
  cardNumberLabel: { en: 'Card number', 'zh-CN': '卡号' },
  cardExpiryLabel: { en: 'Expiry (MM/YY)', 'zh-CN': '有效期 (MM/YY)' },
  cardCvvLabel: { en: 'CVV', 'zh-CN': '安全码 CVV' },
  cardPayNow: { en: 'Pay with card', 'zh-CN': '银行卡支付' },
  payWidgetError: { en: 'Payment widget failed to load, please retry or switch to another method.', 'zh-CN': '支付组件加载失败，请重试或换其他支付方式。' },
  contactLegend: { en: 'Contact', 'zh-CN': '联系人' },
  couponLabel: { en: 'Coupon code', 'zh-CN': '优惠券码' },
  couponApply: { en: 'Apply', 'zh-CN': '立即使用' },
  // P0-4 前台优惠券展示
  promoTitle: { en: 'Current offers', 'zh-CN': '正在进行的优惠' },
  promoCheckoutHint: { en: 'Tap a code to apply it', 'zh-CN': '点击优惠码即可使用' },
  promoCopy: { en: 'Copy', 'zh-CN': '复制' },
  promoCopied: { en: 'Copied', 'zh-CN': '已复制' },
  promoCopyCode: { en: (code) => `Copy code ${code}`, 'zh-CN': (code) => `复制优惠码 ${code}` },
  promoMinSpend: { en: (m) => `min. spend ${m}`, 'zh-CN': (m) => `满${m}可用` },
  promoNoMin: { en: 'no minimum spend', 'zh-CN': '无门槛' },
  promoEndsUrgent: { en: (d) => `ends in ${d} day${d > 1 ? 's' : ''}`, 'zh-CN': (d) => `仅剩 ${d} 天` },
  promoEndsIn: { en: (d) => `ends in ${d} days`, 'zh-CN': (d) => `${d} 天后结束` },
  promoTermsNote: { en: 'Offers apply at checkout. One code per order.', 'zh-CN': '优惠在结算时生效，每单限用一个优惠码。' },
  promoTermsLink: { en: 'Promotion terms', 'zh-CN': '促销条款' },
  couponApplied: { en: (c, v) => `${c} applied · ${v} off`, 'zh-CN': (c, v) => `${c} 已生效 · 立减 ${v}` },
  couponRemove: { en: 'Remove', 'zh-CN': '取消' },
  couponPlaceholder: { en: 'Enter a coupon code', 'zh-CN': '输入优惠券码' },
  noteLabel: { en: 'Order note (optional)', 'zh-CN': '订单备注（选填）' },
  notePlaceholder: { en: 'Anything we should know about this order', 'zh-CN': '如有特殊要求可以写在这里' },
  placeOrder: { en: 'Place order', 'zh-CN': '提交订单' },
  placing: { en: 'Placing order…', 'zh-CN': '正在提交…' },
  selectShippingHint: { en: 'Pick a delivery method', 'zh-CN': '请选择配送方式' },
  etaDays: { en: (d) => `${d} business days`, 'zh-CN': (d) => `${d} 个工作日` },
  payTitle: { en: 'Payment', 'zh-CN': '订单支付' },
  payFor: { en: (no) => `Order ${no}`, 'zh-CN': (no) => `订单 ${no}` },
  payNow: { en: 'Pay now', 'zh-CN': '立即支付' },
  paying: { en: 'Processing…', 'zh-CN': '支付处理中…' },
  payPendingHint: { en: 'Complete the transfer, then we will confirm the payment manually.', 'zh-CN': '完成汇款后由我们人工确认到账。' },
  paySandboxHint: { en: 'Sandbox settlement — no real charge. Use it to verify the whole flow.', 'zh-CN': '沙箱结算：不会真实扣款，用于验证整条下单链路。' },
  payNotConfigured: { en: 'Not available yet', 'zh-CN': '暂未开通' },
  payNotConfiguredHint: { en: 'This channel needs live merchant credentials before it can be used.', 'zh-CN': '该渠道需要接入真实商户凭据后才能使用。' },
  /* ---------- 交易与支付模块（2026-10-06） ---------- */
  zipInvalid: { en: (hint) => `Postal code format looks wrong for this country (expected ${hint})`, 'zh-CN': (hint) => `邮编格式与该国不符（应为 ${hint}）` },
  emailInvalid: { en: 'Email format looks wrong', 'zh-CN': '邮箱格式不正确' },
  taxLabel: { en: 'Tax / VAT', 'zh-CN': '税费 / VAT' },
  // M8 结账页税费口径与合规展示
  taxVatLabel: { en: 'VAT / Sales tax', 'zh-CN': '增值税 / 销售税' },
  taxIossNote: {
    en: 'Low-value import scheme: we collect VAT at checkout — no extra charges on delivery.',
    'zh-CN': '低值进口方案：结算时已代收增值税，交付时不会再产生额外费用。',
  },
  taxDdpTitle: { en: 'Delivered Duty Paid (DDP) estimate', 'zh-CN': '完税后交货（DDP）预估' },
  taxDdpNote: {
    en: 'Order exceeds the low-value threshold, so VAT and duties are not charged now. The amounts below are estimates collected by the carrier/customs on delivery.',
    'zh-CN': '订单超出低值进口门槛，税费不在结算时收取。下列金额为承运方/清关行在交付时代收的预估费用。',
  },
  taxDutyEst: { en: 'Estimated duty', 'zh-CN': '预估关税' },
  taxImportVatEst: { en: 'Estimated import VAT', 'zh-CN': '预估进口增值税' },
  ccReturnPolicy: { en: 'Returns & refunds', 'zh-CN': '退货与退款政策' },
  ccSafeShopping: { en: 'Safe shopping', 'zh-CN': '安全购物保障' },
  ccNeedHelp: { en: 'Need help?', 'zh-CN': '需要帮助？' },
  ccSecureNote: {
    en: 'Payments are encrypted end-to-end. Card details never touch our servers.',
    'zh-CN': '支付信息全程加密传输，卡号数据不会存储于我们的服务器。',
  },
  taxImportLabel: { en: 'Import VAT & duty (est.)', 'zh-CN': '进口税费预估' },
  taxImportNote: { en: 'Collected at delivery — DDP estimate, not charged now', 'zh-CN': '交付时由承运方代收（DDP 预估，本次不收取）' },
  taxIossNote: { en: 'Collected at checkout under the low-value import scheme', 'zh-CN': '低值进口方案，结算时一并代收' },
  taxUsNote: { en: 'US sales tax (if applicable) handled at delivery', 'zh-CN': '美国州销售税（如适用）在交付环节处理' },
  giftCardTitle: { en: 'Gift card', 'zh-CN': '礼品卡' },
  giftCardPlaceholder: { en: 'Enter a gift card code', 'zh-CN': '输入礼品卡码' },
  giftCardApply: { en: 'Apply', 'zh-CN': '使用' },
  giftCardApplied: { en: (c, v) => `${c} applied · ${v} credited`, 'zh-CN': (c, v) => `${c} 已生效 · 抵扣 ${v}` },
  giftCardInvalid: { en: 'Gift card is invalid or has no usable balance', 'zh-CN': '礼品卡无效或余额不可用' },
  giftCardPageTitle: { en: 'MXQ Gift Card', 'zh-CN': 'MXQ 礼品卡' },
  giftCardSub: { en: 'Give the perfect jersey. Delivered by email, never expires.', 'zh-CN': '送一件恰到好处的球衣。邮件送达，长期有效。' },
  giftCardAmount: { en: 'Amount', 'zh-CN': '面额' },
  giftCardRecipient: { en: 'Recipient email', 'zh-CN': '接收邮箱' },
  giftCardMessage: { en: 'Message (optional)', 'zh-CN': '祝福语（选填）' },
  giftCardBuy: { en: 'Buy gift card', 'zh-CN': '购买礼品卡' },
  giftCardBuying: { en: 'Creating order…', 'zh-CN': '正在创建订单…' },
  giftCardCodes: { en: 'Your gift card codes', 'zh-CN': '你的礼品卡码' },
  giftCardKeepCode: { en: 'Save this code — it is your gift card balance.', 'zh-CN': '请保存好卡码，它是余额的唯一凭据。' },
  recoverTitle: { en: 'Welcome back — your cart is restored', 'zh-CN': '欢迎回来，购物车已恢复' },
  recoverInvalid: { en: 'Recovery link is invalid or expired.', 'zh-CN': '恢复链接无效或已过期。' },
  payBadgesTitle: { en: 'Accepted payment methods', 'zh-CN': '支持的支付方式' },
  secureNote2: { en: 'Payments are encrypted (TLS) and processed by PayPal / Stripe. We never see or store your card details.', 'zh-CN': '支付全程 TLS 加密，由 PayPal / Stripe 安全处理，我们不接触也不存储你的卡信息。' },
  termsReturns: { en: 'Shipping & returns', 'zh-CN': '配送与退货' },
  termsPromo: { en: 'Promotion terms', 'zh-CN': '促销条款' },
  stripeRedirectHint: { en: 'You will be redirected to complete the payment, then brought back here.', 'zh-CN': '点击后将跳转完成支付，支付完成后自动返回。' },
  stripeWalletHint: { en: 'Confirm the payment in the wallet popup.', 'zh-CN': '请在钱包弹窗中确认支付。' },
  recoverHint: { en: 'Left something behind? Open the link from your recovery email.', 'zh-CN': '结算没完成？打开挽回邮件里的链接即可一键恢复。' },
  bankDetails: { en: 'Transfer details', 'zh-CN': '汇款信息' },
  bankBeneficiary: { en: 'Beneficiary', 'zh-CN': '收款人' },
  bankName: { en: 'Bank', 'zh-CN': '开户行' },
  bankAccount: { en: 'Account / IBAN', 'zh-CN': '账号 / IBAN' },
  bankSwift: { en: 'SWIFT', 'zh-CN': 'SWIFT 代码' },
  orderPlaced: { en: 'Order placed', 'zh-CN': '下单成功' },
  orderPlacedHint: { en: 'We emailed a confirmation. Keep your order number for tracking.', 'zh-CN': '确认邮件已发出，请保留订单号以便查询物流。' },
  orderStatusHint: { en: 'Use the order number above to follow this order any time.', 'zh-CN': '可用上方订单号随时查询该订单的物流进度。' },
  paySuccess: { en: 'Payment received', 'zh-CN': '支付成功' },
  payFailed: { en: 'Payment failed', 'zh-CN': '支付失败' },
  orderNumber: { en: 'Order number', 'zh-CN': '订单号' },
  orderStatus: { en: 'Status', 'zh-CN': '订单状态' },
  orderItems: { en: 'Items', 'zh-CN': '商品明细' },
  orderAmount: { en: 'Amount', 'zh-CN': '金额' },
  shipTo: { en: 'Ship to', 'zh-CN': '收货信息' },
  orderPendingPayment: { en: 'Awaiting payment', 'zh-CN': '待付款' },
  paymentUnpaid: { en: 'Unpaid', 'zh-CN': '未支付' },
  paymentPaid: { en: 'Paid', 'zh-CN': '已支付' },
  continueShopping: { en: 'Continue shopping', 'zh-CN': '继续购物' },
  viewOrder: { en: 'View order', 'zh-CN': '查看订单' },
  cancelOrder: { en: 'Cancel order', 'zh-CN': '取消订单' },
  cancelConfirm: { en: 'Cancel this order? This cannot be undone.', 'zh-CN': '确定要取消该订单吗？取消后无法恢复。' },
  orderCancelled: { en: 'Order cancelled', 'zh-CN': '订单已取消' },
  myOrders: { en: 'My orders', 'zh-CN': '我的订单' },
  noOrders: { en: 'No orders yet.', 'zh-CN': '还没有订单。' },
  loginForOrders: { en: 'Sign in to see all your orders in one place.', 'zh-CN': '登录后可在这里查看全部订单。' },
  checkoutEmpty: { en: 'Your cart is empty — add something first.', 'zh-CN': '购物车是空的，先去挑几件商品吧。' },
  backToCart: { en: 'Back to cart', 'zh-CN': '返回购物车' },
  requiredHint: { en: 'All fields are required', 'zh-CN': '以下均为必填项' },
  fieldName: { en: 'Full name', 'zh-CN': '收件人姓名' },
  fieldEmail: { en: 'Email', 'zh-CN': '电子邮箱' },
  qtyLabelShort: { en: 'Qty', 'zh-CN': '数量' },
  removeItem: { en: 'Remove', 'zh-CN': '删除' },
  trackThisOrder: { en: 'Track this order', 'zh-CN': '查询该订单物流' },
  secureNote: { en: 'Prices are recalculated server-side from the live catalogue before the order is created.', 'zh-CN': '下单前金额会按线上商品库在服务端重新计算，避免被篡改。' },
  fillField: { en: (label) => `Please fill in ${label}`, 'zh-CN': (label) => `请填写${label}` },
  genericError: { en: 'Something went wrong. Please try again.', 'zh-CN': '操作失败，请稍后重试' },
  cartPruned: { en: (n) => `${n} unavailable item(s) removed from your cart`, 'zh-CN': (n) => `已自动移除 ${n} 件失效商品` },
  quoteRetry: { en: 'Retry', 'zh-CN': '重试' },
})

/**
 * 服务端下发的错误/提示文案（server.js 里全是中文常量）面向买家展示时也要本地化，
 * 否则英文站会直接漏出中文。这里按「中文原文 → 英文」做一张反查表；
 * 动态文案（带商品名/秒数/字段名）走 API_MESSAGE_RULES 的模板规则。
 * 两条都未命中且界面不是中文时，退回通用提示 —— 宁可少一点信息量，也不能把中文丢给欧美买家。
 */
const API_MESSAGES = {
  '购物车是空的': { en: 'Your cart is empty' },
  '购物车商品信息不完整': { en: 'Some items in your cart are incomplete' },
  '单笔订单最多 50 个商品行': { en: 'An order can contain at most 50 lines' },
  '请选择国家': { en: 'Please select a country' },
  '电子邮箱格式不正确': { en: 'That email address looks invalid' },
  '手机号格式不正确': { en: 'That phone number looks invalid' },
  '账号请填写有效的电子邮箱或手机号': { en: 'Enter a valid email address or phone number' },
  '密码至少 6 位': { en: 'Password must be at least 6 characters' },
  '密码过长（最多 72 位）': { en: 'Password is too long (72 characters max)' },
  '该账号已注册，请直接登录': { en: 'This account already exists — please sign in instead' },
  '账号或密码不正确': { en: 'Incorrect account or password' },
  '请填写账号与密码': { en: 'Please enter your account and password' },
  '缺少查询凭据：请登录，或用下单时的浏览器打开': {
    en: 'Missing access credential — please sign in, or open this page in the browser you ordered from',
  },
  '请输入订单编号或物流单号': { en: 'Enter an order number or tracking number' },
  '单号过长': { en: 'That number is too long' },
  '订单不存在': { en: 'Order not found' },
  '订单不存在或无权查看': { en: 'Order not found, or you do not have access to it' },
  '无权操作该订单': { en: 'You are not allowed to change this order' },
  '缺少操作凭据': { en: 'Missing action credential' },
  '缺少订单号': { en: 'Order number is required' },
  '请先登录后再查看订单': { en: 'Please sign in to view your orders' },
  '订单已取消，无法支付': { en: 'This order was cancelled and can no longer be paid' },
  '订单已发货，无法取消；如需退货请在订单查询里发起售后': {
    en: 'This order has already shipped and cannot be cancelled — start a return from order tracking instead',
  },
  '订单创建失败，请稍后重试': { en: 'Could not create the order — please try again' },
  '支付处理失败': { en: 'Payment could not be processed' },
  '取消失败': { en: 'Could not cancel the order' },
  '请求格式不正确': { en: 'Malformed request' },
  '提交内容过大': { en: 'Request payload is too large' },
  '优惠券不可用': { en: 'Coupon is not available' },
  '优惠券码不存在': { en: 'Coupon code not found' },
  '该优惠券已停用': { en: 'This coupon is inactive' },
  '该优惠券尚未开始': { en: 'This coupon is not active yet' },
  '该优惠券已过期': { en: 'This coupon has expired' },
  '该优惠券已被领完': { en: 'This coupon has been fully redeemed' },
  '订单金额未达到优惠券使用门槛': { en: 'Order total does not meet this coupon minimum' },
  '优惠券校验失败，请稍后再试': { en: 'Could not validate the coupon — please try again' },
  '请输入优惠券码': { en: 'Enter a coupon code' },
  '请选择可用的支付方式': { en: 'Please choose an available payment method' },
  '该支付方式尚未开通，请选择其他方式': { en: 'This payment method is not enabled yet — please choose another one' },
  '请在汇款附言中填写订单号，便于我们对账': {
    en: 'Please put the order number in the transfer reference so we can match your payment',
  },
  '买家取消': { en: 'Cancelled by buyer' },
}

/** 订单/表单里出现的中文字段名 → 英文，供「请填写 X」「X 过长」这类模板复用 */
const API_FIELD_EN = {
  收件人姓名: 'full name',
  电子邮箱: 'email',
  国家: 'country',
  '州 / 省': 'state / province',
  城市: 'city',
  收货地址: 'street address',
  门牌号: 'house number',
  邮编: 'ZIP / postal code',
  手机号: 'phone',
}
const apiField = (name) => API_FIELD_EN[String(name || '').trim()] || String(name || '').trim()

/** [正则, 生成英文] —— 服务端带参数的动态提示 */
const API_MESSAGE_RULES = [
  [/^请填写(.+)$/, (m) => `Please fill in ${apiField(m[1])}`],
  [/^(.+)过长$/, (m) => `${apiField(m[1])} is too long`],
  [/^「(.+)」库存仅剩 (\d+) 件$/, (m) => `Only ${m[2]} left in stock for “${m[1]}”`],
  [/^商品 #(\d+) 已下架$/, (m) => `Product #${m[1]} is no longer available`],
  [/^商品「(.+)」已下架$/, (m) => `“${m[1]}” is no longer available`],
  [/^(.+?)，请 (\d+) 秒后再试$/, (m) => `${m[1]} — please try again in ${m[2]}s`],
  [/^优惠券不可用：(.+)$/, (m) => `Coupon unavailable: ${apiMessage(m[1])}`],
]

/** 把服务端文案转成本地语言（中文界面原样返回） */
function apiMessage(text) {
  const raw = String(text ?? '').trim()
  if (!raw) return ''
  if (isZh(state.lang)) return raw
  const hit = API_MESSAGES[raw]
  if (hit) return hit[state.lang] || hit.en || raw
  for (const [re, build] of API_MESSAGE_RULES) {
    const m = raw.match(re)
    if (m) return build(m)
  }
  if (/[\u4e00-\u9fff]/.test(raw)) return t('genericError')
  return raw
}

function t(key, ...args) {
  const entry = I18N[key]
  if (!entry) return key
  const lang = state.lang || 'en'
  if (lang === 'en') return resolveEntry(entry.en, args)
  if (isZh(lang)) return resolveEntry(entry['zh-CN'] ?? entry.en, args)
  // 其它核心语言（fr/es/de/pt/it/ru/ja/ko）：纯字符串文案走机翻缓存；带参数的函数值回退英文求值
  if (typeof entry.en === 'string') return tr(entry.en, lang)
  return resolveEntry(entry.en, args)
}

/**
 * 语言切换后，把 I18N 里的纯字符串文案按需机翻到当前核心语言，补齐后重渲染。
 * 只翻译字符串值；函数值（含金额/名字等动态参数）保持英文，避免参数被误翻。
 */
async function translateI18nStrings(lang) {
  if (!isTranslatableLang(lang) || lang === 'en' || isZh(lang)) return
  const targets = []
  const seen = new Set()
  for (const entry of Object.values(I18N)) {
    const value = entry.en
    if (typeof value !== 'string' || !value.trim()) continue
    // 含 HTML（如 <br/>、&amp;）的文案不机翻，避免破坏结构，回退英文
    if (/[<&]/.test(value)) continue
    const key = trKey(lang, value)
    if (TR_CACHE.has(key) || seen.has(key)) continue
    seen.add(key)
    targets.push(value)
  }
  if (!targets.length) return
  await Promise.all(targets.map((text) => translateText(text, lang)))
  applyStaticI18n()
  render()
}

/** 把 index.html 里带 data-i18n / data-i18n-placeholder 的静态文案替换成当前语言 */
function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n
    const text = t(key)
    // 含 <i>（如必填星号）等内联子元素时，只替换首个文本节点，保留标记
    if (node.querySelector('i')) {
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
      const firstText = walker.nextNode()
      if (firstText) firstText.nodeValue = text
      return
    }
    node.innerHTML = text
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder))
  })
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.dataset.i18nAria))
  })
  document.documentElement.lang = state.lang || 'en'
  document.title = isZh(state.lang)
    ? 'MXQ · Football Store 官方球衣与装备'
    : 'MXQ · Football Store Official Jerseys & Gear'
}

const state = {
  config: null,
  products: [],
  groups: [],
  /** Trending Collections 轮播数据：{ nfl: [卡片], nba: [...], ... } */
  trending: {},
  category: '',
  groupId: 0,
  /** 当前下钻到的父分组 id（0 表示只看一级） */
  groupParentId: 0,
  keyword: '',
  onlyOnline: true,
  /** 列表排序：default 综合 / newest 最新 / price-asc 价格升 / price-desc 价格降 / discount 折扣优先 / sales 热销优先 */
  sort: 'default',
  /**
   * 折扣下限（百分比整数，0 = 不限）。
   * 不用「只看有折扣」是因为全站 4460 件商品都有折扣（54%~83%，中位 73%），
   * 那样等于空操作；按阈值切才有区分度：≥70% 保留 90%、≥75% 保留 36%、≥78% 仅剩 3%。
   */
  saleMin: 0,
  /** 价格区间（按折扣价 USD 过滤；空串 = 不限） */
  priceMin: '',
  priceMax: '',
  /** 品牌 / 尺码筛选（商品与目录模块；空串 = 不限）。尺码来自目录轻量 sizes 字段 */
  brandFilter: '',
  sizeFilter: '',
  /** 收藏的商品 id 列表（localStorage 持久化） */
  favs: [],
  /** 最近浏览的商品 id（最新的在前，localStorage 持久化） */
  recent: [],
  /** 商品网格已渲染的卡片数（增量渲染游标，见 renderGrid / GRID_PAGE_SIZE） */
  visible: 0,
  cart: [],
  /** 卖家已绑定的社交账号（由 /api/store/catalog 一并返回） */
  socials: [],
  /** 当前登录的客户（服务端会话，未登录为 null） */
  customer: null,
  /** 汇率表与币种符号（由 /api/store/config 下发） */
  fx: { base: 'USD', rates: {}, symbols: {} },
  /** 当前选中的语言（BCP 47）与币种（ISO 4217） */
  lang: 'en',
  currency: 'USD',
  /** Ship to 配送地（ISO 2 国家码 / 州名 / 城市名），驱动头部国旗与注册表单预填 */
  shipCountry: (localStorage.getItem('mxq.shipCountry') || 'US').toUpperCase(),
  shipState: localStorage.getItem('mxq.shipState') || '',
  shipCity: localStorage.getItem('mxq.shipCity') || '',
  /** 国家/语言/币种面板的草稿值（Save 才应用） */
  localeDraft: null,
  /** 以图搜款最近一次的结果（thumb: 查询图预览；matches: 相似商品数组） */
  imgSearch: null,
  /** 结算流程草稿：收货信息 / 配送方式 / 优惠券码 / 服务端报价快照 */
  checkout: null,
  /** 访客订单令牌：orderNo → token，下单时服务端下发，用于查看/支付/取消 */
  guestTokens: {},
  /** 当前订单页的数据（订单详情 + 支付渠道） */
  orderView: null,
  /** 我的订单列表 */
  myOrders: null,
  loaded: false,
  error: '',
}

/* ------------------------------ 工具 ------------------------------ */

const $ = (id) => document.getElementById(id)
const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

/** 把 USD 金额换算成当前选中币种，并带上货币符号格式化。 */
const money = (value) => {
  const number = Number(value) || 0
  const code = state.currency || 'USD'
  const rate = Number(state.fx?.rates?.[code]) || 1
  const converted = number * rate
  const symbol = state.fx?.symbols?.[code] || CURRENCY_SYMBOL[code] || ''
  // 日元/韩元等无小数位币种，其它保留 2 位
  const decimals = ['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'COP', 'ISK'].includes(code) ? 0 : 2
  const formatted = converted.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return `${symbol} ${formatted}`
}

/** 当前币种对 USD 的汇率（未命中回退 1） */
const fxRate = () => Number(state.fx?.rates?.[state.currency]) || 1

/** 当前币种符号（供小字标签等场景单独取用） */
const currencyCode = () => state.currency || 'USD'

/** 当前币种符号（供小字标签等场景单独取用） */
const currencySymbol = () => state.fx?.symbols?.[state.currency] || CURRENCY_SYMBOL[state.currency] || '$'

/** 币种符号 fallback（server 未下发时用） */
const CURRENCY_SYMBOL = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', KRW: '₩', CNY: '¥', HKD: 'HK$',
  TWD: 'NT$', SGD: 'S$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫',
  INR: '₹', PKR: '₨', BDT: '৳', AED: 'د.إ', SAR: '﷼', QAR: '﷼', KWD: 'د.ك',
  BHD: '.د.ب', OMR: '﷼', JOD: 'د.ا', ILS: '₪', TRY: '₺', RUB: '₽', UAH: '₴',
  PLN: 'zł', CZK: 'Kč', BRL: 'R$', MXN: 'MX$', ARS: 'AR$', CLP: 'CLP$',
  COP: 'COP$', CAD: 'CA$', AUD: 'A$', NZD: 'NZ$', ZAR: 'R', NGN: '₦',
  KES: 'KSh', EGP: 'E£', MAD: 'MAD', CHF: 'CHF', SEK: 'kr', NOK: 'kr',
  DKK: 'kr', KZT: '₸', UZS: 'soʻm', MNT: '₮', RSD: 'RSD', ALL: 'L',
  MKD: 'ден', GEL: '₾', AMD: '֏', AZN: '₼', BAM: 'KM', BGN: 'лв',
}

/**
 * CDN 按需缩图。
 *
 * 参考站图床是阿里 OSS，支持 image/resize 处理参数（离线的以图搜款索引也在用它取 96px 小图）。
 * 但商品卡片此前直接用了原图：卡片在 4 列布局里只有约 290px 宽，原图却是 1080px / 606KB
 * （浏览器实测 naturalWidth=1080），一屏十几张卡片就是好几 MB。
 * 实测同一张图的体积：原图 606KB / w_800 136KB / w_400 40KB / w_160 7KB。
 * 所以按「实际展示宽度」取图：卡片 400、详情主图 800、缩略图 160。
 *
 * 只对确认支持该参数的图床生效；站内路径、data:、其他外链一律原样返回，
 * 也避免对已带处理参数（可能来自后台手工填的）的地址重复拼接。
 */
const THUMB_HOSTS = ['ueeshop.ly200-cdn.com']
const CDN_PROCESS_RE = /[?&]x-oss-process=/i
// M2 CDN 与图片优化（P0）：允许收编进同域 /img/ 代理的上游图床。
// 判定依据是「host 精确等于列表项或其子域」，避免误收编任意外链。
const PROXY_HOSTS = ['frgimages.com', 'ueeshop.ly200-cdn.com']

// 处理链尾部统一并进 format,webp：PNG 原图光 resize+quality 几乎不瘦身，
// webp 重编码后体积约减半（实测 76 张横幅 15.08MB → 7.97MB）。
const ensureWebp = (url) => (/format,webp/i.test(url) ? url : `${url}/format,webp`)

const imageUrl = (value, width) => {
  const raw = String(value ?? '').trim()
  if (!raw) return ''
  if (/^(data:|\/)/i.test(raw)) return raw
  if (/^https?:/i.test(raw)) {
    let host = ''
    try {
      host = new URL(raw).hostname
    } catch {
      return raw
    }
    // M2（P0）：白名单图床一律收编同域 /img/ 代理——即使调用方没给宽度
    // （详情页大图/相册图就是这种调用），否则仍会直连第三方绕过 CDN。
    if (!width) return isProxyUpstream(host) ? toSameOriginProxy(raw) : raw
    if (!THUMB_HOSTS.some((item) => host === item || host.endsWith(`.${item}`))) {
      // fanatics 官方 CDN：支持 ?w=NNN 查询参数缩略（fanatics 官站同款用法）。
      // 2026-09-29 起改走同域图片代理 /img/（nginx proxy_cache 落盘缓存 30 天 + stale 兜底，
      // Accept 协商透传给上游 CloudFront 自动出 AVIF/WebP，缓存按格式分档）：
      // 图片收编为 mxqshop.to 同域 → 可被站点 CDN（Cloudflare）边缘缓存，上游断供有本地缓存兜底。
      if (width && /(^|\.)frgimages\.com$/i.test(host)) {
        const u = new URL(raw)
        u.searchParams.set('w', String(Math.round(width)))
        return `/img/${u.host}${u.pathname}${u.search}`
      }
      // M2（P0）：商品主图图床 ueeshop.ly200-cdn.com 同样收编进 /img/ 同域代理。
      // 原先直连外链 = 第三方可用性/带宽风险，且完全绕过 Cloudflare 边缘缓存。
      if (isProxyUpstream(host)) {
        return toSameOriginProxy(raw)
      }
      return raw
    }
    const w = Math.round(width)
    const viaProxy = isProxyUpstream(host)
    // 已带处理参数（抓来的球队介绍图就带 format,webp/quality,q_100）不能直接跳过：
    // 那样会把 600KB 级的原图整张拉下来。这里把 resize 并进已有的处理链里。
    if (CDN_PROCESS_RE.test(raw)) {
      let out
      if (/[?&]x-oss-process=[^&]*resize,/i.test(raw)) {
        out = raw.replace(/([?&]x-oss-process=[^&]*?)resize,[^/&]*/i, `$1resize,w_${w}`)
      } else if (/[?&]x-oss-process=image\//i.test(raw)) {
        out = raw.replace(/([?&]x-oss-process=image\/)/i, `$1resize,w_${w}/`)
      } else {
        out = raw.replace(/([?&]x-oss-process=)/i, `$1resize,w_${w}/`)
      }
      return viaProxy ? toSameOriginProxy(ensureWebp(out)) : ensureWebp(out)
    }
    const sep = raw.includes('?') ? '&' : '?'
    const sized = ensureWebp(`${raw}${sep}x-oss-process=image/resize,w_${w}/quality,q_80`)
    return viaProxy ? toSameOriginProxy(sized) : sized
  }
  // 云存储私有对象：读卖家台写入 cover_data 的图片字节（签名 URL 有 1 小时上限且服务端不可代签）
  return `/api/store/group-cover?path=${encodeURIComponent(raw)}`
}

/**
 * M2 CDN 与图片优化（P0）：把外部图床 URL 改写为同域 /img/ 代理地址。
 * 收益：① 进入 Cloudflare 边缘缓存（原来直连第三方，边缘完全不命中）；
 *      ② 上游图床挂掉时 nginx proxy_cache 的 30 天落盘缓存仍可出图；
 *      ③ 出口只留自家缓存头，第三方无法注入。
 * nginx 白名单见 imgproxy.conf 的 $img_host_ok，未列入的域一律 403。
 */
function toSameOriginProxy(absoluteUrl) {
  try {
    const u = new URL(absoluteUrl)
    return `/img/${u.host}${u.pathname}${u.search}`
  } catch {
    return absoluteUrl
  }
}

/** 该上游是否已列入 /img/ 代理白名单（与 nginx imgproxy.conf 的 $img_host_ok 保持一致） */
const isProxyUpstream = (host) =>
  PROXY_HOSTS.some((item) => host === item || host.endsWith(`.${item}`))

const parseList = (raw) => {
  let value = raw
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value)
    } catch {
      return raw ? [raw] : []
    }
  }
  return Array.isArray(value) ? value.filter(Boolean) : []
}

/** 商品图片列表；width 见 imageUrl（卡片要小图、详情主图要大图、缩略图要最小） */
const productImages = (product, width) => {
  const gallery = parseList(product?.images).map((src) => imageUrl(src, width))
  const cover = product?.main_image ? imageUrl(product.main_image, width) : ''
  const all = [...gallery, ...(cover ? [cover] : [])]
  const unique = [...new Set(all)]
  return unique.length ? unique : ['/img/jersey-white-blue.svg']
}

/**
 * M4 图片优化：为主图生成 srcset（1x/2x 两档）。
 * 只对支持按宽度缩放的上游（收编进 /img/ 代理的白名单图床）生成，
 * 其余图床返回空串，浏览器直接用 src。
 */
function buildSrcSet(product, fallbackSrc) {
  const raw = String(fallbackSrc || '')
  if (!raw.startsWith('/img/')) return ''
  const src = parseList(product?.main_image)[0] || parseList(product?.images)[0] || ''
  if (!src) return ''
  try {
    const host = new URL(src).hostname
    if (!isProxyUpstream(host)) return ''
  } catch {
    return ''
  }
  const one = imageUrl(src, 400)
  const two = imageUrl(src, 800)
  if (!one || !two || one === two) return ''
  return ` srcset="${esc(one)} 1x, ${esc(two)} 2x"`
}

/** 「不选补丁」选项的统一占位图：白底 + 英文 None 字样 */
const PATCH_NONE_IMG = '/img/patch-none.svg?v=2'

/**
 * 商品详情页支付按钮下方的支付方式图标行（1:1 复刻自参考站 jerseyteamsworld.com
 * 的 #product-payment-methods 内联 SVG，抽取为本地静态资源 /img/pay/*.svg）。
 */
const PAY_ICONS = [
  'american_express', 'apple_pay', 'bancontact', 'diners_club', 'discover',
  'google_pay', 'klarna', 'maestro', 'master', 'unionpay', 'visa', 'paypal',
]
const PAY_ICONS_ROW = `
        <div class="pay-icons" aria-label="Accepted payment methods">
          ${PAY_ICONS.map((n) => `<img src="/img/pay/${n}.svg" alt="${n.replace(/_/g, ' ')}" loading="lazy" />`).join('')}
        </div>`

/**
 * 补丁类（picture）选项组统一规整：
 * ① 库里「Without Patches / Without Patch」这类 0 元无图的免费选项（界面上显示为 Gratuit/Free）
 *    → 统一替换成带白底 None 图的 None 选项（0 元）；
 * ② 整组没有 0 元选项的（极少数脏数据）→ 组首补一个 None（0 元），保证客户随时可以不贴补丁。
 * 在 normalizeOptions 里做，渲染、计价、购物车、下单走的是同一份规整结果。
 */
function normalizeOptionItems(group) {
  const items = (Array.isArray(group.items) ? group.items : [])
    .filter((item) => item && item.label)
    .map((item) => ({
      label: String(item.label),
      price: Number(item.price) || 0,
      image: item.image || '',
      active: item.active !== false,
    }))
  if (group.type !== 'picture') return items
  const freeIdx = items.findIndex((item) => item.price === 0 && !item.image)
  const noneItem = { label: 'None', price: 0, image: PATCH_NONE_IMG, active: true }
  if (freeIdx >= 0) items[freeIdx] = noneItem
  else items.unshift({ ...noneItem })
  return items
}

const normalizeOptions = (raw) => {
  let value = raw
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value)
    } catch {
      return []
    }
  }
  if (!Array.isArray(value)) return []
  return value
    .filter((group) => group && typeof group === 'object' && group.name)
    .map((group) => ({
      name: String(group.name),
      type: ['text', 'picture', 'customize'].includes(group.type) ? group.type : 'text',
      required: group.required === true,
      inputMode: group.inputMode === 'number' ? 'number' : 'text',
      maxLength: Number(group.maxLength) || undefined,
      hint: group.hint || '',
      items: normalizeOptionItems(group),
    }))
    .filter((group) => group.items.length)
}

const visibleItems = (group) => group.items.filter((item) => item.active !== false)

/** 与后台 src/lib/catalog.ts 的 priceOf 保持同一套算法，保证两侧总价一致 */
function priceOf(base, options, selection) {
  const picks = selection?.picks || {}
  const inputs = selection?.inputs || {}
  const addons = []
  for (const group of options) {
    const items = visibleItems(group)
    if (!items.length) continue
    if (group.type === 'customize') {
      const entered = inputs[group.name] || {}
      for (const item of items) {
        const value = String(entered[item.label] ?? '').trim()
        if (value) addons.push({ group: group.name, label: item.label, price: item.price, input: value })
      }
      continue
    }
    const chosen = picks[group.name]
    const item = chosen ? items.find((candidate) => candidate.label === chosen) : null
    if (item) {
      if (item.price !== 0) addons.push({ group: group.name, label: item.label, price: item.price })
    } else if (group.required) {
      const cheapest = items.reduce((best, current) => (current.price < best.price ? current : best), items[0])
      if (cheapest.price !== 0) addons.push({ group: group.name, label: cheapest.label, price: cheapest.price })
    }
  }
  const addonTotal = addons.reduce((sum, line) => sum + line.price, 0)
  const baseValue = Number(base) || 0
  return { base: baseValue, addons, addonTotal, total: baseValue + addonTotal }
}

const discountPercent = (list, sale) => {
  const l = Number(list) || 0
  const s = Number(sale) || 0
  if (l <= 0 || s <= 0 || s >= l) return 0
  return Math.round((1 - s / l) * 100)
}

const salePriceOf = (product) => Number(product?.sale_price) || Number(product?.price_usd) || 0
const listPriceOf = (product) => Number(product?.list_price) || 0

/* ------------------------------ 数据 ------------------------------ */

/**
 * 初始化语言与币种（恢复自动换算）。
 * 语言：按浏览器语言自动检测（手动选择优先）。
 * 币种：按 Ship to 配送国自动换算（手动选择优先，其次语言默认币种，最后美元）。
 */
function detectLocale() {
  const savedLang = localStorage.getItem('mxq.lang')
  const savedCur = localStorage.getItem('mxq.currency')
  const shipCountry = localStorage.getItem('mxq.shipCountry') || 'US'

  // 语言：手动 > 浏览器语言 > en
  let lang = savedLang
  if (!lang) {
    lang = normalizeLangCode(navigator.language || navigator.userLanguage || 'en')
  }
  lang = normalizeLangCode(lang)

  // 币种：手动 > 配送国币种 > 语言默认币种 > USD
  let cur = savedCur
  if (!cur) {
    const geo = window.MXQ_GEO || {}
    cur = geo.countryCurrency?.[shipCountry] || LANG_TO_CURRENCY[lang] || 'USD'
  }
  return { lang, currency: cur }
}

/**
 * 带超时与重试的 fetch：跨境链路偶发 TCP 拖死时，fetch 可能长时间既不成功也不报错，
 * 页面就永远停在骨架屏。这里 25 秒强制超时 + 自动重试 2 次，失败才走错误提示。
 */
function fetchRetry(url, retries = 2, timeoutMs = 25000) {
  const attempt = (n) => {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), timeoutMs)
    return fetch(url, { signal: ctrl.signal })
      .finally(() => clearTimeout(timer))
      .catch((error) => {
        if (n < retries) return attempt(n + 1)
        throw error
      })
  }
  return attempt(0)
}

/** 全量目录后台补拉 promise（lite 首屏模式下，详情页目录外包等它到位再渲染） */
let fullCatalogPromise = null

async function load() {
  try {
    const [config, liteCatalog, trending] = await Promise.all([
      fetchRetry('/api/store/config').then((response) => response.json()),
      // 首屏轻量包（300 件，br 约 15KB）：跨境弱网秒开首屏，完整目录在 load() 尾部后台补齐
      fetchRetry('/api/store/catalog?lite=1')
        .then((response) => response.json())
        .catch(() => null),
      // Trending Collections 轮播数据（联盟页横滑卡片，非核心数据失败不阻断启动）
      fetch('/assets/trending-collections.json?v=20260927d')
        .then((response) => response.json())
        .catch(() => ({})),
    ])
    let catalog = liteCatalog
    if (!catalog || catalog.error) catalog = await fetchRetry('/api/store/catalog').then((response) => response.json())
    if (catalog.error) throw new Error(catalog.error)
    state.config = config
    state.products = Array.isArray(catalog.products) ? catalog.products : []
    state.groups = Array.isArray(catalog.groups) ? catalog.groups : []
    state.socials = Array.isArray(catalog.socials) ? catalog.socials : []
    // 全量目录就绪前（lite 包只有 300 件），购物车失效行清理/搜索词表一律不能用残缺目录
    state.catalogFull = !liteCatalog || Boolean(liteCatalog.error)
    state.trending = trending && typeof trending === 'object' ? trending : {}
    state.fx = config?.fx || { base: 'USD', rates: { USD: 1 }, symbols: { USD: '$' } }
    state.payments = Array.isArray(config?.payments) ? config.payments : []
    captureChannel()
    const detected = detectLocale()
    state.lang = detected.lang
    state.currency = detected.currency
    state.loaded = true
    // 后台补拉完整目录：promise 必须在 render() 之前建好——详情页「目录外包」兜底
    // 要挂它的 .then 触发重绘；补齐后只换数据不重绘首页，避免打断用户输入/滚动
    if (liteCatalog && !liteCatalog.error) {
      fullCatalogPromise = fetchRetry('/api/store/catalog')
        .then((response) => response.json())
        .then((full) => {
          if (full && Array.isArray(full.products) && full.products.length) {
            state.products = full.products
            if (Array.isArray(full.groups) && full.groups.length) state.groups = full.groups
            if (Array.isArray(full.socials)) state.socials = full.socials
            state.catalogFull = true
            SEARCH_VOCAB = null // 词表基于全量目录重建
            // 深链直达分组/球队页时，lite 包可能不含该组商品（空态假象）：全量就绪后重绘一次
            if (state.groupId || state.groupParentId) render()
          }
        })
        .catch(() => {})
    }
  } catch (error) {
    state.error = String(error?.message || error)
  }
  applyStaticI18n()
  render()
  // 首次进入：若自动检测到核心语言（浏览器/配送国），后台机翻补齐界面文案与商品标题
  if (state.loaded) {
    translateI18nStrings(state.lang)
    translateVisibleProducts()
  }
}

const descendantsOf = (groupId) => {
  const ids = new Set([Number(groupId)])
  let grew = true
  while (grew) {
    grew = false
    for (const group of state.groups) {
      if (group.parent_id && ids.has(Number(group.parent_id)) && !ids.has(Number(group.id))) {
        ids.add(Number(group.id))
        grew = true
      }
    }
  }
  return ids
}

/* ------------------ M3 搜索能力：同义词 / 拼写纠错（2026-10-06） ------------------ */

/** 搜索同义词表：token 命中本体或任一近义词都算匹配（目录里是英文球衣语料） */
const SEARCH_SYNONYMS = {
  jersey: ['shirt', 'kit', 'maillot'],
  shirt: ['jersey', 'kit'],
  kit: ['jersey', 'shirt'],
  jerseys: ['jersey'],
  maillot: ['jersey'],
  boots: ['shoes', 'cleats'],
  boot: ['shoes', 'cleats'],
  cleats: ['boots', 'shoes'],
  shoes: ['boots', 'cleats', 'sneakers'],
  sneaker: ['sneakers', 'shoes'],
  shorts: ['pants'],
  pants: ['shorts', 'trousers'],
  trousers: ['pants'],
  jacket: ['coat', 'windbreaker'],
  coat: ['jacket'],
  hoodie: ['hoody', 'sweatshirt'],
  hoody: ['hoodie'],
  scarf: ['scarves'],
  scarves: ['scarf'],
  socks: ['stockings'],
  stocking: ['socks'],
  hat: ['cap', 'beanie'],
  cap: ['hat'],
  beanie: ['hat'],
  kids: ['children', 'youth', 'baby', 'kid'],
  kid: ['kids', 'children'],
  children: ['kids', 'youth'],
  youth: ['kids', 'teen'],
  baby: ['infant', 'toddler'],
  infant: ['baby'],
  women: ['ladies', 'woman', 'womens'],
  ladies: ['women'],
  woman: ['women'],
  men: ['mens', 'man', 'mens'],
  man: ['men'],
  ball: ['football', 'soccer'],
  football: ['soccer'],
  soccer: ['football'],
  bag: ['bags', 'backpack'],
  bags: ['bag', 'backpack'],
  backpack: ['bag'],
  // ---- 以下按站内真实标题词频补齐（2026-10-08：jersey 19802 / nike 6523 / home 4448 /
  // player 3907 / football 3498 / gameday 2997 / authentic 2286 / replica 2381 …）----
  // 正副本/ authentic 类：买家常用词与商品标题用词不一致，不扩展就会零结果
  authentic: ['replica', 'genuine', 'official', 'real'],
  replica: ['authentic', 'genuine', 'official'],
  genuine: ['authentic', 'replica'],
  official: ['authentic', 'replica'],
  // 训练款：球迷口语 "training" 对应标题里的 track/practice
  training: ['track', 'practice'],
}

/** token 匹配：本体或同义词任一命中都算 */
function matchToken(haystack, token) {
  if (haystack.includes(token)) return true
  const alts = SEARCH_SYNONYMS[token]
  if (alts) return alts.some((alt) => haystack.includes(alt))
  return false
}

/** 编辑距离（≤2 视为拼错的可纠词；只对小词表跑，词表按频率截断） */
function levenshtein(a, b) {
  if (a === b) return 0
  if (Math.abs(a.length - b.length) > 2) return 3
  const prev = new Array(b.length + 1)
  const curr = new Array(b.length + 1)
  for (let j = 0; j <= b.length; j += 1) prev[j] = j
  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i
    for (let j = 1; j <= b.length; j += 1) {
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j]
  }
  return prev[b.length]
}

let SEARCH_VOCAB = null
/** 搜索词表：标题高频词 + 品牌 + 分组名（拼写纠错候选）。商品目录加载完构建一次 */
function searchVocab() {
  if (SEARCH_VOCAB) return SEARCH_VOCAB
  const freq = new Map()
  const bump = (word) => {
    if (word.length < 3 || word.length > 20) return
    freq.set(word, (freq.get(word) || 0) + 1)
  }
  for (const product of state.products) {
    String(product.title || '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .forEach(bump)
    if (product.brand) bump(String(product.brand).toLowerCase())
  }
  for (const group of state.groups) String(group.name || '').toLowerCase().split(/[^a-z0-9]+/).forEach(bump)
  // 频次 ≥3 的词才值得当纠错候选（防止把冷门 SKU 词当词典）
  SEARCH_VOCAB = [...freq.entries()].filter(([, n]) => n >= 3).map(([w]) => w)
  return SEARCH_VOCAB
}

/** 对一个词找最接近的词典词（距离 ≤2）；找不到返回空串 */
function suggestWord(word) {
  if (!word || word.length < 3) return ''
  let best = ''
  let bestDist = 3
  for (const candidate of searchVocab()) {
    const dist = levenshtein(word, candidate)
    if (dist < bestDist) {
      best = candidate
      bestDist = dist
      if (dist === 1) break
    }
  }
  return best
}

/** 对整个查询纠错：逐词替换，返回与原查询不同的建议（无建议返回空串） */
function suggestQuery(rawQuery) {
  const tokens = rawQuery.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!tokens.length) return ''
  const fixed = tokens.map((token) => suggestWord(token) || token)
  const suggestion = fixed.join(' ')
  return suggestion && suggestion !== tokens.join(' ') ? suggestion : ''
}

/** 品牌 / 尺码筛选候选（从当前上下文归纳：分类锚点+关键词等已生效，品牌/尺码本身除外） */
function toolsBasePool() {
  const savedBrand = state.brandFilter
  const savedSize = state.sizeFilter
  state.brandFilter = ''
  state.sizeFilter = ''
  const list = filteredProducts()
  state.brandFilter = savedBrand
  state.sizeFilter = savedSize
  return list
}

function brandOptions(pool) {
  const freq = new Map()
  for (const product of pool || state.products) {
    const brand = String(product.brand || '').trim()
    if (brand) freq.set(brand, (freq.get(brand) || 0) + 1)
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 60)
    .map(([brand]) => brand)
}

function sizeOptions(pool) {
  const seen = new Map()
  for (const product of pool || state.products) {
    for (const size of Array.isArray(product.sizes) ? product.sizes : []) {
      const key = String(size).trim()
      if (key && !seen.has(key.toLowerCase())) seen.set(key.toLowerCase(), key)
    }
  }
  // 尺码按「字母码 → 数字 → 其他」粗排：S/M/L/XL 一族排前面
  return [...seen.values()].sort((a, b) => {
    const rank = (v) => (/^(xxx?l|2xl|3xl|4xl|xs|s|m|l|xl)$/i.test(v) ? 0 : /^\d+$/.test(v) ? 1 : 2)
    return rank(a) - rank(b) || a.length - b.length || a.localeCompare(b)
  })
}

function filteredProducts() {
  const keyword = state.keyword.trim().toLowerCase()
  // 筛选分组：优先叶子 groupId，否则下钻中的父级 groupParentId
  const anchor = state.groupId || state.groupParentId
  const anchorGroup = anchor ? state.groups.find((g) => Number(g.id) === Number(anchor)) : null
  // 虚拟分类：分组配了 match_keywords 时按标题关键词匹配（商品仍保留球队归属）
  const matchWords = anchorGroup && anchorGroup.match_keywords
    ? String(anchorGroup.match_keywords)
        .split('|')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    : null
  // New Arrivals 等用 __latest__ 标记：取最新上架的一批
  const latestOnly = matchWords && matchWords.includes('__latest__')
  const groupIds = anchor && !matchWords ? descendantsOf(anchor) : null
  let list = state.products.filter((product) => {
    if (state.onlyOnline && product.status !== 'online') return false
    if (state.category && product.category !== state.category) return false
    if (matchWords && !latestOnly) {
      const hay = `${product.title || ''} ${product.title_local || ''}`.toLowerCase()
      if (!matchWords.some((w) => hay.includes(w))) return false
    }
    if (groupIds && !groupIds.has(Number(product.group_id))) return false
    if (state.saleMin > 0 && discountPercent(listPriceOf(product), salePriceOf(product)) < state.saleMin) return false
    if (state.brandFilter && String(product.brand || '').trim().toLowerCase() !== state.brandFilter.toLowerCase()) return false
    if (state.sizeFilter) {
      const sizes = Array.isArray(product.sizes) ? product.sizes : []
      if (!sizes.some((s) => String(s).trim().toLowerCase() === state.sizeFilter.toLowerCase())) return false
    }
    if (keyword) {
      const haystack = `${product.title || ''} ${product.title_local || ''} ${product.brand || ''} ${product.category || ''}`.toLowerCase()
      // 多词 AND + 同义词扩展：jersey↔shirt/kit、boots↔cleats…（M3 搜索）
      const tokens = keyword.split(/\s+/).filter(Boolean)
      if (!tokens.every((token) => matchToken(haystack, token))) return false
    }
    return true
  })
  // 价格区间按「折扣价（USD）」比较：填 20~60 就是到手价落在这一段
  const min = state.priceMin === '' ? null : Number(state.priceMin)
  const max = state.priceMax === '' ? null : Number(state.priceMax)
  if (min !== null && Number.isFinite(min)) list = list.filter((product) => salePriceOf(product) >= min)
  if (max !== null && Number.isFinite(max)) list = list.filter((product) => salePriceOf(product) <= max)
  if (latestOnly) {
    list = [...list].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 300)
  }
  return sortProducts(list)
}

/** 列表排序。default = 按标题里的赛季年份从新到旧（2026/27 在最前，78-79 在最后）。 */
function sortProducts(list) {
  const copy = [...list]
  const saleOf = salePriceOf
  const offOf = (product) => discountPercent(listPriceOf(product), salePriceOf(product))
  switch (state.sort) {
    case 'newest':
      return copy.sort((a, b) => Number(b.id) - Number(a.id))
    case 'price-asc':
      return copy.sort((a, b) => saleOf(a) - saleOf(b))
    case 'price-desc':
      return copy.sort((a, b) => saleOf(b) - saleOf(a))
    case 'discount':
      return copy.sort((a, b) => offOf(b) - offOf(a))
    case 'sales':
      return copy.sort((a, b) => (Number(b.sale_count) || 0) - (Number(a.sale_count) || 0))
    default:
      // 赛季年份降序：新年份在前；同季按 id 降序；无年份的商品排在最末。
      // 上面再叠加球队火爆度：热门球队整体排在偏门球队之前（同队内仍按赛季新旧）。
      return copy.sort((a, b) => {
        const ra = teamRankOf(a)
        const rb = teamRankOf(b)
        if (ra !== rb) return ra - rb
        const ya = seasonYearOf(a)
        const yb = seasonYearOf(b)
        if (ya !== yb) return (yb ?? -1) - (ya ?? -1)
        return Number(b.id) - Number(a.id)
      })
  }
}

/**
 * 从标题解析赛季年份（取起始年，数值越大越新）：
 *   "2026-27" / "2026/2027" / "2026/27" → 2026
 *   "1978-79" / "78-79" → 1978（两位年份：30-99 视为 19xx，00-29 视为 20xx）
 *   "2026 World Cup" → 2026（独立四位年份）
 *   无年份 → null（排序时垫底）
 */
/**
 * 标题里的赛季年份只解析一次（WeakMap 按商品对象缓存）。
 * 默认排序的比较器会调用上千次，8507 件商品下重复解析要让每次重绘多花 ~15ms；
 * 用 WeakMap 而不是给商品对象挂字段，是为了不污染接口返回的数据。
 */
const seasonYearCache = new WeakMap()

function seasonYearOf(product) {
  if (product && typeof product === 'object') {
    const cached = seasonYearCache.get(product)
    if (cached !== undefined) return cached
  }
  const year = parseSeasonYear(product)
  if (product && typeof product === 'object') seasonYearCache.set(product, year)
  return year
}

function parseSeasonYear(product) {
  const text = `${product.title || ''} ${product.title_local || ''}`
  let m = text.match(/\b((?:19|20)\d{2})\s*[-–/]\s*(\d{2}|\d{4})\b/)
  if (m) return Number(m[1])
  m = text.match(/\b(\d{2})\s*[-/]\s*(\d{2})\b/)
  if (m) {
    const y = Number(m[1])
    return y >= 30 ? 1900 + y : 2000 + y
  }
  m = text.match(/\b((?:19|20)\d{2})\b/)
  if (m) return Number(m[1])
  return null
}

/* ------------------- 球队火爆度排序（首页 / 分类默认排序） -------------------
 * 参考全球球迷规模与社媒热度排的「热门 → 偏门」榜单：欧洲豪门 → 其它五大联赛
 * 劲旅 → 荷葡土超/南美/中北美豪门 → 国家队（世界强队 → 其余）。
 * 库里 brand 字段有缩写（Real / Manchester / AC / Borussia…），所以统一用
 * 「brand + 标题」合起来按别名正则匹配；排在前面的先测试，同名歧义靠顺序消解
 * （如 Inter 测过之后 Milan 才轮到，避免「Inter Milan」被认成 AC Milan）。
 * 榜上没命中的球队排在所有上榜球队之后，内部保持原排序。
 */
const TEAM_POPULARITY = [
  // —— 欧洲顶流豪门 ——
  ['Real Madrid', /real madrid|realmadrid/],
  ['Barcelona', /barcelona|\bbarca\b|f\.?c\.? barcelona/],
  ['Manchester United', /manchester united|man\.? ?utd|\bmufc\b/],
  ['Liverpool', /liverpool/],
  ['Bayern Munich', /bayern/],
  ['Arsenal', /arsenal/],
  ['Chelsea', /chelsea/],
  ['Manchester City', /manchester city|man\.? ?city|\bmcfc\b/],
  ['PSG', /psg|paris saint|paris sg/],
  ['Juventus', /juventus|\bjuve\b/],
  ['Inter Milan', /\binter\b|inter milan|internazionale/],
  ['AC Milan', /\bac ?milan|\bmilan\b/],
  ['Borussia Dortmund', /dortmund|\bbvb\b|borussia/],
  ['Atletico Madrid', /atl[eé]tico|atletico madrid/],
  ['Tottenham', /tottenham|\bspurs\b/],
  // —— 五大联赛其它劲旅 ——
  ['Newcastle', /newcastle/],
  ['Napoli', /napoli/],
  ['AS Roma', /\broma\b/],
  ['Ajax', /ajax/],
  ['Marseille', /marseille/],
  ['Benfica', /benfica/],
  ['FC Porto', /\bporto\b/],
  ['Sporting CP', /sporting/],
  ['Olympique Lyonnais', /lyonnais|\blyon\b/],
  ['AS Monaco', /monaco/],
  ['Leverkusen', /leverkusen/],
  ['RB Leipzig', /leipzig/],
  ['Eintracht Frankfurt', /frankfurt/],
  ['VfB Stuttgart', /stuttgart/],
  ['VfL Wolfsburg', /wolfsburg/],
  ['Bayer (Germany)', /\bbayer\b/],
  ['Sevilla', /sevilla/],
  ['Real Betis', /betis/],
  ['Villarreal', /villarreal/],
  ['Athletic Bilbao', /athletic (club|bilbao)|athletic bilbao/],
  ['Real Sociedad', /sociedad/],
  ['Celta Vigo', /celta/],
  ['Valencia', /valencia/],
  ['Everton', /everton/],
  ['West Ham', /west ham/],
  ['Aston Villa', /aston villa/],
  ['Leeds United', /leeds/],
  ['Celtic', /celtic/],
  ['Rangers', /rangers/],
  ['Fulham', /fulham/],
  ['Brighton', /brighton/],
  ['Crystal Palace', /crystal palace/],
  ['Brentford', /brentford/],
  ['Wolverhampton', /wolverhampton|wolves/i],
  ['Nottingham Forest', /nottingham/],
  ['Sunderland', /sunderland/],
  ['Burnley', /burnley/],
  ['Southampton', /southampton/],
  ['Leicester', /leicester/],
  ['Ipswich', /ipswich/],
  ['Bologna', /bologna/],
  ['Atalanta', /atalanta/],
  ['Lazio', /\blazio\b/],
  ['Fiorentina', /fiorentina/],
  ['Torino', /\btorino\b/],
  ['Sassuolo', /sassuolo/],
  ['Udinese', /udinese/],
  ['Genoa', /\bgenoa\b/],
  ['Como', /\bcomo\b/],
  ['Real Madrid Castilla', /castilla/],
  ['Getafe', /getafe/],
  ['Osasuna', /osasuna/],
  ['Girona', /girona/],
  ['Mallorca', /mallorca/],
  ['Rayo Vallecano', /rayo/],
  ['Espanyol', /espanyol/],
  ['Alaves', /alav[eé]s/],
  ['Elche', /elche/],
  ['Freiburg', /freiburg/],
  ['Hoffenheim', /hoffenheim/],
  ['Mainz', /mainz/],
  ['Werder Bremen', /bremen/],
  ['Union Berlin', /union berlin/],
  ['Augsburg', /augsburg/],
  // —— 荷 / 葡 / 土 / 其他欧陆 ——
  ['PSV', /\bpsv\b/],
  ['Feyenoord', /feyenoord/],
  ['Galatasaray', /galatasaray/],
  ['Fenerbahce', /fenerbah[cç]/i],
  ['Besiktas', /be[sş]ikta[sş]/i],
  ['Club Brugge', /club brugge|brugge/],
  ['Red Bull Salzburg', /salzburg/],
  ['Copenhagen', /copenhagen/],
  ['Rosenborg', /rosenborg/],
  ['Slavia Prague', /slavia/],
  ['Sparta Prague', /sparta/],
  ['Legia Warsaw', /legia/],
  ['Zenit', /zenit/],
  ['Shakhtar', /shakhtar/],
  ['Dynamo Kyiv', /dynamo kyiv|dyn\. kyiv/],
  ['Olympiacos', /olympiacos/],
  ['PAOK', /\bpaok\b/],
  ['AEK Athens', /\baek\b/],
  ['Panathinaikos', /panathinaikos/],
  // —— 南美 / 中北美豪门 ——
  ['Flamengo', /flamengo/],
  ['Palmeiras', /palmeiras/],
  ['Corinthians', /corinthians/],
  ['Sao Paulo', /s[ãa]o paulo/],
  ['Santos FC', /\bsantos\b/],
  ['Gremio', /gr[êe]mio/i],
  ['Internacional', /internacional/],
  ['Fluminense', /fluminense/],
  ['Botafogo', /botafogo/],
  ['Boca Juniors', /boca juniors|\bboca\b/],
  ['River Plate', /river plate|\briver\b/],
  ['Racing Club', /racing (club|avellaneda)/],
  ['Independiente', /independiente/],
  ['Nacional', /\bnacional\b/],
  ['Penarol', /pe[ñn]arol/i],
  ['Club America', /club am[eé]rica|am[eé]rica de m[eé]xico/],
  ['Cruz Azul', /cruz azul/],
  ['Tigres UANL', /\btigres\b/],
  ['Pumas UNAM', /\bpumas\b/],
  ['Chivas', /chivas|guadalajara/i],
  ['Leon', /\ble[oó]n\b/],
  [' Monterrey', /monterrey/],
  ['Toluca', /\btoluca\b/],
  ['Seattle Sounders', /seattle/],
  ['LA Galaxy', /la galaxy|los angeles galaxy/],
  ['Inter Miami', /inter miami|miami/],
  ['Atlanta United', /atlanta united/],
  // —— 亚洲 / 非洲代表 ——
  ['Al Hilal', /al ?hilal/],
  ['Al Nassr', /al ?nassr/],
  ['Al Ittihad', /al ?ittihad/],
  ['Al Ahly', /al ?ahly/],
  ['Zamalek', /zamalek/],
  ['Esperance', /esp[eé]rance/i],
  ['Urawa Reds', /urawa/],
  ['Kashima Antlers', /kashima/],
  ['Vissel Kobe', /vissel|kobe/],
  ['Kawasaki Frontale', /kawasaki/],
  ['Ulsan', /\bulsan\b/],
  ['Jeonbuk', /jeonbuk/],
  // —— 国家队（按世界杯关注度） ——
  ['Brazil', /brazil|brasil/i],
  ['Argentina', /argentina/],
  ['France', /france/],
  ['England', /england/],
  ['Germany', /germany|deutschland/i],
  ['Spain', /\bspain\b|espa[ñn]a\b/i],
  ['Italy', /\bitaly\b|italia\b/i],
  ['Portugal', /portugal/],
  ['Netherlands', /netherlands|holland/i],
  ['Belgium', /belgium/],
  ['Croatia', /croatia/],
  ['Uruguay', /uruguay/],
  ['Mexico', /\bmexico\b|m[eé]xico\b/i],
  ['USA', /\busa\b|united states/i],
  ['Japan', /\bjapan\b/],
  ['Morocco', /morocco|maroc/i],
  ['Senegal', /senegal/],
  ['Colombia', /colombia/],
  ['South Korea', /korea/],
  ['Canada', /\bcanada\b/],
  ['Switzerland', /switzerland/],
  ['Denmark', /denmark/],
  ['Poland', /\bpoland\b/],
  ['Austria', /austria/],
  ['Turkey', /\bturkey\b|t[uü]rkiye/i],
  ['Wales', /\bwales\b/],
  ['Scotland', /scotland/],
  ['Ireland', /ireland/],
  ['Serbia', /\bserbia\b/],
  ['Nigeria', /nigeria/],
  ['Ghana', /\bghana\b/],
  ['Algeria', /algeria/],
  ['Egypt', /\begypt\b/],
  ['Ivory Coast', /ivory coast|c[ôo]te d[’']?ivoire/i],
  ['Cameroon', /cameroon/],
  ['Tunisia', /tunisia/],
  ['Mali', /\bmali\b/],
  ['Ecuador', /ecuador/],
  ['Chile', /\bchile\b/],
  ['Peru', /\bperu\b/],
  ['Paraguay', /paraguay/],
  ['Venezuela', /venezuela/],
  ['Australia', /australia/],
  ['Saudi Arabia', /saudi/],
  ['Qatar', /\bqatar\b/],
  ['China', /\bchina\b/],
  ['Thailand', /thailand/],
  ['Vietnam', /vietnam/],
  ['Indonesia', /indonesia/],
  ['Malaysia', /malaysia/],
].map(([name, source]) => ({ name, re: new RegExp(source.source, 'i') }))

const teamRankCache = new WeakMap()
const UNRANKED_BASE = 10000

/** 商品归属球队榜位：命中榜单返回下标（越小越火），未命中返回 UNRANKED_BASE + 榜单长度 */
function teamRankOf(product) {
  if (product && typeof product === 'object') {
    const cached = teamRankCache.get(product)
    if (cached !== undefined) return cached
  }
  const hay = `${product.brand || ''} ${product.title || ''} ${product.title_local || ''}`
  let rank = UNRANKED_BASE
  for (let i = 0; i < TEAM_POPULARITY.length; i += 1) {
    if (TEAM_POPULARITY[i].re.test(hay)) {
      rank = i
      break
    }
  }
  if (product && typeof product === 'object') teamRankCache.set(product, rank)
  return rank
}

/** 首页「每队 3 个名额」：排序后的列表里，同一支球队只保留前 3 个在先，
 *  被挤掉的顺延到列表末尾（不丢商品，翻页仍能看到）。 */
const HOME_TEAM_QUOTA = 3

function applyHomeTeamQuota(list) {
  const seen = new Map()
  const head = []
  const tail = []
  for (const product of list) {
    const rank = teamRankOf(product)
    const count = seen.get(rank) || 0
    if (count < HOME_TEAM_QUOTA) {
      seen.set(rank, count + 1)
      head.push(product)
    } else {
      tail.push(product)
    }
  }
  return [...head, ...tail]
}


/* ------------------------------ 购物车 ------------------------------ */

const CART_KEY = 'mxq.cart.v1'

const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveCart = () => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart))
  } catch {
    /* ignore */
  }
  renderCartBadge()
}

/**
 * 结算/购物车前的自检：剔除不在上架目录里的失效行。
 * 商品被删除或下架后，购物车 localStorage 里的残留会让服务端整单报价报错
 * （「商品 #xxx 已下架」），导致结算页摘要空白、配送方式永远 Loading——
 * 一条失效商品卡死整个结算。这里按当前目录（state.products）过滤，返回剔除数。
 */
const pruneUnavailableCartItems = () => {
  if (!Array.isArray(state.cart) || !state.cart.length) return 0
  // 目录还没加载好时不动购物车，避免误删
  if (!Array.isArray(state.products) || !state.products.length) return 0
  // 首屏轻量包只有 300 件，绝不能拿它当完整目录清购物车（会把包外商品误判失效）
  if (!state.catalogFull) return 0
  const online = new Set(
    state.products.filter((p) => p && p.status === 'online').map((p) => String(p.id)),
  )
  const kept = state.cart.filter((item) => online.has(String(Number(item.productId))))
  const removed = state.cart.length - kept.length
  if (removed > 0) {
    state.cart = kept
    saveCart()
  }
  return removed
}

/* ------------------------------ 收藏 / 最近浏览 ------------------------------ */

const FAV_KEY = 'mxq.favs.v1'
const RECENT_KEY = 'mxq.recent.v1'
/** 最近浏览最多留这么多个，超出的从尾部丢弃 */
const RECENT_MAX = 12

const readIdList = (key, max) => {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : []
    const list = Array.isArray(parsed) ? parsed.map(Number).filter((id) => Number.isFinite(id) && id > 0) : []
    const unique = [...new Set(list)]
    return max ? unique.slice(0, max) : unique
  } catch {
    return []
  }
}

const writeIdList = (key, list) => {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

const isFav = (id) => state.favs.includes(Number(id))

/** 切换收藏；返回切换后的状态（true = 已收藏） */
function toggleFav(id) {
  const target = Number(id)
  if (!Number.isFinite(target) || target <= 0) return false
  const next = isFav(target) ? state.favs.filter((item) => item !== target) : [target, ...state.favs]
  state.favs = next
  writeIdList(FAV_KEY, next)
  renderFavBadge()
  return isFav(target)
}

function renderFavBadge() {
  const node = $('fav-count')
  if (!node) return
  node.textContent = String(state.favs.length)
  node.hidden = !state.favs.length
}

/** 记录一次浏览：已有的提到最前，超出上限截断 */
function rememberView(id) {
  const target = Number(id)
  if (!Number.isFinite(target) || target <= 0) return
  const next = [target, ...state.recent.filter((item) => item !== target)].slice(0, RECENT_MAX)
  state.recent = next
  writeIdList(RECENT_KEY, next)
}

const selectionSignature = (productId, selection, addons) =>
  `${productId}|${addons.map((line) => `${line.label}:${line.input || ''}`).join(',')}`

/* --------------------- 访客订单令牌（下单后查单凭据） --------------------- */

const GUEST_TOKEN_KEY = 'mxq.guest.v1'

function loadGuestTokens() {
  try {
    const raw = localStorage.getItem(GUEST_TOKEN_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveGuestToken(orderNo, token) {
  if (!orderNo || !token) return
  state.guestTokens[String(orderNo)] = String(token)
  try {
    localStorage.setItem(GUEST_TOKEN_KEY, JSON.stringify(state.guestTokens))
  } catch {
    /* 忽略隐私模式下的写入失败 */
  }
}

const guestTokenFor = (orderNo) => String(state.guestTokens[String(orderNo || '')] || '')

/* --------------------- 与本站服务端通信的小封装 --------------------- */

/**
 * API 域名解析（2026-10-10，Capacitor 原生 App 支持）
 *
 * 问题：App 内所有请求原本用相对路径 `/api/store/*`，在 Web 里指向前台域名没问题，
 * 但在 Capacitor 壳里 origin 是 `https://localhost`，`/api/store/*` 会 404 并被
 * WebView 回落到 index.html，于是 fetch 拿到 HTML，`response.json()` 抛
 * “Unexpected token '<'”，表现为「App 里功能全点不了、商品不显示」。
 *
 * 方案：非 http(s) 的 origin（Capacitor 壳的特征）→ 把 /api/store/* 指到线上域名；
 * 正常 Web 环境仍留空字符串走相对路径，零行为变化、不产生跨域。
 *
 * 覆盖方式（供测试或私有部署临时切换）：<meta name="mxq-api-base" content="https://…">
 */
const API_BASE = (() => {
  const origin = location.origin || ''
  // Capacitor / cordova 壳：origin 是 https://localhost 或 capacitor://localhost
  if (!/^https?:\/\//i.test(origin)) {
    const injected = document.querySelector('meta[name="mxq-api-base"]')?.content?.trim()
    return injected || 'https://mxqshop.to'
  }
  return ''
})()

/** 把 /api/store/xxx 拼成带域名的绝对地址（API_BASE 为空则原样返回，走相对路径） */
const apiUrl = (path) => `${API_BASE}${path}`

/**
 * 调本站 /api/store/*。服务端出错时统一返回 { error }，
 * 这里把错误文本原样抛出，调用方直接拿来提示，不必各自解析。
 */
async function apiJson(path, { method = 'GET', body } = {}) {
  const response = await fetch(apiUrl(`/api/store${path}`), {
    method,
    headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  let data = null
  try {
    data = await response.json()
  } catch {
    throw new Error(`${t('genericError')}（HTTP ${response.status}）`)
  }
  if (!response.ok || data?.error) {
    // 服务端错误文案是中文常量，统一在这里过一次本地化，下游直接用 error.message 即可
    throw new Error(apiMessage(data?.error) || `${t('genericError')}（HTTP ${response.status}）`)
  }
  return data
}

/** 把购物车转成服务端要的入参：只提交「买了什么、选了哪些项、几件」 */
const cartToApiItems = () =>
  state.cart.map((item) => ({
    productId: Number(item.productId),
    qty: Math.max(1, Number(item.qty) || 1),
    picks: item.picks || {},
    inputs: item.inputs || {},
  }))

/** 购物车小计（按当前展示价，仅用于列表上先给个数；真实金额以服务端报价为准） */
const cartSubtotal = () => state.cart.reduce((sum, item) => sum + item.total * item.qty, 0)
const cartCount = () => state.cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0)

/* ------------------------------ 视图 ------------------------------ */

function toast(message) {
  const node = $('toast')
  node.textContent = message
  node.hidden = false
  clearTimeout(toast.timer)
  toast.timer = setTimeout(() => {
    node.hidden = true
  }, 2200)
}

function renderHeader() {
  const levelOne = state.groups.filter((group) => !group.parent_id).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  const items = [
    { label: t('allProducts'), value: '', groupId: 0 },
    ...levelOne.map((group) => ({ label: tr(group.name, state.lang), value: '', groupId: Number(group.id) })),
  ]
  $('nav').innerHTML = items
    .map((item) => {
      const group = item.groupId ? state.groups.find((g) => Number(g.id) === item.groupId) : null
      const hasChildren = !!group && state.groups.some((x) => Number(x.parent_id) === Number(group.id))
      const btn = `<button type="button" data-category="${esc(item.value)}" data-navgroup="${item.groupId}" class="${state.category === item.value && state.groupParentId === item.groupId ? 'active' : ''}">${
        group && group.cover_image ? `<img class="chip-icon" src="${esc(imageUrl(group.cover_image, 64))}" alt="" decoding="async" />` : ''
      }${esc(item.label)}</button>`
      // Fanatics 式悬停大菜单：面板本体挂在 body 级 #mega-root（见 setupMegaMenu），
      // 导航条 overflow 滚动容器会裁剪 absolute 面板，所以这里只放触发器。
      return hasChildren ? `<div class="nav-item" data-navroot="${item.groupId}">${btn}</div>` : btn
    })
    .join('')

  $('app').dataset.hasGroups = String(levelOne.length > 0)
  syncNavFade()
  renderLocaleLabel()
  // 账号按钮文案 = 登录态（账号名）或「登录 / 注册」+ 当前语言，必须每次重绘都对一遍。
  // 它不能挂 data-i18n：静态文案刷新会把已登录的账号名覆盖回「登录 / 注册」。
  renderAccountButton()
}

/** 导航横向滚动时，两侧渐隐提示是否显示（还有更多分类可滚） */
function syncNavFade() {
  const wrap = $('nav-wrap')
  const nav = $('nav')
  if (!wrap || !nav) return
  const max = nav.scrollWidth - nav.clientWidth
  wrap.classList.toggle('can-left', nav.scrollLeft > 2)
  wrap.classList.toggle('can-right', max > 2 && nav.scrollLeft < max - 2)
}

/* --------------------- Shop Your Teams 组件（Fanatics 式） ---------------------
 * 位置：分类导航条正下方（与 Fanatics 首页一致）。
 * 左侧「Shop Your Teams」+ 最近浏览的 3 支球队（localStorage 记录，无历史时用默认热门队），
 * 右侧联赛圆形图标横向跑马灯（自动匀速滑动，悬停暂停；点击下钻到该联赛二级列表）。
 * 注意：render() 每次交互都会跑，这里必须做签名比对，避免重建 DOM 打断 CSS 动画。
 */
const TW_TEAMS_KEY = 'mxq_last_teams_v1'
let TW_CACHE = { leagueSig: '', teamsSig: '', seedSig: '' }

const TW_I18N = {
  title: { en: 'Shop Your Teams', 'zh-CN': '选购你的主队' },
  seeAll: { en: 'See All', 'zh-CN': '查看全部' },
}

/** 组件自带双语（tr() 只接受字符串查机翻缓存，这里直接按语言挑词） */
function twText(map) {
  return state.lang === 'zh-CN' ? map['zh-CN'] : map.en
}

/** 记录最近浏览的球队（叶子分组且有图标）；挂在分类点击的叶子分支上 */
function rememberTeamVisit(groupId) {
  try {
    const g = state.groups.find((item) => Number(item.id) === Number(groupId))
    if (!g || !g.cover_image) return
    const entry = { id: Number(g.id), name: g.name, cover: g.cover_image }
    const list = JSON.parse(localStorage.getItem(TW_TEAMS_KEY) || '[]').filter((item) => Number(item.id) !== entry.id)
    list.unshift(entry)
    localStorage.setItem(TW_TEAMS_KEY, JSON.stringify(list.slice(0, 10)))
  } catch {
    /* localStorage 不可用（隐私模式等）时静默跳过 */
  }
}

function twLastTeams() {
  let list = []
  try {
    list = JSON.parse(localStorage.getItem(TW_TEAMS_KEY) || '[]')
  } catch {
    list = []
  }
  if (!Array.isArray(list) || !list.length) {
    // 默认种子：优先知名热门队；不足时从足球/NFL 子树深处递归收叶子队，
    // 且优先挂了商品的（空筛选体验差），还没有就取有图标的前几支。
    // 结果缓存进 TW_CACHE（render 每次交互都会跑，避免重复递归全量分组）。
    if (TW_CACHE.seed) return TW_CACHE.seed
    const prefer = ['Real Madrid', 'England', 'Dallas Cowboys']
      .map((name) => state.groups.find((g) => (g.name || '').toLowerCase() === name.toLowerCase()))
      .filter(Boolean)
    const leaves = []
    const walk = (parentId, depth) => {
      if (depth > 4 || leaves.length > 200) return
      for (const g of state.groups) {
        if (Number(g.parent_id) !== Number(parentId)) continue
        if (state.groups.some((x) => Number(x.parent_id) === Number(g.id))) walk(g.id, depth + 1)
        else if (g.cover_image) leaves.push(g)
      }
    }
    walk(1300, 0)
    walk(1303, 0)
    const hasProd = (id) => state.products.some((p) => Number(p.group_id) === Number(id))
    const pool = [...prefer, ...leaves]
    const picked = []
    const seen = new Set()
    // 三轮挑选：知名队 → 有商品的 → 任意有图标的
    for (const wantProd of [null, true, false]) {
      for (const g of pool) {
        if (picked.length >= 3) break
        if (seen.has(g.name)) continue
        if (wantProd !== null && hasProd(g.id) !== wantProd) continue
        seen.add(g.name)
        picked.push(g)
      }
      if (picked.length >= 3) break
    }
    list = picked.map((g) => ({ id: Number(g.id), name: g.name, cover: g.cover_image }))
    TW_CACHE.seed = list
  }
  return list.filter((item) => state.groups.some((g) => Number(g.id) === Number(item.id))).slice(0, 3)
}

function twLeagues() {
  // Fanatics 顺序（Soccer→Soccer Jersey），MLB 前 College 后与站内一级排序对齐即可；
  // 只渲染实际存在的一级分类（Olympics/Golf 已删，MLS 没有 → 自动跳过）。
  const order = ['NFL', 'College', 'MLB', 'NBA', 'NHL', 'Soccer Jersey', 'WWE', 'WNBA', 'UFC', 'NASCAR', 'F1', 'Football Shoes', 'Collectibles']
  const levelOne = state.groups.filter((g) => !g.parent_id)
  const out = []
  for (const name of order) {
    const g = levelOne.find((item) => (item.name || '').toLowerCase() === name.toLowerCase())
    if (g && g.cover_image) out.push(g)
  }
  // 兜底：漏网的一级分类也排进去，保证「分类全覆盖」
  for (const g of levelOne) {
    if (g.cover_image && !out.some((x) => Number(x.id) === Number(g.id))) out.push(g)
  }
  return out
}

function renderTeamWidget() {
  const box = $('team-widget')
  if (!box || !state.loaded || !state.groups.length) return
  const leagues = twLeagues()
  if (!leagues.length) return
  box.hidden = false

  $('tw-title').textContent = twText(TW_I18N.title)
  $('tw-seeall').textContent = twText(TW_I18N.seeAll)

  // 联赛跑马灯：内容重复两份实现无缝循环；签名不变就不重建（保住 CSS 动画进度）
  const leagueSig = leagues.map((g) => `${g.id}:${g.cover_image}`).join('|')
  if (leagueSig !== TW_CACHE.leagueSig) {
    const item = (g) =>
      `<button type="button" class="tw-league" data-haschildren="1" data-group="${g.id}" data-parent="0" aria-label="${esc(tr(g.name, state.lang))}">` +
      `<span class="tw-league-icon"><img src="${esc(imageUrl(g.cover_image, 64))}" alt="" loading="lazy" decoding="async" /></span>` +
      `<span class="tw-league-name">${esc(tr(g.name, state.lang))}</span></button>`
    const half = leagues.map(item).join('')
    $('tw-track').innerHTML = half + half
    TW_CACHE.leagueSig = leagueSig
  }

  // 最近浏览球队：签名比对，只有真变了才重绘
  const teams = twLastTeams()
  const teamsSig = teams.map((item) => `${item.id}:${item.cover}`).join('|')
  if (teamsSig !== TW_CACHE.teamsSig) {
    $('tw-teams').innerHTML = teams
      .map(
        (item) =>
          `<button type="button" class="tw-team" data-haschildren="0" data-group="${item.id}" data-parent="0" aria-label="${esc(item.name)}">` +
          `<span class="tw-team-logo"><img src="${esc(imageUrl(item.cover, 64))}" alt="" loading="lazy" decoding="async" /></span>` +
          `<span class="tw-team-name">${esc(item.name)}</span></button>`,
      )
      .join('')
    TW_CACHE.teamsSig = teamsSig
  }
}

/* --------------------- 一级分类悬停大菜单（Fanatics 式） ---------------------
 * 悬停「足球球衣」等一级分类：全宽面板下钻展示 二级子类 → 三级系列 → 四级细分。
 * 左栏是二级列表（带封面小图标），右侧以多列展示选中二级下的三级系列，
 * 每个三级标题下列出最多 8 支四级球队（按热门度排序）+「全部 XX 支」入口。
 * 点击任意条目复用分类卡的下钻/筛选逻辑（data-parent / data-haschildren）。
 */
const MEGA = {
  open: 0, // 当前展开的一级分组 id，0 = 关闭
  sel: new Map(), // 一级 id → 面板里选中的二级 id
  closeTimer: 0,
  suppress: false, // 点击导航/面板跳转后，指针仍悬在原处会立刻触发 mouseover 重开——抑制到鼠标真正移开
}
/* Soccer Jersey 二级面板布局变体（用户已选定 V3：左侧竖栏速链 + 右侧联赛卡片）。
   URL ?sjp=v1..v4 仍可临时切换预览其它方案；仅在悬停 Soccer Jersey 时挂 mega-sj / sj-vN 类，
   其它一级分类面板不受影响。 */
const SJ_PANEL_VARIANT = (() => {
  const v = new URLSearchParams(location.search).get('sjp')
  return /^v[1-4]$/.test(v || '') ? v : 'v3'
})()

/** 同父下同名分组的防御性去重：只保留「信息最全」的一个
 * （有封面 > 有介绍 > 商品多 > id 小），避免运营误建重复类目后导航出现两份同名。
 * 跨维度的同名（如 Nation 的 Argentina 与世界杯/复古版）分属不同父级，不在此列。 */
const groupRichness = (g) =>
  (g.cover_image ? 8 : 0) + (g.intro_title || g.intro_logo || (Array.isArray(g.intro_bullets) && g.intro_bullets.length) ? 4 : 0) +
  (Number(g.product_count) || 0) / 1000 - Number(g.id) / 100000

const childGroupsOf = (parentId) => {
  const kids = state.groups
    .filter((g) => Number(g.parent_id) === Number(parentId))
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0) || Number(a.id) - Number(b.id))
  const seenName = new Map()
  const out = []
  kids.forEach((g) => {
    const key = String(g.name || '').trim().toLowerCase()
    const prev = seenName.get(key)
    if (prev === undefined) {
      seenName.set(key, g)
      out.push(g)
    } else if (groupRichness(g) > groupRichness(prev)) {
      out.splice(out.indexOf(prev), 1, g)
      seenName.set(key, g)
    }
  })
  return out
}

/* --------------------- Fanatics 式分类路径 URL ---------------------
 * 全分类点击跳转采用 Fanatics 同款路径格式：
 *   一级联赛 /nfl · 球队 /nfl/nfc-east/dallas-cowboys（按分组树逐级 slug 化）。
 * 点击分类/球队 → pushState 路径 URL → 路由反解 slug 链还原下钻状态，
 * 分类页可直达、可分享、可前进后退，面包屑与 URL 一一对应。 */
const slugifyName = (name) =>
  String(name || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'g'

const groupById = (id) => state.groups.find((g) => Number(g.id) === Number(id))

/** 从一级分组到 g 的父链（含 g 自身，顺序：一级 → … → g） */
function groupChain(g) {
  const out = []
  let node = g
  while (node) {
    out.unshift(node)
    node = Number(node.parent_id) ? groupById(node.parent_id) : null
  }
  return out
}

/* ---------------- M1 多市场站点结构（P1，2026-10-08） ----------------
   按市场用子目录区分（/us/、/uk/、/de/…），每个市场是独立的可索引 URL：
   - 路由层：市场前缀不进业务逻辑，currentRoute() 先剥前缀再解析；
   - 链接层：navigate() 统一补前缀，内部调用点无需改动；
   - SEO 层：canonical 指向当前市场 URL，hreflang 列出全部市场等价页
     （修复此前 11 条 hreflang 全部指向同一 URL 的无效声明）。
   注意：一级分类是 nfl/nba/soccer-jersey 等，与市场码无冲突。 */
const MARKETS = [
  { code: 'us', flag: '🇺🇸', label: 'United States', lang: 'en', currency: 'USD', hreflang: 'en-US', ogLocale: 'en_US' },
  { code: 'uk', flag: '🇬🇧', label: 'United Kingdom', lang: 'en', currency: 'GBP', hreflang: 'en-GB', ogLocale: 'en_GB' },
  { code: 'de', flag: '🇩🇪', label: 'Deutschland', lang: 'de', currency: 'EUR', hreflang: 'de-DE', ogLocale: 'de_DE' },
  { code: 'fr', flag: '🇫🇷', label: 'France', lang: 'fr', currency: 'EUR', hreflang: 'fr-FR', ogLocale: 'fr_FR' },
  { code: 'jp', flag: '🇯🇵', label: '日本', lang: 'ja', currency: 'JPY', hreflang: 'ja-JP', ogLocale: 'ja_JP' },
  { code: 'au', flag: '🇦🇺', label: 'Australia', lang: 'en', currency: 'AUD', hreflang: 'en-AU', ogLocale: 'en_AU' },
]
const MARKET_CODES = MARKETS.map((m) => m.code)
const DEFAULT_MARKET = 'us'
const MARKET_BY_CODE = new Map(MARKETS.map((m) => [m.code, m]))
const MARKET_KEY = 'mxq.market.v1'

const marketFromPath = (path) => {
  const hit = String(path || '').match(/^\/(us|uk|de|fr|jp|au)(?=\/|$)/)
  return hit ? hit[1] : ''
}
/** 去掉市场前缀，得到业务路径（/us/uk/p/12 → /p/12；用 while 防多层前缀残留） */
const stripMarket = (path) => {
  let clean = String(path || '/')
  let prev
  do {
    prev = clean
    clean = clean.replace(/^\/(us|uk|de|fr|jp|au)(?=\/|$)/, '')
  } while (clean !== prev)
  return clean || '/'
}
/** 给业务路径补上市场前缀（默认市场不加，保持根 URL 干净） */
const withMarket = (path, code) => {
  const clean = stripMarket(path)
  const target = code || DEFAULT_MARKET
  return target === DEFAULT_MARKET ? clean : `/${target}${clean === '/' ? '' : clean}`
}
/** 当前生效市场：URL 前缀优先，其次用户上次选择，最后默认市场 */
let MARKET_CODE = (() => {
  const fromUrl = marketFromPath(location.pathname)
  if (fromUrl) return fromUrl
  try {
    const saved = localStorage.getItem(MARKET_KEY)
    if (saved && MARKET_BY_CODE.has(saved)) return saved
  } catch {}
  return DEFAULT_MARKET
})()
const market = () => MARKET_BY_CODE.get(MARKET_CODE) || MARKET_BY_CODE.get(DEFAULT_MARKET)

/** 首屏：URL 无市场前缀但用户有偏好时，补上前缀并改写地址（不触发整页刷新） */
function applyMarketPreference() {
  if (marketFromPath(location.pathname)) return
  if (MARKET_CODE === DEFAULT_MARKET) return
  history.replaceState({}, '', withMarket(location.pathname + location.search, MARKET_CODE))
}

/** SEO：canonical + hreflang + og:locale 跟随当前市场实时更新 */
function updateSeoLinks() {
  const path = stripMarket(location.pathname)
  const origin = location.origin
  const head = document.head
  const upsert = (sel, create) => {
    let el = head.querySelector(sel)
    if (!el) {
      el = create()
      head.appendChild(el)
    }
    return el
  }
  const canonical = upsert('link[rel="canonical"]', () => {
    const el = document.createElement('link')
    el.rel = 'canonical'
    return el
  })
  canonical.href = `${origin}${withMarket(path, MARKET_CODE)}`

  // 清掉全部既有 alternate（模板静态那批 + 上一轮动态那批），只留本轮生成的 7 条。
  // 只按 data-mxq-market 清会留下模板里的 7 条 → hreflang 重复声明，搜索会判冲突。
  head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  const mk = (attrs) => {
    const el = document.createElement('link')
    el.rel = 'alternate'
    el.setAttribute('data-mxq-market', '1')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    head.appendChild(el)
  }
  MARKETS.forEach((m) => mk({ hreflang: m.hreflang, href: `${origin}${withMarket(path, m.code)}` }))
  mk({ hreflang: 'x-default', href: `${origin}${path === '/' ? '/' : path}` })

  const current = market()
  const setMeta = (selector, attr, value) => {
    let el = head.querySelector(selector)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, selector.replace(/[\[\]"]/g, '').split('=')[1])
      head.appendChild(el)
    }
    el.setAttribute('content', value)
  }
  setMeta('meta[property="og:locale"]', 'property', current.ogLocale)
  setMeta('meta[name="mxq-market"]', 'name', current.code)
}

/* ============================================================
 * SEO 增强：结构化数据(JSON-LD) + 社交分享卡片 + 动态 title/description
 * 对应功能项 #6/#32 结构化数据、#33 OG/Twitter 卡片、#34 title/description
 *
 * 设计要点：
 *  - SPA 是「切路由不换 head」，所以每���路由必须显式重写 meta 与 JSON-LD，
 *    否则爬虫/社交爬虫抓到的永远是首屏那一份。
 *  - JSON-LD 用 data-mxq-jsonld 标记，切页时整块移除再重建，避免叠加多份。
 *  - 面包屑由当前分组链推导，与页面上的面包屑 UI 同源（groupChain）。
 * ============================================================ */

const SEO_ORG = {
  '@type': 'Organization',
  name: 'MXQ Football Store',
  url: 'https://mxqshop.to/',
  logo: { '@type': 'ImageObject', url: 'https://mxqshop.to/img/logo-mxq.png' },
  sameAs: ['https://www.facebook.com/mxqstore', 'https://www.instagram.com/mxqstore']
}

/** 统一 upsert meta（property/name 双写法），沿用 updateSeoLinks 的风格 */
function seoSetMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** 清理上一轮路由留下的 JSON-LD */
function seoClearJsonLd() {
  document.head.querySelectorAll('script[data-mxq-jsonld]').forEach((el) => el.remove())
}

/** 注入一段 JSON-LD（标记 data-mxq-jsonld 以便下轮清理） */
function seoJsonLd(obj) {
  try {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.setAttribute('data-mxq-jsonld', '1')
    s.textContent = JSON.stringify(obj)
    document.head.appendChild(s)
  } catch (e) {
    /* 循环引用等极端情况不阻断渲染 */
  }
}

/** 社交分享卡片：og:title/description/image/url/type + twitter:card */
function seoSocial({ title, description, image, url, type }) {
  seoSetMeta('property', 'og:site_name', 'MXQ Football Store')
  seoSetMeta('property', 'og:title', title)
  seoSetMeta('property', 'og:description', description)
  seoSetMeta('property', 'og:url', url)
  seoSetMeta('property', 'og:type', type || 'website')
  if (image) seoSetMeta('property', 'og:image', image)
  seoSetMeta('name', 'twitter:card', 'summary_large_image')
  seoSetMeta('name', 'twitter:title', title)
  seoSetMeta('name', 'twitter:description', description)
  if (image) seoSetMeta('name', 'twitter:image', image)
}

/** 同步 title + name=description + 社交卡片，三处保持一致 */
function seoMeta({ title, description, image, url, type }) {
  if (title) document.title = title
  seoSetMeta('name', 'description', description)
  seoSocial({ title, description, image, url, type })
}

/** 当前路由对应的分组对象（无分组时返回 null）；详情页可显式传商品按 group_id 反查 */
function seoCurrentGroup(product) {
  const id = (product && product.group_id) || state.groupId || state.groupParentId
  if (!id || !state.groups || !state.groups.length) return null
  return state.groups.find((g) => Number(g.id) === Number(id)) || null
}

/** 由分组链生成 BreadcrumbList（#6/#32） */
function seoBreadcrumb(group, product) {
  const g = group || seoCurrentGroup(product)
  if (!g) return null
  const chain = groupChain(g)
  const items = [{ name: 'Home', url: withMarket('/') }]
  let acc = ''
  chain.forEach((node) => {
    acc += '/' + slugifyName(node.name)
    items.push({ name: node.name, url: `${location.origin}${withMarket(acc)}` })
  })
  // 末级加上当前商品页（商品分类下钻时语义更完整）
  if (product) items.push({ name: product.title || 'Product', url: `${location.origin}${withMarket('/p/' + product.id)}` })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${location.origin}${it.url}`
    }))
  }
}

/** 商品页 JSON-LD：Product + Offer（#6/#32） */
function seoProductLd(product) {
  if (!product) return
  const url = `${location.origin}${withMarket('/p/' + product.id)}`
  const img = product.main_image ? `${location.origin}${imageUrl(product.main_image, 800)}` : undefined
  const price = Number(product.price_usd != null ? product.price_usd : product.price)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    sku: product.sku_code || product.product_code || String(product.id),
    url,
    ...(img ? { image: [img] } : {}),
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    offers: {
      '@type': 'Offer',
      url,
      price: Number.isFinite(price) ? price : undefined,
      priceCurrency: 'USD',
      availability: (Number(product.stock) > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      ...(Number(product.rating) > 0 ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(product.rating),
          ...(product.review_count ? { reviewCount: Number(product.review_count) } : {})
        }
      } : {})
    }
  }
  seoJsonLd(ld)
  const bc = seoBreadcrumb(null, product)
  if (bc) seoJsonLd(bc)
  seoJsonLd({ '@context': 'https://schema.org', ...SEO_ORG })
}

/**
 * 路由级 SEO 入口：把 title/description/OG/JSON-LD 一次性对齐。
 * 在 updateSeoLinks() 之后调用。
 * @param {string} hook  'home' | 'product' | 'other'
 * @param {object} product 商品详情对象（详情页从 renderDetail 的形参传进来）
 */
function seoForRoute(hook, product) {
  seoClearJsonLd()
  const url = `${location.origin}${location.pathname}`
  if (hook === 'product' && product) {
    const p = product
    seoMeta({
      title: `${p.title} — MXQ Football Store`,
      description: (p.description || p.title || '').toString().slice(0, 300),
      image: p.main_image ? `${location.origin}${imageUrl(p.main_image, 800)}` : undefined,
      url: `${location.origin}${withMarket('/p/' + p.id)}`,
      type: 'product'
    })
    // seoProductLd 内部已注入 Product + BreadcrumbList + Organization，此处不再重复
    seoProductLd(p)
    return
  }
  if (hook === 'home') {
    seoMeta({
      title: isZh(state.lang) ? 'MXQ · 足球装备官方球衣与配件' : 'MXQ · Football Store Official Jerseys & Gear',
      description: isZh(state.lang)
        ? '球衣、球鞋、背包、护目镜，支持尺码选择与姓名号码定制，实时计价。'
        : 'Football jerseys, boots, bags, eyewear. Sizes, PATCH badges and name/number customization, priced into the total in real time.',
      image: `${location.origin}/img/logo-mxq.png`,
      url,
      type: 'website'
    })
    seoJsonLd({
      '@context': 'https://schema.org',
      ...SEO_ORG,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${location.origin}${withMarket('/search')}?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    })
    return
  }
  const bcOther = seoBreadcrumb(null, product)
  if (bcOther) seoJsonLd(bcOther)
  seoJsonLd({ '@context': 'https://schema.org', ...SEO_ORG })
}

const buildGroupUrl = (g) => withMarket('/' + groupChain(g).map((x) => slugifyName(x.name)).join('/'))

/** 把 URL slug 链反解为分组链（一级 → … → 目标）；任何一级对不上返回 null */
function resolveGroupSlugs(slugs) {
  if (!state.groups.length || !Array.isArray(slugs) || !slugs.length) return null
  let nodes = state.groups.filter((g) => !g.parent_id)
  let chain = null
  for (const slug of slugs) {
    const hit = nodes.find((g) => slugifyName(g.name) === slug)
    if (!hit) return null
    ;(chain = chain || []).push(hit)
    nodes = state.groups.filter((g) => Number(g.parent_id) === Number(hit.id))
  }
  return chain
}

/** 由分组 id 安全取 URL（分组不在树里时回退首页） */
const navigateToGroup = (id) => {
  const g = groupById(id)
  navigate(g ? buildGroupUrl(g) : '/')
}

/** 分类图标三级回退：① 自己的封面图 ② 分类下第一件商品图 ③ 借最近子孙的商品图。
 *  结果按 state.groups 引用做缓存，目录刷新后自动重建。 */
let ICON_CACHE = { stamp: null, cover: null, prod: null, borrow: null }
function iconMaps() {
  const stamp = state.groups
  if (ICON_CACHE.stamp === stamp) return ICON_CACHE
  const cover = new Map()
  const prod = new Map()
  for (const g of state.groups) if (g.cover_image) cover.set(Number(g.id), g.cover_image)
  for (const p of state.products) {
    const gid = Number(p.group_id)
    if (!gid || prod.has(gid)) continue
    const src = p.main_image || parseList(p.images)[0]
    if (src) prod.set(gid, src)
  }
  ICON_CACHE = { stamp, cover, prod, borrow: new Map() }
  return ICON_CACHE
}
function groupIconSrc(g) {
  const id = Number(g.id)
  const c = iconMaps()
  if (c.cover.has(id)) return imageUrl(c.cover.get(id), 96)
  if (c.prod.has(id)) return imageUrl(c.prod.get(id), 96)
  if (c.borrow.has(id)) return c.borrow.get(id)
  c.borrow.set(id, '') // 防环占位
  let url = ''
  for (const kid of childGroupsOf(id)) {
    url = groupIconSrc(kid)
    if (url) break
  }
  c.borrow.set(id, url)
  return url
}
/** 渲染分类小图标：有图用图，无图用首字母徽章 */
function megaIcon(g, cls) {
  const src = groupIconSrc(g)
  const letter = esc(String(tr(g.name, state.lang) || '').trim().charAt(0).toUpperCase() || '·')
  if (src) return `<img class="${cls}" src="${esc(src)}" alt="" data-mega-letter="${letter}" loading="lazy" decoding="async" />`
  return `<span class="${cls} mega-badge">${letter}</span>`
}

// 图标加载失败（如封面字节尚未回填、接口 404）时降级为首字母徽章，避免出现裂图。
// error 事件不冒泡，这里用捕获阶段在 document 上统一接住。
document.addEventListener(
  'error',
  (event) => {
    const img = event.target
    if (!(img instanceof HTMLImageElement) || !/\bmega-/.test(img.className) || !img.dataset.megaLetter) return
    const span = document.createElement('span')
    span.className = `${img.className} mega-badge`
    span.textContent = img.dataset.megaLetter
    img.replaceWith(span)
  },
  true,
)

/** 四级球队排序：TEAM_POPULARITY 榜上的靠前，其余按名称（表项是 {name, re} 对象） */
const TEAM_RANK = (() => {
  try {
    const list = typeof TEAM_POPULARITY !== 'undefined' ? TEAM_POPULARITY : []
    return (name) => {
      const s = String(name || '')
      const i = list.findIndex((entry) => entry && entry.re instanceof RegExp && entry.re.test(s))
      return i === -1 ? list.length : i
    }
  } catch {
    return () => 9999
  }
})()

const sortTeams = (nodes) =>
  [...nodes].sort((a, b) => TEAM_RANK(a.name) - TEAM_RANK(b.name) || String(a.name).localeCompare(String(b.name)))

/** 面板右栏：选中二级下的三级系列 + 四级球队链接，CSS 多列排布 */
function megaBody(rootId) {
  const l2Id = MEGA.sel.get(rootId) || childGroupsOf(rootId)[0]?.id
  const l2 = l2Id ? state.groups.find((g) => Number(g.id) === Number(l2Id)) : null
  if (!l2) return `<div class="mega-empty">${t('noProducts')}</div>`
  const l3s = childGroupsOf(l2.id)
  const blocks = l3s.map((l3) => {
    const l4s = sortTeams(childGroupsOf(l3.id))
    const title = `<button type="button" class="mega-col-title" data-group="${l3.id}" data-parent="${l2.id}" data-haschildren="${l4s.length ? '1' : '0'}">${megaIcon(l3, 'mega-title-icon')}<span class="mega-name">${esc(tr(l3.name, state.lang))}</span></button>`
    if (!l4s.length) return `<div class="mega-col">${title}</div>`
    const links = l4s
      .slice(0, 8)
      .map((l4) => `<button type="button" class="mega-link" data-group="${l4.id}" data-parent="${l3.id}" data-haschildren="0">${megaIcon(l4, 'mega-link-icon')}<span class="mega-name">${esc(tr(l4.name, state.lang))}</span></button>`)
      .join('')
    const more = l4s.length > 8 ? `<button type="button" class="mega-link mega-more" data-group="${l3.id}" data-parent="${l2.id}" data-haschildren="1">${t('viewAll')} ${l4s.length} →</button>` : ''
    return `<div class="mega-col">${title}${links}${more}</div>`
  })
  if (!blocks.length) return `<div class="mega-empty"></div>`
  return `<div class="mega-columns">${blocks.join('')}</div>`
}

/** 面板整体：左栏二级列表 + 右栏三级/四级；联赛根组按 Fanatics 三区布局（球队网格 + Top Players 侧栏 + 历史球队灰条） */
function buildMegaPanel(root) {
  const l2s = childGroupsOf(root.id)
  const isZone = (g) => g.description === 'player' || g.description === 'brand' || g.description === 'historic'
  const players = l2s.filter((g) => g.description === 'player')
  const brands = l2s.filter((g) => g.description === 'brand')
  const historic = l2s.filter((g) => g.description === 'historic')
  // 联赛式根组：有分区标记 + 球队（带盾徽项）足够多，才启用三区布局；否则维持纯平铺网格
  const zoned = players.length > 0 && l2s.filter((g) => g.cover_image).length >= 4
  const l2Btn = (l2, extra = '') => {
    const l3Count = childGroupsOf(l2.id).length
    return `<button type="button" class="mega-l2 ${extra}" data-mega-l2="${l2.id}" data-parent="${l2.id}" data-group="0">
      ${megaIcon(l2, 'mega-l2-icon')}
      <span class="mega-l2-name">${esc(tr(l2.name, state.lang))}</span>
      <i class="mega-l2-count">${l3Count || ''}</i>
    </button>`
  }
  // 球员/品牌/历史球队：无下级，点击直接跳该分组目录（data-group 全局委托处理导航并收起面板）
  const jumpBtn = (g, cls) =>
    `<button type="button" class="mega-l2 ${cls}" data-group="${g.id}" data-parent="${root.id}" data-haschildren="0">
      ${megaIcon(g, 'mega-l2-icon')}
      <span class="mega-l2-name">${esc(tr(g.name, state.lang))}</span>
    </button>`
  const selId = MEGA.sel.get(root.id) || l2s[0]?.id
  let railHtml
  if (zoned) {
    const teams = l2s.filter((g) => !isZone(g))
    const sideTitle = (txt) => `<div class="mega-side-title">${esc(txt)}</div>`
    railHtml = `<div class="mega-rail mega-rail-zoned">
      <div class="mega-main">${teams.map((g) => l2Btn(g, Number(g.id) === Number(selId) ? 'active' : '')).join('')}</div>
      <aside class="mega-side">
        ${players.length ? sideTitle(`Top ${root.name} Players`) : ''}
        ${players.map((g) => jumpBtn(g, '')).join('')}
        ${brands.length ? sideTitle(`${root.name} Shop`) : ''}
        ${brands.map((g) => jumpBtn(g, '')).join('')}
        ${megaPartnership(root)}
      </aside>
    </div>
    ${historic.length ? `<div class="mega-historic">${historic.map((g) => jumpBtn(g, 'mega-historic-item')).join('')}</div>` : ''}`
  } else {
    railHtml = `<div class="mega-rail">${l2s.map((g) => l2Btn(g, Number(g.id) === Number(selId) ? 'active' : '')).join('')}</div>`
  }
  return `<div class="mega-inner">
    ${railHtml}
    <div class="mega-body" data-mega-body="${root.id}">${megaBody(root.id)}</div>
  </div>`
}

/** 联赛官方品牌标（Fanatics 面板底部的 partnership logo）：联赛标 + MXQ SHOP 新版横标两图等高排布；联赛图缺失时整块自动隐藏 */
function megaPartnership(root) {
  const slug = String(root.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `<div class="mega-partnership"><img class="mp-league" src="/assets/l1-brand/${slug}.png?v=20261007g" alt="" loading="lazy" onerror="this.parentElement.remove()"><img class="mp-mxq" src="/assets/l1-brand/mxq-shop.png?v=20261007g" alt="MXQ SHOP" loading="lazy" onerror="this.remove()"></div>`
}

function openMega(rootId, anchorEl) {
  const root = $('mega-root')
  if (!root) return
  window.clearTimeout(MEGA.closeTimer)
  const rootData = state.groups.find((g) => Number(g.id) === Number(rootId))
  const isSJ = /^soccer jersey$/i.test(String(rootData?.name || ''))
  if (MEGA.open !== Number(rootId)) {
    MEGA.open = Number(rootId)
    root.innerHTML = buildMegaPanel(rootData)
  }
  // Soccer Jersey 专属布局变体；其它一级分类保持原样
  root.classList.toggle('mega-sj', isSJ)
  root.classList.remove('sj-v1', 'sj-v2', 'sj-v3', 'sj-v4')
  if (isSJ && SJ_PANEL_VARIANT) root.classList.add(`sj-${SJ_PANEL_VARIANT}`)
  const rect = anchorEl.getBoundingClientRect()
  const width = Math.min(isSJ && SJ_PANEL_VARIANT ? 1220 : 960, window.innerWidth - 24)
  root.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`
  root.style.top = `${rect.bottom + 2}px`
  root.style.width = `${width}px`
  root.classList.add('open')
}

function closeMega() {
  MEGA.open = 0
  const root = $('mega-root')
  if (root) root.classList.remove('open')
}

function setupMegaMenu() {
  const root = $('mega-root')
  if (!root) return
  document.addEventListener('mouseover', (event) => {
    if (MEGA.suppress) {
      // 鼠标移出导航触发器与面板后才解除抑制
      if (!event.target.closest('.nav-item[data-navroot], #mega-root')) MEGA.suppress = false
      return
    }
    const item = event.target.closest('.nav-item[data-navroot]')
    if (item) {
      openMega(Number(item.dataset.navroot), item)
      return
    }
    if (MEGA.open && !event.target.closest('#mega-root')) {
      // 离开触发器与面板才延迟关闭；面板内部移动（含换栏）不会闪关
      window.clearTimeout(MEGA.closeTimer)
      MEGA.closeTimer = window.setTimeout(closeMega, 160)
    }
  })
  // 点击面板条目或导航按钮跳转后：立刻收起面板，并抑制指针原位悬停造成的重开
  document.addEventListener(
    'click',
    (event) => {
      if (event.target.closest('.nav-item[data-navroot], #mega-root')) {
        closeMega()
        MEGA.suppress = true
        window.clearTimeout(MEGA.closeTimer)
      }
    },
    true,
  )
  // 面板里悬停二级 → 只重绘右栏，不打断整个面板
  root.addEventListener('mouseover', (event) => {
    const l2Btn = event.target.closest('[data-mega-l2]')
    if (!l2Btn || !MEGA.open) return
    const l2Id = Number(l2Btn.dataset.megaL2)
    if (MEGA.sel.get(MEGA.open) === l2Id) return
    MEGA.sel.set(MEGA.open, l2Id)
    root.querySelectorAll('.mega-l2').forEach((b) => b.classList.toggle('active', Number(b.dataset.megaL2) === l2Id))
    const body = root.querySelector('.mega-body')
    if (body) body.innerHTML = megaBody(MEGA.open)
  })
  window.addEventListener('scroll', closeMega, { passive: true })
  window.addEventListener('resize', closeMega)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMega()
  })
}

/** 顶栏语言/币种按钮的文字（如 EN · R$） */
/** 头部 Ship to / 语言 / 币种按钮（AliExpress 风格：国旗 + EN/ 两行 + 币种） */
function renderLocaleLabel() {
  const flag = $('locale-btn-flag')
  if (flag) {
    const code = (state.shipCountry || 'US').toLowerCase()
    flag.src = `/img/flags-country/${code}.png`
    flag.onerror = () => { flag.style.visibility = 'hidden' }
    flag.onload = () => { flag.style.visibility = 'visible' }
  }
  const langEl = $('locale-btn-lang')
  if (langEl) langEl.textContent = `${(state.lang || 'en').split('-')[0].toUpperCase()}/`
  const curEl = document.querySelector('#locale-btn .locale-btn-cur')
  if (curEl) {
    const chev = curEl.querySelector('svg')
    curEl.textContent = state.currency || 'USD'
    if (chev) curEl.appendChild(chev)
  }
}

/* --------------------- Ship to / Language / Currency 面板 --------------------- */
/** 面板草稿（Save 前的临时选择）：country/state/city/lang/currency */
let LPOP = { open: false, expanded: '', queries: {} }

/** 美国城市数据（按需加载，结构 { AL: ['Abbeville', ...], ... }） */
let US_CITIES = null
async function ensureUsCities() {
  if (US_CITIES) return US_CITIES
  US_CITIES = await fetch('/data/us-cities.json').then((response) => response.json())
  return US_CITIES
}

const countryName = (code) =>
  window.MXQ_GEO?.countries?.find((item) => item.c === code)?.n || code

/**
 * 国家名 / 国家码 → ISO-2 码。
 * 结算页的国家选择框、订单地址、运费分区全部以 ISO-2 为准；
 * 老数据里可能存的是国家名（如注册表单过去提交的 "Germany"），这里一并兼容，
 * 避免预填时匹配不上选项、退化成列表第一项（Afghanistan）。
 */
function countryCodeFrom(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return ''
  if (/^[A-Za-z]{2}$/.test(raw)) return raw.toUpperCase()
  const hit = window.MXQ_GEO?.countries?.find((item) => String(item.n).toLowerCase() === raw.toLowerCase())
  return hit ? hit.c : ''
}

const flagImg = (code) =>
  `<img class="locale-opt-flag" src="/img/flags-country/${esc(String(code || '').toLowerCase())}.png" alt="" width="21" height="15" loading="lazy" />`

/** 通用列表渲染：搜索框 + 首字母分组（国家/州/城市/币种共用） */
function renderLocaleList(kind, items, { flag = false, searchable = true } = {}) {
  const box = $(`lp-list-${kind}`)
  if (!box) return
  const query = (LPOP.queries[kind] || '').trim().toLowerCase()
  const filtered = query ? items.filter((item) => item.v.toLowerCase().includes(query)) : items
  // 首字母分组
  const groups = []
  for (const item of filtered) {
    const letter = (item.v[0] || '#').toUpperCase()
    let bucket = groups[groups.length - 1]
    if (!bucket || bucket.letter !== letter) {
      bucket = { letter, items: [] }
      groups.push(bucket)
    }
    bucket.items.push(item)
  }
  const listHtml = groups.length
    ? groups
        .map(
          (group) => `
      <div class="locale-group">
        <div class="locale-group-letter">${esc(group.letter)}</div>
        ${group.items
          .map(
            (item) => `
        <button type="button" class="locale-list-item" data-lopt="${esc(kind)}" data-lopt-v="${esc(item.k)}">
          ${flag ? flagImg(item.k) : ''}<span>${esc(item.v)}</span>
        </button>`,
          )
          .join('')}
      </div>`,
        )
        .join('')
    : `<div class="locale-empty">${t('emptyFilter')}</div>`
  box.innerHTML = `
    ${searchable ? `<div class="locale-search"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.8-3.8" /></svg><input type="search" data-lsearch="${esc(kind)}" placeholder="${t('searchShort')}" value="${esc(LPOP.queries[kind] || '')}" autocomplete="off" /></div>` : ''}
    <div class="locale-list-scroll">${listHtml}</div>`
  box.hidden = false
  const input = box.querySelector('[data-lsearch]')
  if (input) input.focus({ preventScroll: true })
}

/** 各下拉的候选数据源（基于当前草稿） */
function localeOptions(kind) {
  const geo = window.MXQ_GEO || { countries: [], states: {}, usStates: {} }
  const draft = state.localeDraft || {}
  if (kind === 'country') return geo.countries.map((item) => ({ k: item.c, v: item.n }))
  if (kind === 'state') {
    const list = geo.states[draft.shipCountry] || []
    return list.map((name) => ({ k: name, v: name }))
  }
  if (kind === 'city') {
    if (draft.shipCountry !== 'US' || !US_CITIES) return []
    const usStates = geo.usStates || {}
    const abbr = Object.keys(usStates).find((key) => usStates[key] === draft.shipState)
    const cities = (abbr && US_CITIES[abbr]) || []
    return cities.map((name) => ({ k: name, v: name }))
  }
  if (kind === 'lang') return LANGUAGES.map((l) => ({ k: l.code, v: l.name }))
  if (kind === 'cur') {
    const rates = state.fx?.rates || {}
    const all = [...new Set([...Object.keys(rates), ...Object.keys(CURRENCY_NAMES), 'USD'])].sort()
    return all.map((code) => ({ k: code, v: `${code} ( ${CURRENCY_NAMES[code] || code} )` }))
  }
  return []
}

/** M1：市场列表（单选，切换后立即跳转该市场子目录并落地对应币种） */
function renderMarketList() {
  const box = $('lp-list-market')
  if (!box) return
  box.innerHTML = MARKETS.map(
    (m) => `
      <button type="button" class="locale-list-item market-item${m.code === MARKET_CODE ? ' active' : ''}"
              role="radio" aria-checked="${m.code === MARKET_CODE}" data-market="${m.code}">
        <span class="market-flag" aria-hidden="true">${m.flag}</span>
        <span class="locale-item-text">${esc(m.label)}</span>
        <span class="market-cur">${m.currency}</span>
      </button>`,
  ).join('')
}

/** M1：切换市场 → 记住偏好 + 同步该市场默认币种 + 同路径整页跳转（让爬虫看到新 URL） */
function switchMarket(code) {
  if (!MARKET_BY_CODE.has(code) || code === MARKET_CODE) return
  MARKET_CODE = code
  try {
    localStorage.setItem(MARKET_KEY, code)
  } catch {}
  const m = MARKET_BY_CODE.get(code)
  // 市场自带默认币种；用户手动选过币种时不覆盖，仅在币种仍等于上一个市场默认时跟随
  if (m.currency && (!state.currency || state.currency === 'USD')) {
    state.currency = m.currency
    try {
      localStorage.setItem('mxq.currency', m.currency)
    } catch {}
  }
  location.href = withMarket(location.pathname + location.search, code)
}

/** 渲染 5 个下拉按钮的当前显示值 */
function renderLocaleSelectors() {
  const draft = state.localeDraft || {}
  renderMarketList()
  const setSel = (id, html) => {
    const el = $(id)
    if (el) el.innerHTML = html
  }
  const country = draft.shipCountry || 'US'
  setSel('lp-sel-country', `${flagImg(country)}<span class="locale-sel-text">${esc(countryName(country))}</span><svg class="locale-sel-chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`)
  const states = window.MXQ_GEO?.states?.[country] || []
  $('lp-sel-state').hidden = !states.length
  $('lp-list-state').hidden = true
  if (states.length) {
    setSel('lp-sel-state', `<span class="locale-sel-text">${esc(draft.shipState || t('stateLabel'))}</span><svg class="locale-sel-chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`)
  }
  // 城市数据目前仅美国提供（Census 全量行政区划，按需加载）
  const showCity = states.length && draft.shipState && country === 'US'
  $('lp-sel-city').hidden = !showCity
  $('lp-list-city').hidden = true
  if (showCity) {
    setSel('lp-sel-city', `<span class="locale-sel-text">${esc(draft.shipCity || t('cityLabel'))}</span><svg class="locale-sel-chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`)
  }
  const langName = LANGUAGES.find((l) => l.code === draft.lang)?.name || draft.lang
  setSel('lp-sel-lang', `<span class="locale-sel-text">${esc(langName)}</span><svg class="locale-sel-chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`)
  setSel('lp-sel-cur', `<span class="locale-sel-text">${esc(`${draft.currency} ( ${CURRENCY_NAMES[draft.currency] || draft.currency} )`)}</span><svg class="locale-sel-chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`)
  $('lp-title-ship').textContent = t('shipTo')
  $('lp-title-lang').textContent = t('localeLang')
  $('lp-title-cur').textContent = t('localeCurrency')
  const marketTitle = $('lp-title-market')
  if (marketTitle) marketTitle.textContent = t('marketTitle')
  $('locale-save').textContent = t('saveAction')
}

/** M1：点击市场项 → 切换市场（整页跳转，保住 SEO 可索引性） */
document.addEventListener('click', (event) => {
  const item = event.target.closest('[data-market]')
  if (!item) return
  event.preventDefault()
  switchMarket(item.dataset.market)
})

/** 收起全部展开的列表 */
function collapseLocaleLists() {
  LPOP.expanded = ''
  ;['country', 'state', 'city', 'lang', 'cur'].forEach((kind) => {
    const el = $(`lp-list-${kind}`)
    if (el) el.hidden = true
  })
}

/** 切换某个下拉的展开列表 */
async function toggleLocaleList(kind) {
  if (LPOP.expanded === kind) {
    collapseLocaleLists()
    return
  }
  collapseLocaleLists()
  LPOP.queries[kind] = ''
  LPOP.expanded = kind
  const draft = state.localeDraft || {}
  if (kind === 'city' && draft.shipCountry === 'US' && !US_CITIES) {
    renderLocaleList('city', [], { searchable: true })
    const input = document.querySelector('[data-lsearch="city"]')
    if (input) input.placeholder = t('loadingDots')
    try {
      await ensureUsCities()
    } catch {
      $(`lp-list-city`).innerHTML = `<div class="locale-empty">${t('localeDataFailed')}</div>`
      return
    }
    if (LPOP.expanded !== 'city') return // 期间被收起
  }
  const items = localeOptions(kind)
  const flag = kind === 'country'
  renderLocaleList(kind, items, { flag, searchable: kind !== 'lang' })
}

/** 应用面板选择（Save） */
function applyLocalePanel() {
  const draft = state.localeDraft || {}
  state.shipCountry = draft.shipCountry || 'US'
  state.shipState = draft.shipState || ''
  state.shipCity = draft.shipCity || ''
  state.lang = draft.lang || state.lang
  state.currency = draft.currency || state.currency
  localStorage.setItem('mxq.shipCountry', state.shipCountry)
  localStorage.setItem('mxq.shipState', state.shipState)
  localStorage.setItem('mxq.shipCity', state.shipCity)
  localStorage.setItem('mxq.lang', state.lang)
  localStorage.setItem('mxq.currency', state.currency)
  closeLocalePanel()
  applyStaticI18n()
  render() // 语言/币种变化 → 全站重渲染
  fillRegisterFromLocale()
  translateI18nStrings(state.lang) // 后台机翻补齐界面文案 + 商品标题
  translateVisibleProducts() // 视口内商品标题按需机翻
}

function openLocalePanel() {
  if (!window.MXQ_GEO?.countries?.length) {
    toast(t('localeDataFailed'))
    return
  }
  // 草稿 = 当前生效值
  state.localeDraft = {
    shipCountry: state.shipCountry || 'US',
    shipState: state.shipState || '',
    shipCity: state.shipCity || '',
    lang: state.lang,
    currency: state.currency,
    _langTouched: false,
    _curTouched: false,
  }
  // 脏数据自愈：州不在该国的州表里 / 国家没数据则清空
  const states = window.MXQ_GEO.states[state.localeDraft.shipCountry] || []
  if (!states.length) state.localeDraft.shipState = ''
  if (state.localeDraft.shipState && !states.includes(state.localeDraft.shipState)) state.localeDraft.shipState = ''
  if (!states.includes(state.localeDraft.shipState || '')) state.localeDraft.shipCity = ''
  LPOP = { open: true, expanded: '', queries: {} }
  renderLocaleSelectors()
  collapseLocaleLists()
  $('locale-pop').hidden = false
}

function closeLocalePanel() {
  $('locale-pop').hidden = true
  LPOP.open = false
  collapseLocaleLists()
}

function renderFooter() {
  initFooterAppBadges()
  // 社交图标复用详情页 social-link 的品牌色/图标样式；没绑定的平台自动缺席
  const slot = document.getElementById('footer-socials')
  if (!slot) return
  const socials = state.socials || []
  slot.innerHTML = socials
    .map((item) => {
      const label = `${item.name}${item.handle ? ` · ${item.handle}` : ''}`
      return `
        <a class="social-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"
           title="${esc(label)}" aria-label="${esc(label)}"
           data-platform="${esc(item.platform)}"
           style="--brand:${esc(item.color)};--brand-fg:${esc(item.fg || '#ffffff')};--icon:url('${esc(item.icon)}?v=20261009k')">
          <span class="social-glyph" aria-hidden="true"></span>
        </a>`
    })
    .join('')
}

function productCard(product) {
  // 卡片实际只有约 290px 宽，取 w_400 小图即可（原图 606KB → 40KB）
  const images = productImages(product, 400)
  const sale = salePriceOf(product)
  const list = listPriceOf(product)
  const off = discountPercent(list, sale)
  const options = normalizeOptions(product.options)
  // 定制信息行（SIZE ×5 / BADGE ×2 / CUSTOMIZE +$2 等）已按要求全站隐藏：
  // 影响商品首图的视觉美感，且这些信息在详情页仍完整可见。
  const badges = [
    off > 0 ? `<span class="badge">-${off}%</span>` : '',
    product.status === 'online' ? '' : `<span class="badge dark">${esc(statusText(product.status))}</span>`,
    // Personnalisable（badge sky）已按要求全站隐藏：影响商品首图美观，详情页定制功能不受影响
  ].join('')

  // M4 图片优化：srcset/sizes 让浏览器按实际渲染宽度选档（1x/2x），
  // 配合 .card-media 的 aspect-ratio 预留空间，图片到位不产生 CLS（LCP 友好）。
  const srcsetAttr = buildSrcSet(product, images[0])
  return `
  <a class="card" href="/p/${product.id}">
    <div class="card-media">
      <img src="${esc(images[0])}"${srcsetAttr} sizes="(max-width:520px) 48vw, (max-width:900px) 30vw, 18vw" alt="${esc(localizedTitle(product))}" loading="lazy" decoding="async" />
      <div class="badge-row">${badges}</div>
      ${favButton(product.id)}
      ${compareButton(product.id)}
    </div>
    <div class="card-body">
      <div class="card-cat">${esc(categoryLabel(product.category))}${product.brand ? ` · ${esc(product.brand)}` : ''}</div>
      <div class="card-title">${esc(localizedTitle(product))}</div>
      ${product.title_local ? `<div class="card-sub">${esc(tr(product.title_local, state.lang))}</div>` : ''}
      <div class="price-row">
        <span class="price-now">${money(sale)}</span>
        ${list > sale ? `<span class="price-was">${money(list)}</span>` : ''}
        ${off > 0 ? `<span class="price-off">-${off}%</span>` : ''}
      </div>
    </div>
  </a>`
}

/** 卡片右上角的收藏心形按钮。它是 <a class="card"> 里的 button，点击时由全局
 *  事件委托 preventDefault 掉，避免顺带跳进详情页。 */
function favButton(id) {
  const active = isFav(id)
  const label = active ? t('favRemove') : t('favAdd')
  return `
    <button type="button" class="fav-btn${active ? ' active' : ''}" data-fav="${esc(id)}"
            aria-pressed="${active ? 'true' : 'false'}" aria-label="${esc(label)}" title="${esc(label)}">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9"
           stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 20.4s-7.4-4.6-7.4-9.7A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.4 3.3c0 5.1-7.4 9.7-7.4 9.7z" />
      </svg>
    </button>`
}

function statusText(status) {
  const map = {
    online: 'statusOnline',
    auditing: 'statusAuditing',
    rejected: 'statusRejected',
    offline: 'statusOffline',
    draft: 'statusDraft',
  }
  return map[status] ? t(map[status]) : String(status || '')
}

/* --------------------- 商品网格分页（经典页码式） ---------------------
 * 全站商品列表统一为「一行 5 个 × 每页 6 行 = 30 件」，底部页码翻页。
 * 筛选条件（分类下钻 / 关键词 / 排序 / 价格）一变就回到第 1 页，
 * 否则用户会莫名继承上一个筛选的页码深度。
 */
const GRID_PAGE_SIZE = 30
let gridFilterKey = ''
let gridPage = 1

function gridFilterSignature() {
  return [
    state.groupParentId || 0,
    state.groupId || 0,
    state.category || '',
    state.keyword.trim().toLowerCase(),
    state.onlyOnline ? 1 : 0,
    state.sort,
    `sale${state.saleMin}`,
    state.priceMin,
    state.priceMax,
  ].join('|')
}

/** 切出「本页该显示的」那一段；筛选变化时顺带回到第 1 页 */
function visibleSlice(list) {
  const key = gridFilterSignature()
  if (key !== gridFilterKey) {
    gridFilterKey = key
    gridPage = 1
    // 换分类/改关键词后列表内容全变了，继续停在原来的滚动深度没有意义
    pendingScrollTop = true
  }
  const totalPages = Math.max(1, Math.ceil(list.length / GRID_PAGE_SIZE))
  if (gridPage > totalPages) gridPage = totalPages
  if (gridPage < 1) gridPage = 1
  const start = (gridPage - 1) * GRID_PAGE_SIZE
  return {
    shown: list.slice(start, start + GRID_PAGE_SIZE),
    page: gridPage,
    totalPages,
    total: list.length,
  }
}

/** 页码条：‹ 1 … p-1 p p+1 … N ›，附「显示 x / 共 y 件」 */
function renderPager(page, totalPages, total, shownCount) {
  const note = `<span class="grid-pager-note">${t('gridShown', shownCount, total)}</span>`
  if (totalPages <= 1) return `<div class="grid-pager grid-pager-single">${note}</div>`
  // 页码窗口：当前页 ±2，另加首页/末页锚点；靠近首尾时再向内侧补足几页，
  // 否则停在第 1 页只会出现「1 2 … 283 284」——连第 3 页都点不到。
  const wanted = new Set([1, totalPages])
  for (let n = page - 2; n <= page + 2; n += 1) {
    if (n >= 1 && n <= totalPages) wanted.add(n)
  }
  if (page <= 4) {
    for (let n = 1; n <= Math.min(4, totalPages); n += 1) wanted.add(n)
  }
  if (page >= totalPages - 3) {
    for (let n = Math.max(1, totalPages - 3); n <= totalPages; n += 1) wanted.add(n)
  }
  const pages = [...wanted].sort((a, b) => a - b)
  const items = []
  let prev = 0
  for (const n of pages) {
    if (n - prev > 1) items.push('<span class="pager-gap" aria-hidden="true">…</span>')
    items.push(
      `<button type="button" class="pager-btn${n === page ? ' active' : ''}" data-page="${n}" ${n === page ? 'aria-current="page"' : ''}>${n}</button>`,
    )
    prev = n
  }
  return `
  <div class="grid-pager">
    <button type="button" class="pager-btn pager-nav" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''} aria-label="Previous page">‹</button>
    ${items.join('')}
    <button type="button" class="pager-btn pager-nav" data-page="${page + 1}" ${page >= totalPages ? 'disabled' : ''} aria-label="Next page">›</button>
    ${note}
  </div>`
}

/** 分页网格 HTML（首页与实时搜索共用同一套口径） */
function renderGrid(list) {
  if (!list.length) return `<div class="empty-note">${t('emptyFilter')}</div>`
  const { shown, page, totalPages, total } = visibleSlice(list)
  return `<div class="grid">${shown.map(productCard).join('')}</div>${renderPager(page, totalPages, total, shown.length)}`
}

/** 翻页：重绘后滚回网格顶部，让第 1 行卡片进入视野 */
function gotoGridPage(p) {
  const total = filteredProducts().length
  const totalPages = Math.max(1, Math.ceil(total / GRID_PAGE_SIZE))
  gridPage = Math.min(Math.max(1, Number(p) || 1), totalPages)
  render()
  const wrap = document.getElementById('grid-wrap')
  if (wrap) {
    const top = wrap.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/**
 * Trending Collections 横滑轮播：1:1 复刻 fanatics 分类页 LEAGUE_PAGE_HM_SLIVER_2 模块。
 * 触发条件：当前浏览位置位于**任何一级分类**的下钻页（不限五大联盟）。
 * 卡片 = 该一级分类下的站内商品，每次进入分类随机抽取一批（5 分钟内保持不变，
 * 排序/翻页等重渲染不打乱卡片）；点击卡片直接跳商品详情页。
 */
function currentTcRoot() {
  if (!state.groups || !state.groups.length) return null
  // 一级上下文：正在下钻某个一级分组
  let g = state.groups.find((x) => Number(x.id) === Number(state.groupParentId))
  if (!g && state.groupId) {
    // 二级/三级上下文：沿父链向上找到 level=1 的一级分组
    let node = state.groups.find((x) => Number(x.id) === Number(state.groupId))
    while (node && Number(node.level) !== 1 && node.parent_id) {
      node = state.groups.find((x) => Number(x.id) === Number(node.parent_id)) || null
    }
    g = node
  }
  return g && Number(g.level) === 1 ? g : null
}

/** 把 root 一级分组下的全部后代分组 id 收集齐（含 root 自身） */
function tcDescendantGroupIds(rootId) {
  const byParent = new Map()
  for (const g of state.groups) {
    const pid = Number(g.parent_id || 0)
    if (!byParent.has(pid)) byParent.set(pid, [])
    byParent.get(pid).push(Number(g.id))
  }
  const ids = new Set([Number(rootId)])
  const queue = [Number(rootId)]
  while (queue.length) {
    const cur = queue.pop()
    for (const child of byParent.get(cur) || []) {
      if (!ids.has(child)) {
        ids.add(child)
        queue.push(child)
      }
    }
  }
  return ids
}

/** 随机抽取该一级分类下的商品卡片（5 分钟缓存：重渲染不换卡） */
function pickTrendingProducts(rootId, want = 12) {
  const groupIds = tcDescendantGroupIds(rootId)
  const pool = state.products.filter(
    (p) => groupIds.has(Number(p.group_id)) && p.status !== 'offline' && (p.main_image || (p.images || [])[0]),
  )
  if (!pool.length) return []
  const now = Date.now()
  const cached = state.tcPick && state.tcPick[rootId]
  if (cached && now - cached.at < 5 * 60 * 1000 && cached.ids.length) {
    const cards = cached.ids.map((id) => state.products.find((p) => Number(p.id) === Number(id))).filter(Boolean)
    if (cards.length) return cards
  }
  const shuffled = pool.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const cards = shuffled.slice(0, Math.min(want, shuffled.length))
  if (!state.tcPick) state.tcPick = {}
  state.tcPick[rootId] = { at: now, ids: cards.map((p) => Number(p.id)) }
  return cards
}

function renderTrendingCollections() {
  const root = currentTcRoot()
  if (!root) return ''
  const cards = pickTrendingProducts(Number(root.id))
  if (!cards.length) return ''
  const cardHtml = cards
    .map(
      (p) => `
      <button type="button" class="tc-card" data-tc-pid="${Number(p.id)}" title="${esc(p.title || '')}">
        <img class="tc-img" src="${esc(productImages(p, 480)[0] || p.main_image || '')}" alt="${esc(p.title || '')}" loading="lazy" decoding="async" />
        <span class="tc-card-title">${esc(p.title || '')}</span>
        <span class="tc-card-sub">${esc(money(salePriceOf(p)))}</span>
      </button>`,
    )
    .join('')
  return `
  <section class="tc-carousel" data-tc-league="${esc(root.name)}" aria-label="Trending Collections">
    <div class="tc-head"><span class="tc-title">Trending Collections</span></div>
    <div class="tc-row-wrap">
      <div class="tc-row" data-tc-row>${cardHtml}</div>
      <button type="button" class="tc-arrow tc-arrow-left" data-tc-scroll="-1" aria-label="Scroll left">
        <svg viewBox="0 0 32 32" width="28" height="28"><path fill="currentColor" d="M22.267 16a1.03 1.03 0 0 0-.334-.76l-9.124-8.94a1.05 1.05 0 0 0-.76-.3C11.45 6 11 6.45 11 7.048q0 .449.3.749L19.686 16l-8.388 8.203a1.04 1.04 0 0 0-.298.749c0 .591.459 1.048 1.047 1.048q.45 0 .76-.311l9.125-8.929a1.05 1.05 0 0 0 .334-.76"/></svg>
      </button>
      <button type="button" class="tc-arrow tc-arrow-right" data-tc-scroll="1" aria-label="Scroll right">
        <svg viewBox="0 0 32 32" width="28" height="28"><path fill="currentColor" d="M9.733 16c0 .288.115.553.334.76l9.124 8.94c.208.196.461.3.76.3A1.03 1.03 0 0 0 21 24.952c0-.288-.115-.553-.3-.75L12.314 16l8.388-8.203c.184-.196.299-.45.299-.749C21 6.45 20.54 6 19.952 6q-.45 0-.76.311l-9.125 8.929a1.05 1.05 0 0 0-.334.76"/></svg>
      </button>
    </div>
  </section>`
}

/**
 * Trending Collections 自动轮播：
 * - 每 3 秒向右滑一张卡，滑到最右回到开头，无缝循环
 * - 鼠标悬停/手指触摸时暂停（方便点击卡片），移开后恢复
 * - 页面切到后台（document.hidden）时暂停，省电省流量
 * - render() 重绘后重新挂载；组件被移除时定时器自动清理
 */
let tcAutoTimer = null

function stopTcAutoplay() {
  if (tcAutoTimer) {
    clearInterval(tcAutoTimer)
    tcAutoTimer = null
  }
}

function mountTcAutoplay() {
  stopTcAutoplay()
  const section = document.querySelector('.tc-carousel')
  const row = section?.querySelector('[data-tc-row]')
  if (!section || !row) return
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let paused = false
  section.addEventListener('mouseenter', () => { paused = true })
  section.addEventListener('mouseleave', () => { paused = false })
  section.addEventListener('touchstart', () => { paused = true }, { passive: true })
  section.addEventListener('touchend', () => { paused = false })

  tcAutoTimer = setInterval(() => {
    // 组件已被重绘移除：自动清理定时器
    if (!document.contains(row)) {
      stopTcAutoplay()
      return
    }
    if (paused || document.hidden) return
    const firstCard = row.querySelector('.tc-card')
    if (!firstCard) return
    const step = firstCard.offsetWidth + parseFloat(getComputedStyle(row).gap || '14')
    const maxScroll = row.scrollWidth - row.clientWidth
    if (maxScroll <= 4) return
    if (row.scrollLeft >= maxScroll - 4) row.scrollTo({ left: 0, behavior: 'smooth' })
    else row.scrollBy({ left: step, behavior: 'smooth' })
  }, 3000)
}

/**
 * 队店导航行（fanatics 球队店头样式）：队徽 + 队名，白字压在球队官方品牌色底上。
 * 用户要求：去掉 Jerseys 分类按钮，商品列表保留不动。
 */

/**
 * 每队导航行底色：1:1 采用 fanatics 各队官方品牌色（参考 fanatics.com 各队店头）。
 * key 为分组名小写；球星/赛事/商品类分组（非球队队徽）走深色兜底调色板。
 */
const TEAM_NAV_BG = {
  // ===== NFL（32 队）=====
  'arizona cardinals': '#9B2743',
  'atlanta falcons': '#A71930',
  'baltimore ravens': '#241773',
  'buffalo bills': '#00338D',
  'carolina panthers': '#0085CA',
  'chicago bears': '#0B162A',
  'cincinnati bengals': '#000000',
  'cleveland browns': '#311D00',
  'dallas cowboys': '#041E42',
  'denver broncos': '#FB4F14',
  'detroit lions': '#0076B6',
  'green bay packers': '#203731',
  'houston texans': '#03202F',
  'indianapolis colts': '#002C5F',
  'jacksonville jaguars': '#006778',
  'kansas city chiefs': '#E31837',
  'las vegas raiders': '#000000',
  'los angeles chargers': '#0080C6',
  'los angeles rams': '#003594',
  'miami dolphins': '#008E97',
  'minnesota vikings': '#4F2683',
  'new england patriots': '#002244',
  'new orleans saints': '#000000',
  'new york giants': '#0B2265',
  'new york jets': '#125740',
  'philadelphia eagles': '#004C54',
  'pittsburgh steelers': '#101820',
  'san francisco 49ers': '#AA0000',
  'seattle seahawks': '#002244',
  'tampa bay buccaneers': '#D50A0A',
  'tennessee titans': '#0C2340',
  'washington commanders': '#5A1414',
  // ===== MLB（30 队）=====
  'arizona diamondbacks': '#A71930',
  athletics: '#003831',
  'atlanta braves': '#13274F',
  'baltimore orioles': '#DF4601',
  'boston red sox': '#BD3039',
  'chicago cubs': '#0E3386',
  'chicago white sox': '#27251F',
  'cincinnati reds': '#C6011F',
  'cleveland guardians': '#00385D',
  'colorado rockies': '#33006F',
  'detroit tigers': '#0C2340',
  'houston astros': '#002D62',
  'kansas city royals': '#004687',
  'los angeles angels': '#BA0021',
  'los angeles dodgers': '#005A9C',
  'miami marlins': '#00A3E0',
  'milwaukee brewers': '#12284B',
  'minnesota twins': '#002B5C',
  'new york mets': '#002D72',
  'new york yankees': '#132448',
  'philadelphia phillies': '#E81828',
  'pittsburgh pirates': '#000000',
  'san diego padres': '#2F241D',
  'san francisco giants': '#000000',
  'seattle mariners': '#0C2C56',
  'st. louis cardinals': '#C41E3A',
  'tampa bay rays': '#00285E',
  'texas rangers': '#003278',
  'toronto blue jays': '#134A8E',
  'washington nationals': '#AB0003',
  // ===== NBA（30 队）=====
  'atlanta hawks': '#E03A3E',
  'boston celtics': '#007A33',
  'brooklyn nets': '#000000',
  'charlotte hornets': '#1D1160',
  'chicago bulls': '#CE1141',
  'cleveland cavaliers': '#860038',
  'dallas mavericks': '#00538C',
  'denver nuggets': '#0E2240',
  'detroit pistons': '#C8102E',
  'golden state warriors': '#1D428A',
  'houston rockets': '#CE1141',
  'indiana pacers': '#002D62',
  'la clippers': '#C8102E',
  'los angeles lakers': '#552583',
  'memphis grizzlies': '#12173F',
  'miami heat': '#98002E',
  'milwaukee bucks': '#00471B',
  'minnesota timberwolves': '#0C2340',
  'new orleans pelicans': '#0C2340',
  'new york knicks': '#006BB6',
  'oklahoma city thunder': '#007AC1',
  'orlando magic': '#0077C0',
  'philadelphia 76ers': '#006BB6',
  'phoenix suns': '#1D1160',
  'portland trail blazers': '#E03A3E',
  'sacramento kings': '#5A2D81',
  'san antonio spurs': '#000000',
  'toronto raptors': '#CE1141',
  'utah jazz': '#002B5C',
  'washington wizards': '#002B5C',
  // ===== NHL（32+ 队）=====
  'anaheim ducks': '#F47A38',
  'boston bruins': '#000000',
  'buffalo sabres': '#003087',
  'calgary flames': '#D2001C',
  'carolina hurricanes': '#CC0000',
  'chicago blackhawks': '#CF0A2C',
  'colorado avalanche': '#6F263D',
  'columbus blue jackets': '#002654',
  'dallas stars': '#006847',
  'detroit red wings': '#CE1126',
  'edmonton oilers': '#041E42',
  'florida panthers': '#041E42',
  'los angeles kings': '#111111',
  'minnesota wild': '#154734',
  'montreal canadiens': '#AF1E2D',
  'nashville predators': '#041E22',
  'new jersey devils': '#E03A3E',
  'new york islanders': '#00539B',
  'new york rangers': '#0038A8',
  'ottawa senators': '#DA1A32',
  'philadelphia flyers': '#F74902',
  'pittsburgh penguins': '#000000',
  'san jose sharks': '#006D75',
  'seattle kraken': '#001628',
  'st. louis blues': '#002F87',
  'tampa bay lightning': '#002868',
  'toronto maple leafs': '#00205B',
  'utah mammoth': '#001C30',
  'vancouver canucks': '#00205B',
  'vegas golden knights': '#333F42',
  'washington capitals': '#C8102E',
  'winnipeg jets': '#041E42',
  'arizona coyotes': '#8C2633',
  // ===== College（80 队）=====
  'air force falcons': '#003087',
  'alabama crimson tide': '#9E1B32',
  'arizona state sun devils': '#8C1D40',
  'arizona wildcats': '#AB0520',
  'arkansas razorbacks': '#9D2235',
  'army black knights': '#000000',
  'auburn tigers': '#03244D',
  'baylor bears': '#003015',
  'boise state broncos': '#0033A0',
  'byu cougars': '#002E5D',
  'cal bears': '#003262',
  'cincinnati bearcats': '#E00122',
  'clemson tigers': '#F56600',
  'colorado buffaloes': '#000000',
  "delaware fightin' blue hens": '#00539F',
  'duke blue devils': '#00539B',
  'ecu pirates': '#592C82',
  'florida gators': '#0021A5',
  'florida state seminoles': '#782F40',
  'georgetown hoyas': '#041E42',
  'georgia bulldogs': '#BA0C2F',
  'georgia tech yellow jackets': '#003057',
  'harvard crimson': '#A51C30',
  'hawaii rainbow warriors': '#024731',
  'illinois fighting illini': '#13294B',
  'indiana hoosiers': '#990000',
  'iowa hawkeyes': '#000000',
  'iowa state cyclones': '#C8102E',
  'kansas jayhawks': '#0051BA',
  'kansas state wildcats': '#512888',
  'kentucky wildcats': '#0033A0',
  'louisville cardinals': '#AD0000',
  'lsu tigers': '#461D7C',
  'maryland terrapins': '#E03A3E',
  'miami hurricanes': '#F47321',
  'michigan state spartans': '#18453B',
  'michigan wolverines': '#00274C',
  'minnesota golden gophers': '#7A0019',
  'mississippi state bulldogs': '#660000',
  'missouri tigers': '#000000',
  'navy midshipmen': '#00205B',
  'nc state wolfpack': '#CC0000',
  'nebraska huskers': '#E11B22',
  'north carolina tar heels': '#7BAFD4',
  'notre dame fighting irish': '#0C2340',
  'ohio state buckeyes': '#BB0000',
  'oklahoma sooners': '#841617',
  'oklahoma state cowboys': '#FF6200',
  'ole miss rebels': '#9D2235',
  'oregon ducks': '#154733',
  'oregon state beavers': '#DC4405',
  'penn state nittany lions': '#041E42',
  'pitt panthers': '#003594',
  'providence friars': '#000000',
  'purdue boilermakers': '#000000',
  'rutgers scarlet knights': '#CC0033',
  'smu mustangs': '#003A70',
  'south carolina gamecocks': '#73000A',
  'south florida bulls': '#006747',
  'stanford cardinal': '#8C1515',
  'syracuse orange': '#F76900',
  'tcu horned frogs': '#4D1979',
  'tennessee volunteers': '#FF8200',
  'texas a&m aggies': '#500000',
  'texas longhorns': '#BF5700',
  'texas tech red raiders': '#CC0000',
  'ucf knights': '#000000',
  'ucla bruins': '#2774AE',
  'uconn huskies': '#000E2F',
  'usc trojans': '#990000',
  'utah utes': '#CC0000',
  'vanderbilt commodores': '#000000',
  'villanova wildcats': '#00205B',
  'virginia cavaliers': '#232D4B',
  'virginia tech hokies': '#63003B',
  'washington huskies': '#4B2E83',
  'washington state cougars': '#981E32',
  'west virginia mountaineers': '#002855',
  'wisconsin badgers': '#C5050C',
  'wyoming cowboys': '#492F24',
}
const TEAM_NAV_BG_FALLBACK = ['#041E42', '#241773', '#0B2265', '#154734', '#9D2235', '#132448', '#00205B', '#461D7C']

function teamNavBg(group) {
  const key = String(group.name || '').trim().toLowerCase()
  if (TEAM_NAV_BG[key]) return TEAM_NAV_BG[key]
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return TEAM_NAV_BG_FALLBACK[h % TEAM_NAV_BG_FALLBACK.length]
}

/** 计算十六进制底色的相对亮度（WCAG 公式），<0.45 视为深色底 */
function hexLuminance(hex) {
  const n = String(hex || '').replace('#', '')
  const h = n.length === 3 ? n.split('').map((c) => c + c).join('') : n
  const lin = (i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * lin(0) + 0.7152 * lin(2) + 0.0722 * lin(4)
}

function renderTeamNav(group) {
  const bg = teamNavBg(group)
  const dark = hexLuminance(bg) < 0.45 // 深底队：队徽与 MXQ 图标加白色描边
  const logo = group.cover_image ? `<img class="tnav-logo${dark ? ' on-dark' : ''}" src="${esc(imageUrl(group.cover_image, 240))}" alt="" loading="lazy" />` : ''
  return `
  <div class="team-nav" style="background:${bg}">
    ${logo}<span class="tnav-team"><span class="tnav-name">${esc(tr(group.name, state.lang))}</span><span class="tnav-brand"><img class="tnav-brand-logo${dark ? ' on-dark' : ''}" src="/img/logo-mxq-combo.png?v=20261007c" alt="MXQ SHOP" /></span></span>
  </div>`
}

/**
 * M3 关键词搜索页（/search?q=…）：结果网格复用 filteredProducts（多词 AND + 同义词），
 * 零结果时给出拼写纠错建议（Levenshtein ≤2）。无结果页保留「以图搜款」入口兜底。
 */
/* ============================================================
 * #7 搜索历史 / 热搜
 * localStorage 持久化（沿用项目既有 mxq_ 前缀），最多留 10 条，
 * 重复搜索把旧记录顶上，最近使用的排最前。
 * ============================================================ */
const SEARCH_HISTORY_KEY = 'mxq_search_history'
const SEARCH_HISTORY_MAX = 10

function loadSearchHistory() {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY)
    const arr = JSON.parse(raw || '[]')
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string' && x.trim()).slice(0, SEARCH_HISTORY_MAX) : []
  } catch {
    return []
  }
}

function saveSearchHistory(term) {
  const q = String(term || '').trim()
  if (!q || q.length > 80) return
  const next = [q, ...loadSearchHistory().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, SEARCH_HISTORY_MAX)
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next))
  } catch { /* 隐私模式/超配额时静默降级 */ }
}

function clearSearchHistory() {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  } catch {}
}

/** 热搜：优先取用户搜索过的词，其次用站内词库（searchVocab）补足 */
function hotSearchTerms(limit = 8) {
  const seen = new Set()
  const out = []
  for (const w of [...loadSearchHistory(), ...searchVocab()]) {
    const s = String(w || '').trim()
    if (!s) continue
    const k = s.toLowerCase()
    if (seen.has(k)) continue
    seen.add(k)
    out.push(s)
    if (out.length >= limit) break
  }
  return out
}

function renderSearchHistoryBlock() {
  const history = loadSearchHistory()
  const hot = hotSearchTerms(8)
  const chips = (arr, cls) =>
    arr.map((w) => `<a class="${cls}" href="/search?q=${encodeURIComponent(w)}">${esc(w)}</a>`).join('')
  const sections = []
  if (history.length) {
    sections.push(`
      <div class="search-hist-block">
        <div class="search-hist-head">
          <span>${t(isZh(state.lang) ? '搜索历史' : 'Recent searches')}</span>
          <button type="button" class="link-btn" id="search-hist-clear">${t(isZh(state.lang) ? '清空' : 'Clear')}</button>
        </div>
        <div class="search-chips">${chips(history, 'chip chip-hist')}</div>
      </div>`)
  }
  if (hot.length) {
    sections.push(`
      <div class="search-hist-block">
        <div class="search-hist-head"><span>${t(isZh(state.lang) ? '热门搜索' : 'Trending searches')}</span></div>
        <div class="search-chips">${chips(hot, 'chip chip-hot')}</div>
      </div>`)
  }
  return sections.length ? `<div class="search-hist" id="search-hist">${sections.join('')}</div>` : ''
}

function renderSearchPage(query) {
  const list = filteredProducts()
  const suggestion = list.length === 0 && query ? suggestQuery(query) : ''
  // 无关键词（空搜索页）时展示历史与热搜；有关键词时展示结果
  const historyBlock = query ? '' : renderSearchHistoryBlock()
  const head = `
  <div class="search-page-head">
    <h1 class="search-page-title">${t('searchResultsFor', esc(query))}</h1>
    <div class="search-page-count">${t('countNote', list.length)}</div>
    ${suggestion ? `<div class="search-didyoumean">${t('didYouMean')}<a href="/search?q=${encodeURIComponent(suggestion)}">${esc(suggestion)}</a>?</div>` : ''}
  </div>`
  if (!list.length) {
    // 空结果也要带工具栏：可能只是筛选条件太苛刻，用户需要能就地改筛选/重置，不能进死胡同
    return `
    ${head}
    ${historyBlock}
    ${renderListTools()}
    <div class="empty-note">${t('searchEmpty')}</div>
    <div class="search-empty-actions">
      <button type="button" class="btn-ghost" id="search-page-img">${t('searchByImage')}</button>
    </div>`
  }
  return `
  ${head}
  ${historyBlock}
  ${renderListTools()}
  <div id="grid-wrap">${renderGrid(list)}</div>`
}

/* ============================================================
 * #5 商品对比(Compare)：跨页选中多商品 → 参数并排对比表
 * 复用既有 writeIdList 持久化模式，最多 4 件（超过提示先移除）。
 * ============================================================ */
const CMP_KEY = 'mxq_compare_ids'
const CMP_MAX = 4
let cmpIds = []

function loadCompare() {
  try {
    const arr = JSON.parse(localStorage.getItem(CMP_KEY) || '[]')
    cmpIds = Array.isArray(arr) ? arr.map(Number).filter((n) => Number.isFinite(n) && n > 0).slice(0, CMP_MAX) : []
  } catch {
    cmpIds = []
  }
}

function saveCompare() {
  writeIdList(CMP_KEY, cmpIds)
}

const inCompare = (id) => cmpIds.includes(Number(id))

/** 卡片上的对比勾选按钮（卡片整体是 <a>，点击须由事件里preventDefault 阻断跳转） */
function compareButton(id) {
  const active = inCompare(id)
  const label = active ? t(isZh(state.lang) ? '移出对比' : 'Remove from compare') : t(isZh(state.lang) ? '加入对比' : 'Add to compare')
  return `
    <button type="button" class="cmp-btn${active ? ' active' : ''}" data-cmp="${esc(id)}"
            aria-pressed="${active ? 'true' : 'false'}" aria-label="${esc(label)}" title="${esc(label)}">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" aria-hidden="true">
        <path d="M4 7h7M4 12h5M4 17h7" /><path d="m14 6 4 4 4-4M18 10v8" />
      </svg>
    </button>`
}

/** 切换对比选中；返回 {ok, full} —— full 表示已达上限被拒 */
function toggleCompare(id) {
  const target = Number(id)
  if (!Number.isFinite(target) || target <= 0) return { ok: false, full: false }
  if (inCompare(target)) {
    cmpIds = cmpIds.filter((x) => x !== target)
    saveCompare()
    paintCompareBar()
    return { ok: true, full: false }
  }
  if (cmpIds.length >= CMP_MAX) return { ok: false, full: true }
  cmpIds = [...cmpIds, target]
  saveCompare()
  paintCompareBar()
  return { ok: true, full: false }
}

/** 底部对比浮条：显示已选商品缩略 + 跳转对比页 */
function paintCompareBar() {
  const bar = document.getElementById('cmp-bar')
  if (!bar) return
  if (!cmpIds.length) {
    bar.innerHTML = ''
    bar.hidden = true
    return
  }
  const items = cmpIds
    .map((id) => state.products.find((p) => Number(p.id) === id))
    .filter(Boolean)
  bar.hidden = false
  bar.innerHTML = `
    <div class="cmp-bar-inner">
      <div class="cmp-bar-items">
        ${items
          .map(
            (p) => `<div class="cmp-bar-item">
              <img src="${esc(productImages(p, 120)[0])}" alt="" loading="lazy" />
              <button type="button" class="cmp-bar-x" data-cmp-remove="${p.id}" aria-label="remove">&times;</button>
            </div>`
          )
          .join('')}
        ${Array.from({ length: Math.max(0, CMP_MAX - items.length) }, () => '<div class="cmp-bar-slot"></div>').join('')}
      </div>
      <div class="cmp-bar-actions">
        <button type="button" class="btn-ghost" id="cmp-clear">${t(isZh(state.lang) ? '清空' : 'Clear')}</button>
        <a class="btn-primary" href="/compare">${t(isZh(state.lang) ? `对比 (${items.length})` : `Compare (${items.length})`)}</a>
      </div>
    </div>`
}

/** 对比页：按类目/价格/库存/评分等维度并排 */
function renderComparePage() {
  const items = cmpIds.map((id) => state.products.find((p) => Number(p.id) === id)).filter(Boolean)
  if (items.length < 2) {
    return `
      <div class="wrap">
        <h1 class="page-title">${t(isZh(state.lang) ? '商品对比' : 'Compare products')}</h1>
        <div class="empty-note">${t(isZh(state.lang) ? '请至少选择 2 件商品进行对比' : 'Select at least 2 products to compare')}</div>
        <a class="btn-primary" href="/">${t(isZh(state.lang) ? '去挑选' : 'Browse products')}</a>
      </div>`
  }
  const rows = [
    { label: t(isZh(state.lang) ? '价格' : 'Price'), get: (p) => money(salePriceOf(p)) },
    { label: t(isZh(state.lang) ? '原价' : 'List price'), get: (p) => money(listPriceOf(p)) },
    { label: t(isZh(state.lang) ? '类目' : 'Category'), get: (p) => esc(categoryLabel(p.category)) },
    { label: t(isZh(state.lang) ? '品牌' : 'Brand'), get: (p) => esc(p.brand || '—') },
    { label: t(isZh(state.lang) ? '库存' : 'Stock'), get: (p) => (Number(p.stock) > 0 ? `${p.stock}` : t(isZh(state.lang) ? '缺货' : 'Out of stock')) },
    { label: t(isZh(state.lang) ? '评分' : 'Rating'), get: (p) => (Number(p.rating) ? `${Number(p.rating).toFixed(1)} ★` : '—') },
    { label: t(isZh(state.lang) ? 'SKU' : 'SKU'), get: (p) => esc(p.sku_code || p.product_code || String(p.id)) },
  ]
  return `
    <div class="wrap">
      <h1 class="page-title">${t(isZh(state.lang) ? '商品对比' : 'Compare products')}</h1>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead>
            <tr>
              <th></th>
              ${items
                .map(
                  (p) => `<th>
                    <a href="/p/${p.id}"><img src="${esc(productImages(p, 200)[0])}" alt="" loading="lazy" /></a>
                    <div class="cmp-th-title">${esc(localizedTitle(p))}</div>
                    <button type="button" class="link-btn" data-cmp-remove="${p.id}">${t(isZh(state.lang) ? '移除' : 'Remove')}</button>
                  </th>`
                )
                .join('')}
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (r) => `<tr>
                  <td class="cmp-row-label">${r.label}</td>
                  ${items.map((p) => `<td>${r.get(p)}</td>`).join('')}
                </tr>`
              )
              .join('')}
            <tr>
              <td class="cmp-row-label"></td>
              ${items.map((p) => `<td><a class="btn-primary" href="/p/${p.id}">${t(isZh(state.lang) ? '去购买' : 'Buy')}</a></td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>`
}

function renderHome() {
  const levelOne = state.groups.filter((group) => !group.parent_id).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  let list = filteredProducts()

  // 首页默认视图（没下钻分类、没搜索、没改排序、没价格筛选）时，
  // 每支球队只放 3 个名额在先，热门球队排前面；被挤掉的顺延到后面，翻页仍可见。
  // 注意 onlyOnline 默认就是 true，不算用户主动加的筛选。
  const homeDefaultView =
    !state.groupId &&
    !state.groupParentId &&
    !state.category &&
    !state.keyword.trim() &&
    state.sort === 'default' &&
    state.priceMin === '' &&
    state.priceMax === '' &&
    state.saleMin === 0
  if (homeDefaultView) list = applyHomeTeamQuota(list)

  // 当前下钻层级：0 = 只看一级，选中的一级 id，或选中的二级 id
  const currentParent = state.groupParentId
  const parentGroup = currentParent ? state.groups.find((g) => Number(g.id) === currentParent) : null
  // 当前层级的子分组（同父同名自动去重，只留信息最全的一个）
  const childGroups = childGroupsOf(currentParent)

  // 面包屑（Fanatics 式）：NFL / NFC East / Dallas Cowboys —— 每级都是可点的分组路径链接，
  // 球队叶子被选中时同样显示，与 URL 一一对应
  const crumbAnchor = parentGroup || (state.groupId ? state.groups.find((g) => Number(g.id) === Number(state.groupId)) : null)
  const crumbChain = crumbAnchor ? groupChain(crumbAnchor) : []
  const crumbsHtml = crumbChain.length
    ? `<div class="cat-crumbs"><button type="button" class="crumb-back" data-back="1">${t('back')}</button><span class="crumb-path">` +
      crumbChain
        .map((g, i) =>
          i < crumbChain.length - 1
            ? `<a href="${esc(buildGroupUrl(g))}">${esc(tr(g.name, state.lang))}</a>`
            : `<b>${esc(tr(g.name, state.lang))}</b>`,
        )
        .join(' <span class="crumb-sep">/</span> ') +
      `</span></div>`
    : ''

  // 一级分类 chips（配了封面图的分类在名字前显示小图标，如足球球衣的黑白足球标）
  const chips = [
    `<button class="chip ${!state.groupId && !state.groupParentId ? 'active' : ''}" data-category="" data-group="0" data-parent="0">${t('all')}</button>`,
    ...levelOne.map(
      (group) =>
        `<button class="chip ${state.groupParentId === Number(group.id) ? 'active' : ''}" data-category="" data-group="0" data-parent="${group.id}">${
          group.cover_image ? `<img class="chip-icon" src="${esc(imageUrl(group.cover_image, 64))}" alt="" loading="lazy" decoding="async" />` : ''
        }${esc(tr(group.name, state.lang))}</button>`,
    ),
    `<button class="chip ${state.onlyOnline ? 'active' : ''}" data-toggle="online">${t('onlineOnly')}</button>`,
  ].join('')

  // 二级/三级分类：带图标的网格
  let subNav = ''
  if (currentParent && childGroups.length) {
    const cards = childGroups
      .map((g) => {
        const icon = g.cover_image ? `<img class="cat-icon" src="${esc(imageUrl(g.cover_image, 160))}" alt="" loading="lazy" />` : `<span class="cat-icon cat-icon-empty"></span>`
        const hasChildren = state.groups.some((x) => Number(x.parent_id) === Number(g.id))
        return `<button type="button" class="cat-card ${state.groupId === Number(g.id) ? 'active' : ''}" data-category="" data-group="${g.id}" data-parent="${currentParent}" data-haschildren="${hasChildren ? '1' : '0'}">${icon}<span class="cat-name">${esc(tr(g.name, state.lang))}</span></button>`
      })
      .join('')
    subNav = `<div class="cat-nav"><div class="cat-grid">${cards}</div></div>`
  }

  // 三级球队分类头部介绍（资料来自分组库，配了才显示）
  const leafGroup = state.groupId ? state.groups.find((g) => Number(g.id) === Number(state.groupId)) : null
  const groupIntroHtml = leafGroup ? renderGroupIntro(leafGroup) : ''

  // 队店导航行：只在球队层级（二级分组被选中）时出现
  const teamNavHtml = leafGroup && leafGroup.parent_id ? renderTeamNav(leafGroup) : ''

  // 首页动态海报：这里只留容器，真正的 <video> 由 mountHero() 挂载并跨渲染复用。
  // 不能把 <video> 写进模板串里——每次重绘都会重建元素，浏览器只放行第一个
  // 自动播放的视频，重建出来的会被拦成 paused（表现为「一翻页海报就不动了」）。
  const heroHtml = `
  <section class="hero hero-video" data-hero aria-label="Promotion video"></section>`

  return `
  ${heroHtml}

  ${renderClubMarquee()}

  <!-- P0-4 优惠促销：首屏可见的可用优惠码（异步填充，加载失败不显示） -->
  <div data-promo-slot="home"></div>

  ${crumbsHtml}

  <div class="toolbar">
    <div class="chips">${chips}</div>
    <div class="count-note">${t('countNote', list.length)}</div>
  </div>

  ${renderListTools()}

  ${teamNavHtml}

  ${subNav}

  ${groupIntroHtml}

  <div id="grid-wrap">${renderGrid(list)}</div>

  ${renderTrendingCollections()}`
}

/**
 * 三级球队分类的头部介绍：队徽 + 红色标题 + 要点 + 横幅（库里有才渲染）。
 *
 * 顺序与参考站一致，且**参考站没有的槽位就不渲染**——不要拿别的图去填空。
 * 之前的线上事故就是"队徽被抓进了横幅位"，而横幅是 width:100%，
 * 一张 130×210 的竖版队徽被撑到上千像素宽，看着就是"队徽巨大、位置乱放"。
 * 所以这里再加一道几何闸：横幅必须是横版（宽 > 高）才渲染，否则只当队徽用。
 */
const INTRO_BANNER_MIN_RATIO = 1.15

function renderGroupIntro(group) {
  const bullets = (Array.isArray(group.intro_bullets) ? group.intro_bullets : [])
    .filter((b) => typeof b === 'string' && b.trim())
  const logo = typeof group.intro_logo === 'string' ? group.intro_logo.trim() : ''
  let banner = typeof group.intro_banner === 'string' ? group.intro_banner.trim() : ''
  if (banner && banner === logo) banner = ''
  if (!logo && !group.intro_title && !bullets.length && !banner) return ''
  return `
  <div class="group-intro">
    ${logo ? `<img class="group-intro-logo" src="${esc(imageUrl(logo, 240))}" alt="${esc(tr(group.name, state.lang))}" loading="lazy" decoding="async" data-intro-logo />` : ''}
    ${group.intro_title ? `<div class="group-intro-title">${esc(group.intro_title)}</div>` : ''}
    ${bullets.length ? `<ul class="group-intro-bullets">${bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
    ${banner ? `<img class="group-intro-banner" src="${esc(imageUrl(banner, 1200))}" alt="" loading="lazy" decoding="async" data-intro-banner />` : ''}
  </div>`
}

/**
 * 介绍图的几何闸：横幅位混进竖版图（队徽）时降级处理。
 * 抓取侧已按 <ul> 前后切分，这里是渲染侧的兜底——图片加载完才知道真实宽高。
 */
function guardIntroImages(root) {
  const banner = root.querySelector('[data-intro-banner]')
  if (!banner || !banner.naturalWidth) return
  if (banner.naturalWidth / banner.naturalHeight >= INTRO_BANNER_MIN_RATIO) return
  const logoImg = root.querySelector('[data-intro-logo]')
  if (!logoImg) {
    banner.removeAttribute('data-intro-banner')
    banner.className = 'group-intro-logo'
    banner.alt = ''
  } else {
    banner.remove()
  }
}

/**
 * 列表工具条：排序 + 价格区间 + 折扣阈值 + 重置。
 * 任一条件变化都会走 gridFilterSignature 重置分页并回到列表顶部 —— 否则用户会
 * 继承上一个筛选的展开深度，看到一条"凭空长出来"的长列表。
 *
 * 折扣阈值按当前目录的真实分布挑（见 state.saleMin 注释）：
 * ≥70% 留 90%、≥75% 留 36%、≥78% 留 3%、≥80% 留 1%，每一档都能看出件数变化。
 */
const SALE_MIN_OPTIONS = [70, 75, 78, 80]

function renderListTools() {
  const sortOptions = [
    ['default', 'sortDefault'],
    ['newest', 'sortNewest'],
    ['price-asc', 'sortPriceAsc'],
    ['price-desc', 'sortPriceDesc'],
    ['discount', 'sortDiscount'],
    ['sales', 'sortSales'],
  ]
  const dirty =
    state.sort !== 'default' ||
    state.saleMin > 0 ||
    state.priceMin !== '' ||
    state.priceMax !== '' ||
    state.brandFilter !== '' ||
    state.sizeFilter !== ''
  const pool = toolsBasePool()
  const brands = brandOptions(pool)
  const sizes = sizeOptions(pool)
  return `
  <div class="list-tools">
    <label class="lt-sort">
      <span class="lt-label">${t('sortLabel')}</span>
      <select id="sort-select">
        ${sortOptions.map(([value, key]) => `<option value="${value}" ${state.sort === value ? 'selected' : ''}>${t(key)}</option>`).join('')}
      </select>
    </label>
    ${brands.length > 1 ? `
    <label class="lt-brand">
      <span class="lt-label">${t('filterBrand')}</span>
      <select id="brand-select">
        <option value="">${t('filterAny')}</option>
        ${brands.map((brand) => `<option value="${esc(brand)}" ${state.brandFilter === brand ? 'selected' : ''}>${esc(brand)}</option>`).join('')}
      </select>
    </label>` : ''}
    ${sizes.length > 1 ? `
    <label class="lt-size">
      <span class="lt-label">${t('filterSize')}</span>
      <select id="size-select">
        <option value="">${t('filterAny')}</option>
        ${sizes.map((size) => `<option value="${esc(size)}" ${state.sizeFilter.toLowerCase() === size.toLowerCase() ? 'selected' : ''}>${esc(size)}</option>`).join('')}
      </select>
    </label>` : ''}
    <div class="lt-price">
      <span class="lt-label">${t('priceRangeLabel')}</span>
      <input id="price-min" type="number" min="0" inputmode="decimal" value="${esc(state.priceMin)}" placeholder="${t('priceMinPlaceholder')}" />
      <i class="lt-dash">–</i>
      <input id="price-max" type="number" min="0" inputmode="decimal" value="${esc(state.priceMax)}" placeholder="${t('priceMaxPlaceholder')}" />
      <button type="button" class="lt-apply" id="price-apply">${t('priceApply')}</button>
    </div>
    <label class="lt-sale">
      <span class="lt-label">${t('saleLabel')}</span>
      <select id="sale-select">
        <option value="0" ${state.saleMin === 0 ? 'selected' : ''}>${t('saleAny')}</option>
        ${SALE_MIN_OPTIONS.map((v) => `<option value="${v}" ${state.saleMin === v ? 'selected' : ''}>${t('saleAtLeast', v)}</option>`).join('')}
      </select>
    </label>
    ${dirty ? `<button type="button" class="link-btn lt-reset" id="filter-reset">${t('filterReset')}</button>` : ''}
  </div>`
}

/**
 * 把工具条输入框里的价格区间写回 state 并重绘。
 * 空值代表不限；非法数字或「最低 > 最高」时提示并保持原状，避免把用户筛成空白页。
 */
function applyPriceRange() {
  const read = (id) => {
    const node = $(id)
    const raw = node ? String(node.value).trim() : ''
    if (raw === '') return null
    const num = Number(raw)
    return Number.isFinite(num) && num >= 0 ? num : NaN
  }
  const min = read('price-min')
  const max = read('price-max')
  if (Number.isNaN(min) || Number.isNaN(max) || (min !== null && max !== null && min > max)) {
    toast(t('priceInvalid'))
    return
  }
  state.priceMin = min === null ? '' : String(min)
  state.priceMax = max === null ? '' : String(max)
  render()
}

/**
 * 顶部热门球队跑马灯（复刻参考站的 club-marquee）。
 * 精选一批热门球队的队徽，横向无缝滚动；点队徽直接筛选该球队的商品。
 * 队徽图来自 product_groups.cover_image（外链 CDN，无需签名）。
 */
const MARQUEE_CLUB_IDS = [
  1004, 1015, 1003, 1021, 1032, 1033, 1034, 1025, 1037,
  1041, 1049, 1050, 1052, 1042, 1059, 1057, 1068, 1069, 1067,
  1084, 1086, 1080, 1081, 1082, 1117, 1120, 1121,
]

function renderClubMarquee() {
  const clubs = MARQUEE_CLUB_IDS
    .map((id) => state.groups.find((g) => Number(g.id) === id))
    .filter((g) => g && g.cover_image)
  if (!clubs.length) return ''

  const item = (g) => {
    const icon = `<img src="${esc(imageUrl(g.cover_image, 160))}" alt="${esc(g.name)}" loading="lazy" decoding="async" />`
    return `<button type="button" class="club-marquee__item" data-marquee-group="${g.id}" title="${esc(g.name)}" aria-label="${t('viewClubProducts')} ${esc(g.name)}">${icon}</button>`
  }
  // 6 组相同内容，translateX(-1/6) 即无缝循环
  const group = `<div class="club-marquee__group">${clubs.map(item).join('')}</div>`
  const track = group + group + group + group + group + group

  return `
  <section class="club-marquee" aria-label="${t('marqueeAria')}">
    <div class="club-marquee__track">${track}</div>
  </section>`
}

/**
 * 商品主图下方的社交账号入口。
 * 数据来自卖家后台「社交账号」绑定的 8 个平台（服务端已算好跳转地址），
 * 点任意图标都在新标签页打开卖家的真实主页；没绑定的平台不会出现。
 */
function renderSocialRow() {
  const socials = state.socials || []
  if (!socials.length) return ''
  const buttons = socials
    .map((item) => {
      const label = `${item.name}${item.handle ? ` · ${item.handle}` : ''}`
      return `
        <a class="social-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"
           title="${esc(`${label} —— ${t('socialOpen')}`)}" aria-label="${esc(label)}"
           data-platform="${esc(item.platform)}"
           style="--brand:${esc(item.color)};--brand-fg:${esc(item.fg || '#ffffff')};--icon:url('${esc(item.icon)}?v=20261009k')">
          <span class="social-glyph" aria-hidden="true"></span>
        </a>`
    })
    .join('')
  return `
      <div class="social-row">
        <div class="social-row-head">
          <b>${t('socialFollow')}</b>
          <span>${t('socialClick')}</span>
        </div>
        <div class="social-row-list">${buttons}</div>
      </div>`
}

/* --------------------- 尺寸表（SIZE GUIDE，全站商品通用） ---------------------
 * 三张表：成人男款 / 儿童 / 女款，与参考站商品弹窗一致；
 * CM/IN 一键切换：长度列 cm→in（÷2.54），体重列 kg→lb（×2.2046），年龄列不换算。
 */
const SIZE_GUIDE_MEN = {
  name: { en: 'Men Size', 'zh-CN': '男款尺码' },
  columns: [
    { key: 'size', label: 'Size' },
    { key: 'height', label: 'Suggest Height (CM)', to: 'Suggest Height (IN)', convert: 'cm' },
    { key: 'weight', label: 'Suggest Weight (KG)', to: 'Suggest Weight (LB)', convert: 'kg' },
    { key: 'jlength', label: 'Jersey Length (CM)', to: 'Jersey Length (IN)', convert: 'cm' },
    { key: 'chest', label: 'Chest (CM)', to: 'Chest (IN)', convert: 'cm' },
    { key: 'ssleeve', label: 'Short-Sleeve Length (CM)', to: 'Short-Sleeve Length (IN)', convert: 'cm' },
    { key: 'cuff', label: 'Cuff width (CM)', to: 'Cuff width (IN)', convert: 'cm' },
    { key: 'lsleeve', label: 'Long-Sleeve Length (CM)', to: 'Long-Sleeve Length (IN)', convert: 'cm' },
    { key: 'version', label: 'Version' },
  ],
  rows: [
    { size: 'S', height: '160-170', weight: '60-65', jlength: '71', chest: '50', ssleeve: '36.5', cuff: '16.5', lsleeve: '75.5', version: 'Men Normal' },
    { size: 'M', height: '170-175', weight: '66-70', jlength: '73', chest: '52', ssleeve: '38', cuff: '17.5', lsleeve: '77', version: 'Men Normal' },
    { size: 'L', height: '175-180', weight: '71-75', jlength: '75', chest: '54', ssleeve: '39.5', cuff: '18.5', lsleeve: '78.5', version: 'Men Normal' },
    { size: 'XL', height: '180-185', weight: '76-80', jlength: '77', chest: '56', ssleeve: '41', cuff: '19.5', lsleeve: '80', version: 'Men Normal' },
    { size: '2XL', height: '185-190', weight: '81-87', jlength: '81', chest: '59', ssleeve: '42', cuff: '20.5', lsleeve: '81', version: 'Men Normal' },
    { size: '3XL', height: '190-195', weight: '88-95', jlength: '83', chest: '61', ssleeve: '43', cuff: '21.5', lsleeve: '82', version: 'Men Normal' },
  ],
}

const SIZE_GUIDE_KIDS = {
  name: { en: 'Kids Size', 'zh-CN': '儿童尺码' },
  columns: [
    { key: 'size', label: 'Size' },
    { key: 'height', label: 'Suggest Height (CM)', to: 'Suggest Height (IN)', convert: 'cm' },
    { key: 'age', label: 'Suggest Age (Year old)', convert: null },
    { key: 'length', label: 'Length (CM)', to: 'Length (IN)', convert: 'cm' },
    { key: 'width', label: 'Width (CM)', to: 'Width (IN)', convert: 'cm' },
    { key: 'waist', label: 'Waist (CM)', to: 'Waist (IN)', convert: 'cm' },
    { key: 'version', label: 'Version' },
  ],
  rows: [
    { size: '16', height: '95-105', age: '3-4', length: '44', width: '35', waist: '20-37', version: 'Kids Size' },
    { size: '18', height: '105-115', age: '4-5', length: '47', width: '37', waist: '21-39', version: 'Kids Size' },
    { size: '20', height: '115-125', age: '5-6', length: '50', width: '39', waist: '22-41', version: 'Kids Size' },
    { size: '22', height: '125-135', age: '6-7', length: '53', width: '41', waist: '23-42', version: 'Kids Size' },
    { size: '24', height: '135-145', age: '8-9', length: '56', width: '43', waist: '24-44', version: 'Kids Size' },
    { size: '26', height: '145-155', age: '12-13', length: '62', width: '47', waist: '25-47', version: 'Kids Size' },
    { size: '28', height: '155-165', age: '12-13', length: '62', width: '47', waist: '26-50', version: 'Kids Size' },
  ],
}

const SIZE_GUIDE_WOMEN = {
  name: { en: 'Women Size', 'zh-CN': '女款尺码' },
  columns: [
    { key: 'size', label: 'Size' },
    { key: 'height', label: 'Height (CM)', to: 'Height (IN)', convert: 'cm' },
    { key: 'width', label: 'Width (CM)', to: 'Width (IN)', convert: 'cm' },
    { key: 'length', label: 'Length (CM)', to: 'Length (IN)', convert: 'cm' },
    { key: 'version', label: 'Version' },
  ],
  rows: [
    { size: 'S', height: '150-160', width: '40-41', length: '61-63', version: 'Women Size' },
    { size: 'M', height: '160-165', width: '41-44', length: '63-66', version: 'Women Size' },
    { size: 'L', height: '165-170', width: '44-47', length: '66-69', version: 'Women Size' },
    { size: 'XL', height: '170-175', width: '47-50', length: '69-71', version: 'Women Size' },
    { size: 'XXL', height: '175-180', width: '50-53', length: '71-73', version: 'Women Size' },
  ],
}

const SIZE_GUIDE_NOTE = 'This data was obtained from manually measuring the product, it may be off by 1-2 CM.'
const SIZE_GUIDE_HOW_TITLE = 'How to measure the product\u2019s size?'
const SIZE_GUIDE_HOW_STEPS = [
  'Lay the jersey flat on a table and smooth it out.',
  'Chest / Width: measure across the garment, 2 cm below the armpits, from edge to edge.',
  'Length: measure from the highest point of the shoulder seam straight down to the hem.',
  'Compare the measurements with the tables above to pick your size.',
]

let sizeGuideUnit = 'cm' // 'cm' | 'in'
/** 当前详情商品：尺寸表弹窗优先展示商品自带的实测尺寸表（attributes.size_chart） */
let sizeGuideProduct = null

/** 商品自带尺寸表（fanatics 抓取的原始行数组：首行为表头）渲染 */
function sizeGuideRawBlockHtml(chart) {
  const rows = Array.isArray(chart && chart.rows) ? chart.rows : []
  if (rows.length < 2) return ''
  const [head, ...body] = rows
  return `
  <div class="sg-block">
    <div class="sg-table-name">${esc(chart.title || 'Size Chart')}</div>
    <div class="sg-table-wrap"><table class="sg-table">
      <thead><tr>${head.map((h) => `<th>${esc(String(h ?? ''))}</th>`).join('')}</tr></thead>
      <tbody>${body.map((r) => `<tr>${(r || []).map((c) => `<td>${esc(String(c ?? ''))}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
  </div>`
}

/** 把「160-170」/「36.5」这类值按列单位换算；其余原样返回 */
function sizeGuideCell(value, mode) {
  if (!mode) return esc(String(value))
  const conv = (n) => (mode === 'cm' ? n / 2.54 : n * 2.20462).toFixed(1).replace(/\.0$/, '')
  return esc(String(value).replace(/\d+(\.\d+)?/g, (num) => conv(Number(num))))
}

function sizeGuideTableHtml(table, unit) {
  const lang = state.lang || 'en'
  const name = table.name[lang] || table.name.en
  const head = table.columns
    .map((col) => `<th>${esc(unit === 'in' && col.to ? col.to : col.label)}</th>`)
    .join('')
  const body = table.rows
    .map(
      (row) =>
        `<tr>${table.columns
          .map((col) => `<td>${sizeGuideCell(row[col.key], col.convert && unit === 'in' ? col.convert : null)}</td>`)
          .join('')}</tr>`,
    )
    .join('')
  return `
  <div class="sg-block">
    <div class="sg-table-name">${esc(name)}</div>
    <div class="sg-table-wrap"><table class="sg-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
  </div>`
}

function renderSizeGuideBody() {
  const unit = sizeGuideUnit
  // 商品自带尺寸表优先（来自 fanatics 官方数据，attributes.size_chart = [{title, rows}]）
  const productCharts = sizeGuideProduct && sizeGuideProduct.attributes ? sizeGuideProduct.attributes.size_chart : null
  if (Array.isArray(productCharts) && productCharts.length) {
    const blocks = productCharts.map((chart) => sizeGuideRawBlockHtml(chart)).join('')
    if (blocks) {
      return `
      <div class="sg-toggle" role="group" aria-label="Unit">
        <button type="button" class="sg-unit${unit === 'cm' ? ' active' : ''}" data-size-unit="cm">CM</button>
        <button type="button" class="sg-unit${unit === 'in' ? ' active' : ''}" data-size-unit="in">IN</button>
      </div>
      ${blocks}
      <p class="sg-note">${esc(SIZE_GUIDE_NOTE)}</p>`
    }
  }
  return `
  <div class="sg-toggle" role="group" aria-label="Unit">
    <button type="button" class="sg-unit${unit === 'cm' ? ' active' : ''}" data-size-unit="cm">CM</button>
    <button type="button" class="sg-unit${unit === 'in' ? ' active' : ''}" data-size-unit="in">IN</button>
  </div>
  ${sizeGuideTableHtml(SIZE_GUIDE_MEN, unit)}
  ${sizeGuideTableHtml(SIZE_GUIDE_KIDS, unit)}
  ${sizeGuideTableHtml(SIZE_GUIDE_WOMEN, unit)}
  <p class="sg-note">${esc(SIZE_GUIDE_NOTE)}</p>
  <div class="sg-how">
    <h4>${esc(SIZE_GUIDE_HOW_TITLE)}</h4>
    <ol>${SIZE_GUIDE_HOW_STEPS.map((step) => `<li>${esc(step)}</li>`).join('')}</ol>
  </div>`
}

/* ------------- #4 商品问答 Q&A（2026-10-10） -------------
 * 结构对齐既有评价区：缓存 → 异步拉取 → 分区渲染；提问走事件委托提交。
 */
const QA_CACHE = new Map()

const qaLabel = (zh, en) => (isZh(state.lang) ? zh : en)

/** 详情页挂载：拉取该商品问答 */
async function loadQa(pid) {
  const section = document.getElementById('qa-section')
  if (!section || Number(section.dataset.pid) !== Number(pid)) return
  if (QA_CACHE.has(Number(pid))) {
    paintQa(section, QA_CACHE.get(Number(pid)), Number(pid))
    return
  }
  try {
    const response = await fetch(apiUrl(`/api/store/qa/${Number(pid)}?limit=20`))
    if (!response.ok) throw new Error('qa load failed')
    const data = await response.json()
    QA_CACHE.set(Number(pid), data)
    if (document.getElementById('qa-section') === section) paintQa(section, data, Number(pid))
  } catch {
    section.innerHTML = ''
  }
}

function paintQa(section, data, pid) {
  const { items = [], summary = { count: 0, answered: 0 } } = data || {}
  const formOpen = section.dataset.formOpen === '1'
  const listHtml = items.length
    ? items
        .map(
          (qa) => `
      <div class="qa-item">
        <div class="qa-q">
          <span class="qa-badge">Q</span>
          <div class="qa-body">
            <p class="qa-text">${esc(qa.question)}</p>
            <span class="qa-meta">${esc(qa.asker || 'Anonymous')} · ${esc(String(qa.at || '').slice(0, 10))}</span>
          </div>
        </div>
        ${
          qa.answer
            ? `<div class="qa-a">
                 <span class="qa-badge qa-badge-a">A</span>
                 <div class="qa-body">
                   <p class="qa-text">${esc(qa.answer)}</p>
                   <span class="qa-meta">${esc(qa.answerer || qaLabel('客服', 'Support'))} · ${esc(String(qa.answeredAt || '').slice(0, 10))}</span>
                 </div>
               </div>`
            : `<div class="qa-pending">${qaLabel('待回答', 'Awaiting answer')}</div>`
        }
      </div>`
        )
        .join('')
    : `<div class="review-empty">${qaLabel('还没有人提问，来问第一个吧', 'No questions yet — be the first to ask')}</div>`
  section.innerHTML = `
    <div class="qa-head">
      <h3>${qaLabel('商品问答', 'Questions & Answers')}</h3>
      ${summary.count ? `<span class="qa-summary">${qaLabel(`共 ${summary.count} 问 · ${summary.answered} 已答`, `${summary.count} questions · ${summary.answered} answered`)}</span>` : ''}
      <button type="button" class="link-btn" id="qa-toggle">${formOpen ? qaLabel('收起', 'Cancel') : qaLabel('我要提问', 'Ask a question')}</button>
    </div>
    <div class="qa-form ${formOpen ? '' : 'collapsed'}" id="qa-form" data-pid="${pid}">
      <div class="form-row">
        <label for="qa-name">${qaLabel('你的昵称', 'Your name')}</label>
        <input id="qa-name" maxlength="40" placeholder="${qaLabel('选填', 'Optional')}" autocomplete="name" />
      </div>
      <div class="form-row">
        <label for="qa-question">${qaLabel('问题', 'Question')}<i>*</i></label>
        <textarea id="qa-question" maxlength="500" rows="3" placeholder="${qaLabel('例如：这件球衣是正版吗？可以定制姓名吗？', 'e.g. Is this jersey authentic? Can I customise a name?')}"></textarea>
      </div>
      <div class="qa-form-actions">
        <button type="button" class="btn-primary" id="qa-submit">${qaLabel('提交问题', 'Submit question')}</button>
        <span class="qa-form-note" id="qa-form-msg" role="status" aria-live="polite"></span>
      </div>
    </div>
    <div class="qa-list">${listHtml}</div>`
}

/** 提交提问 */
async function submitQa(pid) {
  const input = $('qa-question')
  const nameInput = $('qa-name')
  const msg = $('qa-form-msg')
  const question = (input ? input.value : '').trim()
  if (question.length < 5) {
    if (msg) msg.textContent = qaLabel('问题至少 5 个字符', 'Question must be at least 5 characters')
    return
  }
  const btn = $('qa-submit')
  if (btn) btn.disabled = true
  try {
    const response = await fetch(apiUrl('/api/store/qa'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId: Number(pid), question, name: nameInput ? nameInput.value.trim() : '' }),
    })
    const data = await response.json().catch(() => ({}))
    if (msg) {
      msg.textContent = response.ok
        ? qaLabel('已提交，审核后展示', 'Submitted — will appear after review')
        : data.error === 'already asked'
          ? qaLabel('你已经问过这个商品了', 'You already asked about this product')
          : data.error === 'too many questions'
            ? qaLabel('提问过于频繁，请稍后再试', 'Too many questions — please try later')
            : qaLabel('提交失败，请稍后再试', 'Failed to submit — please try later')
    }
    if (response.ok) {
      QA_CACHE.delete(Number(pid))
      if (input) input.value = ''
      void loadQa(pid)
    }
  } catch {
    if (msg) msg.textContent = qaLabel('提交失败，请稍后再试', 'Failed to submit — please try later')
  } finally {
    if (btn) btn.disabled = false
  }
}

async function openSizeGuide() {
  const body = $('size-guide-body')
  if (!body) return
  const product = sizeGuideProduct
  const hasLocal = product && product.attributes && Array.isArray(product.attributes.size_chart) && product.attributes.size_chart.length
  if (!hasLocal && product && product.hasSizeChart) {
    // 官方尺寸表（Fanatics 原版）按需拉取：先出加载态，拿到后缓存到商品上，下次秒开
    body.innerHTML = '<p style="padding:32px;text-align:center;color:#5a6a85">Loading size guide…</p>'
    openModal('size-guide-modal')
    try {
      const response = await fetch(apiUrl(`/api/store/size-chart?id=${Number(product.id)}`))
      const data = await response.json()
      const chart = data && data.size_chart
      if (Array.isArray(chart) && chart.length) {
        if (!product.attributes || typeof product.attributes !== 'object') product.attributes = {}
        product.attributes.size_chart = chart
      }
    } catch {
      // 拉取失败：回退通用尺寸表，不打断用户
    }
    body.innerHTML = renderSizeGuideBody()
    return
  }
  body.innerHTML = renderSizeGuideBody()
  openModal('size-guide-modal')
}

/** 小号 SIZE GUIDE 按钮：放在 SIZE 选项组标题右侧（原「Choose size」提示的位置）。 */
const SIZE_GUIDE_SMALL_BTN = `
  <button type="button" class="size-guide-btn size-guide-btn-sm" data-size-guide="1" aria-haspopup="dialog">
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </svg>
    <span>SIZE GUIDE</span>
  </button>`

function renderDetail(product) {
  if (!product) return `<div class="empty-note">${t('notFound')}</div>`
  // 主图按详情页展示宽度取 w_800；缩略图条只要 w_160，否则 8 张原图就是 5MB
  const images = productImages(product, 800)
  const thumbs = productImages(product, 160)
  // M8 素材：attributes.videos（[{url,poster}] 或 ['url']），详情随图集展示
  const videos = (Array.isArray(product.videos) ? product.videos : [])
    .map((video) => (typeof video === 'string' ? { url: video } : video))
    .filter((video) => video && video.url)
  // P0-5：合规字段做多别名归一（真实数据在 attributes 里，key 名不统一，见 normalizeCompliance）
  const compliance = { ...normalizeCompliance(product), ...(product.compliance || {}) }
  const sale = salePriceOf(product)
  const list = listPriceOf(product)
  const off = discountPercent(list, sale)
  const options = normalizeOptions(product.options)
  const breadcrumb = state.category ? categoryLabel(state.category) : categoryLabel(product.category)
  // M6 库存：显式 stock=0 判缺货（未登记库存视为不限量，与服务端报价校验一致）
  const outOfStock = Number(product.stock) === 0

  const groups = options
    .map((group) => {
      const items = visibleItems(group)
      if (group.type === 'customize') {
        return `
        <div class="opt-group" data-group-name="${esc(group.name)}">
          <div class="opt-head">
            <span class="opt-name">${esc(group.name)}</span>
            <span class="opt-hint">${esc(optHintLabel(group.hint))}</span>
          </div>
          ${items
            .map(
              (item) => `
            <div class="custom-row">
              <label for="cf-${esc(group.name)}-${esc(item.label)}">${esc(item.label)}</label>
              <div style="display:flex;gap:10px;align-items:center">
                <input id="cf-${esc(group.name)}-${esc(item.label)}"
                       data-customize="${esc(group.name)}" data-item="${esc(item.label)}"
                       maxlength="${group.maxLength || 20}"
                       placeholder="${item.label === 'Number' ? t('customizeNumberHint') : t('customizeMaxChars', group.maxLength || 14)}" />
                <span class="fee">+${money(item.price)}</span>
              </div>
            </div>`,
            )
            .join('')}
        </div>`
      }
      if (group.type === 'picture') {
        return `
        <div class="opt-group" data-group-name="${esc(group.name)}">
          <div class="opt-head"><span class="opt-name">${esc(group.name)}</span><span class="opt-hint">${t('pickPatchHint')}</span></div>
          <div class="opt-items">
            ${items
              .map(
                (item) => `
              <button type="button" class="opt-card opt-patch" data-pick="${esc(group.name)}" data-label="${esc(item.label)}"
                      aria-label="${esc(item.label)}${item.price > 0 ? ` +${money(item.price)}` : ''}">
                ${item.image ? `<img src="${esc(imageUrl(item.image, 160))}" alt="" loading="lazy" />` : '<span class="opt-card-ph"></span>'}
                <span class="opt-tip"><span class="opt-tip-label">${esc(item.label)}</span><b>${item.price > 0 ? `+${money(item.price)}` : t('noExtraCharge')}</b></span>
              </button>`,
              )
              .join('')}
          </div>
        </div>`
      }
      return `
      <div class="opt-group" data-group-name="${esc(group.name)}">
        <div class="opt-head"><span class="opt-name">${esc(group.name)}${group.required ? ' *' : ''}</span>${String(group.name).trim().replace(/[:：]+\s*$/, '').toUpperCase() === 'SIZE' ? (product.hasSizeChart ? `<span class="opt-actions-vert">${SIZE_GUIDE_SMALL_BTN}${SIZE_ASSISTANT_BTN}</span>` : SIZE_ASSISTANT_BTN) : `<span class="opt-hint">${t('chooseSize')}</span>`}</div>
        <div class="opt-items">
          ${items
            .map(
              (item) => `
            <button type="button" class="opt-pill" data-pick="${esc(group.name)}" data-label="${esc(item.label)}">
              ${esc(item.label)}${item.price > 0 ? `<small>+${money(item.price)}</small>` : ''}
            </button>`,
            )
            .join('')}
        </div>
      </div>`
    })
    .join('')

  const spec = [
    [t('specSku'), `#${product.id}`],
    [t('specCategory'), product.category ? categoryLabel(product.category) : '-'],
    [t('specBrand'), product.brand || '-'],
    [t('specStock'), `${Number(product.stock) || 0} ${t('unitPieces')}`],
    [t('specSales'), `${Number(product.sale_count) || 0} ${t('unitPieces')}`],
    [t('specStatus'), statusText(product.status)],
  ]
    .map(([key, value]) => `<div><b>${esc(key)}</b>：${esc(value)}</div>`)
    .join('')

  // 数量选择：详情页直接选，不用先加购再回购物车改。库存为 0 时不给选（只提示）。
  const stock = Number(product.stock) || 0
  const qtyRow = `
    <div class="qty-row">
      <span class="lt-label">${t('qtyLabel')}</span>
      <span class="qty-stepper">
        <button type="button" class="qty-btn" data-detail-qty="-1" aria-label="-">−</button>
        <span class="qty-value" id="detail-qty">1</span>
        <button type="button" class="qty-btn" data-detail-qty="1" aria-label="+">+</button>
      </span>
      ${stock > 0 ? `<span class="qty-stock${stock <= 5 ? ' low' : ''}">${t(stock <= 5 ? 'stockLow' : 'stockLeft', stock)}</span>` : ''}
    </div>`

  return `
  <div class="crumbs"><a href="/">${t('home')}</a> / ${esc(breadcrumb || t('allProducts'))} / ${esc(localizedTitle(product))}</div>
  <div class="detail">
    <div>
      <div class="gallery-main" id="gallery-main-box"><img id="gallery-main" src="${esc(images[0])}" alt="${esc(localizedTitle(product))}" /></div>
      ${
        images.length > 1 || videos.length
          ? `<div class="thumbs">${images
              .map(
                (src, index) =>
                  // src 用小图，data-thumb 存大图：点了只换主图地址，不能把主图换成 160px 的糊图
                  `<button type="button" class="${index === 0 ? 'active' : ''}" data-thumb="${esc(src)}"><img src="${esc(thumbs[index] || src)}" alt="" loading="lazy" /></button>`,
              )
              .join('')}${videos
              .map(
                (video) =>
                  // 视频缩略块：点击把主图区换成 <video>（M8 视频素材）
                  `<button type="button" class="vthumb" data-vthumb="${esc(video.url)}" ${video.poster ? `data-vposter="${esc(video.poster)}"` : ''} aria-label="Video"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button>`,
              )
              .join('')}</div>`
          : ''
      }
      ${renderSocialRow()}
      <div class="detail-section">
        <h3>${t('descTitle')}</h3>
        <p>${product.description ? esc(localizedDescription(product)) : t('descEmpty')}</p>
      </div>
      <div class="detail-section">
        <h3>${t('infoTitle')}</h3>
        <div class="spec-list">${spec}</div>
      </div>
      ${renderComplianceSection(compliance)}
    </div>

    <div>
      <div class="buy-panel" id="buy-panel" data-product-id="${product.id}" data-base="${sale}">
        <div class="card-cat">${esc(categoryLabel(product.category))}</div>
        <h1 class="buy-title">${esc(localizedTitle(product))}</h1>
        ${product.title_local ? `<div class="buy-local">${esc(tr(product.title_local, state.lang))}</div>` : ''}
        <div class="buy-price">
          <span class="now" id="price-now">${money(sale)}</span>
          ${list > sale ? `<span class="was">${money(list)}</span><span class="off">-${off}%</span>` : ''}
        </div>
        ${list > sale ? `<div class="buy-save">${t('saveNow', money(list), money(list - sale))}</div>` : `<div class="buy-save">${t('noDiscount')}</div>`}
        ${outOfStock ? `<div class="stock-badge out">${t('stockOut')}</div>` : stock > 0 && stock <= 5 ? `<div class="stock-badge low">${t('stockLow', stock)}</div>` : ''}
        ${outOfStock ? `<div class="oos-note">${t('oosNote')}</div>` : ''}
        <div class="divider"></div>
        ${groups || `<div class="opt-hint">${t('noOptions')}</div>`}
        <div class="divider"></div>
        <div class="summary" id="summary"></div>
        ${qtyRow}
        ${outOfStock ? renderStockNotifyForm(product.id) : ''}
        <div class="buy-actions">
          <button class="btn-primary${outOfStock ? ' is-disabled' : ''}" id="add-cart" type="button" ${outOfStock ? 'disabled' : ''}>${outOfStock ? t('oosBtn') : t('addToCart')}</button>
          <button class="btn-now${outOfStock ? ' is-notify' : ''}" id="buy-now" type="button">${outOfStock ? t('notifyMe') : t('buyNow')}</button>
          <button class="btn-ghost fav-detail${isFav(product.id) ? ' active' : ''}" type="button" data-fav="${esc(product.id)}"
                  aria-pressed="${isFav(product.id) ? 'true' : 'false'}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.9"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 20.4s-7.4-4.6-7.4-9.7A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.4 3.3c0 5.1-7.4 9.7-7.4 9.7z" />
            </svg>
            <span>${isFav(product.id) ? t('favRemove') : t('favAdd')}</span>
          </button>
          <a class="btn-ghost" style="text-align:center;line-height:46px" href="/">${t('keepShopping')}</a>
        </div>
        ${PAY_ICONS_ROW}
        <div class="trust-mini" data-trust-mini data-pid="${esc(product.id)}"></div>
        <div class="ships-from" id="ships-from" data-pid="${esc(product.id)}">${t('shipsFrom')}<b>${esc(compliance.warehouse || t('shipsFromGlobal'))}</b></div>
      </div>
    </div>
  </div>

  ${renderRelated(product)}

  <!-- P2-4 UGC 精选挂载位：必须在 reviews-section 之外（loadReviews 会innerHTML 重写该 section） -->
  <div id="ugc-slot" data-pid="${product.id}"></div>

  <section class="reviews" id="reviews-section" data-pid="${product.id}">
    <div class="skeleton-note">${t('loading')}</div>
  </section>

  <!-- #4 商品问答Q&A：与评价区分离，独立异步挂载（loadQa 只重写自己的 section） -->
  <section class="qa-section" id="qa-section" data-pid="${product.id}">
    <div class="skeleton-note">${t('loading')}</div>
  </section>

  ${renderRecentStrip(product.id)}`
}

/* ------------- 商品与目录模块详情页扩展（2026-10-06） ------------- */

/**
 * P0-5 商品合规字段归一化（G01/G03/G04）。
 *
 * 背景（实测）：合规数据确实在库里，但散落在 products.attributes 里且 key 名极不统一——
 *   Material 6533 件、Fabric/material 2 件、Country/Region of Origin 1 件、Warning 3 件，
 * 而合规区块只认 compliance.material 这类固定键，导致前台几乎全是空行。
 * 这里做「多别名 → 统一字段」的归一化，兼容三种来源：
 *   ① attributes.compliance.{material,origin,care,warnings}（后台规范化写入）
 *   ② attributes 顶层的同名字段
 *   ③ attributes 里各平台抓取留下的别名（Material/Fabric/material、Ctry/Origin…）
 */
const COMPLIANCE_ALIASES = {
  material: ['material', 'materials', 'fabric/material', 'fabric', 'composition', 'fabric composition', '材质', '面料成分'],
  origin: ['origin', 'country/region of origin', 'country of origin', 'made in', '产地', '原产地'],
  care: ['care', 'care instructions', 'washing instruction', 'wash', '洗护', '洗涤说明'],
  warnings: ['warning', 'warnings', 'safety warning', 'caution', '警示', '警告'],
}

/** 键名归一：小写、去空格/下划线/连字符，便于别名匹配 */
const complianceKey = (k) => String(k || '').toLowerCase().replace(/[\s_\-.]+/g, ' ').trim()

function normalizeCompliance(product) {
  let attrs = product?.attributes
  // attributes 可能是 JSON 字符串（PostgREST 有时返回 string）
  if (typeof attrs === 'string') {
    try {
      attrs = JSON.parse(attrs)
    } catch {
      attrs = {}
    }
  }
  if (!attrs || typeof attrs !== 'object') attrs = {}
  const out = {}
  // ① 规范化来源优先（后台写入，字段语义最准）
  const structured = attrs.compliance && typeof attrs.compliance === 'object' ? attrs.compliance : {}
  const bucket = { ...attrs, ...structured }
  for (const [field, aliases] of Object.entries(COMPLIANCE_ALIASES)) {
    const direct = structured[field]
    if (typeof direct === 'string' && direct.trim()) {
      out[field] = direct.trim().slice(0, 300)
      continue
    }
    // ②③ 按别名匹配（大小写/分隔符无关）
    for (const alias of aliases) {
      const target = complianceKey(alias)
      for (const key of Object.keys(bucket)) {
        if (complianceKey(key) !== target) continue
        const value = bucket[key]
        // 属性值可能是字符串，也可能是 [{k,v}] 之类的结构化数组
        const text = typeof value === 'string'
          ? value
          : Array.isArray(value)
            ? value.map((x) => (typeof x === 'string' ? x : `${x?.k ?? x?.name ?? ''}${x?.v ? `: ${x.v}` : ''}`)).filter(Boolean).join('; ')
            : ''
        if (text.trim()) {
          out[field] = text.trim().slice(0, 300)
          break
        }
      }
      if (out[field]) break
    }
  }
  return out
}

/** M7 合规字段展示位：材质/原产地/洗护/警示（有库内数据才渲染对应行）+ 欧盟责任人固定展示 */
// P0-5 合规：欧盟责任人信息（默认展示位；商品 attributes.eu_responsible 可覆盖）
const DEFAULT_EU_RESPONSIBLE = { name: 'MXQ SHOP', contact: 'support@mxqshop.to' }

function renderComplianceSection(compliance) {
  const rows = []
  if (compliance.material) rows.push([t('fMaterial'), compliance.material])
  if (compliance.origin) rows.push([t('fOrigin'), compliance.origin])
  if (compliance.care) rows.push([t('fCare'), compliance.care])
  if (compliance.warnings) rows.push([t('fWarnings'), compliance.warnings])
  const eu = compliance.eu_responsible || DEFAULT_EU_RESPONSIBLE
  const euText = typeof eu === 'string' ? eu : [eu.name, eu.address, eu.contact].filter(Boolean).join(' · ')
  return `
  <div class="detail-section compliance">
    <h3>${t('complianceTitle')}</h3>
    ${rows.length ? `<div class="spec-list">${rows.map(([key, value]) => `<div><b>${esc(key)}</b>：${esc(value)}</div>`).join('')}</div>` : `<p class="compliance-hint">${t('complianceHint')}</p>`}
    <div class="eu-responsible">
      <b>${t('fEuResponsible')}</b>
      <p>${esc(euText)}</p>
    </div>
  </div>`
}

/**
 * P1-4 多仓库存：详情页拉 /api/store/inventory/<id>，渲染发货仓 / 预售 / 多仓时效。
 * 失败静默回退到静态文案（库存信息不是下单前置条件，不能因它挡住购买）。
 */
async function paintShipsFrom(pid) {
  const box = document.getElementById('ships-from')
  if (!box || !pid) return
  try {
    const response = await fetch(apiUrl(`/api/store/inventory/${Number(pid)}`))
    if (!response.ok) return
    const data = await response.json()
    // 渲染期间用户可能已离开该商品
    if (document.getElementById('ships-from') !== box) return

    if (!data.multiWarehouse || !Array.isArray(data.warehouses) || !data.warehouses.length) {
      if (data.preorder) {
        box.innerHTML = `${esc(t('preorderLabel'))}<b>${esc(t('preorderHint'))}</b>`
      }
      return
    }

    const selected = data.selected
    const inStock = data.totalStock > 0
    const lead = selected ? selected.leadTimeDays : 7
    const head = inStock
      ? `${esc(t('shipsFrom'))}<b>${esc(selected?.name || t('shipsFromGlobal'))}</b>`
      : `${esc(t('preorderLabel'))}<b>${esc(t('preorderHint'))}</b>`
    const rows = data.warehouses
      .filter((w) => w.stock > 0 || w.preorderQty > 0)
      .slice(0, 4)
      .map((w) => {
        const qty = w.stock > 0 ? t('warehouseInStock', w.stock) : t('warehousePreorderQty', w.preorderQty)
        const badge = w.stock > 0
          ? `<span class="wh-tag in">${esc(qty)}</span>`
          : `<span class="wh-tag pre">${esc(t('preorderBadge'))}</span>`
        const eta = t('warehouseEta', w.leadTimeDays || lead)
        return `<li><span class="wh-name">${esc(w.name || w.regionLabel || t('shipsFromGlobal'))}</span>${badge}<span class="wh-eta">${esc(eta)}</span></li>`
      })
      .join('')
    box.innerHTML = `${head}<ul class="wh-list">${rows}</ul>`
  } catch {
    /* 静默：保留静态发货仓文案 */
  }
}

/** M6 缺货登记表单（stock=0 时显示） */
function renderStockNotifyForm(productId) {
  return `
  <div class="notify-form" id="notify-form" data-pid="${productId}">
    <label for="notify-email">${t('notifyTitle')}</label>
    <div class="notify-row">
      <input id="notify-email" type="email" autocomplete="email" placeholder="${t('notifyPlaceholder')}" />
      <button type="button" class="lt-apply" id="notify-submit">${t('notifyBtn')}</button>
    </div>
    <div class="notify-msg" id="notify-msg" hidden></div>
  </div>`
}

/** M5 相关推荐：同队（group_id）优先，其次同分类+同品牌，按销量与球队热度排序，取 8 件 */
/**
 * P1-3 搭配购买（Complete the Look）：按互补品类配对，而不是简单再推同款。
 * 球衣 → 球鞋/背包/围巾/球袜…；靴类 → 球袜/护具…；
 * 规则是「品类互补表 + 分类名关键词」，命中失败则回落到相似推荐池。
 */
const COMPLEMENT_RULES = [
  { match: /jersey|kit|shirt|球衣|球衫/i, targets: [/shoe|boot|sneaker|鞋/i, /bag|backpack|包/i, /scarf|cap|hat|帽|围巾/i, /sock|袜/i, /glov|手套/i, /short|shorts|裤/i] },
  { match: /shoe|boot|sneaker|鞋/i, targets: [/sock|袜/i, /bag|backpack|包/i, /insole|垫/i, /clean|清洁|养护/i, /jersey|shirt|衣/i] },
  { match: /bag|backpack|包/i, targets: [/shoe|鞋/i, /cap|hat|帽/i, /scarf|围巾/i, /jersey|shirt|衣/i] },
]

/** 从全量商品里挑互补搭配（最多 4 件），无命中返回空数组 */
function pickComplements(product, limit = 4) {
  const haystack = `${product.title || ''} ${product.category || ''}`
  const rule = COMPLEMENT_RULES.find((item) => item.match.test(haystack))
  if (!rule) return []
  const pool = state.products.filter((item) => {
    if (item.status !== 'online') return false
    if (Number(item.id) === Number(product.id)) return false
    if (Number(item.group_id) && Number(item.group_id) === Number(product.group_id)) return false
    return true
  })
  const text = (item) => `${item.title || ''} ${item.category || ''}`
  const out = []
  const seen = new Set([Number(product.id)])
  for (const target of rule.targets) {
    const hit = pool
      .filter((item) => target.test(text(item)))
      // 优先有货、其次销量高：搭配推荐不能把缺货品推出去
      .sort((a, b) => (Number(b.stock || 0) > 0) - (Number(a.stock || 0) > 0) || (Number(b.sale_count) || 0) - (Number(a.sale_count) || 0))[0]
    if (hit && !seen.has(Number(hit.id))) {
      seen.add(Number(hit.id))
      out.push(hit)
    }
    if (out.length >= limit) break
  }
  return out
}

function renderRelated(product) {
  const pool = state.products.filter((item) => item.status === 'online' && Number(item.id) !== Number(product.id))
  const seen = new Set([Number(product.id)])
  const out = []
  const push = (items) => {
    for (const item of items) {
      if (out.length >= 8) break
      if (seen.has(Number(item.id))) continue
      seen.add(Number(item.id))
      out.push(item)
    }
  }
  push(pool.filter((item) => Number(item.group_id) === Number(product.group_id) && Number(item.group_id) > 0))
  if (out.length < 8) {
    push(
      pool
        .filter((item) => item.category === product.category && item.brand === product.brand)
        .sort((a, b) => (Number(b.sale_count) || 0) - (Number(a.sale_count) || 0)),
    )
  }
  if (out.length < 8) push(pool.filter((item) => item.category === product.category).sort((a, b) => (Number(b.sale_count) || 0) - (Number(a.sale_count) || 0)))
  if (out.length < 4) return ''
  // P1-3 搭配购买：与相似推荐分开成块，避免和「你可能还喜欢」混淆
  const complements = pickComplements(product, 4)
  const complementBlock = complements.length
    ? `
    <section class="related complements">
      <h3>${t('completeTheLook')}</h3>
      <div class="related-row">${complements.map(productCard).join('')}</div>
    </section>`
    : ''
  return `
  <section class="related">
    <h3>${t('relatedTitle')}</h3>
    <div class="related-row">${out.map(productCard).join('')}</div>
  </section>${complementBlock}`
}

/* ------------- M4 商品评价与晒单（客户端） ------------- */

const REVIEWS_CACHE = new Map()
/** 评价表单里待上传的晒图（dataURL，最多 3 张） */
let REVIEW_IMGS = []

function starsHtml(value, { interactive = false } = {}) {
  const full = Math.round(Number(value) || 0)
  if (!interactive) {
    return `<span class="stars" aria-label="${full}/5"><span class="stars-fill" style="width:${(Number(value) || 0) * 20}%">★★★★★</span><span class="stars-bg">★★★★★</span></span>`
  }
  return `<div class="stars-input" role="radiogroup" aria-label="${t('reviewRatingLabel')}">${[1, 2, 3, 4, 5]
    .map((n) => `<button type="button" class="star-btn${n <= full ? ' on' : ''}" data-star="${n}" aria-label="${n}">★</button>`)
    .join('')}</div>`
}

/** 进详情页时调用：拉评价并渲染进 #reviews-section */
async function loadReviews(pid) {
  const section = document.getElementById('reviews-section')
  if (!section || Number(section.dataset.pid) !== Number(pid)) return
  if (REVIEWS_CACHE.has(Number(pid))) {
    paintReviews(section, REVIEWS_CACHE.get(Number(pid)), Number(pid))
    return
  }
  try {
    const response = await fetch(apiUrl(`/api/store/reviews/${Number(pid)}?limit=5`))
    const data = await response.json()
    REVIEWS_CACHE.set(Number(pid), data)
    if (document.getElementById('reviews-section') === section) paintReviews(section, data, Number(pid))
  } catch {
    section.innerHTML = ''
  }
}

function paintReviews(section, data, pid) {
  const { items = [], summary = { count: 0, avg: 0 }, hasMore = false } = data || {}
  const formOpen = section.dataset.formOpen === '1'
  const listHtml = items.length
    ? items
        .map(
          (review) => `
      <div class="review-item">
        <div class="review-head">
          ${starsHtml(review.rating)}
          <b class="review-author">${esc(review.author)}</b>
          <span class="review-date">${esc(String(review.at || '').slice(0, 10))}</span>
        </div>
        ${review.content ? `<p class="review-content">${esc(review.content)}</p>` : ''}
        ${review.images.length ? `<div class="review-imgs">${review.images.map((src) => `<img src="${esc(src)}" alt="" loading="lazy" />`).join('')}</div>` : ''}
      </div>`,
        )
        .join('')
    : `<div class="review-empty">${t('reviewsEmpty')}</div>`
  section.innerHTML = `
    <div class="reviews-head">
      <h3>${t('reviewsTitle')}</h3>
      ${summary.count ? `<span class="reviews-summary">${starsHtml(summary.avg)} <b>${summary.avg}</b> · ${t('reviewsCount', summary.count)}</span>` : ''}
      <button type="button" class="link-btn" id="review-toggle">${formOpen ? t('reviewCancel') : t('reviewWrite')}</button>
    </div>
    <div class="review-form ${formOpen ? '' : 'collapsed'}" id="review-form" data-pid="${pid}">
      <div class="form-row">
        <label>${t('reviewRatingLabel')}<i>*</i></label>
        ${starsHtml(REVIEW_RATING, { interactive: true })}
      </div>
      <div class="form-row">
        <label for="review-name">${t('reviewName')}</label>
        <input id="review-name" maxlength="40" placeholder="${t('reviewNamePh')}" autocomplete="name" />
      </div>
      <div class="form-row">
        <label for="review-email">${t('reviewEmail')}</label>
        <input id="review-email" type="email" maxlength="120" placeholder="${t('reviewEmailPh')}" autocomplete="email" />
      </div>
      <div class="form-row">
        <label for="review-content">${t('reviewContent')}<i>*</i></label>
        <textarea id="review-content" rows="4" maxlength="1000" placeholder="${t('reviewContentPh')}"></textarea>
      </div>
      <div class="form-row">
        <label>${t('reviewImages')}</label>
        <div class="review-upload">
          <div class="review-thumbs" id="review-thumbs">${REVIEW_IMGS.map((src, index) => `<span class="review-thumb"><img src="${src}" alt="" /><button type="button" data-rimg="${index}" aria-label="${t('reviewRemove')}">✕</button></span>`).join('')}</div>
          ${REVIEW_IMGS.length < 3 ? `<button type="button" class="review-add" id="review-add">＋ ${t('reviewAddPhoto')}</button>` : ''}
          <input type="file" id="review-file" accept="image/png,image/jpeg,image/webp" multiple hidden />
        </div>
      </div>
      <div class="notify-msg" id="review-msg" hidden></div>
      <button type="button" class="btn-primary review-submit" id="review-submit">${t('reviewSubmit')}</button>
      <p class="review-note">${t('reviewNote')}</p>
    </div>
    <div class="review-list">${listHtml}</div>
    ${hasMore ? `<button type="button" class="link-btn review-more" id="review-more">${t('reviewsSeeMore')}</button>` : ''}`
}

let REVIEW_RATING = 5

async function submitReview() {
  const form = document.getElementById('review-form')
  const msg = document.getElementById('review-msg')
  const pid = Number(form?.dataset.pid)
  const content = document.getElementById('review-content')?.value.trim() || ''
  const name = document.getElementById('review-name')?.value.trim() || ''
  const email = document.getElementById('review-email')?.value.trim() || ''
  const showMsg = (text, bad = false) => {
    if (!msg) return
    msg.hidden = false
    msg.textContent = text
    msg.classList.toggle('bad', bad)
  }
  if (!pid || !Number.isInteger(REVIEW_RATING) || REVIEW_RATING < 1 || content.length < 10) {
    showMsg(t('reviewBadContent'), true)
    return
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    showMsg(t('reviewBadEmail'), true)
    return
  }
  const btn = document.getElementById('review-submit')
  if (btn) btn.disabled = true
  try {
    const response = await fetch(apiUrl('/api/store/reviews'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId: pid, rating: REVIEW_RATING, name, email, content, images: REVIEW_IMGS }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      showMsg(data.error === 'already reviewed' ? t('reviewDup') : t('reviewFail'), true)
      return
    }
    track('review_submit', String(pid))
    showMsg(data.status === 'approved' ? t('reviewOkApproved') : t('reviewOkPending'))
    REVIEWS_CACHE.delete(pid)
    REVIEW_IMGS = []
    REVIEW_RATING = 5
    setTimeout(() => loadReviews(pid), 1200)
  } catch {
    showMsg(t('reviewFail'), true)
  } finally {
    if (btn) btn.disabled = false
  }
}

/** 晒图选择：读成 dataURL（单张 ≤2MB，服务端上限 2.5MB），最多 3 张。
 *  就地更新缩略图区，不整表重绘——整绘会把用户已填的评分/文字清掉。 */
function pickReviewImages(files) {
  const list = [...(files || [])].filter((file) => /^image\/(png|jpeg|webp)$/.test(file.type) && file.size <= 2 * 1024 * 1024)
  if (!list.length) {
    toast(t('reviewBadImage'))
    return
  }
  for (const file of list) {
    if (REVIEW_IMGS.length >= 3) break
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== 'string' || REVIEW_IMGS.length >= 3) return
      REVIEW_IMGS.push(reader.result)
      syncReviewThumbs()
    }
    reader.readAsDataURL(file)
  }
}

function syncReviewThumbs() {
  const box = document.getElementById('review-thumbs')
  if (box) {
    box.innerHTML = REVIEW_IMGS.map(
      (src, index) => `<span class="review-thumb"><img src="${src}" alt="" /><button type="button" data-rimg="${index}" aria-label="${t('reviewRemove')}">✕</button></span>`,
    ).join('')
  }
  const addBtn = document.getElementById('review-add')
  if (addBtn && REVIEW_IMGS.length >= 3) addBtn.remove()
}

/** 详情页数量输入当前值（1~99） */
function detailQty() {
  const value = Number($('detail-qty')?.textContent)
  return Math.max(1, Math.min(99, Number.isFinite(value) && value > 0 ? value : 1))
}

/** 商品库存（未登记或 ≤0 视为不限，返回 0） */
function readStock(product) {
  const stock = Number(product?.stock)
  return Number.isFinite(stock) && stock > 0 ? stock : 0
}

/**
 * 详情页底部的「最近浏览」横滑条。
 * 少于 2 件就不渲染 —— 只有当前商品自己的话没有任何浏览价值。
 */
/**
 * P2-4 UGC 精选（顾客晒单 / 社媒内容）
 *
 * 背景：后台有「UGC 精选」管理界面、数据库有 ugc_posts 表，但此前既无接口也无前台展示，
 *运营录了内容也不会显示——这里补齐「接口（server.js /marketing/ugc）+ 前台组件」。
 *
 * 合规 C06：只展示运营已审核入库的内容；作者名做脱敏提示（运营自行填写时处理）。
 * 加载失败静默隐藏——UGC 是加分项，不能影响购物主流程。
 */
function renderUgcStrip(posts) {
  const list = Array.isArray(posts) ? posts : []
  if (list.length < 1) return ''
  const PLATFORM_ICON = {
    instagram: '📷', facebook: '👍', whatsapp: '💬', tiktok: '🎵',
    telegram: '✈️', x: '✖️', snapchat: '👻', pinterest: '📌',
  }
  const cards = list
    .map((post) => {
      const icon = PLATFORM_ICON[post.platform] || '💬'
      const text = String(post.content || '').slice(0, 220)
      const url = post.url ? String(post.url) : ''
      //卡片整体可点，但不能是<a> 套<a>（HTML 解析器会强制拆开嵌套 a，
      // 导致卡片结构碎裂）。所以卡片用 <a>（有 url 时）/"无链接用 div，
      // 内部「查看原文」改用 span + data-href，由事件委托统一跳转。
      const inner = `
        ${post.image ? `<img class="ugc-img" src="${esc(post.image)}" alt="" loading="lazy" decoding="async" />` : ''}
        <div class="ugc-body">
          <span class="ugc-meta"><b>${icon} ${esc(post.author || 'Customer')}</b></span>
          ${text ? `<p class="ugc-text">${esc(text)}</p>` : ''}
          ${url ? `<span class="ugc-link" data-ugc-href="${esc(url)}">${esc(t('ugcViewOriginal'))} →</span>` : ''}
        </div>`
      const hrefAttr = ` href="${esc(url)}" target="_blank" rel="noopener nofollow"`
      return url
        ? `<a class="ugc-card"${hrefAttr}>${inner}</a>`
        : `<div class="ugc-card">${inner}</div>`
    })
    .join('')
  return `
  <section class="ugc-strip" aria-label="${esc(t('ugcTitle'))}">
    <h3>${esc(t('ugcTitle'))}</h3>
    <div class="ugc-row">${cards}</div>
  </section>`
}

/** 拉取并渲染 UGC（详情页按商品取，无商品则取全站精选） */
async function mountUgc(pid) {
  const slot = document.getElementById('ugc-slot')
  if (!slot) return
  try {
    const query = pid ? `?productId=${Number(pid)}&limit=6` : '?limit=8'
    const response = await fetch(apiUrl(`/api/store/marketing/ugc${query}`))
    if (!response.ok) return
    const data = await response.json()
    if (document.getElementById('ugc-slot') !== slot) return
    slot.innerHTML = renderUgcStrip(data.posts)
  } catch {
    /* 静默：UGC 不可用不影响购买 */
  }
}
function renderRecentStrip(currentId) {
  const ids = state.recent.filter((id) => id !== Number(currentId)).slice(0, 8)
  const items = ids.map((id) => state.products.find((product) => Number(product.id) === id)).filter(Boolean)
  if (items.length < 2) return ''
  return `
  <section class="recent-strip">
    <div class="recent-head">
      <h3>${t('recentTitle')}</h3>
      <button type="button" class="link-btn" id="recent-clear">${t('recentClear')}</button>
    </div>
    <div class="recent-row">${items.map(productCard).join('')}</div>
  </section>`
}

/** 详情页价格面板：随选择实时重算 */
function selectionFromDom() {
  const panel = $('buy-panel')
  if (!panel) return { picks: {}, inputs: {} }
  const picks = {}
  panel.querySelectorAll('.opt-pill.active, .opt-card.active').forEach((node) => {
    picks[node.dataset.pick] = node.dataset.label
  })
  const inputs = {}
  panel.querySelectorAll('input[data-customize]').forEach((input) => {
    const group = input.dataset.customize
    inputs[group] = inputs[group] || {}
    inputs[group][input.dataset.item] = input.value
  })
  return { picks, inputs }
}

function refreshSummary(product) {
  const panel = $('buy-panel')
  const summary = $('summary')
  if (!panel || !summary) return
  const options = normalizeOptions(product.options)
  const selection = selectionFromDom()
  const base = Number(panel.dataset.base) || 0
  const result = priceOf(base, options, selection)

  summary.innerHTML = `
    <div class="summary-row"><span>${t('summaryBase')}</span><span>${money(result.base)}</span></div>
    ${result.addons
      .map(
        (line) =>
          `<div class="summary-row"><span>${esc(line.group)} · ${esc(line.label)}${line.input ? `（${esc(line.input)}）` : ''}</span><span>+${money(line.price)}</span></div>`,
      )
      .join('')}
    ${result.addons.length ? '' : `<div class="summary-row"><span>${t('summaryAddon')}</span><span>+${money(0)}</span></div>`}
    <div class="summary-row total"><span>${t('summaryTotal')}</span><span class="summary-total-price">${money(result.total)}</span></div>`

  $('price-now').textContent = money(result.total)
}

/** 单行购物车商品（抽屉与整页购物车共用） */
function cartLine(item, index, { compact = false } = {}) {
  const qty = Math.max(1, Number(item.qty) || 1)
  return `
    <div class="cart-item${compact ? ' compact' : ''}">
      <img src="${esc(imageUrl(item.image, 200))}" alt="" loading="lazy" />
      <div class="cart-item-body">
        <div class="t">${esc(tr(item.title, state.lang))}</div>
        <div class="o">${item.optionsText ? esc(item.optionsText) : t('defaultSpec')}</div>
        ${(item.patches || []).length
          ? `<div class="patch-row">${item.patches
              .map(
                (p) => `
          <span class="patch-chip"><img src="${esc(imageUrl(p.image, 120))}" alt="${esc(p.label || 'patch')}" loading="lazy" />${p.label ? `<span class="patch-chip-label">${esc(p.label)}</span>` : ''}</span>`,
              )
              .join('')}</div>`
          : ''}
        <div class="cart-item-foot">
          <span class="p">${money(item.total * qty)}</span>
          <span class="qty-stepper">
            <button type="button" class="qty-btn" data-qty-minus="${index}" aria-label="-">−</button>
            <span class="qty-value">${qty}</span>
            <button type="button" class="qty-btn" data-qty-plus="${index}" aria-label="+">+</button>
          </span>
        </div>
        <button type="button" class="link-btn danger" data-remove="${index}">${t('removeItem')}</button>
      </div>
    </div>`
}

function renderCartBadge() {
  $('cart-count').textContent = String(cartCount())
}

/** 抽屉版购物车：保留原有的「加购后可立刻看到」体验，补上数量与结算入口 */
function renderCart() {
  const body = $('cart-body')
  const foot = $('cart-foot')
  if (!state.cart.length) {
    body.innerHTML = `<div class="empty-note">${t('cartEmpty')}</div>`
    foot.innerHTML = ''
    return
  }
  body.innerHTML = state.cart.map((item, index) => cartLine(item, index, { compact: true })).join('')
  foot.innerHTML = `
    <div class="summary-row"><span>${t('subtotal')}</span><span>${money(cartSubtotal())}</span></div>
    <div class="cart-foot-actions">
      <button class="btn-ghost" style="width:100%" id="view-cart" type="button">${t('viewCart')}</button>
      <button class="btn-primary" style="width:100%" id="checkout" type="button">${t('goCheckout')}</button>
    </div>`
}

/* ------------------------------ 整页购物车 ------------------------------ */

function renderCartPage() {
  if (!state.cart.length) {
    return `<div class="empty-note big">${t('checkoutEmpty')}<br /><a class="link-btn" href="/">${t('continueShopping')}</a></div>`
  }
  const lines = state.cart.map((item, index) => cartLine(item, index)).join('')
  return `
    <h1 class="page-title">${t('cartTitle')}</h1>
    <div class="checkout-grid">
      <div class="checkout-main">
        <div class="panel">${lines}</div>
        <a class="link-btn" href="/">← ${t('continueShopping')}</a>
      </div>
      <aside class="checkout-side">
        <div class="panel">
          <div class="panel-title">${t('orderSummary')}</div>
          <div class="summary-row"><span>${t('cartCountItems', cartCount())}</span><span>${money(cartSubtotal())}</span></div>
          <div class="summary-row"><span>${t('shippingFee')}</span><span class="muted">${t('selectShippingHint')}</span></div>
          <div class="summary-row total"><span>${t('subtotal')}</span><span class="summary-total-price">${money(cartSubtotal())}</span></div>
          <button class="btn-primary" style="width:100%;margin-top:12px" id="checkout" type="button">${t('goCheckout')}</button>
          <a class="link-btn" style="margin-top:8px;display:block;text-align:center" href="/giftcard" data-nav>${t('giftCardPageTitle')} →</a>
          <p class="fine-print">${t('secureNote')}</p>
        </div>
      </aside>
    </div>`
}

/* ------------------------------ 我的收藏 ------------------------------ */

/**
 * 收藏页。收藏存的是商品 id（localStorage），所以商品下架后这条记录不会自动消失 ——
 * 这里用 find 过滤，找不到的 id 直接跳过，不会渲染出空卡片。
 */
/** 收藏页增强：现价对比（降价徽章）+ 分享 + 降价提醒 + 到货提醒（缺货商品） */
function favPriceSnapshot() {
  try {
    return JSON.parse(localStorage.getItem('mxq_fav_prices') || '{}')
  } catch {
    return {}
  }
}
function saveFavPriceSnapshot(map) {
  try {
    localStorage.setItem('mxq_fav_prices', JSON.stringify(map))
  } catch { /* 存不下就算了 */ }
}

function renderFavoritesPage() {
  const items = state.favs.map((id) => state.products.find((product) => Number(product.id) === Number(id))).filter(Boolean)
  if (!items.length) {
    return `<div class="empty-note big">${t('favEmpty')}<br /><a class="link-btn" href="/">${t('continueShopping')}</a></div>`
  }
  // 价格快照：记录收藏时见过的最低展示价，用于「降价了」徽章
  const snapshot = favPriceSnapshot()
  const nextSnapshot = { ...snapshot }
  const rows = items
    .map((product) => {
      const price = salePriceOf(product)
      const seen = Number(snapshot[product.id]) || 0
      // 快照只降不升（记录见过的最低价），降价判定 = 现价 < 快照
      if (!seen || price < seen) nextSnapshot[product.id] = price
      const dropped = seen > 0 && price < seen
      const outOfStock = Number(product.stock) === 0
      const img = (productImages(product, 400)[0] || '')
      return `
      <div class="fav-row" data-fav-id="${product.id}">
        <a class="fav-thumb" href="/p/${product.id}">${img ? `<img src="${esc(img)}" alt="${esc(localizedTitle(product))}" loading="lazy" />` : ''}</a>
        <div class="fav-info">
          <a class="fav-title" href="/p/${product.id}">${esc(localizedTitle(product))}</a>
          <div class="fav-price">
            <b>${money(price)}</b>
            ${dropped ? `<span class="tag-drop">${t('favPriceDropBadge')}</span>` : ''}
            ${outOfStock ? `<span class="muted small">${t('stockOut')}</span>` : ''}
          </div>
          <div class="fav-actions">
            <button type="button" class="btn-ghost" data-fav-share="${product.id}" data-fav-url="/p/${product.id}">${t('favShare')}</button>
            ${outOfStock
              ? `<button type="button" class="btn-ghost" data-fav-restock="${product.id}">${t('favRestockAlert')}</button>`
              : `<button type="button" class="btn-ghost" data-fav-pricealert="${product.id}" data-fav-price="${price}">${t('favPriceAlert')}</button>`}
          </div>
          <div class="notify-msg" data-fav-msg="${product.id}" hidden></div>
        </div>
      </div>`
    })
    .join('')
  saveFavPriceSnapshot(nextSnapshot)
  return `
    <h1 class="page-title">${t('favTitle')} <small class="muted">${t('favCount', items.length)}</small></h1>
    <div class="fav-list">${rows}</div>`
}

/* ============================================================
 * #8 心愿单跨设备同步 + 订阅
 * 现状：收藏（FAV_KEY）只存localStorage，换设备看不到。
 * 这里加一层服务端同步（wishlists / wishlist_items），登录后跨设备一致；
 * 未登录时用 guest token（下单时的浏览器凭据）兜底。
 * 每条收藏可带订阅设置：降价到目标价提醒 + 到货通知 + 通知周期（即时/每日/每周）。
 * ============================================================ */
const WISHLIST_CACHE = { at: 0, data: null, inflight: null }

const wlLabel = (zh, en) => (isZh(state.lang) ? zh : en)

/** 拉心愿单（5 秒内复用，避免收藏页反复请求） */
async function loadWishlist({ force = false } = {}) {
  if (!force && WISHLIST_CACHE.data && Date.now() - WISHLIST_CACHE.at < 5000) return WISHLIST_CACHE.data
  if (WISHLIST_CACHE.inflight) return WISHLIST_CACHE.inflight
  const query = guestTokenForWishlist() ? `?token=${encodeURIComponent(guestTokenForWishlist())}` : ''
  WISHLIST_CACHE.inflight = apiJson(`/wishlist${query}`)
    .then((data) => {
      WISHLIST_CACHE.at = Date.now()
      WISHLIST_CACHE.data = data?.wishlist || null
      return WISHLIST_CACHE.data
    })
    .catch(() => null)
    .finally(() => {
      WISHLIST_CACHE.inflight = null
    })
  return WISHLIST_CACHE.inflight
}

/** 拿一个可用于心愿单的凭据：登录用户走会话，未登录回落到最近一笔订单的 guest token */
function guestTokenForWishlist() {
  const first = state.favs.map((id) => guestTokenFor(String(state.orders?.[0]?.orderNo || ''))).find(Boolean)
  return first || guestTokenFor('') || ''
}

/** 把 localStorage 收藏一次性同步到服务端（登录后调用），随后清掉本地副本避免重复 */
async function syncWishlistFromLocal() {
  const localIds = readIdList(FAV_KEY)
  if (!localIds.length) return { moved: 0 }
  const query = guestTokenForWishlist() ? `?token=${encodeURIComponent(guestTokenForWishlist())}` : ''
  let moved = 0
  for (const pid of localIds.slice(0, 60)) {
    try {
      const product = state.products.find((p) => Number(p.id) === Number(pid))
      const res = await fetch(apiUrl('/api/store/wishlist/items'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          productId: Number(pid),
          seenPriceUsd: product ? Number(product.sale_price ?? product.price_usd ?? 0) || null : null,
          notifyOnPriceDrop: true,
          notifyOnRestock: true,
          notifyDigest: 'instant',
          guestToken: guestTokenForWishlist(),
        }),
      })
      if (res.ok) moved += 1
    } catch {
      /* 单条失败不阻断整批 */
    }
  }
  if (moved > 0) {
    try {
      localStorage.removeItem(FAV_KEY)
    } catch {}
    state.favs = []
    renderFavBadge()
  }
  WISHLIST_CACHE.at = 0
  return { moved }
}

/** 心愿单订阅设置面板（单条商品的订阅配置） */
function renderWishlistSubscribeRow(productId) {
  const entry = (WISHLIST_CACHE.data?.items || []).find((i) => Number(i.productId) === Number(productId))
  const target = entry?.targetPriceUsd || ''
  const digest = entry?.notifyDigest || 'instant'
  const product = state.products.find((p) => Number(p.id) === Number(productId))
  const price = product ? Number(product.sale_price ?? product.price_usd ?? 0) : 0
  return `
    <div class="wl-sub" data-wl-sub="${productId}">
      <button type="button" class="btn-ghost wl-sub-toggle" data-wl-toggle="${productId}">
        ${entry ? wlLabel('已订阅 · 点击修改', 'Subscribed · edit') : wlLabel('降价/到货提醒', 'Price & restock alerts')}
      </button>
      <div class="wl-sub-panel" ${entry ? '' : 'hidden'}>
        <label class="wl-sub-row">
          <span>${wlLabel('目标价', 'Target price')}</span>
          <input type="number" step="0.01" min="0" placeholder="${price ? price.toFixed(2) : '0.00'}"
                 data-wl-target="${productId}" value="${target}" />
        </label>
        <label class="wl-sub-row">
          <span>${wlLabel('通知方式', 'Notify')}</span>
          <select data-wl-digest="${productId}">
            <option value="instant" ${digest === 'instant' ? 'selected' : ''}>${wlLabel('即时', 'Instant')}</option>
            <option value="daily" ${digest === 'daily' ? 'selected' : ''}>${wlLabel('每日汇总', 'Daily digest')}</option>
            <option value="weekly" ${digest === 'weekly' ? 'selected' : ''}>${wlLabel('每周汇总', 'Weekly digest')}</option>
          </select>
        </label>
        <label class="wl-sub-row">
          <span>${wlLabel('缺货到货提醒', 'Restock alert')}</span>
          <input type="checkbox" data-wl-restock="${productId}" ${entry?.notifyOnRestock !== false ? 'checked' : ''} />
        </label>
        <div class="wl-sub-actions">
          <button type="button" class="btn-primary" data-wl-save="${productId}">${wlLabel('保存订阅', 'Save')}</button>
          ${entry ? `<button type="button" class="link-btn danger" data-wl-unsub="${productId}">${wlLabel('取消订阅', 'Unsubscribe')}</button>` : ''}
          <span class="qa-form-note" data-wl-msg="${productId}" role="status" aria-live="polite"></span>
        </div>
      </div>
    </div>`
  }

/** 保存订阅设置 */
async function saveWishlistSubscription(productId) {
  const msg = document.querySelector(`[data-wl-msg="${productId}"]`)
  const targetRaw = document.querySelector(`[data-wl-target="${productId}"]`)?.value
  const digest = document.querySelector(`[data-wl-digest="${productId}"]`)?.value || 'instant'
  const restock = !!document.querySelector(`[data-wl-restock="${productId}"]`)?.checked
  if (msg) msg.textContent = wlLabel('保存中…', 'Saving…')
  try {
    const res = await fetch(apiUrl('/api/store/wishlist/items'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        productId: Number(productId),
        targetPriceUsd: targetRaw === '' ? null : Number(targetRaw),
        notifyDigest: digest,
        notifyOnRestock: restock,
        notifyOnPriceDrop: true,
        guestToken: guestTokenForWishlist(),
      }),
    })
    WISHLIST_CACHE.at = 0
    await loadWishlist({ force: true })
    if (msg) {
      msg.textContent = res.ok
        ? wlLabel('已保存订阅', 'Subscription saved')
        : wlLabel('保存失败，请稍后再试', 'Failed to save — try later')
    }
    if (res.ok) {
      const panel = document.querySelector(`[data-wl-sub="${productId}"] .wl-sub-panel`)
      if (panel) panel.hidden = false
      const btn = document.querySelector(`[data-wl-toggle="${productId}"]`)
      if (btn) btn.textContent = wlLabel('已订阅 · 点击修改', 'Subscribed · edit')
    }
  } catch {
    if (msg) msg.textContent = wlLabel('保存失败，请稍后再试', 'Failed to save — try later')
  }
}

/** 取消订阅（移出心愿单） */
async function removeWishlistItem(productId) {
  const msg = document.querySelector(`[data-wl-msg="${productId}"]`)
  const query = guestTokenForWishlist() ? `?token=${encodeURIComponent(guestTokenForWishlist())}` : ''
  try {
    await fetch(apiUrl(`/api/store/wishlist/items/${Number(productId)}${query}`), { method: 'DELETE' })
    WISHLIST_CACHE.at = 0
    await loadWishlist({ force: true })
    await toggleFav(productId)
    if (msg) msg.textContent = wlLabel('已取消', 'Removed')
  } catch {
    if (msg) msg.textContent = wlLabel('操作失败', 'Failed')
  }
}

/** #8 公开分享的心愿单（只读，无需登录） */
async function renderSharedWishlist(code) {
  const box = document.getElementById('wl-shared-page')
  if (!box) return
  try {
    const data = await apiJson(`/wishlist/shared/${encodeURIComponent(code)}`)
    const items = Array.isArray(data?.wishlist?.items) ? data.wishlist.items : []
    const products = items
      .map((it) => state.products.find((p) => Number(p.id) === Number(it.productId)))
      .filter(Boolean)
    box.innerHTML = `
      <h1 class="page-title">${wlLabel('心愿单', 'Wishlist')} · ${esc(data?.wishlist?.name || '')}</h1>
      ${
        products.length
          ? `<div class="grid">${products.map((p) => productCard(p)).join('')}</div>`
          : `<div class="empty-note">${wlLabel('这份心愿单还没有商品', 'This wishlist has no items yet')}</div>`
      }`
  } catch (error) {
    box.innerHTML = `<div class="empty-note big">${esc(error?.message || wlLabel('分享链接无效或已关闭', 'Invalid or closed share link'))}</div>`
  }
}

/** 心愿单同步状态条（收藏页顶部） */
function renderWishlistSyncBar() {
  const data = WISHLIST_CACHE.data
  const synced = !!data?.synced
  const count = data?.items?.length || 0
  return `
    <div class="wl-bar" id="wl-bar" data-share="${esc(data?.shareCode || '')}">
      <div class="wl-bar-text">
        <b>${synced ? wlLabel('心愿单已同步', 'Wishlist synced') : wlLabel('心愿单仅保存在本设备', 'Saved on this device only')}</b>
        <span class="muted">${
          synced
            ? wlLabel('登录后可在任意设备查看与订阅', 'Sign in to view and subscribe from any device')
            : wlLabel('登录后自动跨设备同步', 'Sign in to sync across devices')
        }</span>
      </div>
      <div class="wl-bar-actions">
        ${count ? `<span class="wl-count">${wlLabel(`${count} 件订阅`, `${count} subscribed`)}</span>` : ''}
        <button type="button" class="btn-ghost" id="wl-sync-now">${wlLabel('立即同步', 'Sync now')}</button>
        <button type="button" class="btn-ghost" id="wl-share">${
          data?.shareCode ? wlLabel('分享心愿单', 'Share') : wlLabel('生成分享链接', 'Create share link')
        }</button>
      </div>
      <div class="wl-share-out" id="wl-share-out" hidden></div>
    </div>`
}

/* ============================== 账号中心（U 系列 2026-10-07） ==============================
 * /account 页面：安全中心 / 地址簿 / 会员与积分 / 降价提醒 四个 tab。
 * 数据全部走 /api/store/* 新端点；未登录直接弹登录框。
 * ------------------------------------------------------------------ */

const ACCT_TABS = [
  ['security', 'acctTabSecurity'],
  ['addresses', 'acctTabAddresses'],
  ['loyalty', 'acctTabLoyalty'],
  ['alerts', 'acctTabAlerts'],
]

function renderAccountPage(tab) {
  if (!state.customer) {
    $('account-page').innerHTML = `<div class="empty-note big">${t('loginForOrders')}</div>`
    openAuthModal()
    return
  }
  const active = ACCT_TABS.some(([key]) => key === tab) ? tab : 'security'
  const customer = state.customer
  $('account-page').innerHTML = `
    <div class="acct-page-head">
      <div class="acct-avatar">${esc(String(customer.account || '?').replace(/^\+/, '').charAt(0).toUpperCase())}</div>
      <div>
        <h1 class="page-title">${esc(customer.account)}</h1>
        <div class="muted">${customer.tier ? `${esc(tierName(customer.tier))} · ` : ''}${Number(customer.pointsBalance) || 0} ${t('loyaltyBalance')}</div>
      </div>
    </div>
    <div class="account-tabs" role="tablist">
      ${ACCT_TABS.map(([key, label]) => `<button type="button" class="account-tab${key === active ? ' active' : ''}" data-acct-tab="${key}">${t(label)}</button>`).join('')}
    </div>
    <div class="account-panel" id="account-panel"><div class="muted">${t('loading')}</div></div>`
  loadAcctPanel(active)
}

function tierName(key) {
  const map = { bronze: 'Bronze 青铜', silver: 'Silver 白银', gold: 'Gold 黄金', platinum: 'Platinum 铂金' }
  return map[key] || key
}

function switchAcctTab(tab) {
  document.querySelectorAll('.account-tab').forEach((node) => node.classList.toggle('active', node.dataset.acctTab === tab))
  const panel = $('account-panel')
  if (panel) panel.innerHTML = `<div class="muted">${t('loading')}</div>`
  history.replaceState(null, '', `/account/${tab}`)
  loadAcctPanel(tab)
}

function loadAcctPanel(tab) {
  if (tab === 'security') return loadSecPanel()
  if (tab === 'addresses') return loadAddrPanel()
  if (tab === 'loyalty') return loadLoyaltyPanel()
  if (tab === 'alerts') return loadAlertsPanel()
}

/* ---------- 安全中心 ---------- */
async function loadSecPanel() {
  const panel = $('account-panel')
  if (!panel) return
  const customer = state.customer
  panel.innerHTML = `
    <section class="u-card">
      <h3>${t('secChangePw')}</h3>
      <form id="u-pw-form" class="u-form" novalidate>
        <input type="password" name="currentPassword" placeholder="${t('secCurrentPw')}" autocomplete="current-password" required />
        <input type="password" name="newPassword" placeholder="${t('secNewPw')} — ${t('secPwPolicy')}" autocomplete="new-password" required />
        <div class="form-msg" id="u-pw-msg" hidden></div>
        <button class="btn-primary" type="submit">${t('secChangePw')}</button>
      </form>
    </section>
    <section class="u-card">
      <h3>${t('sec2faTitle')}</h3>
      <div id="u-2fa-box">${customer.has2fa
        ? `<p class="ok-note">✓ ${t('sec2faOn')}</p><button class="btn-ghost" data-u2fa="disable">${t('sec2faDisable')}</button>`
        : `<p class="muted">${t('sec2faOff')}</p><button class="btn-primary" data-u2fa="setup">${t('sec2faSetup')}</button>`}</div>
      <div id="u-2fa-setup" hidden></div>
    </section>
    <section class="u-card">
      <h3>${t('secDevices')}</h3>
      <div id="u-devices" class="muted">${t('loading')}</div>
    </section>
    <section class="u-card">
      <h3>${t('secHistory')}</h3>
      <div id="u-history" class="muted">${t('loading')}</div>
    </section>`

  // 密码表单
  $('u-pw-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    try {
      await postJson('/api/store/auth/change-password', {
        currentPassword: form.currentPassword.value,
        newPassword: form.newPassword.value,
      })
      showMsg('u-pw-msg', '✓ OK', 'ok')
      form.reset()
    } catch (error) {
      showMsg('u-pw-msg', String(error?.message || error))
    }
  })

  // 2FA
  const box = $('u-2fa-box')
  box.querySelectorAll('[data-u2fa]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      if (btn.dataset.u2fa === 'disable') {
        const password = window.prompt(t('sec2faPwFallback') + ' — ' + t('secCurrentPw'))
        if (password == null) return
        try {
          await postJson('/api/store/auth/totp/disable', { password })
          state.customer.has2fa = false
          loadSecPanel()
        } catch (error) {
          toast(String(error?.message || error), 'warn')
        }
        return
      }
      // setup：生成密钥 → 渲染 QR + 手动密钥 + 验证码输入
      try {
        const data = await postJson('/api/store/auth/totp/setup', {})
        const setup = $('u-2fa-setup')
        setup.hidden = false
        setup.innerHTML = `
          <p>${t('sec2faScan')}</p>
          <div class="u-qr" id="u-2fa-qr"></div>
          <p class="mono selectable">${t('sec2faSecret')}: <b>${esc(data.secret)}</b></p>
          <form id="u-2fa-form" class="u-form" novalidate>
            <input inputmode="numeric" maxlength="6" name="code" placeholder="${t('sec2faCode')}" autocomplete="one-time-code" required />
            <div class="form-msg" id="u-2fa-msg" hidden></div>
            <button class="btn-primary" type="submit">${t('sec2faConfirm')}</button>
          </form>`
        // vendor qrcode-generator 画 otpauth 二维码
        try {
          const qr = window.qrcode(0, 'M')
          qr.addData(data.otpauth)
          qr.make()
          const cell = 4
          const count = qr.getModuleCount()
          const canvas = document.createElement('canvas')
          canvas.width = canvas.height = count * cell + 16
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#fff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = '#111318'
          for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
              if (qr.isDark(r, c)) ctx.fillRect(c * cell + 8, r * cell + 8, cell, cell)
            }
          }
          $('u-2fa-qr').appendChild(canvas)
        } catch { /* QR 失败时用户可手动输入密钥 */ }
        $('u-2fa-form').addEventListener('submit', async (event) => {
          event.preventDefault()
          try {
            await postJson('/api/store/auth/totp/enable', { code: event.currentTarget.code.value })
            state.customer.has2fa = true
            toast('✓ ' + t('sec2faTitle'), 'success')
            loadSecPanel()
          } catch (error) {
            showMsg('u-2fa-msg', String(error?.message || error))
          }
        })
      } catch (error) {
        toast(String(error?.message || error), 'warn')
      }
    }),
  )

  // 设备列表
  try {
    const data = await apiJson('/auth/sessions')
    const list = Array.isArray(data.sessions) ? data.sessions : []
    const active = list.filter((s) => !s.revokedAt)
    $('u-devices').innerHTML = active.length
      ? active
          .map(
            (s) => `
        <div class="session-row">
          <div>
            <b>${esc(s.device || '—')}</b> ${s.current ? `<span class="tag-current">${t('secCurrentDevice')}</span>` : ''}
            <div class="muted small">${esc(s.ip || '')} · ${esc(shortDate(s.createdAt))} · ${esc(shortDate(s.lastSeenAt))}</div>
          </div>
          <button type="button" class="btn-ghost danger" data-revoke="${s.id}" ${s.current ? 'data-current="1"' : ''}>${t('secRevoke')}</button>
        </div>`,
          )
          .join('')
      : `<div class="muted">${t('secNoDevices')}</div>`
    $('u-devices').querySelectorAll('[data-revoke]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        try {
          const res = await postJson('/api/store/auth/sessions/revoke', { id: Number(btn.dataset.revoke) })
          if (res.loggedOutCurrent) {
            state.customer = null
            renderAccountButton()
            renderAccountPage('')
            toast(t('loggedOut'))
            return
          }
          loadSecPanel()
        } catch (error) {
          toast(String(error?.message || error), 'warn')
        }
      }),
    )
  } catch (error) {
    $('u-devices').innerHTML = `<div class="muted">${esc(error?.message || '')}</div>`
  }

  // 登录历史
  try {
    const data = await apiJson('/auth/login-history')
    const list = Array.isArray(data.history) ? data.history : []
    $('u-history').innerHTML = list.length
      ? list
          .map(
            (h) => `
        <div class="session-row">
          <div>
            <b>${esc(h.device || '—')}</b> ${h.newDevice ? `<span class="tag-new">${t('secNewDeviceFlag')}</span>` : ''}
            <div class="muted small">${esc(h.ip || '')} · ${esc(shortDate(h.at))}</div>
          </div>
        </div>`,
          )
          .join('')
      : `<div class="muted">${t('secHistoryEmpty')}</div>`
  } catch (error) {
    $('u-history').innerHTML = `<div class="muted">${esc(error?.message || '')}</div>`
  }
}

/* ---------- 地址簿 ---------- */
async function loadAddrPanel() {
  const panel = $('account-panel')
  if (!panel) return
  panel.innerHTML = `
    <section class="u-card">
      <div class="u-card-head">
        <h3>${t('acctTabAddresses')}</h3>
        <button class="btn-primary" type="button" id="u-addr-new">＋ ${t('addrAdd')}</button>
      </div>
      <div id="u-addr-list">${t('loading')}</div>
      <div id="u-addr-form-box" hidden></div>
    </section>`
  $('u-addr-new').addEventListener('click', () => showAddrForm(null))
  await refreshAddrList()
}

async function refreshAddrList() {
  const box = $('u-addr-list')
  if (!box) return
  try {
    const data = await apiJson('/addresses')
    const list = Array.isArray(data.addresses) ? data.addresses : []
    box.innerHTML = list.length
      ? list
          .map(
            (a) => `
        <div class="addr-card${a.isDefault ? ' is-default' : ''}">
          <div class="addr-main">
            <b>${esc(a.receiver || '')}</b>
            ${a.isDefault ? `<span class="tag-default">${t('addrDefault')}</span>` : ''}
            ${a.label ? `<span class="muted">（${esc(a.label)}）</span>` : ''}
            <div class="small">${esc([a.country, a.state, a.city, a.address, a.houseNumber, a.zipCode].filter(Boolean).join(' '))} · ${esc(a.phone || '')}</div>
          </div>
          <div class="addr-actions">
            <button type="button" class="btn-ghost" data-addr-edit="${a.id}">${t('acctTabAddresses') === '地址簿' ? '编辑' : 'Edit'}</button>
            ${a.isDefault ? '' : `<button type="button" class="btn-ghost" data-addr-default="${a.id}">${t('addrSetDefault')}</button>`}
            <button type="button" class="btn-ghost danger" data-addr-del="${a.id}">${t('addrDelete')}</button>
          </div>
        </div>`,
          )
          .join('')
      : `<div class="muted">${t('addrEmpty')}</div>`
    box.querySelectorAll('[data-addr-del]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        try {
          await apiJson(`/addresses/${btn.dataset.addrDel}`, { method: 'DELETE' })
          toast(t('addrDeleted'))
          refreshAddrList()
        } catch (error) {
          toast(String(error?.message || error), 'warn')
        }
      }),
    )
    box.querySelectorAll('[data-addr-default]').forEach((btn) =>
      btn.addEventListener('click', async () => {
        try {
          await apiJson(`/addresses/${btn.dataset.addrDefault}`, { method: 'PATCH', body: { isDefault: true } })
          refreshAddrList()
        } catch (error) {
          toast(String(error?.message || error), 'warn')
        }
      }),
    )
    box.querySelectorAll('[data-addr-edit]').forEach((btn) => {
      const data = apiJson('/addresses').then((res) => (res.addresses || []).find((a) => String(a.id) === btn.dataset.addrEdit))
      btn.addEventListener('click', async () => {
        const addr = await data
        showAddrForm(addr || null)
      })
    })
  } catch (error) {
    box.innerHTML = `<div class="muted">${esc(error?.message || '')}</div>`
  }
}

/** 新增/编辑地址表单（国家下拉 + 州省候选与注册表单同一套数据） */
function showAddrForm(addr) {
  const box = $('u-addr-form-box')
  if (!box) return
  const geo = window.MXQ_GEO || { countries: [], states: {} }
  const country = addr?.country || (state.customer && state.customer.country) || 'US'
  const states = geo.states?.[countryCodeFrom(country)] || []
  box.hidden = false
  box.innerHTML = `
    <form id="u-addr-form" class="u-form" novalidate>
      <div class="form-grid form-grid-3">
        <input name="label" placeholder="${t('addrLabel')}" value="${esc(addr?.label || '')}" />
        <input name="receiver" placeholder="${t('addrReceiver')} *" value="${esc(addr?.receiver || '')}" required />
        <input name="phone" placeholder="${t('fieldPhone')} *" value="${esc(addr?.phone || '')}" required />
      </div>
      <div class="form-grid form-grid-3">
        <select name="country" required>
          ${(geo.countries || []).map((item) => `<option value="${esc(item.c)}" ${item.c === countryCodeFrom(country) ? 'selected' : ''}>${esc(item.n)}</option>`).join('')}
        </select>
        <input name="state" list="u-addr-state-list" placeholder="${t('fieldState')}" value="${esc(addr?.state || '')}" />
        <datalist id="u-addr-state-list">${states.map((name) => `<option value="${esc(name)}"></option>`).join('')}</datalist>
        <input name="city" placeholder="${t('fieldCity')} *" value="${esc(addr?.city || '')}" required />
      </div>
      <input name="address" placeholder="${t('fieldAddress')} *" value="${esc(addr?.address || '')}" required />
      <div class="form-grid form-grid-3">
        <input name="houseNumber" placeholder="${t('fieldHouse')}" value="${esc(addr?.houseNumber || '')}" />
        <input name="zipCode" placeholder="${t('fieldZip')} *" value="${esc(addr?.zipCode || '')}" required />
        <label class="u-check"><input type="checkbox" name="isDefault" ${addr?.isDefault ? 'checked' : ''} /> ${t('addrDefault')}</label>
      </div>
      <div class="muted small">${t('addrZipHint')}</div>
      <div class="form-msg" id="u-addr-msg" hidden></div>
      <button class="btn-primary" type="submit">${addr ? t('loyaltyBirthdaySave') : t('addrAdd')}</button>
    </form>`
  const form = $('u-addr-form')
  form.querySelector('[name=country]').addEventListener('change', (event) => {
    const states2 = (window.MXQ_GEO?.states || {})[event.target.value] || []
    form.querySelector('#u-addr-state-list').innerHTML = states2.map((name) => `<option value="${esc(name)}"></option>`).join('')
  })
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const payload = {
      label: form.label.value,
      receiver: form.receiver.value,
      phone: form.phone.value,
      country: form.country.value,
      state: form.state.value,
      city: form.city.value,
      address: form.address.value,
      houseNumber: form.houseNumber.value,
      zipCode: form.zipCode.value,
      isDefault: form.isDefault.checked,
    }
    try {
      if (addr?.id) await apiJson(`/addresses/${addr.id}`, { method: 'PATCH', body: payload })
      else await apiJson('/addresses', { method: 'POST', body: payload })
      box.hidden = true
      toast(t('addrSaved'))
      refreshAddrList()
    } catch (error) {
      showMsg('u-addr-msg', String(error?.message || error))
    }
  })
}

/* ---------- 会员与积分 ---------- */
async function loadLoyaltyPanel() {
  const panel = $('account-panel')
  if (!panel) return
  let data
  try {
    data = await apiJson('/loyalty')
  } catch (error) {
    panel.innerHTML = `<section class="u-card"><div class="muted">${esc(error?.message || '')}</div></section>`
    return
  }
  const pct = data.nextTier ? Math.min(100, Math.round((data.lifetimeUsd / data.nextTier.minUsd) * 100)) : 100
  if (data.birthdayGift) toast(`${t('loyaltyBirthdayGift')}`, 'success')
  panel.innerHTML = `
    <section class="u-card">
      <div class="loyalty-head">
        <div>
          <div class="muted small">${t('loyaltyTier')}</div>
          <div class="loyalty-tier">${esc(data.tierName)}</div>
          <div class="muted small">${data.nextTier ? t('loyaltyNext', Math.max(0, Math.ceil(data.nextTier.minUsd - data.lifetimeUsd))) : t('loyaltyTop')}</div>
        </div>
        <div class="loyalty-points">
          <div class="muted small">${t('loyaltyBalance')}</div>
          <div class="loyalty-balance">${data.points}</div>
        </div>
      </div>
      <div class="loyalty-bar"><i style="width:${pct}%"></i></div>
      <div class="muted small">${t('loyaltyEarnRate', 1)} · ${t('loyaltyRedeemRate')}</div>
    </section>
    <section class="u-card">
      <h3>${t('loyaltyRedeem')}</h3>
      <form id="u-redeem-form" class="u-form u-form-row" novalidate>
        <input inputmode="numeric" name="points" placeholder="100 / 200 / 500 …" required />
        <button class="btn-primary" type="submit">${t('loyaltyRedeemBtn')}</button>
      </form>
      <div class="form-msg" id="u-redeem-msg" hidden></div>
    </section>
    <section class="u-card">
      <h3>${t('loyaltyBirthday')}</h3>
      <form id="u-bday-form" class="u-form u-form-row" novalidate>
        <input type="date" name="birthday" value="${esc(data.birthday || '')}" required />
        <button class="btn-ghost" type="submit">${t('loyaltyBirthdaySave')}</button>
      </form>
    </section>
    <section class="u-card">
      <h3>${t('loyaltyLedger')}</h3>
      <div id="u-ledger">
        ${data.ledger.length
          ? data.ledger.map((l) => `<div class="ledger-row"><span>${esc(l.note || l.reason)}</span><span class="muted small">${esc(shortDate(l.at))}</span><b class="${l.delta >= 0 ? 'up' : 'down'}">${l.delta >= 0 ? '+' : ''}${l.delta}</b></div>`).join('')
          : `<div class="muted">${t('loyaltyLedgerEmpty')}</div>`}
      </div>
    </section>`

  $('u-redeem-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
      const res = await postJson('/api/store/loyalty/redeem', { points: Number(event.currentTarget.points.value) })
      showMsg('u-redeem-msg', `✓ ${t('loyaltyRedeemOk', res.code, res.usd)}`, 'ok')
      state.customer.pointsBalance = Math.max(0, (state.customer.pointsBalance || 0) - Number(event.currentTarget.points.value))
      loadLoyaltyPanel()
    } catch (error) {
      showMsg('u-redeem-msg', String(error?.message || error))
    }
  })
  $('u-bday-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
      await postJson('/api/store/loyalty/birthday', { birthday: event.currentTarget.birthday.value })
      toast(t('loyaltyBirthdaySaved'))
      loadLoyaltyPanel()
    } catch (error) {
      toast(String(error?.message || error), 'warn')
    }
  })
}

/* ---------- 降价提醒列表 ---------- */
async function loadAlertsPanel() {
  const panel = $('account-panel')
  if (!panel) return
  let data
  try {
    data = await apiJson('/price-alerts')
  } catch (error) {
    panel.innerHTML = `<section class="u-card"><div class="muted">${esc(error?.message || '')}</div></section>`
    return
  }
  const alerts = Array.isArray(data.alerts) ? data.alerts.filter((a) => a.status === 'active') : []
  panel.innerHTML = `
    <section class="u-card">
      <h3>${t('alertsTitle')}</h3>
      ${alerts.length
        ? alerts
            .map((a) => {
              const dropped = a.currentPrice != null && a.lastPrice != null && a.currentPrice < a.lastPrice
              return `
          <div class="alert-row">
            <a href="/p/${a.productId}">${esc(a.title || `#${a.productId}`)}</a>
            <div class="muted small">${t('alertsWatched')} ${money(a.lastPrice)} → ${t('alertsPriceNow')} ${a.currentPrice != null ? money(a.currentPrice) : '—'}</div>
            <div class="alert-side">
              ${dropped ? `<span class="tag-drop">${t('alertsDropped')}</span>` : ''}
              <button type="button" class="btn-ghost danger" data-alert-del="${a.id}">${t('alertsRemove')}</button>
            </div>
          </div>`
            })
            .join('')
        : `<div class="muted">${t('alertsEmpty')}</div>`}
    </section>`
  panel.querySelectorAll('[data-alert-del]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      try {
        await apiJson(`/price-alerts/${btn.dataset.alertDel}`, { method: 'DELETE' })
        loadAlertsPanel()
      } catch (error) {
        toast(String(error?.message || error), 'warn')
      }
    }),
  )
}

/** 收藏页增强：降价徽章（当前价 vs 本地快照） */

/* ------------------------------ 结算页 ------------------------------ */

function checkoutState() {
  if (!state.checkout) {
    state.checkout = {
      buyer: {
        name: '',
        email: '',
        phone: '',
        country: state.shipCountry || 'US',
        state: state.shipState || '',
        city: state.shipCity || '',
        address: '',
        houseNumber: '',
        zipCode: '',
      },
      shippingCode: 'standard',
      coupon: '',
      couponApplied: null,
      /** 选中的支付渠道（默认沙箱，便于完整走通流程） */
      paymentMethod: 'sandbox',
      note: '',
      quote: null,
      quoteLines: [],
      /** 上次报价时的购物车指纹：购物车内容变了报价必须重算，否则总价是旧的 */
      quoteCartKey: '',
      payments: [],
      busy: false,
      error: '',
    }
    // 已登录客户：用注册时填的收货信息预填，省掉重复输入
    const customer = state.customer
    if (customer) {
      Object.assign(state.checkout.buyer, {
        name: customer.accountType === 'email' ? '' : customer.account || '',
        email: customer.accountType === 'email' ? customer.account || '' : '',
        phone: customer.phone || '',
        // 客户资料里的国家可能是老数据（国家名），统一折算成 ISO-2，否则选择框匹配不上会退化成第一项
        country: countryCodeFrom(customer.country) || state.checkout.buyer.country,
        state: customer.state || '',
        city: customer.city || '',
        address: customer.address || '',
        houseNumber: customer.houseNumber || '',
        zipCode: customer.zipCode || '',
      })
    }
  }
  return state.checkout
}

/** 向服务端要一次报价：金额、运费、税费、优惠券、礼品卡都以这次返回为准 */
async function refreshQuote() {
  const draft = checkoutState()
  draft.busy = true
  draft.error = ''
  renderCheckout()
  try {
    const data = await apiJson('/checkout/quote', {
      method: 'POST',
      body: {
        items: cartToApiItems(),
        country: draft.buyer.country,
        shippingCode: draft.shippingCode,
        coupon: draft.coupon,
        giftCard: draft.giftCard,
        channel: state.channel || '',
      },
    })
    draft.quote = data.amounts || null
    draft.quoteLines = data.lines || []
    draft.quoteCartKey = JSON.stringify(cartToApiItems())
    draft.payments = data.payments || []
    // 只有 ok:true 才算生效；券无效时服务端只回原因，金额照常给（不含折扣）
    draft.couponApplied = data.coupon && data.coupon.ok ? data.coupon : null
    draft.giftCardApplied = data.giftCard && data.giftCard.ok ? data.giftCard : null
    if (data.error) draft.error = apiMessage(data.error)
    // 服务端可能因为包邮门槛变化改了默认配送方式，回写保持一致
    if (draft.quote?.shipping?.code) draft.shippingCode = draft.quote.shipping.code
  } catch (error) {
    draft.error = error?.message || '报价失败'
  } finally {
    draft.busy = false
    renderCheckout()
  }
}

/** 已存地址一键填充：登录顾客在结算页点 chip 即回填表单（不覆盖邮箱） */
async function loadSavedAddresses() {
  const box = $('ck-saved-chips')
  if (!box) return
  try {
    const data = await apiJson('/addresses')
    const list = (Array.isArray(data.addresses) ? data.addresses : []).slice(0, 6)
    box.innerHTML = list.length
      ? list
          .map(
            (a, i) =>
              `<button type="button" class="ck-addr-chip" data-ck-addr="${i}">${a.isDefault ? '★ ' : ''}${esc(a.receiver || '')} · ${esc(a.city || '')} ${esc(a.state || '')} ${esc(a.country || '')}</button>`,
          )
          .join('')
      : `<a class="link-btn" href="/account/addresses">${t('addrAdd')}</a>`
    box.querySelectorAll('[data-ck-addr]').forEach((chip) =>
      chip.addEventListener('click', () => {
        const a = list[Number(chip.dataset.ckAddr)]
        if (!a) return
        const draft = checkoutState()
        Object.assign(draft.buyer, {
          name: draft.buyer.name || a.receiver || '',
          phone: a.phone || draft.buyer.phone,
          country: a.country || draft.buyer.country,
          state: a.state || draft.buyer.state,
          city: a.city || draft.buyer.city,
          address: a.address || draft.buyer.address,
          houseNumber: a.houseNumber || draft.buyer.houseNumber,
          zipCode: a.zipCode || draft.buyer.zipCode,
        })
        // renderCheckout() 不重建表单节点（防输入打断），这里直接回填输入框
        const setVal = (id, value) => {
          const el = document.getElementById(id)
          if (!el || !value) return
          if (el.tagName === 'SELECT') {
            // 州/省下拉存全名，地址里可能是缩写（CA）→ 按值或文本前缀匹配
            const hit = [...el.options].find((o) => o.value === value) || [...el.options].find((o) => o.value.toUpperCase().startsWith(value.toUpperCase()) || o.textContent.toUpperCase().startsWith(value.toUpperCase()))
            if (hit) el.value = hit.value
          } else {
            el.value = value
          }
        }
        setVal('ck-name', draft.buyer.name || a.receiver)
        setVal('ck-phone', a.phone)
        setVal('ck-state', a.state)
        setVal('ck-city', a.city)
        setVal('ck-address', a.address)
        setVal('ck-house', a.houseNumber)
        setVal('ck-zip', a.zipCode)
        toast('✓')
      }),
    )
  } catch {
    box.innerHTML = ''
  }
}

/** 只重画结算页，不重建表单节点，避免输入到一半光标被踢走 */
function renderCheckout() {
  const draft = checkoutState()
  const amounts = draft.quote
  const side = $('checkout-side-body')
  if (!side) return
  side.innerHTML = renderCheckoutSummary(draft)
  const err = $('checkout-error')
  if (err) {
    err.textContent = draft.error || ''
    err.hidden = !draft.error
  }
  const shippingBox = $('checkout-shipping')
  if (shippingBox && amounts) {
    shippingBox.innerHTML = (amounts.shippingOptions || [])
      .map(
        (option) => `
      <label class="ship-option${option.code === draft.shippingCode ? ' active' : ''}">
        <input type="radio" name="shipping" value="${esc(option.code)}" ${option.code === draft.shippingCode ? 'checked' : ''} />
        <span class="ship-option-body">
          <b>${esc(option.name)}</b>
          <small>${t('etaDays', esc(option.eta))}</small>
        </span>
        <span class="ship-option-fee">${option.feeUsd > 0 ? money(option.feeUsd) : t('freeShipping')}</span>
      </label>`,
      )
      .join('')
  } else if (shippingBox && !draft.busy) {
    // 报价失败（如服务端校验报错）：给出错误与重试入口，不能停在 Loading
    shippingBox.innerHTML = `<div class="empty-note">${esc(draft.error || t('genericError'))}</div>
      <button type="button" class="btn-ghost" id="quote-retry">${t('quoteRetry')}</button>`
  }
  const submit = $('place-order')
  if (submit) {
    submit.disabled = draft.busy
    submit.textContent = draft.busy ? t('placing') : t('placeOrder')
  }
  const couponRow = $('coupon-row')
  if (couponRow) couponRow.innerHTML = renderCouponRow(draft)
  // 支付渠道也是报价返回后才有的。首屏渲染时 draft.payments 还是空数组，
  // 如果这里不补画，用户进结算页会看不到任何支付方式（只剩订单备注）。
  const payBox = $('checkout-payments')
  if (payBox) payBox.innerHTML = renderPayments(draft.payments, draft.paymentMethod || 'sandbox')
}

function renderCouponRow(draft) {
  if (draft.couponApplied) {
    return `<div class="coupon-applied">
      <span>✓ ${t('couponApplied', esc(draft.couponApplied.code), money(draft.couponApplied.discountUsd))}</span>
      <button type="button" class="link-btn danger" id="coupon-clear">${t('couponRemove')}</button>
    </div>`
  }
  return `<div class="coupon-row">
      <input id="coupon-input" type="text" placeholder="${t('couponPlaceholder')}" value="${esc(draft.coupon || '')}" />
      <button type="button" class="btn-ghost" id="coupon-apply">${t('couponApply')}</button>
    </div>`
}

/** 礼品卡抵扣行（与优惠券并排，报价后显示抵扣结果） */
function renderGiftCardRow(draft) {
  if (draft.giftCardApplied) {
    return `<div class="coupon-applied giftcard-applied">
      <span>✓ ${t('giftCardApplied', esc(draft.giftCardApplied.code), money(draft.giftCardApplied.appliedUsd))}</span>
      <button type="button" class="link-btn danger" id="giftcard-clear">${t('couponRemove')}</button>
    </div>`
  }
  return `<div class="coupon-row giftcard-row">
      <input id="giftcard-input" type="text" placeholder="${t('giftCardPlaceholder')}" value="${esc(draft.giftCard || '')}" />
      <button type="button" class="btn-ghost" id="giftcard-apply">${t('giftCardApply')}</button>
    </div>`
}

/** 结账页合规展示（M9）：支付徽章 + 安全说明 + 条款链接 */
function renderComplianceBlock() {
  const badges = [
    ['visa', 'Visa'], ['master', 'Mastercard'], ['american_express', 'Amex'], ['discover', 'Discover'],
    ['paypal', 'PayPal'], ['apple_pay', 'Apple Pay'], ['google_pay', 'Google Pay'], ['klarna', 'Klarna'],
    ['maestro', 'Maestro'], ['unionpay', 'UnionPay'],
  ]
    .map(([file, alt]) => `<img class="pay-badge" src="/img/pay/${file}.svg" alt="${esc(alt)}" loading="lazy" />`)
    .join('')
  const chips = ['iDEAL', 'SEPA', 'Pix', 'Boleto', 'GrabPay']
    .map((name) => `<span class="pay-chip">${esc(name)}</span>`)
    .join('')
  return `
    <div class="pay-badges">
      <div class="pay-badges-title">${t('payBadgesTitle')}</div>
      <div class="pay-badges-row">${badges}${chips}</div>
      <p class="fine-print">${t('secureNote2')}</p>
      <p class="fine-print terms-links">
        <a href="/shipping" data-nav>${t('termsReturns')}</a> ·
        <a href="/promo-terms" data-nav>${t('termsPromo')}</a>
      </p>
    </div>`
}

/* --------------------- 礼品卡购买页（M6） --------------------- */

function giftCardDraftState() {
  if (!state.giftCardDraft) {
    const customer = state.customer
    state.giftCardDraft = {
      amount: 50,
      recipientEmail: customer?.accountType === 'email' ? customer.account || '' : '',
      buyerEmail: customer?.accountType === 'email' ? customer.account || '' : '',
      message: '',
      paymentMethod: 'sandbox',
      busy: false,
      error: '',
    }
  }
  return state.giftCardDraft
}

function renderGiftCardPage() {
  const draft = giftCardDraftState()
  const amounts = [25, 50, 100, 150, 200]
  const configuredPayments = (state.payments || []).filter((item) => item.configured)
  return `
    <h1 class="page-title">${t('giftCardPageTitle')}</h1>
    <p class="muted">${t('giftCardSub')}</p>
    <div class="checkout-grid">
      <div class="checkout-main">
        <div class="panel">
          <div class="panel-title">${t('giftCardAmount')}</div>
          <div class="gc-amounts">${amounts
            .map(
              (a) => `<button type="button" class="chip gc-amount${a === draft.amount ? ' active' : ''}" data-gc-amount="${a}">$${a}</button>`,
            )
            .join('')}</div>
          <div class="form-row" style="margin-top:10px">
            <label for="gc-recipient">${t('giftCardRecipient')}<i>*</i></label>
            <input id="gc-recipient" type="email" autocomplete="email" value="${esc(draft.recipientEmail)}" />
          </div>
          <div class="form-row">
            <label for="gc-buyer">${t('fieldEmail')}</label>
            <input id="gc-buyer" type="email" autocomplete="email" value="${esc(draft.buyerEmail)}" />
          </div>
          <div class="form-row">
            <label for="gc-message">${t('giftCardMessage')}</label>
            <input id="gc-message" value="${esc(draft.message)}" />
          </div>
        </div>
        <div class="panel">
          <div class="panel-title">${t('stepPayment')}</div>
          <div id="gc-payments">${renderPayments(configuredPayments, draft.paymentMethod)}</div>
        </div>
      </div>
      <aside class="checkout-side">
        <div class="panel">
          <div class="panel-title">${t('orderSummary')}</div>
          <div class="summary-row total"><span>${t('grandTotal')}</span><span class="summary-total-price">${money(draft.amount)}</span></div>
          <div class="form-msg" id="gc-error" ${draft.error ? '' : 'hidden'}>${esc(draft.error || '')}</div>
          <button class="btn-primary" style="width:100%;margin-top:12px" id="giftcard-buy" type="button" ${draft.busy ? 'disabled' : ''}>
            ${draft.busy ? t('giftCardBuying') : t('giftCardBuy')}
          </button>
          <p class="fine-print">${t('recoverHint')}</p>
        </div>
      </aside>
    </div>`
}

async function buyGiftCard() {
  const draft = giftCardDraftState()
  const val = (id) => String($(id)?.value || '').trim()
  draft.recipientEmail = val('gc-recipient')
  draft.buyerEmail = val('gc-buyer')
  draft.message = val('gc-message')
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(draft.recipientEmail)) {
    draft.error = t('emailInvalid')
    render()
    return
  }
  draft.busy = true
  draft.error = ''
  render()
  try {
    const data = await apiJson('/giftcard/purchase', {
      method: 'POST',
      body: {
        amountUsd: draft.amount,
        recipientEmail: draft.recipientEmail,
        buyerEmail: draft.buyerEmail,
        message: draft.message,
        paymentMethod: draft.paymentMethod,
      },
    })
    if (data.orderNo && data.guestToken) saveGuestToken(data.orderNo, data.guestToken)
    navigate(`/pay/${encodeURIComponent(data.orderNo)}`)
  } catch (error) {
    draft.busy = false
    draft.error = error?.message || '下单失败'
    render()
  }
}

/* --------------------- 弃购恢复（M7） --------------------- */

async function loadRecoverPage(token) {
  try {
    const data = await apiJson(`/abandoned/restore?token=${encodeURIComponent(token)}`)
    const items = Array.isArray(data.items) ? data.items.filter((item) => item && item.productId) : []
    state.cart = items
    saveCart()
    // 重建结算草稿并回填买家信息
    state.checkout = null
    const draft = checkoutState()
    const buyer = data.buyer || {}
    draft.buyer.name = String(buyer.name || data.buyer?.name || '').slice(0, 80)
    draft.buyer.email = String(data.email || buyer.email || '')
    draft.buyer.phone = String(data.phone || buyer.phone || '')
    if (buyer.country) draft.buyer.country = String(buyer.country).slice(0, 2).toUpperCase()
    if (buyer.state) draft.buyer.state = buyer.state
    if (buyer.city) draft.buyer.city = buyer.city
    if (buyer.address) draft.buyer.address = buyer.address
    if (buyer.houseNumber) draft.buyer.houseNumber = buyer.houseNumber
    if (buyer.zipCode) draft.buyer.zipCode = buyer.zipCode
    toast(t('recoverTitle'))
    navigate('/checkout')
  } catch {
    $('app').innerHTML = `<div class="wrap"><div class="empty-note big">${t('recoverInvalid')}<br /><a class="link-btn" href="/">${t('continueShopping')}</a></div></div>`
  }
}

function renderCheckoutSummary(draft) {
  const amounts = draft.quote
  if (!amounts) {
    return `<div class="empty-note">${draft.busy ? t('loading') : '—'}</div>`
  }
  const lines = (draft.quoteLines || []).length ? draft.quoteLines : []
  // 摘要每行商品价以服务端报价为准（quoteLines）；
  // 购物车本地存的 total 只是加购时的展示价，商品改价后会与真实金额不符。
  // 报价还没回来时退回本地购物车行，先给个数。
  const cartForPatches = state.cart || []
  const patchesOf = (pid) => (cartForPatches.find((c) => Number(c.productId) === Number(pid)) || {}).patches || []
  const rows = lines.length
    ? lines.map((line) => ({
        image: line.image,
        title: line.title,
        optionsText: line.optionsText,
        patches: patchesOf(line.productId),
        qty: line.qty,
        amount: Number(line.lineUsd) || 0,
      }))
    : (state.cart || []).map((item) => ({
        image: item.image,
        title: item.title,
        optionsText: item.optionsText,
        patches: item.patches || [],
        qty: Number(item.qty) || 1,
        amount: (Number(item.total) || 0) * (Number(item.qty) || 1),
      }))
  return `
    ${rows.length ? `
    <div class="sum-products">
      <div class="sum-products-head"><span>${t('sumProduct')}</span><span>${t('sumSubtotal')}</span></div>
      ${rows
        .map(
          (row) => `
      <div class="sum-product">
        ${row.image ? `<img class="sum-product-img" src="${esc(imageUrl(row.image, 160))}" alt="${esc(tr(row.title, state.lang))}" loading="lazy" />` : ''}
        <div class="sum-product-info">
          <div class="sum-product-title">${esc(tr(row.title, state.lang))}</div>
          ${row.optionsText ? `<div class="sum-product-opt">${esc(row.optionsText)}</div>` : ''}
          ${(row.patches || []).length
            ? `<div class="patch-row">${row.patches
                .map(
                  (p) => `
          <span class="patch-chip"><img src="${esc(imageUrl(p.image, 96))}" alt="${esc(p.label || 'patch')}" loading="lazy" />${p.label ? `<span class="patch-chip-label">${esc(p.label)}</span>` : ''}</span>`,
                )
                .join('')}</div>`
            : ''}
          <div class="sum-product-qty">${t('qtyLabelShort')} ${Number(row.qty) || 1}</div>
        </div>
        <span class="sum-product-price">${money(row.amount)}</span>
      </div>`,
        )
        .join('')}
    </div>` : ''}
    <div class="summary-divider"></div>
    <div class="summary-row"><span>${t('subtotal')}</span><span>${money(amounts.subtotal)}</span></div>
    <div class="summary-row"><span>${t('shippingFee')}</span><span>${amounts.shippingFee > 0 ? money(amounts.shippingFee) : t('freeShipping')}</span></div>
    ${amounts.discount > 0 ? `<div class="summary-row discount"><span>${t('discount')}</span><span>−${money(amounts.discount)}</span></div>` : ''}
    ${renderTaxDisclosure(amounts)}
    <div class="summary-row total"><span>${t('grandTotal')}</span><span class="summary-total-price">${money(amounts.total)}</span></div>
    <div class="ship-hint">${
      amounts.shipping?.free
        ? `🎉 ${t('freeShipReached')}`
        : t('freeShipHint', money(Math.max(0, (amounts.freeOver || 0) - amounts.subtotal)))
    }</div>
    ${renderCheckoutCompliance()}`
}

/**
 * M8（2026-10-08）结账页税费口径合规展示（P3 税费与关税引擎）。
 * 服务端 taxQuote 已算出两种模式，这里如实展示、不做二次计算：
 *  - COLLECTED：IOSS/VOEC 低值方案，结算时直接代收 VAT（显示金额 + 税率）
 *  - IMPORT：超阈值走 DDP，结算不收税，展示落地预估（关税 + 进口 VAT），并明确「非现在收取」
 *  - NONE：无目的地税（如 US 由承运/州税系统处理），也要说清，避免用户以为免税。
 */
function renderTaxDisclosure(amounts) {
  const info = amounts?.taxInfo
  if (!info) return ''
  const rows = []
  if (info.mode === 'COLLECTED' && Number(info.taxUsd) > 0) {
    rows.push(`<div class="summary-row tax"><span>${esc(t('taxVatLabel'))} (${esc(info.label || 'VAT')} ${esc(String(info.rate))}%)</span><span>${money(info.taxUsd)}</span></div>`)
    rows.push(`<p class="tax-note">${esc(t('taxIossNote'))}</p>`)
  } else if (info.mode === 'IMPORT') {
    rows.push(`<p class="tax-note"><b>${esc(t('taxDdpTitle'))}</b>${esc(t('taxDdpNote'))}</p>`)
    if (Number(info.dutyEstUsd) > 0) {
      rows.push(`<div class="summary-row tax-est"><span>${esc(t('taxDutyEst'))}</span><span>≈ ${money(info.dutyEstUsd)}</span></div>`)
    }
    if (Number(info.importVatEstUsd) > 0) {
      rows.push(`<div class="summary-row tax-est"><span>${esc(t('taxImportVatEst'))}</span><span>≈ ${money(info.importVatEstUsd)}</span></div>`)
    }
  } else if (info.note) {
    rows.push(`<p class="tax-note">${esc(info.note)}</p>`)
  }
  if (!rows.length) return ''
  return `<div class="tax-disclosure" role="note">${rows.join('')}</div>`
}

/**
 * M8 结账页支付与合规展示：退货条款 + 安全支付信号。
 * 信任信号复用已有 /api/store/trust 接口（6 条：安全支付 / 买家保护 等）。
 */
function renderCheckoutCompliance() {
  return `
  <div class="checkout-compliance">
    <a class="cc-link" href="/returns">${esc(t('ccReturnPolicy'))}</a>
    <a class="cc-link" href="/safe-shopping">${esc(t('ccSafeShopping'))}</a>
    <a class="cc-link" href="/help">${esc(t('ccNeedHelp'))}</a>
    <p class="cc-note">${esc(t('ccSecureNote'))}</p>
  </div>`
}

function renderPayments(payments, selected) {
  if (!payments?.length) return ''
  return `<div class="pay-methods">${payments
    .map(
      (method) => `
    <label class="pay-option${method.configured ? '' : ' disabled'}${method.code === selected ? ' active' : ''}${method.sandbox ? ' sandbox' : ''}">
      <input type="radio" name="payment" value="${esc(method.code)}" ${method.code === selected ? 'checked' : ''} ${method.configured ? '' : 'disabled'} />
      <span class="pay-option-body">
        <b>${esc(method.name)}${method.sandbox ? ` · <span class="sandbox-tag">TEST</span>` : ''}</b>
        <small>${method.configured ? esc(method.note || '') : t('payNotConfiguredHint')}</small>
      </span>
      ${method.configured ? '' : `<span class="pay-option-off">${t('payNotConfigured')}</span>`}
    </label>`,
    )
    .join('')}</div>`
}

function renderCheckoutPage() {
  const draft = checkoutState()
  if (!state.cart.length) return renderCartPage()
  const buyer = draft.buyer
  const geo = window.MXQ_GEO || { countries: [], states: {} }
  const countries = geo.countries || []
  // 该国家如果有已登记的一级行政区，就用下拉；没有就退回自由输入
  const stateOptions = (geo.states || {})[buyer.country] || []

  return `
    <h1 class="page-title">${t('checkoutTitle')}</h1>
    <div class="checkout-grid">
      <div class="checkout-main">
        <div class="panel">
          <div class="panel-title">1 · ${t('stepAddress')} <small class="muted">${t('requiredHint')}</small></div>
          ${state.customer ? `<div class="ck-saved"><span class="muted small">${t('ckSavedAddresses')}</span><div class="ck-saved-chips" id="ck-saved-chips"></div></div>` : ''}
          <div class="form-grid">
            <div class="form-row">
              <label for="ck-name">${t('fieldName')}<i>*</i></label>
              <input id="ck-name" autocomplete="name" value="${esc(buyer.name)}" />
            </div>
            <div class="form-row">
              <label for="ck-email">${t('fieldEmail')}<i>*</i></label>
              <input id="ck-email" type="email" autocomplete="email" value="${esc(buyer.email)}" />
            </div>
          </div>
          <div class="form-grid form-grid-3">
            <div class="form-row">
              <label for="ck-country">${t('fieldCountry')}<i>*</i></label>
              <select id="ck-country">${countries
                .map((item) => `<option value="${esc(item.c)}" ${item.c === buyer.country ? 'selected' : ''}>${esc(item.n)}</option>`)
                .join('')}</select>
            </div>
            <div class="form-row">
              <label for="ck-state">${t('fieldState')}<i>*</i></label>
              ${
                stateOptions.length
                  ? `<select id="ck-state">${stateOptions
                      .map((name) => `<option value="${esc(name)}" ${name === buyer.state ? 'selected' : ''}>${esc(name)}</option>`)
                      .join('')}</select>`
                  : `<input id="ck-state" value="${esc(buyer.state)}" />`
              }
            </div>
            <div class="form-row">
              <label for="ck-city">${t('fieldCity')}<i>*</i></label>
              <input id="ck-city" autocomplete="address-level2" value="${esc(buyer.city)}" />
            </div>
          </div>
          <div class="form-row">
            <label for="ck-address">${t('fieldAddress')}<i>*</i></label>
            <input id="ck-address" autocomplete="street-address" value="${esc(buyer.address)}" />
          </div>
          <div class="form-grid form-grid-3">
            <div class="form-row">
              <label for="ck-house">${t('fieldHouse')}<i>*</i></label>
              <input id="ck-house" autocomplete="address-line2" value="${esc(buyer.houseNumber)}" />
            </div>
            <div class="form-row">
              <label for="ck-zip">${t('fieldZip')}<i>*</i></label>
              <input id="ck-zip" autocomplete="postal-code" value="${esc(buyer.zipCode)}" />
            </div>
            <div class="form-row">
              <label for="ck-phone">${t('fieldPhone')}<i>*</i></label>
              <input id="ck-phone" type="tel" autocomplete="tel" value="${esc(buyer.phone)}" />
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">2 · ${t('stepShipping')}</div>
          <div id="checkout-shipping">
            ${draft.quote ? '' : `<div class="empty-note">${t('loading')}</div>`}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">3 · ${t('stepPayment')}</div>
          <div id="checkout-payments">${renderPayments(draft.payments, draft.paymentMethod || 'sandbox')}</div>
          <div class="form-row" style="margin-top:12px">
            <label for="ck-note">${t('noteLabel')}</label>
            <input id="ck-note" value="${esc(draft.note)}" placeholder="${t('notePlaceholder')}" />
          </div>
        </div>
      </div>

      <aside class="checkout-side">
        <div class="panel">
          <div class="panel-title">${t('orderSummary')}</div>
          <div id="checkout-side-body">${renderCheckoutSummary(draft)}</div>
          <!-- P0-4 优惠促销：结算侧栏展示可用优惠码，点击卡片自动填入上方输入框 -->
          <div data-promo-slot="checkout"></div>
          <div id="coupon-row" style="margin-top:10px">${renderCouponRow(draft)}</div>
          <div id="giftcard-row" style="margin-top:8px">${renderGiftCardRow(draft)}</div>
          <div class="form-msg" id="checkout-error" ${draft.error ? '' : 'hidden'}>${esc(draft.error || '')}</div>
          <button class="btn-primary" style="width:100%;margin-top:12px" id="place-order" type="button" ${draft.busy ? 'disabled' : ''}>
            ${draft.busy ? t('placing') : t('placeOrder')}
          </button>
          <button class="link-btn" style="margin-top:8px" id="back-cart" type="button">← ${t('backToCart')}</button>
          ${renderComplianceBlock()}
        </div>
      </aside>
    </div>`
}

/* ------------------------------ 支付页 / 订单页 ------------------------------ */

function orderStatusLabel(order) {
  if (order.status === 'cancelled') return t('orderCancelled')
  if (order.status === 'pending_payment') return t('orderPendingPayment')
  const status = orderStatus(order.status)
  return status.label
}

function renderOrderItems(order) {
  const items = Array.isArray(order.items) ? order.items : []
  if (!items.length) return ''
  return `<div class="order-items">${items
    .map(
      (item) => `
    <div class="order-item">
      ${item.image ? `<img src="${esc(imageUrl(item.image, 200))}" alt="" loading="lazy" />` : ''}
      <div class="order-item-body">
        <div class="t">${esc(tr(item.title, state.lang))}</div>
        ${item.optionsText ? `<div class="o">${esc(item.optionsText)}</div>` : ''}
        <div class="o">${t('qtyLabelShort')} ${Number(item.qty) || 1}</div>
      </div>
      <span class="p">${money(item.lineUsd ?? (Number(item.unitUsd) || 0) * (Number(item.qty) || 1))}</span>
    </div>`,
    )
    .join('')}</div>`
}

function renderAmountBlock(order) {
  return `
    <div class="summary-row"><span>${t('subtotal')}</span><span>${money(order.subtotalUsd)}</span></div>
    <div class="summary-row"><span>${t('shippingFee')}</span><span>${order.shippingFeeUsd > 0 ? money(order.shippingFeeUsd) : t('freeShipping')}</span></div>
    ${order.discountUsd > 0 ? `<div class="summary-row discount"><span>${t('discount')}</span><span>−${money(order.discountUsd)}</span></div>` : ''}
    <div class="summary-row total"><span>${t('grandTotal')}</span><span class="summary-total-price">${money(order.totalUsd)}</span></div>`
}

function renderBankInstructions(info) {
  if (!info) return ''
  return `
    <div class="bank-box">
      <div class="panel-title">${t('bankDetails')}</div>
      <div class="bank-row"><span>${t('bankBeneficiary')}</span><b>${esc(info.beneficiary)}</b></div>
      <div class="bank-row"><span>${t('bankName')}</span><b>${esc(info.bank)}</b></div>
      <div class="bank-row"><span>${t('bankAccount')}</span><b>${esc(info.account)}</b></div>
      <div class="bank-row"><span>${t('bankSwift')}</span><b>${esc(info.swift)}</b></div>
      <p class="fine-print">${esc(apiMessage(info.referenceHint))}</p>
    </div>`
}

function renderPayPage(order, payments, bankInstructions, state_ = {}) {
  if (!order) return `<div class="empty-note">${t('notFound')}</div>`
  const paid = order.paymentStatus === 'paid'
  return `
    <h1 class="page-title">${t('payTitle')} · <span class="mono">${esc(order.orderNo)}</span></h1>
    ${state_.message ? `<div class="banner ${state_.tone || 'info'}">${esc(state_.message)}</div>` : ''}
    <div class="checkout-grid">
      <div class="checkout-main">
        <div class="panel">
          <div class="panel-title">${t('orderItems')}</div>
          ${renderOrderItems(order)}
        </div>
        ${
          paid
            ? `<div class="panel"><div class="banner ok">✓ ${t('paySuccess')} · ${esc(order.paymentMethod)}${order.paymentRef ? ` · ${esc(order.paymentRef)}` : ''}</div></div>`
            : (() => {
                const selected = String(state_.selected || 'sandbox')
                const method = (payments || []).find((item) => item.code === selected)
                const isStripe = method?.provider === 'Stripe' && method?.configured
                let payWidget = ''
                if (selected === 'paypal' && method?.configured) {
                  payWidget = `
                <div id="paypal-buttons"></div>
                <p class="fine-print">${t('payRedirectHint')}</p>`
                } else if (selected === 'card' && method?.configured) {
                  payWidget = `
                <div class="card-fields">
                  <div class="form-row"><label>${t('cardNumberLabel')}</label><div id="card-number"></div></div>
                  <div class="form-grid-2">
                    <div class="form-row"><label>${t('cardExpiryLabel')}</label><div id="card-expiry"></div></div>
                    <div class="form-row"><label>${t('cardCvvLabel')}</label><div id="card-cvv"></div></div>
                  </div>
                </div>
                <button class="btn-primary" style="width:100%;margin-top:12px" id="card-pay" type="button" ${state_.busy ? 'disabled' : ''}>
                  ${state_.busy ? t('paying') : t('cardPayNow')}
                </button>
                <p class="fine-print">${t('cardPayHint')}</p>`
                } else if (selected === 'stripe_card' && isStripe) {
                  payWidget = `
                <div id="stripe-payment-element"></div>
                <button class="btn-primary" style="width:100%;margin-top:12px" id="stripe-pay" type="button" ${state_.busy ? 'disabled' : ''}>
                  ${state_.busy ? t('paying') : t('payNow')}
                </button>
                <p class="fine-print">${t('cardPayHint')}</p>`
                } else if (isStripe && (selected === 'apple_pay' || selected === 'google_pay')) {
                  payWidget = `
                <div id="stripe-wallet"></div>
                <p class="fine-print">${t('stripeWalletHint')}</p>`
                } else if (isStripe) {
                  // 本地支付方式（iDEAL / Klarna / Pix / Boleto / GrabPay / SEPA）：确认后跳转授权页
                  payWidget = `
                <button class="btn-primary" style="width:100%;margin-top:12px" id="stripe-local-pay" type="button" ${state_.busy ? 'disabled' : ''}>
                  ${state_.busy ? t('paying') : t('payNow')}
                </button>
                <p class="fine-print">${t('stripeRedirectHint')}</p>`
                } else {
                  payWidget = `
                <button class="btn-primary" style="width:100%;margin-top:12px" id="pay-now" type="button" ${state_.busy ? 'disabled' : ''}>
                  ${state_.busy ? t('paying') : t('payNow')}
                </button>
                <p class="fine-print">${t('paySandboxHint')}</p>`
                }
                return `<div class="panel">
                <div class="panel-title">${t('stepPayment')}</div>
                ${renderPayments(payments, selected)}
                ${payWidget}
              </div>`
              })()
        }
        ${renderBankInstructions(bankInstructions)}
      </div>
      <aside class="checkout-side">
        <div class="panel">
          <div class="panel-title">${t('orderSummary')}</div>
          <div class="summary-row"><span>${t('orderNumber')}</span><span class="mono">${esc(order.orderNo)}</span></div>
          <div class="summary-row"><span>${t('orderStatus')}</span><span>${esc(orderStatusLabel(order))}</span></div>
          ${
            (Array.isArray(order.items) && order.items.length)
              ? `<div class="sum-products">
                  ${(order.items || [])
                    .map(
                      (item) => `
                  <div class="sum-product">
                    ${item.image ? `<img class="sum-product-img" src="${esc(imageUrl(item.image, 160))}" alt="" loading="lazy" />` : ''}
                    <div class="sum-product-info">
                      <div class="sum-product-title">${esc(tr(item.title, state.lang))}</div>
                      ${item.optionsText ? `<div class="sum-product-opt">${esc(item.optionsText)}</div>` : ''}
                      <div class="sum-product-qty">${t('qtyLabelShort')} ${Number(item.qty) || 1}</div>
                    </div>
                    <span class="sum-product-price">${money(item.lineUsd ?? (Number(item.unitUsd) || 0) * (Number(item.qty) || 1))}</span>
                  </div>`,
                    )
                    .join('')}
                </div>
                <div class="summary-divider"></div>`
              : ''
          }
          <div class="summary-divider"></div>
          ${renderAmountBlock(order)}
          <a class="btn-ghost" style="width:100%;margin-top:12px;display:block;text-align:center" href="/order/${encodeURIComponent(order.orderNo)}">${t('viewOrder')}</a>
          <a class="link-btn" style="margin-top:8px" href="/">← ${t('continueShopping')}</a>
        </div>
      </aside>
    </div>`
}

/* ============================================================
 * #16 发票 / 单据入口
 * 后端早有 /orders/:orderNo/invoice（可打印 HTML）与 /orders/:orderNo/fulfillment
 * （聚合包裹/轨迹/发票/退换货），只是前台从未接。此处补前端入口：
 * 进订单页后异步拉 fulfillment，拿到 invoices 才显示区块，避免无单据时占位。
 * ============================================================ */
const INVOICE_KIND_LABEL = {
  receipt: { en: 'Payment receipt', 'zh-CN': '支付收据' },
  invoice: { en: 'Tax invoice', 'zh-CN': '税务发票' },
  customs: { en: 'Customs declaration', 'zh-CN': '报关单据' },
}

/** 订单页的发票区块容器（异步填充） */
function renderInvoiceBlock(order) {
  if (!order || !order.orderNo) return ''
  const paid = order.paymentStatus === 'paid'
  // 未支付通常还没开单据，不占位
  if (!paid) return ''
  return `<div class="panel invoice-panel" id="invoice-panel" data-order="${esc(order.orderNo)}" hidden></div>`
}

/** 拉取履约聚合，把可用的单据入口渲染进 #invoice-panel */
async function mountInvoicePanel(orderNo) {
  const panel = document.getElementById('invoice-panel')
  if (!panel || panel.dataset.order !== String(orderNo)) return
  try {
    const response = await fetch(apiUrl(`/api/store/orders/${encodeURIComponent(orderNo)}/fulfillment`))
    if (!response.ok) return
    const data = await response.json().catch(() => null)
    const invoices = data?.fulfillment?.invoices
    const list = Array.isArray(invoices) ? invoices.filter((v) => v && v.kind) : []
    if (!list.length) {
      // 没有可用单据：整块隐藏，不给买家「点了没反应」的假入口
      panel.hidden = true
      return
    }
    const rmaCount = Array.isArray(data?.fulfillment?.returns) ? data.fulfillment.returns.length : 0
    panel.hidden = false
    panel.innerHTML = `
      <div class="panel-title">${t(isZh(state.lang) ? '发票与单据' : 'Invoices & documents')}</div>
      <div class="invoice-list">
        ${list
          .map((v) => {
            const label = INVOICE_KIND_LABEL[v.kind] || { en: v.kind, 'zh-CN': v.kind }
            const no = v.invoice_no || v.invoiceNo || ''
            const at = String(v.issued_at || v.issuedAt || '').slice(0, 10)
            return `<div class="invoice-row">
              <div class="invoice-meta">
                <b>${esc(t(isZh(state.lang) ? label['zh-CN'] : label.en))}</b>
                ${no ? `<span class="mono invoice-no">${esc(no)}</span>` : ''}
                ${at ? `<span class="muted">${esc(at)}</span>` : ''}
              </div>
              <div class="invoice-actions">
                <a class="btn-ghost" target="_blank" rel="noopener"
                   href="/api/store/orders/${encodeURIComponent(orderNo)}/invoice?kind=${encodeURIComponent(v.kind)}">${t(isZh(state.lang) ? '查看' : 'View')}</a>
                <a class="btn-ghost" target="_blank" rel="noopener"
                   href="/api/store/orders/${encodeURIComponent(orderNo)}/invoice?kind=${encodeURIComponent(v.kind)}&print=1">${t(isZh(state.lang) ? '打印 / 存PDF' : 'Print / PDF')}</a>
              </div>
            </div>`
          })
          .join('')}
      </div>
      ${rmaCount ? `<p class="fine-print">${t(isZh(state.lang) ? `该订单有${rmaCount} 条退换货记录，可在订单页查询进度。` : `${rmaCount} return request(s) on this order.`)}</p>` : ''}`
  } catch {
    panel.hidden = true
  }
}

/* ============================================================
 * #15 在线退货/退款申请 + #18 换货申请
 * 后端早已实现（POST /rma/apply 支持 type=refund|replace，
 * GET /rma/check?no=&email= 查进度，rpc storefront_rma_create/_get），
 * 此处补前台：申请表单（选订单→勾商品→填原因→提交）+ 进度查询。
 * ============================================================ */

const rmaLabel = (zh, en) => (isZh(state.lang) ? zh : en)

/** 售后类型：退款 / 换货 */
function rmaTypeOptions() {
  return [
    { code: 'refund', name: rmaLabel('退货退款', 'Return & refund') },
    { code: 'replace', name: rmaLabel('换货', 'Exchange') },
  ]
}

/** 进度状态文案 + 配色 */
function rmaStatusBadge(status) {
  const map = {
    submitted: { zh: '已提交', en: 'Submitted', cls: 'info' },
    approved: { zh: '已通过', en: 'Approved', cls: 'ok' },
    rejected: { zh: '已驳回', en: 'Rejected', cls: 'bad' },
    refunded: { zh: '已退款', en: 'Refunded', cls: 'ok' },
    exchanged: { zh: '已换货', en: 'Exchanged', cls: 'ok' },
    received: { zh: '已收货', en: 'Received', cls: 'info' },
    closed: { zh: '已关闭', en: 'Closed', cls: 'muted' },
  }
  const hit = map[String(status || '').toLowerCase()] || { zh: status || '处理中', en: status || 'Processing', cls: 'info' }
  return `<span class="rma-badge rma-${hit.cls}">${esc(rmaLabel(hit.zh, hit.en))}</span>`
}

/** 售后申请页 */
function renderReturnsPage() {
  return `
    <h1 class="page-title">${rmaLabel('退货与换货', 'Returns & exchanges')}</h1>
    <p class="fine-print">${rmaLabel(
      '提交前请确认订单状态：已发货且未超过退货窗口的订单可申请退款或换货。质量问题请附上照片，处理更快。',
      'Before submitting, make sure the order is eligible: shipped orders within the return window can be refunded or exchanged. Add photos for quality issues to speed things up.'
    )}</p>

    <div class="rma-grid">
      <div class="checkout-main">
        <div class="panel">
          <div class="panel-title">${rmaLabel('① 填写订单信息', '① Order details')}</div>
          <div class="form-row">
            <label for="rma-order">${rmaLabel('订单号', 'Order number')}<i>*</i></label>
            <input id="rma-order" maxlength="40" placeholder="${rmaLabel('下单后收到的订单号，如 GS2609259A212C', 'e.g. GS2609259A212C')}" autocomplete="off" />
          </div>
          <div class="form-row">
            <label for="rma-email">${rmaLabel('下单邮箱', 'Order email')}<i>*</i></label>
            <input id="rma-email" type="email" maxlength="120" placeholder="you@example.com" autocomplete="email" />
          </div>
          <div class="rma-load-wrap">
            <button type="button" class="btn-ghost" id="rma-load">${rmaLabel('加载订单商品', 'Load order items')}</button>
            <span class="qa-form-note" id="rma-load-msg" role="status" aria-live="polite"></span>
          </div>
        </div>

        <div class="panel" id="rma-items-panel" hidden>
          <div class="panel-title">${rmaLabel('② 选择要退换的商品', '② Select items')}</div>
          <div class="rma-items" id="rma-items"></div>
        </div>

        <div class="panel" id="rma-reason-panel" hidden>
          <div class="panel-title">${rmaLabel('③ 申请类型与原因', '③ Type & reason')}</div>
          <div class="form-row">
            <label>${rmaLabel('申请类型', 'Request type')}<i>*</i></label>
            <div class="rma-type-row">
              ${rmaTypeOptions()
                .map(
                  (o, i) => `<label class="rma-type${i === 0 ? ' active' : ''}">
                    <input type="radio" name="rma-type" value="${o.code}" ${i === 0 ? 'checked' : ''} />
                    <span>${esc(o.name)}</span>
                  </label>`
                )
                .join('')}
            </div>
          </div>
          <div class="form-row">
            <label for="rma-reason">${rmaLabel('申请原因', 'Reason')}<i>*</i></label>
            <textarea id="rma-reason" maxlength="1000" rows="4" placeholder="${rmaLabel('请说明原因（至少 5 个字），例如：尺码不合适 / 商品有质量问题', 'Describe the issue (at least 5 characters), e.g. size does not fit / quality issue')}"></textarea>
          </div>
          <div class="rma-form-actions">
            <button type="button" class="btn-primary" id="rma-submit">${rmaLabel('提交申请', 'Submit request')}</button>
            <span class="qa-form-note" id="rma-submit-msg" role="status" aria-live="polite"></span>
          </div>
        </div>

        <div class="panel rma-done" id="rma-done" hidden>
          <div class="panel-title">${rmaLabel('提交成功', 'Submitted')}</div>
          <p>${rmaLabel('售后单号', 'RMA number')}: <b class="mono" id="rma-no"></b></p>
          <p class="fine-print">${rmaLabel('请保存该单号，可在下方「查询进度」随时查看处理状态。', 'Save this number to check status below at any time.')}</p>
          <button type="button" class="btn-ghost" id="rma-check-self" data-no="">${rmaLabel('查询这条申请的进度', 'Check this request')}</button>
        </div>
      </div>

      <aside>
        <div class="panel">
          <div class="panel-title">${rmaLabel('查询售后进度', 'Check status')}</div>
          <div class="form-row">
            <label for="rma-check-no">${rmaLabel('售后单号', 'RMA number')}</label>
            <input id="rma-check-no" maxlength="40" placeholder="RMA-..." autocomplete="off" />
          </div>
          <div class="form-row">
            <label for="rma-check-email">${rmaLabel('下单邮箱', 'Order email')}</label>
            <input id="rma-check-email" type="email" maxlength="120" placeholder="you@example.com" autocomplete="email" />
          </div>
          <button type="button" class="btn-primary" id="rma-check">${rmaLabel('查询进度', 'Check status')}</button>
          <span class="qa-form-note" id="rma-check-msg" role="status" aria-live="polite"></span>
          <div id="rma-result" class="rma-result"></div>
        </div>

        <div class="panel">
          <div class="panel-title">${rmaLabel('退货政策', 'Return policy')}</div>
          <p class="fine-print">${rmaLabel(
            '商品需未经穿着、吊牌完整；定制类商品（姓名号码刺绣）不支持无理由退货。退款将在收到退回商品并验收后原路退回。',
            'Items must be unworn with tags intact. Customised items (name/number printing) are not eligible for change-of-mind returns. Refunds are issued to the original payment method after we receive and inspect the return.'
          )}</p>
          <a class="link-btn" href="/policies">${rmaLabel('查看完整政策', 'View full policy')} →</a>
        </div>
      </aside>
    </div>`
}

/** 加载订单商品（供勾选） */
async function rmaLoadOrder() {
  const orderNo = ($('rma-order')?.value || '').trim()
  const email = ($('rma-email')?.value || '').trim()
  const msg = $('rma-load-msg')
  if (!orderNo || !email) {
    if (msg) msg.textContent = rmaLabel('请先填写订单号与下单邮箱', 'Order number and email are required')
    return
  }
  const btn = $('rma-load')
  if (btn) btn.disabled = true
  if (msg) msg.textContent = rmaLabel('加载中…', 'Loading…')
  try {
    // 订单查询支持「登录会话」或「下单时浏览器里的 token」两种凭据；这里两者都带上
    const token = guestTokenFor(orderNo)
    const query = token ? `?token=${encodeURIComponent(token)}` : ''
    const data = await apiJson(`/orders/${encodeURIComponent(orderNo)}${query}`)
    const order = data?.order
    if (!order) throw new Error(rmaLabel('订单不存在或凭据不匹配', 'Order not found or credentials mismatch'))
    const items = Array.isArray(order.items) ? order.items : []
    if (!items.length) throw new Error(rmaLabel('该订单没有可退商品', 'No items in this order'))
    if (msg) msg.textContent = ''
    renderRmaItems(order, items)
    const itemsPanel = $('rma-items-panel')
    const reasonPanel = $('rma-reason-panel')
    if (itemsPanel) itemsPanel.hidden = false
    if (reasonPanel) reasonPanel.hidden = false
  } catch (error) {
    if (msg) msg.textContent = error?.message || rmaLabel('加载失败，请核对订单号与邮箱', 'Failed to load — check order number and email')
  } finally {
    if (btn) btn.disabled = false
  }
}

/** 渲染可勾选的商品列表 */
function renderRmaItems(order, items) {
  const box = $('rma-items')
  if (!box) return
  box.innerHTML = items
    .map((item, index) => {
      const pid = Number(item.productId || item.product_id || 0)
      const title = item.title || item.name || ''
      const qty = Math.max(1, Number(item.qty || item.quantity || 1))
      return `<label class="rma-item">
        <input type="checkbox" data-rma-pick="${pid}" data-rma-title="${esc(title)}" data-rma-qty="${qty}" checked />
        <span class="rma-item-body">
          <span class="rma-item-title">${esc(title)}</span>
          <span class="muted">${rmaLabel('数量', 'Qty')}: ${qty}${item.size ? ` · ${esc(item.size)}` : ''}</span>
        </span>
      </label>`
    })
    .join('')
}

/** 提交申请 */
async function rmaSubmit() {
  const orderNo = ($('rma-order')?.value || '').trim()
  const email = ($('rma-email')?.value || '').trim()
  const reason = ($('rma-reason')?.value || '').trim()
  const msg = $('rma-submit-msg')
  const typeInput = document.querySelector('input[name="rma-type"]:checked')
  const type = typeInput ? typeInput.value : 'refund'
  const picked = [...document.querySelectorAll('[data-rma-pick]:checked')].map((el) => ({
    productId: Number(el.dataset.rmaPick),
    title: el.dataset.rmaTitle || '',
    qty: Number(el.dataset.rmaQty) || 1,
  }))
  if (!orderNo) {
    if (msg) msg.textContent = rmaLabel('请填写订单号', 'Order number is required')
    return
  }
  if (!picked.length) {
    if (msg) msg.textContent = rmaLabel('请至少选择一件商品', 'Select at least one item')
    return
  }
  if (reason.length < 5) {
    if (msg) msg.textContent = rmaLabel('请填写申请原因（至少 5 个字）', 'Please provide a reason (at least 5 characters)')
    return
  }
  const btn = $('rma-submit')
  if (btn) btn.disabled = true
  if (msg) msg.textContent = rmaLabel('提交中…', 'Submitting…')
  try {
    const token = guestTokenFor(orderNo)
    const response = await fetch(apiUrl('/api/store/rma/apply'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ orderNo, email, token, type, items: picked, reason, images: [] }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      if (msg) msg.textContent = data.error || rmaLabel('提交失败，请稍后再试', 'Failed to submit — please try later')
      return
    }
    if (msg) msg.textContent = ''
    const done = $('rma-done')
    const noEl = $('rma-no')
    if (noEl) noEl.textContent = data.rmaNo || ''
    if (done) done.hidden = false
    const selfBtn = $('rma-check-self')
    if (selfBtn) selfBtn.setAttribute('data-no', data.rmaNo || '')
    const itemsPanel = $('rma-items-panel')
    const reasonPanel = $('rma-reason-panel')
    if (itemsPanel) itemsPanel.hidden = true
    if (reasonPanel) reasonPanel.hidden = true
    const checkNo = $('rma-check-no')
    const checkEmail = $('rma-check-email')
    if (checkNo) checkNo.value = data.rmaNo || ''
    if (checkEmail) checkEmail.value = email
    toast(rmaLabel('售后申请已提交', 'Return request submitted'))
  } catch {
    if (msg) msg.textContent = rmaLabel('提交失败，请稍后再试', 'Failed to submit — please try later')
  } finally {
    if (btn) btn.disabled = false
  }
}

/** 查询售后进度 */
async function rmaCheck(no, email) {
  const msg = $('rma-check-msg')
  const result = $('rma-result')
  if (msg) msg.textContent = rmaLabel('查询中…', 'Checking…')
  try {
    const data = await apiJson(`/rma/check?no=${encodeURIComponent(no)}&email=${encodeURIComponent(email)}`)
    const rma = data?.rma
    if (result) {
      const rows = Array.isArray(rma?.items) ? rma.items : []
      result.innerHTML = `
        <div class="rma-result-head">${rmaStatusBadge(rma?.status)}<span class="mono">${esc(rma?.rma_no || no)}</span></div>
        <table class="rma-result-table">
          <tbody>
            <tr><th>${rmaLabel('类型', 'Type')}</th><td>${esc((rmaTypeOptions().find((o) => o.code === rma?.type) || {}).name || rma?.type || '—')}</td></tr>
            <tr><th>${rmaLabel('商品', 'Items')}</th><td>${rows.length ? esc(rows.map((r) => `${r.title || ''} ×${r.qty || 1}`).join('；')) : '—'}</td></tr>
            <tr><th>${rmaLabel('原因', 'Reason')}</th><td>${esc(rma?.reason || '—')}</td></tr>
            ${Number(rma?.refund_usd) > 0 ? `<tr><th>${rmaLabel('退款金额', 'Refund')}</th><td>${money(Number(rma.refund_usd))}</td></tr>` : ''}
            ${rma?.return_tracking_no ? `<tr><th>${rmaLabel('退回单号', 'Return tracking')}</th><td class="mono">${esc(rma.return_tracking_no)}</td></tr>` : ''}
            ${rma?.resolution ? `<tr><th>${rmaLabel('处理说明', 'Resolution')}</th><td>${esc(rma.resolution)}</td></tr>` : ''}
            <tr><th>${rmaLabel('提交时间', 'Created')}</th><td>${esc(String(rma?.created_at || '').slice(0, 19).replace('T', ' '))}</td></tr>
          </tbody>
        </table>`
    }
    if (msg) msg.textContent = ''
  } catch (error) {
    if (result) result.innerHTML = ''
    if (msg) msg.textContent = error?.message || rmaLabel('查询失败，请核对单号与邮箱', 'Not found — check number and email')
  }
}

function renderOrderPage(order, bankInstructions, giftCards) {
  if (!order) return `<div class="empty-note">${t('notFound')}</div>`
  const paid = order.paymentStatus === 'paid'
  const cancellable = order.status === 'pending_payment'
  const addr = order.addressJson || {}
  const giftBlock =
    paid && Array.isArray(giftCards) && giftCards.length
      ? `<div class="panel">
          <div class="panel-title">${t('giftCardCodes')}</div>
          ${giftCards
            .map(
              (card) => `
          <div class="giftcard-code-row">
            <span class="mono giftcard-code">${esc(card.code)}</span>
            <span class="giftcard-balance">${money(card.balance_usd)} / ${money(card.initial_usd)}</span>
          </div>`,
            )
            .join('')}
          <p class="fine-print">${t('giftCardKeepCode')}</p>
        </div>`
      : ''
  return `
    <h1 class="page-title">${order.status === 'pending_payment' ? t('orderPlaced') : t('viewOrder')} · <span class="mono">${esc(order.orderNo)}</span></h1>
    <div class="banner ${paid ? 'ok' : 'warn'}">
      <b>${esc(orderStatusLabel(order))}</b> · ${paid ? t('paymentPaid') : t('paymentUnpaid')}
      <div class="banner-sub">${t(order.status === 'pending_payment' ? 'orderPlacedHint' : 'orderStatusHint')}</div>
    </div>
    <div class="checkout-grid">
      <div class="checkout-main">
        <div class="panel">
          <div class="panel-title">${t('orderItems')}</div>
          ${renderOrderItems(order)}
        </div>
        <div class="panel">
          <div class="panel-title">${t('shipTo')}</div>
          <div class="addr-block">
            <div><b>${esc(order.buyerName || '')}</b></div>
            <div>${esc([addr.houseNumber, addr.address].filter(Boolean).join(' '))}</div>
            <div>${esc([addr.city, addr.state, addr.zipCode].filter(Boolean).join(', '))}</div>
            <div>${esc(addr.country || order.buyerCountry || '')}</div>
            <div class="muted">${esc(order.buyerPhone || '')} · ${esc(order.buyerEmail || '')}</div>
            <div class="muted">${esc(order.shippingMethod || '')}</div>
          </div>
        </div>
        ${renderBankInstructions(bankInstructions)}
        ${giftBlock}
        ${renderInvoiceBlock(order)}
      </div>
      <aside class="checkout-side">
        <div class="panel">
          <div class="panel-title">${t('orderSummary')}</div>
          <div class="summary-row"><span>${t('orderNumber')}</span><span class="mono">${esc(order.orderNo)}</span></div>
          <div class="summary-row"><span>${t('orderTime')}</span><span>${esc(shortDate(order.createdAt))}</span></div>
          ${order.trackingNo ? `<div class="summary-row"><span>${t('trackingNo')}</span><span class="mono">${esc(order.trackingNo)}</span></div>` : ''}
          <div class="summary-divider"></div>
          ${renderAmountBlock(order)}
          <div class="cart-foot-actions" style="margin-top:12px">
            ${
              order.status === 'pending_payment'
                ? `<button class="btn-primary" style="width:100%" data-pay-order="${esc(order.orderNo)}" type="button">${t('payNow')}</button>`
                : ''
            }
            <a class="btn-ghost" style="width:100%;display:block;text-align:center" href="${esc(order.trackUrl)}" target="_blank" rel="noopener noreferrer">${t('trackThisOrder')}</a>
            ${
              cancellable
                ? `<button class="link-btn danger" data-cancel-order="${esc(order.orderNo)}" type="button">${t('cancelOrder')}</button>`
                : ''
            }
            ${
              // #15/#18 已发货的订单才给售后入口（未发货走「取消订单」即可，无需退换）
              paid
                ? `<a class="link-btn" href="/returns">${isZh(state.lang) ? '申请退货 / 换货' : 'Request return or exchange'}</a>`
                : ''
            }
            <a class="link-btn" href="/">← ${t('continueShopping')}</a>
          </div>
        </div>
      </aside>
    </div>`
  // #16 发票入口：DOM 就绪后异步拉履约聚合，有单据才显示区块（无单据则整块隐藏）
  void mountInvoicePanel(order.orderNo)
}

/** 拉订单详情（登录用户凭会话，访客凭本机存的下单令牌） */
async function fetchOrder(orderNo) {
  const token = guestTokenFor(orderNo)
  const query = token ? `?token=${encodeURIComponent(token)}` : ''
  return apiJson(`/orders/${encodeURIComponent(orderNo)}${query}`)
}

/* --------------------- 结算 / 支付 / 取消 的动作 --------------------- */

/** 必填项与对应的界面文案 key（与服务端校验口径一致） */
const CHECKOUT_REQUIRED = [
  ['name', 'fieldName'],
  ['email', 'fieldEmail'],
  ['country', 'fieldCountry'],
  ['state', 'fieldState'],
  ['city', 'fieldCity'],
  ['address', 'fieldAddress'],
  ['houseNumber', 'fieldHouse'],
  ['zipCode', 'fieldZip'],
  ['phone', 'fieldPhone'],
]

/** 邮编格式规则（M1 地址校验）：regex + 人类可读的格式提示 */
const ZIP_RULES = {
  US: { re: /^\d{5}(-\d{4})?$/, hint: '12345' },
  CA: { re: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, hint: 'K1A 0B1' },
  GB: { re: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/, hint: 'SW1A 1AA' },
  DE: { re: /^\d{5}$/, hint: '10115' },
  FR: { re: /^\d{5}$/, hint: '75001' },
  IT: { re: /^\d{5}$/, hint: '00100' },
  ES: { re: /^\d{5}$/, hint: '28001' },
  NL: { re: /^\d{4}\s?[A-Za-z]{2}$/, hint: '1234 AB' },
  BE: { re: /^\d{4}$/, hint: '1000' },
  AT: { re: /^\d{4}$/, hint: '1010' },
  CH: { re: /^\d{4}$/, hint: '8001' },
  SE: { re: /^\d{3}\s?\d{2}$/, hint: '114 55' },
  DK: { re: /^\d{4}$/, hint: '1050' },
  NO: { re: /^\d{4}$/, hint: '0150' },
  FI: { re: /^\d{5}$/, hint: '00100' },
  PL: { re: /^\d{2}-\d{3}$/, hint: '00-950' },
  PT: { re: /^\d{4}-\d{3}$/, hint: '1000-001' },
  AU: { re: /^\d{4}$/, hint: '2000' },
  NZ: { re: /^\d{4}$/, hint: '6011' },
  JP: { re: /^\d{3}-?\d{4}$/, hint: '100-0001' },
  KR: { re: /^\d{5}$/, hint: '04524' },
  SG: { re: /^\d{6}$/, hint: '018956' },
  BR: { re: /^\d{5}-?\d{3}$/, hint: '20040-020' },
  IN: { re: /^\d{6}$/, hint: '110001' },
  CN: { re: /^\d{6}$/, hint: '100000' },
}

/** 客户端地址格式校验：先于服务端一步，失败返回文案 key */
function validateCheckoutClient(buyer) {
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(String(buyer.email || ''))) return 'emailInvalid'
  const rule = ZIP_RULES[buyer.country]
  if (rule && !rule.re.test(String(buyer.zipCode || '').trim())) return 'zipInvalid'
  return ''
}

/* ---------- 设备指纹（M8 结账风控）：稳定哈希，不含任何个人信息 ---------- */
function deviceFp() {
  try {
    const cached = localStorage.getItem('mxq.fp')
    if (cached) return cached
    const raw = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height + 'x' + (screen.colorDepth || 24),
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
    ].join('|')
    let h1 = 0x811c9dc5
    let h2 = 0x01000193
    for (let i = 0; i < raw.length; i++) {
      h1 = (h1 ^ raw.charCodeAt(i)) * 16777619 >>> 0
      h2 = (h2 + raw.charCodeAt(i) * (i + 7)) >>> 0
    }
    const fp = `${h1.toString(16)}${h2.toString(16)}`
    localStorage.setItem('mxq.fp', fp)
    return fp
  } catch {
    return ''
  }
}

/** 渠道专属码（M5）：?ch=xxx 进站时捕获，会话内保持 */
function captureChannel() {
  try {
    const ch = new URLSearchParams(location.search).get('ch')
    if (ch) sessionStorage.setItem('mxq.ch', ch.slice(0, 40))
    state.channel = sessionStorage.getItem('mxq.ch') || ''
  } catch {
    state.channel = ''
  }
}

/* ---------- 弃购挽回（M7）：邮箱可用即静默登记，最多每 60 秒一次 ---------- */
const ABANDONED_KEY = 'mxq.abandoned.token'
let abandonedLastSave = 0
function abandonedToken() {
  let token = ''
  try {
    token = localStorage.getItem(ABANDONED_KEY) || ''
    if (!token) {
      token = crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '') : Math.random().toString(36).slice(2) + Date.now().toString(36)
      localStorage.setItem(ABANDONED_KEY, token)
    }
  } catch {
    token = Math.random().toString(36).slice(2) + Date.now().toString(36)
  }
  return token
}
function scheduleAbandonedSave() {
  const now = Date.now()
  if (now - abandonedLastSave < 60_000) return
  const draft = checkoutState()
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(String(draft.buyer.email || ''))) return
  abandonedLastSave = now
  apiJson('/abandoned/save', {
    method: 'POST',
    body: {
      token: abandonedToken(),
      email: draft.buyer.email,
      phone: draft.buyer.phone,
      buyer: draft.buyer,
      items: cartToApiItems(),
      amounts: draft.quote ? { subtotal: draft.quote.subtotal, total: draft.quote.total, currency: state.currency } : {},
    },
  }).catch(() => null)
}

/** 表单值 → 草稿。只读不请求，避免每敲一个字就打一次接口 */
function readCheckoutForm() {
  const draft = checkoutState()
  const val = (id) => {
    const node = $(id)
    return node ? String(node.value || '').trim() : ''
  }
  if (!$('ck-name')) return
  draft.buyer = {
    name: val('ck-name'),
    email: val('ck-email'),
    phone: val('ck-phone'),
    country: val('ck-country') || draft.buyer.country,
    state: val('ck-state'),
    city: val('ck-city'),
    address: val('ck-address'),
    houseNumber: val('ck-house'),
    zipCode: val('ck-zip'),
  }
  draft.note = val('ck-note')
}

async function placeOrder() {
  const draft = checkoutState()
  if (!state.cart.length) {
    toast(t('checkoutEmpty'))
    return
  }
  readCheckoutForm()
  const missing = CHECKOUT_REQUIRED.find(([key]) => !String(draft.buyer[key] || '').trim())
  if (missing) {
    toast(t('fillField', t(missing[1])))
    return
  }
  // 客户端格式校验（M1）：邮箱 / 邮编按目的国规则，先于服务端一步
  const invalidKey = validateCheckoutClient(draft.buyer)
  if (invalidKey) {
    toast(invalidKey === 'zipInvalid' ? t('zipInvalid', ZIP_RULES[draft.buyer.country].hint) : t(invalidKey))
    return
  }
  draft.busy = true
  draft.error = ''
  renderCheckout()
  try {
    const data = await apiJson('/checkout/place', {
      method: 'POST',
      body: {
        items: cartToApiItems(),
        buyer: draft.buyer,
        ship: draft.buyer,
        shippingCode: draft.shippingCode,
        coupon: draft.coupon,
        giftCard: draft.giftCard,
        channel: state.channel || '',
        fp: deviceFp(),
        paymentMethod: draft.paymentMethod || 'sandbox',
        note: draft.note,
        currency: state.currency,
        attribution: growthUtmPayload(), // M9：UTM 首末触 + 分销码归因
      },
    })
    const orderNo = data.order?.orderNo
    if (orderNo && data.guestToken) saveGuestToken(orderNo, data.guestToken)
    // 下单成功：购物车清空、草稿丢弃，直接进支付页
    state.cart = []
    saveCart()
    renderCart()
    state.checkout = null
    lastOrderKey = ''
    toast(t('orderPlaced'))
    navigate(`/pay/${encodeURIComponent(orderNo)}`)
  } catch (error) {
    draft.busy = false
    draft.error = error?.message || '下单失败'
    renderCheckout()
    toast(draft.error)
  }
}

async function payCurrentOrder() {
  const view = state.orderView
  if (!view?.order) return
  const method = view.selected || 'sandbox'
  view.busy = true
  view.message = ''
  repaintPay()
  try {
    const data = await apiJson('/pay', {
      method: 'POST',
      body: { orderNo: view.order.orderNo, method, guestToken: guestTokenFor(view.order.orderNo) },
    })
    if (data.order) view.order = data.order
    view.bankInstructions = data.bankInstructions || null
    view.busy = false
    view.message = method === 'bank' ? t('payPendingHint') : t('paySuccess')
    view.tone = method === 'bank' ? 'warn' : 'ok'
    repaintPay()
    toast(view.message)
  } catch (error) {
    view.busy = false
    view.message = error?.message || t('payFailed')
    view.tone = 'error'
    repaintPay()
    toast(view.message)
  }
}

async function cancelOrder(orderNo) {
  if (!window.confirm(t('cancelConfirm'))) return
  try {
    await apiJson(`/orders/${encodeURIComponent(orderNo)}/cancel`, {
      method: 'POST',
      body: { guestToken: guestTokenFor(orderNo), reason: 'buyer cancelled' },
    })
    toast(t('orderCancelled'))
    lastOrderKey = ''
    const route = currentRoute()
    if (route.name === 'order' || route.name === 'pay') {
      state.orderView = { loading: true, orderNo, payments: [], busy: false, error: '' }
      void loadOrderView(route.name, orderNo)
    }
  } catch (error) {
    toast(error?.message || t('cancelOrder'))
  }
}

/* --------------------- 结算页表单联动 --------------------- */

document.addEventListener('input', (event) => {
  if (currentRoute().name !== 'checkout') return
  const id = event.target?.id || ''
  if (!/^ck-/.test(id)) return
  readCheckoutForm()
})

document.addEventListener('change', (event) => {
  const route = currentRoute()
  // 列表排序：纯前端重排，改完回列表顶部（分页由 gridFilterSignature 自动重置）
  if (event.target?.id === 'sort-select') {
    state.sort = event.target.value || 'default'
    render()
    return
  }
  // 折扣阈值：0 = 不限，其余是百分比下限
  if (event.target?.id === 'sale-select') {
    const next = Number(event.target.value)
    state.saleMin = Number.isFinite(next) && next > 0 ? next : 0
    render()
    return
  }
  // 品牌 / 尺码筛选（商品与目录模块）
  if (event.target?.id === 'brand-select') {
    state.brandFilter = event.target.value || ''
    render()
    return
  }
  if (event.target?.id === 'size-select') {
    state.sizeFilter = event.target.value || ''
    render()
    return
  }
  // M4 晒图选择
  if (event.target?.id === 'review-file') {
    pickReviewImages(event.target.files)
    event.target.value = ''
    return
  }
  // 支付页：切换支付渠道只更新草稿，不改金额；但 PayPal/银行卡有专属挂载组件，需要重画
  if (route.name === 'pay' && event.target?.name === 'payment') {
    if (state.orderView) {
      state.orderView.selected = event.target.value
      repaintPay()
    }
    return
  }
  // 注册表单换国家 → 清空州/省并刷新候选（与结算页逻辑互不干扰，放前面提前返回）
  if (event.target?.id === 'rg-country') {
    syncRegisterStates()
    const stateInput = document.getElementById('rg-state')
    if (stateInput) stateInput.value = ''
    return
  }
  if (route.name !== 'checkout') return
  const id = event.target?.id || ''

  // 换国家会连带换运费分区与州列表，必须重新报价并重画
  if (id === 'ck-country') {
    const draft = checkoutState()
    readCheckoutForm()
    draft.buyer.state = ''
    render()
    void refreshQuote()
    return
  }
  if (id === 'ck-state') {
    readCheckoutForm()
    void refreshQuote()
    return
  }
  if (event.target?.name === 'shipping') {
    const draft = checkoutState()
    draft.shippingCode = event.target.value
    void refreshQuote()
    return
  }
  if (event.target?.name === 'payment') {
    checkoutState().paymentMethod = event.target.value
    readCheckoutForm()
    renderCheckout()
  }
})

// 结算页：邮箱/电话/邮编填好就静默登记弃购（M7，60 秒节流）
document.addEventListener('blur', (event) => {
  if (!['ck-email', 'ck-phone', 'ck-zip', 'ck-name'].includes(event.target?.id)) return
  if (currentRoute().name !== 'checkout') return
  readCheckoutForm()
  scheduleAbandonedSave()
}, true)

/* ------------------------ 客户账号 / 订单查询 ------------------------ */

/** 订单状态展示口径与后台 src/lib/status.ts 保持一致 */
const ORDER_STATUS = {
  pending_shipment: { key: 'orderPendingShipment', tone: 'amber' },
  shipping: { key: 'orderShipping', tone: 'blue' },
  completed: { key: 'orderCompleted', tone: 'emerald' },
  refunding: { key: 'orderRefunding', tone: 'amber' },
  cancelled: { key: 'orderCancelled', tone: 'slate' },
}
const orderStatus = (status) => {
  const entry = ORDER_STATUS[status]
  return entry ? { label: t(entry.key), tone: entry.tone } : { label: value_or_dash(status), tone: 'slate' }
}
const value_or_dash = (value) => String(value || '').trim() || t('unknown')

const shortDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  const pad = (number) => String(number).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const MODALS = ['auth-modal', 'track-modal', 'account-modal', 'imgsearch-modal', 'size-guide-modal']

function openModal(id) {
  for (const key of MODALS) $(key).hidden = key !== id
  $('modal-scrim').hidden = false
  document.body.style.overflow = 'hidden'
}

function closeModals() {
  for (const key of MODALS) $(key).hidden = true
  $('modal-scrim').hidden = true
  document.body.style.overflow = ''
}

function showMsg(id, text, ok = false) {
  const node = $(id)
  if (!node) return
  if (!text) {
    node.hidden = true
    node.textContent = ''
    return
  }
  node.textContent = text
  node.classList.toggle('ok', ok)
  node.hidden = false
}

/** 表单取值 + 必填校验。服务端会再校验一次，这里是为了给出即时的中文提示 */
const formValue = (form, name) => String(new FormData(form).get(name) ?? '').trim()
const markInvalid = (form, names) => {
  form.querySelectorAll('input').forEach((input) => input.classList.toggle('invalid', names.includes(input.name)))
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload || {}),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(apiMessage(data.error) || t('requestFailed', response.status))
  return data
}

function renderAccountButton() {
  const label = $('account-label')
  const button = $('account-btn')
  if (!label || !button) return
  if (state.customer) {
    const account = String(state.customer.account || '')
    label.textContent = account.length > 18 ? `${account.slice(0, 16)}…` : account
    button.classList.add('is-in')
    button.title = t('myAccount')
  } else {
    label.textContent = t('loginRegister')
    button.classList.remove('is-in')
    button.title = t('loginOrRegisterHint')
  }
}

/** 恢复登录态：会话在 HttpOnly cookie 里，前端只问「我是谁」 */
async function loadSession() {
  // 第三方登录回跳提示（?oauthWelcome=1 / ?oauthError=...）
  const params = new URLSearchParams(window.location.search)
  if (params.get('oauthWelcome')) {
    toast(t('oauthWelcome'), 'success')
    history.replaceState(null, '', window.location.pathname)
  } else if (params.get('oauthError')) {
    toast(`${t('oauthFailed')}: ${decodeURIComponent(params.get('oauthError'))}`, 'warn')
    history.replaceState(null, '', window.location.pathname)
  }
  try {
    const data = await fetch(apiUrl('/api/store/auth/me')).then((response) => response.json())
    state.customer = data.customer || null
    // 会员积分/等级等扩展字段已并入 customer
  } catch {
    state.customer = null
  }
  renderAccountButton()
  // 首屏 render() 先于本函数完成；若正停在账号中心，拿到登录态后补渲染
  if (currentRoute().name === 'account') {
    if (state.customer) closeModals()
    renderAccountPage(currentRoute().tab || '')
  }
  // 结算页同理：登录态恢复后补建「已存地址一键填充」块
  if (currentRoute().name === 'checkout' && state.customer && document.getElementById('ck-name') && !document.getElementById('ck-saved-chips')) {
    const panel = document.querySelector('.checkout-main .panel')
    if (panel) {
      const block = document.createElement('div')
      block.className = 'ck-saved'
      block.innerHTML = `<span class="muted small">${t('ckSavedAddresses')}</span><div class="ck-saved-chips" id="ck-saved-chips"></div>`
      panel.insertBefore(block, panel.querySelector('.form-grid'))
      loadSavedAddresses()
    }
  }
}

function setAuthTab(tab) {
  const isLogin = tab !== 'register'
  const is2fa = tab === 'twofa'
  $('login-form').hidden = !isLogin || is2fa
  $('register-form').hidden = isLogin
  const twofa = document.getElementById('twofa-form')
  if (twofa) twofa.hidden = !is2fa
  showMsg('login-msg', '')
  showMsg('register-msg', '')
  showMsg('twofa-msg', '')
  $('auth-tabs')
    .querySelectorAll('button')
    .forEach((node) => node.classList.toggle('active', (node.dataset.authTab === 'login') === isLogin))
  if (!is2fa && !isLogin) {
    // 切到注册页：保证国家下拉已灌满、州/省候选跟随已选国家
    syncRegisterCountries()
    syncRegisterStates()
  }
}

function openAuthModal() {
  setAuthTab('login')
  openModal('auth-modal')
  fillRegisterFromLocale()
  setTimeout(() => $('lg-account').focus(), 30)
}

/** 把 Ship to 面板选择的国家/州/城市预填进注册表单（仅填空字段） */
function fillRegisterFromLocale() {
  const el = (id) => document.getElementById(id)
  syncRegisterCountries()
  // 国家统一用 ISO-2 码（与结算页、运费分区、订单地址同一口径）
  const code = countryCodeFrom(state.shipCountry || '')
  if (el('rg-country') && !el('rg-country').value && code) el('rg-country').value = code
  syncRegisterStates()
  if (el('rg-state') && !el('rg-state').value && state.shipState) el('rg-state').value = state.shipState
  if (el('rg-city') && !el('rg-city').value && state.shipCity) el('rg-city').value = state.shipCity
}

/**
 * 注册表单的国家下拉：从 MXQ_GEO 灌入 250 个国家，value = ISO-2 码。
 * 做成下拉而不是自由文本，是为了避免用户手打出 "German" / "Deutschland" 这类
 * 落库后无法与订单、运费分区对上的脏值。
 */
function syncRegisterCountries() {
  const select = document.getElementById('rg-country')
  if (!select || select.tagName !== 'SELECT') return
  const countries = window.MXQ_GEO?.countries || []
  if (!countries.length) return
  if (select.options.length === countries.length) return
  const current = select.value
  select.innerHTML = [
    `<option value=""></option>`,
    ...countries.map((item) => `<option value="${esc(item.c)}">${esc(item.n)}</option>`),
  ].join('')
  if (current) select.value = current
}

/** 注册表单的州/省候选：跟随已选国家变化（有登记州的国家给下拉候选，其余自由填写） */
function syncRegisterStates() {
  const input = document.getElementById('rg-state')
  const list = document.getElementById('rg-state-list')
  if (!input || !list) return
  const country = countryCodeFrom(document.getElementById('rg-country')?.value || '')
  const states = window.MXQ_GEO?.states?.[country] || []
  list.innerHTML = states.map((name) => `<option value="${esc(name)}"></option>`).join('')
}

function openTrackModal() {
  $('track-result').innerHTML = ''
  showMsg('track-msg', '')
  openModal('track-modal')
  setTimeout(() => $('tk-no').focus(), 30)
}

/** 注册表单项，顺序即展示顺序；用户要求收货信息每一项都必填 */
const REGISTER_FIELDS = [
  ['account', 'fieldAccount'],
  ['password', 'fieldPassword'],
  ['confirm', 'fieldConfirm'],
  ['country', 'fieldCountry'],
  ['state', 'fieldState'],
  ['city', 'fieldCity'],
  ['address', 'fieldAddress'],
  ['houseNumber', 'fieldHouse'],
  ['zipCode', 'fieldZip'],
  ['phone', 'fieldPhone'],
]

async function submitRegister(form) {
  const values = Object.fromEntries(REGISTER_FIELDS.map(([name]) => [name, formValue(form, name)]))
  const missing = REGISTER_FIELDS.find(([name]) => !values[name])
  if (missing) {
    markInvalid(form, [missing[0]])
    showMsg('register-msg', t('fillField', t(missing[1])))
    return
  }
  if (values.password.length < 8 || !/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
    markInvalid(form, ['password'])
    showMsg('register-msg', t('secPwPolicy'))
    return
  }
  if (values.password !== values.confirm) {
    markInvalid(form, ['password', 'confirm'])
    showMsg('register-msg', t('passwordMismatch'))
    return
  }
  markInvalid(form, [])

  // 国家落库统一用 ISO-2（与订单地址、运费分区同口径）；老数据里的国家名这里也能折算回来
  const country = countryCodeFrom(values.country)
  if (!country) {
    markInvalid(form, ['country'])
    showMsg('register-msg', t('pickCountry'))
    return
  }
  values.country = country

  const submit = form.querySelector('.form-submit')
  submit.disabled = true
  submit.textContent = t('submitProgress')
  try {
    const data = await postJson('/api/store/auth/register', {
      account: values.account,
      password: values.password,
      country: values.country,
      state: values.state,
      city: values.city,
      address: values.address,
      houseNumber: values.houseNumber,
      zipCode: values.zipCode,
      phone: values.phone,
    })
    state.customer = data.customer
    renderAccountButton()
    form.reset()
    closeModals()
    refreshAccountRouteAfterAuth()
    toast(t('registerSuccess', state.customer.account))
  } catch (error) {
    showMsg('register-msg', String(error?.message || error))
  } finally {
    submit.disabled = false
    submit.textContent = t('registerAndLogin')
  }
}

/** 登录/注册/2FA 成功后：若正停在账号中心路由，立即重渲染，避免停留在登录前空态 */
function refreshAccountRouteAfterAuth() {
  const route = currentRoute()
  if (route.name !== 'account') return
  closeModals()
  renderAccountPage(route.tab || '')
}

async function submitLogin(form) {
  const account = formValue(form, 'account')
  const password = formValue(form, 'password')
  if (!account || !password) {
    markInvalid(form, [!account ? 'account' : 'password'])
    showMsg('login-msg', t('fillAccountAndPassword'))
    return
  }
  markInvalid(form, [])

  const submit = form.querySelector('.form-submit')
  submit.disabled = true
  submit.textContent = t('loginProgress')
  try {
    const data = await postJson('/api/store/auth/login', { account, password })
    // 两步验证已开启：切到动态码步骤，挑战令牌暂存
    if (data.twoFactor) {
      state.pending2fa = data.challenge
      setAuthTab('twofa')
      setTimeout(() => $('tf-code')?.focus(), 30)
      return
    }
    state.customer = data.customer
    renderAccountButton()
    form.reset()
    closeModals()
    refreshAccountRouteAfterAuth()
    if (data.loginNotice) toast(data.loginNotice, 'warn')
    toast(t('welcomeBack', state.customer.account))
  } catch (error) {
    showMsg('login-msg', String(error?.message || error))
  } finally {
    submit.disabled = false
    submit.textContent = t('signIn')
  }
}

/** 两步验证：挑战 + 动态码 → 正式会话 */
async function submitTwoFa(form) {
  const code = formValue(form, 'code')
  if (!/^\d{6}$/.test(code)) {
    showMsg('twofa-msg', t('twoFactorHint'))
    return
  }
  const submit = form.querySelector('.form-submit')
  submit.disabled = true
  try {
    const data = await postJson('/api/store/auth/2fa/verify', { challenge: state.pending2fa, code })
    state.pending2fa = null
    state.customer = data.customer
    renderAccountButton()
    form.reset()
    closeModals()
    refreshAccountRouteAfterAuth()
    if (data.loginNotice) toast(data.loginNotice, 'warn')
    toast(t('welcomeBack', state.customer.account))
  } catch (error) {
    showMsg('twofa-msg', String(error?.message || error))
  } finally {
    submit.disabled = false
  }
}

/** 第三方登录：跳服务端 start（未配置凭据时给出明确提示） */
async function startOauth(provider) {
  try {
    const res = await fetch(apiUrl(`/api/store/auth/oauth/${provider}/start`), { redirect: 'manual' })
    if (res.type === 'opaqueredirect' || res.redirected || (res.status >= 300 && res.status < 400)) {
      window.location.href = `/api/store/auth/oauth/${provider}/start`
      return
    }
    const data = await res.json().catch(() => ({}))
    showMsg('oauth-msg', data.error || t('oauthNotConfigured'))
  } catch {
    showMsg('oauth-msg', t('oauthNotConfigured'))
  }
}

async function logout() {
  try {
    await postJson('/api/store/auth/logout', {})
  } catch {
    /* 服务端失败也照样清本地登录态，避免界面卡在已登录 */
  }
  state.customer = null
  renderAccountButton()
  closeModals()
  toast(t('loggedOut'))
}

function renderAccount() {
  const customer = state.customer
  if (!customer) {
    openAuthModal()
    return
  }
  const initial = String(customer.account || '?').replace(/^\+/, '').charAt(0).toUpperCase()
  $('account-body').innerHTML = `
    <div class="acct-top">
      <div class="acct-avatar">${esc(initial || '?')}</div>
      <div>
        <div class="acct-name">${esc(customer.account)}</div>
        <div class="acct-sub">${customer.accountType === 'phone' ? t('phoneAccount') : t('emailAccount')} · ${t('registeredOn', shortDate(customer.createdAt))}</div>
      </div>
    </div>
    <div class="acct-section">
      <h4>${t('defaultAddress')}</h4>
      <div class="acct-list">
        <div><b>${t('fieldCountry')}</b><span>${esc(countryCodeFrom(customer.country) ? countryName(countryCodeFrom(customer.country)) : customer.country || '')}</span></div>
        <div><b>${t('fieldState')}</b><span>${esc(customer.state)}</span></div>
        <div><b>${t('fieldCity')}</b><span>${esc(customer.city)}</span></div>
        <div><b>${t('fieldAddress')}</b><span>${esc(customer.address)}</span></div>
        <div><b>${t('fieldHouse')}</b><span>${esc(customer.houseNumber)}</span></div>
        <div><b>${t('fieldZip')}</b><span>${esc(customer.zipCode)}</span></div>
        <div><b>${t('fieldPhone')}</b><span>${esc(customer.phone)}</span></div>
      </div>
    </div>
    <div class="acct-actions">
      <button type="button" data-acct="track">${t('trackOrdersAction')}</button>
      <button type="button" class="u-center-link" data-acct="center">🏠 ${t('acctCenter')}</button>
      <button type="button" class="danger" data-acct="logout">${t('logoutAction')}</button>
    </div>
    <div class="acct-section">
      <h4>${t('myOrders')}</h4>
      <div id="acct-orders"><div class="muted">${t('loading')}</div></div>
    </div>`
  openModal('account-modal')
  void loadMyOrders()
}

/** 「我的订单」：登录客户的订单列表，点一条跳到订单详情页 */
async function loadMyOrders() {
  const box = $('acct-orders')
  if (!box) return
  try {
    const data = await apiJson('/orders')
    const orders = Array.isArray(data.orders) ? data.orders : []
    state.myOrders = orders
    box.innerHTML = orders.length
      ? orders
          .map(
            (order) => `
        <a class="acct-order" href="/order/${encodeURIComponent(order.orderNo)}">
          <span class="mono">${esc(order.orderNo)}</span>
          <span class="acct-order-status">${esc(orderStatusLabel(order))}</span>
          <b>${money(order.totalUsd)}</b>
        </a>`,
          )
          .join('')
      : `<div class="muted">${t('noOrders')}</div>`
  } catch (error) {
    box.innerHTML = `<div class="muted">${esc(error?.message || t('noOrders'))}</div>`
  }
}

/** 单张订单卡片；主按钮把运单号带进 17TRACK */
function trackCard(order) {
  const status = orderStatus(order.status)
  const items = (Array.isArray(order.items) ? order.items : [])
    .map((item) => {
      // 接口给的是 lineUsd / unitUsd（与订单页同一套字段），旧代码读 item.price 恒为 undefined → 显示 0
      const lineUsd = item.lineUsd ?? (Number(item.unitUsd) || 0) * (Number(item.qty) || 1)
      return `<div>
        <span>${esc(tr(item.title || t('allProducts'), state.lang))} × ${Number(item.qty) || 1}${
          item.optionsText ? `<br /><em class="track-opt">${esc(item.optionsText)}</em>` : ''
        }</span>
        <span>${money(lineUsd)}</span>
      </div>`
    })
    .join('')
  return `
    <div class="track-card">
      <div class="track-card-head">
        <span class="track-no">${esc(order.orderNo || '-')}</span>
        <span class="track-status tone-${esc(status.tone)}">${esc(status.label)}</span>
      </div>
      <div class="track-meta">
        <div><b>${t('trackingNo')}</b>${esc(order.trackingNo || t('pendingGenerate'))}</div>
        <div><b>${t('carrier')}</b>${esc(order.carrier || t('pendingAssign'))}</div>
        <div><b>${t('orderTime')}</b>${esc(shortDate(order.createdAt))}</div>
        <div><b>${t('shipTime')}</b>${esc(shortDate(order.shippedAt))}</div>
        <div><b>${t('destCountry')}</b>${esc(order.buyerCountry || '—')}</div>
        <div><b>${t('orderAmount')}</b>${money(order.totalUsd)} · ${Number(order.itemCount) || 0} ${t('unitPieces')}</div>
      </div>
      ${items ? `<div class="track-items">${items}</div>` : ''}
      <div class="track-actions">
        <a class="primary" href="${esc(order.trackUrl)}" target="_blank" rel="noopener noreferrer">${t('trackOn17track')}</a>
        <a class="ghost" href="https://www.17track.net/zh-cn" target="_blank" rel="noopener noreferrer">17TRACK</a>
      </div>
    </div>`
}

function renderTrackResult(data) {
  const box = $('track-result')
  const orders = Array.isArray(data.orders) ? data.orders : []
  if (!orders.length) {
    box.innerHTML = `
      <div class="track-result">
        <div class="form-msg">${t('trackNoResult', esc(data.query))}</div>
        <div class="track-actions">
          <a class="ghost" href="${esc(data.fallbackTrackUrl)}" target="_blank" rel="noopener noreferrer">${t('trackRetry')}</a>
        </div>
      </div>`
    return
  }
  box.innerHTML = `<div class="track-result">${orders.map(trackCard).join('')}</div>`
}

async function submitTrack(form) {
  const no = formValue(form, 'no')
  if (!no) {
    showMsg('track-msg', t('enterTrackNo'))
    return
  }
  showMsg('track-msg', '')
  const submit = form.querySelector('.form-submit')
  submit.disabled = true
  submit.textContent = t('queryProgress')
  try {
    renderTrackResult(await postJson('/api/store/track', { no }))
  } catch (error) {
    $('track-result').innerHTML = ''
    showMsg('track-msg', String(error?.message || error))
  } finally {
    submit.disabled = false
    submit.textContent = t('query')
  }
}

/* ------------------------------ 路由 ------------------------------ */

/**
 * 滚动位置按路由各自记账。
 *
 * 这是哈希路由 SPA：切路由只是替换 #app 的 innerHTML，浏览器会把滚动位置原样留着。
 * 于是「在列表里往下翻，点进商品详情」会停在详情页中部（实测 849px，正好错过主图与购买区）；
 * 但反过来「返回列表要回到刚才的位置」又必须保留。
 * 所以不能简单地每次切路由都滚到顶，也不能全交给 history.scrollRestoration：
 * 离开时把当前路由的位置记下来，进入新路由先归零，回到老路由再还原。
 */
const scrollMemory = new Map()
// 旧版 hash 路由的书签（/#/p/123）一次性改写成真路径，老链接不失效
if (location.hash && location.hash.startsWith('#/')) {
  history.replaceState({}, '', '/' + location.hash.slice(2) + location.search)
}
let scrollHash = location.pathname || '/'
/** 网格分页被重置（换分类/改关键词）时置位，渲染后回到列表顶部 */
let pendingScrollTop = false

function trackRouteScroll() {
  const routeKey = location.pathname || '/'
  if (routeKey === scrollHash) return
  // 先记下「正在离开的那个页面」滚到哪了
  scrollMemory.set(scrollHash, Math.round(window.scrollY))
  scrollHash = routeKey
  window.scrollTo(0, 0)
}

function restoreRouteScroll() {
  const saved = scrollMemory.get(scrollHash)
  if (saved) window.scrollTo(0, saved)
}

/**
 * 网格内容变化后（换分类/改关键词）回到列表顶部。
 * pendingScrollTop 只会在一次 render() 内被置位并消费掉，不会漏到下一次路由切换，
 * 所以不会跟「返回列表还原位置」互相打架。
 */
function flushScrollTop() {
  if (!pendingScrollTop) return
  pendingScrollTop = false
  window.scrollTo(0, 0)
}

function currentRoute() {
  const path = stripMarket(location.pathname || '/')
  const detail = path.match(/^\/p\/(\d+)/)
  if (detail) return { name: 'detail', id: Number(detail[1]) }
  if (path.startsWith('/image-search')) return { name: 'image-search' }
  if (path === '/search' || path.startsWith('/search/')) return { name: 'search' }
  if (path.startsWith('/cart')) return { name: 'cart' }
  if (path.startsWith('/checkout')) return { name: 'checkout' }
  if (path.startsWith('/favorites')) return { name: 'favorites' }
  // #8 心愿单公开分享页（/wishlist/<code>）——必须排在下面 group 匹配之前
  const wishlistShared = path.match(/^\/wishlist\/([A-Za-z0-9_-]{6,16})$/)
  if (wishlistShared) return { name: 'wishlist-shared', code: wishlistShared[1] }
  // #5 商品对比页（必须排在下面的 group 匹配之前，否则 /compare 会被当成单段分组 slug）
  if (path === '/compare' || path.startsWith('/compare/')) return { name: 'compare' }
  if (path === '/account' || path.startsWith('/account/')) return { name: 'account', tab: path.split('/')[2] || '' }
  if (path.startsWith('/giftcard')) return { name: 'giftcard' }
  const recover = path.match(/^\/recover\/([A-Za-z0-9_-]{8,64})\/?$/)
  if (recover) return { name: 'recover', token: recover[1] }
  // #15/#18 退货·换货申请与进度查询（必须排在下方 contentPage 之前，
  // 否则 /returns 会被当成静态政策页，申请流程就进不去）
  if (path === '/returns' || path.startsWith('/returns/')) return { name: 'returns' }
  // M9 内容营销：博客列表 / 详情
  if (path === '/blog' || path === '/blog/') return { name: 'blog' }
  const blogPost = path.match(/^\/blog\/([a-z0-9-]{1,120})\/?$/)
  if (blogPost) return { name: 'blog-post', slug: blogPost[1] }
  // X 客服信任与合规：帮助中心 / 工单支持 / 政策版本 / 隐私自助
  if (path === '/support' || path === '/support/') return { name: 'support' }
  if (path === '/privacy-portal') return { name: 'privacy-portal' }
  if (path === '/policies' || path === '/policies/') return { name: 'policies' }
  const polOne = path.match(/^\/policies\/([a-z-]{1,40})\/?$/)
  if (polOne) return { name: 'policy', slug: polOne[1] }
  if (path === '/help' || path === '/help/') return { name: 'help-center' }
  const helpOne = path.match(/^\/help\/([a-z0-9-]{1,80})\/?$/)
  if (helpOne) return { name: 'help-article', slug: helpOne[1] }
  const contentPage = path.match(/^\/(help|contact|shipping|returns|authenticity|safe-shopping|promo-terms|about|privacy|terms|accessibility)\/?$/)
  if (contentPage) return { name: 'page', slug: contentPage[1] }
  const pay = path.match(/^\/pay\/([A-Za-z0-9-]{4,40})/)
  if (pay) return { name: 'pay', orderNo: pay[1] }
  const order = path.match(/^\/order\/([A-Za-z0-9-]{4,40})/)
  if (order) return { name: 'order', orderNo: order[1] }
  // Fanatics 式分类路径：/{联赛}/{…}/{球队}（1-4 段；具体路由在上面已优先消费）
  const groupPath = path.match(/^\/([a-z0-9-]{1,60}(?:\/[a-z0-9-]{1,60}){0,3})\/?$/)
  if (groupPath) return { name: 'group', slugs: groupPath[1].split('/').filter(Boolean) }
  return { name: 'home' }
}

let lastDetailId = 0
/** 已渲染过的订单号，避免同一单反复拉接口 */
let lastOrderKey = ''

/**
 * 首页动态海报只创建一次 <video>，之后每次重绘把它「搬」进新的 hero 容器。
 * 原因：浏览器只对第一个带 autoplay 的视频放行，innerHTML 重建出来的 video 会被
 * 拦成 paused 且播放进度归零——用户看到的就是「一翻页/一搜索，海报视频就停了」。
 * 另外 muted 必须写成 property：动态创建的元素靠内联属性不生效。
 */
let heroVideoEl = null

function mountHero() {
  const slot = document.querySelector('[data-hero]')
  if (!slot) return
  if (!heroVideoEl) {
    heroVideoEl = document.createElement('video')
    heroVideoEl.muted = true
    heroVideoEl.autoplay = true
    heroVideoEl.loop = true
    heroVideoEl.playsInline = true
    heroVideoEl.preload = 'metadata'
    heroVideoEl.poster = '/media/hero-poster.jpg'
    heroVideoEl.src = '/media/hero.mp4'
  }
  if (heroVideoEl.parentNode !== slot) slot.appendChild(heroVideoEl)
  if (heroVideoEl.paused) {
    const played = heroVideoEl.play()
    if (played && typeof played.catch === 'function') played.catch(() => {})
  }
}

/**
 * 详情懒加载：目录包（/api/store/catalog）只带列表字段（见 server.js catalogVariants 裁剪说明），
 * 进商品页时按需拉 /api/store/product/:id 的全量字段（description/options/images/patches/…），
 * 就地合并进 state.products 的同一对象。会话内缓存一份全量，避免重复请求。
 * 拉取失败也标记 __full：按列表字段降级渲染（缺描述/SKU 组），不让用户无限转圈。
 */
const DETAIL_CACHE = new Map()
function ensureDetail(id) {
  const pid = Number(id)
  const product = state.products.find((item) => Number(item.id) === pid)
  if (!product || product.__full) return Promise.resolve(product)
  const cached = DETAIL_CACHE.get(pid)
  if (cached) {
    Object.assign(product, cached)
    product.__full = true
    return Promise.resolve(product)
  }
  return fetch(apiUrl(`/api/store/product/${pid}`))
    .then((response) => response.json())
    .then((data) => {
      const full = data && data.product
      if (full) {
        DETAIL_CACHE.set(pid, full)
        Object.assign(product, full)
      }
      product.__full = true
      return product
    })
    .catch(() => {
      product.__full = true
      return product
    })
}

/* ---------------- 移动端详情页吸底购买栏 ----------------
   仅 ≤749px 由 CSS 显示；按钮直接转发到页内真实的 #add-cart / #buy-now，
   价格跟随 #price-now 实时变化（选尺寸/加 PATCH/定制后自动同步）。 */
let mbbObserver = null

function removeMobileBuyBar() {
  if (mbbObserver) {
    mbbObserver.disconnect()
    mbbObserver = null
  }
  document.getElementById('mobile-buy-bar')?.remove()
  document.body.classList.remove('mbb-on')
}

function mountMobileBuyBar(product) {
  removeMobileBuyBar()
  if (!product) return
  const stock = Number(product.stock) || 0
  const bar = document.createElement('div')
  bar.id = 'mobile-buy-bar'
  bar.innerHTML = `
    <div class="mbb-info">
      <span class="mbb-price" id="mbb-price"></span>
      <span class="mbb-stock${stock <= 5 && stock > 0 ? ' low' : ''}">${stock > 0 ? t(stock <= 5 ? 'stockLow' : 'stockLeft', stock) : ''}</span>
    </div>
    <button class="btn-primary" id="mbb-add" type="button">${t('addToCart')}</button>
    <button class="btn-now" id="mbb-buy" type="button">${t('buyNow')}</button>`
  document.body.appendChild(bar)
  document.body.classList.add('mbb-on')
  const syncPrice = () => {
    const now = document.getElementById('price-now')
    const target = document.getElementById('mbb-price')
    if (now && target) target.textContent = now.textContent
  }
  syncPrice()
  const priceNow = document.getElementById('price-now')
  if (priceNow) {
    mbbObserver = new MutationObserver(syncPrice)
    mbbObserver.observe(priceNow, { childList: true, characterData: true, subtree: true })
  }
  document.getElementById('mbb-add').addEventListener('click', () => document.getElementById('add-cart')?.click())
  document.getElementById('mbb-buy').addEventListener('click', () => document.getElementById('buy-now')?.click())
}

/* ---------------- Footer「Get the App」栏（Fanatics 式） ----------------
   二维码 + Google Play / App Store 官方徽章在 footer 右下角（静态 HTML）。
   - 二维码：纯展示不跳转（用户要求，2026-10-07）；
   - App Store 徽章：整页跳 /get-app 安装指引页（独立静态 get-app.html，
     isInternalRoute 已显式排除 /get-app，不会被 SPA 拦截）；
   - Google Play 徽章：优先触发浏览器原生 PWA 安装（beforeinstallprompt），
     未捕获到安装事件时与 App Store 徽章一样跳 /get-app。 */
let deferredInstallPrompt = null
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  deferredInstallPrompt = event
})

function initFooterAppBadges() {
  const gp = document.getElementById('footer-badge-gp')
  if (!gp || gp.dataset.bound) return
  gp.dataset.bound = '1'
  gp.addEventListener('click', (event) => {
    if (deferredInstallPrompt) {
      event.preventDefault()
      const prompt = deferredInstallPrompt
      deferredInstallPrompt = null
      try {
        prompt.prompt()
      } catch (err) {
        // 原生安装框弹出失败（如用户此前已拒绝）：退回跳转安装指引页
        location.href = '/get-app'
      }
      prompt.userChoice?.catch(() => {})
    }
  })
}

function render() {
  if (state.error) {
    $('app').innerHTML = `<div class="wrap"><div class="error-note">${t('loadError')}${esc(state.error)}<br />${t('loadErrorHint')}</div></div>`
    renderFooter()
    return
  }
  if (!state.loaded) return

  renderHeader()
  renderTeamWidget()
  renderFooter()
  growthRenderBanners() // M9 站内营销位：横幅/弹窗/倒计时（频次控制在模块内）
  void mountPromoCoupons() // P0-4：填充各页优惠码展示位（首页/购物车/结账页）

  // 离开详情路由时移除移动端吸底购买栏（详情分支会在渲染后重新挂载）
  removeMobileBuyBar()

  const route = currentRoute()
  if (route.name === 'detail') {
    let product = state.products.find((item) => Number(item.id) === route.id)
    // 首屏轻量包只带 300 件：直接打开目录外包的详情链接时，先等后台全量目录补齐再渲染，
    // 否则会误显「商品不存在」，且全量到位后没人触发重绘
    if (!product && !state.catalogFull && fullCatalogPromise) {
      $('app').innerHTML = `<div class="wrap"><div class="skeleton-note">${t('loading')}</div></div>`
      void fullCatalogPromise.then(() => {
        render()
        translateVisibleProducts()
      })
      return
    }
    if (product && !product.__full) {
      // 目录包只带列表字段（瘦身），全量详情按需拉取后再渲染
      lastDetailId = 0
      $('app').innerHTML = `<div class="wrap"><div class="skeleton-note">${t('loading')}</div></div>`
      void ensureDetail(route.id).then(() => {
        render()
        translateVisibleProducts() // 详情描述补机翻（非英语/中文语言时生效）
      })
      return
    }
    sizeGuideProduct = product || null
    $('app').innerHTML = `<div class="wrap">${renderDetail(product)}</div>`
    if (product && lastDetailId !== route.id) {
      lastDetailId = route.id
      rememberView(route.id)
      const options = normalizeOptions(product.options)
      // 默认选中每组的第一项，避免一进页面必选组为空
      document.querySelectorAll('#buy-panel .opt-group').forEach((groupNode) => {
        const name = groupNode.dataset.groupName
        const group = options.find((candidate) => candidate.name === name)
        if (!group || group.type === 'customize') return
        const first = groupNode.querySelector('.opt-pill, .opt-card')
        if (first) first.classList.add('active')
      })
    }
    if (product) {
      refreshSummary(product)
      // 缺货商品不挂吸底购买栏（无意义的购买入口）
      if (Number(product.stock) !== 0) mountMobileBuyBar(product)
      // M4 评价区：容器渲染后异步拉取
      void loadReviews(product.id)
      // #4 商品问答Q&A：独立异步拉取（失败静默，不阻塞购买）
      void loadQa(product.id)
      // P2-4 UGC 精选：该商品的顾客晒单
      void mountUgc(product.id)
      // P1-4 多仓库存：异步补发货仓/预售信息（失败静默，不阻塞购买）
      void paintShipsFrom(product.id)
      growthOnDetail(product) // M9：ViewContent 回传 + 分享按钮 + A/B 实验
      // SEO 增强 #6/#32/#33/#34：详情渲染成功后对齐 title/description/OG/JSON-LD
      seoForRoute('product', product)
    }
    return
  }

  if (route.name === 'page') {
    lastDetailId = 0
    $('app').innerHTML = `<div class="wrap"><div class="content-page">${renderContentPage(route.slug)}</div></div>`
    return
  }

  if (route.name === 'returns') {
    lastDetailId = 0
    $('app').innerHTML = `<div class="wrap">${renderReturnsPage()}</div>`
    return
  }

  // X 客服信任与合规页面
  if (route.name === 'help-center') {
    lastDetailId = 0
    document.title = 'Help Center — MXQ Football Store'
    void renderHelpCenter()
    return
  }
  if (route.name === 'help-article') {
    lastDetailId = 0
    void renderHelpArticle(route.slug)
    return
  }
  if (route.name === 'policies') {
    lastDetailId = 0
    document.title = 'Policies — MXQ Football Store'
    void renderPolicyList()
    return
  }
  if (route.name === 'policy') {
    lastDetailId = 0
    void renderPolicyPage(route.slug)
    return
  }
  if (route.name === 'support') {
    lastDetailId = 0
    document.title = 'Customer Support — MXQ Football Store'
    void renderSupportPage()
    return
  }
  if (route.name === 'privacy-portal') {
    lastDetailId = 0
    document.title = 'Privacy Portal — MXQ Football Store'
    renderPrivacyPortal()
    return
  }

  // M9 内容营销：博客列表 / 详情
  if (route.name === 'blog') {
    lastDetailId = 0
    document.title = 'MXQ Journal — Football Guides & News'
    void renderBlogList()
    return
  }
  if (route.name === 'blog-post') {
    lastDetailId = 0
    void renderBlogPost(route.slug)
    return
  }

  if (route.name === 'cart') {
    lastDetailId = 0
    const prunedCart = pruneUnavailableCartItems()
    if (prunedCart > 0) toast(t('cartPruned', prunedCart))
    $('app').innerHTML = `<div class="wrap">${renderCartPage()}</div>`
    return
  }

  if (route.name === 'favorites') {
    lastDetailId = 0
    $('app').innerHTML = `<div class="wrap">${renderFavoritesPage()}</div>`
    // #8 心愿单：异步拉同步态与订阅设置，拿到后重绘同步条
    void loadWishlist().then(() => {
      const bar = document.getElementById('wl-bar')
      if (bar && currentRoute().name === 'favorites') bar.outerHTML = renderWishlistSyncBar()
      document.querySelectorAll('.fav-row').forEach((row) => {
        const pid = Number(row.dataset.favId)
        if (!row.querySelector('.wl-sub')) {
          row.querySelector('.fav-actions')?.insertAdjacentHTML('afterend', renderWishlistSubscribeRow(pid))
        }
      })
    })
    return
  }

  if (route.name === 'compare') {
    lastDetailId = 0
    $('app').innerHTML = renderComparePage()
    return
  }

  if (route.name === 'wishlist-shared') {
    lastDetailId = 0
    $('app').innerHTML = `<div class="wrap"><div id="wl-shared-page"><div class="skeleton-note">${t('loading')}</div></div></div>`
    void renderSharedWishlist(route.code)
    return
  }

  if (route.name === 'account') {
    lastDetailId = 0
    $('app').innerHTML = `<div class="wrap" id="account-page"></div>`
    renderAccountPage(route.tab)
    return
  }

  if (route.name === 'checkout') {
    lastDetailId = 0
    const prunedCart = pruneUnavailableCartItems()
    if (prunedCart > 0) toast(t('cartPruned', prunedCart))
    $('app').innerHTML = `<div class="wrap">${renderCheckoutPage()}</div>`
    void loadQuoteOnce()
    if (state.customer) void loadSavedAddresses()
    growthOnCheckout() // M9：InitiateCheckout 回传
    return
  }

  if (route.name === 'pay' || route.name === 'order') {
    lastDetailId = 0
    const key = `${route.name}:${route.orderNo}`
    if (lastOrderKey !== key) {
      lastOrderKey = key
      state.orderView = { loading: true, orderNo: route.orderNo, payments: [], selected: 'sandbox', busy: false, error: '' }
      $('app').innerHTML = `<div class="wrap"><div class="skeleton-note">${t('loading')}</div></div>`
      void loadOrderView(route.name, route.orderNo)
      return
    }
    paintOrderRoute(route.name, route.orderNo)
    growthOnOrder(route.orderNo) // M9：Purchase 回传（已支付才发，单号去重）
    return
  }

  lastDetailId = 0
  lastOrderKey = ''
  if (route.name === 'image-search') {
    $('app').innerHTML = `<div class="wrap">${renderImageSearchPage()}</div>`
    return
  }
  // M3 关键词搜索页：/search?q=...（多词 AND + 同义词 + 拼写纠错）
  if (route.name === 'search') {
    lastDetailId = 0
    const query = decodeURIComponent(new URLSearchParams(location.search).get('q') || '').trim()
    state.keyword = query
    $('app').innerHTML = `<div class="wrap">${renderSearchPage(query)}</div>`
    return
  }
  // Fanatics 式分类路径：slug 链反解分组 → 还原与点击下钻完全一致的状态
  if (route.name === 'group') {
    lastDetailId = 0
    const chain = resolveGroupSlugs(route.slugs)
    if (chain) {
      const target = chain[chain.length - 1]
      const hasKids = state.groups.some((x) => Number(x.parent_id) === Number(target.id))
      state.category = ''
      if (hasKids) {
        state.groupParentId = Number(target.id)
        state.groupId = 0
      } else {
        state.groupId = Number(target.id)
        state.groupParentId = 0
        rememberTeamVisit(Number(target.id))
      }
    }
  }

  $('app').innerHTML = `<div class="wrap">${renderHome()}</div><div class="wrap"><div id="trust-strip" class="trust-strip"></div></div>`
  // SEO 增强 #6/#32/#33/#34：首页 Organization + SearchAction + OG 卡片
  seoForRoute('home')
  mountTrustStrip()
  mountHero()
  mountIntroGuards()
  mountTcAutoplay()
  flushScrollTop()
}

/** 介绍图几何闸的挂载：横幅图加载完后才知道真实宽高，所以绑在 load 上（已缓存的直接跑） */
function mountIntroGuards() {
  const box = document.querySelector('.group-intro')
  if (!box) return
  const run = () => guardIntroImages(box)
  const banner = box.querySelector('[data-intro-banner]')
  if (!banner) return
  if (banner.complete) run()
  else banner.addEventListener('load', run, { once: true })
}

/** 结算页只拉一次报价；地址/配送/优惠券变化后由事件处理显式刷新 */
async function loadQuoteOnce() {
  const draft = checkoutState()
  // 失效商品被剔除后购物车可能为空：此时页面已是空态视图，不必再报价（服务端会回「购物车是空的」）
  if (!state.cart.length) {
    renderCheckout()
    return
  }
  // 购物车内容（商品/数量/选项）与上次报价一致才复用旧报价；
  // 否则强制重算 —— 否则「结算过一次 → 回购物车加商品/改数量 → 再进结算」总价就是旧值
  if (draft.quote && draft.quoteCartKey === JSON.stringify(cartToApiItems())) {
    renderCheckout()
    return
  }
  await refreshQuote()
}

/** 支付页 / 订单页共用的数据加载 */
async function loadOrderView(kind, orderNo) {
  try {
    const data = await fetchOrder(orderNo)
    // 下单时存的渠道名 → 渠道 code：优先在本次返回的支付列表里按名字匹配（含 Stripe / 本地方式）
    const byName = (data.payments || []).find((item) => item.name === data.order?.paymentMethod)
    state.orderView = {
      loading: false,
      orderNo,
      order: data.order,
      payments: data.payments || [],
      bankInstructions: data.bankInstructions || null,
      giftCards: data.giftCards || null,
      selected: byName?.code || 'sandbox',
      busy: false,
      error: '',
      message: '',
      tone: '',
    }
  } catch (error) {
    state.orderView = { loading: false, orderNo, order: null, payments: [], busy: false, error: error?.message || '加载失败' }
  }
  paintOrderRoute(kind, orderNo)
}

function paintOrderRoute(kind, orderNo) {
  const view = state.orderView
  if (!view || view.orderNo !== orderNo) return
  if (view.loading) {
    $('app').innerHTML = `<div class="wrap"><div class="skeleton-note">${t('loading')}</div></div>`
    return
  }
  if (!view.order) {
    $('app').innerHTML = `<div class="wrap"><div class="error-note">${esc(view.error || t('notFound'))}</div></div>`
    return
  }
  const html =
    kind === 'pay'
      ? renderPayPage(view.order, view.payments, view.bankInstructions, {
          selected: view.selected,
          busy: view.busy,
          message: view.message,
          tone: view.tone,
        })
      : renderOrderPage(view.order, view.bankInstructions)
  $('app').innerHTML = `<div class="wrap">${html}</div>`
  if (kind === 'pay') mountPaymentWidgets()
}

/** 支付页整页重画（金额/状态变了，重画比逐节点更新更简单可靠） */
const repaintPay = () => paintOrderRoute('pay', state.orderView?.orderNo)

/* --------------------- PayPal / 银行卡（PayPal Card Fields）真实支付 --------------------- */

/** PayPal JS SDK 按需加载（clientId/mode/币种由服务端下发，凭据配置在卖家后台「集成凭据」） */
const PAY_SDK_STATE = { promise: null, key: '' }

function ensurePayPalSdk(clientId, mode, currency) {
  const key = `${clientId}|${mode}|${currency}`
  if (window.paypal && PAY_SDK_STATE.key === key) return Promise.resolve()
  if (PAY_SDK_STATE.key !== key) {
    PAY_SDK_STATE.promise = new Promise((resolve, reject) => {
      const old = document.getElementById('paypal-sdk')
      if (old) old.remove()
      const script = document.createElement('script')
      script.id = 'paypal-sdk'
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(currency || 'USD')}&intent=capture&components=buttons,card-fields`
      script.onload = () => (window.paypal ? resolve() : reject(new Error('paypal sdk loaded but window.paypal missing')))
      script.onerror = () => reject(new Error(t('payWidgetError')))
      document.head.appendChild(script)
    })
    PAY_SDK_STATE.key = key
  }
  return PAY_SDK_STATE.promise
}

/** 服务端创建 PayPal 订单：金额以服务端重算为准，多币种收单由服务端换算（防篡改） */
async function paypalCreateServerOrder(orderNo) {
  const data = await apiJson('/paypal/create', {
    method: 'POST',
    body: { orderNo, guestToken: guestTokenFor(orderNo), currency: state.currency },
  })
  return { id: data.id, currency: data.currency || 'USD' }
}

/* --------------------- Stripe（M2 卡 + M3 本地方式 + Apple/Google Pay） --------------------- */

const STRIPE_SDK_STATE = { promise: null }
function ensureStripeJs() {
  if (window.Stripe) return Promise.resolve()
  if (!STRIPE_SDK_STATE.promise) {
    STRIPE_SDK_STATE.promise = new Promise((resolve, reject) => {
      const old = document.getElementById('stripe-sdk')
      if (old) old.remove()
      const script = document.createElement('script')
      script.id = 'stripe-sdk'
      script.src = 'https://js.stripe.com/v3/'
      script.onload = () => (window.Stripe ? resolve() : reject(new Error('stripe sdk loaded but window.Stripe missing')))
      script.onerror = () => reject(new Error(t('payWidgetError')))
      document.head.appendChild(script)
    })
  }
  return STRIPE_SDK_STATE.promise
}

/** 服务端创建 Stripe PaymentIntent（金额/币种服务端定，防篡改） */
async function stripeCreateIntent(orderNo, methodCode) {
  return apiJson('/stripe/intent', {
    method: 'POST',
    body: { orderNo, method: methodCode, guestToken: guestTokenFor(orderNo), currency: state.currency },
  })
}

/** 回跳/确认后校验 PaymentIntent 并把订单置为已支付 */
async function stripeVerify(orderNo, paymentIntentId) {
  const data = await apiJson('/stripe/verify', {
    method: 'POST',
    body: { orderNo, paymentIntentId, guestToken: guestTokenFor(orderNo) },
  })
  if (data.order) {
    const view = state.orderView
    if (view && view.orderNo === orderNo) view.order = data.order
  }
  return data
}

/** 支付回跳（3DS / iDEAL / Klarna 等授权后返回）：?stripe_ret=1&pi=... 自动校验 */
function handleStripeReturn() {
  const params = new URLSearchParams(location.search)
  const pi = String(params.get('pi') || '').trim()
  const route = currentRoute()
  if (!pi || route.name !== 'pay') return
  const view = state.orderView
  if (!view?.order || view.order.paymentStatus === 'paid') return
  history.replaceState({}, '', `/pay/${encodeURIComponent(route.orderNo)}`)
  view.busy = true
  repaintPay()
  stripeVerify(route.orderNo, pi)
    .then((data) => {
      const v = state.orderView
      v.busy = false
      v.message = data.ok ? t('paySuccess') : t('payPendingHint')
      v.tone = data.ok ? 'ok' : 'warn'
      toast(v.message)
    })
    .catch((error) => {
      const v = state.orderView
      v.busy = false
      v.message = error?.message || t('payFailed')
      v.tone = 'error'
      toast(v.message)
    })
    .finally(() => repaintPay())
}

/** 服务端捕获支付并把商城订单置为已支付 */
async function paypalCaptureServerOrder(orderNo, paypalOrderId) {
  const data = await apiJson('/paypal/capture', {
    method: 'POST',
    body: { orderNo, paypalOrderId, guestToken: guestTokenFor(orderNo) },
  })
  if (data.order) {
    const view = state.orderView
    if (view && view.orderNo === orderNo) view.order = data.order
  }
  return data
}

/** 在支付页挂载支付组件（PayPal 智能按钮 / Card Fields / Stripe 各渠道），订单未支付且选了对应渠道时 */
function mountPaymentWidgets() {
  const view = state.orderView
  const order = view?.order
  if (!order || order.paymentStatus === 'paid') return
  const selected = String(view.selected || 'sandbox')
  const method = (view.payments || []).find((item) => item.code === selected)
  if (!method?.configured || !method.clientId) return
  const orderNo = order.orderNo

  const onApproved = async (data) => {
    view.busy = true
    view.message = ''
    repaintPay()
    try {
      await paypalCaptureServerOrder(orderNo, data.orderID)
      view.busy = false
      view.message = t('paySuccess')
      view.tone = 'ok'
      toast(view.message)
    } catch (error) {
      view.busy = false
      view.message = error?.message || t('payFailed')
      view.tone = 'error'
      toast(view.message)
    }
    repaintPay()
  }
  const onStripeDone = (message, tone) => {
    const v = state.orderView
    v.busy = false
    v.message = message
    v.tone = tone
    toast(message)
    repaintPay()
  }
  const onError = (error) => {
    console.error('payment widget error', error)
    toast(t('payWidgetError'))
  }

  if (selected === 'paypal' && document.getElementById('paypal-buttons')) {
    // 多币种：先由服务端按展示币种建 PayPal 订单，再用该币种加载 SDK（按钮金额与扣款币种一致）
    const ensureOrder = view.paypalOrderId
      ? Promise.resolve(view.paypalOrderId)
      : paypalCreateServerOrder(orderNo).then((r) => {
          view.paypalOrderId = r.id
          view.paypalCurrency = r.currency
          return r.id
        })
    ensureOrder
      .then(() => ensurePayPalSdk(method.clientId, method.mode, view.paypalCurrency || 'USD'))
      .then(() => {
        if (!document.getElementById('paypal-buttons')) return
        window.paypal
          .Buttons({
            style: { layout: 'vertical', label: 'paypal' },
            createOrder: () => Promise.resolve(view.paypalOrderId),
            onApprove: onApproved,
            onError,
          })
          .render('#paypal-buttons')
      })
      .catch(onError)
    return
  }

  if (selected === 'card' && document.getElementById('card-number')) {
    ensurePayPalSdk(method.clientId, method.mode, 'USD')
      .then(() => {
        if (!document.getElementById('card-number')) return
        if (!window.paypal?.CardFields) {
          toast(t('payWidgetError'))
          return
        }
        const style = { input: { 'font-size': '13px', 'font-family': 'inherit' } }
        const cardFields = window.paypal.CardFields({
          createOrder: () =>
            (view.paypalOrderId ? Promise.resolve(view.paypalOrderId) : paypalCreateServerOrder(orderNo).then((r) => {
              view.paypalOrderId = r.id
              view.paypalCurrency = r.currency
              return r.id
            })),
          onApprove: onApproved,
          onError,
          style,
        })
        if (cardFields.isEligible()) {
          cardFields.numberField().render('#card-number')
          cardFields.expiryField().render('#card-expiry')
          cardFields.cvvField().render('#card-cvv')
          // 挂到按钮上：点击时由 SDK 校验并提交卡信息
          document.getElementById('card-pay')?.addEventListener('click', async () => {
            view.busy = true
            repaintPay()
            try {
              await cardFields.submit()
            } catch (error) {
              view.busy = false
              repaintPay()
              toast(error?.message || t('payWidgetError'))
            }
          })
        } else {
          toast(t('payWidgetError'))
        }
      })
      .catch(onError)
    return
  }

  /* ---------- Stripe 渠道 ---------- */
  if (method.provider !== 'Stripe') return

  // Stripe 卡：Payment Element（3DS 由 Stripe 处理）
  if (selected === 'stripe_card' && document.getElementById('stripe-payment-element') && !view.stripeMounted) {
    view.stripeMounted = true
    view.busy = true
    repaintPay()
    Promise.all([ensureStripeJs(), stripeCreateIntent(orderNo, 'stripe_card')])
      .then(([, intent]) => {
        const el = document.getElementById('stripe-payment-element')
        if (!el) return
        const stripe = window.Stripe(intent.publishableKey)
        const elements = stripe.elements({ clientSecret: intent.clientSecret, appearance: { theme: 'stripe' } })
        const paymentElement = elements.create('payment')
        paymentElement.mount('#stripe-payment-element')
        view.stripeElements = elements
        view.stripeIntent = intent
        document.getElementById('stripe-pay')?.addEventListener('click', async () => {
          const v = state.orderView
          v.busy = true
          repaintPay()
          try {
            const result = await stripe.confirmPayment({
              elements: v.stripeElements,
              redirect: 'if_required',
              confirmParams: { return_url: `${location.origin}/pay/${encodeURIComponent(orderNo)}?stripe_ret=1&pi=${encodeURIComponent(intent.paymentIntentId)}` },
            })
            if (result.error) {
              toast(result.error.message || t('payFailed'))
              onStripeDone(result.error.message || t('payFailed'), 'error')
              return
            }
            const verify = await stripeVerify(orderNo, intent.paymentIntentId)
            onStripeDone(verify.ok ? t('paySuccess') : t('payPendingHint'), verify.ok ? 'ok' : 'warn')
          } catch (error) {
            onStripeDone(error?.message || t('payFailed'), 'error')
          }
        })
      })
      .catch((error) => {
        view.stripeMounted = false
        onError(error)
      })
      .finally(() => {
        view.busy = false
        repaintPay()
      })
    return
  }

  // Apple Pay / Google Pay：Stripe Payment Request Button
  if ((selected === 'apple_pay' || selected === 'google_pay') && document.getElementById('stripe-wallet') && !view.stripeMounted) {
    view.stripeMounted = true
    Promise.all([ensureStripeJs(), stripeCreateIntent(orderNo, selected)])
      .then(([, intent]) => {
        const slot = document.getElementById('stripe-wallet')
        if (!slot) return
        const stripe = window.Stripe(intent.publishableKey)
        const currency = String(intent.currency || state.currency || 'USD').toLowerCase()
        const minor = Number(intent.amount) || Math.max(50, Math.round((Number(order.totalUsd) || 0) * 100))
        const paymentRequest = stripe.paymentRequest({
          country: (order.buyerCountry || 'US').toUpperCase().slice(0, 2),
          currency,
          total: { label: `MXQ order ${order.orderNo}`, amount: minor },
          requestPayerName: true,
          requestPayerEmail: true,
        })
        paymentRequest.canMakePayment().then((result) => {
          const el = document.getElementById('stripe-wallet')
          if (!el) return
          if (!result) {
            el.innerHTML = `<div class="empty-note">${t('payWidgetError')}</div>`
            return
          }
          paymentRequest.on('paymentmethod', async (ev) => {
            try {
              const { error } = await stripe.confirmCardPayment(intent.clientSecret, { payment_method: ev.paymentMethod.id }, { handleActions: false })
              if (error) {
                ev.complete('fail')
                onStripeDone(error.message || t('payFailed'), 'error')
                return
              }
              ev.complete('success')
              const verify = await stripeVerify(orderNo, intent.paymentIntentId)
              onStripeDone(verify.ok ? t('paySuccess') : t('payPendingHint'), verify.ok ? 'ok' : 'warn')
            } catch (err) {
              ev.complete('fail')
              onStripeDone(err?.message || t('payFailed'), 'error')
            }
          })
          const prb = stripe.elements().create('paymentRequestButton', { paymentRequest })
          prb.mount(el)
        })
      })
      .catch(onError)
    return
  }

  // 本地支付方式（iDEAL / Klarna / Pix / Boleto / GrabPay / SEPA）：确认后整页跳转授权
  if (document.getElementById('stripe-local-pay')) {
    document.getElementById('stripe-local-pay')?.addEventListener('click', async () => {
      const v = state.orderView
      v.busy = true
      repaintPay()
      try {
        const intent = await stripeCreateIntent(orderNo, selected)
        const stripe = window.Stripe
          ? window.Stripe(intent.publishableKey)
          : await ensureStripeJs().then(() => window.Stripe(intent.publishableKey))
        const { error } = await stripe.confirmPayment({
          clientSecret: intent.clientSecret,
          confirmParams: { return_url: `${location.origin}/pay/${encodeURIComponent(orderNo)}?stripe_ret=1&pi=${encodeURIComponent(intent.paymentIntentId)}` },
          redirect: 'always',
        })
        if (error) {
          onStripeDone(error.message || t('payFailed'), 'error')
        }
      } catch (err) {
        onStripeDone(err?.message || t('payFailed'), 'error')
      }
    })
  }
}

/** 以图搜款结果页：查询图缩略 + 相似商品网格（复用商品卡片） */
function renderImageSearchPage() {
  const result = state.imgSearch
  const again = `<button type="button" class="imgsearch-again" id="imgsearch-again">${t(result ? 'imgSearchAgain' : 'imgSearchUpload')}</button>`
  const head = result
    ? `<div class="imgsearch-result-head">
        <img class="imgsearch-thumb" src="${esc(result.thumb)}" alt="" />
        <div class="imgsearch-result-meta">
          <h2>${t('imgSearchTitle')}</h2>
          <p>${t('imgSearchMatches', result.matches.length)}</p>
        </div>
        ${again}
      </div>`
    : `<div class="imgsearch-result-head">
        <div class="imgsearch-result-meta">
          <h2>${t('imgSearchTitle')}</h2>
          <p>${t('imgSearchSub')}</p>
        </div>
        ${again}
      </div>`
  const grid = result && result.matches.length ? `<div class="grid">${result.matches.map(productCard).join('')}</div>` : ''
  return `${head}${grid}`
}

/* --------------------- 以图搜款（AliExpress 同款） --------------------- */
// 视觉特征与 .build/image-index/build.mjs 的离线索引保持同一套算法：
// contain 缩放 96×96 白底 → HSV 直方图（12 色相 + 暗/中/亮 3 消色，各归一化到 0-255）×全图/中心裁剪 + dHash 64bit。
const IMG_HUE_BINS = 12
const IMG_BINS = IMG_HUE_BINS + 3
const IMG_SEARCH_LIMIT = 24
let IMG_INDEX = null
let IMG_INDEX_PROMISE = null

function loadImgIndex() {
  if (IMG_INDEX) return Promise.resolve(IMG_INDEX)
  if (!IMG_INDEX_PROMISE) {
    // 索引跟着 app.js 的 ?v= 走：索引重建后版本号一变，浏览器就不会再吃 1 小时的旧缓存
    const src = document.querySelector('script[src*="/app.js"]')?.getAttribute('src') || ''
    const v = (src.match(/[?&]v=([^&]+)/) || [])[1] || ''
    IMG_INDEX_PROMISE = fetch(`/data/image-index.json${v ? `?v=${v}` : ''}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`image index ${res.status}`))))
      .then((data) => {
        IMG_INDEX = data
        return data
      })
      .catch((error) => {
        IMG_INDEX_PROMISE = null
        throw error
      })
  }
  return IMG_INDEX_PROMISE
}

/** 从上传的图片文件提取视觉特征（与离线索引同管线，保证可比性） */
async function analyzeImageFeatures(file) {
  const S = 96
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  // 必须显式开到 high：默认的 'low' 在整图大比例缩小时退化得接近最近邻，
  // 实测同一张图自匹配相似度只有 0.895（排第 15），改成 high 后升到 0.989（排第 1）。
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, S, S)
  let sw = 0
  let sh = 0
  let drawSource
  if (window.createImageBitmap) {
    const bitmap = await createImageBitmap(file)
    sw = bitmap.width
    sh = bitmap.height
    drawSource = (dx, dy, dw, dh) => ctx.drawImage(bitmap, dx, dy, dw, dh)
  } else {
    const url = URL.createObjectURL(file)
    try {
      const img = await new Promise((resolve, reject) => {
        const el = new Image()
        el.onload = () => resolve(el)
        el.onerror = () => reject(new Error('image decode failed'))
        el.src = url
      })
      sw = img.naturalWidth
      sh = img.naturalHeight
      drawSource = (dx, dy, dw, dh) => ctx.drawImage(img, dx, dy, dw, dh)
    } finally {
      URL.revokeObjectURL(url)
    }
  }
  const scale = Math.min(S / sw, S / sh)
  const dw = Math.max(1, Math.round(sw * scale))
  const dh = Math.max(1, Math.round(sh * scale))
  drawSource(Math.floor((S - dw) / 2), Math.floor((S - dh) / 2), dw, dh)
  const data = ctx.getImageData(0, 0, S, S).data
  return {
    full: imgHsvHist(data, S, S, 0, 0, S, S),
    center: imgHsvHist(data, S, S, S * 0.125, S * 0.125, S * 0.75, S * 0.75),
    dh: imgDhash(data, S, S),
  }
}

/** HSV 直方图：stride=4 的 RGBA 像素；色相 bin 权重 S·V，消色按明度分暗/中/亮 */
function imgHsvHist(data, w, h, cx, cy, cw, ch) {
  const bins = new Float64Array(IMG_BINS)
  const x1 = Math.round(cx)
  const y1 = Math.round(cy)
  const x2 = Math.round(cx + cw)
  const y2 = Math.round(cy + ch)
  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      const i = (y * w + x) * 4
      const r = data[i] / 255
      const g = data[i + 1] / 255
      const b = data[i + 2] / 255
      const mx = Math.max(r, g, b)
      const mn = Math.min(r, g, b)
      const v = mx
      const d = mx - mn
      const s = mx > 0 ? d / mx : 0
      if (s < 0.13 || v < 0.08) {
        bins[v < 0.33 ? IMG_HUE_BINS : v < 0.78 ? IMG_HUE_BINS + 1 : IMG_HUE_BINS + 2] += 1
      } else {
        let hue = 0
        if (mx === r) hue = ((g - b) / d) % 6
        else if (mx === g) hue = (b - r) / d + 2
        else hue = (r - g) / d + 4
        if (hue < 0) hue += 6
        bins[Math.min(IMG_HUE_BINS - 1, Math.floor((hue / 6) * IMG_HUE_BINS))] += s * v
      }
    }
  }
  let sum = 0
  for (let i = 0; i < IMG_BINS; i++) sum += bins[i]
  const out = new Uint8Array(IMG_BINS)
  if (sum > 0) for (let i = 0; i < IMG_BINS; i++) out[i] = Math.round((bins[i] / sum) * 255)
  return out
}

/** dHash 64bit：9×8 灰度，相邻像素亮度比较 */
function imgDhash(data, w, h) {
  const GW = 9
  const GH = 8
  const gray = new Float64Array(GW * GH)
  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      const sx = Math.min(w - 1, Math.floor((x / GW) * w))
      const sy = Math.min(h - 1, Math.floor((y / GH) * h))
      const i = (sy * w + sx) * 4
      gray[y * GW + x] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    }
  }
  let hex = ''
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x += 4) {
      let nibble = 0
      for (let k = 0; k < 4; k++) nibble = (nibble << 1) | (gray[y * GW + x + k + 1] > gray[y * GW + x + k] ? 1 : 0)
      hex += nibble.toString(16)
    }
  }
  return hex
}

const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))

function cosine(a, b) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  if (!na || !nb) return 0
  return dot / Math.sqrt(na * nb)
}

function hammingHex(h1, h2) {
  let dist = 0
  for (let i = 0; i < h1.length; i++) {
    let v = (parseInt(h1[i], 16) ^ parseInt(h2[i], 16)) >>> 0
    while (v) {
      dist += v & 1
      v >>= 1
    }
  }
  return dist
}

/** 全库打分：0.5·全图直方图 + 0.35·中心裁剪直方图 + 0.15·dHash，返回相似度最高的商品 id */
function scoreImgSearch(query, items) {
  const scored = []
  for (const item of items) {
    const [id, fB64, cB64, dh] = item
    const score =
      0.5 * cosine(query.full, b64ToBytes(fB64)) +
      0.35 * cosine(query.center, b64ToBytes(cB64)) +
      0.15 * (1 - hammingHex(query.dh, dh || '') / 64)
    scored.push({ id, score })
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, IMG_SEARCH_LIMIT)
}

function openImgSearch() {
  openModal('imgsearch-modal')
  resetImgSearchUI()
  positionImgSearchPanel()
}

/** 面板锚定在搜索框正下方（AliExpress 同款），窄屏自动收进视口 */
function positionImgSearchPanel() {
  const panel = $('imgsearch-panel')
  if (!panel) return
  const width = Math.min(400, window.innerWidth - 24)
  let left = Math.round((window.innerWidth - width) / 2)
  let top = 84
  const box = $('search-box')
  if (box) {
    const rect = box.getBoundingClientRect()
    left = Math.round(rect.left + rect.width / 2 - width / 2)
    top = Math.round(rect.bottom + 10)
  }
  left = Math.max(12, Math.min(left, window.innerWidth - width - 12))
  top = Math.max(12, top)
  panel.style.left = `${left}px`
  panel.style.top = `${top}px`
}

function resetImgSearchUI() {
  const empty = $('imgsearch-empty')
  const busy = $('imgsearch-busy')
  if (empty) empty.hidden = false
  if (busy) busy.hidden = true
}

async function handleImageFile(file) {
  if (!file) return
  if (!file.type.startsWith('image/') || file.size > 15 * 1024 * 1024) {
    toast(t('imgSearchBadFile'))
    return
  }
  if (state.imgSearch?.thumb?.startsWith('blob:')) URL.revokeObjectURL(state.imgSearch.thumb)
  const preview = $('imgsearch-preview')
  const thumbUrl = URL.createObjectURL(file)
  if (preview) preview.src = thumbUrl
  const empty = $('imgsearch-empty')
  const busy = $('imgsearch-busy')
  if (empty) empty.hidden = true
  if (busy) busy.hidden = false
  try {
    const feats = await analyzeImageFeatures(file)
    const index = await loadImgIndex()
    const top = scoreImgSearch(feats, index.items || [])
    const byId = new Map(state.products.map((p) => [Number(p.id), p]))
    const matches = top.map((hit) => byId.get(hit.id)).filter(Boolean)
    if (!matches.length) {
      toast(t('imgSearchNoMatch'))
      resetImgSearchUI()
      return
    }
    state.imgSearch = { thumb: thumbUrl, matches, total: matches.length }
    closeModals()
    if (currentRoute().name === 'image-search') render()
    else navigate('/image-search')
    window.scrollTo(0, 0)
  } catch (error) {
    console.error('image search failed', error)
    toast(t('imgSearchFailed'))
    resetImgSearchUI()
  }
}

/** 黑色圆形按钮 / 回车提交文字搜索：跳独立搜索页（URL 可分享/回退） */
function commitSearch() {
  const input = $('search')
  const query = (input ? input.value : state.keyword).trim()
  if (!query) return
  track('search', query.slice(0, 80))
  saveSearchHistory(query) // #7：记录搜索历史（供搜索页「最近搜索」展示）
  input?.blur()
  navigate(`/search?q=${encodeURIComponent(query)}`)
}

/* ------------------------------ 事件 ------------------------------ */

document.addEventListener('click', (event) => {
  const target = event.target

  // 以图搜款入口：搜索框扫描图标 / 弹窗上传按钮 / 结果页「再搜一张」/ 黑色圆形搜索按钮
  if (target.closest('#search-cam')) {
    openImgSearch()
    return
  }
  // 搜索页空结果的「以图搜款」兜底
  if (target.closest('#search-page-img')) {
    openImgSearch()
    return
  }
  if (target.closest('#imgsearch-upload')) {
    $('imgsearch-file')?.click()
    return
  }
  if (target.closest('#imgsearch-again')) {
    openImgSearch()
    return
  }
  if (target.closest('#search-go')) {
    commitSearch()
    return
  }
  // 点击以图搜款弹窗外围（遮罩区域）关闭
  if (target.id === 'imgsearch-modal') {
    closeModals()
    return
  }

  // 返回上一级（Fanatics 式：跳父级分组路径 URL）
  const backBtn = target.closest('[data-back]')
  if (backBtn) {
    const current = state.groups.find((g) => Number(g.id) === state.groupParentId)
    const parentId = current && current.parent_id ? Number(current.parent_id) : 0
    if (parentId) navigateToGroup(parentId)
    else navigate('/')
    return
  }

  // 顶部球队跑马灯：点队徽直接跳该球队路径并筛选商品
  const marqueeItem = target.closest('[data-marquee-group]')
  if (marqueeItem) {
    state.groupId = Number(marqueeItem.dataset.marqueeGroup)
    state.groupParentId = 0
    state.category = ''
    navigateToGroup(state.groupId)
    render()
    return
  }

  // Trending Collections 轮播：左右箭头横向滚动
  const tcArrow = target.closest('[data-tc-scroll]')
  if (tcArrow) {
    const row = tcArrow.closest('.tc-row-wrap')?.querySelector('[data-tc-row]')
    if (row) row.scrollBy({ left: Number(tcArrow.dataset.tcScroll) * 440, behavior: 'smooth' })
    return
  }

  // Trending Collections 轮播卡片：跳转商品详情页
  const tcCard = target.closest('[data-tc-pid]')
  if (tcCard && tcCard.dataset.tcPid) {
    navigate(`/p/${tcCard.dataset.tcPid}`)
    return
  }

  // 一级分类：下钻到二级（跳一级路径 URL）
  const levelOneChip = target.closest('[data-parent]')
  if (levelOneChip && levelOneChip.dataset.parent !== '0' && levelOneChip.dataset.group === '0') {
    state.groupParentId = Number(levelOneChip.dataset.parent)
    state.groupId = 0
    state.category = ''
    navigateToGroup(state.groupParentId)
    render()
    return
  }

  // 二级/三级分类卡：有子级则继续下钻，否则直接筛选（跳完整路径 URL）
  const catCard = target.closest('[data-haschildren]')
  if (catCard) {
    const gid = Number(catCard.dataset.group)
    if (catCard.dataset.haschildren === '1') {
      // 继续下钻
      state.groupParentId = gid
      state.groupId = 0
    } else {
      // 叶子节点：直接筛选该分组
      state.groupId = gid
      state.groupParentId = 0
      rememberTeamVisit(gid)
    }
    state.category = ''
    navigateToGroup(gid)
    render()
    return
  }

  const navButton = target.closest('.nav button')
  if (navButton) {
    state.category = navButton.dataset.category || ''
    state.groupId = 0
    state.groupParentId = Number(navButton.dataset.navgroup || 0)
    if (state.groupParentId) navigateToGroup(state.groupParentId)
    else navigate('/')
    render()
    return
  }

  // 站标：回首页并清掉当前筛选。它的 href 就是 #/，当用户已经停在 #/ 时点它
  // 不会触发 hashchange，分类/关键词原样残留——表现就是「点了没反应」。
  const brandLink = target.closest('.brand')
  if (brandLink) {
    event.preventDefault()
    state.category = ''
    state.groupId = 0
    state.groupParentId = 0
    state.keyword = ''
    const searchInput = $('search')
    if (searchInput) searchInput.value = ''
    if (currentRoute().name !== 'home') navigate('/')
    else render()
    return
  }

  const categoryChip = target.closest('[data-category]')
  if (categoryChip) {
    state.category = categoryChip.dataset.category || ''
    state.groupId = Number(categoryChip.dataset.group || 0)
    state.groupParentId = 0
    if (state.groupId) navigateToGroup(state.groupId)
    else if (state.category) navigate('/')
    render()
    return
  }

  const groupChip = target.closest('[data-group]')
  if (groupChip && !target.closest('[data-category]') && !target.closest('[data-haschildren]')) {
    state.groupId = Number(groupChip.dataset.group || 0)
    state.category = ''
    state.groupParentId = 0
    navigateToGroup(state.groupId)
    render()
    return
  }

  // 网格页码翻页
  const pagerBtn = target.closest('[data-page]')
  if (pagerBtn && !pagerBtn.disabled) {
    gotoGridPage(pagerBtn.dataset.page)
    return
  }

  // 尺寸表弹窗：打开 / CM-IN 切换（切换只重绘弹窗内容，不动页面）
  if (target.closest('[data-size-guide]')) {
    openSizeGuide()
    return
  }
  const unitBtn = target.closest('[data-size-unit]')
  if (unitBtn) {
    sizeGuideUnit = unitBtn.dataset.sizeUnit === 'in' ? 'in' : 'cm'
    const body = $('size-guide-body')
    if (body) body.innerHTML = renderSizeGuideBody()
    return
  }

  const toggle = target.closest('[data-toggle="online"]')
  if (toggle) {
    state.onlyOnline = !state.onlyOnline
    render()
    return
  }

  const thumb = target.closest('[data-thumb]')
  if (thumb) {
    // 主图区可能已被视频替换（点过视频缩略块）：先恢复 <img> 再换 src
    const box = $('gallery-main-box')
    let mainImg = $('gallery-main')
    if (!mainImg && box) {
      box.innerHTML = '<img id="gallery-main" alt="" />'
      mainImg = $('gallery-main')
    }
    if (mainImg) mainImg.src = thumb.dataset.thumb
    document.querySelectorAll('.thumbs button').forEach((node) => node.classList.toggle('active', node === thumb))
    return
  }

  // M8 视频素材：点击把主图区换成 <video>（点图片缩略图再换回图片）
  const vthumb = target.closest('[data-vthumb]')
  if (vthumb) {
    const box = $('gallery-main-box')
    if (box) {
      box.innerHTML = `<video id="gallery-video" src="${esc(vthumb.dataset.vthumb)}" ${vthumb.dataset.vposter ? `poster="${esc(vthumb.dataset.vposter)}"` : ''} controls playsinline preload="metadata"></video>`
      document.querySelectorAll('.thumbs button').forEach((node) => node.classList.toggle('active', node === vthumb))
    }
    return
  }

  /* ----- M4 评价区交互（委托在全局，避免重绘丢绑定） ----- */
  const star = target.closest('[data-star]')
  if (star) {
    REVIEW_RATING = Number(star.dataset.star) || 5
    star.parentElement.querySelectorAll('.star-btn').forEach((node) => node.classList.toggle('on', Number(node.dataset.star) <= REVIEW_RATING))
    return
  }
  if (target.closest('#review-toggle')) {
    const section = $('reviews-section')
    if (section) {
      section.dataset.formOpen = section.dataset.formOpen === '1' ? '0' : '1'
      const pid = Number(section.dataset.pid)
      paintReviews(section, REVIEWS_CACHE.get(pid) || { items: [], summary: { count: 0, avg: 0 }, hasMore: false }, pid)
    }
    return
  }
  if (target.closest('#review-add')) {
    $('review-file')?.click()
    return
  }
  const rimg = target.closest('[data-rimg]')
  if (rimg) {
    REVIEW_IMGS.splice(Number(rimg.dataset.rimg), 1)
    syncReviewThumbs()
    return
  }
  if (target.closest('#review-submit')) {
    void submitReview()
    return
  }
  const more = target.closest('#review-more')
  if (more) {
    const section = $('reviews-section')
    const pid = Number(section?.dataset.pid)
    if (section && pid) {
      const shown = section.querySelectorAll('.review-item').length
      fetch(apiUrl(`/api/store/reviews/${pid}?offset=${shown}&limit=5`))
        .then((response) => response.json())
        .then((data) => {
          const cached = REVIEWS_CACHE.get(pid) || { items: [], summary: { count: 0, avg: 0 } }
          cached.items = cached.items.concat(data.items || [])
          cached.hasMore = data.hasMore
          REVIEWS_CACHE.set(pid, cached)
          paintReviews(section, cached, pid)
        })
        .catch(() => {})
    }
    return
  }
  // 移动端吸底购买栏在 OOS 商品上不出现（mountMobileBuyBar 已随 buy 按钮 disabled 状态转发）
  if (target.closest('#buy-now.is-notify')) {
    document.getElementById('notify-email')?.focus()
    return
  }

  /* ----- M6 缺货登记提交 ----- */
  if (target.closest('#notify-submit')) {
    const form = $('notify-form')
    const input = $('notify-email')
    const msg = $('notify-msg')
    const email = (input?.value || '').trim()
    const pid = Number(form?.dataset.pid)
    const showMsg = (text, bad = false) => {
      if (!msg) return
      msg.hidden = false
      msg.textContent = text
      msg.classList.toggle('bad', bad)
    }
    if (!pid || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showMsg(t('reviewBadEmail'), true)
      return
    }
    fetch(apiUrl('/api/store/stock-alerts'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId: pid, email }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('failed')
        track('stock_alert', String(pid))
        showMsg(t('notifyOk'))
        if (input) input.value = ''
      })
      .catch(() => showMsg(t('notifyFail'), true))
    return
  }

  const pick = target.closest('[data-pick]')
  if (pick) {
    const groupName = pick.dataset.pick
    document.querySelectorAll(`[data-pick="${CSS.escape(groupName)}"]`).forEach((node) => node.classList.toggle('active', node === pick))
    const route = currentRoute()
    const product = state.products.find((item) => Number(item.id) === route.id)
    if (product) refreshSummary(product)
    return
  }

  const remove = target.closest('[data-remove]')
  if (remove) {
    state.cart.splice(Number(remove.dataset.remove), 1)
    saveCart()
    renderCart()
    return
  }

  if (target.closest('#add-cart')) {
    addToCart()
    return
  }

  if (target.closest('#buy-now')) {
    addToCart({ goCheckout: true })
    return
  }

  // 收藏心形（卡片右上角 / 详情页按钮）。卡片本身是 <a>，必须 preventDefault 掉跳转。
  const fav = target.closest('[data-fav]')
  if (fav) {
    event.preventDefault()
    const nowFav = toggleFav(Number(fav.dataset.fav))
    // 详情页按钮带文字标签、收藏页列表会少一项 —— 这两种情况都整页重绘；
    // 网格卡片上只有心形图标，改类名比重绘 60 张卡片便宜得多。
    if (fav.closest('#buy-panel') || currentRoute().name === 'favorites') {
      render()
    } else {
      fav.classList.toggle('active', nowFav)
      fav.setAttribute('aria-pressed', nowFav ? 'true' : 'false')
      const label = nowFav ? t('favRemove') : t('favAdd')
      fav.setAttribute('aria-label', label)
      fav.setAttribute('title', label)
    }
    toast(nowFav ? t('favAdded') : t('favRemoved'))
    return
  }

  // 详情页数量增减（上限取库存，没有库存数据则 99）
  const qtyStep = target.closest('[data-detail-qty]')
  if (qtyStep) {
    const node = $('detail-qty')
    if (node) {
      const product = state.products.find((item) => Number(item.id) === currentRoute().id)
      const cap = readStock(product) || 99
      const next = Math.max(1, Math.min(99, cap, (Number(node.textContent) || 1) + Number(qtyStep.dataset.detailQty)))
      node.textContent = String(next)
    }
    return
  }

  // 列表工具条：应用价格区间 / 重置全部筛选（折扣阈值走 change 事件）
  if (target.closest('#price-apply')) {
    applyPriceRange()
    return
  }
  if (target.closest('#filter-reset')) {
    state.sort = 'default'
    state.saleMin = 0
    state.priceMin = ''
    state.priceMax = ''
    state.brandFilter = ''
    state.sizeFilter = ''
    render()
    return
  }

  // 最近浏览：清空
  if (target.closest('#recent-clear')) {
    state.recent = []
    writeIdList(RECENT_KEY, [])
    render()
    return
  }

  // 头部收藏入口 / 回到顶部
  if (target.closest('#fav-btn')) {
    navigate('/favorites')
    if (currentRoute().name === 'favorites') render()
    return
  }
  if (target.closest('#back-to-top')) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (target.closest('#cart-btn')) {
    $('cart-drawer').hidden = false
    $('scrim').hidden = false
    renderCart()
    return
  }

  const closeDrawer = () => {
    $('cart-drawer').hidden = true
    $('scrim').hidden = true
  }

  if (target.closest('#cart-close') || target.id === 'scrim') {
    closeDrawer()
    return
  }

  // 购物车抽屉里的「查看购物车 / 去结算」
  if (target.closest('#view-cart')) {
    closeDrawer()
    navigate('/cart')
    render()
    return
  }
  if (target.closest('#checkout')) {
    closeDrawer()
    if (!state.cart.length) {
      toast(t('checkoutEmpty'))
      return
    }
    navigate('/checkout')
    render()
    return
  }
  if (target.closest('#back-cart')) {
    navigate('/cart')
    render()
    return
  }

  // 购物车数量增减（整页与抽屉共用同一套 data 属性）
  const plus = target.closest('[data-qty-plus]')
  if (plus) {
    const index = Number(plus.dataset.qtyPlus)
    const item = state.cart[index]
    if (item) {
      item.qty = Math.min(99, (Number(item.qty) || 1) + 1)
      saveCart()
      renderCart()
      if (currentRoute().name === 'cart') render()
      // 结算页已有报价时，改了数量必须重新要一次报价，否则金额是旧的
      if (currentRoute().name === 'checkout') void refreshQuote()
    }
    return
  }
  const minus = target.closest('[data-qty-minus]')
  if (minus) {
    const index = Number(minus.dataset.qtyMinus)
    const item = state.cart[index]
    if (item) {
      const next = (Number(item.qty) || 1) - 1
      if (next <= 0) state.cart.splice(index, 1)
      else item.qty = next
      saveCart()
      renderCart()
      if (currentRoute().name === 'cart') render()
      if (currentRoute().name === 'checkout') void refreshQuote()
    }
    return
  }

  // 优惠券
  // P0-4 优惠促销：复制优惠码 / 结算页一键应用
  const copyBtn = target.closest('[data-copy-code]')
  if (copyBtn) {
    event.preventDefault()
    const code = String(copyBtn.dataset.copyCode || '')
    copyPromoCode(code, copyBtn)
    return
  }
  const promoCard = target.closest('[data-apply-coupon]')
  if (promoCard) {
    event.preventDefault()
    applyPromoCodeToCheckout(String(promoCard.dataset.applyCoupon || ''))
    return
  }

  if (target.closest('#coupon-apply')) {
    const draft = checkoutState()
    const value = String($('coupon-input')?.value || '').trim()
    if (!value) {
      toast(t('couponPlaceholder'))
      return
    }
    draft.coupon = value
    void refreshQuote()
    return
  }
  if (target.closest('#coupon-clear')) {
    const draft = checkoutState()
    draft.coupon = ''
    draft.couponApplied = null
    void refreshQuote()
    return
  }

  // 礼品卡抵扣（结算页）
  if (target.closest('#giftcard-apply')) {
    const draft = checkoutState()
    const value = String($('giftcard-input')?.value || '').trim()
    if (!value) {
      toast(t('giftCardPlaceholder'))
      return
    }
    draft.giftCard = value
    void refreshQuote()
    return
  }
  if (target.closest('#giftcard-clear')) {
    const draft = checkoutState()
    draft.giftCard = ''
    draft.giftCardApplied = null
    void refreshQuote()
    return
  }

  // 礼品卡购买页（M6）
  const gcAmount = target.closest('[data-gc-amount]')
  if (gcAmount) {
    const draft = giftCardDraftState()
    draft.amount = Number(gcAmount.dataset.gcAmount) || 50
    render()
    return
  }
  if (target.closest('#giftcard-buy')) {
    void buyGiftCard()
    return
  }

  // 报价失败后的重试（配送方式区块的错误态）
  if (target.closest('#quote-retry')) {
    void refreshQuote()
    return
  }

  // 提交订单
  if (target.closest('#place-order')) {
    void placeOrder()
    return
  }

  // 支付
  if (target.closest('#pay-now')) {
    void payCurrentOrder()
    return
  }
  const payBtn = target.closest('[data-pay-order]')
  if (payBtn) {
    navigate(`/pay/${encodeURIComponent(payBtn.dataset.payOrder)}`)
    return
  }

  // 取消订单
  const cancelBtn = target.closest('[data-cancel-order]')
  if (cancelBtn) {
    void cancelOrder(cancelBtn.dataset.cancelOrder)
    return
  }

  // 账号中心 tab 切换
  const acctTab = target.closest('[data-acct-tab]')
  if (acctTab) {
    switchAcctTab(acctTab.dataset.acctTab)
    return
  }

  // 收藏页：分享（Web Share API → 复制链接降级）
  const favShare = target.closest('[data-fav-share]')
  if (favShare) {
    const url = `${window.location.origin}${favShare.dataset.favUrl}`
    if (navigator.share) {
      navigator.share({ url, title: 'MXQ' }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(url).then(() => toast(t('favLinkCopied'))).catch(() => {})
    }
    return
  }

  // 收藏页：降价提醒登记（未登录引导登录）
  const favAlert = target.closest('[data-fav-pricealert]')
  if (favAlert) {
    postJson('/api/store/price-alerts', { productId: Number(favAlert.dataset.favPricealert), targetPrice: Number(favAlert.dataset.favPrice) })
      .then(() => {
        toast(t('alertAdded'))
        favAlert.disabled = true
      })
      .catch((error) => {
        if (String(error?.message || '').includes('登录')) openAuthModal()
        else toast(String(error?.message || error), 'warn')
      })
    return
  }

  // 收藏页：到货提醒（复用 stock_alerts 端点；未填邮箱时用提示框）
  const favRestock = target.closest('[data-fav-restock]')
  if (favRestock) {
    const pid = Number(favRestock.dataset.favRestock)
    const email = window.prompt(t('notifyPlaceholder'))
    if (!email) return
    postJson('/api/store/stock-alerts', { productId: pid, email })
      .then(() => {
        toast(t('notifyOk'))
        favRestock.disabled = true
      })
      .catch((error) => toast(String(error?.message || error), 'warn'))
    return
  }

  const authTab = target.closest('[data-auth-tab]')
  if (authTab) {
    setAuthTab(authTab.dataset.authTab)
    return
  }

  const oauthBtn = target.closest('[data-oauth]')
  if (oauthBtn) {
    startOauth(oauthBtn.dataset.oauth)
    return
  }

  if (target.closest('[data-close-modal]') || target.id === 'modal-scrim') {
    closeModals()
    return
  }

  if (target.closest('#account-btn')) {
    if (state.customer) renderAccount()
    else openAuthModal()
    return
  }

  if (target.closest('#locale-btn')) {
    if ($('locale-pop').hidden) openLocalePanel()
    else closeLocalePanel()
    return
  }

  // 面板内：点击下拉框展开/收起候选列表
  const lsel = target.closest('[data-lsel]')
  if (lsel) {
    toggleLocaleList(lsel.dataset.lsel)
    return
  }

  // 面板内：选择候选项（国家/州/城市/语言/币种）
  const lopt = target.closest('[data-lopt]')
  if (lopt) {
    const kind = lopt.dataset.lopt
    const value = lopt.dataset.loptV
    const draft = state.localeDraft
    if (kind === 'country') {
      if (draft.shipCountry !== value) {
        draft.shipCountry = value
        draft.shipState = ''
        draft.shipCity = ''
        // 选国家 → 联动语言 + 币种（用户若已手动改过语言/币种则尊重手动值）
        const geo = window.MXQ_GEO || {}
        const linkedLang = normalizeLangCode(COUNTRY_LANGUAGE[value] || 'en')
        const linkedCur = geo.countryCurrency?.[value] || null
        if (!draft._langTouched && linkedLang) draft.lang = linkedLang
        if (!draft._curTouched && linkedCur) draft.currency = linkedCur
      }
    } else if (kind === 'state') {
      if (draft.shipState !== value) {
        draft.shipState = value
        draft.shipCity = ''
      }
    } else if (kind === 'city') draft.shipCity = value
    else if (kind === 'lang') { draft.lang = value; draft._langTouched = true }
    else if (kind === 'cur') { draft.currency = value; draft._curTouched = true }
    renderLocaleSelectors()
    collapseLocaleLists()
    return
  }

  if (target.closest('#locale-save')) {
    applyLocalePanel()
    return
  }

  // 点击面板外部关闭（面板与按钮本身除外）
  const localePop = $('locale-pop')
  if (localePop && !localePop.hidden && !localePop.contains(target) && !target.closest('#locale-btn')) {
    closeLocalePanel()
  }

  if (target.closest('#track-btn') || target.closest('[data-track-order]')) {
    openTrackModal()
    return
  }

  const acctAction = target.closest('[data-acct]')
  if (acctAction) {
    if (acctAction.dataset.acct === 'logout') logout()
    else if (acctAction.dataset.acct === 'center') {
      closeModals()
      navigate('/account/security')
    } else openTrackModal()
    return
  }

  // 账户里的「我的订单」：先关弹窗，再让链接切到订单详情页
  if (target.closest('.acct-order')) {
    closeModals()
    return
  }
})

document.addEventListener('submit', (event) => {
  const form = event.target
  if (form.id === 'register-form') {
    event.preventDefault()
    submitRegister(form)
    return
  }
  if (form.id === 'login-form') {
    event.preventDefault()
    submitLogin(form)
    return
  }
  if (form.id === 'twofa-form') {
    event.preventDefault()
    submitTwoFa(form)
    return
  }
  if (form.id === 'newsletter-form') {
    event.preventDefault()
    submitNewsletter(form)
    return
  }
  if (form.id === 'track-form') {
    event.preventDefault()
    submitTrack(form)
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  if (!$('locale-pop').hidden) {
    closeLocalePanel()
    return
  }
  closeModals()
  $('cart-drawer').hidden = true
  $('scrim').hidden = true
})

/* ---- 以图搜款：文件选择 / 拖放 / CTRL+V 粘贴 / 回车提交 ---- */
document.addEventListener('change', (event) => {
  if (event.target.id !== 'imgsearch-file') return
  const file = event.target.files?.[0]
  event.target.value = ''
  if (file) handleImageFile(file)
})

document.addEventListener('dragover', (event) => {
  if ($('imgsearch-modal')?.hidden !== false) return
  event.preventDefault()
  $('imgsearch-drop')?.classList.add('dragover')
})

document.addEventListener('dragleave', (event) => {
  if (event.target?.closest?.('#imgsearch-drop')) $('imgsearch-drop')?.classList.remove('dragover')
})

document.addEventListener('drop', (event) => {
  if ($('imgsearch-modal')?.hidden !== false) return
  event.preventDefault()
  $('imgsearch-drop')?.classList.remove('dragover')
  const file = event.dataTransfer?.files?.[0]
  if (file) handleImageFile(file)
})

document.addEventListener('paste', (event) => {
  if ($('imgsearch-modal')?.hidden !== false) return
  for (const item of event.clipboardData?.items || []) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        event.preventDefault()
        handleImageFile(file)
      }
      return
    }
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target?.id === 'search') {
    event.preventDefault()
    commitSearch()
    return
  }
  // 价格区间里按回车等同于点「确定」，省得去够鼠标
  if (event.key === 'Enter' && (event.target?.id === 'price-min' || event.target?.id === 'price-max')) {
    event.preventDefault()
    applyPriceRange()
  }
})

document.addEventListener('input', (event) => {
  // 面板候选列表搜索（国家/州/城市/币种）
  const lsearch = event.target.closest('[data-lsearch]')
  if (lsearch) {
    const kind = lsearch.dataset.lsearch
    LPOP.queries[kind] = lsearch.value
    const draft = state.localeDraft || {}
    // 城市/州列表依赖美国城市数据；未就绪时空列表
    const ready = kind !== 'city' || draft.shipCountry !== 'US' || US_CITIES
    const flag = kind === 'country'
    renderLocaleList(kind, ready ? localeOptions(kind) : [], { flag, searchable: kind !== 'lang' })
    return
  }
  if (event.target.id === 'search') {
    state.keyword = event.target.value
    if (currentRoute().name !== 'home') return
    // 只换网格区域：搜索框在 index.html 里，重绘 #app 会打断输入焦点
    const wrap = document.getElementById('grid-wrap')
    const list = filteredProducts()
    if (wrap) {
      wrap.innerHTML = renderGrid(list)
      const note = document.querySelector('.count-note')
      if (note) note.textContent = t('countNote', list.length)
      flushScrollTop()
    } else {
      render()
    }
    return
  }
  if (event.target.matches('input[data-customize]')) {
    const route = currentRoute()
    const product = state.products.find((item) => Number(item.id) === route.id)
    if (product) refreshSummary(product)
  }
})

function addToCart({ goCheckout = false } = {}) {
  const route = currentRoute()
  const product = state.products.find((item) => Number(item.id) === route.id)
  if (!product) return false
  // M6 缺货守卫：显式 stock=0 视为缺货（未登记库存视为不限量，与详情/服务端口径一致）
  if (Number(product.stock) === 0) {
    toast(t('oosNote'))
    document.getElementById('notify-email')?.focus()
    return false
  }
  track(goCheckout ? 'buy_now' : 'add_cart', `p:${product.id}`)
  // M9：像素 AddToCart / InitiateCheckout(buy now) 回传
  growthTrack(goCheckout ? 'InitiateCheckout' : 'AddToCart', {
    content_ids: [String(product.id)],
    content_type: 'product',
    content_name: product.title || '',
  })
  const options = normalizeOptions(product.options)
  const selection = selectionFromDom()

  const requiredMissing = options.find((group) => group.required && group.type !== 'customize' && !selection.picks[group.name])
  if (requiredMissing) {
    toast(t('selectFirst', requiredMissing.name))
    return false
  }
  // 数量以详情页选择器为准；库存有限时按库存封顶，并明确告诉用户被下调了
  const stock = readStock(product)
  let qty = detailQty()
  if (stock && qty > stock) {
    qty = stock
    toast(t('stockLimit', stock))
  }
  const result = priceOf(salePriceOf(product), options, selection)
  const signature = selectionSignature(product.id, selection, result.addons)
  const optionsText = result.addons.map((line) => `${line.label}${line.input ? `(${line.input})` : ''}`).join(' / ')
  // 定制补丁照片：客户在 picture（PATCH）组选中的补丁图，购物车/结算摘要要跟着显示。
  // ① 优先取客户选中的补丁图（None 占位图不算）；② 商品自带赞助商补丁图（attributes.patches）兜底。
  const chosenPatches = options
    .filter((g) => g.type === 'picture')
    .map((g) => {
      const label = selection.picks[g.name]
      if (!label) return null
      const item = (g.items || []).find((it) => it.label === label)
      if (!item || !item.image || item.image === PATCH_NONE_IMG) return null
      return { label, image: item.image }
    })
    .filter(Boolean)
  const attrPatches = (product.patches || [])
    .filter((u) => typeof u === 'string' && u.startsWith('http'))
    .map((u) => ({ label: '', image: u }))
  const patches = chosenPatches.length ? chosenPatches : attrPatches
  const existing = state.cart.find((item) => item.signature === signature)
  if (existing) {
    existing.qty = Math.min(99, (Number(existing.qty) || 1) + qty)
  } else {
    state.cart.push({
      signature,
      productId: product.id,
      title: product.title,
      image: productImages(product)[0],
      base: result.base,
      addons: result.addons,
      total: result.total,
      optionsText,
      // 选项原文一并存下来：下单时服务端要按同一套选项重算价格，
      // 只传「最终价」的话服务端无从校验，等于把定价权交给了浏览器。
      picks: selection.picks,
      inputs: selection.inputs,
      patches,
      qty,
    })
  }
  saveCart()
  renderCart()
  toast(t('addedToCart', localizedTitle(product), money(result.total)))
  // 立即购买：加进购物车后直接去结算页，省掉「回购物车再点结算」两步
  if (goCheckout) {
    navigate('/checkout')
    if (currentRoute().name === 'checkout') render()
  }
  return true
}

/* --------------------- Footer 内容页（对照 Fanatics footer 链接） ---------------------
 * 每页双语（en / zh-CN）静态内容，按当前语言渲染；切换语言时随 render() 自动刷新。
 * 链接全部是站内真路由（/help /shipping …），由 History 路由 + 服务端 SPA 回退支撑。
 */
const CONTENT_PAGES = {
  help: {
    title: { en: 'Help Center', 'zh-CN': '帮助中心' },
    body: {
      en: `
        <h2>Orders &amp; Tracking</h2>
        <p>Use <b>Track My Order</b> in the footer (or the Track Order button at the top) and enter your order number to see real-time status.</p>
        <h2>Payment Methods</h2>
        <p>We accept PayPal, Visa, Mastercard, AMEX and Discover. Prices are recalculated server-side from the live catalogue before an order is created.</p>
        <h2>Sizing</h2>
        <p>Every product page has a <b>SIZE GUIDE</b> with official jersey measurements in cm and inches.</p>
        <h2>Contact</h2>
        <p>Email <a href="mailto:support@mxqshop.to">support@mxqshop.to</a> or reach us on any social channel in the footer — we usually reply within 24 hours.</p>`,
      'zh-CN': `
        <h2>订单与查询</h2>
        <p>点击页脚的「订单查询」（或页面顶部的 Track Order），输入订单号即可查看实时状态。</p>
        <h2>支付方式</h2>
        <p>支持 PayPal、Visa、Mastercard、AMEX、Discover。下单金额由服务端按线上商品库实时重算，防止篡改。</p>
        <h2>尺码</h2>
        <p>每个商品页都有 <b>SIZE GUIDE</b>，提供官方球衣尺码（厘米/英寸可切换）。</p>
        <h2>联系我们</h2>
        <p>邮件 <a href="mailto:support@mxqshop.to">support@mxqshop.to</a>，或通过页脚任意社交渠道联系我们，一般 24 小时内回复。</p>`,
    },
  },
  contact: {
    title: { en: 'Contact Us', 'zh-CN': '联系我们' },
    body: {
      en: `
        <h2>Email</h2>
        <p><a href="mailto:support@mxqshop.to">support@mxqshop.to</a> — for order issues, sizing questions or wholesale inquiries.</p>
        <h2>Social</h2>
        <p>The fastest way to reach us is via the social channels listed in the footer — we post new arrivals there too.</p>
        <h2>Business Hours</h2>
        <p>Monday – Saturday, 9:00–18:00 (GMT+8). Messages outside these hours are answered the next working day.</p>`,
      'zh-CN': `
        <h2>邮箱</h2>
        <p><a href="mailto:support@mxqshop.to">support@mxqshop.to</a> —— 订单问题、尺码咨询、批发合作均可来函。</p>
        <h2>社交媒体</h2>
        <p>通过页脚列出的社交渠道联系我们最快捷，新款也会第一时间在那里发布。</p>
        <h2>工作时间</h2>
        <p>周一至周六 9:00–18:00（GMT+8），非工作时间的消息将在下一个工作日回复。</p>`,
    },
  },
  shipping: {
    title: { en: 'Shipping', 'zh-CN': '配送说明' },
    body: {
      en: `
        <h2>Processing Time</h2>
        <p>In-stock items are prepared within 1–3 business days. Customized (name/number/patch) items may need 1–2 extra days.</p>
        <h2>Delivery Time</h2>
        <p>International shipping typically takes 7–15 business days depending on destination. A tracking number is provided for every order.</p>
        <h2>Shipping Fee</h2>
        <p>Calculated at checkout by destination and weight. Any duties or import taxes are the responsibility of the recipient per local customs rules.</p>`,
      'zh-CN': `
        <h2>备货时间</h2>
        <p>现货商品 1–3 个工作日内发出；含定制（印号/补丁）的商品可能多需 1–2 天。</p>
        <h2>运输时间</h2>
        <p>国际快递一般 7–15 个工作日送达（视目的地而定），每个订单都可全程跟踪。</p>
        <h2>运费</h2>
        <p>运费按目的地与重量在结算页实时计算；关税等进口税费按当地海关规定由收件人承担。</p>`,
    },
  },
  returns: {
    title: { en: '30-Day Returns', 'zh-CN': '30 天退换' },
    body: {
      en: `
        <h2>Return Window</h2>
        <p>Unworn, unwashed items with original tags can be returned within 30 days of delivery.</p>
        <h2>How to Return</h2>
        <p>Contact us with your order number before shipping anything back. Once the item arrives and passes inspection, your refund is issued to the original payment method.</p>
        <h2>Exceptions</h2>
        <p>Customized items (custom name/number) are made just for you and can only be returned for manufacturing defects.</p>`,
      'zh-CN': `
        <h2>退换期限</h2>
        <p>签收后 30 天内，未穿着、未洗涤、吊牌完好的商品可申请退换。</p>
        <h2>退换流程</h2>
        <p>寄回前请先联系客服并提供订单号；商品寄回验收通过后，退款将原路退回你的支付账户。</p>
        <h2>例外情况</h2>
        <p>定制类商品（自定义印号/名字）为按需制作，仅在接受货质量问题时退换。</p>`,
    },
  },
  authenticity: {
    title: { en: 'Authenticity Guarantee', 'zh-CN': '正品保证' },
    body: {
      en: `
        <h2>Quality First</h2>
        <p>Every jersey is inspected before dispatch — stitching, badges, patches and printing are checked one by one.</p>
        <h2>Accurate Descriptions</h2>
        <p>Product photos are of the actual items we stock. Player version vs. fan version is clearly marked on each product page.</p>
        <h2>Not Right? Return It.</h2>
        <p>If an item does not match its description, we will make it right — see our 30-day return policy.</p>`,
      'zh-CN': `
        <h2>品质为先</h2>
        <p>每件球衣发货前均逐件质检——走线、徽章、补丁与印字逐一核对。</p>
        <h2>如实描述</h2>
        <p>商品图均为实拍；球员版与球迷版在商品页明确标注，不混淆。</p>
        <h2>不符即退</h2>
        <p>若实物与描述不符，我们负责到底——详见 30 天退换政策。</p>`,
    },
  },
  'safe-shopping': {
    title: { en: 'Safe Shopping', 'zh-CN': '安全支付' },
    body: {
      en: `
        <h2>Encrypted Checkout</h2>
        <p>The entire site runs on HTTPS. Payments are processed by PayPal and major card networks — we never see or store your card details.</p>
        <h2>Server-Side Pricing</h2>
        <p>Order totals are recalculated on our server from the live catalogue before payment, so tampered prices in the browser are rejected.</p>
        <h2>Privacy</h2>
        <p>We only collect what is needed to fulfil your order. See our Privacy Policy for details.</p>`,
      'zh-CN': `
        <h2>加密结算</h2>
        <p>全站 HTTPS。支付由 PayPal 与主流卡组织处理——我们不经手也不存储你的银行卡信息。</p>
        <h2>服务端计价</h2>
        <p>下单金额由服务端按线上商品库实时重算，浏览器端被篡改的价格一律无效。</p>
        <h2>隐私</h2>
        <p>我们只收集履约所必需的信息，详见《隐私政策》。</p>`,
    },
  },
  'promo-terms': {
    title: { en: 'Promo Terms', 'zh-CN': '促销条款' },
    body: {
      en: `
        <h2>General</h2>
        <p>Site discounts are applied automatically at checkout. Unless stated otherwise, promotions cannot be combined.</p>
        <h2>Scope</h2>
        <p>Promotions apply to in-stock items only, while supplies last. Customization add-ons are priced separately and may be excluded.</p>
        <h2>Changes</h2>
        <p>We may modify or end a promotion at any time. The price you see at checkout is the final price before shipping.</p>`,
      'zh-CN': `
        <h2>通用规则</h2>
        <p>站点折扣在结算页自动生效；除特别说明外，促销活动不可叠加。</p>
        <h2>适用范围</h2>
        <p>促销仅适用于有货商品，售完即止；定制加价部分单独计价，可能不参与促销。</p>
        <h2>变更</h2>
        <p>我们可能随时调整或终止促销活动；结算页显示的价格即为运费前的最终价格。</p>`,
    },
  },
  about: {
    title: { en: 'About Us', 'zh-CN': '品牌介绍' },
    body: {
      en: `
        <h2>MXQ Football Store</h2>
        <p>MXQ is an independent football &amp; sports store for fans worldwide — club and national team jerseys, NFL/MLB/NBA/NHL gear, boots, bags and collectibles.</p>
        <h2>Why Shop With Us</h2>
        <p>Real-time pricing, official size charts, careful quality checks and responsive support. New arrivals land in the store every week.</p>
        <h2>Our Promise</h2>
        <p>What you see is what you get: honest photos, honest versions, honest prices.</p>`,
      'zh-CN': `
        <h2>MXQ Football Store</h2>
        <p>MXQ 是面向全球球迷的独立体育商店——俱乐部与国家队球衣、NFL/MLB/NBA/NHL 装备、球鞋、球包与收藏品。</p>
        <h2>选择我们的理由</h2>
        <p>价格实时、官方尺码表、严格的出厂质检与及时客服；每周都有新款上架。</p>
        <h2>我们的承诺</h2>
        <p>所见即所得：真实的图片、真实的版本、真实的价格。</p>`,
    },
  },
  privacy: {
    title: { en: 'Privacy Policy', 'zh-CN': '隐私政策' },
    body: {
      en: `
        <h2>What We Collect</h2>
        <p>Account details (email, shipping address), order history, and newsletter email if you subscribe. Browsing data is limited to what is needed to run the store.</p>
        <h2>How We Use It</h2>
        <p>To process orders, provide support, and (only with your consent) send marketing emails. We never sell your personal data.</p>
        <h2>Cookies</h2>
        <p>Essential cookies keep you signed in and remember your cart. No third-party advertising trackers are used.</p>
        <h2>Your Rights</h2>
        <p>Contact us any time to access, correct or delete your data.</p>`,
      'zh-CN': `
        <h2>我们收集什么</h2>
        <p>账户信息（邮箱、收货地址）、订单记录，以及你订阅时留下的邮箱。浏览数据仅限于维持商店运转所必需的范围。</p>
        <h2>如何使用</h2>
        <p>用于处理订单、提供售后，以及（仅在您同意后）发送营销邮件。我们绝不出售您的个人数据。</p>
        <h2>Cookie</h2>
        <p>必要的 Cookie 用于保持登录与记住购物车；不使用第三方广告跟踪器。</p>
        <h2>您的权利</h2>
        <p>您可以随时联系我们查询、更正或删除个人数据。</p>`,
    },
  },
  /* ------------------ M7 无障碍声明（WCAG 2.1 AA / 欧盟 EAA，2026-10-06） ------------------ */
  accessibility: {
    title: { en: 'Accessibility Statement', 'zh-CN': '无障碍声明' },
    body: {
      en: `
        <h2>Our Commitment</h2>
        <p>MXQ Football Store is committed to making this website accessible to everyone, in line with WCAG 2.1 Level AA and the EU Accessibility Act (Directive (EU) 2019/882).</p>
        <h2>What We Have Done</h2>
        <ul>
          <li>Semantic HTML structure with landmarks (header, nav, main, footer) and a "skip to content" link.</li>
          <li>Full keyboard operability for menus, dialogs, filters and checkout; visible focus indicators.</li>
          <li>Text alternatives for informative images; decorative icons are hidden from assistive technology.</li>
          <li>Dialogs use ARIA roles, labels and Escape-to-close.</li>
          <li>Color contrast checked against WCAG AA ratios.</li>
        </ul>
        <h2>Known Limitations</h2>
        <p>Some product images supplied by third parties may lack detailed alternative text. Live-streamed media is not yet fully captioned.</p>
        <h2>Feedback</h2>
        <p>If you encounter any accessibility barrier, contact us via the Contact Us page and we will respond within 5 business days.</p>
        <p><em>This statement was last reviewed on 6 October 2026.</em></p>`,
      'zh-CN': `
        <h2>我们的承诺</h2>
        <p>MXQ Football Store 致力于让每位用户都能无障碍使用本网站，遵循 WCAG 2.1 AA 级标准及欧盟《无障碍法案》（指令 (EU) 2019/882）。</p>
        <h2>已采取的措施</h2>
        <ul>
          <li>语义化 HTML 结构（header / nav / main / footer 地标）并提供「跳到主要内容」链接。</li>
          <li>菜单、弹窗、筛选与结算全流程支持键盘操作，并提供可见的焦点指示。</li>
          <li>信息性图片提供替代文本；装饰性图标对辅助技术隐藏。</li>
          <li>弹窗使用 ARIA 角色、标签，支持 Esc 键关闭。</li>
          <li>配色对比度按 WCAG AA 标准校验。</li>
        </ul>
        <h2>已知限制</h2>
        <p>部分第三方商品图缺少详细替代文本；流媒体内容尚未提供完整字幕。</p>
        <h2>反馈渠道</h2>
        <p>如遇任何无障碍障碍，请通过「联系我们」页面反馈，我们将在 5 个工作日内回复。</p>
        <p><em>本声明最后审阅日期：2026 年 10 月 6 日。</em></p>`,
    },
  },
  terms: {
    title: { en: 'Terms of Use', 'zh-CN': '使用条款' },
    body: {
      en: `
        <h2>Using This Site</h2>
        <p>By placing an order you confirm the information you provide is accurate and that you accept these terms.</p>
        <h2>Pricing &amp; Orders</h2>
        <p>All prices are in the currency shown at checkout. We reserve the right to cancel orders in case of obvious pricing errors or stock issues, with a full refund.</p>
        <h2>Content</h2>
        <p>Product descriptions and images are provided for shopping guidance; team and league names remain property of their respective owners.</p>
        <h2>Liability</h2>
        <p>Our liability is limited to the value of the order in question.</p>`,
      'zh-CN': `
        <h2>网站使用</h2>
        <p>下单即表示您确认所提供的信息真实准确，并接受本条款。</p>
        <h2>价格与订单</h2>
        <p>价格以结算页显示币种为准；出现明显标价错误或缺货时，我们保留取消订单并全额退款的权利。</p>
        <h2>内容</h2>
        <p>商品描述与图片仅供购物参考；球队与联盟名称等商标归各自权利人所有。</p>
        <h2>责任</h2>
        <p>我们的责任以相关订单金额为限。</p>`,
    },
  },
}

function renderContentPage(slug) {
  const page = CONTENT_PAGES[slug]
  if (!page) return ''
  const lang = isZh(state.lang) ? 'zh-CN' : 'en'
  return `
    <div class="cp-head"><h1>${esc(page.title[lang])}</h1></div>
    <div class="cp-body">${page.body[lang]}</div>`
}

/** 页脚邮件订阅：POST /api/store/newsletter（服务端写入数据库，邮箱唯一、重复订阅幂等成功） */
async function submitNewsletter(form) {
  const input = form.querySelector('input[name="email"]')
  const msg = document.getElementById('newsletter-msg')
  const email = String(input && input.value ? input.value : '').trim()
  const show = (text, ok) => {
    if (!msg) return
    msg.hidden = false
    msg.textContent = text
    msg.classList.toggle('ok', ok)
    msg.classList.toggle('bad', !ok)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    show(isZh(state.lang) ? '请输入有效邮箱' : 'Please enter a valid email', false)
    return
  }
  const btn = form.querySelector('button[type="submit"]')
  if (btn) btn.disabled = true
  try {
    const res = await fetch(apiUrl('/api/store/newsletter'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) throw new Error(String(res.status))
    show(t('fSubOk'), true)
    if (input) input.value = ''
  } catch {
    show(t('fSubErr'), false)
  } finally {
    if (btn) btn.disabled = false
  }
}

window.addEventListener('popstate', () => {
  // 必须在 render() 之前：此刻 window.scrollY 还是「离开的那个页面」的位置
  trackRouteScroll()
  if (currentRoute().name !== 'detail') lastDetailId = 0
  render()
  restoreRouteScroll()
})

/**
 * History 路由导航：pushState + 手动渲染（pushState 不触发 popstate）。
 * 只处理站内路由路径，其余（外链 / 静态资源）照常走浏览器原生跳转。
 */
function navigate(path) {
  // M1：所有站内跳转统一补市场前缀（withMarket 幂等，带前缀的入参不会被二次加前缀）
  const target = withMarket(path, MARKET_CODE)
  if (location.pathname !== target) history.pushState({}, '', target)
  applyMarketPreference()
  updateSeoLinks()
  trackRouteScroll()
  if (currentRoute().name !== 'detail') lastDetailId = 0
  render()
  restoreRouteScroll()
}

/** 是否为站内路由路径（与 currentRoute 的解析集合一一对应） */
function isInternalRoute(href) {
  // M1：带市场前缀的路径（/uk/cart、/de/nfl/...）同样是站内路由
  const path = stripMarket(href)
  if (path === '/' || path === '') return true
  // /get-app 是独立静态落地页（get-app.html，自带标题/安装指引），必须整页跳转；
  // 否则会被下面的分组路径兜底正则误判为 SPA 路由，渲染回首页导致页脚按钮「点不开」
  if (/^\/get-app\/?$/.test(href)) return false
  if (/^\/p\/\d+$/.test(href)) return true
  if (/^\/(image-search|cart|checkout|favorites|help|contact|shipping|returns|authenticity|safe-shopping|promo-terms|about|privacy|terms)\/?$/.test(href)) return true
  if (/^\/(pay|order)\/[A-Za-z0-9-]{4,40}$/.test(href)) return true
  // Fanatics 式分组路径（/nfl、/nfl/nfc-east/dallas-cowboys）；未知名最终回退首页，行为不变
  if (/^\/[a-z0-9-]+(?:\/[a-z0-9-]+){0,3}\/?$/.test(href)) return true
  return false
}

// 全局点击拦截：站内 <a href="/p/123"> 等 → SPA 导航，不再整页刷新
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null
  if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
  const href = anchor.getAttribute('href') || ''
  if (!href.startsWith('/') || href.startsWith('//')) return
  if (!isInternalRoute(href)) return
  event.preventDefault()
  navigate(href)
})

// 导航横向滚动 / 窗口尺寸变化时，更新两侧「还有更多分类」的渐隐提示
document.addEventListener('scroll', (event) => {
  if (event.target && event.target.id === 'nav') syncNavFade()
}, true)
window.addEventListener('resize', syncNavFade)

/** 回到顶部按钮：滚过一屏才出现，否则它会一直压在首屏右下角 */
function syncBackToTop() {
  const node = $('back-to-top')
  if (node) node.hidden = window.scrollY < window.innerHeight * 0.8
}
window.addEventListener('scroll', syncBackToTop, { passive: true })

/* ------------------------------ 启动 ------------------------------ */

/** M3 PWA 离线兜底：断网/恢复联网时给出明确状态（可访问性用 role=status 播报） */
function initOfflineBar() {
  const bar = $('offline-bar')
  if (!bar) return
  const sync = () => {
    bar.hidden = navigator.onLine !== false
  }
  window.addEventListener('offline', sync)
  window.addEventListener('online', () => {
    sync()
    // 恢复联网后刷新数据，避免用户继续看旧价格
    if (state.loaded) void load()
  })
  bar.addEventListener('click', (event) => {
    if (!event.target.closest('.offline-retry')) return
    location.reload()
  })
  sync()
}

// M1：先按 URL / 偏好确定市场，再同步地址栏与 SEO 头（canonical、hreflang、og:locale）
applyMarketPreference()
updateSeoLinks()
// SEO 增强 #6/#32/#33：首屏兜底注入一次（首页/详情页在 render() 里会再对齐一次）
seoForRoute(location.pathname === '/' || stripMarket(location.pathname) === '/' ? 'home' : 'other')
initOfflineBar()

state.cart = loadCart()
state.favs = readIdList(FAV_KEY)
state.recent = readIdList(RECENT_KEY, RECENT_MAX)
loadCompare() // #5：恢复对比选中态
paintCompareBar()
renderCartBadge()
renderFavBadge()
syncBackToTop()
setupMegaMenu()
load()
// 会话在 HttpOnly cookie 里，单独问一次服务端「我是谁」
loadSession()

/* ------------------ M8 错误监控与埋点（2026-10-06） ------------------ */
/**
 * 轻量遥测：错误（window.onerror / unhandledrejection / fetch 失败）+ 行为事件
 * （页面浏览 / 商品详情 / 加购 / 结算）。批量缓冲 10s 或攒满 8 条后用
 * sendBeacon（页面卸载也不丢）上报到 /api/store/telemetry，服务端落 JSONL 日志。
 * 自有上报失败静默丢弃：监控本身绝不能影响业务。
 */
const TELEMETRY_QUEUE = []
let TELEMETRY_TIMER = null

const meta = () => ({
  url: location.href.slice(0, 300),
  lang: state.lang || 'en',
  cur: state.currency || 'USD',
  ref: document.referrer.slice(0, 300),
})

function flushTelemetry() {
  clearTimeout(TELEMETRY_TIMER)
  TELEMETRY_TIMER = null
  if (!TELEMETRY_QUEUE.length) return
  const batch = TELEMETRY_QUEUE.splice(0, TELEMETRY_QUEUE.length)
  for (const entry of batch) {
    const body = JSON.stringify({ ...entry, ...meta() })
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/store/telemetry', new Blob([body], { type: 'application/json' }))) continue
    } catch { /* 落到 fetch */ }
    try {
      fetch(apiUrl('/api/store/telemetry'), { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {})
    } catch { /* 静默 */ }
  }
}

function track(name, detail) {
  try {
    TELEMETRY_QUEUE.push({ type: 'event', name: String(name).slice(0, 80), detail: String(detail || '').slice(0, 2000) })
    if (!TELEMETRY_TIMER) TELEMETRY_TIMER = setTimeout(flushTelemetry, 10_000)
    if (TELEMETRY_QUEUE.length >= 8) flushTelemetry()
  } catch { /* 静默 */ }
}
window.track = track

function reportError(kind, detail) {
  try {
    // 每类错误每次会话只报前 10 条，防止异常风暴刷爆队列
    reportError.counts = reportError.counts || {}
    const key = `${kind}:${String(detail).slice(0, 60)}`
    reportError.counts[key] = (reportError.counts[key] || 0) + 1
    if (reportError.counts[key] > 10) return
    TELEMETRY_QUEUE.push({ type: 'error', name: kind, detail: String(detail).slice(0, 2000) })
    if (!TELEMETRY_TIMER) TELEMETRY_TIMER = setTimeout(flushTelemetry, 10_000)
  } catch { /* 静默 */ }
}

window.addEventListener('error', (event) => {
  const target = event.target || {}
  // 资源加载失败（img/script/link）在 error 捕获阶段冒出，与 JS 异常区分开
  if (target.tagName && target !== window) {
    reportError('resource', `${target.tagName} ${target.src || target.href || ''}`)
    return
  }
  reportError('js', `${event.message} @ ${(event.filename || '').split('/').pop()}:${event.lineno}`)
}, true)

window.addEventListener('unhandledrejection', (event) => {
  reportError('promise', String(event.reason?.stack || event.reason || 'unknown rejection').slice(0, 500))
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flushTelemetry() // 关页前把没发出去的发完
})
window.addEventListener('pagehide', flushTelemetry)

// 首次浏览 + 路由切换埋点（视图历史用 pushState 去重）
const TR_LAST_VIEW = { path: '' }
function trackView() {
  const path = location.pathname
  if (TR_LAST_VIEW.path === path) return
  TR_LAST_VIEW.path = path
  const detail = currentRoute()
  track('view', detail.name === 'detail' ? `p:${detail.id}` : path || 'home')
  growthTrack('PageView', {}) // M9：各像素 PageView（像素未配置时内部空操作）
}
trackView()
window.addEventListener('popstate', () => setTimeout(trackView, 50))

/* ------------------ M4 PWA：Service Worker 注册（2026-10-06） ------------------ */
// 缓存策略：静态资源（/img /assets /styles /app.js）cache-first，
// 页面与 API network-first（离线时页面退回缓存版本，数据不假装在线）。
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js?v=20261006').catch(() => { /* SW 失败不影响功能 */ })
  })
}


/* ==================== M9 营销与增长模块（2026-10-08） ====================
 * 覆盖：广告像素（Meta/GA4/Google Ads/TikTok）+ 事件回传、UTM 首末触归因、
 *       联盟分销 ref、A/B 实验分配、站内营销位（横幅/弹窗/倒计时/购物车挽留）、
 *       商品分享、博客路由、订阅入口增强（渠道+合规勾选）。
 * 全部容错：任一子模块失败不影响购物主流程。
 */
const GROWTH = {
  settings: null, banners: null, experiments: null, expAssigned: {}, loaded: false,
}

function growthVisitorId() {
  let vid = ''
  try {
    vid = localStorage.getItem('mxq_vid') || ''
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
      localStorage.setItem('mxq_vid', vid)
    }
  } catch { vid = 'v_anon_' + Date.now().toString(36) }
  return vid
}

// UTM 首触 / 末触：首触只记一次（localStorage 持久），末触每次进站覆盖
function growthCaptureUtm() {
  const params = new URLSearchParams(location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const touch = {}
  keys.forEach((k) => { const v = params.get(k); if (v) touch[k] = v.slice(0, 120) })
  // 分销短链种下的 cookie
  const refMatch = document.cookie.match(/(?:^|;\s*)mxq_ref=([A-Za-z0-9_-]{2,32})/)
  if (refMatch) touch.ref = refMatch[1]
  try {
    if (Object.keys(touch).length) {
      if (!localStorage.getItem('mxq_utm_first')) localStorage.setItem('mxq_utm_first', JSON.stringify(touch))
      sessionStorage.setItem('mxq_utm_last', JSON.stringify(touch))
    }
  } catch { /* 隐私模式忽略 */ }
}

function growthUtmPayload() {
  const read = (store) => { try { return JSON.parse(store || 'null') } catch { return null } }
  let first = null
  let last = null
  try { first = read(localStorage.getItem('mxq_utm_first')); last = read(sessionStorage.getItem('mxq_utm_last')) } catch { /* noop */ }
  const payload = {}
  if (first) payload.first_touch = first
  if (last) payload.last_touch = last
  const refMatch = document.cookie.match(/(?:^|;\s*)mxq_ref=([A-Za-z0-9_-]{2,32})/)
  if (refMatch) payload.ref = refMatch[1]
  payload.visitor_id = growthVisitorId()
  return payload
}

/* ---------- 广告像素加载与事件回传 ---------- */
function growthLoadPixels(px) {
  if (!px) return
  // Meta Pixel
  if (px.meta_pixel_id && !window.fbq) {
    const n = (window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) })
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = []
    const s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)
    window.fbq('init', px.meta_pixel_id)
    window.fbq('track', 'PageView')
  }
  // GA4 / Google Ads（同一 gtag.js，双身份初始化）
  const gids = [px.ga4_id, px.google_ads_id].filter(Boolean)
  if (gids.length && !window.gtag) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gids[0])
    document.head.appendChild(s)
    gids.forEach((id) => window.gtag('config', id))
  }
  // TikTok Pixel
  if (px.tiktok_pixel_id && !window.ttq) {
    const ttq = (window.ttq = [])
    ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie']
    ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }
    for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i])
    ttq.load = function (e) {
      const url = 'https://analytics.tiktok.com/i18n/pixel/events.js'
      ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = url
      const s = document.createElement('script'); s.async = true; s.src = url + '?sdkid=' + e + '&lib=ttq'
      document.head.appendChild(s)
    }
    ttq.load(px.tiktok_pixel_id)
    ttq.page()
  }
}

// 统一事件回传：各像素按可用性分发
function growthTrack(event, data) {
  const payload = data || {}
  try {
    if (window.fbq) window.fbq('track', event, payload)
    if (window.ttq && typeof window.ttq.track === 'function') {
      const ttMap = { ViewContent: 'ViewContent', AddToCart: 'AddToCart', InitiateCheckout: 'InitiateCheckout', Purchase: 'CompletePayment' }
      window.ttq.track(ttMap[event] || event, payload.value ? { value: payload.value, currency: payload.currency || 'USD' } : {})
    }
    if (window.gtag) window.gtag('event', event, payload)
  } catch { /* 像素失败不影响购物 */ }
}

/* ---------- A/B 实验：访客哈希分配 + 曝光上报 ---------- */
function growthExpVariant(key) {
  if (!GROWTH.experiments) return null
  const exp = GROWTH.experiments.find((e) => e.key === key)
  if (!exp || !Array.isArray(exp.variants) || !exp.variants.length) return null
  if (GROWTH.expAssigned[key]) return GROWTH.expAssigned[key]
  const vid = growthVisitorId()
  let hash = 0
  for (let i = 0; i < vid.length; i++) hash = (hash * 31 + vid.charCodeAt(i)) >>> 0
  const total = exp.variants.reduce((sum, v) => sum + (Number(v.weight) || 0), 0) || exp.variants.length
  let point = hash % total
  let chosen = exp.variants[exp.variants.length - 1]
  for (const v of exp.variants) {
    point -= Number(v.weight) || (total / exp.variants.length)
    if (point < 0) { chosen = v; break }
  }
  GROWTH.expAssigned[key] = chosen
  try { apiJson('/marketing/experiment-event', { method: 'POST', body: { key, variant: chosen.id, visitorId: vid, event: 'exposure' } }).catch(() => {}) } catch { /* noop */ }
  return chosen
}
function growthExpConvert(key, orderNo) {
  const chosen = GROWTH.expAssigned[key]
  if (!chosen) return
  try { apiJson('/marketing/experiment-event', { method: 'POST', body: { key, variant: chosen.id, visitorId: growthVisitorId(), event: 'conversion', orderNo } }).catch(() => {}) } catch { /* noop */ }
}

/* ---------- 站内营销位：横幅 / 弹窗 / 倒计时 / 购物车挽留 ---------- */
function growthFreqOk(id, freq) {
  if (freq === 'always') return true
  try {
    const store = freq === 'once' ? localStorage : sessionStorage
    const mark = 'mxq.slot.' + id
    if (store.getItem(mark)) return false
    store.setItem(mark, '1')
    return true
  } catch { return true }
}

/**
 * P0-4 优惠促销：可用优惠券展示（前台可见）。
 * 数据源 /api/store/marketing/coupons（服务端只回当前有效且有余量的活动）。
 * 三处复用：首页促销区、购物车抽屉、结账页（结账页点击可一键填入优惠码输入框）。
 * 加载失败静默隐藏——营销位不能影响购物流程。
 */
let PROMO_COUPONS = []

async function loadPromoCoupons() {
  if (PROMO_COUPONS.length) return PROMO_COUPONS
  try {
    const response = await fetch(apiUrl('/api/store/marketing/coupons'))
    if (!response.ok) return []
    const data = await response.json()
    PROMO_COUPONS = Array.isArray(data.coupons) ? data.coupons : []
  } catch {
    PROMO_COUPONS = []
  }
  return PROMO_COUPONS
}

/** 单张优惠码卡片文案：满减 / 折扣 / 不限量 */
function promoCouponText(coupon) {
  const min = Number(coupon.minAmountUsd || 0)
  const value = Number(coupon.value || 0)
  const off = coupon.type === 'fixed' ? `$${value}` : `${value}%`
  const threshold = min > 0 ? t('promoMinSpend', money(min)) : t('promoNoMin')
  return `${off} · ${threshold}`
}

/** 剩余天数：≤0 表示已过期；返回 null 表示无期限 */
function promoDaysLeft(coupon) {
  if (!coupon.endsAt) return null
  const days = Math.ceil((new Date(coupon.endsAt).getTime() - Date.now()) / 86400000)
  return days > 0 ? days : 0
}

/**
 * @param {'home'|'cart'|'checkout'} variant
 * checkout 变体带 data-apply-coupon，点击直接填入并触发校验
 */
function renderPromoCoupons(variant = 'home') {
  const list = PROMO_COUPONS
  if (!list.length) return ''
  const cards = list
    .map((coupon) => {
      const days = promoDaysLeft(coupon)
      // 超过 30 天不显示天数（长期活动写「365 天后结束」反而像倒计时促销），只保留 ≤3 天的紧迫感
      const ends = days === null || days > 30 ? '' : days <= 3 ? t('promoEndsUrgent', days) : t('promoEndsIn', days)
      return `
      <li class="promo-card${variant === 'checkout' ? ' with-apply' : ''}${days !== null && days <= 3 ? ' urgent' : ''}"${variant === 'checkout' ? ` data-apply-coupon="${esc(coupon.code)}" role="button" tabindex="0"` : ''}>
        <div class="promo-card-main">
          <b class="promo-name">${esc(coupon.name || coupon.code)}</b>
          <span class="promo-desc">${esc(promoCouponText(coupon))}${ends ? ` · ${esc(ends)}` : ''}</span>
        </div>
        <button type="button" class="promo-copy" data-copy-code="${esc(coupon.code)}" aria-label="${esc(t('promoCopyCode', coupon.code))}">
          <code>${esc(coupon.code)}</code>
          <span>${esc(t('promoCopy'))}</span>
        </button>
      </li>`
    })
    .join('')
  return `
  <section class="promo-coupons" data-variant="${esc(variant)}" aria-label="${esc(t('promoTitle'))}">
    <h3 class="promo-heading">${esc(t('promoTitle'))}${variant === 'checkout' ? `<span class="promo-hint">${esc(t('promoCheckoutHint'))}</span>` : ''}</h3>
    <ul class="promo-list">${cards}</ul>
    ${variant !== 'checkout' ? `<p class="promo-terms-note">${esc(t('promoTermsNote'))} <a href="/promo-terms">${esc(t('promoTermsLink'))}</a></p>` : ''}
  </section>`
}

/** 渲染到页面上所有挂载点（首页/购物车/结账页各自决定是否放） */
async function mountPromoCoupons() {
  const coupons = await loadPromoCoupons()
  if (!coupons.length) return
  document.querySelectorAll('[data-promo-slot]').forEach((slot) => {
    const variant = slot.dataset.promoSlot || 'home'
    slot.innerHTML = renderPromoCoupons(variant)
  })
}

/** 复制优惠码到剪贴板（navigator.clipboard 不可用时降级为选中文本） */
async function copyPromoCode(code, btn) {
  if (!code) return
  let ok = false
  try {
    await navigator.clipboard.writeText(code)
    ok = true
  } catch {
    // 降级：临时 textarea + execCommand
    try {
      const ta = document.createElement('textarea')
      ta.value = code
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      ok = document.execCommand('copy')
      ta.remove()
    } catch {
      ok = false
    }
  }
  const label = btn?.querySelector('span')
  if (label) {
    const before = label.textContent
    label.textContent = ok ? t('promoCopied') : code
    setTimeout(() => {
      label.textContent = before
    }, 1600)
  }
  if (!ok) toast(`${t('promoCopy')} ${code}`)
}

/** 结算页：点击卡片 → 把优惠码填进输入框并立即校验 */
function applyPromoCodeToCheckout(code) {
  const input = document.getElementById('coupon-input')
  if (!input) return
  input.value = code
  input.dispatchEvent(new Event('input', { bubbles: true }))
  const apply = document.getElementById('coupon-apply')
  if (apply) apply.click()
  input.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

/** P0-4：优惠码卡片是 role=button，键盘需支持 Enter / Space（WCAG 2.1 AA 2.1.1） */
document.addEventListener('keydown', (event) => {
  const card = event.target?.closest?.('[data-apply-coupon]')
  if (!card) return
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  applyPromoCodeToCheckout(String(card.dataset.applyCoupon || ''))
})

function growthRenderBanners() {
  const list = GROWTH.banners || []
  // 顶栏横幅：只取第一条 top_banner，可关闭
  const top = list.find((b) => b.slot === 'top_banner')
  const bar = document.getElementById('mxq-top-banner')
  if (top && growthFreqOk('top_' + top.id, 'session')) {
    if (!bar) {
      const el = document.createElement('div')
      el.id = 'mxq-top-banner'
      document.body.insertBefore(el, document.body.firstChild)
    }
    const el = document.getElementById('mxq-top-banner')
    el.innerHTML = '<div style="background:#0b1220;color:#fff;font-size:13px;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:10px;position:relative;z-index:60">' +
      '<span>' + esc(top.title) + (top.body ? ' — ' + esc(top.body) : '') + '</span>' +
      (top.link ? '<a href="' + esc(top.link) + '" style="color:#93c5fd;text-decoration:underline">' + esc(top.link_label || '查看') + ' →</a>' : '') +
      '<button type="button" aria-label="close" data-banner-close style="position:absolute;right:10px;background:none;border:0;color:#94a3b8;cursor:pointer;font-size:15px">✕</button></div>'
  } else if (bar) bar.remove()

  // 弹窗 / 倒计时 / 挽留：统一走弹层，一次只弹一个
  const popup = list.find((b) => (b.slot === 'popup' || b.slot === 'countdown_bar' || b.slot === 'cart_retention') && growthFreqOk('pop_' + b.id, b.freq || 'session'))
  if (popup) setTimeout(() => growthShowPopup(popup), 1200)
}

function growthShowPopup(slot) {
  if (document.getElementById('mxq-popup-mask')) return
  const mask = document.createElement('div')
  mask.id = 'mxq-popup-mask'
  const isCountdown = slot.slot === 'countdown_bar' && slot.ends_at
  mask.innerHTML = '<div data-popup-mask style="position:fixed;inset:0;background:rgba(2,6,23,.55);z-index:80;display:flex;align-items:center;justify-content:center;padding:20px">' +
    '<div style="background:#fff;border-radius:16px;max-width:420px;width:100%;padding:24px;position:relative;text-align:center;color:#0f172a">' +
    '<button type="button" data-popup-close aria-label="close" style="position:absolute;top:10px;right:12px;border:0;background:none;font-size:18px;color:#64748b;cursor:pointer">✕</button>' +
    (slot.image ? '<img src="' + esc(slot.image) + '" alt="" style="max-width:100%;border-radius:10px;margin-bottom:12px" loading="lazy" />' : '') +
    '<h3 style="margin:0 0 8px;font-size:18px">' + esc(slot.title) + '</h3>' +
    (slot.body ? '<p style="margin:0 0 12px;font-size:13.5px;color:#475569">' + esc(slot.body) + '</p>' : '') +
    (isCountdown ? '<div data-countdown data-ends="' + esc(slot.ends_at) + '" style="font-variant-numeric:tabular-nums;font-weight:700;font-size:20px;color:#dc2626;margin:10px 0"></div>' : '') +
    (slot.link ? '<a href="' + esc(slot.link) + '" style="display:inline-block;background:#0b1220;color:#fff;padding:10px 22px;border-radius:10px;text-decoration:none;font-size:14px">' + esc(slot.link_label || 'Shop now') + '</a>' : '') +
    '</div></div>'
  document.body.appendChild(mask)
  mask.addEventListener('click', (event) => {
    if (event.target.closest('[data-popup-close]') || event.target.hasAttribute('data-popup-mask')) mask.remove()
  })
  if (isCountdown) {
    const tick = () => {
      const node = mask.querySelector('[data-countdown]')
      if (!node) return
      const left = new Date(slot.ends_at).getTime() - Date.now()
      if (left <= 0) { node.textContent = 'Offer ended'; return }
      const h = Math.floor(left / 3600000)
      const m = Math.floor((left % 3600000) / 60000)
      const s = Math.floor((left % 60000) / 1000)
      node.textContent = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
      setTimeout(tick, 1000)
    }
    tick()
  }
}

// 购物车挽留：有商品 + 用户 45 秒无操作 → 弹挽留位（每会话一次；没有配置挽留位则不弹）
function growthCartRetentionWatch() {
  let idleMs = 0
  const reset = () => { idleMs = 0 }
  ;['mousemove', 'keydown', 'scroll', 'touchstart', 'click'].forEach((evt) => window.addEventListener(evt, reset, { passive: true }))
  setInterval(() => {
    idleMs += 5000
    if (idleMs < 45000) return
    idleMs = 0
    if (!GROWTH.banners || (state.cart && state.cart.length === 0)) return
    if (document.getElementById('mxq-popup-mask')) return
    if (currentRoute().name === 'checkout' || currentRoute().name === 'pay') return
    const retention = (GROWTH.banners || []).find((b) => b.slot === 'cart_retention')
    if (retention && growthFreqOk('pop_' + retention.id, 'session')) growthShowPopup(retention)
  }, 5000)
}

/* ---------- 商品分享（官方品牌标复用 /img/social/*.svg） ---------- */
function growthRenderShare(product) {
  const url = 'https://mxqshop.to/p/' + product.id + '?utm_source=share&utm_medium=social&utm_campaign=product_share'
  const text = (product.title || 'MXQ jersey') + ' — MXQ Football Store'
  const panel = document.getElementById('buy-panel')
  if (!panel || document.getElementById('mxq-share-row')) return
  const row = document.createElement('div')
  row.id = 'mxq-share-row'
  row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap'
  const shares = [
    ['whatsapp', '#25D366', 'https://wa.me/8617675777303?text=' + encodeURIComponent(text + ' ' + url)],
    ['facebook', '#1877F2', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)],
    ['x', '#000000', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url)],
    ['telegram', '#26A5E4', 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text)],
  ]
  row.innerHTML = '<span style="font-size:12px;color:#64748b">Share:</span>' +
    shares.map(([p, color, href]) =>
      '<a href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="Share to ' + p + '" title="Share to ' + p + '" style="width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:' + color + ';text-decoration:none;transition:transform .15s ease,box-shadow .15s ease"' +
      ' onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 10px rgba(15,23,42,.18)\'"' +
      ' onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">' +
      '<img src="/img/social/' + p + '.svg" alt="" width="15" height="15" style="display:block" loading="lazy" /></a>').join('') +
    '<button type="button" data-share-copy style="border:1px solid #e2e8f0;background:#fff;border-radius:8px;padding:5px 10px;font-size:12px;color:#475569;cursor:pointer">Copy link</button>'
  panel.appendChild(row)
  row.querySelector('[data-share-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast('Link copied ✓')
    } catch { toast(url) }
  })
}

/* ---------- 路由事件挂钩（render 各分支调用） ---------- */
function growthOnDetail(product) {
  growthTrack('ViewContent', { content_ids: [String(product.id)], content_type: 'product', content_name: product.title || '' })
  growthRenderShare(product)
  // A/B：详情页主按钮文案实验
  const chosen = growthExpVariant('checkout_cta')
  if (chosen && chosen.label) {
    const buyBtn = document.getElementById('buy-now')
    if (buyBtn && !buyBtn.dataset.expApplied) {
      buyBtn.dataset.expApplied = '1'
      if (!buyBtn.textContent.trim() || buyBtn.textContent.trim() === t('buyNow')) buyBtn.textContent = chosen.label
    }
  }
}
function growthOnCheckout() {
  growthTrack('InitiateCheckout', { num_items: state.cart ? state.cart.length : 0 })
}
let growthPurchaseMarked = ''
function growthOnOrder(orderNo) {
  if (!orderNo || growthPurchaseMarked === orderNo) return
  const view = state.orderView
  if (!view || view.orderNo !== orderNo || view.loading) return
  const paid = view.order && (view.order.payment_status === 'paid' || view.order.status === 'completed')
  if (!paid) return
  growthPurchaseMarked = orderNo
  growthTrack('Purchase', { value: Number(view.order.total_usd) || 0, currency: view.order.currency || 'USD', order_id: orderNo })
  growthExpConvert('checkout_cta', orderNo)
}

/* ---------- 博客（内容营销） ---------- */
async function renderBlogList() {
  const app = $('app')
  app.innerHTML = '<div class="wrap"><div class="skeleton-note">' + t('loading') + '</div></div>'
  let posts = []
  try {
    const data = await apiJson('/blog/posts')
    posts = Array.isArray(data.posts) ? data.posts : []
  } catch { /* 空态 */ }
  if (!posts.length) {
    app.innerHTML = '<div class="wrap"><div class="content-page"><h1>MXQ Journal</h1><p style="color:#64748b">No posts yet — check back soon.</p></div></div>'
    return
  }
  app.innerHTML = '<div class="wrap"><div class="content-page">' +
    '<h1 style="margin-bottom:4px">MXQ Journal</h1>' +
    '<p style="color:#64748b;margin-top:0">Jersey guides, sizing tips and football culture.</p>' +
    '<div style="display:grid;gap:14px;margin-top:18px">' +
    posts.map((p) =>
      '<a href="/blog/' + esc(p.slug) + '" style="display:flex;gap:14px;align-items:flex-start;text-decoration:none;color:inherit;border:1px solid #e2e8f0;border-radius:14px;padding:14px;background:#fff">' +
      (p.cover ? '<img src="' + esc(p.cover) + '" alt="" loading="lazy" style="width:96px;height:72px;object-fit:cover;border-radius:10px;flex-shrink:0" />' : '') +
      '<span><b style="font-size:15px">' + esc(p.title) + '</b><br />' +
      '<span style="font-size:13px;color:#64748b">' + esc(p.excerpt || '') + '</span><br />' +
      '<small style="color:#94a3b8">' + (p.published_at ? esc(String(p.published_at).slice(0, 10)) : '') + '</small></span></a>').join('') +
    '</div></div></div>'
}
async function renderBlogPost(slug) {
  const app = $('app')
  app.innerHTML = '<div class="wrap"><div class="skeleton-note">' + t('loading') + '</div></div>'
  let post = null
  try {
    const data = await apiJson('/blog/post/' + encodeURIComponent(slug))
    post = data.post
  } catch { /* 404 */ }
  if (!post) {
    app.innerHTML = '<div class="wrap"><div class="content-page"><p>Post not found. <a href="/blog">← Back to Journal</a></p></div></div>'
    return
  }
  document.title = post.title + ' — MXQ Football Store'
  app.innerHTML = '<div class="wrap"><article class="content-page" style="max-width:720px">' +
    (post.cover ? '<img src="' + esc(post.cover) + '" alt="" style="width:100%;border-radius:14px;margin-bottom:16px" loading="lazy" />' : '') +
    '<h1>' + esc(post.title) + '</h1>' +
    '<p style="color:#94a3b8;font-size:13px">' + esc(post.author || 'MXQ Team') + ' · ' + (post.published_at ? esc(String(post.published_at).slice(0, 10)) : '') + '</p>' +
    '<div style="font-size:15px;line-height:1.7">' + (post.body || '') + '</div>' +
    '<p style="margin-top:28px"><a href="/blog" style="color:#2563eb">← More from the MXQ Journal</a></p>' +
    '</article></div>'
}

/* ---------- 模块启动 ---------- */
async function growthInit() {
  growthCaptureUtm()
  try {
    const results = await Promise.all([
      apiJson('/marketing/settings').catch(() => null),
      apiJson('/marketing/banners').catch(() => null),
      apiJson('/marketing/experiments').catch(() => null),
    ])
    GROWTH.settings = results[0]
    GROWTH.banners = results[1] && Array.isArray(results[1].banners) ? results[1].banners : []
    GROWTH.experiments = results[2] && Array.isArray(results[2].experiments) ? results[2].experiments : []
    GROWTH.loaded = true
    // X-CMP：像素属「分析/营销」类 Cookie，用户同意前不加载（GDPR 默认拒绝）
    if (cmpAllows('analytics') || cmpAllows('marketing')) {
      growthLoadPixels(GROWTH.settings && GROWTH.settings.pixels)
      GROWTH.pixelsLoaded = true
    }
    // 数据到手后补渲染一次：growthRenderBanners() 只在 render() 里被调用，
    // 而 render() 通常早于本异步请求完成 —— 不补这一下，后台录的横幅/弹窗
    // 首屏永远不显示（页面不发生任何后续重绘）。
    // 用 setTimeout 避开与首屏 render 同一 tick 的重复渲染。
    setTimeout(() => {
      try {
        if (typeof render === 'function' && state.loaded) render()
      } catch { /* 补渲染失败不影响主流程 */ }
    }, 0)
  } catch { /* 全部容错 */ }
}
growthInit()
growthCartRetentionWatch()

/* ============================================================
   X 客服信任 + 合规模块（命令1 & 命令3 前台部分）
   - CMP Cookie 同意（命令3.1）：分类开关 / 记录留存 / 撤回入口
   - 区域化合规（命令3.3）：顶部提示横幅 + 责任主体；受限地区拦截
   - 年龄确认（命令3.4）：后台可开启
   - 信任与安全展示（命令1.5）：首页信任条 + 详情页迷你徽章
   - 尺码助手（命令1.4）：身高体重推荐 + 测量引导 + 合身反馈
   - 在线客服与工单（命令1.1）：聊天窗 + FAQ 自动回复 + 工单跟踪
   - 帮助中心 / 政策版本 / 隐私自助（命令1.2 / 1.3 / 3.2）
   ============================================================ */

const CX = {
  compliance: null,       // /compliance/settings 缓存
  trust: null,            // /trust/signals 缓存
  chat: { open: false, ticketNo: '', email: '', sending: false },
  ai: { open: false, msgs: [], sending: false },
  wa: { url: '' },
  sizeAssistOpen: false,
}

const CXI18N = {
  chatTitle: { en: 'Live Chat & Support', 'zh-CN': '在线客服' },
  chatSub: { en: 'FAQ instant answers · agents per schedule', 'zh-CN': '常见问题秒回 · 客服按班在线' },
  chatPlaceholder: { en: 'Describe your issue…', 'zh-CN': '描述您的问题…' },
  chatStart: { en: 'Start chat', 'zh-CN': '开始对话' },
  chatSend: { en: 'Send', 'zh-CN': '发送' },
  chatName: { en: 'Your name (optional)', 'zh-CN': '您的称呼（可选）' },
  chatEmail: { en: 'Email for replies', 'zh-CN': '接收回复的邮箱' },
  chatTrack: { en: 'Ticket', 'zh-CN': '工单号' },
  chatAgentOnline: { en: 'Agents online', 'zh-CN': '客服在线' },
  chatAgentOffline: { en: 'Agents away — FAQ bot active 24/7', 'zh-CN': '客服暂离 — FAQ 机器人全天在线' },
  chatFaqHit: { en: 'Suggested guides', 'zh-CN': '为您找到' },
  chatResolved: { en: 'Resolved', 'zh-CN': '已解决' },
  chatPending: { en: 'Waiting for agent', 'zh-CN': '等待客服回复' },
  aiTitle: { en: 'MXQ AI Assistant', 'zh-CN': 'MXQ AI 智能客服' },
  aiSub: { en: 'AI powered · instant answers 24/7', 'zh-CN': 'AI 驱动 · 全天秒回' },
  aiPlaceholder: { en: 'Ask me anything…', 'zh-CN': '有问题尽管问我…' },
  aiHello: { en: 'Hi! I am the MXQ AI assistant. Ask me about sizing, shipping, returns, payment or your order — I answer instantly 24/7.', 'zh-CN': '您好！我是 MXQ AI 智能客服，关于尺码、物流、退换、支付或订单的问题都可以直接问我，全天在线秒回。' },
  aiThinking: { en: 'Thinking…', 'zh-CN': '思考中…' },
  aiFallback: { en: 'Something went wrong. Please try again, or reach a human agent via Live Chat / WhatsApp.', 'zh-CN': '出了点小问题，请重试，或通过在线客服 / WhatsApp 联系人工客服。' },
  waLabel: { en: 'Chat on WhatsApp Business', 'zh-CN': 'WhatsApp 联系卖家' },
  cmpTitle: { en: 'Your privacy choices', 'zh-CN': '隐私偏好设置' },
  cmpBody: { en: 'We use cookies to run the store (necessary) and, with your consent, for analytics and marketing. Read our <a href="/policies/cookies">Cookie Policy</a>.', 'zh-CN': '我们使用 Cookie 维持商店运行（必要类），并在获得同意后用于分析与营销。详见<a href="/policies/cookies">Cookie 政策</a>。' },
  cmpNecessary: { en: 'Necessary (always on)', 'zh-CN': '必要类（始终开启）' },
  cmpFunctional: { en: 'Functional', 'zh-CN': '功能类' },
  cmpAnalytics: { en: 'Analytics', 'zh-CN': '分析类' },
  cmpMarketing: { en: 'Marketing', 'zh-CN': '营销类' },
  cmpAcceptAll: { en: 'Accept all', 'zh-CN': '全部接受' },
  cmpReject: { en: 'Reject non-essential', 'zh-CN': '仅保留必要' },
  cmpSave: { en: 'Save choices', 'zh-CN': '保存选择' },
  cmpSettings: { en: 'Cookie Settings', 'zh-CN': 'Cookie 设置' },
  ageTitle: { en: 'Age confirmation', 'zh-CN': '年龄确认' },
  ageYes: { en: 'Yes, I am', 'zh-CN': '是，我已成年' },
  ageNo: { en: 'No, exit', 'zh-CN': '否，离开' },
  regionBlocked: { en: 'Our services are not available in your region.', 'zh-CN': '本站服务在您所在地区暂不开放。' },
  sizeAssistTitle: { en: 'Size Assistant', 'zh-CN': '尺码助手' },
  sizeAssistIntro: { en: 'Enter your height & weight — we recommend the best fit instantly.', 'zh-CN': '输入身高与体重，立即获得推荐尺码。' },
  sizeHeight: { en: 'Height', 'zh-CN': '身高' },
  sizeWeight: { en: 'Weight', 'zh-CN': '体重' },
  sizeRecommend: { en: 'Recommend my size', 'zh-CN': '为我推荐尺码' },
  sizeResult: { en: 'Recommended size', 'zh-CN': '推荐尺码' },
  sizeMeasureTitle: { en: 'How to measure', 'zh-CN': '测量引导' },
  sizeFitQ: { en: 'How did it fit?', 'zh-CN': '实际穿着如何？' },
  sizeFitSmall: { en: 'Too small', 'zh-CN': '偏小' },
  sizeFitOk: { en: 'Just right', 'zh-CN': '合身' },
  sizeFitBig: { en: 'Too big', 'zh-CN': '偏大' },
  trustTitle: { en: 'Why shop with MXQ', 'zh-CN': '为什么选择 MXQ' },
  ppTitle: { en: 'Privacy Portal', 'zh-CN': '隐私自助中心' },
  ppIntro: { en: 'Submit a request to access, export, correct or delete your personal data. We respond within 30 days. Save your request number & token to track progress.', 'zh-CN': '提交查询、导出、更正或删除个人数据的申请，我们将在 30 天内响应。请保存申请编号与查询令牌用于跟踪进度。' },
  ppType: { en: 'Request type', 'zh-CN': '申请类型' },
  ppEmail: { en: 'Your account email', 'zh-CN': '账户邮箱' },
  ppDetail: { en: 'Details (optional)', 'zh-CN': '补充说明（可选）' },
  ppSubmit: { en: 'Submit request', 'zh-CN': '提交申请' },
  ppTrack: { en: 'Track existing request', 'zh-CN': '查询已有申请' },
  ppReqNo: { en: 'Request number', 'zh-CN': '申请编号' },
  ppToken: { en: 'Token', 'zh-CN': '查询令牌' },
  ppStatus: { en: 'Status', 'zh-CN': '状态' },
  supportTitle: { en: 'Customer Support', 'zh-CN': '客服中心' },
  supportHours: { en: 'First reply within 24h · live chat bot 24/7', 'zh-CN': '工单 24 小时内首响 · 聊天机器人全天在线' },
  supportOpenChat: { en: 'Open Live Chat', 'zh-CN': '打开在线聊天' },
  verTitle: { en: 'Version', 'zh-CN': '版本' },
  verEffective: { en: 'Effective', 'zh-CN': '生效日期' },
  verArchive: { en: 'Past versions', 'zh-CN': '历史版本' },
}

const cxL = (key) => {
  const obj = CXI18N[key]
  if (!obj) return key
  return obj[state.lang] || obj.en || key
}

const CX_VISITOR_KEY = 'mxq_cmp_v1'
function cxVisitorId() {
  const m = document.cookie.match(/mxq_vid=([^;]+)/)
  if (m && m[1]) return decodeURIComponent(m[1])
  let v = ''
  try { v = localStorage.getItem('mxq_vid_fb') || '' } catch { v = '' }
  if (!v) {
    v = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
    try { localStorage.setItem('mxq_vid_fb', v) } catch { /* 私密模式 */ }
  }
  return v
}

/* ---------------- X-CMP Cookie 同意管理（命令3.1） ---------------- */

function cmpGet() {
  try {
    const raw = localStorage.getItem(CX_VISITOR_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data && typeof data === 'object' ? data : null
  } catch { return null }
}

/** 像素/埋点门控：某类 Cookie 是否已获同意（必要类恒真） */
function cmpAllows(cat) {
  const saved = cmpGet()
  if (!saved) return false
  if (cat === 'necessary') return true
  return !!saved.categories[cat]
}

function cmpPersist(decision, categories) {
  const saved = {
    decision,
    categories: { necessary: true, functional: !!categories.functional, analytics: !!categories.analytics, marketing: !!categories.marketing },
    version: (CX.compliance && CX.compliance.cmp && CX.compliance.cmp.version) || 'v1',
    ts: new Date().toISOString(),
  }
  try { localStorage.setItem(CX_VISITOR_KEY, JSON.stringify(saved)) } catch { /* 忽略 */ }
  apiJson('/compliance/consent', {
    method: 'POST',
    body: { visitorId: cxVisitorId(), decision, categories: saved.categories, policyVersion: saved.version },
  }).catch(() => {})
  // 同意后补加载像素（GROWTH 已就绪且尚未加载时）
  if ((saved.categories.analytics || saved.categories.marketing) && !GROWTH.pixelsLoaded && GROWTH.loaded) {
    growthLoadPixels(GROWTH.settings && GROWTH.settings.pixels)
    GROWTH.pixelsLoaded = true
  }
}

function cmpRenderBanner() {
  if (cmpGet()) return
  const el = document.createElement('div')
  el.className = 'cmp-banner'
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-label', cxL('cmpTitle'))
  el.innerHTML = [
    '<div class="cmp-inner">',
    '<div class="cmp-text">',
    '<b>' + cxL('cmpTitle') + '</b>',
    '<p>' + cxL('cmpBody') + '</p>',
    '<div class="cmp-cats">',
    '<label class="cmp-cat on"><input type="checkbox" checked disabled /> ' + cxL('cmpNecessary') + '</label>',
    '<label class="cmp-cat"><input type="checkbox" data-cmp-cat="functional" checked /> ' + cxL('cmpFunctional') + '</label>',
    '<label class="cmp-cat"><input type="checkbox" data-cmp-cat="analytics" checked /> ' + cxL('cmpAnalytics') + '</label>',
    '<label class="cmp-cat"><input type="checkbox" data-cmp-cat="marketing" /> ' + cxL('cmpMarketing') + '</label>',
    '</div></div>',
    '<div class="cmp-actions">',
    '<button type="button" class="cmp-btn primary" data-cmp-accept>' + cxL('cmpAcceptAll') + '</button>',
    '<button type="button" class="cmp-btn" data-cmp-reject>' + cxL('cmpReject') + '</button>',
    '<button type="button" class="cmp-btn ghost" data-cmp-save>' + cxL('cmpSave') + '</button>',
    '</div></div>',
  ].join('')
  document.body.appendChild(el)
}

function cmpCloseBanner() {
  const el = document.querySelector('.cmp-banner')
  if (el) el.remove()
}

function cmpOpenSettings() {
  const saved = cmpGet() || { categories: { functional: false, analytics: false, marketing: false } }
  const el = document.createElement('div')
  el.className = 'cmp-modal-mask'
  el.innerHTML = [
    '<div class="cmp-modal" role="dialog" aria-modal="true">',
    '<h3>' + cxL('cmpTitle') + '</h3>',
    '<p>' + cxL('cmpBody') + '</p>',
    '<div class="cmp-cats vertical">',
    '<label class="cmp-cat on"><input type="checkbox" checked disabled /> ' + cxL('cmpNecessary') + '</label>',
    '<label class="cmp-cat"><input type="checkbox" data-cmp-cat="functional" ' + (saved.categories.functional ? 'checked' : '') + ' /> ' + cxL('cmpFunctional') + '</label>',
    '<label class="cmp-cat"><input type="checkbox" data-cmp-cat="analytics" ' + (saved.categories.analytics ? 'checked' : '') + ' /> ' + cxL('cmpAnalytics') + '</label>',
    '<label class="cmp-cat"><input type="checkbox" data-cmp-cat="marketing" ' + (saved.categories.marketing ? 'checked' : '') + ' /> ' + cxL('cmpMarketing') + '</label>',
    '</div>',
    '<div class="cmp-actions">',
    '<button type="button" class="cmp-btn primary" data-cmp-accept>' + cxL('cmpAcceptAll') + '</button>',
    '<button type="button" class="cmp-btn" data-cmp-save-close>' + cxL('cmpSave') + '</button>',
    '</div></div>',
  ].join('')
  document.body.appendChild(el)
}

function cmpReadCats(root) {
  const cats = {}
  root.querySelectorAll('[data-cmp-cat]').forEach((input) => {
    cats[input.dataset.cmpCat] = input.checked
  })
  return cats
}

/* ---------------- X-Region 区域合规 + 年龄门槛（命令3.3/3.4） ---------------- */

async function cxLoadCompliance() {
  if (CX.compliance) return CX.compliance
  try {
    CX.compliance = await apiJson('/compliance/settings')
  } catch {
    CX.compliance = { country: null, region: null, cmp: { version: 'v1', banner: true, categories: { necessary: true } }, ageGate: { enabled: false } }
  }
  return CX.compliance
}

function cxRenderRegionBanner(region) {
  if (!region || region.block) return
  const notice = region.notice || {}
  const text = notice[state.lang] || notice.en || ''
  if (!text) return
  if (document.querySelector('.cx-region-banner')) return
  const el = document.createElement('div')
  el.className = 'cx-region-banner'
  el.innerHTML = '<div class="wrap"><span>' + esc(text) + '</span><span class="cx-resp">' + esc(region.responsible || '') + '</span></div>'
  document.body.appendChild(el)
}

function cxRenderAgeGate(gate) {
  if (!gate || !gate.enabled) return
  try { if (sessionStorage.getItem('mxq_age_ok') === '1') return } catch { /* 忽略 */ }
  const msg = gate.message || {}
  const text = msg[state.lang] || msg.en || 'Are you 18 or older?'
  const minAge = Number(gate.min_age) || 18
  const el = document.createElement('div')
  el.className = 'cmp-modal-mask age-gate'
  el.innerHTML = [
    '<div class="cmp-modal" role="dialog" aria-modal="true">',
    '<h3>' + cxL('ageTitle') + '</h3>',
    '<p>' + esc(text) + '</p>',
    '<div class="cmp-actions">',
    '<button type="button" class="cmp-btn primary" data-age-yes>' + cxL('ageYes') + '</button>',
    '<button type="button" class="cmp-btn" data-age-no>' + cxL('ageNo') + '</button>',
    '</div></div>',
  ].join('')
  document.body.appendChild(el)
}

function cxRenderBlockPage(region) {
  if (document.querySelector('.cx-block-page')) return
  const el = document.createElement('div')
  el.className = 'cx-block-page'
  el.innerHTML = [
    '<div class="cx-block-card">',
    '<h2>MXQ</h2>',
    '<p>' + cxL('regionBlocked') + '</p>',
    region && region.contact_email ? '<p><a href="mailto:' + esc(region.contact_email) + '">' + esc(region.contact_email) + '</a></p>' : '',
    '</div>',
  ].join('')
  document.body.appendChild(el)
  const app = document.getElementById('app')
  if (app) app.style.display = 'none'
}

/* ---------------- X-Trust 信任与安全展示（命令1.5） ---------------- */

async function cxLoadTrust() {
  if (CX.trust) return CX.trust
  try {
    const data = await apiJson('/trust/signals')
    CX.trust = Array.isArray(data.signals) ? data.signals : []
  } catch {
    CX.trust = []
  }
  return CX.trust
}

function cxSignalHtml(s) {
  const title = s.title ? (s.title[state.lang] || s.title.en || '') : ''
  const body = s.body ? (s.body[state.lang] || s.body.en || '') : ''
  const icons = {
    lock: '<path d="M6 10V8a6 6 0 1 1 12 0v2"/><rect x="4" y="10" width="16" height="10" rx="2"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.3"/><path d="M21 3v6h-6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    truck: '<path d="M1 6h13v10H1zM14 10h5l3 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    star: '<path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
  }
  const path = icons[s.icon] || icons.shield
  return [
    '<div class="trust-item">',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>',
    '<div><b>' + esc(title) + '</b>' + (body ? '<span>' + esc(body) + '</span>' : '') + '</div>',
    '</div>',
  ].join('')
}

async function mountTrustStrip() {
  const slot = document.getElementById('trust-strip')
  if (!slot) return
  const signals = await cxLoadTrust()
  if (!signals.length) return
  slot.innerHTML = '<div class="trust-strip-inner"><h3>' + cxL('trustTitle') + '</h3><div class="trust-grid">' +
    signals.slice(0, 6).map(cxSignalHtml).join('') + '</div></div>'
}

async function mountTrustMini() {
  const slot = document.querySelector('[data-trust-mini]:not([data-done])')
  if (!slot) return
  const signals = await cxLoadTrust()
  if (!signals.length) return
  slot.dataset.done = '1'
  slot.innerHTML = signals.slice(0, 3).map((s) => {
    const title = s.title ? (s.title[state.lang] || s.title.en || '') : ''
    return '<span class="trust-chip">' + esc(title) + '</span>'
  }).join('')
}

/* ---------------- X-Size 尺码助手（命令1.4） ---------------- */

const SIZE_ASSISTANT_BTN = [
  '<button type="button" class="size-guide-btn size-guide-btn-sm" data-size-assistant="1" aria-haspopup="dialog">',
  '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"',
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">',
  '<path d="M12 3v4M12 11v2M12 17v4M3 12h4M11 12h2M17 12h4"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
  '</svg><span>Size Assistant</span></button>',
].join('')

/** 启发式推荐：BMI + 身高映射到成人球衣尺码（S~3XL） */
function cxRecommendSize(heightCm, weightKg) {
  const bmi = weightKg / Math.pow(heightCm / 100, 2)
  let score = 0
  if (bmi < 18.5) score = -1
  else if (bmi < 24) score = 0
  else if (bmi < 28) score = 1
  else if (bmi < 32) score = 2
  else score = 3
  if (heightCm >= 195) score += 1
  else if (heightCm >= 188) score += 0.5
  else if (heightCm < 165) score -= 0.5
  const ladder = ['S', 'M', 'L', 'XL', '2XL', '3XL']
  const idx = Math.max(0, Math.min(ladder.length - 1, Math.round(score) + 1))
  return ladder[idx]
}

/* ==========================================================================
   X 尺码助手 v2：按商品真实尺码表推荐（2026-10-08）
   --------------------------------------------------------------------------
   【为什么重写】原 cxRecommendSize 用通用 BMI 公式返回固定阶梯
   ['S','M','L','XL','2XL','3XL']，完全不看商品自己的 attributes.size_chart。
   但库里真实尺码表长这样：
       ["Size", "40 (M)", "44 (L)", "48 (XL)", ...]
       ["Chest (in)", "37.5 - 41", "41 - 44", ...]     ← 英寸 + 区间
       ["Waist (in)", "32 - 35", ...]
   商品可选项也是 '40 (M)' 这种字符串，于是 BMI 返回的 'M' 与可选项对不上，
   用户无法直接选择 —— 这会直接推高退换货率（尺码买错是球衣退货首因）。

   【本实现要点】
   1. 真实表全是**英寸 + 区间/分数**（'37.5 - 41'、'46 1/4'），必须解析区间。
   2. 球衣类尺码本质由**胸围**决定，而胸围与身高有稳定比例
      （成年人胸围 cm ≈ 身高 × 0.46），故用「等效身高区间」定位列，
      天然适配 Fanatics 的「40/44/48 数字码」与字母码两种表。
   3. 青少年款有两行 Size（Yth S + 数字），取第一行做候选。
   4. 表缺失/解析失败 → 退回原 BMI 兜底（行为不变，不劣化）。
   ========================================================================== */

/** 解析单元格：区间 '37.5 - 41' → [37.5,41]；分数 '46 1/4' → 46.25；纯数字 → [n,n] */
function scCellRange(v) {
  const raw = String(v ?? '').trim()
  if (!raw) return null
  // 分数：46 1/4 → 46.25
  const frac = /^(-?\d+(?:\.\d+)?)\s+(\d+)\s*\/\s*(\d+)$/.exec(raw)
  if (frac) {
    const den = Number(frac[3])
    if (den) {
      const n = Number(frac[1]) + Number(frac[2]) / den
      return [n, n]
    }
  }
  // 区间：37.5 - 41 / 35-37.5 / 155-165cm
  const range = /^(-?\d+(?:\.\d+)?)\s*(?:-|–|—|~|to)\s*(-?\d+(?:\.\d+)?)$/i.exec(raw)
  if (range) {
    const a = Number(range[1])
    const b = Number(range[2])
    return a <= b ? [a, b] : [b, a]
  }
  const one = /-?\d+(?:\.\d+)?/.exec(raw.replace(/,/g, ''))
  if (!one) return null
  const n = Number(one[0])
  return [n, n]
}

/** 解析尺码表 → { sizes, rowRanges(labelPattern) } */
function scParseChart(chart) {
  if (!Array.isArray(chart)) return null
  // 兼容三种形态：[{rows:[[..]]}] / 裸二维数组
  let rows = []
  const blocks = Array.isArray(chart[0]) ? [chart] : chart
  for (const blk of blocks) {
    const r = Array.isArray(blk) ? blk : (blk && Array.isArray(blk.rows) ? blk.rows : null)
    if (!r) continue
    for (const line of r) if (Array.isArray(line) && line.length > 1) rows.push(line)
  }
  if (!rows.length) return null

  // 表头行：第一列是尺码标签（青少年款有两行 Size，取第一行）
  let hi = -1
  for (let i = 0; i < Math.min(rows.length, 4); i += 1) {
    const first = String(rows[i][0] ?? '').trim().toLowerCase()
    if (/^(size|sizes|尺码)/.test(first)) { hi = i; break }
  }
  if (hi < 0) return null
  const sizes = rows[hi].slice(1).map((c) => String(c ?? '').trim()).filter(Boolean)
  if (!sizes.length) return null

  const rowRanges = (pattern) => {
    for (let i = 0; i < rows.length; i += 1) {
      if (i === hi) continue
      const label = String(rows[i][0] ?? '').trim().toLowerCase()
      if (pattern.test(label)) {
        const parsed = rows[i].slice(1).map((cell) => scCellRange(cell))
        if (parsed.some(Boolean)) return parsed
      }
    }
    return null
  }

  return { sizes, rowRanges }
}

/**
 * 按商品尺码表推荐。
 * @returns {{size:string, source:'chart'|'bmi', reason:string}}
 */
function cxRecommendSizeForChart(heightCm, weightKg, chart) {
  const bmiFallback = { size: cxRecommendSize(heightCm, weightKg), source: 'bmi', reason: 'bmi' }
  const parsed = scParseChart(chart)
  if (!parsed) return bmiFallback

  const { sizes, rowRanges } = parsed
  const chest = rowRanges(/chest|bust|胸围/)
  const waist = rowRanges(/waist|腰围/)
  const hRow = rowRanges(/height|身高/)
  const wRow = rowRanges(/weight|体重/)

  const h = Number(heightCm)
  const w = Number(weightKg)
  const bmi = w / Math.pow(h / 100, 2)

  // 【胸围目标】系数由 Fanatics 真实尺码表线性拟合（160/170/180/190/200cm 五点全部命中区间）：
  //   chest_inch = 0.255 × height_cm − 4.30   （斜率 0.255 in/cm，约合胸围/身高 ≈ 0.46）
  // 直接在「英寸」域计算，避免再乘除 2.54 引入误差。
  const bodyAdj = Math.min(0.05, Math.max(-0.03, (bmi - 22) / 120))
  const estChestInch = 0.255 * h - 4.3 + bodyAdj * 8
  // 腰围目标（inch）：腰围/身高 ≈ 0.40（含体型修正）
  const estWaistInch = 0.4 * h * (1 + Math.max(-0.05, Math.min(0.12, (bmi - 22) / 60)))

  // 目标值换算到表内单位：Fanatics 球衣表基本都是 inch（表内最大胸围 <=72）；
  // 少数表用 cm（最大胸围 >72），此时把 inch 目标× 2.54。
  const toTableUnit = (row, estInch, inchCeiling) => {
    if (!row) return null
    const maxV = Math.max(...row.filter(Boolean).map((r) => r[1]), 0)
    if (maxV <= 0) return null
    return maxV <= inchCeiling ? estInch : estInch * 2.54
  }
  const chestTarget = toTableUnit(chest, estChestInch, 72)
  const waistTarget = toTableUnit(waist, estWaistInch, 60)

  if (!chestTarget && !waistTarget && !hRow && !wRow) return bmiFallback

  // 区间命中度：目标落在该列区间内 → 0；否则按列宽比例惩罚（左右对称）
  const rangeHit = (range, target) => {
    if (!range || target === null) return null
    const [lo, hi] = range
    const width = Math.max(0.5, hi - lo)
    if (target >= lo && target <= hi) return 0
    return (target < lo ? lo - target : target - hi) / width
  }

  let best = -1
  let bestCost = Infinity
  let used = ''

  for (let i = 0; i < sizes.length; i += 1) {
    let cost = 0
    let hit = 0
    let why = ''

    if (wRow) {
      const c = rangeHit(wRow[i], w)
      if (c !== null) { cost += c * 3; hit += 1; why = why || 'weight' }
    }
    if (hRow) {
      const c = rangeHit(hRow[i], h)
      if (c !== null) { cost += c * 3; hit += 1; why = why || 'height' }
    }
    if (chestTarget !== null) {
      const c = rangeHit(chest[i], chestTarget)
      if (c !== null) { cost += c * 2.5; hit += 1; why = why || 'chest' }
    }
    // 腰围仅在前三项都没覆盖到该列时参与（部分表只有腰围可用）
    if (hit === 0 && waistTarget !== null) {
      const c = rangeHit(waist[i], waistTarget)
      if (c !== null) { cost += c * 1; hit += 1; why = 'waist' }
    }
    if (hit === 0) continue

    if (cost < bestCost) { bestCost = cost; best = i; used = why }
  }

  const size = sizes[best]
  if (best < 0 || !size || bestCost === Infinity) return bmiFallback

  // bestCost <= 1.5 视为落在区间内或紧邻，可信；否则提示对比尺码表
  return {
    size,
    source: 'chart',
    reason: (used || 'chart') + (bestCost <= 1.5 ? '' : '|uncertain'),
  }
}

/** 取当前详情页商品的尺码表（复用已有接口），失败返回 null */
async function cxFetchSizeChart(pid) {
  const id = Number(pid)
  if (!Number.isInteger(id) || id <= 0) return null
  try {
    // apiJson 会自动补 /api/store 前缀，这里不能再写 /store（否则变成 /api/store/store → 404）
    const r = await apiJson('/size-chart?id=' + id)
    return r && (r.size_chart || r.chart) ? (r.size_chart || r.chart) : null
  } catch {
    return null
  }
}

function cxCurrentDetailPid() {
  const panel = document.getElementById('buy-panel')
  if (!panel) return null
  const pid = Number(panel.dataset.productId)
  return Number.isInteger(pid) && pid > 0 ? pid : null
}

function cxOpenSizeAssistant() {
  if (CX.sizeAssistOpen) return
  CX.sizeAssistOpen = true
  const pid = cxCurrentDetailPid()
  const steps = SIZE_MEASURE_STEPS[state.lang] || SIZE_MEASURE_STEPS.en
  const el = document.createElement('div')
  el.className = 'cmp-modal-mask size-assist'
  el.innerHTML = [
    '<div class="cmp-modal" role="dialog" aria-modal="true">',
    '<h3>' + cxL('sizeAssistTitle') + '</h3>',
    '<p class="sa-intro">' + cxL('sizeAssistIntro') + '</p>',
    '<div class="sa-row">',
    '<label>' + cxL('sizeHeight') + ' <input type="number" id="sa-height" min="120" max="230" placeholder="175" /> cm</label>',
    '<label>' + cxL('sizeWeight') + ' <input type="number" id="sa-weight" min="30" max="200" placeholder="70" /> kg</label>',
    '</div>',
    '<div class="sa-result" id="sa-result"></div>',
    '<button type="button" class="cmp-btn primary sa-go" data-sa-go data-pid="' + esc(String(pid || '')) + '">' + cxL('sizeRecommend') + '</button>',
    '<div class="sa-measure"><b>' + cxL('sizeMeasureTitle') + '</b><ol>' + steps.map((s) => '<li>' + esc(s) + '</li>').join('') + '</ol></div>',
    '<div class="sa-fit" id="sa-fit" hidden>',
    '<span>' + cxL('sizeFitQ') + '</span>',
    '<button type="button" class="cmp-btn ghost" data-sa-fit="too_small">' + cxL('sizeFitSmall') + '</button>',
    '<button type="button" class="cmp-btn ghost" data-sa-fit="fit">' + cxL('sizeFitOk') + '</button>',
    '<button type="button" class="cmp-btn ghost" data-sa-fit="too_big">' + cxL('sizeFitBig') + '</button>',
    '</div>',
    '<button type="button" class="cmp-close" data-cx-close aria-label="Close">✕</button>',
    '</div>',
  ].join('')
  document.body.appendChild(el)
}

/**
 * 尺码推荐主流程（从 click handler 拆出来，因为它需要 await 拉尺码表，
 * 而外层 document click 监听是同步的）。
 * 先用通用 BMI 立即给反馈，再用商品真实尺码表精算并覆盖 —— 表内可能只有
 * 40/44/48 这类数字码，通用 BMI 返回的 S/M/L 用户根本选不了。
 */
async function cxSizeRecommendRun(target) {
  const hEl = document.getElementById('sa-height')
  const wEl = document.getElementById('sa-weight')
  const slot = document.getElementById('sa-result')
  const fitSlot = document.getElementById('sa-fit')
  const height = hEl ? Number(hEl.value) : NaN
  const weight = wEl ? Number(wEl.value) : NaN
  if (!slot) return
  if (!Number.isFinite(height) || !Number.isFinite(weight) || height < 120 || height > 230 || weight < 30 || weight > 200) {
    slot.textContent = 'Please enter valid height (120-230cm) & weight (30-200kg).'
    return
  }
  const goBtn = target.closest('[data-sa-go]')
  const pid = goBtn && goBtn.dataset.pid ? Number(goBtn.dataset.pid) : null

  // 1) 即时反馈（不等待网络）
  slot.innerHTML = '<b>' + cxL('sizeResult') + ': <span class="sa-size">' + esc(cxRecommendSize(height, weight)) + '</span></b>'

  // 2) 拉该商品真实尺码表精算（失败自动留在BMI 结果上）
  let chart = null
  try {
    chart = await cxFetchSizeChart(pid)
  } catch { chart = null }
  const rec = cxRecommendSizeForChart(height, weight, chart)
  const note = rec.source === 'chart'
    ? (rec.reason.indexOf('uncertain') >= 0 ? ' · closest match, compare chart' : ' · from size chart')
    : ''
  slot.innerHTML = '<b>' + cxL('sizeResult') + ': <span class="sa-size">' + esc(rec.size) + '</span></b>'
    + (note ? '<span class="sa-note">' + esc(note) + '</span>' : '')
  if (fitSlot) fitSlot.hidden = false
  cxLogSizeReco({ productId: pid, heightCm: height, weightKg: weight, recSize: rec.size })
  try { sessionStorage.setItem('mxq_last_size_reco', rec.size) } catch { /* 忽略 */ }
}

function cxLogSizeReco(payload) {
  apiJson('/size-reco', { method: 'POST', body: payload }).catch(() => {})
}

/* ---------------- X-Chat 在线客服与工单（命令1.1） ---------------- */

const CX_TICKET_KEY = 'mxq_chat_ticket'

function cxChatRestore() {
  try {
    const raw = sessionStorage.getItem(CX_TICKET_KEY)
    if (!raw) return
    const data = JSON.parse(raw)
    if (data && data.ticketNo && data.email) {
      CX.chat.ticketNo = data.ticketNo
      CX.chat.email = data.email
    }
  } catch { /* 忽略 */ }
}

function cxChatStore() {
  try {
    sessionStorage.setItem(CX_TICKET_KEY, JSON.stringify({ ticketNo: CX.chat.ticketNo, email: CX.chat.email }))
  } catch { /* 忽略 */ }
}

function cxToggleChat(force) {
  CX.chat.open = typeof force === 'boolean' ? force : !CX.chat.open
  let panel = document.querySelector('.cx-chat')
  if (!CX.chat.open) {
    if (panel) panel.remove()
    return
  }
  // 与 AI 客服窗互斥，避免两个窗叠在一起
  const aiPanel = document.querySelector('.cx-ai-chat')
  if (aiPanel) { aiPanel.remove(); CX.ai.open = false }
  if (panel) return
  cxChatRestore()
  panel = document.createElement('div')
  panel.className = 'cx-chat'
  panel.setAttribute('role', 'dialog')
  panel.innerHTML = [
    '<div class="cx-chat-head">',
    '<div><b>' + cxL('chatTitle') + '</b><span id="cx-chat-status">' + cxL('chatSub') + '</span></div>',
    '<button type="button" class="cmp-close" data-cx-close aria-label="Close">✕</button>',
    '</div>',
    '<div class="cx-chat-body" id="cx-chat-body"></div>',
    '<div class="cx-chat-faq" id="cx-chat-faq"></div>',
    '<div class="cx-chat-foot" id="cx-chat-foot"></div>',
  ].join('')
  document.body.appendChild(panel)
  cxChatRenderBody()
  cxChatRenderFooter()
  void cxChatLoadStatus()
  // 实时轮询：客服回复 6 秒内推给访客（面板关闭时清除）
  if (CX.chat.pollTimer) clearInterval(CX.chat.pollTimer)
  CX.chat.pollTimer = setInterval(() => {
    if (!CX.chat.open || !document.querySelector('.cx-chat')) {
      clearInterval(CX.chat.pollTimer)
      CX.chat.pollTimer = null
      return
    }
    if (CX.chat.ticketNo && CX.chat.email) void cxChatPoll()
  }, 6000)
}

async function cxChatLoadStatus() {
  const slot = document.getElementById('cx-chat-status')
  if (!slot) return
  try {
    const data = await apiJson('/support/status')
    if (!slot.isConnected) return
    if (data.onlineCount > 0) {
      slot.innerHTML = '<i class="cx-dot on"></i>' + cxL('chatAgentOnline') + ' (' + data.onlineCount + ')'
    } else {
      slot.innerHTML = '<i class="cx-dot"></i>' + cxL('chatAgentOffline')
    }
  } catch { /* 忽略 */ }
}

function cxChatRenderBody() {
  const body = document.getElementById('cx-chat-body')
  if (!body) return
  if (CX.chat.ticketNo && CX.chat.email) {
    body.innerHTML = '<div class="cx-thread" id="cx-thread"><div class="cx-loading">…</div></div>'
    void cxChatPoll()
  } else {
    body.innerHTML = [
      '<div class="cx-form">',
      '<p>' + cxL('chatSub') + '</p>',
      '<input id="cx-name" placeholder="' + cxL('chatName') + '" maxlength="40" />',
      '<input id="cx-email" type="email" placeholder="' + cxL('chatEmail') + '" maxlength="120" />',
      '<textarea id="cx-msg" rows="4" placeholder="' + cxL('chatPlaceholder') + '" maxlength="4000"></textarea>',
      '<button type="button" class="cmp-btn primary" id="cx-start">' + cxL('chatStart') + '</button>',
      '<div class="cx-error" id="cx-error"></div>',
      '</div>',
    ].join('')
    const start = document.getElementById('cx-start')
    if (start) start.addEventListener('click', () => void cxChatStart())
  }
}

function cxChatRenderFooter() {
  const foot = document.getElementById('cx-chat-foot')
  if (!foot) return
  if (CX.chat.ticketNo && CX.chat.email) {
    foot.innerHTML = [
      '<div class="cx-inputrow">',
      '<input id="cx-reply" placeholder="' + cxL('chatPlaceholder') + '" maxlength="4000" />',
      '<button type="button" class="cmp-btn primary" id="cx-send">' + cxL('chatSend') + '</button>',
      '</div>',
    ].join('')
    const send = document.getElementById('cx-send')
    if (send) send.addEventListener('click', () => void cxChatSendReply())
    const input = document.getElementById('cx-reply')
    if (input) {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') void cxChatSendReply()
      })
    }
  } else {
    foot.innerHTML = [
      '<div class="cx-faqrow">',
      '<input id="cx-faq-q" placeholder="FAQ…" maxlength="80" />',
      '<button type="button" class="cmp-btn ghost" id="cx-faq-go">FAQ</button>',
      '</div>',
    ].join('')
    const go = document.getElementById('cx-faq-go')
    if (go) go.addEventListener('click', () => void cxChatSearchFaq())
    const q = document.getElementById('cx-faq-q')
    if (q) {
      q.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') void cxChatSearchFaq()
      })
    }
  }
}

async function cxChatSearchFaq() {
  const slot = document.getElementById('cx-chat-faq')
  const input = document.getElementById('cx-faq-q')
  if (!slot || !input) return
  const q = input.value.trim()
  if (!q) return
  slot.innerHTML = '<div class="cx-loading">…</div>'
  try {
    const data = await apiJson('/support/faq?q=' + encodeURIComponent(q))
    const items = Array.isArray(data.items) ? data.items : []
    if (!items.length) {
      slot.innerHTML = ''
      return
    }
    slot.innerHTML = '<b>' + cxL('chatFaqHit') + '</b>' + items.map((item) => {
      const title = item.title ? (item.title[state.lang] || item.title.en || item.slug) : item.slug
      return '<a href="/help/' + esc(item.slug) + '" data-cx-link>' + esc(title) + '</a>'
    }).join('')
  } catch {
    slot.innerHTML = ''
  }
}

async function cxChatStart() {
  const nameEl = document.getElementById('cx-name')
  const emailEl = document.getElementById('cx-email')
  const msgEl = document.getElementById('cx-msg')
  const errSlot = document.getElementById('cx-error')
  const name = nameEl ? nameEl.value.trim() : ''
  const email = emailEl ? emailEl.value.trim() : ''
  const message = msgEl ? msgEl.value.trim() : ''
  if (errSlot) errSlot.textContent = ''
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
    if (errSlot) errSlot.textContent = cxL('chatEmail')
    return
  }
  if (message.length < 5) {
    if (errSlot) errSlot.textContent = cxL('chatPlaceholder')
    return
  }
  const start = document.getElementById('cx-start')
  if (start) start.disabled = true
  try {
    const data = await apiJson('/support/tickets', {
      method: 'POST',
      body: {
        name,
        email,
        message,
        subject: message.slice(0, 80),
        channel: 'chat',
        category: 'other',
        visitorId: cxVisitorId(),
      },
    })
    CX.chat.ticketNo = data.ticket_no
    CX.chat.email = email
    cxChatStore()
    cxChatRenderBody()
    cxChatRenderFooter()
  } catch (error) {
    if (errSlot) errSlot.textContent = String(error && error.message ? error.message : 'error').slice(0, 120)
  } finally {
    if (start) start.disabled = false
  }
}

async function cxChatSendReply() {
  const input = document.getElementById('cx-reply')
  if (!input || CX.chat.sending) return
  const text = input.value.trim()
  if (!text) return
  CX.chat.sending = true
  input.value = ''
  try {
    await apiJson('/support/tickets/' + encodeURIComponent(CX.chat.ticketNo) + '/messages', {
      method: 'POST',
      body: { email: CX.chat.email, body: text },
    })
    await cxChatPoll()
  } catch { /* 静默，下轮轮询 */ }
  CX.chat.sending = false
}

function cxMsgHtml(m) {
  const mine = m.sender === 'customer'
  const name = mine ? 'You' : (m.author_name || (m.sender === 'bot' ? 'MXQ Assistant' : 'Agent'))
  return [
    '<div class="cx-msg ' + (mine ? 'mine' : 'theirs') + '">',
    '<b>' + esc(String(name)) + '</b>',
    '<p>' + esc(String(m.body || '')).replace(/\n/g, '<br />') + '</p>',
    '<time>' + esc(String(m.created_at || '').slice(11, 16)) + '</time>',
    '</div>',
  ].join('')
}

async function cxChatPoll() {
  if (!CX.chat.ticketNo || !CX.chat.email) return
  try {
    const data = await apiJson('/support/tickets/' + encodeURIComponent(CX.chat.ticketNo) + '?email=' + encodeURIComponent(CX.chat.email))
    const thread = document.getElementById('cx-thread')
    if (thread) {
      const msgs = Array.isArray(data.messages) ? data.messages : []
      thread.innerHTML = msgs.map(cxMsgHtml).join('') || '<div class="cx-loading">…</div>'
      thread.scrollTop = thread.scrollHeight
    }
    const status = document.getElementById('cx-chat-status')
    if (status && data.ticket) {
      status.innerHTML = data.ticket.status === 'resolved' || data.ticket.status === 'closed'
        ? '<i class="cx-dot on"></i>' + cxL('chatResolved') + ' · ' + esc(data.ticket.ticket_no)
        : '<i class="cx-dot on"></i>' + cxL('chatPending') + ' · ' + esc(data.ticket.ticket_no)
    }
  } catch { /* 静默 */ }
}

/* ---------------- X-AI 智能客服窗 + WhatsApp Business 按钮 ---------------- */

function cxToggleAi(force) {
  CX.ai.open = typeof force === 'boolean' ? force : !CX.ai.open
  let panel = document.querySelector('.cx-ai-chat')
  if (!CX.ai.open) {
    if (panel) panel.remove()
    return
  }
  // 与在线客服窗互斥
  if (CX.chat.open) cxToggleChat(false)
  if (panel) return
  if (!CX.ai.msgs.length) CX.ai.msgs.push({ role: 'bot', text: cxL('aiHello') })
  panel = document.createElement('div')
  panel.className = 'cx-ai-chat'
  panel.setAttribute('role', 'dialog')
  panel.innerHTML = [
    '<div class="cx-chat-head">',
    '<div><b>' + cxL('aiTitle') + '</b><span><i class="cx-dot on"></i>' + cxL('aiSub') + '</span></div>',
    '<button type="button" class="cmp-close" data-cx-close aria-label="Close">✕</button>',
    '</div>',
    '<div class="cx-chat-body" id="cx-ai-body"></div>',
    '<div class="cx-chat-foot"><div class="cx-inputrow">',
    '<input id="cx-ai-input" placeholder="' + cxL('aiPlaceholder') + '" maxlength="500" />',
    '<button type="button" class="cmp-btn primary" id="cx-ai-send">' + cxL('chatSend') + '</button>',
    '</div></div>',
  ].join('')
  document.body.appendChild(panel)
  cxAiRender()
  const send = document.getElementById('cx-ai-send')
  const input = document.getElementById('cx-ai-input')
  if (send) send.addEventListener('click', () => void cxAiSend())
  if (input) {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') void cxAiSend()
    })
  }
}

function cxAiMsgHtml(m) {
  if (m.role === 'user') {
    return '<div class="cx-msg mine"><b>You</b><p>' + esc(String(m.text)).replace(/\n/g, '<br />') + '</p></div>'
  }
  let html = '<div class="cx-msg theirs"><b>MXQ AI</b><p>' + esc(String(m.text)).replace(/\n/g, '<br />') + '</p>'
  if (Array.isArray(m.links) && m.links.length) {
    html += '<div class="cx-ai-links">' + m.links.map((l) =>
      '<a href="/' + (l.type === 'policy' ? 'policies/' : 'help/') + esc(l.slug) + '" data-cx-link>' + esc(l.title) + '</a>'
    ).join('') + '</div>'
  }
  return html + '</div>'
}

function cxAiRender() {
  const body = document.getElementById('cx-ai-body')
  if (!body) return
  body.innerHTML = CX.ai.msgs.map(cxAiMsgHtml).join('')
  body.scrollTop = body.scrollHeight
}

async function cxAiSend() {
  const input = document.getElementById('cx-ai-input')
  if (!input || CX.ai.sending) return
  const text = input.value.trim()
  if (!text) return
  CX.ai.msgs.push({ role: 'user', text })
  CX.ai.msgs.push({ role: 'bot', text: cxL('aiThinking') })
  CX.ai.sending = true
  input.value = ''
  cxAiRender()
  try {
    const data = await apiJson('/ai/chat', { method: 'POST', body: { message: text, lang: state.lang } })
    CX.ai.msgs.pop()
    CX.ai.msgs.push({ role: 'bot', text: String(data.reply || cxL('aiFallback')), links: data.links })
  } catch {
    CX.ai.msgs.pop()
    CX.ai.msgs.push({ role: 'bot', text: cxL('aiFallback') })
  }
  CX.ai.sending = false
  cxAiRender()
}

async function cxFetchWaUrl() {
  if (CX.wa.url) return CX.wa.url
  let num = ''
  let welcome = ''
  try {
    const data = await apiJson('/contact/channels')
    num = String(data.whatsapp_number || '')
    welcome = String(data.whatsapp_welcome || '')
  } catch { /* 用默认文案 */ }
  const text = welcome || 'Hi MXQ! I have a question:'
  CX.wa.url = num
    ? 'https://wa.me/' + num + '?text=' + encodeURIComponent(text)
    : 'https://wa.me/?text=' + encodeURIComponent(text)
  return CX.wa.url
}

/* ---------------- X-Pages：帮助中心 / 政策 / 支持页 / 隐私自助 ---------------- */

/* ---- X 帮助中心 i18n 补齐（2026-10-08)----
 * 问题：文章 title/body 已补齐 70 语种，但界面文案仍是硬编码英文：
 *   1) HELP_CATS 的 6 个分类标签只有 en / zh-CN
 *   2) /help 的标题、按钮、空态、404 文案
 *   3) /support 的 Email / Self-service / Help Center & FAQ 卡片
 * 结果：日语/德语/阿语访客看到满屏英文。本块全部补上多语言。
 */

/** 帮助中心 6 个分类的多语言标签（key 必须与 help_articles.category 一致） */
const HELP_CATS = [
  {
    key: "size",
    label: {
      "en": "Size Guide",
      "pt-BR": "Guia de Tamanhos",
      "pt": "Guia de Tamanhos",
      "es": "Gu\u00eda de Tallas",
      "fr": "Guide des Tailles",
      "de": "Gr\u00f6\u00dfentabelle",
      "it": "Guida alle Taglie",
      "nl": "Maattabel",
      "ru": "\u0420\u0430\u0437\u043c\u0435\u0440\u043d\u0430\u044f \u0441\u0435\u0442\u043a\u0430",
      "uk": "\u0420\u043e\u0437\u043c\u0456\u0440\u043d\u0430 \u0441\u0456\u0442\u043a\u0430",
      "pl": "Tabela Rozmiar\u00f3w",
      "cs": "Tabulka Velikost\u00ed",
      "sk": "Tabu\u013eka Ve\u013ekost\u00ed",
      "hu": "M\u00e9rett\u00e1bl\u00e1zat",
      "ro": "Ghid de M\u0103rimi",
      "bg": "\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0441 \u0420\u0430\u0437\u043c\u0435\u0440\u0438",
      "el": "\u039f\u03b4\u03b7\u03b7\u03cc\u03c2 \u039c\u03b5\u03b3\u03b5\u03b8\u03ce\u03bd",
      "tr": "Beden Rehberi",
      "ar": "\u062f\u0644\u064a\u0644 \u0627\u0644\u0645\u0642\u0627\u0633\u0627\u062a",
      "he": "\u05de\u05d3\u05e8\u05d9\u05da \u05de\u05d9\u05d3\u05d5\u05ea",
      "fa": "\u0631\u0627\u0647\u0646\u0645\u0627\u06cc \u0633\u0627\u06cc\u0632",
      "hi": "\u0938\u093e\u0907\u091c\u093c \u0917\u093e\u0907\u0921",
      "bn": "\u09b8\u09be\u0987\u099c \u0997\u09be\u0987\u09a1",
      "ur": "\u0633\u0627\u0626\u0632 \u06af\u0627\u0626\u06cc\u0688",
      "th": "\u0e44\u0e01\u0e14\u0e4c\u0e44\u0e0b\u0e2a\u0e4c",
      "vi": "H\u01b0\u1edbng D\u1eabn K\u00edch Th\u01b0\u1edbc",
      "id": "Panduan Ukuran",
      "ms": "Panduan Saiz",
      "tl": "Gabay sa Sukat",
      "zh-CN": "\u5c3a\u7801\u6307\u5357",
      "zh-TW": "\u5c3a\u78bc\u6307\u5357",
      "ja": "\u30b5\u30a4\u30ba\u30ac\u30a4\u30c9",
      "ko": "\uc0ac\uc774\uc988 \uac00\uc774\ub4dc",
      "mn": "\u0425\u044d\u043c\u0436\u044d\u044d\u043d\u0438\u0439 \u0425\u04af\u0441\u043d\u044d\u0433\u0442",
      "kk": "\u04e8\u043b\u0448\u0435\u043c \u041a\u0435\u0441\u0442\u0435\u0441\u0456",
      "uz": "O'lcham Qo'llanmasi",
      "km": "\u1798\u1782\u17d2\u1782\u17bb\u1791\u17d2\u1791\u17c1\u179f\u1780\u17cd\u1791\u17c6\u17a0\u17c6",
      "lo": "\u0e84\u0eb9\u0ec8\u0ea1\u0eb7\u0e82\u0eb0\u0edc\u0eb2\u0e94",
      "my": "\u1021\u101b\u103d\u101a\u103a\u1021\u1005\u102c\u1038 \u101c\u1019\u103a\u1038\u100a\u103d\u103e\u1014\u103a",
      "ne": "\u0938\u093e\u0907\u091c \u0917\u093e\u0907\u0921",
      "si": "\u0db4\u0dca\u200d\u0dbb\u0db8\u0dcf\u0dab \u0db8\u0dcf\u0dbb\u0dca\u0d9c\u0ddd\u0db4\u0daf\u0dda\u0dc1\u0dba",
      "ta": "\u0b85\u0bb3\u0bb5\u0bc1 \u0bb5\u0bb4\u0bbf\u0b95\u0bbe\u0b9f\u0bcd\u0b9f\u0bbf",
      "te": "\u0c38\u0c48\u0c1c\u0c4d \u0c17\u0c48\u0c21\u0c4d",
      "mr": "\u0906\u0915\u093e\u0930 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0915",
      "gu": "\u0ab8\u0abe\u0a87\u0a9d \u0a97\u0abe\u0a87\u0aa1",
      "kn": "\u0c97\u0cbe\u0ca4\u0ccd\u0cb0 \u0cae\u0cbe\u0cb0\u0ccd\u0c97\u0ca6\u0cb0\u0ccd\u0cb6\u0cbf",
      "sw": "Mwongozo wa Vipimo",
      "am": "\u12e8\u1218\u1320\u1295 \u121d\u12ad\u122d",
      "ha": "Jagorar Girma",
      "yo": "It\u1ecds\u1ecdna Iw\u1ecdn",
      "ig": "Ntuziaka Nha",
      "af": "Grootte Gids",
      "zu": "Umhlahlandlela Wosayizi",
      "xh": "Isikhokelo Sezayizi",
      "sv": "Storleksguide",
      "da": "St\u00f8rrelsesguide",
      "no": "St\u00f8rrelsesguide",
      "fi": "Kokotaulukko",
      "et": "Suunav Tabel",
      "lv": "Izm\u0113ru Tabula",
      "lt": "Dyd\u017ei\u0173 Lentel\u0117",
      "hr": "Vodi\u010d za Veli\u010dine",
      "sr": "\u0412\u043e\u0434\u0438\u0447 \u0437\u0430 \u0412\u0435\u043b\u0438\u0447\u0438\u043d\u0435",
      "sl": "Vodnik po Velikostih",
      "sq": "Udh\u00ebzues i Madh\u00ebsive",
      "mk": "\u0412\u043e\u0434\u0438\u0447 \u0437\u0430 \u0413\u043e\u043b\u0435\u043c\u0438\u043d\u0438",
      "bs": "Vodi\u010d za Veli\u010dine",
      "ka": "\u10d6\u10dd\u10db\u10d4\u10d1\u10d8\u10e1 \u10ea\u10ee\u10e0\u10d8\u10da\u10d8",
      "hy": "\u0549\u0561\u0583\u057d\u0565\u0580\u056b \u0548\u0582\u0572\u0565\u0581\u0578\u0582\u0575\u0581",
      "az": "\u00d6l\u00e7\u00fc T\u0259limat\u0131"
    },
  },
  {
    key: "shipping",
    label: {
      "en": "Shipping & Delivery",
      "pt-BR": "Envio e Entrega",
      "pt": "Envio e Entrega",
      "es": "Env\u00edo y Entrega",
      "fr": "Exp\u00e9dition et Livraison",
      "de": "Versand und Lieferung",
      "it": "Spedizione e Consegna",
      "nl": "Verzending en Bezorging",
      "ru": "\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0438 \u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430",
      "uk": "\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0442\u0430 \u0412\u0456\u0434\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u044f",
      "pl": "Wysy\u0142ka i Dostawa",
      "cs": "Doprava a Doru\u010den\u00ed",
      "sk": "Doprava a Doru\u010denie",
      "hu": "Sz\u00e1ll\u00edt\u00e1s \u00e9s Kisz\u00e1ll\u00edt\u00e1s",
      "ro": "Livrare \u0219i Expediere",
      "bg": "\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0438 \u0418\u0437\u043f\u0440\u0430\u0449\u0430\u043d\u0435",
      "el": "\u0391\u03c0\u03bf\u03c3\u03c4\u03bf\u03bb\u03ae \u03ba\u03b1\u03b9 \u03a0\u03b1\u03c1\u03ac\u03b4\u03bf\u03c3\u03b7",
      "tr": "Kargo ve Teslimat",
      "ar": "\u0627\u0644\u0634\u062d\u0646 \u0648\u0627\u0644\u062a\u0648\u0635\u064a\u0644",
      "he": "\u05de\u05e9\u05dc\u05d5\u05d7 \u05d5\u05de\u05e1\u05d9\u05e8\u05d4",
      "fa": "\u0627\u0631\u0633\u0627\u0644 \u0648 \u062a\u062d\u0648\u06cc\u0644",
      "hi": "\u0936\u093f\u092a\u093f\u0902\u0917 \u0914\u0930 \u0921\u093f\u0932\u0940\u0935\u0930\u0940",
      "bn": "\u09b6\u09bf\u09aa\u09bf\u0982 \u098f\u09ac\u0982 \u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf",
      "ur": "\u0634\u067e\u0646\u06af \u0627\u0648\u0631 \u0688\u06cc\u0644\u06cc\u0648\u0631\u06cc",
      "th": "\u0e01\u0e32\u0e23\u0e08\u0e31\u0e14\u0e2a\u0e48\u0e07\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e2a\u0e48\u0e07\u0e21\u0e2d\u0e1a",
      "vi": "V\u1eadn Chuy\u1ec3n v\u00e0 Giao H\u00e0ng",
      "id": "Pengiriman dan Pengantaran",
      "ms": "Penghantaran dan Penyerahan",
      "tl": "Pagpapadala at Paghahatid",
      "zh-CN": "\u914d\u9001\u4e0e\u4ea4\u4ed8",
      "zh-TW": "\u914d\u9001\u8207\u4ea4\u4ed8",
      "ja": "\u914d\u9001\u3068\u304a\u5c4a\u3051",
      "ko": "\ubc30\uc1a1 \ubc0f \ubc30\ub2ec",
      "mn": "\u0425\u04af\u0440\u0433\u044d\u043b\u0442 \u0431\u0430 \u0425\u04af\u0440\u0433\u044d\u0445",
      "kk": "\u0416\u0435\u0442\u043a\u0456\u0437\u0443 \u0436\u04d9\u043d\u0435 \u0422\u0430\u0441\u044b\u043c\u0430\u043b\u0434\u0430\u0443",
      "uz": "Yetkazib Berish va Jo'natish",
      "km": "\u1780\u17b6\u179a\u178a\u17b9\u1780\u1787\u1789\u17d2\u1787\u17bc\u1793\u1793\u17b7\u1784\u1780\u17b6\u179a\u1794\u17d2\u179a\u1782\u179b\u17cb",
      "lo": "\u0e81\u0eb2\u0e99\u0e82\u0ebb\u0e99\u0eaa\u0ebb\u0ec8\u0e87\u0ec1\u0ea5\u0eb0\u0e81\u0eb2\u0e99\u0eaa\u0ebb\u0ec8\u0e87\u0ea1\u0ead\u0e9a",
      "my": "\u1015\u102d\u102f\u1037\u1006\u1031\u102c\u1004\u103a\u101b\u1031\u1038\u1014\u103e\u1004\u1037\u103a \u1015\u1031\u1038\u1015\u102d\u102f\u1037\u1019\u103e\u102f",
      "ne": "\u0936\u093f\u092a\u093f\u0919 \u0930 \u0921\u0947\u0932\u093f\u092d\u0930\u0940",
      "si": "\u0dba\u0dd0\u0dc0\u0dd3\u0db8 \u0dc3\u0dc4 \u0db6\u0dd9\u0daf\u0dcf\u0dc4\u0dd0\u0dbb\u0dd3\u0db8",
      "ta": "\u0bb7\u0bbf\u0baa\u0bcd\u0baa\u0bbf\u0b99\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0b9f\u0bc6\u0bb2\u0bbf\u0bb5\u0bb0\u0bbf",
      "te": "\u0c37\u0c3f\u0c2a\u0c4d\u0c2a\u0c3f\u0c02\u0c17\u0c4d \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c21\u0c46\u0c32\u0c3f\u0c35\u0c30\u0c40",
      "mr": "\u0936\u093f\u092a\u093f\u0902\u0917 \u0906\u0923\u093f \u0921\u093f\u0932\u093f\u0935\u094d\u0939\u0930\u0940",
      "gu": "\u0ab6\u0abf\u0aaa\u0abf\u0a82\u0a97 \u0a85\u0aa8\u0ac7 \u0aa1\u0abf\u0ab2\u0abf\u0ab5\u0ab0\u0ac0",
      "kn": "\u0cb6\u0cbf\u0caa\u0ccd\u0caa\u0cbf\u0c82\u0c97\u0ccd \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0ca1\u0cc6\u0cb2\u0cbf\u0cb5\u0cb0\u0cbf",
      "sw": "Usafirishaji na Utoaji",
      "am": "\u1218\u120b\u12aa\u12eb\u1293 \u121b\u12f5\u1228\u123b",
      "ha": "Jigilarwa da Isarwa",
      "yo": "Gbigbe ati Ifiji\u1e63\u1eb9",
      "ig": "Nnyefe na Nnyefeka",
      "af": "Vervoer en Aflewering",
      "zu": "Ukuthunyelwa nokulethwa",
      "xh": "Ukuthunyelwa nokuhanjiswa",
      "sv": "Frakt och Leverans",
      "da": "Forsendelse og Levering",
      "no": "Frakt og Levering",
      "fi": "Toimitus ja Kuljetus",
      "et": "Tarne ja K\u00e4ttetoimetamine",
      "lv": "Pieg\u0101de un Iznieg\u0161ana",
      "lt": "Siuntimas ir Pristatymas",
      "hr": "Dostava i Isporuka",
      "sr": "\u0418\u0441\u043f\u043e\u0440\u0443\u043a\u0430 \u0438 \u0414\u043e\u0441\u0442\u0430\u0432\u0430",
      "sl": "Po\u0161iljanje in Dostava",
      "sq": "D\u00ebrgesa dhe Dor\u00ebzimi",
      "mk": "\u0418\u0441\u043f\u043e\u0440\u0430\u043a\u0430 \u0438 \u0414\u043e\u0441\u0442\u0430\u0432\u0430",
      "bs": "Dostava i Isporuka",
      "ka": "\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0 \u10d3\u10d0 \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0",
      "hy": "\u0531\u057c\u0561\u0584\u0578\u0582\u0574 \u0587 \u0544\u0561\u057f\u0561\u056f\u0561\u0580\u0561\u0580\u0578\u0582\u0574",
      "az": "\u00c7atd\u0131r\u0131lma v\u0259 T\u0259slimat"
    },
  },
  {
    key: "returns",
    label: {
      "en": "Returns & Refunds",
      "pt-BR": "Devolu\u00e7\u00f5es e Reembolsos",
      "pt": "Devolu\u00e7\u00f5es e Reembolsos",
      "es": "Devoluciones y Reembolsos",
      "fr": "Retours et Remboursements",
      "de": "R\u00fccksendungen und Erstattungen",
      "it": "Resi e Rimborsi",
      "nl": "Retouren en Terugbetalingen",
      "ru": "\u0412\u043e\u0437\u0432\u0440\u0430\u0442\u044b \u0438 \u0412\u043e\u0437\u043c\u0435\u0449\u0435\u043d\u0438\u044f",
      "uk": "\u041f\u043e\u0432\u0435\u0440\u043d\u0435\u043d\u043d\u044f \u0442\u0430 \u0412\u0456\u0434\u0448\u043a\u043e\u0434\u0443\u0432\u0430\u043d\u043d\u044f",
      "pl": "Zwroty i Refundacje",
      "cs": "Vr\u00e1cen\u00ed a Vr\u00e1cen\u00ed Pen\u011bz",
      "sk": "Vr\u00e1tenie a Vr\u00e1tenie Pe\u0148az\u00ed",
      "hu": "Visszak\u00fcld\u00e9sek \u00e9s Visszat\u00e9r\u00edt\u00e9sek",
      "ro": "Retururi \u0219i Ramburs\u0103ri",
      "bg": "\u0412\u0440\u044a\u0449\u0430\u043d\u0438\u044f \u0438 \u0412\u044a\u0437\u0441\u0442\u0430\u043d\u043e\u0432\u044f\u0432\u0430\u043d\u0438\u044f",
      "el": "\u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ad\u03c2 \u03ba\u03b1\u03b9 \u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ad\u03c2 \u03a7\u03c1\u03b7\u03bc\u03ac\u03c4\u03c9\u03bd",
      "tr": "\u0130adeler ve Geri \u00d6demeler",
      "ar": "\u0627\u0644\u0645\u0631\u062a\u062c\u0639\u0627\u062a \u0648\u0627\u0644\u0645\u0628\u0627\u0644\u063a \u0627\u0644\u0645\u0633\u062a\u0631\u062f\u0629",
      "he": "\u05d4\u05d7\u05d6\u05e8\u05d5\u05ea \u05d5\u05d6\u05d9\u05db\u05d5\u05d9\u05d9\u05dd",
      "fa": "\u0645\u0631\u062c\u0648\u0639\u06cc \u0648 \u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0648\u062c\u0647",
      "hi": "\u0930\u093f\u091f\u0930\u094d\u0928 \u0914\u0930 \u0930\u093f\u092b\u0902\u0921",
      "bn": "\u09b0\u09bf\u099f\u09be\u09b0\u09cd\u09a8 \u098f\u09ac\u0982 \u09b0\u09bf\u09ab\u09be\u09a8\u09cd\u09a1",
      "ur": "\u0648\u0627\u067e\u0633\u06cc \u0627\u0648\u0631 \u0631\u06cc\u0641\u0646\u0688",
      "th": "\u0e01\u0e32\u0e23\u0e04\u0e37\u0e19\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e04\u0e37\u0e19\u0e40\u0e07\u0e34\u0e19",
      "vi": "Ho\u00e0n Tr\u1ea3 v\u00e0 Ho\u00e0n Ti\u1ec1n",
      "id": "Pengembalian dan Pengembalian Dana",
      "ms": "Pemulangan dan Bayaran Balik",
      "tl": "Pagbalik at Refund",
      "zh-CN": "\u9000\u8d27\u4e0e\u9000\u6b3e",
      "zh-TW": "\u9000\u8ca8\u8207\u9000\u6b3e",
      "ja": "\u8fd4\u54c1\u30fb\u8fd4\u91d1",
      "ko": "\ubc18\ud488 \ubc0f \ud658\ubd88",
      "mn": "\u0411\u0443\u0446\u0430\u0430\u043b\u0442 \u0431\u0430 \u0411\u0443\u0446\u0430\u0430\u043d \u0422\u04e9\u043b\u04e9\u043b\u0442",
      "kk": "\u049a\u0430\u0439\u0442\u0430\u0440\u0443 \u0436\u04d9\u043d\u0435 \u049a\u0430\u0439\u0442\u0430\u0440\u044b\u043c",
      "uz": "Qaytarish va Qaytariladigan Pul",
      "km": "\u1780\u17b6\u179a\u178f\u17d2\u179a\u17a1\u1794\u17cb\u1791\u17c6\u1793\u17b7\u1789\u1793\u17b7\u1784\u1780\u17b6\u179a\u179f\u1784\u1794\u17d2\u179a\u17b6\u1780\u17cb",
      "lo": "\u0e81\u0eb2\u0e99\u0eaa\u0ebb\u0ec8\u0e87\u0e84\u0eb7\u0e99\u0ec1\u0ea5\u0eb0\u0e81\u0eb2\u0e99\u0e84\u0eb7\u0e99\u0ec0\u0e87\u0eb5\u0e99",
      "my": "\u1015\u103c\u1014\u103a\u101c\u100a\u103a\u101b\u101a\u1030\u1019\u103e\u102f\u1014\u103e\u1004\u1037\u103a \u1004\u103d\u1031\u1015\u103c\u1014\u103a\u1021\u1019\u103a\u1038",
      "ne": "\u092b\u093f\u0930\u094d\u0924\u093e \u0930 \u0930\u093f\u092b\u0928\u094d\u0921",
      "si": "\u0d86\u0db4\u0dc3\u0dd4 \u0dbd\u0dd0\u0db6\u0dd3\u0db8\u0dca \u0dc3\u0dc4 \u0d86\u0db4\u0dc3\u0dd4 \u0d9c\u0dd9\u0dc0\u0dd3\u0db8\u0dca",
      "ta": "\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0baa\u0bcd \u0baa\u0bc6\u0bb1\u0bc1\u0ba4\u0bb2\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0bb5\u0bb4\u0b99\u0bcd\u0b95\u0bc1\u0ba4\u0bb2\u0bcd",
      "te": "\u0c30\u0c3f\u0c1f\u0c30\u0c4d\u0c28\u0c41\u0c32\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c30\u0c40\u0c2b\u0c02\u0c21\u0c4d\u0c32\u0c41",
      "mr": "\u092a\u0930\u0924\u093e\u0935\u093e \u0906\u0923\u093f \u0930\u093f\u092b\u0902\u0921",
      "gu": "\u0ab0\u0abf\u0a9f\u0ab0\u0acd\u0aa8 \u0a85\u0aa8\u0ac7 \u0ab0\u0abf\u0aab\u0a82\u0aa1",
      "kn": "\u0cae\u0cb0\u0cb3\u0cbf \u0caa\u0ca1\u0cc6\u0caf\u0cc1\u0cb5\u0cbf\u0c95\u0cc6 \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0cae\u0cb0\u0cc1\u0caa\u0cbe\u0cb5\u0ca4\u0cbf",
      "sw": "Marudisho na Mabililio",
      "am": "\u121d\u120b\u123e\u127d\u1293 \u1218\u1218\u1208\u123b\u12ce\u127d",
      "ha": "Mayar da ku\u0257i",
      "yo": "Ipadab\u1ecd ati Owo Pada",
      "ig": "Ntughari na Nkw\u1ee5ghachi",
      "af": "Terugsendings en Terugbetalings",
      "zu": "Ukubuyisela nemali e-Buyiselwe",
      "xh": "Ukubuyiswa kunye neMbuyekezo",
      "sv": "Returer och \u00c5terbetalningar",
      "da": "Retur og Refundering",
      "no": "Returer og Refusjoner",
      "fi": "Palautukset ja Hyvitykset",
      "et": "Tagastused ja Tagasimaksed",
      "lv": "Atgrie\u0161anas un atmaksas",
      "lt": "Gr\u0105\u017einimai ir Pinig\u0173 Gr\u0105\u017einimas",
      "hr": "Povrati i Povrati Novca",
      "sr": "\u041f\u043e\u0432\u0440\u0430\u045b\u0430\u0458\u0438 \u0438 \u041f\u043e\u0432\u0440\u0430\u045b\u0430\u0458 \u041d\u043e\u0432\u0446\u0430",
      "sl": "Vra\u010dila in Povra\u010dila",
      "sq": "Kthimet dhe Rimbursimet",
      "mk": "\u0412\u0440\u0430\u0442\u043a\u0438 \u0438 \u041f\u043e\u0432\u0440\u0430\u0442 \u043d\u0430 \u041f\u0430\u0440\u0438",
      "bs": "Povrati i Povrati Novca",
      "ka": "\u10d3\u10d0\u10d1\u10e0\u10e3\u10dc\u10d4\u10d1\u10d4\u10d1\u10d8 \u10d3\u10d0 \u10d7\u10d0\u10dc\u10ee\u10d8\u10e1 \u10d3\u10d0\u10d1\u10e0\u10e3\u10dc\u10d4\u10d1\u10d0",
      "hy": "\u054e\u0565\u0580\u0561\u0564\u0561\u0580\u0571\u0565\u0580 \u0587 \u054e\u0565\u0580\u0561\u0564\u0561\u0580\u0571\u0578\u0582\u0574\u0576\u0565\u0580",
      "az": "Qaytar malar v\u0259 Geri \u00d6d\u0259ni\u015fl\u0259r"
    },
  },
  {
    key: "payment",
    label: {
      "en": "Payment",
      "pt-BR": "Pagamento",
      "pt": "Pagamento",
      "es": "Pago",
      "fr": "Paiement",
      "de": "Zahlung",
      "it": "Account",
      "nl": "Betaling",
      "ru": "\u041e\u043f\u043b\u0430\u0442\u0430",
      "uk": "\u041e\u043f\u043b\u0430\u0442\u0430",
      "pl": "P\u0142atno\u015b\u0107",
      "cs": "Platba",
      "sk": "Platba",
      "hu": "Fizet\u00e9s",
      "ro": "Plat\u0103",
      "bg": "\u041f\u043b\u0430\u0449\u0430\u043d\u0435",
      "el": "\u03a0\u03bb\u03b7\u03c1\u03c9\u03bc\u03ae",
      "tr": "\u00d6deme",
      "ar": "\u0627\u0644\u062f\u0641\u0639",
      "he": "\u05ea\u05e9\u05dc\u05d5\u05dd",
      "fa": "\u067e\u0631\u062f\u0627\u062e\u062a",
      "hi": "\u092d\u0941\u0917\u0924\u093e\u0928",
      "bn": "\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f",
      "ur": "\u0627\u062f\u0627\u0626\u06cc\u06af\u06cc",
      "th": "\u0e01\u0e32\u0e23\u0e0a\u0e33\u0e23\u0e30\u0e40\u0e07\u0e34\u0e19",
      "vi": "Thanh To\u00e1n",
      "id": "Pembayaran",
      "ms": "Pembayaran",
      "tl": "Bayad",
      "zh-CN": "\u652f\u4ed8",
      "zh-TW": "\u652f\u4ed8",
      "ja": "\u304a\u652f\u6255\u3044",
      "ko": "\uacb0\uc81c",
      "mn": "\u0422\u04e9\u043b\u0431\u04e9\u0440",
      "kk": "\u0422\u04e9\u043b\u0435\u043c",
      "uz": "To'lov",
      "km": "\u1780\u17b6\u179a\u1791\u17bc\u1791\u17b6\u178f\u17cb",
      "lo": "\u0e81\u0eb2\u0e99\u0e88\u0ec8\u0eb2\u0e8d\u0ec0\u0e87\u0eb5\u0e99",
      "my": "\u1004\u103d\u1031\u1015\u1031\u1038\u1001\u103c\u1004\u103a\u1038",
      "ne": "\u092d\u0941\u0915\u094d\u0924\u093e\u0928\u0940",
      "si": "\u0d9c\u0dd9\u0dc0\u0dd3\u0db8",
      "ta": "\u0b95\u0b9f\u0bcd\u0b9f\u0ba3\u0bae\u0bcd",
      "te": "\u0c1a\u0c46\u0c32\u0c4d\u0c32\u0c3f\u0c02\u0c2a\u0c41",
      "mr": "\u092a\u0947\u092e\u0947\u0902\u091f",
      "gu": "\u0a9a\u0ac1\u0a95\u0ab5\u0aa3\u0ac0",
      "kn": "\u0caa\u0cbe\u0cb5\u0ca4\u0cbf",
      "sw": "Malipo",
      "am": "\u12ad\u134d\u12eb",
      "ha": "Biyan ku\u0257i",
      "yo": "Sisanwo",
      "ig": "\u1eccgw\u1ee5gw\u1ecd",
      "af": "Betaling",
      "zu": "Inkokhelo",
      "xh": "Intlawulo",
      "sv": "Betalning",
      "da": "Betaling",
      "no": "Betaling",
      "fi": "Maksu",
      "et": "Makse",
      "lv": "Maks\u0101jums",
      "lt": "Mok\u0117jimas",
      "hr": "Pla\u0107anje",
      "sr": "\u041f\u043b\u0430\u045b\u0430\u045a\u0435",
      "sl": "Pla\u010dilo",
      "sq": "Pagesa",
      "mk": "\u041f\u043b\u0430\u045c\u0430\u045a\u0435",
      "bs": "Pla\u0107anje",
      "ka": "\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d0",
      "hy": "\u054e\u0573\u0561\u0580\u0578\u0582\u0574",
      "az": "\u00d6d\u0259ni\u015f"
    },
  },
  {
    key: "account",
    label: {
      "en": "Account",
      "pt-BR": "Conta",
      "pt": "Conta",
      "es": "Cuenta",
      "fr": "Compte",
      "de": "Konto",
      "it": "Account",
      "nl": "Account",
      "ru": "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
      "uk": "\u0410\u043a\u0430\u0443\u043d\u0442",
      "pl": "Konto",
      "cs": "\u00da\u010det",
      "sk": "\u00da\u010det",
      "hu": "Fi\u00f3k",
      "ro": "Cont",
      "bg": "\u0410\u043a\u0430\u0443\u043d\u0442",
      "el": "\u039b\u03bf\u03b3\u03b1\u03c1\u03b9\u03b1\u03c3\u03bc\u03cc\u03c2",
      "tr": "Hesap",
      "ar": "\u0627\u0644\u062d\u0633\u0627\u0628",
      "he": "\u05d7\u05e9\u05d1\u05d5\u05df",
      "fa": "\u062d\u0633\u0627\u0628 \u06a9\u0627\u0631\u0628\u0631\u06cc",
      "hi": "\u0916\u093e\u0924\u093e",
      "bn": "\u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f",
      "ur": "\u0627\u06a9\u0627\u0624\u0646\u0679",
      "th": "\u0e1a\u0e31\u0e0d\u0e0a\u0e35",
      "vi": "T\u00e0i Kho\u1ea3n",
      "id": "Akun",
      "ms": "Akaun",
      "tl": "Account",
      "zh-CN": "\u8d26\u6237",
      "zh-TW": "\u8cec\u6236",
      "ja": "\u30a2\u30ab\u30a6\u30f3\u30c8",
      "ko": "\uacc4\uc815",
      "mn": "\u0411\u04af\u0440\u0442\u0433\u044d\u043b",
      "kk": "\u0410\u043a\u043a\u0430\u0443\u043d\u0442",
      "uz": "Akkount",
      "km": "\u1782\u178e\u1793\u17b8",
      "lo": "\u0e9a\u0eb1\u0e99\u0e8a\u0eb5",
      "my": "\u1021\u1000\u1031\u102c\u1004\u1037\u103a",
      "ne": "\u0916\u093e\u0924\u093e",
      "si": "\u0d9c\u0dd2\u0dab\u0dd4\u0db8",
      "ta": "\u0b95\u0ba3\u0b95\u0bcd\u0b95\u0bc1",
      "te": "\u0c16\u0c3e\u0c24\u0c3e",
      "mr": "\u0916\u093e\u0924\u0947",
      "gu": "\u0a8f\u0a95\u0abe\u0a89\u0aa8\u0acd\u0a9f",
      "kn": "\u0c96\u0cbe\u0ca4\u0cc6",
      "sw": "Akaunti",
      "am": "\u1218\u1208\u12eb",
      "ha": "Asusun",
      "yo": "Ak\u1ecd\u1ecdl\u1eb9",
      "ig": "Aka\u1ee5nt\u1ee5",
      "af": "Rekening",
      "zu": "I-akhawunti",
      "xh": "I-akhawunti",
      "sv": "Konto",
      "da": "Konto",
      "no": "Konto",
      "fi": "Tili",
      "et": "Konto",
      "lv": "Konts",
      "lt": "Paskyra",
      "hr": "Ra\u010dun",
      "sr": "\u041d\u0430\u043b\u043e\u0433",
      "sl": "Ra\u010dun",
      "sq": "Llogaria",
      "mk": "\u0421\u043c\u0435\u0442\u043a\u0430",
      "bs": "Ra\u010dun",
      "ka": "\u10d0\u10dc\u10d2\u10d0\u10e0\u10d8\u10e8\u10d8",
      "hy": "\u0540\u0561\u0577\u056b\u057e",
      "az": "Hesab"
    },
  },
  {
    key: "other",
    label: {
      "en": "More",
      "pt-BR": "Mais",
      "pt": "Mais",
      "es": "M\u00e1s",
      "fr": "Plus",
      "de": "Mehr",
      "it": "Altro",
      "nl": "Meer",
      "ru": "\u0411\u043e\u043b\u044c\u0448\u0435",
      "uk": "\u0411\u0456\u043b\u044c\u0448\u0435",
      "pl": "Wi\u0119cej",
      "cs": "V\u00edce",
      "sk": "Viac",
      "hu": "T\u00f6bb",
      "ro": "Mai Mult",
      "bg": "\u041e\u0449\u0435",
      "el": "\u03a0\u03b5\u03c1\u03b9\u03c3\u03c3\u03cc\u03c4\u03b5\u03c1\u03b1",
      "tr": "Daha Fazla",
      "ar": "\u0627\u0644\u0645\u0632\u064a\u062f",
      "he": "\u05e2\u05d5\u05d3",
      "fa": "\u0628\u06cc\u0634\u062a\u0631",
      "hi": "\u0914\u0930",
      "bn": "\u0986\u09b0\u0993",
      "ur": "\u0645\u0632\u06cc\u062f",
      "th": "\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e15\u0e34\u0e21",
      "vi": "Th\u00eam",
      "id": "Lainnya",
      "ms": "Lagi",
      "tl": "Higit Pa",
      "zh-CN": "\u66f4\u591a",
      "zh-TW": "\u66f4\u591a",
      "ja": "\u305d\u306e\u4ed6",
      "ko": "\ub354\ubcf4\uae30",
      "mn": "\u0414\u044d\u043b\u0433\u044d\u0440\u044d\u043d\u0433\u04af\u0439",
      "kk": "\u041a\u04e9\u0431\u0456\u0440\u0435\u043a",
      "uz": "Ko'proq",
      "km": "\u1785\u17d2\u179a\u17be\u1793\u1791\u17c0\u178f",
      "lo": "\u0ec0\u0e9e\u0eb5\u0ec8\u0ea1\u0ec0\u0e95\u0eb5\u0ea1",
      "my": "\u1015\u102d\u102f\u1019\u102d\u102f",
      "ne": "\u0925\u092a",
      "si": "\u0dc0\u0dd0\u0da9\u0dd2",
      "ta": "\u0bae\u0bc7\u0bb2\u0bc1\u0bae\u0bcd",
      "te": "\u0c2e\u0c30\u0c3f\u0c02\u0c24",
      "mr": "\u0905\u0927\u093f\u0915",
      "gu": "\u0ab5\u0aa7\u0ac1",
      "kn": "\u0cb9\u0cc6\u0c9a\u0ccd\u0c9a\u0cc1",
      "sw": "Zaidi",
      "am": "\u12e8\u1270\u1328\u121b\u122a",
      "ha": "\u0198ari",
      "yo": "Di\u1eb9 sii",
      "ig": "Nd\u1ecb \u1ecdz\u1ecd",
      "af": "Meer",
      "zu": "Okuningi",
      "xh": "Ngakumbi",
      "sv": "Mer",
      "da": "Mere",
      "no": "Mer",
      "fi": "Lis\u00e4\u00e4",
      "et": "Rohkem",
      "lv": "Vair\u0101k",
      "lt": "Daugiau",
      "hr": "Vi\u0161e",
      "sr": "\u0408\u043e\u0448",
      "sl": "Ve\u010d",
      "sq": "M\u00eb Shum\u00eb",
      "mk": "\u041f\u043e\u0432\u0435\u045c\u0435",
      "bs": "Vi\u0161e",
      "ka": "\u10db\u10d4\u10e2\u10d8",
      "hy": "\u0531\u057e\u0565\u056c\u056b\u0576",
      "az": "Daha \u00c7ox"
    },
  },
]

/** 帮助中心与客服页的多语言文案 */
const HELP_I18N = {
  "title": {
    "en": "Help Center",
    "pt-BR": "Central de Ajuda",
    "pt": "Centro de Ajuda",
    "es": "Centro de Ayuda",
    "fr": "Centre d'Aide",
    "de": "Hilfe-Center",
    "it": "Centro Assistenza",
    "nl": "Helpcentrum",
    "ru": "\u0426\u0435\u043d\u0442\u0440 \u041f\u043e\u043c\u043e\u0449\u0438",
    "uk": "\u0426\u0435\u043d\u0442\u0440 \u0414\u043e\u043f\u043e\u043c\u043e\u0433\u0438",
    "pl": "Centrum Pomocy",
    "cs": "Centrum N\u00e1pov\u011bdy",
    "sk": "Centrum Pomoci",
    "hu": "S\u00fag\u00f3k\u00f6zpont",
    "ro": "Centrul de Ajutor",
    "bg": "\u0426\u0435\u043d\u0442\u044a\u0440 \u0437\u0430 \u041f\u043e\u043c\u043e\u0449",
    "el": "\u039a\u03ad\u03bd\u03c4\u03c1\u03bf \u0392\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1\u03c2",
    "tr": "Yard\u0131m Merkezi",
    "ar": "\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629",
    "he": "\u05de\u05e8\u05db\u05d6 \u05e2\u05d6\u05e8\u05d4",
    "fa": "\u0645\u0631\u06a9\u0632 \u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc",
    "hi": "\u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0902\u0926\u094d\u0930",
    "bn": "\u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09c7\u09a8\u09cd\u09a6\u09cd\u09b0",
    "ur": "\u0645\u062f\u062f \u06a9\u0627 \u0645\u0631\u06a9\u0632",
    "th": "\u0e28\u0e39\u0e19\u0e22\u0e4c\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d",
    "vi": "Trung T\u00e2m H\u1ed7 Tr\u1ee3",
    "id": "Pusat Bantuan",
    "ms": "Pusat Bantuan",
    "tl": "Sentro ng Tulong",
    "zh-CN": "\u5e2e\u52a9\u4e2d\u5fc3",
    "zh-TW": "\u5e6b\u52a9\u4e2d\u5fc3",
    "ja": "\u30d8\u30eb\u30d7\u30bb\u30f3\u30bf\u30fc",
    "ko": "\uace0\uac1d\uc13c\ud130",
    "mn": "\u0422\u0443\u0441\u043b\u0430\u043c\u0436\u0438\u0439\u043d \u0422\u04e9\u0432",
    "kk": "\u041a\u04e9\u043c\u0435\u043a \u041e\u0440\u0442\u0430\u043b\u044b\u0493\u044b",
    "uz": "Yordam Markazi",
    "km": "\u1798\u1787\u17d2\u1788\u1798\u178e\u17d2\u178c\u179b\u1787\u17c6\u1793\u17bd\u1799",
    "lo": "\u0eaa\u0eb9\u0e99\u0e8a\u0ec8\u0ea7\u0e8d\u0ec0\u0eab\u0ebc\u0eb7\u0ead",
    "my": "\u1021\u1000\u1030\u1021\u100a\u102e\u1005\u1004\u103a\u1010\u102c",
    "ne": "\u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0928\u094d\u0926\u094d\u0930",
    "si": "\u0d8b\u0daf\u0dc0\u0dca \u0db8\u0db0\u0dca\u200d\u0dba\u0dc3\u0dca\u0dae\u0dcf\u0db1\u0dba",
    "ta": "\u0b89\u0ba4\u0bb5\u0bbf \u0bae\u0bc8\u0baf\u0bae\u0bcd",
    "te": "\u0c38\u0c39\u0c3e\u0c2f \u0c15\u0c47\u0c02\u0c26\u0c4d\u0c30\u0c02",
    "mr": "\u092e\u0926\u0924 \u0915\u0947\u0902\u0926\u094d\u0930",
    "gu": "\u0aae\u0aa6\u0aa6 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0",
    "kn": "\u0cb8\u0cb9\u0cbe\u0caf \u0c95\u0cc7\u0c82\u0ca6\u0ccd\u0cb0",
    "sw": "Kituo cha Usaidizi",
    "am": "\u121b\u121b\u1303 \u121b\u12d5\u12a8\u120d",
    "ha": "Cibiyar Taimako",
    "yo": "Ile-\u1eb9k\u1ecd Iranl\u1ecdw\u1ecd",
    "ig": "Ebe Nkwado",
    "af": "Hulp Sentrum",
    "zu": "Isikhungo Sokusiza",
    "xh": "Iziko loNcedo",
    "sv": "Hj\u00e4lpcenter",
    "da": "Hj\u00e6lpecenter",
    "no": "Hjelpesenter",
    "fi": "Ohjekeskus",
    "et": "Abikeskus",
    "lv": "Pal\u012bdz\u012bbas Centrs",
    "lt": "Pagalbos Centras",
    "hr": "Centar za Pomo\u0107",
    "sr": "\u0426\u0435\u043d\u0442\u0430\u0440 \u0437\u0430 \u041f\u043e\u043c\u043e\u045b",
    "sl": "Sredi\u0161\u010de za Pomo\u010d",
    "sq": "Qendra e Ndihm\u00ebs",
    "mk": "\u0426\u0435\u043d\u0442\u0430\u0440 \u0437\u0430 \u041f\u043e\u043c\u043e\u0448",
    "bs": "Centar za Pomo\u0107",
    "ka": "\u10d3\u10d0\u10ee\u10db\u10d0\u10e0\u10d4\u10d1\u10d8\u10e1 \u10ea\u10d4\u10dc\u10e2\u10e0\u10d8",
    "hy": "\u0555\u0563\u0576\u0578\u0582\u0569\u0575\u0561\u0576 \u053f\u0565\u0576\u057f\u0580\u0578\u0576",
    "az": "Yard\u0131m M\u0259rk\u0259zi"
  },
  "policies": {
    "en": "Policies & Version History",
    "pt-BR": "Pol\u00edticas e Hist\u00f3rico de Vers\u00f5es",
    "pt": "Pol\u00edticas e Hist\u00f3rico de Vers\u00f5es",
    "es": "Pol\u00edticas e Historial de Versiones",
    "fr": "Politiques et Historique des Versions",
    "de": "Richtlinien und Versionsverlauf",
    "it": "Politiche e Cronologia delle Versioni",
    "nl": "Beleid en Versiegeschiedenis",
    "ru": "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0438 \u0438 \u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0412\u0435\u0440\u0441\u0438\u0439",
    "uk": "\u041f\u043e\u043b\u0456\u0442\u0438\u043a\u0438 \u0442\u0430 \u0406\u0441\u0442\u043e\u0440\u0456\u044f \u0412\u0435\u0440\u0441\u0456\u0439",
    "pl": "Zasady i Historia Wersji",
    "cs": "Z\u00e1sady a Historie Verz\u00ed",
    "sk": "Z\u00e1sady a Hist\u00f3ria Verzi\u00ed",
    "hu": "Ir\u00e1nyelvek \u00e9s Verzi\u00f3t\u00f6rt\u00e9net",
    "ro": "Politici \u0219i Istoricul Versiunilor",
    "bg": "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0438 \u0438 \u0418\u0441\u0442\u043e\u0440\u0438\u044f \u043d\u0430 \u0412\u0435\u0440\u0441\u0438\u0438\u0442\u0435",
    "el": "\u03a0\u03bf\u03bb\u03b9\u03c4\u03b9\u03ba\u03ad\u03c2 \u03ba\u03b1\u03b9 \u0399\u03c3\u03c4\u03bf\u03c1\u03b9\u03ba\u03cc \u0395\u03ba\u03b4\u03cc\u03c3\u03b5\u03c9\u03bd",
    "tr": "Politikalar ve S\u00fcr\u00fcm Ge\u00e7mi\u015fi",
    "ar": "\u0627\u0644\u0633\u064a\u0627\u0633\u0627\u062a \u0648\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0625\u0635\u062f\u0627\u0631\u0627\u062a",
    "he": "\u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea \u05d5\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d9\u05ea \u05d2\u05e8\u05e1\u05d0\u05d5\u05ea",
    "fa": "\u0633\u06cc\u0627\u0633\u062a\u200c\u0647\u0627 \u0648 \u062a\u0627\u0631\u06cc\u062e\u0686\u0647 \u0646\u0633\u062e\u0647\u200c\u0647\u0627",
    "hi": "\u0928\u0940\u0924\u093f\u092f\u093e\u0902 \u0914\u0930 \u0938\u0902\u0938\u094d\u0915\u0930\u0923 \u0907\u0924\u093f\u0939\u093e\u0938",
    "bn": "\u09a8\u09c0\u09a4\u09bf\u09ae\u09be\u09b2\u09be \u098f\u09ac\u0982 \u09b8\u0982\u09b8\u09cd\u0995\u09b0\u09a3\u09c7\u09b0 \u0987\u09a4\u09bf\u09b9\u09be\u09b8",
    "ur": "\u067e\u0627\u0644\u06cc\u0633\u06cc\u0627\u06ba \u0627\u0648\u0631 \u0648\u0631\u0698\u0646 \u06a9\u06cc \u062a\u0627\u0631\u06cc\u062e",
    "th": "\u0e19\u0e42\u0e22\u0e1a\u0e32\u0e22\u0e41\u0e25\u0e30\u0e1b\u0e23\u0e30\u0e27\u0e31\u0e15\u0e34\u0e40\u0e27\u0e2d\u0e23\u0e4c\u0e0a\u0e31\u0e19",
    "vi": "Ch\u00ednh S\u00e1ch v\u00e0 L\u1ecbch S\u1eed Phi\u00ean B\u1ea3n",
    "id": "Kebijakan dan Riwayat Versi",
    "ms": "Dasar dan Sejarah Versi",
    "tl": "Patakaran at Kasaysayan ng Bersyon",
    "zh-CN": "\u653f\u7b56\u4e0e\u7248\u672c\u5386\u53f2",
    "zh-TW": "\u653f\u7b56\u8207\u7248\u672c\u6b77\u53f2",
    "ja": "\u30dd\u30ea\u30b7\u30fc\u3068\u30d0\u30fc\u30b8\u30e7\u30f3\u5c65\u6b74",
    "ko": "\uc815\ucc45 \ubc0f \ubc84\uc804 \uae30\ub85d",
    "mn": "\u0411\u043e\u0434\u043b\u043e\u0433\u043e \u0431\u0430 \u0425\u0443\u0432\u0438\u043b\u0431\u0430\u0440\u044b\u043d \u0422\u04af\u04af\u0445",
    "kk": "\u0421\u0430\u044f\u0441\u0430\u0442\u0442\u0430\u0440 \u0436\u04d9\u043d\u0435 \u041d\u04b1\u0441\u049b\u0430\u043b\u0430\u0440 \u0422\u0430\u0440\u0438\u0445\u044b",
    "uz": "Siyosatlar va Versiyalar Tarixi",
    "km": "\u1782\u17c4\u179b\u1780\u17b6\u179a\u178e\u17cd\u1793\u17b7\u1784\u1794\u17d2\u179a\u179c\u178f\u17d2\u178f\u17b7\u1780\u17c6\u178e\u17c2",
    "lo": "\u0e99\u0eb0\u0ec2\u0e8d\u0e9a\u0eb2\u0e8d\u0ec1\u0ea5\u0eb0\u0e9b\u0eb0\u0eab\u0ea7\u0eb1\u0e94\u0eaa\u0eb2\u0e94\u0e82\u0ead\u0e87\u0eaa\u0eb0\u0e9a\u0eb1\u0e9a",
    "my": "\u1019\u1030\u101d\u102b\u1012\u1019\u103b\u102c\u1038\u1014\u103e\u1004\u1037\u103a \u1017\u102c\u1038\u101b\u103e\u1004\u103a\u1038\u101e\u1019\u102d\u102f\u1004\u103a\u1038",
    "ne": "\u0928\u0940\u0924\u093f\u0939\u0930\u0942 \u0930 \u0938\u0902\u0938\u094d\u0915\u0930\u0923 \u0907\u0924\u093f\u0939\u093e\u0938",
    "si": "\u0db4\u0dca\u200d\u0dbb\u0dad\u0dd2\u0db4\u0dad\u0dca\u0dad\u0dd2 \u0dc3\u0dc4 \u0d85\u0db1\u0dd4\u0dc0\u0dcf\u0daf \u0d89\u0dad\u0dd2\u0dc4\u0dcf\u0dc3\u0dba",
    "ta": "\u0b95\u0bca\u0bb3\u0bcd\u0b95\u0bc8\u0b95\u0bb3\u0bcd \u0bae\u0bb1\u0bcd\u0bb1\u0bc1\u0bae\u0bcd \u0baa\u0ba4\u0bbf\u0baa\u0bcd\u0baa\u0bc1 \u0bb5\u0bb0\u0bb2\u0bbe\u0bb1\u0bc1",
    "te": "\u0c35\u0c3f\u0c27\u0c3e\u0c28\u0c3e\u0c32\u0c41 \u0c2e\u0c30\u0c3f\u0c2f\u0c41 \u0c35\u0c3f\u0c35\u0c30\u0c23 \u0c1a\u0c30\u0c3f\u0c24\u0c4d\u0c30",
    "mr": "\u0927\u094b\u0930\u0923\u0947 \u0906\u0923\u093f \u0906\u0935\u0943\u0924\u094d\u0924\u0940 \u0907\u0924\u093f\u0939\u093e\u0938",
    "gu": "\u0aa8\u0ac0\u0aa4\u0abf\u0a93 \u0a85\u0aa8\u0ac7 \u0a86\u0ab5\u0ac3\u0aa4\u0acd\u0aa4\u0abf \u0a87\u0aa4\u0abf\u0ab9\u0abe\u0ab8",
    "kn": "\u0ca8\u0cc0\u0ca4\u0cbf\u0c97\u0cb3\u0cc1 \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0c86\u0cb5\u0cc3\u0ca4\u0ccd\u0ca4\u0cbf \u0c87\u0ca4\u0cbf\u0cb9\u0cbe\u0cb8",
    "sw": "Sera na Historiya ya Toleo",
    "am": "\u1356\u120a\u1232\u12ce\u127d\u1293 \u12e8\u1235\u122a\u1275 \u1273\u122a\u12ad",
    "ha": "Manufofi da Tarihin Sigogi",
    "yo": "Aw\u1ecdn Ilana ati Itan-ak\u1ecd\u1ecdl\u1eb9 \u1eb8ya",
    "ig": "Iwu na Ak\u1ee5k\u1ecd Ihe Omume",
    "af": "Beleid en Weergawegeskiedenis",
    "zu": "Izinqubomgomo nomlando wezinguqulo",
    "xh": "Imigaqo namaBal History",
    "sv": "Riktlinjer och Versionshistorik",
    "da": "Politikker og Versionshistorik",
    "no": "Retningslinjer og Versjonshistorikk",
    "fi": "K\u00e4yt\u00e4nn\u00f6t ja Versiohistoria",
    "et": "Reeglid ja Versiooniajalugu",
    "lv": "Politika un Versiju V\u0113sture",
    "lt": "Politikos ir Versij\u0173 Istorija",
    "hr": "Pravila i Povijest Verzija",
    "sr": "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0435 \u0438 \u0418\u0441\u0442\u043e\u0440\u0438\u0458\u0430 \u0412\u0435\u0440\u0437\u0438\u0458\u0430",
    "sl": "Pravila in Zgodovina Razli\u010dic",
    "sq": "Politikat dhe Historiku i Versioneve",
    "mk": "\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0438 \u0438 \u0418\u0441\u0442\u043e\u0440\u0438\u0458\u0430 \u043d\u0430 \u0412\u0435\u0440\u0437\u0438\u0438\u0442\u0435",
    "bs": "Pravila i Historija Verzija",
    "ka": "\u10de\u10dd\u10da\u10d8\u10e2\u10d8\u10d9\u10d0 \u10d3\u10d0 \u10d5\u10d4\u10e0\u10e1\u10d8\u10d4\u10d1\u10d8\u10e1 \u10d8\u10e1\u10e2\u10dd\u10e0\u10d8\u10d0",
    "hy": "\u0554\u0561\u0572\u0561\u0584\u0561\u056f\u0561\u0576\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580 \u0587 \u054f\u0561\u0580\u0562\u0565\u0580\u0561\u056f\u0576\u0565\u0580\u056b \u054a\u0561\u057f\u0574\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
    "az": "Siyas\u0259tl\u0259r v\u0259 Versiya Tarix\u00e7\u0259si"
  },
  "empty": {
    "en": "No articles yet.",
    "pt-BR": "Nenhum artigo ainda.",
    "pt": "Nenhum artigo ainda.",
    "es": "A\u00fan no hay art\u00edculos.",
    "fr": "Aucun article pour le moment.",
    "de": "Noch keine Artikel.",
    "it": "Nessun articolo ancora.",
    "nl": "Nog geen artikelen.",
    "ru": "\u0421\u0430\u0442\u0435\u0439 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442.",
    "uk": "\u0421\u0442\u0430\u0442\u0435\u0439 \u043f\u043e\u043a\u0438 \u043d\u0435\u043c\u0430\u0454.",
    "pl": "Brak artyku\u0142\u00f3w.",
    "cs": "Zat\u00edm \u017e\u00e1dn\u00e9 \u010dl\u00e1nky.",
    "sk": "Zatia\u013e \u017eiadne \u010dl\u00e1nky.",
    "hu": "M\u00e9g nincsenek cikkek.",
    "ro": "\u00cenc\u0103 nu exist\u0103 articole.",
    "bg": "\u0412\u0441\u0435 \u043e\u0449\u0435 \u043d\u044f\u043c\u0430 \u0441\u0442\u0430\u0442\u0438\u0438.",
    "el": "\u0394\u03b5\u03bd \u03c5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03bd \u03ac\u03c1\u03b8\u03c1\u03b1 \u03b1\u03ba\u03cc\u03bc\u03b7.",
    "tr": "Hen\u00fcz makale yok.",
    "ar": "\u0644\u0627 \u062a\u0648\u062c\u062f \u0645\u0642\u0627\u0644\u0627\u062a \u0628\u0639\u062f.",
    "he": "\u05d0\u05d9\u05df \u05de\u05d0\u05de\u05e8\u05d9\u05dd \u05e2\u05d3\u05d9\u05d9\u05df.",
    "fa": "\u0647\u0646\u0648\u0632 \u0645\u0642\u0627\u0644\u0647\u200c\u0627\u06cc \u0646\u06cc\u0633\u062a.",
    "hi": "\u0905\u092d\u0940 \u0915\u094b\u0908 \u0932\u0947\u0916 \u0928\u0939\u0940\u0902\u0964",
    "bn": "\u098f\u0996\u09a8\u0993 \u0995\u09cb\u09a8\u09cb \u09a8\u09bf\u09ac\u09a8\u09cd\u09a7 \u09a8\u09c7\u0987\u0964",
    "ur": "\u0627\u0628\u06be\u06cc \u062a\u06a9 \u06a9\u0648\u0626\u06cc \u0645\u0636\u0645\u0648\u0646 \u0646\u06c1\u06cc\u06ba\u06d4",
    "th": "\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e21\u0e35\u0e1a\u0e17\u0e04\u0e27\u0e32\u0e21",
    "vi": "Ch\u01b0a c\u00f3 b\u00e0i vi\u1ebft n\u00e0o.",
    "id": "Belum ada artikel.",
    "ms": "Tiada artikel lagi.",
    "tl": "Wala pang artikulo.",
    "zh-CN": "\u6682\u65e0\u6587\u7ae0\u3002",
    "zh-TW": "\u66ab\u7121\u6587\u7ae0\u3002",
    "ja": "\u307e\u3060\u8a18\u4e8b\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
    "ko": "\uc544\uc9c1 \uac8c\uc2dc\ubb3c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.",
    "mn": "\u041e\u0434\u043e\u043e\u0445\u043e\u043d\u0434\u043e\u043e \u043d\u0438\u0439\u0442\u043b\u044d\u043b \u0431\u0430\u0439\u0445\u0433\u04af\u0439.",
    "kk": "\u04d8\u0437\u0456\u0440\u0433\u0435 \u043c\u0430\u049b\u0430\u043b\u0430\u043b\u0430\u0440 \u0436\u043e\u049b.",
    "uz": "Hozircha maqolalar yo'q.",
    "km": "\u1798\u17b7\u1793\u1791\u17b6\u1793\u17cb\u1798\u17b6\u1793\u17a2\u178f\u17d2\u1790\u1794\u1791\u1791\u17c1\u17d4",
    "lo": "\u0e8d\u0eb1\u0e87\u0e9a\u0ecd\u0ec8\u0ea1\u0eb5\u0e9a\u0ebb\u0e94\u0ec0\u0ea5\u0e81.",
    "my": "\u1006\u1031\u102c\u1004\u103a\u1038\u1015\u102b\u1038\u1019\u103b\u102c\u1038 \u1019\u101b\u103e\u102d\u101e\u1031\u1038\u1015\u102b\u104b",
    "ne": "\u0905\u0939\u093f\u0932\u0947 \u0938\u092e\u094d\u092e \u0932\u0947\u0916 \u091b\u0948\u0928\u0964",
    "si": "\u0dad\u0dc0\u0db8\u0dad\u0dca \u0dbd\u0dd2\u0db4\u0dd2 \u0db1\u0dd0\u0dad.",
    "ta": "\u0b87\u0ba9\u0bcd\u0ba9\u0bc1\u0bae\u0bcd \u0b95\u0b9f\u0bcd\u0b9f\u0bc1\u0bb0\u0bc8\u0b95\u0bb3\u0bcd \u0b87\u0bb2\u0bcd\u0bb2\u0bc8.",
    "te": "\u0c07\u0c02\u0c15\u0c3e \u0c35\u0c4d\u0c2f\u0c3e\u0c38\u0c3e\u0c32\u0c41 \u0c32\u0c47\u0c35\u0c41.",
    "mr": "\u0905\u0926\u094d\u092f\u093e\u092a \u0932\u0947\u0916 \u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u093e\u0939\u0940\u0924.",
    "gu": "\u0ab9\u0a9c\u0ac1 \u0a95\u0acb\u0a88 \u0ab2\u0ac7\u0a96 \u0aa8\u0aa5\u0ac0.",
    "kn": "\u0c87\u0ca8\u0ccd\u0ca8\u0cc2 \u0cb2\u0cc7\u0c96\u0ca8\u0c97\u0cb3\u0cbf\u0cb2\u0ccd\u0cb2.",
    "sw": "Hakuna makala bado.",
    "am": "\u121d\u1295\u121d \u1218\u1323\u1325\u134d \u12e8\u1208\u121d \u12a5\u1235\u12ab\u1201\u1295.",
    "ha": "Babu labarai tukuna.",
    "yo": "Ko si nkan tii \u1e63aju.",
    "ig": "Onweghi edemede ka.",
    "af": "Nog geen artikels.",
    "zu": "Abekho amathikili okwamanje.",
    "xh": "Akukho manqaku okwangoku.",
    "sv": "Inga artiklar \u00e4nnu.",
    "da": "Ingen artikler endnu.",
    "no": "Ingen artikler enn\u00e5.",
    "fi": "Ei artikkeleita viel\u00e4.",
    "et": "Artikleid pole veel.",
    "lv": "Pagaid\u0101m nav rakstu.",
    "lt": "Straipsni\u0173 kol kas n\u0117ra.",
    "hr": "Jo\u0161 nema \u010dlanaka.",
    "sr": "\u0408\u043e\u0448 \u0443\u0432\u0435\u043a \u043d\u0435\u043c\u0430 \u0447\u043b\u0430\u043d\u0430\u043a\u0430.",
    "sl": "\u0160e ni \u010dlankov.",
    "sq": "Ende pa ka artikuj.",
    "mk": "\u0421\u00e8 \u0443\u0448\u0442\u0435 \u043d\u0435\u043c\u0430 \u0441\u0442\u0430\u0442\u0438\u0438.",
    "bs": "Jo\u0161 nema \u010dlanaka.",
    "ka": "\u10ef\u10d4\u10e0 \u10d0\u10e0 \u10d0\u10e0\u10d8\u10e1 \u10e1\u10e2\u10d0\u10e2\u10d8\u10d4\u10d1\u10d8.",
    "hy": "\u0534\u0565\u057c \u0570\u0578\u0564\u057e\u0561\u056e\u0576\u0565\u0580 \u0579\u056f\u0561\u0576.",
    "az": "H\u0259l\u0259 m\u0259qal\u0259 yoxdur."
  },
  "notFound": {
    "en": "Article not found.",
    "pt-BR": "Artigo n\u00e3o encontrado.",
    "pt": "Artigo n\u00e3o encontrado.",
    "es": "Art\u00edculo no encontrado.",
    "fr": "Article introuvable.",
    "de": "Artikel nicht gefunden.",
    "it": "Articolo non trovato.",
    "nl": "Artikel niet gevonden.",
    "ru": "\u0421\u0442\u0430\u0442\u044c\u044f \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430.",
    "uk": "\u0421\u0442\u0430\u0442\u0442\u044e \u043d\u0435 \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u043e.",
    "pl": "Nie znaleziono artyku\u0142u.",
    "cs": "\u010cl\u00e1nek nenalezen.",
    "sk": "\u010cl\u00e1nok nen\u00e1jden\u00fd.",
    "hu": "A cikk nem tal\u00e1lhat\u00f3.",
    "ro": "Articol neg\u0103sit.",
    "bg": "\u0421\u0442\u0430\u0442\u0438\u044f\u0442\u0430 \u043d\u0435 \u0435 \u043d\u0430\u043c\u0435\u0440\u0435\u043d\u0430.",
    "el": "\u03a4\u03bf \u03ac\u03c1\u03b8\u03c1\u03bf \u03b4\u03b5\u03bd \u03b2\u03c1\u03ad\u03b8\u03b7\u03ba\u03b5.",
    "tr": "Makale bulunamad\u0131.",
    "ar": "\u0627\u0644\u0645\u0642\u0627\u0644 \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f.",
    "he": "\u05d4\u05de\u05d0\u05de\u05e8 \u05dc\u05d0 \u05e0\u05de\u05e6\u05d0.",
    "fa": "\u0645\u0642\u0627\u0644\u0647 \u06cc\u0627\u0641\u062a \u0646\u0634\u062f.",
    "hi": "\u0932\u0947\u0916 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964",
    "bn": "\u09a8\u09bf\u09ac\u09a8\u09cd\u09a7 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf\u0964",
    "ur": "\u0645\u0636\u0645\u0648\u0646 \u0646\u06c1\u06cc\u06ba \u0645\u0644\u0627\u06d4",
    "th": "\u0e44\u0e21\u0e48\u0e1e\u0e1a\u0e1a\u0e17\u0e04\u0e27\u0e32\u0e21",
    "vi": "Kh\u00f4ng t\u00ecm th\u1ea5y b\u00e0i vi\u1ebft.",
    "id": "Artikel tidak ditemukan.",
    "ms": "Artikel tidak dijumpai.",
    "tl": "Hindi nahanap ang artikulo.",
    "zh-CN": "\u672a\u627e\u5230\u6587\u7ae0\u3002",
    "zh-TW": "\u672a\u627e\u5230\u6587\u7ae0\u3002",
    "ja": "\u8a18\u4e8b\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002",
    "ko": "\uac8c\uc2dc\ubb3c\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",
    "mn": "\u041d\u0438\u0439\u0442\u043b\u044d\u043b \u043e\u043b\u0434\u0441\u043e\u043d\u0433\u04af\u0439.",
    "kk": "\u041c\u0430\u049b\u0430\u043b\u0430 \u0442\u0430\u0431\u044b\u043b\u043c\u0430\u0434\u044b.",
    "uz": "Maqola topilmadi.",
    "km": "\u179a\u1780\u1798\u17b7\u1793\u1783\u17be\u1789\u17a2\u178f\u17d2\u1790\u1794\u1791\u17d4",
    "lo": "\u0e9a\u0ecd\u0ec8\u0e9e\u0ebb\u0e9a\u0e9a\u0ebb\u0e94\u0ec0\u0ea5\u0e81.",
    "my": "\u1006\u1031\u102c\u1004\u103a\u1038\u1015\u102b\u1038\u1000\u102d\u102f \u1019\u1010\u103d\u1031\u1037\u1015\u102b\u104b",
    "ne": "\u0932\u0947\u0916 \u092b\u0947\u0932\u093e \u092a\u0930\u0947\u0928\u0964",
    "si": "\u0dbd\u0dd2\u0db4\u0dd2\u0dba \u0dc4\u0db8\u0dd4 \u0db1\u0ddc\u0dc0\u0dd3\u0dba.",
    "ta": "\u0b95\u0b9f\u0bcd\u0b9f\u0bc1\ufffd\u0bb0\u0bc8 \u0b95\u0bbf\u0b9f\u0bc8\u0b95\u0bcd\u0b95\u0bb5\u0bbf\u0bb2\u0bcd\u0bb2\u0bc8.",
    "te": "\u0c35\u0c4d\u0c2f\u0c3e\u0c38\u0c02 \u0c15\u0c28\u0c41\u0c17\u0c4a\u0c28\u0c2c\u0c21\u0c32\u0c47\u0c26\u0c41.",
    "mr": "\u0932\u0947\u0916 \u0938\u093e\u092a\u0921\u0932\u093e \u0928\u093e\u0939\u0940.",
    "gu": "\u0ab2\u0ac7\u0a96 \u0aae\u0ab3\u0acd\u0aaf\u0acb \u0aa8\u0aa5\u0ac0.",
    "kn": "\u0cb2\u0cc7\u0c96\u0ca8 \u0c95\u0c82\u0ca1\u0cc1\u0cac\u0c82\u0ca6\u0cbf\u0cb2\u0ccd\u0cb2.",
    "sw": "Makala haikupatikana.",
    "am": "\u1218\u1323\u1325\u1349 \u12a0\u120d\u1270\u1218\u1208\u12a8\u1270\u121d.",
    "ha": "Ba'a sami labarin ba.",
    "yo": "A ko ri irohin na.",
    "ig": "Ah\u1ee5gh\u1ecb edemede ah\u1ee5.",
    "af": "Artikel nie gevind nie.",
    "zu": "I-athikili ayitholakalanga.",
    "xh": "Inqaku alifumanekanga.",
    "sv": "Artikeln hittades inte.",
    "da": "Artiklen blev ikke fundet.",
    "no": "Artikkelen ble ikke funnet.",
    "fi": "Artikkelia ei l\u00f6ytynyt.",
    "et": "Artiklit ei leitud.",
    "lv": "Raksts nav atrasts.",
    "lt": "Straipsnis nerastas.",
    "hr": "\u010clanak nije prona\u0111en.",
    "sr": "\u0427\u043b\u0430\u043d\u0430\u043a \u043d\u0438\u0458\u0435 \u043f\u0440\u043e\u043d\u0430\u0452\u0435\u043d.",
    "sl": "\u010clanka ni mogo\u010de najti.",
    "sq": "Artikulli nuk u gjet.",
    "mk": "\u0421\u0442\u0430\u0442\u0438\u0458\u0430\u0442\u0430 \u043d\u0435 \u0435 \u043f\u0440\u043e\u043d\u0430\u0458\u0434\u0435\u043d\u0430.",
    "bs": "\u010clanak nije prona\u0111en.",
    "ka": "\u10e1\u10e2\u10d0\u10e2\u10d8\u10d0 \u10d5\u10d4\u10e0 \u10db\u10dd\u10d8\u10eb\u10d4\u10d1\u10dc\u10d0.",
    "hy": "\u0540\u0578\u0564\u057e\u0561\u056e\u0568 \u0579\u056b \u0563\u057f\u0576\u057e\u0565\u056c.",
    "az": "M\u0259qal\u0259 tap\u0131lmad\u0131."
  },
  "backToHelp": {
    "en": "\u2190 Help Center",
    "pt-BR": "\u2190 Central de Ajuda",
    "pt": "\u2190 Centro de Ajuda",
    "es": "\u2190 Centro de Ayuda",
    "fr": "\u2190 Centre d'Aide",
    "de": "\u2190 Hilfe-Center",
    "it": "\u2190 Centro Assistenza",
    "nl": "\u2190 Helpcentrum",
    "ru": "\u2190 \u0426\u0435\u043d\u0442\u0440 \u041f\u043e\u043c\u043e\u0449\u0438",
    "uk": "\u2190 \u0426\u0435\u043d\u0442\u0440 \u0414\u043e\u043f\u043e\u043c\u043e\u0433\u0438",
    "pl": "\u2190 Centrum Pomocy",
    "cs": "\u2190 Centrum N\u00e1pov\u011bdy",
    "sk": "\u2190 Centrum Pomoci",
    "hu": "\u2190 S\u00fag\u00f3k\u00f6zpont",
    "ro": "\u2190 Centrul de Ajutor",
    "bg": "\u2190 \u0426\u0435\u043d\u0442\u044a\u0440 \u0437\u0430 \u041f\u043e\u043c\u043e\u0449",
    "el": "\u2190 \u039a\u03ad\u03bd\u03c4\u03c1\u03bf \u0392\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1\u03c2",
    "tr": "\u2190 Yard\u0131m Merkezi",
    "ar": "\u2190 \u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629",
    "he": "\u2190 \u05de\u05e8\u05db\u05d6 \u05e2\u05d6\u05e8\u05d4",
    "fa": "\u2190 \u0645\u0631\u06a9\u0632 \u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc",
    "hi": "\u2190 \u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0902\u0926\u094d\u0930",
    "bn": "\u2190 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09c7\u09a8\u09cd\u09a6\u09cd\u09b0",
    "ur": "\u2190 \u0645\u062f\u062f \u06a9\u0627 \u0645\u0631\u06a9\u0632",
    "th": "\u2190 \u0e28\u0e39\u0e19\u0e22\u0e4c\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d",
    "vi": "\u2190 Trung T\u00e2m H\u1ed7 Tr\u1ee3",
    "id": "\u2190 Pusat Bantuan",
    "ms": "\u2190 Pusat Bantuan",
    "tl": "\u2190 Sentro ng Tulong",
    "zh-CN": "\u2190 \u5e2e\u52a9\u4e2d\u5fc3",
    "zh-TW": "\u2190 \u5e6b\u52a9\u4e2d\u5fc3",
    "ja": "\u2190 \u30d8\u30eb\u30d7\u30bb\u30f3\u30bf\u30fc",
    "ko": "\u2190 \uace0\uac1d\uc13c\ud130",
    "mn": "\u2190 \u0422\u0443\u0441\u043b\u0430\u043c\u0436\u0438\u0439\u043d \u0422\u04e9\u0432",
    "kk": "\u2190 \u041a\u04e9\u043c\u0435\u043a \u041e\u0440\u0442\u0430\u043b\u044b\u0493\u044b",
    "uz": "\u2190 Yordam Markazi",
    "km": "\u2190 \u1798\u1787\u17d2\u1788\u1798\u178e\u17d2\u178c\u179b\u1787\u17c6\u1793\u17bd\u1799",
    "lo": "\u2190 \u0eaa\u0eb9\u0e99\u0e8a\u0ec8\u0ea7\u0e8d\u0ec0\u0eab\u0ebc\u0eb7\u0ead",
    "my": "\u2190 \u1021\u1000\u1030\u1021\u100a\u102e\u1005\u1004\u103a\u1010\u102c",
    "ne": "\u2190 \u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0928\u094d\u0926\u094d\u0930",
    "si": "\u2190 \u0d8b\u0daf\u0dc0\u0dca \u0db8\u0db0\u0dca\u200d\u0dba\u0dc3\u0dca\u0dae\u0dcf\u0db1\u0dba",
    "ta": "\u2190 \u0b89\u0ba4\u0bb5\u0bbf \u0bae\u0bc8\u0baf\u0bae\u0bcd",
    "te": "\u2190 \u0c38\u0c39\u0c3e\u0c2f \u0c15\u0c47\u0c02\u0c26\u0c4d\u0c30\u0c02",
    "mr": "\u2190 \u092e\u0926\u0924 \u0915\u0947\u0902\u0926\u094d\u0930",
    "gu": "\u2190 \u0aae\u0aa6\u0aa6 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0",
    "kn": "\u2190 \u0cb8\u0cb9\u0cbe\u0caf \u0c95\u0cc7\u0c82\u0ca6\u0ccd\u0cb0",
    "sw": "\u2190 Kituo cha Usaidizi",
    "am": "\u2190 \u121b\u121b\u1303 \u121b\u12d5\u12a8\u120d",
    "ha": "\u2190 Cibiyar Taimako",
    "yo": "\u2190 Ile-\u1eb9k\u1ecd Iranl\u1ecdw\u1ecd",
    "ig": "\u2190 Ebe Nkwado",
    "af": "\u2190 Hulp Sentrum",
    "zu": "\u2190 Isikhungo Sokusiza",
    "xh": "\u2190 Iziko loNcedo",
    "sv": "\u2190 Hj\u00e4lpcenter",
    "da": "\u2190 Hj\u00e6lpecenter",
    "no": "\u2190 Hjelpesenter",
    "fi": "\u2190 Ohjekeskus",
    "et": "\u2190 Abikeskus",
    "lv": "\u2190 Pal\u012bdz\u012bbas Centrs",
    "lt": "\u2190 Pagalbos Centras",
    "hr": "\u2190 Centar za Pomo\u0107",
    "sr": "\u2190 \u0426\u0435\u043d\u0442\u0430\u0440 \u0437\u0430 \u041f\u043e\u043c\u043e\u045b",
    "sl": "\u2190 Sredi\u0161\u010de za Pomo\u010d",
    "sq": "\u2190 Qendra e Ndihm\u00ebs",
    "mk": "\u2190 \u0426\u0435\u043d\u0442\u0430\u0440 \u0437\u0430 \u041f\u043e\u043c\u043e\u0448",
    "bs": "\u2190 Centar za Pomo\u0107",
    "ka": "\u2190 \u10d3\u10d0\u10ee\u10db\u10d0\u10e0\u10d4\u10d1\u10d8\u10e1 \u10ea\u10d4\u10dc\u10e2\u10e0\u10d8",
    "hy": "\u2190 \u0555\u0563\u0576\u0578\u0582\u0569\u0575\u0561\u0576 \u053f\u0565\u0576\u057f\u0580\u0578\u0576",
    "az": "\u2190 Yard\u0131m M\u0259rk\u0259zi"
  },
  "supportEmail": {
    "en": "Email",
    "pt-BR": "E-mail",
    "pt": "E-mail",
    "es": "Correo electr\u00f3nico",
    "fr": "E-mail",
    "de": "E-Mail",
    "it": "Email",
    "nl": "E-mail",
    "ru": "\u042d\u043b. \u043f\u043e\u0447\u0442\u0430",
    "uk": "\u0415\u043b. \u043f\u043e\u0448\u0442\u0430",
    "pl": "E-mail",
    "cs": "E-mail",
    "sk": "E-mail",
    "hu": "E-mail",
    "ro": "E-mail",
    "bg": "\u0418\u043c\u0435\u0439\u043b",
    "el": "E-mail",
    "tr": "E-posta",
    "ar": "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
    "he": "\u05d3\u05d5\u05d0\"\u05dc",
    "fa": "\u0627\u06cc\u0645\u06cc\u0644",
    "hi": "\u0908\u092e\u0947\u0932",
    "bn": "\u0987\u09ae\u09c7\u0987\u09b2",
    "ur": "\u0627\u06cc \u0645\u06cc\u0644",
    "th": "\u0e2d\u0e35\u0e40\u0e21\u0e25",
    "vi": "Th\u01b0 \u0111i\u1ec7n t\u1eed",
    "id": "Surel",
    "ms": "E-mel",
    "tl": "Email",
    "zh-CN": "\u7535\u5b50\u90ae\u4ef6",
    "zh-TW": "\u96fb\u5b50\u90f5\u4ef6",
    "ja": "\u30e1\u30fc\u30eb",
    "ko": "\uc774\uba54\uc77c",
    "mn": "\u0426\u0430\u0445\u0438\u043c \u0448\u0443\u0443\u0434\u0430\u043d",
    "kk": "\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u0434\u044b\u049b \u043f\u043e\u0448\u0442\u0430",
    "uz": "Elektron pochta",
    "km": "\u17a2\u17ca\u17b8\u1798\u17c2\u179b",
    "lo": "\u0ead\u0eb5\u0ec0\u0ea1\u0ea5",
    "my": "\u1021\u102e\u1038\u1019\u1031\u1038\u101c\u103a",
    "ne": "\u0907\u092e\u0947\u0932",
    "si": "\u0d8a\u0db8\u0dda\u0dbd\u0dca",
    "ta": "\u0bae\u0bbf\u0ba9\u0bcd\u0ba9\u0b9e\u0bcd\u0b9a\u0bb2\u0bcd",
    "te": "\u0c07\u0c2e\u0c46\u0c2f\u0c3f\u0c32\u0c4d",
    "mr": "\u0908\u092e\u0947\u0932",
    "gu": "\u0a88\u0aae\u0ac7\u0ab2",
    "kn": "\u0c87\u0cae\u0cc7\u0cb2\u0ccd",
    "sw": "Barua pepe",
    "am": "\u12a2\u121c\u12ed\u120d",
    "ha": "Imel",
    "yo": "Imeli",
    "ig": "Ozi elektr\u1ecdniki",
    "af": "E-pos",
    "zu": "I-imeyili",
    "xh": "I-imeyile",
    "sv": "E-post",
    "da": "E-mail",
    "no": "E-post",
    "fi": "S\u00e4hk\u00f6posti",
    "et": "E-post",
    "lv": "E-pasts",
    "lt": "El. pa\u0161tas",
    "hr": "E-po\u0161ta",
    "sr": "E-po\u0161ta",
    "sl": "E-po\u0161ta",
    "sq": "E-post",
    "mk": "\u0415-\u043f\u043e\u0448\u0442\u0430",
    "bs": "E-po\u0161ta",
    "ka": "\u10d4\u10da\u10e4\u10dd\u10e1\u10e2\u10d0",
    "hy": "\u0537\u056c. \u0583\u0578\u057d\u057f",
    "az": "E-po\u00e7t"
  },
  "supportSelfService": {
    "en": "Self-service",
    "pt-BR": "Autoatendimento",
    "pt": "Autoatendimento",
    "es": "Autoservicio",
    "fr": "Libre-service",
    "de": "Selbstbedienung",
    "it": "Self-service",
    "nl": "Zelfservice",
    "ru": "\u0421\u0430\u043c\u043e\u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u0435",
    "uk": "\u0421\u0430\u043c\u043e\u043e\u0431\u0441\u043b\u0443\u0433\u043e\u0432\u0443\u0432\u0430\u043d\u043d\u044f",
    "pl": "Samoobs\u0142uga",
    "cs": "Samoobsluha",
    "sk": "Samoobsluha",
    "hu": "\u00d6nkiszolg\u00e1l\u00e1s",
    "ro": "Auto-servire",
    "bg": "\u0421\u0430\u043c\u043e\u043e\u0431\u0441\u043b\u0443\u0436\u0432\u0430\u043d\u0435",
    "el": "\u0391\u03c5\u03c4\u03bf\u03b5\u03be\u03c5\u03c0\u03b7\u03c1\u03ad\u03c4\u03b7\u03c3\u03b7",
    "tr": "Self servis",
    "ar": "\u062e\u062f\u0645\u0629 \u0630\u0627\u062a\u064a\u0629",
    "he": "\u05e9\u05d9\u05e8\u05d5\u05ea \u05e2\u05e6\u05de\u05d9",
    "fa": "\u0633\u0644\u0641\u200c\u0633\u0631\u0648\u06cc\u0633",
    "hi": "\u0938\u094d\u0935\u092f\u0902 \u0938\u0947\u0935\u093e",
    "bn": "\u09b8\u09cd\u09ac\u09af\u09bc\u0982\u09b8\u09c7\u09ac\u09be",
    "ur": "\u062e\u0648\u062f\u06a9\u0627\u0631",
    "th": "\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23\u0e15\u0e19\u0e40\u0e2d\u0e07",
    "vi": "T\u1ef1 ph\u1ee5c v\u1ee5",
    "id": "Layanan mandiri",
    "ms": "Khidmat sendiri",
    "tl": "Sariling serbisyo",
    "zh-CN": "\u81ea\u52a9\u670d\u52a1",
    "zh-TW": "\u81ea\u52a9\u670d\u52d9",
    "ja": "\u30bb\u30eb\u30d5\u30b5\u30fc\u30d3\u30b9",
    "ko": "\uc140\ud504 \uc11c\ube44\uc2a4",
    "mn": "\u04e8\u04e9\u0440\u0438\u0439\u043d \u04af\u0439\u043b\u0447\u0438\u043b\u0433\u044d\u044d",
    "kk": "\u04e8\u0437\u0456\u043d\u0434\u0456\u043a \u049b\u044b\u0437\u043c\u0435\u0442",
    "uz": "O'z-o'ziga xizmat",
    "km": "\u179f\u17c1\u179c\u17b6\u1780\u1798\u17d2\u1798\u1781\u17d2\u179b\u17bd\u1793\u17af\u1784",
    "lo": "\u0e9a\u0ecd\u0ea5\u0eb4\u0e81\u0eb2\u0e99\u0ec0\u0ead\u0e87",
    "my": "\u1000\u102d\u102f\u101a\u103a\u1010\u102d\u102f\u1004\u103a\u101d\u1014\u103a\u1006\u1031\u102c\u1004\u103a\u1019\u103e\u102f",
    "ne": "\u0906\u092b\u094d\u0928\u0948 \u0938\u0947\u0935\u093e",
    "si": "\u0dc3\u0dca\u0dc0\u0dba\u0d82 \u0dc3\u0dda\u0dc0\u0dcf\u0dc0",
    "ta": "\u0b9a\u0bc1\u0baf \u0b9a\u0bc7\u0bb5\u0bc8",
    "te": "\u0c38\u0c4d\u0c35\u0c2f\u0c02 \u0c38\u0c47\u0c35",
    "mr": "\u0938\u094d\u0935\u092f\u0902\u0938\u0947\u0935\u093e",
    "gu": "\u0ab8\u0acd\u0ab5-\u0ab8\u0ac7\u0ab5\u0abe",
    "kn": "\u0cb8\u0ccd\u0cb5\u0caf\u0c82 \u0cb8\u0cc7\u0cb5\u0cc6",
    "sw": "Huduma ya Kujitegemea",
    "am": "\u122b\u1235 \u12a0\u1308\u120d\u130d\u120e\u1275",
    "ha": "Sabis na kai",
    "yo": "I\u1e63\u1eb9 ti ara \u1eb9ni",
    "ig": "\u1eccr\u1ee5 onwe onye",
    "af": "Selfbediening",
    "zu": "Inkonzo yokuzisiza",
    "xh": "Inkonzo yokuzinceda",
    "sv": "Sj\u00e4lvbetj\u00e4ning",
    "da": "Selvbetjening",
    "no": "Selvbetjening",
    "fi": "Itsepalvelu",
    "et": "Iseteenindus",
    "lv": "Pa\u0161apkalpo\u0161an\u0101s",
    "lt": "Savitarnos",
    "hr": "Samoposlu\u017eivanje",
    "sr": "Samouslu\u017enost",
    "sl": "Samopostre\u017eno",
    "sq": "Vet\u00ebsh\u00ebrbim",
    "mk": "\u0421\u0430\u043c\u043e\u043f\u043e\u0441\u043b\u0443\u0436\u0443\u0432\u0430\u045a\u0435",
    "bs": "Samouslu\u017enost",
    "ka": "\u10d7\u10d5\u10d8\u10d7\u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8",
    "hy": "\u053b\u0576\u0584\u0576\u0561\u057d\u057a\u0561\u057d\u0561\u0580\u056f\u0578\u0582\u0574",
    "az": "\u00d6z\u00fcn\u0259xidm\u0259t"
  },
  "supportHelpFaq": {
    "en": "Help Center & FAQ",
    "pt-BR": "Central de Ajuda & FAQ",
    "pt": "Centro de Ajuda & FAQ",
    "es": "Centro de ayuda & FAQ",
    "fr": "Centre d'aide & FAQ",
    "de": "Hilfe-Center & FAQ",
    "it": "Centro assistenza & FAQ",
    "nl": "Helpcentrum & FAQ",
    "ru": "\u0426\u0435\u043d\u0442\u0440 \u043f\u043e\u043c\u043e\u0449\u0438 & FAQ",
    "uk": "\u0426\u0435\u043d\u0442\u0440 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438 & FAQ",
    "pl": "Centrum pomocy & FAQ",
    "cs": "Centrum n\u00e1pov\u011bdy & FAQ",
    "sk": "Centrum pomoci & FAQ",
    "hu": "S\u00fag\u00f3k\u00f6zpont & FAQ",
    "ro": "Centru de ajutor & FAQ",
    "bg": "\u0426\u0435\u043d\u0442\u044a\u0440 \u0437\u0430 \u043f\u043e\u043c\u043e\u0449 & FAQ",
    "el": "\u039a\u03ad\u03bd\u03c4\u03c1\u03bf \u03b2\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1\u03c2 & FAQ",
    "tr": "Yard\u0131m Merkezi & FAQ",
    "ar": "\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0633\u0627\u0639\u062f\u0629 & FAQ",
    "he": "\u05de\u05e8\u05db\u05d6 \u05e2\u05d6\u05e8\u05d4 & FAQ",
    "fa": "\u0645\u0631\u06a9\u0632 \u0631\u0627\u0647\u0646\u0645\u0627 & FAQ",
    "hi": "\u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0902\u0926\u094d\u0930 & FAQ",
    "bn": "\u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09c7\u09a8\u09cd\u09a6\u09cd\u09b0 & FAQ",
    "ur": "\u0645\u062f\u062f \u0645\u0631\u06a9\u0632 & FAQ",
    "th": "\u0e28\u0e39\u0e19\u0e22\u0e4c\u0e0a\u0e48\u0e27\u0e22\u0e40\u0e2b\u0e25\u0e37\u0e2d & FAQ",
    "vi": "Trung t\u00e2m tr\u1ee3 gi\u00fap & FAQ",
    "id": "Pusat Bantuan & FAQ",
    "ms": "Pusat Bantuan & FAQ",
    "tl": "Sentro ng Tulong & FAQ",
    "zh-CN": "\u5e2e\u52a9\u4e2d\u5fc3 & FAQ",
    "zh-TW": "\u5e6b\u52a9\u4e2d\u5fc3 & FAQ",
    "ja": "\u30d8\u30eb\u30d7\u30bb\u30f3\u30bf\u30fc & FAQ",
    "ko": "\ub3c4\uc6c0\ub9d0 \uc13c\ud130 & FAQ",
    "mn": "\u0422\u0443\u0441\u043b\u0430\u043c\u0436\u0438\u0439\u043d \u0442\u04e9\u0432 & FAQ",
    "kk": "\u0410\u043d\u044b\u049b\u0442\u0430\u043c\u0430 \u043e\u0440\u0442\u0430\u043b\u044b\u0493\u044b & FAQ",
    "uz": "Yordam markazi & FAQ",
    "km": "\u1798\u1787\u17d2\u1788\u1798\u178e\u17d2\u178c\u179b\u1787\u17c6\u1793\u17bd\u1799 & FAQ",
    "lo": "\u0eaa\u0eb9\u0e99\u0e8a\u0ec8\u0ea7\u0e8d\u0ec0\u0eab\u0ebc\u0eb7\u0ead & FAQ",
    "my": "\u1021\u1000\u1030\u1021\u100a\u102e\u1005\u1004\u103a\u1010\u102c & FAQ",
    "ne": "\u0938\u0939\u093e\u092f\u0924\u093e \u0915\u0947\u0928\u094d\u0926\u094d\u0930 & FAQ",
    "si": "\u0d8b\u0daf\u0dc0\u0dca \u0db8\u0db0\u0dca\u0dba\u0dc3\u0dca\u0dae\u0dcf\u0db1\u0dba & FAQ",
    "ta": "\u0b89\u0ba4\u0bb5\u0bbf \u0bae\u0bc8\u0baf\u0bae\u0bcd & FAQ",
    "te": "\u0c38\u0c39\u0c3e\u0c2f \u0c15\u0c47\u0c02\u0c26\u0c4d\u0c30\u0c02 & FAQ",
    "mr": "\u092e\u0926\u0924 \u0915\u0947\u0902\u0926\u094d\u0930 & FAQ",
    "gu": "\u0aae\u0aa6\u0aa6 \u0a95\u0ac7\u0aa8\u0acd\u0aa6\u0acd\u0ab0 & FAQ",
    "kn": "\u0cb8\u0cb9\u0cbe\u0caf \u0c95\u0cc7\u0c82\u0ca6\u0ccd\u0cb0 & FAQ",
    "sw": "Kituo cha Usaidizi & FAQ",
    "am": "\u12e8\u12a5\u1308\u12f3 \u121b\u12d5\u12a8\u120d & FAQ",
    "ha": "Cibiyar Taimako & FAQ",
    "yo": "Ile-i\u1e63\u1eb9 Iranl\u1ecdw\u1ecd & FAQ",
    "ig": "Ebe Enyemaka & FAQ",
    "af": "Hulpcentrum & FAQ",
    "zu": "Isikhungo Sokusiza & FAQ",
    "xh": "IZiko loncedo & FAQ",
    "sv": "Hj\u00e4lpcenter & FAQ",
    "da": "Hj\u00e6lpcenter & FAQ",
    "no": "Hjelpesenter & FAQ",
    "fi": "Ohjekeskus & FAQ",
    "et": "Abikeskus & FAQ",
    "lv": "Pal\u012bdz\u012bbas centrs & FAQ",
    "lt": "Pagalbos centras & FAQ",
    "hr": "Centar za pomo\u0107 & FAQ",
    "sr": "Centar za pomo\u0107 & FAQ",
    "sl": "Center za pomo\u010d & FAQ",
    "sq": "Qendra e ndihm\u00ebs & FAQ",
    "mk": "\u0426\u0435\u043d\u0442\u0430\u0440 \u0437\u0430 \u043f\u043e\u043c\u043e\u0448 & FAQ",
    "bs": "Centar za pomo\u0107 & FAQ",
    "ka": "\u10d3\u10d0\u10ee\u10db\u10d0\u10e0\u10d4\u10d1\u10d8\u10e1 \u10ea\u10d4\u10dc\u10e2\u10e0\u10d8 & FAQ",
    "hy": "\u0555\u0563\u0576\u0578\u0582\u0569\u0575\u0561\u0576 \u056f\u0565\u0576\u057f\u0580\u0578\u0576 & FAQ",
    "az": "K\u00f6m\u0259k M\u0259rk\u0259zi & FAQ"
  },
}

/** 取帮助/客服中心文案的当前语种值 */
function hl(key) {
  const pack = HELP_I18N[key] || {}
  return pack[state.lang] || pack.en || ''
}

const cxPage = (title, inner) => [
  '<div class="content-page cx-page">',
  '<h1>' + esc(title) + '</h1>',
  inner,
  '</div>',
].join('')

async function renderHelpCenter() {
  const app = $('app')
  let articles = []
  try {
    const data = await apiJson('/help/articles')
    articles = Array.isArray(data.articles) ? data.articles : []
  } catch { /* 空态 */ }
  const sections = HELP_CATS.map((cat) => {
    const items = articles.filter((a) => a.category === cat.key)
    if (!items.length) return ''
    const label = cat.label[state.lang] || cat.label.en
    return [
      '<section class="help-cat">',
      '<h2>' + esc(label) + '</h2>',
      '<div class="help-links">',
      items.map((a) => {
        const title = a.title ? (a.title[state.lang] || a.title.en || a.slug) : a.slug
        return '<a class="help-link" href="/help/' + esc(a.slug) + '" data-cx-link>' + esc(title) + '</a>'
      }).join(''),
      '</div></section>',
    ].join('')
  }).join('')
  app.innerHTML = cxPage(hl('title'), [
    '<div class="help-top">',
    '<a class="cmp-btn primary" href="/support" data-cx-link>' + cxL('supportOpenChat') + '</a>',
    '<a class="cmp-btn ghost" href="/policies" data-cx-link>' + hl('policies') + '</a>',
    '</div>',
    sections || '<p>' + hl('empty') + '</p>',
  ].join(''))
}

async function renderHelpArticle(slug) {
  const app = $('app')
  let article = null
  try {
    const data = await apiJson('/help/articles/' + encodeURIComponent(slug))
    article = data.article || null
  } catch { /* 404 */ }
  if (!article) {
    app.innerHTML = cxPage(hl('title'), '<p>' + hl('notFound') + ' <a href="/help">' + hl('backToHelp') + '</a></p>')
    return
  }
  const title = article.title ? (article.title[state.lang] || article.title.en || slug) : slug
  const body = article.body ? (article.body[state.lang] || article.body.en || '') : ''
  document.title = title + ' — MXQ Football Store'
  app.innerHTML = cxPage(title, [
    '<div class="help-article-body">' + body + '</div>',
    '<p style="margin-top:26px"><a href="/help" style="color:#2563eb">' + hl('backToHelp') + '</a></p>',
  ].join(''))
}

async function renderPolicyList() {
  const app = $('app')
  let docs = []
  try {
    const data = await apiJson('/policies')
    docs = Array.isArray(data.docs) ? data.docs : []
  } catch { /* 空态 */ }
  app.innerHTML = cxPage('Policies', [
    '<p>Our policies are versioned — every change is recorded with an effective date. Click any policy to read the current version or browse past versions.</p>',
    '<div class="policy-grid">',
    docs.map((d) => {
      const title = d.title ? (d.title[state.lang] || d.title.en || d.slug) : d.slug
      return [
        '<a class="policy-card" href="/policies/' + esc(d.slug) + '" data-cx-link>',
        '<b>' + esc(title) + '</b>',
        '<span>' + cxL('verTitle') + ' ' + esc(String(d.active_version)) + '</span>',
        '</a>',
      ].join('')
    }).join('') || '<p>No policies published yet.</p>',
    '</div>',
  ].join(''))
}

async function renderPolicyPage(slug, wantVersion) {
  const app = $('app')
  let data = null
  try {
    data = await apiJson('/policies/' + encodeURIComponent(slug) + (wantVersion ? '?version=' + encodeURIComponent(wantVersion) : ''))
  } catch { /* 404 */ }
  if (!data || !data.doc) {
    app.innerHTML = cxPage('Policy', '<p>Policy not found. <a href="/policies">← All policies</a></p>')
    return
  }
  const doc = data.doc
  const ver = data.version || {}
  const versions = Array.isArray(data.versions) ? data.versions : []
  const title = doc.title ? (doc.title[state.lang] || doc.title.en || slug) : slug
  const body = ver.body ? (ver.body[state.lang] || ver.body.en || '') : ''
  document.title = title + ' v' + doc.active_version + ' — MXQ Football Store'
  app.innerHTML = cxPage(title, [
    '<div class="policy-meta">',
    '<span class="policy-badge">' + cxL('verTitle') + ' ' + esc(String(ver.version || doc.active_version)) + '</span>',
    ver.effective_at ? '<span>' + cxL('verEffective') + ': ' + esc(String(ver.effective_at)) + '</span>' : '',
    ver.summary ? '<span class="policy-sum">' + esc(String(ver.summary)) + '</span>' : '',
    '</div>',
    versions.length > 1 ? [
      '<div class="policy-versions">',
      '<b>' + cxL('verArchive') + ':</b>',
      versions.map((v) => [
        '<button type="button" class="policy-ver-btn' + (v.version === String(ver.version) ? ' on' : '') + '" data-policy-ver="' + esc(slug) + '|' + esc(String(v.version)) + '">',
        esc(String(v.version)) + ' (' + esc(String(v.effective_at || '')) + ')</button>',
      ].join('')).join(''),
      '</div>',
    ].join('') : '',
    '<div class="policy-body">' + body + '</div>',
    '<p style="margin-top:26px"><a href="/policies" style="color:#2563eb">← All policies</a></p>',
  ].join(''))
}

async function renderSupportPage() {
  const app = $('app')
  let status = { onlineCount: 0 }
  try { status = await apiJson('/support/status') } catch { /* 忽略 */ }
  app.innerHTML = cxPage(cxL('supportTitle'), [
    '<div class="support-grid">',
    '<div class="support-left">',
    '<div class="support-card">',
    '<h3>' + cxL('chatTitle') + '</h3>',
    '<p>' + cxL('supportHours') + '</p>',
    '<p><i class="cx-dot ' + (status.onlineCount > 0 ? 'on' : '') + '"></i>' + (status.onlineCount > 0 ? cxL('chatAgentOnline') + ' (' + status.onlineCount + ')' : cxL('chatAgentOffline')) + '</p>',
    '<button type="button" class="cmp-btn primary" data-open-chat>' + cxL('supportOpenChat') + '</button>',
    '</div>',
    '<div class="support-card">',
    '<h3>' + hl('supportEmail') + '</h3>',
    '<p><a href="mailto:support@mxqshop.to">support@mxqshop.to</a></p>',
    '<p><a href="/privacy-portal" data-cx-link>' + cxL('ppTitle') + ' →</a></p>',
    '</div>',
    '<div class="support-card">',
    '<h3>' + hl('supportSelfService') + '</h3>',
    '<p><a href="/help" data-cx-link>' + hl('supportHelpFaq') + ' →</a></p>',
    '<p><a href="/policies" data-cx-link>' + hl('policies') + ' →</a></p>',
    '</div>',
    '</div>',
    '<div class="support-right">',
    '<div class="cx-form support-form">',
    '<h3>' + cxL('chatStart') + '</h3>',
    '<input id="sp-name" placeholder="' + cxL('chatName') + '" maxlength="40" />',
    '<input id="sp-email" type="email" placeholder="' + cxL('chatEmail') + '" maxlength="120" />',
    '<input id="sp-subject" placeholder="Subject" maxlength="140" />',
    '<textarea id="sp-msg" rows="6" placeholder="' + cxL('chatPlaceholder') + '" maxlength="4000"></textarea>',
    '<button type="button" class="cmp-btn primary" id="sp-submit">' + cxL('chatStart') + '</button>',
    '<div class="cx-error" id="sp-error"></div>',
    '</div></div></div>',
  ].join(''))
  const submit = document.getElementById('sp-submit')
  if (submit) {
    submit.addEventListener('click', async () => {
      const errSlot = document.getElementById('sp-error')
      const nameEl = document.getElementById('sp-name')
      const emailEl = document.getElementById('sp-email')
      const subjectEl = document.getElementById('sp-subject')
      const msgEl = document.getElementById('sp-msg')
      const email = emailEl ? emailEl.value.trim() : ''
      const message = msgEl ? msgEl.value.trim() : ''
      const subject = subjectEl && subjectEl.value.trim() ? subjectEl.value.trim() : message.slice(0, 80)
      if (errSlot) errSlot.textContent = ''
      if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email) || message.length < 5) {
        if (errSlot) errSlot.textContent = 'valid email & message (≥5 chars) required'
        return
      }
      submit.disabled = true
      try {
        const data = await apiJson('/support/tickets', {
          method: 'POST',
          body: {
            name: nameEl ? nameEl.value.trim() : '',
            email,
            message,
            subject,
            channel: 'ticket',
            category: 'other',
            visitorId: cxVisitorId(),
          },
        })
        CX.chat.ticketNo = data.ticket_no
        CX.chat.email = email
        cxChatStore()
        if (errSlot) {
          errSlot.className = 'cx-error ok'
          errSlot.textContent = cxL('chatTrack') + ': ' + data.ticket_no
        }
      } catch (error) {
        if (errSlot) errSlot.textContent = String(error && error.message ? error.message : 'error').slice(0, 140)
      }
      submit.disabled = false
    })
  }
}

function renderPrivacyPortal() {
  const app = $('app')
  app.innerHTML = cxPage(cxL('ppTitle'), [
    '<p>' + cxL('ppIntro') + '</p>',
    '<div class="pp-grid">',
    '<div class="pp-form cx-form">',
    '<h3>1. ' + cxL('ppSubmit') + '</h3>',
    '<label>' + cxL('ppType'),
    '<select id="pp-type">',
    '<option value="access">Access my data</option>',
    '<option value="export">Export my data</option>',
    '<option value="correct">Correct my data</option>',
    '<option value="delete">Delete my data</option>',
    '</select></label>',
    '<input id="pp-email" type="email" placeholder="' + cxL('ppEmail') + '" maxlength="120" />',
    '<textarea id="pp-detail" rows="3" placeholder="' + cxL('ppDetail') + '" maxlength="2000"></textarea>',
    '<button type="button" class="cmp-btn primary" id="pp-go">' + cxL('ppSubmit') + '</button>',
    '<div class="cx-error" id="pp-err"></div>',
    '</div>',
    '<div class="pp-form cx-form">',
    '<h3>2. ' + cxL('ppTrack') + '</h3>',
    '<input id="pp-track-no" placeholder="' + cxL('ppReqNo') + ' (PR…)" maxlength="32" />',
    '<input id="pp-track-token" placeholder="' + cxL('ppToken') + '" maxlength="64" />',
    '<button type="button" class="cmp-btn" id="pp-track">' + cxL('ppStatus') + '</button>',
    '<div class="pp-status" id="pp-status"></div>',
    '</div>',
    '</div>',
    '<p style="margin-top:22px;color:#64748b">Data requests are handled per our <a href="/policies/privacy">Privacy Policy</a>.</p>',
  ].join(''))
  const go = document.getElementById('pp-go')
  if (go) {
    go.addEventListener('click', async () => {
      const err = document.getElementById('pp-err')
      const emailEl = document.getElementById('pp-email')
      const detailEl = document.getElementById('pp-detail')
      const typeEl = document.getElementById('pp-type')
      const email = emailEl ? emailEl.value.trim() : ''
      if (err) { err.textContent = ''; err.className = 'cx-error' }
      if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
        if (err) err.textContent = cxL('ppEmail')
        return
      }
      go.disabled = true
      try {
        const data = await apiJson('/privacy/requests', {
          method: 'POST',
          body: {
            type: typeEl ? typeEl.value : 'access',
            email,
            detail: detailEl ? detailEl.value.trim() : '',
          },
        })
        if (err) {
          err.className = 'cx-error ok'
          err.textContent = cxL('ppReqNo') + ': ' + data.req_no + ' · ' + cxL('ppToken') + ': ' + data.token
        }
      } catch (error) {
        if (err) err.textContent = String(error && error.message ? error.message : 'error').slice(0, 140)
      }
      go.disabled = false
    })
  }
  const track = document.getElementById('pp-track')
  if (track) {
    track.addEventListener('click', async () => {
      const slot = document.getElementById('pp-status')
      const noEl = document.getElementById('pp-track-no')
      const tokenEl = document.getElementById('pp-track-token')
      if (!slot) return
      slot.textContent = '…'
      try {
        const data = await apiJson('/privacy/requests/' + encodeURIComponent(noEl ? noEl.value.trim() : '') + '?token=' + encodeURIComponent(tokenEl ? tokenEl.value.trim() : ''))
        const r = data.request
        slot.innerHTML = '<b>' + esc(r.req_no) + '</b> — ' + esc(r.type) + ' · ' + cxL('ppStatus') + ': <b>' + esc(r.status) + '</b>' + (r.admin_note ? '<br />' + esc(r.admin_note) : '')
      } catch {
        slot.textContent = 'Not found — check number & token.'
      }
    })
  }
}

/* ---------------- X-Init 启动与全局事件委托 ---------------- */

async function cxInit() {
  // 0) 右侧悬浮按钮组（右对齐、垂直居中偏下 100px，自上而下：WhatsApp / AI 客服 / 在线客服工单）
  if (!document.querySelector('.cx-fab-group')) {
    const group = document.createElement('div')
    group.className = 'cx-fab-group'
    // 1) WhatsApp Business（最上）
    const wa = document.createElement('button')
    wa.type = 'button'
    wa.className = 'cx-fab cx-fab-wa'
    wa.setAttribute('data-cx-wa', '1')
    wa.setAttribute('aria-label', cxL('waLabel'))
    wa.title = cxL('waLabel')
    wa.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.5c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>'
    group.appendChild(wa)
    // 2) AI 智能客服（中间）
    const ai = document.createElement('button')
    ai.type = 'button'
    ai.className = 'cx-fab cx-fab-ai'
    ai.setAttribute('data-cx-ai-toggle', '1')
    ai.setAttribute('aria-label', cxL('aiTitle'))
    ai.title = cxL('aiTitle')
    ai.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z"/><path d="M19 14l.9 2.3 2.1.7-2.1.7-.9 2.3-.9-2.3-2.1-.7 2.1-.7z"/><path d="M5 15.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/></svg>'
    group.appendChild(ai)
    // 3) 在线客服与工单（最下）
    const fab = document.createElement('button')
    fab.type = 'button'
    fab.className = 'cx-fab'
    fab.setAttribute('data-cx-chat-toggle', '1')
    fab.setAttribute('aria-label', cxL('chatTitle'))
    fab.title = cxL('chatTitle')
    fab.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H5.5L3 21.5V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/><path d="M8.5 11h7M8.5 14.5h4.5"/></svg>'
    group.appendChild(fab)
    document.body.appendChild(group)
  }
  const compliance = await cxLoadCompliance()
  // 受限地区拦截（后台 region_policies.block 才触发）
  if (compliance.region && compliance.region.block) {
    cxRenderBlockPage(compliance.region)
    return
  }
  cxRenderRegionBanner(compliance.region)
  cxRenderAgeGate(compliance.ageGate)
  if (compliance.cmp && compliance.cmp.banner !== false) cmpRenderBanner()
  void mountTrustMini()
}

document.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof Element)) return

  // #15/#18 退货换货：加载订单 / 提交申请 / 查询进度 / 类型切换
  if (target.closest('#rma-load')) {
    void rmaLoadOrder()
    return
  }
  if (target.closest('#rma-submit')) {
    void rmaSubmit()
    return
  }
  if (target.closest('#rma-check')) {
    const no = ($('rma-check-no')?.value || '').trim()
    const email = ($('rma-check-email')?.value || '').trim()
    if (!no || !email) {
      const m = $('rma-check-msg')
      if (m) m.textContent = rmaLabel('请填写售后单号与下单邮箱', 'RMA number and email are required')
      return
    }
    void rmaCheck(no, email)
    return
  }
  if (target.closest('#rma-check-self')) {
    const no = target.closest('#rma-check-self').getAttribute('data-no') || ''
    const email = ($('rma-email')?.value || '').trim()
    if (!no || !email) {
      const m = $('rma-check-msg')
      if (m) m.textContent = rmaLabel('请填写下单邮箱以便查询', 'Order email is required')
      return
    }
    const checkNo = $('rma-check-no')
    const checkEmail = $('rma-check-email')
    if (checkNo) checkNo.value = no
    if (checkEmail) checkEmail.value = email
    void rmaCheck(no, email)
    return
  }
  if (target.closest('.rma-type')) {
    document.querySelectorAll('.rma-type').forEach((el) => el.classList.remove('active'))
    target.closest('.rma-type').classList.add('active')
    return
  }

  // #4 商品问答 Q&A：展开/收起提问表单 + 提交
  if (target.closest('#qa-toggle')) {
    const section = document.getElementById('qa-section')
    const form = $('qa-form')
    if (!section || !form) return
    const open = form.classList.toggle('collapsed')
    section.dataset.formOpen = open ? '0' : '1'
    target.textContent = open
      ? (isZh(state.lang) ? '我要提问' : 'Ask a question')
      : (isZh(state.lang) ? '收起' : 'Cancel')
    if (!open) {
      const box = $('qa-question')
      if (box) box.focus()
    }
    return
  }
  if (target.closest('#qa-submit')) {
    const form = $('qa-form')
    if (!form) return
    void submitQa(Number(form.dataset.pid))
    return
  }

  // #8 心愿单：订阅面板展开/收起、保存、取消订阅、立即同步、生成分享链接
  if (target.closest('[data-wl-toggle]')) {
    const pid = target.closest('[data-wl-toggle]').dataset.wlToggle
    const panel = document.querySelector(`[data-wl-sub="${pid}"] .wl-sub-panel`)
    if (panel) panel.hidden = !panel.hidden
    return
  }
  if (target.closest('[data-wl-save]')) {
    event.preventDefault()
    void saveWishlistSubscription(target.closest('[data-wl-save]').dataset.wlSave)
    return
  }
  if (target.closest('[data-wl-unsub]')) {
    event.preventDefault()
    void removeWishlistItem(target.closest('[data-wl-unsub]').dataset.wlUnsub)
    return
  }
  if (target.closest('#wl-sync-now')) {
    event.preventDefault()
    void syncWishlistFromLocal().then(({ moved }) => {
      toast(moved ? wlLabel(`已同步 ${moved} 件到心愿单`, `Synced ${moved} items`) : wlLabel('心愿单已是最新', 'Wishlist is up to date'))
      return loadWishlist({ force: true }).then(() => render())
    })
    return
  }
  if (target.closest('#wl-share')) {
    event.preventDefault()
    void (async () => {
      const res = await fetch(apiUrl('/api/store/wishlist/share'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ enable: true, guestToken: guestTokenForWishlist() }),
      })
      const data = await res.json().catch(() => ({}))
      const out = document.getElementById('wl-share-out')
      if (!data.shareCode || !out) {
        toast(wlLabel('分享链接生成失败', 'Could not create share link'))
        return
      }
      const url = `${location.origin}/wishlist/${data.shareCode}`
      out.hidden = false
      out.innerHTML = `
        <span>${wlLabel('公开链接', 'Public link')}</span>
        <input type="text" readonly value="${esc(url)}" data-wl-share-input />
        <button type="button" class="btn-ghost" data-wl-share-copy>${wlLabel('复制', 'Copy')}</button>
        <a class="link-btn" href="${esc(url)}" target="_blank" rel="noopener">${wlLabel('打开', 'Open')}</a>`
      WISHLIST_CACHE.at = 0
      await loadWishlist({ force: true })
    })()
    return
  }
  if (target.closest('[data-wl-share-copy]')) {
    event.preventDefault()
    const input = document.querySelector('[data-wl-share-input]')
    if (input) {
      input.select()
      navigator.clipboard?.writeText(input.value).catch(() => {})
      toast(wlLabel('链接已复制', 'Link copied'))
    }
    return
  }

  // #5 商品对比：卡片勾选 / 浮条移除 / 清空 / 对比页移除
  if (target.closest('[data-cmp]')) {
    event.preventDefault()
    event.stopPropagation()
    const res = toggleCompare(Number(target.closest('[data-cmp]').dataset.cmp))
    if (res.full) {
      toast(t(isZh(state.lang) ? `最多对比 ${CMP_MAX} 件商品` : `You can compare up to ${CMP_MAX} products`))
    } else {
      document.querySelectorAll('[data-cmp]').forEach((btn) => {
        const on = inCompare(Number(btn.dataset.cmp))
        btn.classList.toggle('active', on)
        btn.setAttribute('aria-pressed', on ? 'true' : 'false')
      })
      if (currentRoute().name === 'compare') render()
    }
    return
  }
  if (target.closest('[data-cmp-remove]')) {
    event.preventDefault()
    toggleCompare(Number(target.closest('[data-cmp-remove]').dataset.cmpRemove))
    if (currentRoute().name === 'compare') render()
    return
  }
  if (target.closest('#cmp-clear')) {
    event.preventDefault()
    cmpIds = []
    saveCompare()
    document.querySelectorAll('[data-cmp]').forEach((btn) => {
      btn.classList.remove('active')
      btn.setAttribute('aria-pressed', 'false')
    })
    paintCompareBar()
    if (currentRoute().name === 'compare') render()
    return
  }

  // #7 搜索历史：清空「最近搜索」。热搜词会复用历史，重绘整块避免残留旧词。
  if (target.closest('#search-hist-clear')) {
    clearSearchHistory()
    const box = document.getElementById('search-hist')
    if (box) {
      const fresh = document.createElement('div')
      fresh.innerHTML = renderSearchHistoryBlock()
      const nodes = [...fresh.children]
      if (nodes.length) box.replaceWith(...nodes)
      else box.remove()
    }
    return
  }

  // CMP 横幅
  const banner = target.closest('.cmp-banner')
  if (banner) {
    if (target.closest('[data-cmp-accept]')) {
      cmpPersist('accept_all', { functional: true, analytics: true, marketing: true })
      cmpCloseBanner()
      return
    }
    if (target.closest('[data-cmp-reject]')) {
      cmpPersist('reject_all', {})
      cmpCloseBanner()
      return
    }
    if (target.closest('[data-cmp-save]')) {
      cmpPersist('custom', cmpReadCats(banner))
      cmpCloseBanner()
      return
    }
  }
  // CMP 设置弹窗（排除年龄/尺码弹窗）
  const cmpModal = target.closest('.cmp-modal-mask:not(.age-gate):not(.size-assist)')
  if (cmpModal) {
    if (target.closest('[data-cmp-accept]')) {
      cmpPersist('accept_all', { functional: true, analytics: true, marketing: true })
      cmpModal.remove()
      return
    }
    if (target.closest('[data-cmp-save-close]')) {
      cmpPersist('custom', cmpReadCats(cmpModal))
      cmpModal.remove()
      return
    }
  }

  // 年龄门槛
  const ageGate = target.closest('.age-gate')
  if (ageGate) {
    if (target.closest('[data-age-yes]')) {
      try { sessionStorage.setItem('mxq_age_ok', '1') } catch { /* 忽略 */ }
      ageGate.remove()
      return
    }
    if (target.closest('[data-age-no]')) {
      location.href = 'https://www.google.com'
      return
    }
  }

  // 尺码助手
  if (target.closest('[data-size-assistant]')) {
    event.preventDefault()
    cxOpenSizeAssistant()
    return
  }
  if (target.closest('[data-sa-go]')) {
    void cxSizeRecommendRun(target)
    return
  }
  const fitBtn = target.closest('[data-sa-fit]')
  if (fitBtn && !fitBtn.textContent.includes('✓')) {
    const hEl = document.getElementById('sa-height')
    const wEl = document.getElementById('sa-weight')
    let lastSize = ''
    try { lastSize = sessionStorage.getItem('mxq_last_size_reco') || '' } catch { lastSize = '' }
    cxLogSizeReco({
      productId: cxCurrentDetailPid(),
      heightCm: hEl && Number(hEl.value) ? Number(hEl.value) : null,
      weightKg: wEl && Number(wEl.value) ? Number(wEl.value) : null,
      recSize: lastSize,
      fit: fitBtn.dataset.saFit,
    })
    fitBtn.textContent = '✓ ' + fitBtn.textContent
    return
  }

  // 聊天窗开关
  if (target.closest('[data-cx-chat-toggle]')) {
    event.preventDefault()
    cxToggleChat()
    return
  }
  // AI 智能客服窗开关
  if (target.closest('[data-cx-ai-toggle]')) {
    event.preventDefault()
    cxToggleAi()
    return
  }
  // WhatsApp Business（新窗口打开 wa.me，号码来自后台 contact_channels 配置）
  if (target.closest('[data-cx-wa]')) {
    event.preventDefault()
    void cxFetchWaUrl().then((waUrl) => {
      window.open(waUrl, '_blank', 'noopener')
    })
    return
  }
  if (target.closest('[data-open-chat]')) {
    event.preventDefault()
    cxToggleChat(true)
    return
  }
  if (target.closest('[data-cx-close]')) {
    const mask = target.closest('.cmp-modal-mask')
    if (mask) { mask.remove(); CX.sizeAssistOpen = false; return }
    if (target.closest('.cx-ai-chat')) cxToggleAi(false)
    else cxToggleChat(false)
    return
  }

  // 页脚 Cookie 设置
  if (target.closest('[data-cx-cookie-settings]')) {
    event.preventDefault()
    cmpOpenSettings()
    return
  }
  // 政策历史版本切换
  const verBtn = target.closest('[data-policy-ver]')
  if (verBtn) {
    event.preventDefault()
    const parts = String(verBtn.dataset.policyVer).split('|')
    void renderPolicyPage(parts[0], parts[1])
    return
  }
})

// SPA 重绘后补挂详情页信任徽章（render() 会重建 #app 内容）
const cxMiniObserver = new MutationObserver(() => {
  const mini = document.querySelector('[data-trust-mini]:not([data-done])')
  if (mini) void mountTrustMini()
})
cxMiniObserver.observe(document.body, { childList: true, subtree: true })

cxInit()

// 调试钩子：控制台可查运行时状态（state 不随请求变化，仅引用暴露）
window.__mxqState = state
window.__mxqDebug = { resolveGroupSlugs, descendantsOf, filteredProducts }
