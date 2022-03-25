import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';

function App() {
    let [shoppingList, setShoppingList] = useState([]);

    const [newPurchaseStatus, setNewPurchaseStatus] = useState('')
    let [newItem, setNewItem] = useState('')
    let [newQuantity, setNewQuantity] = useState('')
    let [newUnit, setNewUnit] = useState ('')

    useEffect(() => {
        getList()
    }, [])

    const handleUpdate = (id) => {
        console.log( 'inside of Update');

        axios.put(`/list/addItem/${id}`)
            .then( response => {
                console.log( 'updated!', response);
                getList();
            }).catch( err => {
                console.log(err);
            })
    }

    const checkPurchased = (purchased, id ) => {
        console.log( purchased );
        if( purchased === false){
            return(
                <>
                    <button onClick={(event) => removeItem(id)}>DELETE</button>
                    <button onClick={(event) => handleUpdate(id)}>PURCHASE</button>
                </>

            )
        } else if ( purchased === true){
            return(
                <p>Purchased</p>
            )
        }
    }

    const getList = () => {
        console.log('In GET');

        axios.get('/list').then(response => {
            setShoppingList(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    // removeItem takes in an ID number and DELETEs the item from DB  
    const removeItem = (itemId) => {
        console.log('in removeItem', itemId);

        axios.delete(`/list/removeItem/${itemId}`)
            .then(response => {
                getList();
            }).catch(err => {
                console.log(err);
            })
    }

    // CLEAR data from database
    const clearItems = () => {
        console.log('in clearItems');

        axios.delete(`/list/clear`)
            .then(response => {
                getList();
            }).catch(err => {
                console.log( 'ERR in clear', err);
            })
    }

    //post route adds item to DB 
    const addList = (event) => {
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


    const handleReset = () => {
        console.log('clicked');
        
        axios.put('/list/reset')
        .then((response) => {
            console.log('RESET');
            getList();
        }).catch((err) => {
            console.log('Error in PUT RESET', err);
        })
    }

    return (
        <div className="App">
            <Header />
            <main>
                {/* Inputs and Buttons will be a new Component */}
                <h1>Add an Item</h1>
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

                    <button onClick={addList}>ADD ITEM</button>

                    <h1>Shopping List</h1>
                    <button onClick={handleReset}>RESET</button>
                    <button onClick={clearItems}>CLEAR</button>
                </form>

                {/* ShoppingList will be its own component */}
                {/* Each Item should be its own component */}
                <div className="mainDiv">
                {shoppingList.map(listItem => (
                            <div className="itemContainer" key={listItem.id}>
                                <p>{listItem.item}</p>
                                <p>{listItem.quantity}</p>
                                <p>{listItem.unit}</p>
                                <p>{listItem.purchased}</p>
                                {checkPurchased(listItem.purchased, listItem.id)}
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
}

export default App;
