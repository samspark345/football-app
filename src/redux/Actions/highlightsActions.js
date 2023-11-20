export const GET_HIGHLIGHT_VIDEOS = 'GET_HIGHLIGHT_VIDEOS'
export const GET_HIGHLIGHT_VIDEOS_ON_SUCCESS = 'GET_HIGHLIGHT_VIDEOS_ON_SUCCESS'

export function GetHighlightVideos(){
    return {
        type: GET_HIGHLIGHT_VIDEOS
    }; 
}

export function GetHighlightVideosOnSuccess(payload){
    return {
        type: GET_HIGHLIGHT_VIDEOS_ON_SUCCESS,
        payload: payload
    }; 
}