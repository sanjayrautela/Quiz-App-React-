import React, { useEffect, useState } from 'react';

function FullScreenBlocker({ children }) {
    const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement != null);

    const handleFullScreen = () => {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement != null);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);

    return (
        <div>
            {!isFullScreen && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={handleFullScreen} style={{ padding: '10px', fontSize: '16px' }}>
                        Click to Enter Full Screen
                    </button>
                </div>
            )}
            {isFullScreen ? children : <p>Please enter full screen to continue the quiz.</p>}
        </div>
    );
}

export default FullScreenBlocker;
