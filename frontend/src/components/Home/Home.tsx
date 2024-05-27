import { useState, useEffect, useRef } from 'react';
import { AlphaTabApi, Settings } from '@coderline/alphatab';
import useUser from '../App/useUser';
import './Home.css';


export default function Home() {
    const elementRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<AlphaTabApi>();
    const { user } = useUser();
    const [tabFilePath, setTabFilePath] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.tabs && user.tabs.length > 0) {
            const fileURL = user.tabs[0].fileURL;
            setTabFilePath(fileURL);
            console.log('test push to main')
        }
    }, [user]);

    useEffect(() => {
        if (tabFilePath) {
            const api = new AlphaTabApi(elementRef.current!, {
                core: {
                    file: tabFilePath,
                    fontDirectory: '/font/'
                },
                player: {
                    enablePlayer: true,
                    enableCursor: true,
                    enableUserInteraction: true,
                    soundFont: '/soundfont/sonivox.sf2'
                }
                } as Settings);

                setApi( api );

                return () => {
                    console.log('destroy', elementRef)
                    api.destroy();
                }
        }
    }, [tabFilePath]);

    function playPause() {
        api?.playPause();
    }


    return(
        <div className='home-wrapper'>
            <h3>Homepage</h3>
            <h4>Here, you will find your riffs.</h4>
            <button onClick={() => playPause()}>Play/Pause</button>
            <div className='hello' ref={ elementRef }></div>
        </div>
    )
}