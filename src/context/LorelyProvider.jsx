import { useEffect, useMemo, useReducer } from 'react'
import { INITIAL_BOOKS, INITIAL_STREAK } from '../data/initialBooks'
import { loadState, saveState } from '../utils/storage'
import { LorelyContext } from './contextStore'

const ACTIONS = {
  SKIP_BOOK: 'SKIP_BOOK',
  WANT_TO_READ: 'WANT_TO_READ',
  START_READING: 'START_READING',
  LOG_PAGES: 'LOG_PAGES',
  MARK_FINISHED: 'MARK_FINISHED',
  ADD_BOOK: 'ADD_BOOK',
}

function createInitialState() {
  const saved = loadState()
  if (saved?.books?.length) {
    return {
      books: saved.books,
      streak: saved.streak ?? INITIAL_STREAK,
    }
  }
  return {
    books: INITIAL_BOOKS,
    streak: INITIAL_STREAK,
  }
}

function lorelyReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SKIP_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload
            ? { ...book, status: 'skipped' }
            : book,
        ),
      }

    case ACTIONS.WANT_TO_READ:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload
            ? { ...book, status: 'want-to-read' }
            : book,
        ),
      }

    case ACTIONS.START_READING:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload
            ? { ...book, status: 'currently-reading' }
            : book,
        ),
      }

    case ACTIONS.LOG_PAGES: {
      const { bookId, pages } = action.payload
      return {
        ...state,
        books: state.books.map((book) => {
          if (book.id !== bookId) return book
          const pagesRead = Math.min(
            book.pagesRead + pages,
            book.totalPages,
          )
          const status =
            pagesRead >= book.totalPages ? 'finished' : book.status
          return { ...book, pagesRead, status }
        }),
      }
    }

    case ACTIONS.MARK_FINISHED:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload
            ? {
                ...book,
                status: 'finished',
                pagesRead: book.totalPages,
              }
            : book,
        ),
      }
    
    case ACTIONS.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      }

    default:
      return state
  }
}

function buildDerived(books) {
  let discoverBooks = books.filter((b) => b.status === 'discover')

  if (discoverBooks.length === 0) {
    discoverBooks = books.filter((b) => b.status === 'skipped')
  }
  const wantToRead = books.filter((b) => b.status === 'want-to-read')
  const currentlyReading = books.filter((b) => b.status === 'currently-reading')
  const finished = books.filter((b) => b.status === 'finished')
  const totalPagesRead = books.reduce((sum, b) => sum + b.pagesRead, 0)

  const genreCounts = finished.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1
    return acc
  }, {})

  const maxGenreCount = Math.max(...Object.values(genreCounts), 1)

  return {
    discoverBooks,
    wantToRead,
    currentlyReading,
    finished,
    totalPagesRead,
    genreCounts,
    maxGenreCount,
    booksCompleted: finished.length,
  }
}

export function LorelyProvider({ children }) {
  const [state, dispatch] = useReducer(lorelyReducer, null, createInitialState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const actions = useMemo(
    () => ({
      skipBook: (id) => dispatch({ type: ACTIONS.SKIP_BOOK, payload: id }),
      addToWantToRead: (id) =>
        dispatch({ type: ACTIONS.WANT_TO_READ, payload: id }),
      startReading: (id) =>
        dispatch({ type: ACTIONS.START_READING, payload: id }),
      logPages: (bookId, pages) =>
        dispatch({ type: ACTIONS.LOG_PAGES, payload: { bookId, pages } }),
      markFinished: (id) =>
        dispatch({ type: ACTIONS.MARK_FINISHED, payload: id }),
      addBook: (book) =>
        dispatch({
          type: ACTIONS.ADD_BOOK,
          payload: book,
        }),
    }),
    [],
  )

  const derived = useMemo(() => buildDerived(state.books), [state.books])

  const value = useMemo(
    () => ({ ...state, ...derived, ...actions }),
    [state, derived, actions],
  )

  return (
    <LorelyContext.Provider value={value}>{children}</LorelyContext.Provider>
  )
}
