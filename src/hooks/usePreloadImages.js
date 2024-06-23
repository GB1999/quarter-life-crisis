import { useState, useEffect } from 'react';

const usePreloadImages = (imageUrls) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let imagesLoaded = 0;
        const imageLoadHandler = () => {
            imagesLoaded += 1;
            if (imagesLoaded === imageUrls.length) {
                setLoaded(true);
            }
        };

        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
            img.onload = imageLoadHandler;
            img.onerror = imageLoadHandler;
        });
    }, [imageUrls]);

    return loaded;
};

export default usePreloadImages;