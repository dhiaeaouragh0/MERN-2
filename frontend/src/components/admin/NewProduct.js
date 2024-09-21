import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newProduct, clearErrors } from '../../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import Carousel from '../product/Carousel'; // Import Carousel

const NewProduct = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    

    const categories = ['Electronics', 'Clothing', 'Books', 'Toys', 'Sports', 'Home', 'Other'];

    const { loading, error, success } = useSelector((state) => state.newProduct);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate('/admin/products');
            alert.success('Product added successfully');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        images.forEach(image => formData.append('images', image));
        dispatch(newProduct(formData));
    };

    const onChange = e => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };



    return (
        <Fragment>
            <MetaData title={"New Product"} />
            <div className='grid-container'>
                <Sidebar />
                <main className='main-container'>
                    <div className='main-title'>
                        <h3>NEW PRODUCT</h3>
                    </div>
                    <div className='p48 '>
                        <div className="full-page">
                            <div className="images_details">
                                {/* <Carousel autoSlide={false}>
                                    {imagesPreview.map((s) => s)}
                                </Carousel> */}
                                <Carousel autoSlide={false}>
                                    {imagesPreview.map((img, index) => (
                                        <img key={index} src={img} alt={`Preview ${index}`} className='fixed-image' />
                                    ))}
                                </Carousel>
                            </div>

                            <div className='product_details'>
                                <form encType='multipart/form-data' onSubmit={submitHandler}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            type='text'
                                            id='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='price'>Price</label>
                                        <input
                                            type='number'
                                            id='price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Description</label>
                                        <textarea
                                            id='description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='category'>Category</label>
                                        <select
                                            id='category'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        >
                                            <option value=''>Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='stock'>Stock</label>
                                        <input
                                            type='number'
                                            id='stock'
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='seller'>Seller</label>
                                        <input
                                            type='text'
                                            id='seller'
                                            value={seller}
                                            onChange={(e) => setSeller(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='images'>Images</label>
                                        <input
                                            type='file'
                                            id='images'
                                            accept='.jpg, .jpeg, .png'  
                                            multiple
                                            onChange={onChange}
                                        />
                                    </div>
                                    <button type='submit' disabled={loading}>Create Product</button>
                                </form>
                            </div>
                            
                        </div>

                        
                    </div>
                </main>
            </div>
        </Fragment>
    );
};

export default NewProduct;
