import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import StoryCard from './StoryCard'
import { useNavigate } from 'react-router-dom'

function Bookmarks() {

  const user = useSelector((state)=>state.user.user)
  const navigate = useNavigate()
  
  const handleStoryClick = (storyID) => {
    navigate(`/view/${storyID}`);
  };
  
  useEffect(()=>{
    if(user === null)
        navigate("/")
  },[user,navigate])

  return (
    <>
      {
        user && <div className='category'>
          <div className='title'>Your Bookmarks</div>
          <div className='data'>
            {
              user.bookmarks.length === 0 ? (
                <div className='noStory'>Please Add a Bookmark first</div>
              ):(
                <div className='stories'>
                  {
                    user.bookmarks.map((data,idx)=>(
                      <div className='storyContainer'
                        onClick={()=> handleStoryClick(data)}
                      >
                        <StoryCard data={{_id:data}} key={idx}/>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      }
    </>
  )
}

export default Bookmarks
