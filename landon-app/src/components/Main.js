import React from 'react';
import HotelInfo from './HotelInfo.js'
import Welcome from './Welcome.js'

const Main = () => {
  return (
    <main id="wrapper">
      <Welcome />
      <HotelInfo />
    </main>
  );
}

export default Main;