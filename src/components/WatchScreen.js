import React from 'react'
import { useSelector } from 'react-redux'
import './watchScreen.css'

const WatchScreen = () => {
    const watchScreenState = useSelector((state) => state.watchScreenState)
    console.log(watchScreenState)

  return (
    <div className='watchScreenContainer' dangerouslySetInnerHTML={{__html: (watchScreenState.selectedVideo? watchScreenState.selectedVideo.videos[0].embed :  'unfortunate')}}>
    
    </div>
  )
}

export default WatchScreen