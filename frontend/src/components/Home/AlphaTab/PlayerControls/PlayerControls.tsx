import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faPlay, faHourglassHalf, faEdit, faRetweet, faPrint, faSearch } from '@fortawesome/free-solid-svg-icons';
import './PlayerControls.css';

interface PlayerControlsProps {
    title: string;
    artist: string;
    playPause: () => void;
}


//* pass in alphaTab api to enable functionality
const PlayerControls: React.FC<PlayerControlsProps> = ({ title, artist, playPause }) => {
    //* add functionality here

    return (
        <div className="at-controls">
            <div className='at-controls-left'>
                <a className='btn at-player-stop disabled'>
                    <FontAwesomeIcon icon={faStepBackward} />
                </a>
                <a onClick={() => playPause()} className='btn at-player-play-pause disabled'>
                    <FontAwesomeIcon icon={faPlay} />
                </a>
                <span className='at-player-progress'>0%</span>
                <div className="at-song-info">
                    <span className="at-song-title">{title}</span> -
                    <span className="at-song-artist">{artist}</span>
                </div>
                <div className="at-song-position">00:00 / 00:00</div>
            </div>
            <div className="at-controls-right">
                    <a className="btn toggle at-count-in">
                        <FontAwesomeIcon className='fa' icon={faHourglassHalf} />
                    </a>
                    <a className="btn at-metronome">
                        <FontAwesomeIcon className='fa' icon={faEdit} />
                    </a>
                    <a className="btn at-loop">
                        <FontAwesomeIcon className='fa' icon={faRetweet} />
                    </a>
                    <a className="btn at-print">
                        <FontAwesomeIcon className='fa' icon={faPrint} />
                    </a>
                    <div className="at-zoom">
                        <FontAwesomeIcon icon={faSearch} />
                        <select defaultValue={'100%'}>
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
                    </div>
                </div>
        </div>
    )
}

export default PlayerControls;