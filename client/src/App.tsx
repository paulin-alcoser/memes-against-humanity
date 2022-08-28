import { connect } from 'http2';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { io } from "socket.io-client"
import socketService from './services/socketService';
import { JoinRoom } from './components/joinRoom';
import { Game } from './components/game';
import GameContext, { IGameContextProps } from './gameContext';

const AppContainer = styled.div`
  width: 100%;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 1em; 
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const MainContainer = styled.div`
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [isRoomReady, setRoomReady] = useState(false)
  const connectSocket = async () => {
    const socket = await socketService.connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err)
      })
  }

  useEffect(() => {
    connectSocket()
  }, []);

  const gameContextValue: IGameContextProps = {
    inRoom,
    setInRoom,
    isRoomReady,
    setRoomReady
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Welcome to Memes Agains Humanity</WelcomeText>
        <MainContainer>
          {!inRoom && <JoinRoom />}
          {inRoom && <Game />}
        </MainContainer>

      </AppContainer>
    </GameContext.Provider>

  );
}

export default App;
