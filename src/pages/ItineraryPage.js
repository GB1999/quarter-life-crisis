import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useViewportScroll, AnimatePresence } from 'framer-motion';
import useOnScreen from '../hooks/useOnScreen';
import useWindowSize from '../hooks/useWindowSize';

const ItineraryItem = ({ title, startTime, endTime, imageSrc }) => {
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
        
      }}
    >
      <div className="itinerary-details">
        <motion.div animate={controls} className="itinerary-image-container">
          <img src={imageSrc} alt={title} className="child-image" />
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

const RSVPButton = ({ onClick }) => (
  <div className="rsvp-container">
    <motion.button
      className="rsvp-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      RSVP
    </motion.button>
  </div>
);

const ItineraryPage = () => {
  const { scrollY } = useViewportScroll();
  const y = useMotionValue(scrollY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log("OPEN MODAL");
  };

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

  return (
    <div style={{ position: 'relative', height: '300vh', width: '100vw' }}>
      <div className="itinerary-background"></div>
      <motion.div className="grain-overlay" style={{
        backgroundImage: 'url(images/scratches.png)',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        mixBlendMode: 'lighten',
      }} animate={controls}></motion.div>
      <div className="itinerary-container">
        <div className="itinerary-container-title">
          <h1>ITINERARY</h1>
        </div>

        <ItineraryItem
          title="Music Video"
          startTime="1:00 PM"
          endTime="5:00 PM"
          imageSrc="images/group_pic.JPG"
        />

        <ItineraryItem
          title="Ride On Yaht"
          startTime="1:00 PM"
          endTime="5:00 PM"
          imageSrc="images/photography.png"
        />

        <ItineraryItem
          title="PreGame & Barbecue"
          startTime="6:00 PM"
          endTime="10:00 PM"
          imageSrc="images/ramen.png"
        />

        <ItineraryItem
          title="LateNite at Barb's"
          startTime="10:00 PM"
          endTime="2:00 AM"
          imageSrc="images/barbs.png"
        />
        <div className='divider'></div>
        <RSVPButton onClick={toggleModal} />
      </div>

      <RSVPModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

const RSVPModal = ({ isModalOpen, toggleModal }) => (
  <AnimatePresence>
    {isModalOpen && (
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2>RSVP</h2>
          <form>
            <label>
              First Name:
              <input type="text" name="firstName" />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" />
            </label>
            <label>
              Will you be attending?
              <select name="attendance">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <label>
              <input type="checkbox" name="plusOne" />
              Bringing a plus one
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={toggleModal}>Cancel</button>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ItineraryPage;
