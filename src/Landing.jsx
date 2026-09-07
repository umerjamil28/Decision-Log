import { useState } from 'react'
import { Link } from 'react-router-dom'
import Entry from './Entry.jsx'
import { IconPlus } from './Icons.jsx'
import { seed } from './seed.js'
import Topbar from './Topbar.jsx'

const sample = seed.filter((item) => item.id === 6 || item.id === 2)

export default function Landing() {
  const [openId, setOpenId] = useState(6)

  return (
    <div className="page page-home">
      <Topbar subtitle="Keep the call">
        <a
          className="text-link"
          href="#how"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          See an entry
        </a>
        <Link className="btn" to="/demo">
          <IconPlus />
          Try the demo
        </Link>
      </Topbar>

      <main className="wrap tool">
        <section className="summary home-hero">
          <p className="eyebrow">For founders and product teams</p>
          <h1>Stop answering the same question every six weeks.</h1>
          <p className="hint">
            Decision Log is a thin record of the calls that keep coming back.
            What the team chose, why they chose it, and whether that still
            stands.
          </p>
          <Link className="btn" to="/demo">
            <IconPlus />
            Try the demo
          </Link>
        </section>

        <section className="contrast" id="how">
          <article>
            <p className="eyebrow">Without a log</p>
            <h2>The story lives in one person&apos;s head.</h2>
            <p>
              A new hire asks why billing is weekly. Someone talks for half an
              hour. Next quarter it happens again. The rewrite comes up in
              standup and nobody can find the April note.
            </p>
          </article>
          <article>
            <p className="eyebrow">With a log</p>
            <h2>They read the entry. The talk is over.</h2>
            <p>
              The weekly-billing call is dated and still marked active. The
              April rewrite is still marked active. You skip the long
              explanation and get back to the work.
            </p>
          </article>
        </section>

        <p className="list-head">
          <span>The whole product is one of these</span>
          <span className="list-count">Open a row</span>
        </p>
        <div className="log-list home-log">
          {sample.map((item) => (
            <Entry
              key={item.id}
              item={item}
              open={openId === item.id}
              onToggle={() =>
                setOpenId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </div>

        <section className="facts">
          <div>
            <span>What</span>
            <strong>The call, in one sentence.</strong>
            <p>Not the meeting. The decision.</p>
          </div>
          <div>
            <span>Why</span>
            <strong>The reason that dies in standup.</strong>
            <p>Write it while it is still true.</p>
          </div>
          <div>
            <span>When</span>
            <strong>A real date.</strong>
            <p>So you know how old the argument is.</p>
          </div>
          <div>
            <span>Status</span>
            <strong>Active or inactive.</strong>
            <p>Do not delete it. Cross it.</p>
          </div>
        </section>

        <section className="close">
          <div>
            <h2>Write one down before the next meeting eats it.</h2>
            <p>
              New people get last quarter without a two-hour sit-down. You stop
              being the only one who remembers why the hard option won.
            </p>
          </div>
          <Link className="btn" to="/demo">
            <IconPlus />
            Open the demo
          </Link>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <span>Decision Log</span>
          <Link className="text-link" to="/demo">
            Try the demo
          </Link>
        </div>
      </footer>
    </div>
  )
}
