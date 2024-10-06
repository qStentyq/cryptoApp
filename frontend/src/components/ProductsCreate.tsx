import { Wrapper } from "./Wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./localbootstrap.scss";

export default function ProductsCreate() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch("http://localhost:8000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                description,
                price,
                quantity,
            }),
        });

        await navigate(-1);
    };

    return (
        <div className='local-bootstrap'>
            <Wrapper>
                <form className='mt-3' onSubmit={submit}>
                    <div className='form-floating pb-3'>
                        <input className='form-control' placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        <label>Name</label>
                    </div>

                    <div className='form-floating pb-3'>
                        <input
                            className='form-control'
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label>Description</label>
                    </div>

                    <div className='form-floating pb-3'>
                        <input
                            type='number'
                            className='form-control'
                            placeholder='Price'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label>Price</label>
                    </div>

                    <div className='form-floating pb-3'>
                        <input
                            type='number'
                            className='form-control'
                            placeholder='Quantity'
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <label>Quantity</label>
                    </div>

                    <button className='w-100 btn btn-lg btn-primary' type='submit'>
                        Submit
                    </button>
                </form>
            </Wrapper>
        </div>
    );
}
