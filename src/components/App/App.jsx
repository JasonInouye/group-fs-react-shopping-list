import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';

function App() {
    let [shoppingList, setShoppingList] = useState([]);

    const [newPurchaseStatus, setNewPurchaseStatus] = useState('')

    useEffect(() => {
        getList()
    }, [])

    const handleUpdate = (id) => {
        console.log( 'inside of Update');

        axios.put(`/list/${id}`)
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
                    <button onClick={(event) => handleDelete(id)}>DELETE</button>
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
                                {checkPurchased(listItem.purchased, listItem.id)}
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
}

export default App;
