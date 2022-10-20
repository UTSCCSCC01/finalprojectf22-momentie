import React from 'react'

export default function Description({content, tag}) {
  function handleTag(){

  }
  
  return (
    <div>
      <label>
        {content}
        <a href='#' onClick={handleTag}>{tag}</a>
      </label>
    </div>
  )
}