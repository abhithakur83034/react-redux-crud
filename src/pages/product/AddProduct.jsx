import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getpro } from '../../store/slices/product';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [proName, setProName] = useState("");
    const [proNameErr, setProNameErr] = useState("");
    const [proPrice, setProPrice] = useState('');
    const [proPriceErr, setProPriceErr] = useState('');
    const [proDescription, setProDescription] = useState('');
    const [proDescriptionErr, setProDescriptionErr] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity to 1

    const dispatch = useDispatch();
    const getProducts = useSelector(getpro);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(getProducts);
    }, [getProducts]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!proName.trim()) {
            setProNameErr('Title is required.');
        } else {
            setProNameErr('');
        }

        if (!proPrice.trim()) {
            setProPriceErr('Price is required.');
        } else {
            setProPriceErr('');
        }

        if (!proDescription.trim()) {
            setProDescriptionErr('Description is required.');
        } else {
            setProDescriptionErr('');
        }

        if (proName.trim() && proPrice.trim() && proDescription.trim()) {
            const data = {
                proName,
                proPrice,
                proDescription,
                quantity,
            };

            dispatch(createProduct(data));
            navigate('/');
        }
    };

    return (
        <Container>
            <h1 className='text-center'>Add Your Product</h1>
            <Row>
                <Col></Col>
                <Col>
                    <form onSubmit={handleSubmit}>
                        <p>
                            <input
                                placeholder='Enter Product Name'
                                type='text'
                                className='form-control'
                                value={proName}
                                onChange={(e) => { setProName(e.target.value); setProNameErr(e.target.value ? "" : "Product name is required"); }}
                            />
                            {proNameErr && <p className='err'>{proNameErr}</p>}
                        </p>
                        <p>
                            <input
                                placeholder='Enter Product Price'
                                type='number'
                                className='form-control'
                                value={proPrice}
                                onChange={(e) => { setProPrice(e.target.value); setProPriceErr(e.target.value ? "" : "Product price is required"); }}
                            />
                            {proPriceErr && <p className='err'>{proPriceErr}</p>}
                        </p>
                        <p>
                            <textarea
                                placeholder='Enter Product Description'
                                className='form-control'
                                value={proDescription}
                                onChange={(e) => { setProDescription(e.target.value); setProDescriptionErr(e.target.value ? "" : "Product description is required"); }}
                            ></textarea>
                            {proDescriptionErr && <p className='err'>{proDescriptionErr}</p>}
                        </p>
                        <p>
                            <input
                                placeholder='Enter Quantity'
                                type='number'
                                className='form-control'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                disabled
                            />
                        </p>
                        <p>
                            <input type='submit' value="Create" className='form-control' />
                        </p>
                    </form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default AddProduct;
