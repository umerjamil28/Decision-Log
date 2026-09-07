import { Link } from 'react-router-dom'

export default function Topbar({ subtitle, children }) {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="mark" aria-hidden="true">
          DL
        </span>
        <span className="brand-copy">
          <strong>Decision Log</strong>
          <small>{subtitle}</small>
        </span>
      </Link>
      <div className="topbar-actions">{children}</div>
    </header>
  )
}
