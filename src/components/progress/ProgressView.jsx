import { useLorely } from '../../hooks/useLorely'

const GENRE_BAR_COLORS = [
  'from-indigo-500 to-purple-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-fuchsia-500',
]

function StreakCard({ streak }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-slate-900 to-slate-900 p-6">
      <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
          <svg
            className="h-9 w-9 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-1.6 2.047 10.75 10.75 0 00-1.635-2.047.75.75 0 00-1.071.136 11.214 11.214 0 00-2.506 5.986c-.375 2.044.375 4.13 2.25 5.5a.75.75 0 00.858 0c1.875-1.37 2.625-3.456 2.25-5.5a11.214 11.214 0 00-2.506-5.986z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-orange-300/80">Reading Streak</p>
          <p className="text-4xl font-extrabold tracking-tight text-white">
            {streak}
            <span className="ml-1 text-lg font-semibold text-orange-300">
              days
            </span>
          </p>
          <p className="mt-0.5 text-xs text-slate-400">Keep the flame alive!</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold text-white">{value}</p>
      {subtitle && (
        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  )
}

function GenreBreakdown({ genreCounts, maxGenreCount }) {
  const entries = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-center">
        <p className="text-sm text-slate-500">
          Finish books to unlock your genre breakdown.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Favorite Genres
      </h3>
      <div className="flex flex-col gap-4">
        {entries.map(([genre, count], index) => {
          const percent = Math.round((count / maxGenreCount) * 100)
          const color = GENRE_BAR_COLORS[index % GENRE_BAR_COLORS.length]
          return (
            <div key={genre}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">{genre}</span>
                <span className="text-slate-500">
                  {count} book{count !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WrappedBanner({ booksCompleted, totalPagesRead }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-violet-600/30 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-300">
          Your Lorely Wrapped
        </p>
        <p className="mt-2 text-2xl font-bold leading-tight text-white">
          {booksCompleted > 0
            ? `You've conquered ${booksCompleted} book${booksCompleted !== 1 ? 's' : ''} this season.`
            : 'Your reading story is just beginning.'}
        </p>
        {totalPagesRead > 0 && (
          <p className="mt-2 text-sm text-purple-200/70">
            {totalPagesRead.toLocaleString()} pages turned — and counting.
          </p>
        )}
      </div>
    </div>
  )
}

export default function ProgressView() {
  const {
    streak,
    booksCompleted,
    totalPagesRead,
    genreCounts,
    maxGenreCount,
    books,
  } = useLorely()

  const totalBooks = books.filter((b) => b.status !== 'skipped').length
  const currentlyReading = books.filter(
    (b) => b.status === 'currently-reading'
  ).length
  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-4 pt-2">
      <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">Progress</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your reading journey at a glance</p>
      </header>

      <StreakCard streak={streak} />

      <WrappedBanner
        booksCompleted={booksCompleted}
        totalPagesRead={totalPagesRead}
      />

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Books Finished"
          value={booksCompleted}
          subtitle={`of ${totalBooks} in library`}
        />
        <StatCard
          label="Pages Read"
          value={totalPagesRead.toLocaleString()}
          subtitle="lifetime total"
        />
        <StatCard
    label="Currently Reading"
    value={currentlyReading}
    subtitle="active books"
  />
      </div>

      <GenreBreakdown
        genreCounts={genreCounts}
        maxGenreCount={maxGenreCount}
      />
    </div>
  )
}
