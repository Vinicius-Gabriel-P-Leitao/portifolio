import { Overlay } from '@ui/layouts/overlay/overlay.object.component'
import { Scene } from '@ui/layouts/scene/scene.layout'
import type { SceneState, Section } from '@ui/types'
import { useCallback, useState } from 'react'

const App: React.FC = () => {
  const [sceneState, setSceneState] = useState<SceneState>({
    section: 'home',
    color: '#6366f1'
  })

  const handleNavigate = useCallback((section: Section) => {
    setSceneState((prev) => ({ ...prev, section }))
  }, [])

  return (
    <div className='relative w-full h-screen overflow-hidden bg-black selection:bg-indigo-500/30 selection:text-white'>
      <Scene sceneState={sceneState} />
      <Overlay section={sceneState.section} onNavigate={handleNavigate} />
    </div>
  )
}

export default App
