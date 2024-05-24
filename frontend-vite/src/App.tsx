import { useEffect, useRef, useState } from 'react'
import './App.css'
import { AlphaTabApi, Settings } from '@coderline/alphatab'
import ElectricRed from './testTab/ElectricRed.gp5'


function App() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<AlphaTabApi>();

  useEffect(() => {
    const api = new AlphaTabApi(elementRef.current!, {
      core: {
        file: ElectricRed,
        fontDirectory: '/font/'
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: '/soundfont/sonivox.sf2'
      }
    } as Settings);


    console.log('api-----> ', api)

    setApi(api);

    return () => {
      console.log('destroy', elementRef, api);
      api.destroy();
    }
  }, []);

  function playPause() {
    api?.playPause();
  }

  return (
    <div className='app-wrapper'>
      <button onClick={() => playPause()}>Play/Pause</button>
      <div ref={elementRef}></div>
    </div>
  )
}

export default App
