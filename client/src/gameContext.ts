import React from "react"

export interface IGameContextProps {
    inRoom: boolean
    setInRoom: (inRoom: boolean) => void
    isRoomReady: boolean
    setRoomReady: (isRoomReady: boolean) => void
}

const defaultState: IGameContextProps =
{
    inRoom: false,
    setInRoom: () => {},
    isRoomReady: false,
    setRoomReady: () => {}
};

export default React.createContext(defaultState); 