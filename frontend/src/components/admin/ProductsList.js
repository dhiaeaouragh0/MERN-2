import React, { Fragment ,useEffect ,useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts,deleteProduct , clearErrors} from '../../actions/productActions';
import { useAlert } from 'react-alert';
import '../order/order.css'
import './admin.css'
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
// import { useNavigate } from 'react-router-dom';
import { 
    BsPlusCircle , 
    BsPencil , 
    BsPower , 
    BsTrash  
  } from 'react-icons/bs';

const ProductsList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const navigat = useNavigate();

    const { loading, error, products } = useSelector((state) => state.products);
    const {error:deleteError,isDeleted} = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(getAdminProducts());
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success('Product deleted successfully');
            navigate('/admin/products');
            dispatch({type: DELETE_PRODUCT_RESET});
        }
    }, [dispatch, alert, error,deleteError,isDeleted,navigate]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field:'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                }
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                name: product.name,
                price: `${product.price} DA`,
                stock: product.stock,
                actions: (<Fragment>
                    <div className="sorting_asc">
                        <Link to={`/admin/product/${product._id}`} className='btn btn-darkblue py-1 px-2'>
                            <BsPencil  className='card_icon' />
                        </Link>
                        <button className='btn btn-darkblue py-1 px-2 ml-2' 
                        onClick={() => deleteProductHandler(product._id)}>
                            <BsTrash className='card_icon' />
                        </button>
                    </div>    
                    </Fragment>
                        
                )       
            })
        })
        return data;
    }
    const [B_sidebar, setB_sidebar] = useState(false);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }


  return (
    <Fragment>
        <MetaData title={"Products"}/>
        <div className='grid-container'>
            <Sidebar/>
            <main className='main-container'>
                
                <div className='main-title'>
                    {/* Utilisation d'une fonction fléchée pour le gestionnaire d'événements */}
                    <i 
                    onClick={() => setB_sidebar(!B_sidebar)} 
                    className={`B-sidebar fa ${B_sidebar ? "fa-close" : "fa-bars"}`}
                    ></i>
                    <h3>PRODUCTS</h3>
                </div>
                <div className='p48 main-cards'>
                    <Link to={'/admin/products/new'}>
                        <div className='card'>
                            <div className='card-inner'>
                                <h3>ADD</h3>
                                <BsPlusCircle  className='card_icon' />
                            </div>
                        </div>
                    </Link>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>EDIT</h3>
                            <BsPencil  className='card_icon' />
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>DESABLE</h3>
                            <BsPower  className='card_icon' />
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>REMOVE</h3>
                            <BsTrash className='card_icon' />
                        </div>
                    </div>
                </div>

                <div className='m-5'>
                {loading? <Loader /> : (
                    <MDBDataTable
                        data={setProducts()}
                        className='table-product'
                        bordered
                        striped
                        hover
                            />  )} 
                </div>
            </main>
            
       </div>
        
    </Fragment>
  )
}

export default ProductsList