import React from 'react';
import { Player } from '../model';
import SingleTodo from './SinglePlayer';
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

interface Props{
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    completedPlayers: Player[];
    setCompletedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const PlayersList: React.FC<Props> = ({ players, setPlayers, completedPlayers, setCompletedPlayers }) => {
  return (
      <div className='container'>
          <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
                    <span className="todos__heading">Current Team</span>
                        {players?.map((player, index) => (
                        <SingleTodo
                            index={index}
                            players={players}
                            player={player}
                            key={player.id}
                            setPlayers={setPlayers}
                        />
                        ))}
                        {provided.placeholder}
                </div>
                )
              }
          </Droppable>

          <Droppable droppableId="TodosRemove">
                    {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos  ${
                        snapshot.isDraggingOver ? "dragcomplete" : "remove"
                        }`}
                    >
                        <span className="todos__heading">Former Players</span>
                            {completedPlayers.map((player, index) => (
                            <SingleTodo
                                index={index}
                                players={completedPlayers}
                                player={player}
                                key={player.id}
                                setPlayers={setCompletedPlayers}
                            />
                            ))}
                            {provided.placeholder}
                    </div>

                  )
              }
          </Droppable>
      </div>
  );
};

export default PlayersList;
