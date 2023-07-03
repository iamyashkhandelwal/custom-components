import { useState } from 'react';
import './App.css';
import Accordion from './components/Accordion';
import Toast from './components/Toast';
import Pagination from './components/Pagination';
import { LinearPageScrollBar } from './components/linear-page-scroll-bar/LinearPageScrollBar';
import { CircularPageScrollIndicator } from './components/circular-page-scroll-indicator/CircularPageScrollIndicator';
import MaskedInput from './components/masked-input/MaskedInput';
import DualRangeSlider from './components/dual-range-slider/DualRangeSlider';

function App() {
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] = useState({
    vertical: "top",
    horizontal: "left"
  });
  const [variant, setVariant] = useState('');
  const [message, setMessage] = useState('');

  const handleOnClose = () => {
    setOpen(!open);
  };

  const handleInput = (val) => {
    console.log("val -- ", val.original, val.masked);
  };

  console.log("p=open -- ", open);
  return (
    <>
    <LinearPageScrollBar />
    <CircularPageScrollIndicator />
    <div className="App" style={{ minHeight: '150vh' }}>
      <h1>Custom Components</h1>
      <h2>Start editing to see some magic happen!</h2>
      <DualRangeSlider 
        min={500} // Mandatory
        max={4000}  // Mandatory
        minLabel='Min Mon Payment' // Optional
        maxLabel='Max Mon Payment'   // Optional
        onChange={({min, max, minError, maxError}) => console.log(min, max, minError, maxError)}  // Optional
        minInvalidMessage='Min cannot be > max'  // Optional
        maxInvalidMessage='Max cannot be < min'  // Optional
      />
      {/* <div className='toastButtons'>
        <div>
          <button
            onClick={() => {
              setVariant("success");
              setMessage('Success message');
              setAnchorOrigin({
                vertical: "top",
                horizontal: "left"
              });
              setOpen(true);
            }}
          >
            Top-Left
          </button>
          <button
            onClick={() => {
              setVariant("warning");
              setMessage('Warning message');
              setAnchorOrigin({
                vertical: "top",
                horizontal: "center"
              });
              setOpen(true);
            }}
          >
            Top-Center
          </button>
          <button
            onClick={() => {
              setVariant("error");
              setMessage('Error message');
              setAnchorOrigin({
                vertical: "top",
                horizontal: "right"
              });
              setOpen(true);
            }}
          >
            Top-Right
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setVariant("success");
              setMessage('Success message');
              setAnchorOrigin({
                vertical: "bottom",
                horizontal: "left"
              });
              setOpen(true);
            }}
          >
            Bottom-Left
          </button>
          <button
            onClick={() => {
              setVariant("warning");
              setMessage('Warning message');
              setAnchorOrigin({
                vertical: "bottom",
                horizontal: "center"
              });
              setOpen(true);
            }}
          >
            Bottom-Center
          </button>
          <button
            onClick={() => {
              setVariant("error");
              setMessage('Error message');
              setAnchorOrigin({
                vertical: "bottom",
                horizontal: "right"
              });
              setOpen(true);
            }}
          >
            Bottom-Right
          </button>
        </div>
      </div> */}

      <div className='accordion'>
        <Accordion
          isExpanded={false}
          summary="ansdkasndask"
          details={"dnsdamdsjdnsjdnsknskndksndskdnskdo"}
        />
      </div>

      <Pagination count={20} />

    
      {open && (
        <Toast
          message={message}
          open={open}
          onClose={handleOnClose}
          time={2000}
          variant={variant}
          anchorOrigin={{
            vertical: anchorOrigin.vertical,
            horizontal: anchorOrigin.horizontal
          }}
        />
      )}

      <MaskedInput maskCharacter={"X"} onChange={handleInput} />
    </div>
    </>
  );
}

export default App;
