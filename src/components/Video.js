import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SetSelectedVideo, SET_SELECTED_VIDEO } from '../redux/Actions/watchScreenActions'
import './video.css'

const handleVideoClick = (videoData, dispatch, navigate) => {
  dispatch(SetSelectedVideo(videoData))
  let path = '/watch';
  navigate(path)
}


export const Video = ({
  competition,
  date,
  embed,
  side1,
  side2,
  thumbnail,
  title,
  url,
  videos
}) => {

  const videoData = {
    competition,
    date,
    embed,
    side1,
    side2,
    thumbnail,
    title,
    url,
    videos
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className='videoContainer'>

        <div className='videoCardImage' onClick={() => {handleVideoClick(videoData, dispatch, navigate)}}>
          <img src={thumbnail? thumbnail : ''} alt='' className='videoThumbnail'></img>
        </div>
        <div className='videoTitle'>
          <h4>{title? title : 'football match'} </h4>
        </div>
        
    </div>
  )
}


export default Video