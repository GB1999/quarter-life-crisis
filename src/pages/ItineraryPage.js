import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import useOnScreen from '../hooks/useOnScreen';
import usePreloadImages from '../hooks/usePreloadImages';
import useFrameAnimation from '../hooks/useFrameAnimation';
import { submitRsvp } from '../firebase'; // Import the submitRsvp function
import { generateImageUrls, getLoopedFrame, getFramePath } from '../utils/animationUtil';


// import useWindowSize from '../hooks/useWindowSize';

const FRAME_RATE = 300; // Frame rate in milliseconds (500 ms = 0.5 seconds)
const basePath = 'images';

const ItineraryItem = ({ title, startTime, endTime, imageSrc, imagePosition }) => {
  const ref = useRef();
  const isVisible = useOnScreen(ref);
  // const windowSize = useWindowSize();
  // const isMobile = windowSize.width <= 768;
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
    <div style={{ position: 'relative', height: 'auto', width: '100%' }}>
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
            startTime="8:00 PM"
            endTime="9:00 PM"
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
        <iframe title="google-map-directions" width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=321%20West%20Ben%20White,%20106A,%20Austin,%20TX%2078704+(PhotoGroup)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
        </iframe></div>
    </div>
  );
};

const RSVPModal = ({ isModalOpen, toggleModal }) => {
  const rsvpSequence = { name: 'torn-background-sequence', start: 1, end: 3 };
  const [currentFrame, setCurrentFrame] = useState(0);
  const imageUrls = generateImageUrls(basePath, rsvpSequence.name, rsvpSequence.start, rsvpSequence.end);

  const loaded = usePreloadImages(imageUrls);
  useFrameAnimation(FRAME_RATE, setCurrentFrame);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [plusOne, setPlusOne] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const rsvpData = {
      firstName: firstName,
      lastName: lastName,
      attendence: attendance,
      plusOne: plusOne,
    };

    try {
      await submitRsvp(rsvpData);
      setLoading(false);
      toggleModal();
    } catch (err) {
      console.log(err);
      setError('Failed to submit RSVP. Please try again.');
      setLoading(false);
    }
  };

  const rsvpFrame = getLoopedFrame(currentFrame, 3, 0, 0);

  if (!loaded) {
    return <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  }

  return (
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
            <motion.img
              src={getFramePath('rsvp-sequence', rsvpFrame)}
              alt="RSVP"
              className="subtitle"
            />
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name:</label>
                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Will you be attending?</label>
                <select
                  name="attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="form-group label-checkbox">
                <label>Bringing a plus one</label>
                <input
                  type="checkbox"
                  name="plusOne"
                  checked={plusOne}
                  onChange={(e) => setPlusOne(e.target.checked)}
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


export default ItineraryPage;
