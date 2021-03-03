import successImg from '../images/SuccessLog.svg';
import failedImg from '../images/FailedLog.svg';
import {useEffect} from 'react';

function InfoTooltip(props) {
  const image = props.isLog ? successImg : failedImg; 
  const text = props.isLog ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."

  const closeByEscape = (e) => {
    if (e.key === 'Escape') {
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeByEscape);

    return() => {
      document.removeEventListener('keydown', closeByEscape);
    }

  }, []);

  
  const closeByClick = (e) => {
    e.target.classList.contains('popup') && props.onClose();
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeByClick);

    return () => {
      document.removeEventListener('mousedown', closeByClick);
    }
  })

  return (
    <div className={`popup popup_tooltip ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_tooltip">
        <button className="popup__close popup__close_tooltip" onClick={props.onClose}></button>
        <img src={image} className="popup__tooltip-image"></img>
        <p className="popup__title popup__title_tooltip">{text}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;