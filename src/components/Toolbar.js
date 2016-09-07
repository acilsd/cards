import React from 'react';
import { showAddDeck, filterCards } from '../actions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Toolbar = ({ deckId, showAddDeck, onFilter }) => {
  let deckTools =
      deckId ? (
        <div>
          <Link class='btn' to={`/deck/${deckId}/new`}> ✚ New Card </Link>
          <Link class='btn' to={`/deck/${deckId}/study`}> Study Deck </Link>
          <Link class='btn' to='/'> Back </Link>
          <input
            onChange={e => onFilter(e.target.value)}
            class='search'
            type='search'
            placeholder='Search Deck...' />
        </div>)
        : null;

  return (
    <div class='toolbar'>
      <div>
        <button onClick={showAddDeck}> ✚ New Deck </button>
      </div>
      {deckTools}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  showAddDeck: () => dispatch(showAddDeck()),
  onFilter: query => dispatch(filterCards(query))
});

export default connect(null, mapDispatchToProps)(Toolbar);
