import { tx } from '../util.js'
import Pic from './Pic.jsx'

export function mlRange(p) {
  const v = [...new Set(p.variants.map(x => x.ml).filter(Boolean))].sort((a, b) => a - b)
  return v
}

export default function ProductCard({ p, t, lang, onOpen }) {
  const vols = mlRange(p)
  const img = p.image || p.drawing
  return (
    <button className="card" onClick={onOpen}>
      <div className={'thumb' + (p.image ? '' : ' draw')}>
        {p.tier && <span className={`badge ${p.tier}`}>{t.tier[p.tier]}</span>}
        <Pic lazy file={img} alt={tx(p.name, lang)} shape={p.shape} />
      </div>
      <div className="meta">
        <span className="cat">{t.cat[p.cat]}</span>
        <h3>{tx(p.name, lang)}</h3>
        <div className="vols">{vols.map(v => <span key={v}>{v} {t.ml}</span>)}</div>
        {p.desc && <p className="desc">{tx(p.desc, lang)}</p>}
        {p.code && <span className="code">№ {p.code}</span>}
      </div>
    </button>
  )
}
