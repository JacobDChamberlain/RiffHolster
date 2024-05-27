import React, { useEffect, useRef, useState } from 'react';
import { AlphaTabApi, Score, Track } from '@coderline/alphatab';
import './TrackSelector.css';

const TrackSelector: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<AlphaTabApi | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (mainRef.current) {
            const settings = {
                file: "https://www2.alphatab.net/files/canon.gp",
            };
            const alphaTabApi = new AlphaTabApi(mainRef.current, settings);
            setApi(alphaTabApi);

            alphaTabApi.renderStarted.on(() => {
                setLoading(true);
            });

            alphaTabApi.renderFinished.on(() => {
                setLoading(false);
            });

            alphaTabApi.scoreLoaded.on((score: Score) => {
                setTracks(score.tracks);
            });

            return () => {
                alphaTabApi.destroy();
            };
        }
    }, []);

    const handleTrackClick = (track: Track) => {
        if (api) {
            api.renderTracks([track]);
        }
    };

    return (
        <div className="at-wrap" ref={wrapperRef}>
            {loading && (
                <div className="at-overlay">
                    <div className="at-overlay-content">
                        Music sheet is loading
                    </div>
                </div>
            )}
            <div className="at-content">
                <div className="at-sidebar">
                    <div className="at-sidebar-content">
                        <div className="at-track-list">
                            {tracks.map(track => (
                                <div
                                    key={track.index}
                                    className="at-track"
                                    onClick={() => handleTrackClick(track)}
                                >
                                    <div className="at-track-icon">
                                        <i className="fas fa-guitar"></i>
                                    </div>
                                    <div className="at-track-details">
                                        <div className="at-track-name">{track.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="at-viewport">
                    <div className="at-main" ref={mainRef}></div>
                </div>
            </div>
            <div className="at-controls">
                Player controls will go here
            </div>
        </div>
    );
};

export default TrackSelector;