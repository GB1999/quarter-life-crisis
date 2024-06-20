import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useViewportScroll } from 'framer-motion';
import useOnScreen from '../hooks/useOnScreen';
import useWindowSize from '../hooks/useWindowSize';


const ItineraryItem = ({ title, startTime, endTime, imageSrc, parallaxY }) => {
    const ref = useRef();
    const isVisible = useOnScreen(ref);
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 768;
    const controls = useAnimation();

    useEffect(() => {
      const jitter = async () => {
        while (true) {
          await controls.start({
            x: Math.random() * 10 - 5, // Jitter range between -5 and 5 pixels
            y: Math.random() * 10 - 5, // Jitter range between -5 and 5 pixels
            rotate: Math.random() * 10 - 5, // Jitter range between -5 and 5 degrees
            transition: { duration: 0.01, ease: "linear" } // Adjust duration for speed
          });
          await new Promise(resolve => setTimeout(resolve, 300)); // Adjust delay for frame rate
        }
      };
  
      jitter();
    }, [controls]);
  

    return (
      <motion.div
        ref={ref}
        className="itinerary-item"
        style={{
          scale: isVisible ? 1.1 : 1, // Scale up when the item is in view
          backgroundColor: '#F3E7EF;' // Highlight when in view
        }}
      >
     
            <div className="itinerary-details">
            <motion.div  animate={controls} className="itinerary-image-container">
              <img src={imageSrc} alt={title} className="child-image"/>
            </motion.div>
              <div className="itinerary-times">
                <p>{startTime}</p>
                <div className="divider"></div>
                <p>{endTime}</p>
              </div>

            </div>
            
          
      
        
      </motion.div>
      
    );
  };

const ItineraryPage = () => {
  const { scrollY } = useViewportScroll();
  const y = useMotionValue(scrollY);
  const parallaxY = useTransform(y, [0, 1], [0, -50]);


  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <div className="itinerary-background"></div>
      <div className="grain-overlay" style={{
            backgroundImage: 'url(../../images/grain.jpg)',
            backgroundPosition: 'bottom',
            backgroundSize: 'fill',
            mixBlendMode: 'soft-light',
          }}></div>
    <div className="itinerary-container" >
       
        <div className='itinerary-container-title'>
            <h1>ITINERARY</h1>
        </div>
      
      <ItineraryItem
        title="Music Video"
        startTime="1:00 PM"
        endTime="5:00 PM"
        imageSrc="../../images/group_pic.JPG"
        parallaxY={parallaxY}
      />
      
      <ItineraryItem
        title="Ride On Yaht"
        startTime="1:00 PM"
        endTime="5:00 PM"
        imageSrc="../../images/yacht.webp"
        parallaxY={parallaxY}
      />
      <ItineraryItem
        title="PreGame & Barbecue"
        startTime="6:00 PM"
        endTime="10:00 PM"
        imageSrc="../../images/ramen.png"
        parallaxY={parallaxY}
      />
         <ItineraryItem
        title="LateNite at Barb's"
        startTime="10:00 PM"
        endTime="2:00 AM"
        imageSrc="../../images/barbs.png"
        parallaxY={parallaxY}
      />
    </div>
  </div>
  );
};

export default ItineraryPage;
