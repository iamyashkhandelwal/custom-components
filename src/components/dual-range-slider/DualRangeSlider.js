import React, { useEffect, useRef, useState } from 'react';
import "./DualRangeSlider.css";

const DualRangeSlider = ({ min = 0, max = 100, minLabel = "Min", maxLabel = "Max", onChange = () => {}, minInvalidMessage = "", maxInvalidMessage = ""}) => {

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const [isMaxInvalid, setIsMaxInvalid] = useState(false);
  const [isMinInvalid, setIsMinInvalid] = useState(false);

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromSliderRef = useRef(null);
  const toSliderRef = useRef(null);

  function controlFromInput({ target }) {
    try {
      const toSlider = toSliderRef.current;
      const toInput = toInputRef.current;
      const [from, to] = getParsed(target, toInput);
      fillSlider(target, toInput, '#C6C6C6', '#378bcb', toSlider);
      let minError = false;
      if (from > to) {
        setIsMinInvalid(true);
        minError = true;
      } else {
        setIsMinInvalid(false);
      }
      const noLeadingZeroes = target.value.replace(/^0+/, '');
      setMinValue(noLeadingZeroes === '' ? '0' : noLeadingZeroes);
      onChange?.({min: noLeadingZeroes === '' ? 0 : +noLeadingZeroes, max: maxValue, minError, maxError: isMaxInvalid });
    }
    catch(err) {
      console.log('error in controlFromInput --- ', err);
    }
  }
    
  function controlToInput({ target }) {
    try {
      const toSlider = toSliderRef.current;
      const fromInput = fromInputRef.current;
      const [from, to] = getParsed(fromInput, target);
      fillSlider(fromInput, target, '#C6C6C6', '#378bcb', toSlider);
      setToggleAccessible(target);
      const noLeadingZeroes = target.value.replace(/^0+/, '');
      let maxError = false;
      if (from > to || noLeadingZeroes === '') {
        setIsMaxInvalid(true);
        maxError = true;
      }
      else {  
        setIsMaxInvalid(false);
      }
      setMaxValue(noLeadingZeroes === '' ? '0' : noLeadingZeroes);
      onChange?.({min: minValue, max: noLeadingZeroes === '' ? 0 : +noLeadingZeroes, minError: isMinInvalid, maxError});
    }
    catch(err) {
      console.log('error in controlToInput -- ', err);
    }
  }

  function controlFromSlider({ target: {value} }) {
    try{
      const fromSlider = fromSliderRef.current;
      const toSlider = toSliderRef.current;
      const [from, to] = getParsed(fromSlider, toSlider);
      if(from > to) return;
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#378bcb', toSlider);
      setIsMinInvalid(false);
      setMinValue(+value); 
      onChange?.({min: +value, max: maxValue, minError: false, maxError: false});
    }
    catch(err) {
      console.log('error in controlFromSlider -- ', err);
    }
  }

  function controlToSlider({ target: { value } }) {
    try{
      const fromSlider = fromSliderRef.current;
      const toSlider = toSliderRef.current;
      const [from, to] = getParsed(fromSlider, toSlider);
      if(from > to) return;
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#378bcb', toSlider);
      setToggleAccessible(toSlider);
      setMaxValue(+value);
      onChange?.({min: minValue, max: +value, minError: false, maxError: false});
      setIsMaxInvalid(false);
    }
    catch(err) {
      console.log('error in controlToSlider -- ', err);
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
      const rangeDistance = to.max-to.min;
      const fromPosition = from.value - to.min;
      const toPosition = to.value - to.min;
      controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
        ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
        ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
        ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
        ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = toSliderRef.current;
    if (Number(currentTarget.value) <= 0 ) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  useEffect(() => {
    const fromSlider = fromSliderRef.current;
    const toSlider = toSliderRef.current;
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#378bcb', toSlider);
    setToggleAccessible(toSlider);

    setMinValue(min);
    setMaxValue(max);

  }, [min, max])


  return (
    <div className="range_container">
      <div className="form_control">
        <div className="form_control_container">
            <div className="form_control_container__time">{minLabel}</div>
            <input ref={fromInputRef} className="form_control_container__time__input" type="number" id="fromInput" value={minValue} min={min} max={max} onChange={controlFromInput} />
            {isMinInvalid && <span>{minInvalidMessage}</span>}
          </div>
          <div className="form_control_container">
            <div className="form_control_container__time">{maxLabel}</div>
            <input ref={toInputRef} className="form_control_container__time__input" type="number" id="toInput" value={maxValue} min={min} max={max} onChange={controlToInput} />
            {isMaxInvalid && <span>{maxInvalidMessage}</span>}
          </div>
      </div>
      <div className="sliders_control">
        <input ref={fromSliderRef} onChange={controlFromSlider} id="fromSlider" type="range" value={minValue} min={min} max={max} />
        <input ref={toSliderRef} onChange={controlToSlider} id="toSlider" type="range" value={maxValue} min={min} max={max} />
      </div>
    </div>
  )
}

export default DualRangeSlider;