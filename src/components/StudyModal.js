import React from 'react';
import { Link } from 'react-router';
import { updateCard, setShowBack } from '../actions';
import { connect } from 'react-redux';

const MS_IN_DAY = 86400000;

const StudyModal = ({ card, showBack, onFlip, deckId, onStudied }) => {
  let body = (
    <div class='no-cards'>
      <p> You have no cards to study in this deck right now. See ya next day! </p>
    </div>
  );

  if (card) {
    body = (
      <div class='study-card'>
        <div class={ showBack ? 'front hide' : 'front'}>
          <div>
            <p> { card.front }</p>
          </div>
          <button onClick={onFlip}> Flip </button>
        </div>

        <div class={ showBack ? 'back': 'back hide' }>
          <div>
            <p> { card.back }</p>
          </div>
          <p> How did you do? </p>
          <p>
            <button onClick={e => onStudied(card.id, Math.max(card.score - 1, 1))}> Poorly </button>
            <button onClick={e => onStudied(card.id, card.score)}> Mediocre </button>
            <button onClick={e => onStudied(card.id, Math.min(card.score + 1, 3))}> Awesome </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div class='modal study-modal'>
      <Link class='btn close' to={`/deck/${deckId}`}> ⨯ </Link>
      {body}
    </div>
  );
};

const mapStateToProps = ({ cards, showBack }, { params: { deckId } }) => ({
  showBack,
  deckId,
  card: cards.filter(card => card.deckId === deckId &&
    (!card.lastStudiedOn || (new Date - card.lastStudiedOn) / MS_IN_DAY >= card.score))[0]
});

const mapDispatchToProps = dispatch => ({
  onStudied: (cardId, score) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    dispatch(updateCard({ id: cardId, score, lastStudiedOn: +now }));
    dispatch(setShowBack());
  },
  onFlip: () => dispatch(setShowBack(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyModal);
