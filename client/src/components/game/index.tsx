import React, { useCallback, useContext, useEffect } from 'react'
import gameContext from '../../gameContext'
import gameService from '../../services/gameService'
import socketService from '../../services/socketService'

export function Game() {
    const { isRoomReady, setRoomReady } = useContext(gameContext)

    //boton

   

    return (
        <>
            {isRoomReady ? (<h1>Playing </h1>) : (<h1> Waiting</h1>)}
            <h2>{socketService.socket?.id}</h2>
        </>


    )
};