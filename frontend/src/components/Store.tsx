import React, { useEffect, useState } from "react";
import "./Product.scss";

export interface storageResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export interface orderPost {
    id: string;
    quantity: number;
}

export default function Store() {
    const [fetchData, setFetchData] = useState<storageResponse[]>([]);
    const [cartItems, setCartItems] = useState<orderPost[]>([]);
    const [quantity, setQuantity] = useState<number[]>([]);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8000/products/")
            .then((resp) => resp.json())
            .then((json) => {
                setFetchData(json);
                console.log(fetchData);
                setQuantity(new Array(json.length).fill(0));
            })
            .catch((e) => console.log(e));
    }, []);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = [...quantity]; // Копируем массив
        newQuantity[index] = Number(e.target.value); // Обновляем конкретное значение по индексу
        setQuantity(newQuantity); // Устанавливаем обновленный массив
        console.log(quantity);
    };

    const handleCard = (item: orderPost, price: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setCartItems((cartItems) => [...cartItems, item]);
        setSum((sum) => sum + price * item.quantity);
        console.log(cartItems);
    };

    async function handleBuy() {
        const requests = cartItems.map((item) =>
            fetch("http://localhost:8001/orders/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    //;charset=utf-8
                },
                body: JSON.stringify(item),
            })
        );

        await Promise.all(requests); // Ждём завершения всех запросов

        // Обновляем данные сразу после завершения всех покупок
        await fetchDataAgain(); // Обновляем интерфейс сразу
    }

    const fetchDataAgain = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const resp = await fetch("http://localhost:8000/products/");
        const json = await resp.json();
        console.log("updated data: ", json);
        setSum(0);
        setCartItems([]);
        setFetchData(json);
        setQuantity(new Array(json.length).fill(0));
        // setUpdateToggle(!updateToggle);
    };
    return (
        <>
            <div className='product-container'>
                {fetchData.map((item, i) => (
                    <a key={i} className='product-card' href='#' onClick={(e) => e.preventDefault()}>
                        <img
                            className='product-card__image'
                            src={
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/768px-Cc.logo.circle.svg.png"
                            }
                        />
                        <p className='product-card__brand'>{item.name}</p>
                        <p className='product-card__description'>{item.description}</p>
                        <p className='product-card__price'>Price: {item.price} MDL</p>
                        <p className='product-card__price'>Remained: {item.quantity}</p>
                        <label className='input'>
                            <input
                                className='input__field'
                                type='number'
                                placeholder=' '
                                value={quantity[i] > 0 ? quantity[i] : 0}
                                //@ts-ignore
                                onChange={(e) => handleQuantityChange(e, i)}
                            />
                            <span className='input__label'>Enter amount: </span>
                        </label>
                        <button
                            className='button-44'
                            onClick={(e) => handleCard({ id: item.id, quantity: quantity[i] }, item.price, e)}
                        >
                            Add to cart{" "}
                        </button>
                        <button className='product-card__btn-wishlist'>
                            <svg viewBox='0 0 18 16' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z'
                                    strokeWidth='2'
                                />
                            </svg>
                        </button>
                    </a>
                    // <div key={i}>
                    //     {item.name}, Price: {item.price} Left: {item.quantity}
                    //     <br></br>
                    //     <label>
                    //         Enter amount:
                    //         <input
                    //             name='myInput'
                    //             type='number'
                    //             value={quantity[i] || 0}
                    //             //@ts-ignore
                    //             onChange={(e) => handleQuantityChange(e, i)}
                    //         />
                    //     </label>
                    //     <button onClick={() => handleCard({ id: item.id, quantity: quantity[i] }, item.price)}>
                    //         Add to cart{" "}
                    //     </button>
                    // </div>
                ))}
            </div>
            <div>For pay: {sum} MDL</div>
            <button onClick={handleBuy}>Buy items from cart</button>
            <button
                onClick={() => {
                    setCartItems([]);
                    setSum(0);
                }}
            >
                Clear cart
            </button>
        </>
    );
}
