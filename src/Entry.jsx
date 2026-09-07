import { formatDate, padNum } from './format.js'
import { IconCheck, IconChevron, IconX } from './Icons.jsx'

export default function Entry({
  item,
  open = false,
  onToggle,
  onSetInactive,
  onSetActive,
}) {
  const dead = item.status === 'inactive'
  const interactive = typeof onToggle === 'function'
  const canSwitch = onSetInactive || onSetActive
  const cls = `entry${dead ? ' is-dead' : ' is-live'}${open ? ' is-open' : ''}`

  const inner = (
    <>
      <span className="entry-icon" aria-hidden="true">
        {dead ? <IconX /> : <IconCheck />}
      </span>
      <span className="entry-main">
        <span className="entry-meta">
          <span className="num">DL-{padNum(item.id)}</span>
          <span className="when">· {formatDate(item.date)}</span>
        </span>
        <span className="entry-title">{item.title}</span>
        <span className={`state${dead ? ' is-dead' : ''}`}>
          <span className="state-dot" />
          {dead ? 'Inactive' : 'Active'}
        </span>
      </span>
      <span className="entry-why">{item.why}</span>
      <span className="entry-aside">
        <span className="entry-meta-col">
          <small>Recorded</small>
          {formatDate(item.date)}
        </span>
        <span className="entry-meta-col">
          <small>By</small>
          Team
        </span>
      </span>
      {interactive && (
        <span className={`entry-go${open ? ' is-open' : ''}`}>
          <IconChevron />
        </span>
      )}
    </>
  )

  return (
    <article className={cls}>
      {interactive ? (
        <button
          type="button"
          className="entry-hit"
          onClick={onToggle}
          aria-expanded={open}
        >
          {inner}
        </button>
      ) : (
        <div className="entry-hit">{inner}</div>
      )}

      {open && canSwitch && (
        <div className="status-switch" role="group" aria-label="Decision status">
          <button
            type="button"
            className={`status-opt${!dead ? ' is-on' : ''}`}
            aria-pressed={!dead}
            disabled={!dead || !onSetActive}
            onClick={onSetActive}
          >
            <span className="status-dot live" />
            Active
          </button>
          <button
            type="button"
            className={`status-opt${dead ? ' is-on is-idle' : ''}`}
            aria-pressed={dead}
            disabled={dead || !onSetInactive}
            onClick={onSetInactive}
          >
            <span className="status-dot idle" />
            Inactive
          </button>
        </div>
      )}
    </article>
  )
}
