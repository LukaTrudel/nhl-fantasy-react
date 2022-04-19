import React, { useEffect, useRef, useState } from 'react';
import { Player } from '../model';
import { AiFillEdit, AiFillDelete, } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from "react-beautiful-dnd";
import './styles.css';

type Props = {
    index: number;
    player: Player,
    players:Player[],
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

const SinglePlayer = ({ index, player, players, setPlayers }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editPlayer, setEditPlayer] = useState<string>(player.player);
    

    const handleDone = (id:number) => {
        setPlayers(
            players.map((player) => 
                player.id===id ? {...player, isDone: !player.isDone} : player
            )
        );
    };

    const handleDelete = (id:number) => {
        setPlayers(
            players.filter((player) => player.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id:number) => {
        e.preventDefault();

        setPlayers(
            players.map((player) => (player.id === id ? { ...player, player:editPlayer}:player))
        );
        setEdit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={player.id.toString()} index={index}>
          {(provided, snapshot) => (
            <form
              onSubmit={(e) => handleEdit(e, player.id)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
            >
              {edit ? (
                <input
                  value={editPlayer}
                  onChange={(e) => setEditPlayer(e.target.value)}
                  className="todos__single--text"
                  ref={inputRef}
                />
              ) : player.isDone ? (
                <s className="todos__single--text">{player.player}</s>
              ) : (
                <span className="todos__single--text">{player.player}</span>
              )}
              <div>
                <span
                  className="icon"
                  onClick={() => {
                    if (!edit && !player.isDone) {
                      setEdit(!edit);
                    }
                  }}
                >
                  <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(player.id)}>
                  <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(player.id)}>
                  <MdDone />
                </span>
              </div>
            </form>
          )}
        </Draggable>
      );
};

export default SinglePlayer;
