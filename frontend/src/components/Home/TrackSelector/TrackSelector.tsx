import React, { useEffect, useRef, useState } from 'react';
import { AlphaTabApi, Score, Track, Settings } from '@coderline/alphatab';
import './TrackSelector.css';
import useUser from '../../App/useUser';

const TrackSelector: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<AlphaTabApi | null>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [tabFilePath, setTabFilePath] = useState<string | null>(null);
    const { user } = useUser();


    useEffect(() => {
        if (user && user.tabs && user.tabs.length > 0) {
            const fileURL = user.tabs[0].fileURL;
            setTabFilePath(fileURL);
        }
    }, [user]);

    // useEffect(() => {
    //     console.log(api?.score?.tracks)
    // }, [tabFilePath])

    useEffect(() => {
        if (mainRef.current) {
            // const settings = {
            //     file: "https://www2.alphatab.net/files/canon.gp",
            // };
            const alphaTabApi = new AlphaTabApi(mainRef.current, {
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
    }, [tabFilePath]);

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