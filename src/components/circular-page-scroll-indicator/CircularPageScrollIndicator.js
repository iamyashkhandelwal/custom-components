import { useEffect, useRef } from "react";
import "./CircularPageScrollIndicator.css";

export const CircularPageScrollIndicator = () => {
  const progressBarRef = useRef(null);
  const progressPercentRef = useRef(null);
  function updateScrollProgress() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    const progressBarFill = progressBarRef?.current;
    progressBarFill.style.background = `conic-gradient(#007bff ${scrollProgress}%, #deeff5 ${scrollProgress}%)`;

    const progressPercent = progressPercentRef.current;
    progressPercent.innerText = `${Math.round(scrollProgress)}%`;
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div ref={progressBarRef} id="circular-progress-bar">
      <span ref={progressPercentRef} id="inner-circle">
        0%
      </span>
    </div>
  );
};
