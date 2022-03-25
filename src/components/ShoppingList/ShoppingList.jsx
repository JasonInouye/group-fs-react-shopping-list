import axios from 'axios';
import ShoppingItem from '../ShoppingItem/ShoppingItem';

function ShoppingList ({shoppingList, getList}) {
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

    return (
        <>
            <div className="mainDiv">
                {shoppingList.map(listItem => (
                    <ShoppingItem 
                    key={listItem.id}
                    listItem={listItem}
                    checkPurchased={checkPurchased}
                    />
                ))}
            </div>
        </>
    );
};

export default ShoppingList;