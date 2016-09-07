import React from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import { connect } from 'react-redux';

const App = ({ deckId, children }) => {
  return (
    <div class='app'>
      <Toolbar deckId={deckId} />
      <Sidebar />
      {children}
    </div>
  );
};

const mapStateToProps = (props, { params: { deckId } }) => ({
  deckId
});

export default connect(mapStateToProps)(App);
