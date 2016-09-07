import React from 'react';
import { Link } from 'react-router';

const Card = ({ card }) => {
  return (
    <div class='card'>
      <div>
        <p> {card.front} </p>
        <Link class='btn' to={`/deck/${card.deckId}/edit/${card.id}`}> Edit </Link>
      </div>
    </div>
  );
};

export default Card;
