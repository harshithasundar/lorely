import { useState } from 'react'
import { useLorely } from '../../hooks/useLorely'

function ProgressBar({ current, total }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div className="mt-3">
      <div className="mb-1.5 flex justify-between text-xs text-slate-500">
        <span>
          {current} / {total} pages
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function LogPagesForm({ book, onLog }) {
  const [pages, setPages] = useState('')
  const remaining = book.totalPages - book.pagesRead

  function handleSubmit(e) {
    e.preventDefault()
    const value = parseInt(pages, 10)
    if (!value || value <= 0) return
    onLog(Math.min(value, remaining))
    setPages('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
      <input
        type="number"
        min="1"
        max={remaining}
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        placeholder="Pages read"
        className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      <button
        type="submit"
        disabled={!pages || parseInt(pages, 10) <= 0}
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40"
      >
        Log
      </button>
    </form>
  )
}

function BookListItem({ book, variant, onStart, onLog, onFinish }) {
  return (
    <li className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition-colors hover:border-slate-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">{book.title}</h3>
          <p className="text-sm text-slate-400">{book.author}</p>
          <span className="mt-2 inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
            {book.genre}
          </span>
        </div>
        {variant === 'finished' && (
          <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            Done
          </span>
        )}
      </div>

      {variant === 'reading' && (
        <>
          <ProgressBar current={book.pagesRead} total={book.totalPages} />
          <LogPagesForm book={book} onLog={(p) => onLog(book.id, p)} />
          {book.pagesRead < book.totalPages && (
            <button
              type="button"
              onClick={() => onFinish(book.id)}
              className="mt-2 text-xs font-medium text-purple-400 hover:text-purple-300"
            >
              Mark as finished
            </button>
          )}
        </>
      )}

      {variant === 'want' && (
        <button
          type="button"
          onClick={() => onStart(book.id)}
          className="mt-3 w-full rounded-xl border border-purple-500/30 bg-purple-500/10 py-2 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-500/20"
        >
          Start Reading
        </button>
      )}
    </li>
  )
}

function EmptyTab({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/80">
        <svg
          className="h-8 w-8 text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      </div>
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  )
}

const TABS = [
  { id: 'want-to-read', label: 'Want to Read' },
  { id: 'currently-reading', label: 'Reading' },
  { id: 'finished', label: 'Finished' },
]

export default function LibraryView() {
  const [activeTab, setActiveTab] = useState('want-to-read')
  const {
    wantToRead,
    currentlyReading,
    finished,
    startReading,
    logPages,
    markFinished,
  } = useLorely()

  const tabBooks = {
    'want-to-read': wantToRead,
    'currently-reading': currentlyReading,
    finished,
  }

  const emptyMessages = {
    'want-to-read': 'Swipe right on books in Discover to add them here.',
    'currently-reading': 'Start a book from your Want to Read list.',
    finished: 'Finish a book to see it celebrated here.',
  }

  const books = Array.isArray(tabBooks[activeTab])
  ? tabBooks[activeTab]
  : []

  console.log("activeTab:", activeTab)
console.log("tabBooks:", tabBooks)
console.log("books:", books)
console.log("books length:", books.length)

  return (
    <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">Library</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your personal bookshelf</p>
      </header>

      <div className="mb-4 flex rounded-2xl bg-slate-900/80 p-1 ring-1 ring-slate-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            <span className="ml-1 opacity-70">({tabBooks[tab.id].length})</span>
          </button>
        ))}
      </div>

      {books.length === 0 ? (
        <EmptyTab message={emptyMessages[activeTab]} />
      ) : (
        <ul className="flex flex-col gap-3">
          {books.map((book) => (
            <BookListItem
              key={book.id}
              book={book}
              variant={
                activeTab === 'want-to-read'
                  ? 'want'
                  : activeTab === 'currently-reading'
                    ? 'reading'
                    : 'finished'
              }
              onStart={startReading}
              onLog={logPages}
              onFinish={markFinished}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
