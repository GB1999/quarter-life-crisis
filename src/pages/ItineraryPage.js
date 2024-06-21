import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, useViewportScroll, AnimatePresence } from 'framer-motion';
import useOnScreen from '../hooks/useOnScreen';
import useWindowSize from '../hooks/useWindowSize';

const ItineraryItem = ({ title, startTime, endTime, imageSrc, imagePosition }) => {
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
      className={`itinerary-item ${imagePosition}`}
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
    <div style={{ position: 'relative', height: '200vh', width: '100%' }}>
      <div className="itinerary-background"></div>

      <motion.div className="itinerary-container" style={{
        backgroundImage: 'url(images/scratches.png)',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
        mixBlendMode: 'lighten',
      }} animate={controls}> 
     <EventDetails></EventDetails>
        <div className="itinerary-container-title">
          <p>ITINERARY</p>
        </div>
        <div className='itinerary-list'>
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
          imagePosition="right"
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
          imagePosition="left"
        />
        </div>
        
        <div className='divider'></div>
        <RSVPButton onClick={toggleModal} />
      </motion.div>

      <RSVPModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};


const EventDetails = () => {
  return (
    <div className="event-details-container">
      <div className="event-details">
        <div className="date">July 20th, 2024</div>
        <div className="time">8:00 PM - 11:00 PM</div>
        <div className="dress-code">Dress Code: Cocktail</div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0868396343423!2d144.96316!3d-37.8136119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ceed2!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1648797356123!5m2!1sen!2sus"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Event Location"
        ></iframe>
      </div>
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
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" name="firstName" />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" name="lastName" />
            </div>
            <div className="form-group">
              <label>Will you be attending?</label>
              <select name="attendance">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>
              Bringing a plus one
                <input type="checkbox" name="plusOne" />
                
              </label>
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
            <div className="form-group">
              <button type="button" onClick={toggleModal}>Cancel</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);


export default ItineraryPage;
