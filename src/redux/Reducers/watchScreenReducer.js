import React from 'react'
import { SET_SELECTED_VIDEO } from '../Actions/watchScreenActions'

const initialWatchScreenState = {
    selectedVideo: undefined
}

const watchScreenReducer = (state=initialWatchScreenState, action) => {
    switch(action.type){
        case(SET_SELECTED_VIDEO) : {

            return({
                ...state,
                selectedVideo: action.payload
            })
        }
        
        default:
            return state
    }
}

export default watchScreenReducer