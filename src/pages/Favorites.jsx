import React from 'react';

import { useSelector } from 'react-redux';
import { Card } from '../components/Card';
import { selectFavoritesItems } from '../redux/slices/favoritesSlice';


function Favorites({ onChangeFavorite, onChangeCurrentItem }) {
  const favoritesList = useSelector(selectFavoritesItems);
  return (
    <div className='content'>
      <h1>Избранное</h1>
      <div className='card-list'>
        {favoritesList.map((item) => (
          <Card
            key={item.uniqueId}
            uniqueId={item.uniqueId}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            description={item.description}
            activeFavorited={true}
            onChangeFavorite={onChangeFavorite}
            onChangeCurrentItem={onChangeCurrentItem}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
