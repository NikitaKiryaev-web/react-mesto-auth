import {useEffect} from 'react';

function ImagePopup(props) {

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

  return(
  <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : false}`}>
      <div className="popup__container popup__container_image">
        <button className="popup__close popup__close_image" onClick={props.onClose}></button>
        <img src={props.card.link} alt="Фотография" className="popup__illustration"/>
        <p className="popup__description">{props.card.name}</p>
    </div>
  </div>
  )
}

export default ImagePopup;