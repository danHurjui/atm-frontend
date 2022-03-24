import React, { useState, useEffect } from 'react';

import LastPeriodTime from './Statistic';
import Tickets from "./tickets"
import SyncDbWithServer from "./syncDbWithServer"
import NextMeetings from './nextMeetings';
import Container from 'react-bootstrap/esm/Container';

function Home() {
  return (
    <Container>
     
        <h2>Welcome to ATM</h2>
        <br></br>
        <div>
          <SyncDbWithServer />
        </div>
        <br></br>
        <div>
          <Tickets />
        </div>
        <br></br>
        <div>
       
            <NextMeetings />
        
        </div>

    
    </Container>
  );
};

export default Home;