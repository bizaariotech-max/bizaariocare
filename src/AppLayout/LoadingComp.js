import React from 'react'

const Loading = () => {
  return (
    <div style={{position:'fixed', top: '45%', width:'100%'}}>
        <div  className="text-purple-500">
        <span className="loader"></span>
        <p>LOADING.....</p>

</div>
    </div>
  )
}

export default Loading