import React from 'react';

type DisplayAccessibilityProps = {
  setVisible: React.Dispatch<React.SetStateAction<number>>;
};
const DisplayAccessibility: React.FC<DisplayAccessibilityProps> = ({
  setVisible,
}) => {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div className="circle hover1" onClick={() => setVisible(0)}>
          <i className="arrow_back_icon" />
        </div>
        Display & Accessibility
      </div>
      <div className="mmenu_item">
        <div className="small_circle" style={{ width: '65px' }}>
          <i className="dark_filled_icon" />
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Dark Mode</span>
          <span className="mmenu_span2">
            Adjust the appearance of facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" id="darkOff" name="dark" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" id="darkOn" name="dark" />
      </label>
      <div className="mmenu_item">
        <div className="small_circle" style={{ width: '60px' }}>
          <i className="compact_icon" />
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Compact Mode</span>
          <span className="mmenu_span2">
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" id="compactOff" name="compact" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" id="compactOn" name="compact" />
      </label>

      <div className="mmenu_item">
        <div className="small_circle">
          <i className="keyboard_icon" />
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon" />
        </div>
      </div>
    </div>
  );
};

export default DisplayAccessibility;
