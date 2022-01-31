import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import Register from '../../components/register/index';
import TabBar from '../../components/tabBar';
import Login from '../../components/login';
import Flex from '../../components/flex';

import './homepage.css';

function Home() {
  const [choosedTab, setChoosedTab] = useState('CONECTE-SE');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClickLogin = () => {
    setIsFlipped(false);
    setChoosedTab('CONECTE-SE');
  };

  const handleClickRegister = () => {
    setIsFlipped(true);
    setChoosedTab('INSCREVA-SE');
  };

  return (
    <div className="homepage-background">
      <Flex styles={{ width: '50%', margin: '0 auto' }}>
        <img
          src="https://cdn.discordapp.com/attachments/837038192355311627/937833279548186684/teste2.png"
          className="homepage-logo"
          alt="homemate's logo"
        />
        <TabBar
          choosed={choosedTab}
          styles={{ top: '160px' }}
          actions={[handleClickLogin, handleClickRegister]}
        >
          {['CONECTE-SE', 'INSCREVA-SE']}
        </TabBar>
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          containerStyle={{ width: '50%', marginTop: '100px' }}
        >
          <Flex styles={{ width: '100%' }}>
            <Login />
          </Flex>
          <Flex styles={{ width: '100%' }}>
            <Register toLogin={handleClickLogin} />
          </Flex>
        </ReactCardFlip>
      </Flex>
    </div>
  );
}

export default Home;
