import React, { useState, useEffect } from 'react';
import { motion, useScroll, useAnimation, useTransform } from 'framer-motion'
import './App.css';
import usePreloadImages from './hooks/usePreloadImages';
import ItineraryPage from './pages/ItineraryPage';

const TOTAL_FRAMES = 30; // Total number of frames in your main image sequence
const TITLE_FRAMES = 4; // Total number of frames for the title sequences
const TORN_BACKGROUND_TOTAL_FRAMES = 17; // Total frames for torn background
const TORN_BACKGROUND_LOOP_FRAMES = 3; // Number of frames to loop for the torn background
const FRAME_RATE = 300; // Frame rate in milliseconds (500 ms = 0.5 seconds)
const SUBTITLE_FRAMES = 3;

const basePath = 'images';
const sequences = [
  { name: 'torn-background-sequence', start: 1, end: TORN_BACKGROUND_TOTAL_FRAMES },
  { name: 'portrait-sequence', start: 1, end: TOTAL_FRAMES },
  { name: 'title-crisis-sequence', start: 1, end: TITLE_FRAMES },
  { name: 'title-quarter-sequence', start: 1, end: TITLE_FRAMES },
  { name: 'title-life-sequence', start: 1, end: TITLE_FRAMES },
  { name: 'subtitle-birthday-sequence', start: 1, end: 3 },
  // Add more sequences as needed
];

const generateImageUrls = (basePath, sequenceName, startFrame, endFrame, fileExtension = 'png') => {
  const urls = [];
  for (let i = startFrame; i <= endFrame; i++) {
    const url = `${basePath}/${sequenceName}/${sequenceName}_${i}.${fileExtension}`;
    urls.push(url);
  }
  return urls;
};

//use relative paths
const getFramePath = (sequenceName, frameNumber) => {
  return `images/${sequenceName}/${sequenceName}_${frameNumber}.png`;
};

const getLoopedFrame = (currentFrame, totalFrames, loopFrames, delayFrames = 0) => {
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

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

function App() {
  // let {scrollYProgress}= useScroll();
  // let y = useTransform{scrollYProgress, }

  const isMobile = useDeviceType();

  if (!isMobile) {
    return (
      <div className="device-warning">
        I didn't have time to make a desktop version ...
      </div>)
  }
  return (

    <div >
      <HomePage />
      <ItineraryPage />

    </div>
  );
}

function HomePage() {
  const imageUrls = sequences.flatMap(sequence =>
    generateImageUrls(basePath, sequence.name, sequence.start, sequence.end)
  );
  const loaded = usePreloadImages(imageUrls);

  const [currentFrame, setCurrentFrame] = useState(0);
  const { scrollYProgress } = useScroll();
  const xTransform = useTransform(scrollYProgress, [0, 1], [0, 1500])
  const xTransformleft = useTransform(scrollYProgress, [0, 1], [0, -1500])

  const controls = useAnimation();

  useEffect(() => {
    const jitter = async () => {
      while (true) {
        await controls.start({
          backgroundPosition: `${Math.random() * 400 - 200}px ${Math.random() * 400 - 200}px`,

          transition: { duration: 0.01, ease: "linear" } // Adjust duration for speed
        });
        await new Promise(resolve => setTimeout(resolve, 300)); // Adjust delay for frame rate
      }
    };

    jitter();
  }, [controls]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1));
    }, FRAME_RATE);

    return () => clearInterval(interval);
  }, []);

  const portraitFrame = getLoopedFrame(currentFrame, TOTAL_FRAMES, 4, TORN_BACKGROUND_TOTAL_FRAMES + 2);
  const quarterTitleFrame = getLoopedFrame(currentFrame, TITLE_FRAMES, 0, TORN_BACKGROUND_TOTAL_FRAMES + 2);
  const lifeTitleFrame = getLoopedFrame(currentFrame, TITLE_FRAMES, 0, TORN_BACKGROUND_TOTAL_FRAMES + 4);
  const crisisTitleFrame = getLoopedFrame(currentFrame, TITLE_FRAMES, 0, TORN_BACKGROUND_TOTAL_FRAMES + 6);
  const subtitleFrame = getLoopedFrame(currentFrame, SUBTITLE_FRAMES, 0, TORN_BACKGROUND_TOTAL_FRAMES + 8);

  if (!loaded) {
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  }

  return (
    <div className="container">
      <motion.div className="grain-overlay" style={{
        backgroundImage: 'url(images/scratches.png)',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        mixBlendMode: 'lighten',
      }} animate={controls}></motion.div>

      {portraitFrame && (
        <div className="portrait-container">
          <motion.img
            src={getFramePath('portrait-sequence', portraitFrame)}
            alt="Portrait Sequence"
            className="portrait"
          />
        </div>
      )}

      <div className="foreground">
        <motion.div className="foreground-image-wrapper">
          <img src={getFramePath('torn-background-sequence', getLoopedFrame(currentFrame, TORN_BACKGROUND_TOTAL_FRAMES, TORN_BACKGROUND_LOOP_FRAMES))} alt="Torn Background" className="foreground-image" />
        </motion.div>

        <div className="text-container">
          {quarterTitleFrame && (
            <motion.img
              src={getFramePath('title-quarter-sequence', quarterTitleFrame)}
              alt="Quarter Title"
              className="title-image title-quarter"
              style={{ left: xTransform }}
            />
          )}

          {lifeTitleFrame && (
            <motion.img
              src={getFramePath('title-life-sequence', lifeTitleFrame)}
              alt="Life Title"
              className="title-image title-life"
              style={{ left: xTransformleft }}
            />
          )}

          {crisisTitleFrame && (
            <motion.img
              src={getFramePath('title-crisis-sequence', crisisTitleFrame)}
              alt="Crisis Title"
              className="title-image title-crisis"
              style={{ left: xTransform }}
            />
          )}

          {subtitleFrame && (
            <motion.img
              src={getFramePath('subtitle-birthday-sequence', subtitleFrame)}
              alt="Sub Title"
              className="subtitle"
            />
          )}
        </div>
      </div>
    </div>
  );
};




// const textVariants = {
//   hidden: { x: '50px', opacity: 0 },
//   visible: (i) => ({
//     x: 0,
//     opacity: 1,
//     transition: {
//       delay: i * 0.5, // delay each item by 0.5 seconds
//       type: 'spring',
//       stiffness: 50,
//     },
//   }),
// };

// const AnimatedText = () => {
//   const textArray = ["I'm", 'Still', 'Standing',];

//   return (
//     <div className="animated-text-row">
//       {textArray.map((text, index) => (
//         <motion.h1
//           key={index}
//           className="italic text-white text-11xl md:text-9xl z-10 "
//           custom={index}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.5 }} // Configure viewport settings here
//           variants={textVariants}
//         >
//           {text}
//         </motion.h1>
//       ))}
//     </div>
//   );
// };


// const ImageWithRoundedCorner = () => {
//   const { scrollYProgress } = useScroll();

//   // Define opacity animation based on scroll position
//   const backgroundY = useTransform(scrollYProgress, [0, 1], ["%0", "%10"]);

//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: false }}
//       transition={{ type: 'spring', duration: 0.8, delay: 1.5 }}
//       variants={{
//         visible: { y: '0px', opacity: 1 },
//         hidden: { y: '-100px', opacity: 0 }
//       }}
//     >

//       <iframe
//         src='https://www.youtube.com/embed/ZHwVBirqD2s&ab_channel=EltonJohnVEVO'
//         frameborder='0'
//         allow='autoplay;'
//         allowfullscreen
//         title='video'
//         style={{
//           width: "100%",
//           y: backgroundY,
//           borderRadius: '20px 0 0 0' // Only the top-left corner is rounded
//         }}
//       />
//     </motion.div>
//   );
// };

export default App;
