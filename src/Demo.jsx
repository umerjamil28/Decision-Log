import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Entry from './Entry.jsx'
import { todayIso } from './format.js'
import { IconHome, IconPlus, IconSort } from './Icons.jsx'
import { seed } from './seed.js'
import Topbar from './Topbar.jsx'

export default function Demo() {
  const [items, setItems] = useState(seed)
  const [openId, setOpenId] = useState(null)
  const [writing, setWriting] = useState(false)
  const [hideDead, setHideDead] = useState(false)
  const [sort, setSort] = useState('latest')
  const [title, setTitle] = useState('')
  const [why, setWhy] = useState('')
  const [date, setDate] = useState(todayIso())
  const [err, setErr] = useState('')

  const activeCount = items.filter((item) => item.status === 'active').length

  const visible = useMemo(() => {
    const next = hideDead
      ? items.filter((item) => item.status === 'active')
      : [...items]
    next.sort((a, b) => {
      if (a.date === b.date) return sort === 'latest' ? b.id - a.id : a.id - b.id
      return sort === 'latest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
    })
    return next
  }, [hideDead, items, sort])

  function startWriting() {
    setWriting(true)
    setErr('')
  }

  function resetForm() {
    setTitle('')
    setWhy('')
    setDate(todayIso())
    setErr('')
    setWriting(false)
  }

  function addEntry(e) {
    e.preventDefault()
    const nextTitle = title.trim()
    const nextWhy = why.trim()
    if (!nextTitle || !nextWhy) {
      setErr('Need the call and the reason. Date can stay today.')
      return
    }

    const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1
    const next = { id, title: nextTitle, why: nextWhy, date, status: 'active' }
    setItems((list) => [next, ...list])
    setOpenId(id)
    resetForm()
  }

  function setStatus(id, status) {
    setItems((list) =>
      list.map((item) => (item.id === id ? { ...item, status } : item)),
    )
  }

  return (
    <div className="page page-demo">
      <Topbar subtitle="The log">
        <Link className="text-link home-link" to="/">
          <IconHome />
          Home
        </Link>
        <button type="button" className="btn" onClick={startWriting}>
          <IconPlus />
          New decision
        </button>
      </Topbar>

      <main className="wrap tool">
        <section className="summary">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>What the team chose</h1>
            <p className="hint">Open a row to change status. Newest first.</p>
          </div>
          <ul className="stats">
            <li>
              <strong>{items.length}</strong>
              <span>Recorded</span>
            </li>
            <li className="is-live">
              <strong>{activeCount}</strong>
              <span>Active</span>
            </li>
            <li className="is-dead">
              <strong>{items.length - activeCount}</strong>
              <span>Inactive</span>
            </li>
          </ul>
        </section>

        {writing && (
          <form className="form" onSubmit={addEntry}>
            <div className="form-head">
              <p className="eyebrow">New entry</p>
              <h2>Write the call down</h2>
            </div>
            <label>
              What was decided
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ship on Postgres, not Mongo"
                autoFocus
              />
            </label>
            <label>
              Why
              <textarea
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                placeholder="The reason that will get lost by Thursday."
              />
            </label>
            <label className="date-field">
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            {err && <p className="err">{err}</p>}
            <div className="form-actions">
              <button className="btn" type="submit">
                Add to the log
              </button>
              <button className="ghost" type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="list-head">
          <label className="toggle">
            <input
              type="checkbox"
              checked={hideDead}
              onChange={(e) => setHideDead(e.target.checked)}
            />
            Hide inactive
          </label>
          <div className="list-tools">
            <label className="sort">
              <IconSort />
              <span>
                Sort by: <strong>{sort === 'latest' ? 'Latest' : 'Oldest'}</strong>
              </span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </label>
            <span className="list-count">{visible.length} showing</span>
          </div>
        </div>

        <div className="log-list">
          {visible.length === 0 ? (
            <div className="empty">
              <p className="eyebrow">Empty</p>
              <h2>
                {items.length === 0
                  ? 'Nothing in the log yet.'
                  : 'Everything here is inactive.'}
              </h2>
              <p>
                {items.length === 0
                  ? 'Add the first call.'
                  : 'Uncheck the filter to see the old ones.'}
              </p>
            </div>
          ) : (
            visible.map((item) => (
              <Entry
                key={item.id}
                item={item}
                open={openId === item.id}
                onToggle={() =>
                  setOpenId((current) => (current === item.id ? null : item.id))
                }
                onSetInactive={() => setStatus(item.id, 'inactive')}
                onSetActive={() => setStatus(item.id, 'active')}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
