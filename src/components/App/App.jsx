import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';

function App() {
    let [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        console.log('In GET');

        axios.get('/list').then(response => {
            setShoppingList(response.data)
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        })

    }


    return (
        <div className="App">
            <Header />
            <main>
                <h1>Add an Item</h1>
                <label htmlFor="Item">Item: </label>
                <input type="text" placeholder="Item"/>
                <label htmlFor="Item">Quantity: </label>
                <input type="number" placeholder="Quantity"/>
                <label htmlFor="Item">Unit: </label>
                <input type="text" placeholder="Unit"/>
                <button>ADD ITEM</button>

                <h1>Shopping List</h1>
                <button>RESET</button>
                <button>CLEAR</button>

                <div>
                {shoppingList.map(listItem => (
                            <div key={listItem.id}>
                                <p>{listItem.item}</p>
                                <p>{listItem.quantity}</p>
                                <p>{listItem.unit}</p>
                                <p>{listItem.purchased}</p>
                                <button onClick={(event) => handleDelete(student.id)}>DELETE</button>
                                <button>PURCHASE</button>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
}

export default App;
