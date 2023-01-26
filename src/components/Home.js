import React from 'react';

function Home() {
  return( 
    <div>
      <h1>Welcome to my To-Do application</h1>
      <p>This To-Do React application was build as an exercise for React course in Metropolia University of Applied Sciences.</p>
      <p>With this exercise we practised:</p>
      <ul>
        <li>Using props and state</li>
        <li>Reading user input and displaying it with map() function</li>
        <li>Conditional rendering</li>
        <li>Using router</li>
        <li>Using 3rd party components</li>
        <li>Using realtime database (Firebase)</li>
      </ul>
      <p>This project was bootstrapped with Create React App.</p>
      <h2>Click To-do in the menu to see the app.</h2>
    </div>
  )
}

export default Home;