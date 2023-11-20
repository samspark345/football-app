import React from 'react'
import { GET_HIGHLIGHT_VIDEOS_ON_SUCCESS } from '../Actions/highlightsActions'

const initHighlightState = {
    videos: []
}

const highlightsReducer = (state=initHighlightState, action) => {
    switch(action.type){
        case(GET_HIGHLIGHT_VIDEOS_ON_SUCCESS) : {

            return({
                ...state,
                videos: action.payload
            })
        }
        
        default:
            return state
    }
}

export default highlightsReducer