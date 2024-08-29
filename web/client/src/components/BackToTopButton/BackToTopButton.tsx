import React, { useEffect, useState } from "react";
import "./backToTopButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import scrollObserver from "./scrollObserver";

const BackToTopButton: React.FC = () => {
  const [backToTopButton, setBackToTopButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (scrollPosition: number) => {
      setBackToTopButton(scrollPosition > scrollObserver.getThreshold());
    };

    scrollObserver.addObserver(handleScroll);

    // Clean up observer on unmount
    return () => {
      scrollObserver.removeObserver(handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <a href='#nav'>
          <button className='backtotopbutton' onClick={scrollUp}>
            <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
          </button>
        </a>
      )}
    </div>
  );
};

export default BackToTopButton;
