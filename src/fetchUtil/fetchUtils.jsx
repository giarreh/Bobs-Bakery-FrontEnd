import React from 'react'


export async function fetchPosts(){

  return fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => data)
  .catch(error => {
    throw new Error('Error fetching the posts')
  })

}