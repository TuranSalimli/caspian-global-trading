import { COMPANY } from '../config.js'

export default function Footer({ t }) {
  return (
    <footer className="footer" id="contacts">
      <div className="wrap footer-inner">
        <img src="./brand/logo-full.png" alt={COMPANY.name} className="footer-logo" />
        <div>
          <h4>{t.contacts}</h4>
          <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
          <p><a href={`https://${COMPANY.website}`} target="_blank" rel="noreferrer">{COMPANY.website}</a></p>
          {COMPANY.phones.map(p => <p key={p}><a href={`tel:${p.replace(/[^+\d]/g, '')}`}>{p}</a></p>)}
        </div>
      </div>
      <div className="wrap copy">© {new Date().getFullYear()} {COMPANY.name}. {t.rights}</div>
    </footer>
  )
}
