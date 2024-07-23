import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faPlay, faHourglassHalf, faRetweet, faPrint, faSearch, faUserClock } from '@fortawesome/free-solid-svg-icons';
import './PlayerControls.css';
import { useEffect, useState } from 'react';
import { AlphaTabApi } from '@coderline/alphatab';

interface PlayerControlsProps {
    title: string;
    artist: string;
    playPause: () => void;
    api: AlphaTabApi;
}


//* pass in alphaTab api to enable functionality
const PlayerControls: React.FC<PlayerControlsProps> = ({ title, artist, playPause, api }) => {
    //* add functionality here
    const [countIn, setCountIn] = useState(false);
    const [metronome, setMetronome] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [formattedTime, setFormattedTime] = useState('00:00 / 00:00');


    useEffect(() => {
        const handlePlayerPositionChanged = (e: { currentTime: number; endTime: number; }) => {
            const currentSeconds = Math.floor(e.currentTime / 1000); // helps reduce number of calls to UI
            setCurrentTime(e.currentTime);
            setEndTime(e.endTime);
            setFormattedTime(`${formatDuration(e.currentTime)} / ${formatDuration(e.endTime)}`);
        }

        api.playerPositionChanged.on(handlePlayerPositionChanged)

        return () => {
            api.playerPositionChanged.off(handlePlayerPositionChanged)
        }
    },[api]);


    const toggleCountIn = () => {
        const newState = !countIn;
        setCountIn(newState);
        api.countInVolume = newState ? 1 : 0;
    }

    const toggleMetronome = () => {
        const newState = !metronome;
        setMetronome(newState);
        api.metronomeVolume = newState ? 1 : 0;
    }

    const toggleLoop = () => {
        const newState = !isLooping;
        setIsLooping(newState);
        api.isLooping = newState;
    }

    const handlePrint = () => {
        api.print();
    }

    const formatDuration = (milliseconds: number) => {
        let sec = milliseconds / 1000;
        const min = Math.floor(sec / 60);
        sec = Math.floor(sec % 60);
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }


    return (
        <div className="at-controls">
            <div className='at-controls-left'>
                <a className='btn at-player-stop disabled'>
                    <FontAwesomeIcon icon={faStepBackward} />
                </a>
                <a onClick={() => playPause()} className='btn at-player-play-pause disabled'>
                    <FontAwesomeIcon icon={faPlay} />
                </a>
                {/* <span className='at-player-progress'>0%</span> */}
                <div className="at-song-info">
                    <span className="at-song-title">{title}</span> -
                    <span className="at-song-artist">{artist}</span>
                </div>
                <div className="at-song-position">{formattedTime}</div>
            </div>
            <div className="at-controls-right">
                    <a className={`btn toggle at-count-in ${ countIn ? 'active' : ''}`}
                        onClick={toggleCountIn}>
                        <FontAwesomeIcon className='fa' icon={faHourglassHalf} />
                    </a>
                    <a className={`btn at-metronome ${ metronome ? 'active' : ''}`}
                        onClick={toggleMetronome}>
                        <FontAwesomeIcon className='fa' icon={faUserClock} />
                    </a>
                    <a className={`btn at-loop ${ isLooping ? 'active' : ''}`}
                        onClick={toggleLoop}>
                        <FontAwesomeIcon className='fa' icon={faRetweet} />
                    </a>
                    <a className="btn at-print" onClick={handlePrint}>
                        <FontAwesomeIcon className='fa' icon={faPrint} />
                    </a>
                    {/* <div className="at-zoom">
                        <FontAwesomeIcon icon={faSearch} />
                        <select>
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="90">90%</option>
                            <option selected value="100">100%</option>
                            <option value="110">110%</option>
                            <option value="125">125%</option>
                            <option value="150">150%</option>
                            <option value="200">200%</option>
                        </select>
                    </div>
                    <div className="at-layout">
                        <select>
                            <option value="horizontal">Horizontal</option>
                            <option value="page" selected>Page</option>
                        </select>
                    </div> */}
                </div>
        </div>
    )
}

export default PlayerControls;