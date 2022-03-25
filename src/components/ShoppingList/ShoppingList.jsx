import axios from 'axios';

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
                            <div className="itemContainer" key={listItem.id}>
                                <p>{listItem.item}</p>
                                <p>{listItem.quantity}</p>
                                <p>{listItem.unit}</p>
                                <p>{listItem.purchased}</p>
                                {checkPurchased(listItem.purchased, listItem.id)}
                            </div>
                        ))}
            </div>
        </>
    );
};

export default ShoppingList;