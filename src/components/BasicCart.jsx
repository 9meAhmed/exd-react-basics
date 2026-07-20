import { useState } from 'react';

export default function BasicCart() {

    const symbol = '$';

    const products = [
        { id: 1, name: 'Bread', price: 2.50 },
        { id: 2, name: 'Milk', price: 1.75 },
        { id: 3, name: 'Eggs', price: 3.20 },
        { id: 4, name: 'Cheese', price: 4.10 },
        { id: 5, name: 'Apples', price: 2.80 },
        { id: 6, name: 'Bananas', price: 1.30 },
        { id: 7, name: 'Chicken', price: 6.50 },
        { id: 8, name: 'Rice', price: 2.25 },
        { id: 9, name: 'Pasta', price: 1.90 },
        { id: 10, name: 'Yogurt', price: 1.20 }
    ];

    const [cartItems, setCartItems] = useState([]);

    const isCartEmpty = cartItems.length === 0;
    const totalAmount = cartItems.reduce((subTotal, current) => {
        return (current.price * current.quantity) + subTotal;
    }, 0);

    

    const addToCart = ({id, name, price}) => {

        if(isCartEmpty){
            const newCartItem = { id, name, price, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
        }else{
            const foundCartItem = findCartProductById(id);
            if(foundCartItem){
                increaseQuantity(id)
            }else{
                const newCartItem = { id, name, price, quantity: 1 };
                setCartItems([...cartItems, newCartItem]);
            }
        }
    }

    const increaseQuantity = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    }

    const decreaseQuantity = (id) => {

        const foundCartItem = findCartProductById(id);

        if(foundCartItem && foundCartItem.quantity <= 1){
            removeCartItem(id);
        }else{

            const updatedCartItems = cartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            setCartItems(updatedCartItems);
        }
    }

    const removeCartItem = (id) => {
        const updatedCartItems = cartItems.filter((item) => {
            return item.id !== id
        });

        setCartItems([...updatedCartItems]);
    }

    const findCartProductById = (id) => {
        return cartItems.find(item => item.id === id);
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            products.map(product => (
                                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {product.name}
                                    <span>
                                        <span className="mr-4">
                                            <strong>{symbol}{product.price.toFixed(2)}</strong>
                                        </span>
                                        <button onClick={()=>{addToCart(product)}} className="btn btn-sm btn-success ms-2">Add to Cart</button>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>Total Amount: {symbol}{totalAmount.toFixed(2)}</h5>
                    <ul className="list-group">
                        {
                            cartItems.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.name}
                                    <span>
                                        <strong>{symbol}{(item.price * item.quantity).toFixed(2)}</strong>
                                    </span>
                                    <span className='d-flex'>
                                        <button onClick={() => increaseQuantity(item.id)} className="btn btn-sm btn-success ms-2"><i className="bi bi-plus-circle"></i></button>
                                        <span className='mr-2 ml-2'>{item.quantity}</span>

                                        {
                                            item.quantity == 1 ? <button onClick={()=>{removeCartItem(item.id)}} className="btn btn-sm btn-danger ms-2"><i className="bi bi-trash"></i></button> : <button onClick={()=>{decreaseQuantity(item.id)}} className="btn btn-sm btn-success ms-2"><i className="bi bi-slash-circle"></i></button>
                                        }

                                    </span>
                                </li>
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
    );
}