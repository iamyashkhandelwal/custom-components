import { useEffect, useState } from "react";
import "./pagination.css";
import PropTypes from 'prop-types'

const Pagination = ({ count, defaultPage = 1, onChange }) => {
  // console.log(
  //   " nsd -- ",
  //   Array.from({ length: count }, (_, i) => i + 1)
  // );
  const [currentPage, setCurrentPage] = useState(
    defaultPage > count ? 1 : defaultPage
  );
  const [window, setWindow] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: count }, (_, i) => i + 1);
    if (currentPage < 5) {
      const w = arr.slice(0, 5);
      setWindow(w);
    } else if (currentPage > count - 4) {
      const w = arr.slice(-5);
      setWindow(w);
    } else {
      const w = arr.slice(currentPage - 2, currentPage + 1);
      setWindow(w);
    }
    onChange?.(currentPage);
  }, [currentPage]);

  console.log("window -- ", window);

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <button disabled={currentPage === 1} onClick={handlePrev}>
        {"<"}
      </button>
      {/* {Array.from({ length: count }, (_, i) => i + 1).map((ele) => (
        <button
          className={`${currentPage === ele ? "selectedBtn" : ""}`}
          onClick={() => setCurrentPage(ele)}
        >
          {ele}
        </button>
      ))} */}
      {!window.includes(1) && (
        <>
          <button
            className={`${currentPage === 1 ? "selectedBtn" : ""}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <span className="dots">...</span>
        </>
      )}
      {window.map((ele, idx) => (
        <button
          key={idx}
          className={`${currentPage === ele ? "selectedBtn" : ""}`}
          onClick={() => setCurrentPage(ele)}
        >
          {ele}
        </button>
      ))}
      {!window.includes(count) && (
        <>
          <span className="dots">...</span>
          <button
            className={`${currentPage === count ? "selectedBtn" : ""}`}
            onClick={() => setCurrentPage(count)}
          >
            {count}
          </button>
        </>
      )}
      <button disabled={currentPage === count} onClick={handleNext}>
        {">"}
      </button>
    </>
  );
};

Pagination.defaultProps = {
  defaultPage: 1,
}

Pagination.propType = {
  count: PropTypes.number.isRequired,
  defaultPage: PropTypes.number,
  onChange: PropTypes.func,
}

export default Pagination;
