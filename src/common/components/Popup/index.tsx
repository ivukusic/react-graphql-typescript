import React, { useEffect, useState } from 'react';

import { PopupType } from '../../types';
import { Button } from '../Button';

import './Popup.style.scss';

interface Props {
  popup: PopupType;
  togglePopup: (e?: any) => void;
}

export const Popup = ({ togglePopup, popup }: Props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPopup, setCurrentPopup] = useState<PopupType>({
    cb: null,
    message: '',
    title: '',
    visible: false,
  });

  useEffect(() => {
    if (popup.visible && !currentPopup.visible) {
      setCurrentPopup(popup);
    } else if (!popup.visible && currentPopup.visible) {
      if (!popup.visible && errorMessage) {
        setErrorMessage('');
      }
      if (!popup.visible && loading) {
        setLoading(false);
      }
      setTimeout(() => {
        setCurrentPopup({
          cb: null,
          message: '',
          title: '',
          visible: false,
        });
      }, 400);
    }
  }, [errorMessage, loading, currentPopup, popup]);

  const success = () => {
    setLoading(false);
    togglePopup({});
  };

  const error = (message: string) => {
    setLoading(false);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  };

  const onConfirm = () => {
    if (currentPopup.cb) {
      setLoading(true);
      currentPopup.cb(success, error);
    } else {
      togglePopup({});
    }
  };

  return (
    <div className={`popup${popup.visible ? ' visible' : ''}`}>
      <div className="popup-content">
        <h4>{currentPopup.title}</h4>
        <p className={errorMessage && `mb-0`}>{currentPopup.message}</p>
        {errorMessage && <div className="error-message mb-4">{errorMessage}</div>}
        <div className="d-flex flex-row">
          <Button className="mr-2" loading={loading} type="confirm" label="Ok" onClick={onConfirm} />
          <Button label="Cancel" type="cancel" onClick={togglePopup} />
        </div>
      </div>
    </div>
  );
};
