import React, { Fragment ,useEffect ,useState} from 'react';
import { Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts , clearErrors} from '../../actions/productActions';
import { useAlert } from 'react-alert';
import '../order/order.css'
import Sidebar from './Sidebar';
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
    // const navigat = useNavigate();

    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAdminProducts());
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

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
                        <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        <button className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </button>
                        </Fragment>
                )       
            })
        })
        return data;
    }
    const [B_sidebar, setB_sidebar] = useState(false);


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
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>ADD</h3>
                            <BsPlusCircle  className='card_icon' />
                        </div>
                    </div>
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
                        className='px-3'
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