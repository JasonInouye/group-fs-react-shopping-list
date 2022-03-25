

function ShoppingItem({listItem, checkPurchased}) {
    return (
        <>
            <div className="itemContainer" key={listItem.id}>
                <p>{listItem.item}</p>
                <p>{listItem.quantity}</p>
                <p>{listItem.unit}</p>
                <p>{listItem.purchased}</p>
                {checkPurchased(listItem.purchased, listItem.id)}
            </div>
        </>
    )
}
export default ShoppingItem;