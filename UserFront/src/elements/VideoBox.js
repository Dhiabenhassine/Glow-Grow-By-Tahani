import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from "../constants/theme"

const VideoBox = () => {
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef(null)

  // 🔒 Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause() // stop video when closing
    }
    setIsOpen(false)
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-6 col-lg-7 col-md-8 wow fadeInUp" data-wow-delay="0.2s">
          <h2 className="text-white title mb-4">
            It's Not <br /> <span className="text-primary">Fitness</span> it's Life
          </h2>
          <Link to="/contact-us" className="btn btn-primary btn-skew">
            <span>Join Now</span>
          </Link>
        </div>

        <div
          className="col-xl-6 col-lg-5 col-md-4 d-flex justify-content-center align-items-center wow fadeInUp"
          data-wow-delay="0.4s"
        >
          {/* Play Button */}
          <Link onClick={() => setIsOpen(true)} className="popup-video-btn" to="#">
            <span className="video-btn style-2 position-static">
              <i className="fa fa-play"></i>
            </span>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="video-modal">
          <div className="video-overlay" onClick={handleClose}></div>

          <div className="video-wrapper">
            <video
              ref={videoRef}
              controls
              autoPlay
              className="original-video"
            >
              <source src={IMAGES.BgVideo1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Inline Responsive CSS */}
      <style jsx>{`
        /* --- Modal container --- */
        .video-modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          background: #000; /* solid black background */
          padding: 16px;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: #000;
        }

        /* --- Wrapper keeps the video centered --- */
        .video-wrapper {
          position: relative;
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100%;
          max-height: 100%;
        }

        /* --- Video keeps its natural/original size --- */
        .original-video {
          display: block;
          height: auto;
          width: auto;
          max-width: 100%;
          max-height: 90vh; /* prevent overflow */
          background-color: #000;
          border-radius: 10px;
        }

        /* --- Play button --- */
        .video-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: #ff3c00;
          color: #fff93dff;
          border-radius: 50%;
          font-size: 30px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 20px rgba(255, 60, 0, 0.6);
        }

        .video-btn:hover {
          transform: scale(1.1);
          background: #ff6600;
        }

        /* --- Mobile adjustments --- */
        @media (max-width: 768px) {
          .video-btn {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }

          .original-video {
            max-height: 80vh;
            width: 100%;
            height: auto;
          }
        }

        @media (max-width: 480px) {
          .video-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      `}</style>
    </>
  )
}

export default VideoBox
