import { useState } from 'react'
import Placeholder from './Placeholder.jsx'

// Local images live in public/img/; absolute http(s) URLs are used as-is.
// If an image fails to load, an outline placeholder is shown instead.
export const imgSrc = f => (/^https?:\/\//.test(f) ? f : `./img/${f}`)

export default function Pic({ file, alt, shape, lazy }) {
  const [bad, setBad] = useState(false)
  if (!file || bad) return <Placeholder shape={shape} />
  return <img loading={lazy ? 'lazy' : undefined} src={imgSrc(file)} alt={alt} referrerPolicy="no-referrer" onError={() => setBad(true)} />
}
