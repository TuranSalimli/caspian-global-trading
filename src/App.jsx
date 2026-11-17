import { useMemo, useState, useEffect, useRef } from 'react'
import products from './data/products.json'
import { T, LANGS } from './i18n.js'
import { tx } from './util.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductModal from './components/ProductModal.jsx'

const PAGE = 48
const FIRST_IDS = ['cgt-arina', 'cgt-vega', 'cgt-cub', 'rs-081-1', 'rs-092-1'] // Arina, Vega, Cub, Bordo Europa, Bourgundy Classic — shown first
const firstRank = p => { const i = FIRST_IDS.indexOf(p.id); return i < 0 ? 999 : i }
const CAT_ORDER = ['spirits', 'vodka', 'wine', 'champagne', 'cognac', 'beer', 'soft', 'water', 'milk', 'oil', 'jars', 'pharma', 'closures']

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'ru' } catch { return 'ru' }
  })
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [vol, setVol] = useState('all')
  const [sort, setSort] = useState('cat')
  const [limit, setLimit] = useState(PAGE)
  const [active, setActive] = useState(null)
  const t = T[lang]
  const chipsRef = useRef(null)
  const [more, setMore] = useState(true)
  const checkScroll = () => {
    const el = chipsRef.current
    if (el) setMore(el.scrollWidth - el.scrollLeft - el.clientWidth > 8)
  }
  useEffect(() => { checkScroll(); window.addEventListener('resize', checkScroll); return () => window.removeEventListener('resize', checkScroll) }, [lang])

  useEffect(() => { try { localStorage.setItem('lang', lang) } catch {} document.documentElement.lang = lang }, [lang])
  useEffect(() => setLimit(PAGE), [q, cat, vol, sort])

  const volumes = useMemo(() => {
    const s = new Set()
    products.forEach(p => p.variants.forEach(v => v.ml && s.add(v.ml)))
    return [...s].sort((a, b) => a - b)
  }, [])

  const counts = useMemo(() => {
    const c = {}
    products.forEach(p => { c[p.cat] = (c[p.cat] || 0) + 1 })
    return c
  }, [])

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let r = products.filter(p => {
      if (cat !== 'all' && p.cat !== cat) return false
      if (vol !== 'all' && !p.variants.some(v => String(v.ml) === vol)) return false
      if (needle) {
        const hay = `${tx(p.name, lang)} ${p.code || ''} ${t.cat[p.cat]} ${p.variants.map(v => v.ml).join(' ')}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    const minMl = p => Math.min(...p.variants.map(v => v.ml || 1e9))
    const cmp = {
      name: (a, b) => tx(a.name, lang).localeCompare(tx(b.name, lang), lang, { numeric: true }),
      volume: (a, b) => minMl(a) - minMl(b) || tx(a.name, lang).localeCompare(tx(b.name, lang)),
      cat: (a, b) => firstRank(a) - firstRank(b) || CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat),
    }[sort]
    return [...r].sort(cmp)
  }, [q, cat, vol, sort, t, lang])

  const catList = CAT_ORDER.filter(c => counts[c])
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <>
      <Header lang={lang} setLang={setLang} langs={LANGS} />
      <section className="hero">
        <div className="wrap hero-inner">
          <div>
            <p className="eyebrow">{t.tagline}</p>
            <h1>{t.heroTitle}</h1>
            <p className="lead">{t.heroText}</p>
            <div className="stats">
              <span><b>{products.length}</b> {t.products}</span>
              <span><b>{CAT_ORDER.filter(c => products.some(p => p.cat === c)).length}</b> {t.categories}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="wrap">
        <div className="toolbar">
          <div className="search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            <input type="search" inputMode="search" value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
            {q && <button className="x" onClick={() => setQ('')} aria-label="clear">×</button>}
          </div>
          <div className="selects">
            <select value={vol} onChange={e => setVol(e.target.value)} aria-label={t.volume}>
              <option value="all">{t.allVolumes}</option>
              {volumes.map(v => <option key={v} value={v}>{v} {t.ml}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label={t.sort}>
              <option value="cat">{t.sortCat}</option>
              <option value="name">{t.sortName}</option>
              <option value="volume">{t.sortVolume}</option>
            </select>
          </div>
        </div>

        <div className="chips-wrap">
          <div className="chips" ref={chipsRef} onScroll={checkScroll}>
            <button className={cat === 'all' ? 'chip on' : 'chip'} onClick={() => setCat('all')}>{t.all} <i>{total}</i></button>
            {catList.map(c => (
              <button key={c} className={cat === c ? 'chip on' : 'chip'} onClick={() => setCat(c)}>{t.cat[c]} <i>{counts[c]}</i></button>
            ))}
          </div>
          {more && (
            <button className="chips-next" aria-label="→" onClick={() => chipsRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}>
              <svg viewBox="0 0 24 24" width="16" height="16"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </div>

        <p className="count">{t.results}: <b>{list.length}</b></p>

        {list.length === 0 ? (
          <div className="empty">
            <p>{t.empty}</p>
            <button className="btn" onClick={() => { setQ(''); setCat('all'); setVol('all') }}>{t.reset}</button>
          </div>
        ) : (
          <div className="grid">
            {list.slice(0, limit).map(p => <ProductCard key={p.id} p={p} t={t} lang={lang} onOpen={() => setActive(p)} />)}
          </div>
        )}
        {limit < list.length && (
          <div className="more"><button className="btn ghost" onClick={() => setLimit(l => l + PAGE)}>{t.showMore} ({list.length - limit})</button></div>
        )}
        <p className="note">{t.note}</p>
      </main>

      <Footer t={t} />
      {active && <ProductModal p={active} t={t} lang={lang} onClose={() => setActive(null)} />}
    </>
  )
}
