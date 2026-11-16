import { useEffect } from 'react'
import { COMPANY } from '../config.js'
import { tx } from '../util.js'
import Pic, { imgSrc } from './Pic.jsx'

export default function ProductModal({ p, t, lang, onClose }) {
  useEffect(() => {
    const k = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])

  const hasMass = p.variants.some(v => v.mass)
  const hasFill = p.variants.some(v => v.fill)
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Quote request: ' + tx(p.name, 'en'))}&body=${encodeURIComponent(`${tx(p.name, 'en')}${p.code ? ' (№ ' + p.code + ')' : ''}\n`)}`

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label={t.close}>×</button>
        <div className="modal-img">
          {p.tier && <span className={`badge ${p.tier}`}>{t.tier[p.tier]}</span>}
          <Pic file={p.image || p.drawing} alt={tx(p.name, lang)} shape={p.shape} />
        </div>
        <div className="modal-body">
          <span className="cat">{t.cat[p.cat]}</span>
          <h2>{tx(p.name, lang)}</h2>
          {p.code && <p className="code">{t.code}: <b>{p.code}</b></p>}

          {p.desc && <p className="mdesc">{tx(p.desc, lang)}</p>}
          {p.specs && p.specs.map((s, i) => (
            <p className="row" key={i}><span>{tx(s.l, lang)}</span><b>{tx(s.v, lang)}</b></p>
          ))}

          {p.variants.length > 0 && <table className="spec">
            <thead>
              <tr>
                <th>{t.volume}</th><th>{t.height}</th><th>{t.diameter}</th>
                {hasMass && <th>{t.mass}</th>}{hasFill && <th>{t.fill}</th>}
              </tr>
            </thead>
            <tbody>
              {p.variants.map((v, i) => (
                <tr key={i}>
                  <td><b>{v.ml ?? '—'}</b></td><td>{v.h ?? '—'}</td><td>{v.d ?? '—'}</td>
                  {hasMass && <td>{v.mass ?? '—'}</td>}{hasFill && <td>{v.fill ?? '—'}</td>}
                </tr>
              ))}
            </tbody>
          </table>}

          {p.finish && <p className="row"><span>{t.finish}</span><b>{p.finish}</b></p>}
          {p.colors?.length > 0 && (
            <p className="row"><span>{t.colors}</span>
              <span className="swatches">{p.colors.map((c, i) => <i key={i} style={{ background: c }} />)}</span>
            </p>
          )}
          {p.image && p.drawing && (
            <div className="drawing"><span>{t.drawing}</span><img src={imgSrc(p.drawing)} alt="" /></div>
          )}
          <a className="btn" href={mailto}>{t.quote}</a>
        </div>
      </div>
    </div>
  )
}
