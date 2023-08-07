import { useEffect, useRef } from "react";
import "./LinearPageScrollBar.css";

export const LinearPageScrollBar = () => {
  const progressBarRef = useRef(null);
  function updateScrollProgress() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    const progressBarFill = progressBarRef?.current;
    progressBarFill.style.width = `${scrollProgress}%`;
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div id="progress-bar">
      <div ref={progressBarRef} id="progress-bar-fill"></div>
    </div>
  );
};
