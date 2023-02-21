import { useState } from 'react';
import './App.css';
import Toast from './components/Toast';

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
  console.log("p=open -- ", open);
  return (
    <div className="App">
      <h1>Custom Components</h1>
      <h2>Start editing to see some magic happen!</h2>
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
    </div>
  );
}

export default App;
