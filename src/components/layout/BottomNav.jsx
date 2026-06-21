const NAV_ITEMS = [
  {
    id: 'discover',
    label: 'Discover',
    icon: (active) => (
      <svg
        className={`h-6 w-6 ${active ? 'text-purple-400' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={active ? 2.5 : 1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.732-3.553"
        />
      </svg>
    ),
  },
  {
    id: 'library',
    label: 'Library',
    icon: (active) => (
      <svg
        className={`h-6 w-6 ${active ? 'text-purple-400' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={active ? 2.5 : 1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: (active) => (
      <svg
        className={`h-6 w-6 ${active ? 'text-purple-400' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={active ? 2.5 : 1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
]

export default function BottomNav({ activeView, onNavigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl safe-bottom">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-2 pt-2">
        {NAV_ITEMS.map(({ id, label, icon }) => {
          const active = activeView === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-200 ${
                active
                  ? 'bg-purple-500/10 text-purple-300'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {icon(active)}
              <span
                className={`text-xs font-medium ${active ? 'text-purple-300' : ''}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
