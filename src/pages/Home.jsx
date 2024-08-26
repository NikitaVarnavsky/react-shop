import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card } from '../components/Card';
import { selectCardItems } from '../redux/slices/cardSlice';
import { selectFavoritesItems } from '../redux/slices/favoritesSlice';

function Home({ onChangeFavorite, onChangeCurrentItem }) {
  const items = useSelector(selectCardItems);
  const favoritesList = useSelector(selectFavoritesItems);
  const dispatch = useDispatch();

  const activeFavorited = (favorite) => {
    const result = favoritesList.some((item) => favorite.uniqueId === item.uniqueId);
    return result;
  };

  return (
    <>
      <div className='content'>
        <h1>Все товары</h1>
        <div className='card-list'>
          {items.map((item) => (
            // <Link to='item'>
            <Card
              key={item.uniqueId}
              uniqueId={item.uniqueId}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              description={item.description}
              onChangeFavorite={onChangeFavorite}
              activeFavorited={activeFavorited(item)}
              onChangeCurrentItem={onChangeCurrentItem}
            />
            // </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
