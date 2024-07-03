import { useEffect } from 'react';

const useFrameAnimation = (frameRate, setCurrentFrame) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => prevFrame + 1);
        }, frameRate);

        return () => clearInterval(interval);
    }, [frameRate, setCurrentFrame]);
};

export default useFrameAnimation;