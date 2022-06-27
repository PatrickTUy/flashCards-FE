import { actionTypes } from '../types'

const {
  GET_OWN_FLASHCARDS,EXPLORE_FLASHCARDS, EDIT_FLASHCARD,EDIT_DESCRIPTION,EDIT_URL,EDIT_IS_DONE
} = actionTypes;

const initialState = {
  myFlashcards:[],
  explore:[],
  edit:[],
  editContent:{
    description:'',
    url:'',
    isDone:'',
  }

}

export default function (state = initialState,action){
  switch(action.type){
    case GET_OWN_FLASHCARDS:
    return {
      ...state,
      myFlashcards:action.payload
    }

    case EXPLORE_FLASHCARDS:
      return {
        ...state,
        explore:action.payload
      }

    case EDIT_FLASHCARD:
       return {
        ...state,
         edit:action.payload
       }

       case EDIT_DESCRIPTION:
       return {
        ...state,
        editContent:{
          ...state.editContent,
          description:action.payload
        }
       }

       case EDIT_URL:
        return {
          ...state,
          editContent:{
            ...state.editContent,
            url:action.payload
          }
        }

        case EDIT_IS_DONE:
        return {
          ...state,
          editContent:{
            ...state.editContent,
            isDone:action.payload
          }
        }



    default:
      return state;
  }
}

