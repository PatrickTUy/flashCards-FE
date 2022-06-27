import { combineReducers } from 'redux';
import flashcardsreducer from './flashcardsreducer';


export default combineReducers({
flashcards:flashcardsreducer,
})