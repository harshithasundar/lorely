import { useState } from 'react'
import { LorelyProvider } from './context/LorelyProvider'
import BottomNav from './components/layout/BottomNav'
import DiscoverView from './components/discover/DiscoverView'
import LibraryView from './components/library/LibraryView'
import ProgressView from './components/progress/ProgressView'

const VIEWS = {
  discover: DiscoverView,
  library: LibraryView,
  progress: ProgressView,
}

function AppContent() {
  const [activeView, setActiveView] = useState('discover')
  const View = VIEWS[activeView]

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-slate-950">
      <main className="flex flex-1 flex-col overflow-y-auto pb-24 pt-4">
        <View />
      </main>
      <BottomNav activeView={activeView} onNavigate={setActiveView} />
    </div>
  )
}

export default function App() {
  return (
    <LorelyProvider>
      <AppContent />
    </LorelyProvider>
  )
}
