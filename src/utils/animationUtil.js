
export const generateImageUrls = (basePath, sequenceName, startFrame, endFrame, fileExtension = 'png') => {
    const urls = [];
    for (let i = startFrame; i <= endFrame; i++) {
        const url = `${basePath}/${sequenceName}/${sequenceName}_${i}.${fileExtension}`;
        urls.push(url);
    }
    return urls;
};

//use relative paths
export const getFramePath = (sequenceName, frameNumber) => {
    return `images/${sequenceName}/${sequenceName}_${frameNumber}.png`;
};

export const getLoopedFrame = (currentFrame, totalFrames, loopFrames, delayFrames = 0) => {
    const adjustedFrame = currentFrame - delayFrames;
    if (adjustedFrame < 0) {
        return null; // Indicate the frame should not be shown
    }

    if (loopFrames === 0) {
        return (adjustedFrame % totalFrames) + 1;
    }

    if (adjustedFrame >= totalFrames - loopFrames) {
        return (adjustedFrame % loopFrames) + (totalFrames - loopFrames) + 1;
    }

    return (adjustedFrame % totalFrames) + 1;
};

