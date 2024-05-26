import { useState, useEffect, useRef } from 'react';
import { AlphaTabApi, Settings } from '@coderline/alphatab';
import './Home.css';

import ElectricRed from '../../testTab/ElectricRed.gp5';
import Altitudes from '../../testTab/Altitudes.gp5';
import InDeathIsDeath from '../../testTab/in_death_is_death.gp5';
import whirlTHIS from '../../testTab/whirlTHIS.gp5';


export default function Home() {
    const elementRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<AlphaTabApi>();

    useEffect(() => {
        const api = new AlphaTabApi(elementRef.current!, {
        core: {
            file: whirlTHIS,
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
    }, []);

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