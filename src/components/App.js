import React from 'react';
import '../index.css';
import {Route, Redirect, Switch, useHistory} from 'react-router-dom';
import Footer from './Footer';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Login from "./Login";
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useState, useEffect} from 'react'
import api from '../utils/api';
import * as authFunc from '../utils/auth';



function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState();

  const history = useHistory();
  
  useEffect(() => {
    api.getProfileInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) =>{
        console.log(`Error: ${err}`);
      })
  }, []);

  useEffect(() => {
    if(localStorage.getItem("jwt")) {
      let token = localStorage.getItem("jwt")
      authFunc.checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.email);
          history.push("/");
        })
        .catch(err => console.log(err));
    };
  }, [history]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsTooltipPopupOpen(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(item) {
    api.editProfile(item)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  function handleUpdateAvatar(item) {
    api.editProfileAvatar(item)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    const toggleLike = isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id);
    toggleLike
      .then((res) => {
        const newCards = cards.map((item) => 
          item._id === res._id ? res : item
        )
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        const newCards = cards.filter(item => item._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));

  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  function handleLogin(password, email) {
    authFunc.auth(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function handleRegister(password, email) {
    authFunc.reg(password, email)
      .then((res) => {
        setIsSucceed(true);
        setIsTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsSucceed(false);
        setIsTooltipPopupOpen(true);
        console.log(err);
      })
  }

  function onHeaderLinkClick(link) {
    if(link === "/sign-out") {
      localStorage.removeItem('jwt');
      history.push("/sign-in")
    }
    else {
      history.push(`${link}`);
    }
  }

  function closeTooltipPopup() {
    setIsTooltipPopupOpen(false);
    if(isSucceed) {
      history.push("/sign-in");
    }
  }

  return (
    <div className='page'>
      <div className="page__container">

      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-up">
          <Header 
            link="/sign-in"
            linkText="Войти"
            onHeaderLinkClick={onHeaderLinkClick}
          />
          <Register handleRegister={handleRegister}/>
        </Route>

        <Route path="/sign-in">
          <Header 
            link="/sign-up"
            linkText="Зарегистрироваться"
            onHeaderLinkClick={onHeaderLinkClick}
          />
          <Login handleLogin={handleLogin} />  
        </Route>
        <ProtectedRoute
          exact path="/"
          isLoggedIn = {isLoggedIn}  
        >
        <Header
          userEmail = {email} 
          linkText="Выйти"
          link="/sign-out"
          onHeaderLinkClick={onHeaderLinkClick}
        />  

        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer/>
        </ProtectedRoute>
        <Route>
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
                <Redirect to="/sign-in" />
              )
            }
          </Route>
      </Switch>
    
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
     
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}

      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup 
        name='image'
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />

      <InfoTooltip 
        isOpen={isTooltipPopupOpen}
        isLog={isSucceed}
        onClose={closeTooltipPopup}
      />

      </CurrentUserContext.Provider> 
    </div>
  </div>
    
    
  );
}

export default App;
