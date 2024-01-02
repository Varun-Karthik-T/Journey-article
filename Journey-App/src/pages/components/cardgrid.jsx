import React, { useEffect } from 'react';
import Card from './card';

const CardGrid = ({ cardsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cardsData.map((card) => ( 
        <Card
          key={card.article_id}
          id={card.article_id}
          title={card.article_heading}
          subheading={card.name}
          author={card.j_username}
          imageLink={card.article_img_link}
        />
      ))}
    </div>
  );
};

export default CardGrid;
