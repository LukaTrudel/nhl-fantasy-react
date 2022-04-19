import React, { useRef } from 'react';
import "./styles.css";

interface Props{
    player: string;
    setPlayer: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ player, setPlayer, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return ( 
        <form className='input' onSubmit={(e) => {
                handleAdd(e)
                inputRef.current?.blur();
            }}
        >
            <input 
                ref={inputRef}
                type='input'
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
                placeholder='Player Name' 
                className='input__box' 
            />
        <button className='input_submit' type='submit'>
            Add
        </button>
    </form>
    );
};

export default InputField;
