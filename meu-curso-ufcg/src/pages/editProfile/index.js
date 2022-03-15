import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';

import ReactCardFlip from 'react-card-flip';
import { getUserInfo } from '../../api';

import ProfileEdit from '../../components/profileEdit/index';
import TabBar from '../../components/tabBar';
import RegisterEdit from '../../components/editRegister/index';
import Flex from '../../components/flex';
import IconArrowLeft from '../../components/icons/iconArrowLeft';

import './editProfile.css';

function EditProfile() {
  const [choosedTab, setChoosedTab] = useState('Editar Perfil');
  const [isFlipped, setIsFlipped] = useState(false);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(null);
  const history = useHistory();

  const { data } = useQuery('logged user info', () => getUserInfo(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const info = data?.data;
    setProfile(info?.profile ?? '');
    setEmail(info?.email ?? '');
  }, [data]);

  const handleClickLogin = () => {
    setIsFlipped(false);
    setChoosedTab('Editar Perfil');
  };

  const handleClickRegister = () => {
    setIsFlipped(true);
    setChoosedTab('Editar Usuario');
  };

  const back = (
    <button
      key="back"
      type="button"
      className="profile-icon-button"
      onClick={() => history.push('/profile')}
    >
      <IconArrowLeft styles={{ zIndex: 4, color: '#FFFFFF' }} />
    </button>
  );

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
          actions={[() => {}, handleClickLogin, handleClickRegister]}
        >
          {[back, 'Editar Perfil', 'Editar Usuario']}
        </TabBar>
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection="horizontal"
          containerStyle={{ width: '50%', marginTop: '100px' }}
        >
          <Flex styles={{ width: '100%' }}>
            <ProfileEdit profile={profile} />
          </Flex>
          <Flex styles={{ width: '100%' }}>
            <RegisterEdit user={email} />
          </Flex>
        </ReactCardFlip>
      </Flex>
    </div>
  );
}

export default EditProfile;
