import {useState} from 'react';
import axios from 'axios';

function ListForm({handleReset, clearItems, getList}){
    let [newItem, setNewItem] = useState('');
    let [newQuantity, setNewQuantity] = useState('');
    let [newUnit, setNewUnit] = useState ('');

    const addList = (newItem, newQuantity, newUnit) => {
        event.preventDefault();
        console.log('In POST', newItem, newQuantity, newUnit);

        axios.post('/list', {item: newItem, quantity: newQuantity, unit: newUnit})
        .then(response => {
            getList();
            setNewItem('')
            setNewQuantity('')
            setNewUnit('')
        }).catch(err => {
            console.log('Error in POST', err);
        });
    }


    return (
        <>
            <form className="inputContainer">
                    <label htmlFor="Item">Item: </label>
                    <input 
                    type="text" 
                    placeholder="Item"
                    onChange={(event) => setNewItem(event.target.value)}
                    value={newItem}/>

                    <label htmlFor="Item">Quantity: </label>
                    <input 
                    type="number" 
                    placeholder="Quantity"
                    onChange={(event) => setNewQuantity(event.target.value)}
                    value={newQuantity}/>

                    <label htmlFor="Item">Unit: </label>
                    <input 
                    type="text" 
                    placeholder="Unit"
                    onChange={(event) => setNewUnit(event.target.value)}
                    value={newUnit}/>

                    <button onClick={(event) => addList(newItem, newQuantity, newUnit)}>ADD ITEM</button>

                    <h1>Shopping List</h1>
                    <button onClick={handleReset}>RESET</button>
                    <button onClick={clearItems}>CLEAR</button>
                </form>
        </>
    )
}

export default ListForm;