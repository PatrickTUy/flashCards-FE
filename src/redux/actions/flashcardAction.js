import { actionTypes } from "../types";

const { GET_OWN_FLASHCARDS,EXPLORE_FLASHCARDS, EDIT_FLASHCARD,EDIT_DESCRIPTION,EDIT_URL,EDIT_IS_DONE} = actionTypes;

export const ownFlashcards = (flashcards)=>({
  type:GET_OWN_FLASHCARDS,
  payload:flashcards
})

export const explore = (flashcards) =>({
  type:EXPLORE_FLASHCARDS,
  payload:flashcards
})

export const cardToEdit = (flashcard) =>({
  type:EDIT_FLASHCARD,
  payload:flashcard
})

export const setFlashcardDescription = (description) =>({
  type:EDIT_DESCRIPTION,
  payload:description
})



export const setFlashcardUrl = (url) =>({
  type:EDIT_URL,
  payload:url
})


export const setFlashcardIsDone = (isDone) =>({
  type:EDIT_IS_DONE,
  payload:isDone
})

