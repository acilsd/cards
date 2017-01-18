import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addDeck, showAddDeck, hideAddDeck } from '../actions/index';

class Sidebar extends Component {
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  }

  createDeck(e) {
    if (e.which !== 13) return;
    const name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  }

  render() {
    const props = this.props;
    return (
      <div class='sidebar'>
        <h2> Card Decks </h2>
        <ul>
          {props.decks.map((deck, i) =>
            <li key={i}>
              <Link to={`/deck/${deck.id}`}> {deck.name} </Link>
            </li>
          )}
        </ul>
        {
          props.addingDeck && <input ref='add' onKeyPress={this.createDeck.bind(this)} class='create'/>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ decks, addingDeck }) => ({
  decks,
  addingDeck
});

const mapDispatchToProps = dispatch => ({
  addDeck: name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

// const Sidebar = React.createClass({
//   componentDidUpdate() {
//     var el = ReactDOM.findDOMNode(this.refs.add);
//     if (el) el.focus();
//   },
//   render() {
//     let props = this.props;
//
//     return (
//       <div class='sidebar'>
//         <h2> Card Decks </h2>
//         <ul>
//           {props.decks.map((deck, i) =>
//             <li key={i}>
//               <Link to={`/deck/${deck.id}`}> {deck.name} </Link>
//             </li>
//           )}
//         </ul>
//         {
//           props.addingDeck && <input ref='add' onKeyPress={this.createDeck} />
//         }
//       </div>
//     );
//   },
//   createDeck(e) {
//     if (e.which !== 13) return;
//     var name = ReactDOM.findDOMNode(this.refs.add).value;
//     this.props.addDeck(name);
//     this.props.hideAddDeck();
//   }
// });
