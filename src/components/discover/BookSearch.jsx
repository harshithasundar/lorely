import { useState } from 'react'
import { useLorely } from '../../hooks/useLorely'

export default function BookSearch() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])

  const { addBook } = useLorely()

  async function searchBooks() {
    if (!query.trim()) return

    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    )

    const data = await res.json()

    setBooks(data.docs || [])
  }

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-1 rounded-xl bg-slate-900 p-3 text-white"
        />

        <button
          onClick={searchBooks}
          className="rounded-xl bg-purple-600 px-4 text-white"
        >
          Search
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {books.map((book) => (
          <div
            key={book.key}
            className="rounded-xl border border-slate-800 p-3"
          >
            <h3 className="font-bold text-white">
              {book.title}
            </h3>

            <p className="text-sm text-slate-400">
              {book.author_name?.join(', ')}
            </p>

            <button
              onClick={() =>
                addBook({
                  id: crypto.randomUUID(),
                  title: book.title,
                  author: book.author_name?.[0] || 'Unknown',
                  genre: book.subject?.[0] || 'General',
                  hook: 'Added from search',
                  status: 'want-to-read',
                  pagesRead: 0,
                  totalPages: 300,
                })
              }
              className="mt-3 rounded-lg bg-purple-600 px-3 py-2 text-sm text-white"
            >
              Add to Library
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}