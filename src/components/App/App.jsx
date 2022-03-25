import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import ListForm from '../ItemListForm/ItemListForm.jsx';
import ShoppingList from '../ShoppingList/ShoppingList.jsx';
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

    // CLEAR data from database
    const clearItems = () => {
        console.log('in clearItems');

        axios.delete(`/list/clear`)
            .then(response => {
                getList();
            }).catch(err => {
                console.log('ERR in clear', err);
            })
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
                
                <ListForm
                    handleReset={handleReset}
                    clearItems={clearItems}
                    getList={getList}
                />

                <ShoppingList
                    shoppingList={shoppingList}
                    getList={getList}
                />
            </main>
        </div>
    );
}


export default App;
