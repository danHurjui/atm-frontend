import React, { useState, useEffect } from 'react';

import LastPeriodTime from './meetings';
import Tickets from "./tickets"
import SyncDbWithServer from "./syncDbWithServer"
import NextMeetings from './nextMeetings';
import Container from 'react-bootstrap/esm/Container';

function Home() {
  return (
    <Container>
      <div>
        <h1>Welcome to ATM</h1>
        <div>
          <SyncDbWithServer />
        </div>
        <div>
          <LastPeriodTime />
        </div>

        <div>
          <Tickets />
        </div>
        <br></br>
        <div>
          <Container>
            <NextMeetings />
          </Container>
        </div>

      </div>
    </Container>
  );
};

export default Home;