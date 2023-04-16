import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ isExpanded, summary, details }) => {
  const [expand, setExpand] = useState(isExpanded);
  return (
    <>
      <div className='container'>
        <div className='summary' onClick={() => setExpand(!expand)}>
          <span>{summary}</span>
          <span>{expand ? "-" : "+"}</span>
        </div>
      {expand && <div className='details'>{details}</div>}
      </div>
      <style jsx={true}>{`
        .summary {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          cursor: pointer;
          background-color: lightbrown;
        }
        .details {

        }
      `}</style>
    </>
  )
}

Accordion.defaultProps = {
  isExpanded: false,
}

Accordion.propTypes = {
  isExpanded: PropTypes.bool,
  summary: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  // details: PropTypes.string.isRequired,
}

export default Accordion;