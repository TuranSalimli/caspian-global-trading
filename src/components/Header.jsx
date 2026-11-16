import { COMPANY } from '../config.js'

export default function Header({ lang, setLang, langs }) {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="brand" href="#top" aria-label={COMPANY.name}>
          <img src="./brand/logo-mark.png" alt="" />
          <span><b>CASPIAN GLOBAL</b><em>TRADING</em></span>
        </a>
        <div className="langs">
          {langs.map(l => <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}
        </div>
      </div>
    </header>
  )
}
