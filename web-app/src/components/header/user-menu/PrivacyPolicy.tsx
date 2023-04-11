import React from 'react';

type PrivacyPolicyProps = {
  setVisible: React.Dispatch<React.SetStateAction<number>>;
};
const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setVisible }) => {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div className="circle hover1" onClick={() => setVisible(0)}>
          <i className="arrow_back_icon" />
        </div>
        Settings & privacy
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="settings_filled_icon" />
        </div>
        <span>Settings</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="privacy_checkup_icon" />
        </div>
        <span>Privacy Checkup</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="activity_log_icon" />
        </div>
        <span>Activity Logs</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="news_icon" />
        </div>
        <span>News Feeds Preferences</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="language_icon" />
        </div>
        <span>Language</span>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
