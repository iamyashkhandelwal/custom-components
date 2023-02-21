import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const Toast = ({ message, variant, time, open, onClose, anchorOrigin }) => {
  const { vertical, horizontal } = anchorOrigin;
  const [bgColor] = useState(
    variant === "success" ? "green" : variant === "error" ? "red" : "orange"
  );

  const toastRef = useRef(null);
  console.log("open - ", open);

  useEffect(() => {
    const timerId = setTimeout(() => {
      // console.log("dnks -- ", toastRef.current);
      if (toastRef.current) toastRef.current.classList.remove("show");
      onClose();
    }, time + 500);

    return () => {
      console.log("clear timeout");
      clearTimeout(timerId);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div ref={toastRef} className={`toastContainer ${open ? "show" : ""}`}>
          <i className="fa-regular fa-circle-check"></i>
          <span>{message}</span>
          <span onClick={onClose}>X</span>
        </div>
      )}

      <style jsx="true">{`
        .toastContainer {
          visibility: hidden;
          background: ${bgColor};
          position: absolute;
          top: ${vertical === "top" ? "20px" : "unset"};
          bottom: ${vertical === "bottom" ? "20px" : "unset"};
          left: ${horizontal === "left"
            ? "20px"
            : horizontal === "center"
            ? "50%"
            : "unset"};
          right: ${horizontal === "right" ? "20px" : "unset"};
          transform: ${horizontal === "center" ? "translateX(-50%)" : "unset"};
          padding: 10px 20px;
          border-radius: 5px;
          color: white;
        }

        .show {
          visibility: visible;
          animation: ${vertical === "top" && horizontal === "center"
              ? "animate-top-in 500ms, animate-top-out 500ms"
              : vertical === "bottom" && horizontal === "center"
              ? "animate-bottom-in 500ms, animate-bottom-out 500ms"
              : (vertical === "top" && horizontal === "left") ||
                (vertical === "bottom" && horizontal === "left")
              ? "animate-left-in 500ms, animate-left-out 500ms"
              : "animate-right-in 500ms, animate-right-out 500ms"}
            ${time}ms;
        }

        @keyframes animate-right-in {
          from {
            right: 0px;
            opacity: 0;
          }
          to {
            right: 20px;
            opacity: 1;
          }
        }

        @keyframes animate-right-out {
          from {
            right: 20px;
            opacity: 1;
          }
          to {
            right: 0px;
            opacity: 0;
          }
        }

        @keyframes animate-top-in {
          from {
            top: 0px;
            opacity: 0;
          }
          to {
            top: 20px;
            opacity: 1;
          }
        }

        @keyframes animate-top-out {
          from {
            top: 20px;
            opacity: 1;
          }
          to {
            top: 0px;
            opacity: 0;
          }
        }

        @keyframes animate-bottom-in {
          from {
            bottom: 0px;
            opacity: 0;
          }
          to {
            bottom: 20px;
            opacity: 1;
          }
        }

        @keyframes animate-bottom-out {
          from {
            bottom: 20px;
            opacity: 1;
          }
          to {
            bottom: 0px;
            opacity: 0;
          }
        }

        @keyframes animate-left-in {
          from {
            left: 0px;
            opacity: 0;
          }
          to {
            left: 20px;
            opacity: 1;
          }
        }

        @keyframes animate-left-out {
          from {
            left: 20px;
            opacity: 1;
          }
          to {
            left: 0px;
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "error", "warning"]),
  open: PropTypes.oneOf([true, false]).isRequired,
  onClose: PropTypes.func,
  time: PropTypes.number,
  anchorOrigin: PropTypes.exact({
    vertical: PropTypes.oneOf(["top", "bottom"]),
    horizontal: PropTypes.oneOf(["left", "center", "right"])
  })
};

Toast.defaultProps = {
  time: 2500,
  variant: "success",
  anchorOrigin: {
    vertical: "top",
    horizontal: "right"
  }
};

export default Toast;
