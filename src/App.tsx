import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import PlayersList from './components/PlayersList';
import { Player } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Grid } from '@mui/material';

const App: React.FC = () => {

  const [player, setPlayer] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [completedPlayers, setCompletedPlayers] = useState<Player[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (player) {
      setPlayers([...players, { id: Date.now(), player, isDone: false}])
      setPlayer("");
    }
  };
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = players;
    let complete = completedPlayers;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedPlayers(complete);
    setPlayers(active);
  };
  

  return(
    <Grid>
    
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      
      <span className="heading">NHL FANTASY</span>
      <InputField player={player} setPlayer={setPlayer} handleAdd={handleAdd} />
      <PlayersList 
        players={players} 
        setPlayers={setPlayers} 
        completedPlayers={completedPlayers}
        setCompletedPlayers={setCompletedPlayers}
      />
      
    </div> 
    </DragDropContext>
    
    </Grid>
    
    
  );
};

export default App;
