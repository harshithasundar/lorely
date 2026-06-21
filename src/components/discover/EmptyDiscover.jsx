export default function EmptyDiscover() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-purple-500/30">
        <svg
          className="h-12 w-12 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-2xl font-bold text-white">All caught up!</h2>
      <p className="max-w-xs text-sm leading-relaxed text-slate-400">
        You&apos;ve swiped through every book in your discover queue. Check your
        library to start reading or come back later for new picks.
      </p>
    </div>
  )
}
