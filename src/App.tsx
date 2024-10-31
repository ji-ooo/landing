import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import forestBackground from './assets/6202160.jpg';
import ttubeotLogo from './assets/ttubeot.png';

function App() {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const scaleValues = {
    section0: 1,
    section1: 1.2,
    section2: 1.4,
    section3: 1.6,
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-id');
          if (sectionId) {
            const newScale =
              scaleValues[`section${sectionId}` as keyof typeof scaleValues];
            if (newScale) {
              setScale(newScale);
            }
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const backgroundElement = document.querySelector(
      '.backgroundContainer',
    ) as HTMLDivElement;
    if (backgroundElement) {
      backgroundElement.style.transform = `scale(${scale})`;
    }
  }, [scale]);

  useEffect(() => {
    const landingElement = document.querySelector('.landing') as HTMLDivElement;
    if (landingElement) {
      landingElement.style.backgroundColor = isModalOpen ? 'black' : 'white';
    }
  }, [isModalOpen]);

  return (
    <div className="landing">
      <div className="backgroundContainer">
        <img src={forestBackground} alt="forest background" />
      </div>
      <div className="ttubeotLogoContainer">
        <img src={ttubeotLogo} alt="ttubeot logo" className="ttubeotLogo" />
      </div>
      <div className="contentWrapper" ref={contentWrapperRef}>
        <div className="content">
          <div className="section" data-id="0"></div>
          <div className="section" data-id="1"></div>
          <div className="section" data-id="2"></div>
          <div className="section" data-id="3"></div>
        </div>
      </div>
      {isModalOpen && (
        <div className="uccModal">
          <div className="uccTitle">ucc 타이틀</div>
          <div className="ucc">ucc 올자리</div>
          <button className="closeButton" onClick={() => setIsModalOpen(false)}>
            X
          </button>
        </div>
      )}
      <div className="buttonContainer">
        <button onClick={() => setIsModalOpen(true)}>영상 on</button>
        <button onClick={() => console.log(2)}>게임 다운로드</button>
      </div>
    </div>
  );
}

export default App;

