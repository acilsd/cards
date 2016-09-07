import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';


export default (
  <Route path='/' component={App}>
    <Route path='/deck/:deckId' component={VisibleCards}>
      <Route path='/deck/:deckId/new' component={NewCardModal} />
      <Route path='/deck/:deckId/edit/:cardId' component={EditCardModal} />
      <Route path='/deck/:deckId/study' component={StudyModal} />
    </Route>
  </Route>
);
