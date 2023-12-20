import {useState} from "react";

export default function Player({initialName, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initialName);

    //todo: when updating the state based on the previous state you should do it via function callback
    function handleEdit() {
        setIsEditing((prevState) => !prevState);
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {isEditing ?
                    <input type="text" value={name} onChange={handleChange}/> :
                    <span className='player-name'>{name}</span>}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}