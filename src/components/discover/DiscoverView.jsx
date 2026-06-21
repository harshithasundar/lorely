import BookSearch from './BookSearch'
 import { useState } from 'react'
import { useLorely } from '../../hooks/useLorely'
import BookCard from './BookCard'
import EmptyDiscover from './EmptyDiscover'

export default function DiscoverView() {
  const { discoverBooks, addToWantToRead, skipBook } = useLorely()
  const [animating, setAnimating] = useState(null)

  const currentBook = discoverBooks[0]

  function handleAction(action) {
    if (!currentBook || animating) return
    setAnimating(action)
    setTimeout(() => {
      if (action === 'skip') skipBook(currentBook.id)
      else addToWantToRead(currentBook.id)
      setAnimating(null)
    }, 280)
  }

  if (!currentBook) {
    return <EmptyDiscover />
  }

  return (
    <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="gradient-text">Discover</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {discoverBooks.length} book{discoverBooks.length !== 1 ? 's' : ''}{' '}
          left to explore
        </p>
      </header>
      
      <BookSearch />

      <div
        className={`mb-6 flex-1 transition-all duration-300 ease-out ${
          animating === 'skip'
            ? '-translate-x-8 -rotate-6 opacity-0'
            : animating === 'want'
              ? 'translate-x-8 rotate-6 opacity-0'
              : 'translate-x-0 rotate-0 opacity-100'
        }`}
      >
        <BookCard book={currentBook} />
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => handleAction('skip')}
          disabled={!!animating}
          className="group flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900/80 shadow-lg transition-all hover:border-rose-500/50 hover:bg-rose-500/10 active:scale-95 disabled:opacity-50"
          aria-label="Skip book"
        >
          <svg
            className="h-7 w-7 text-rose-400 transition-transform group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => handleAction('want')}
          disabled={!!animating}
          className="group flex h-20 w-20 items-center justify-center rounded-full border-2 border-purple-500/50 bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/25 transition-all hover:from-indigo-500 hover:to-purple-500 active:scale-95 disabled:opacity-50"
          aria-label="Want to read"
        >
          <svg
            className="h-9 w-9 text-white transition-transform group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-8 text-xs font-medium text-slate-500">
        <span>Skip</span>
        <span>Want to Read</span>
      </div>
    </div>
  )
}
