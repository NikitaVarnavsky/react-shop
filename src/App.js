import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import axios from 'axios';

import { BASE_URL } from './api/endPoints';
import { getUserId, getToken } from './service/localStorage.service';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drawer from './pages/Drawer';
import SignIn from './pages/SignIn';
import Registration from './pages/Registration';

import { setItems, setCurrentItem, setShowCurrentItem, fetchItems } from './redux/slices/cardSlice';
import { selectFavoritesItems, setFavoritesList } from './redux/slices/favoritesSlice';
import { selectSearchValue } from './redux/slices/filterSlice';
import { fetchDrawerItems } from './redux/slices/drawerSlice';
import {
  setAuthorized,
  setUserId,
  setToken,
  selectUserId,
  selectToken,
} from './redux/slices/authorizationSlice';
import MainLayout from './layouts/MainLayout';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  const favoritesList = useSelector(selectFavoritesItems);
  const searchValue = useSelector(selectSearchValue);
  const authUserId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  // Получение данных при первом рендере
  useEffect(() => {
    const token = getToken();
    const userId = getUserId();
    async function fetchData() {
      setIsLoading(true);

      if (token !== null) {
        dispatch(setAuthorized(true));
        dispatch(setUserId(userId));
        dispatch(setToken(token));

        // setIsLoadingFavorites(true);
        // dispatch(fetchFavorites());
        // setIsLoadingFavorites(false);
        const favoritesResponse = await axios.get(`${BASE_URL}/favorites?user=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (favoritesResponse.data[0]) {
          dispatch(setFavoritesList(favoritesResponse.data[0].items));
        }

        dispatch(fetchDrawerItems());
      }

      dispatch(fetchItems());

      setIsLoading(false);
    }

    fetchData();
  }, []);

  // Получение данных при вводе в строку поиска

  useEffect(() => {
    async function fetchData() {
      const resultSearch = await axios(`${BASE_URL}/items?title=${searchValue}*`);
      dispatch(setItems(resultSearch.data));
    }
    fetchData();
  }, [searchValue]);

  // Добавление или удаление фаворитов

  const onChangeFavorite = async (favorite) => {
    // Проверка есть ли такой пользователь
    const isUser = await axios.get(`${BASE_URL}/favorites?user=${authUserId}`);
    // Если нет пользователя в фаворитах
    if (!isUser.data.length) {
      await axios.post(`${BASE_URL}/favorites`, {
        user: Number(authUserId),
        items: [favorite],
      });
      dispatch(setFavoritesList([favorite]));
    }
    if (favoritesList.some((item) => item.uniqueId === favorite.uniqueId)) {
      const newFavorites = favoritesList.filter((obj) => obj.uniqueId !== favorite.uniqueId);
      dispatch(setFavoritesList(newFavorites));
      const currentId = await axios(`${BASE_URL}/favorites?user=${authUserId}`);
      const favoriteUserId = currentId.data[0].id;
      await axios.patch(`${BASE_URL}/favorites/${favoriteUserId}`, {
        items: newFavorites,
      });
    }
    // Если данного товара нет в массиве товаров пользователя
    else {
      dispatch(setFavoritesList([...favoritesList, favorite]));
      const currentId = await axios(`${BASE_URL}/favorites?user=${authUserId}`);
      const favoriteUserId = currentId.data[0].id;
      await axios.patch(`${BASE_URL}/favorites/${favoriteUserId}`, {
        items: [...favoritesList, favorite],
      });
    }
  };

  // Отображение карточки

  const onChangeCurrentItem = (uniqueId, title, price, imageUrl, description) => {
    dispatch(setCurrentItem({ uniqueId, title, price, imageUrl, description }));
    dispatch(setShowCurrentItem(true));
  };

  if (isLoading || isLoadingFavorites) return <div></div>;

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route
          path=''
          element={
            <Home onChangeFavorite={onChangeFavorite} onChangeCurrentItem={onChangeCurrentItem} />
          }
        />
        <Route path='drawer' element={<Drawer />} />
        <Route
          path='favorites'
          element={
            <Favorites
              onChangeFavorite={onChangeFavorite}
              onChangeCurrentItem={onChangeCurrentItem}
            />
          }
        />
        <Route path='registration' element={<Registration />} />
        <Route path='signIn' element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
