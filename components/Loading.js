import React from 'react'

function Loading() {
  return (
      <div className='overlay absolute top-0 left-0 bottom-0 right-0 min-h-screen  w-screen
          z-10 flex items-center justify-center '>
        <p className='text-4xl text-white '>Loading ....</p>
      </div>          
  )
}

export default Loading