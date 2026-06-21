const GENRE_COLORS = {
  'Science Fiction': 'from-cyan-500/20 to-indigo-500/20 border-cyan-500/30',
  'Self-Help': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  Fiction: 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
  'Non-Fiction': 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  Thriller: 'from-rose-500/20 to-red-500/20 border-rose-500/30',
}

const GENRE_BADGE = {
  'Science Fiction': 'bg-cyan-500/15 text-cyan-300 ring-cyan-500/30',
  'Self-Help': 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  Fiction: 'bg-purple-500/15 text-purple-300 ring-purple-500/30',
  'Non-Fiction': 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  Thriller: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
}

export default function BookCard({ book }) {
  const gradient = GENRE_COLORS[book.genre] ?? 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30'
  const badge = GENRE_BADGE[book.genre] ?? 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/30'

  return (
    <article className="card-glow relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`}
      />
      <div className="relative flex min-h-[420px] flex-col p-6 sm:min-h-[460px]">
        <div className="mb-6 flex items-start justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badge}`}
          >
            {book.genre}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {book.totalPages} pages
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <h2 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {book.title}
          </h2>
          <p className="mb-6 text-base font-medium text-slate-400">
            by {book.author}
          </p>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
              AI Hook
            </p>
            <p className="text-base leading-relaxed text-slate-200">
              &ldquo;{book.hook}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
