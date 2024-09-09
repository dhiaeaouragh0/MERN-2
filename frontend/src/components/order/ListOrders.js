import React, { Fragment ,useEffect} from 'react';
import { Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import './order.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { myOrder , clearErrors} from '../../actions/orderAction';
import { useAlert } from 'react-alert';

const ListOrders = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    useEffect(() => {
        dispatch(myOrder());
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field:'status',
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
        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `${order.totalPrice} DA`,
                status: order.orderStatus && String(order.orderStatus).includes('Deliverd')
                    ? <p style={{color:'green'}}>{order.orderStatus}</p>
                    : <p style={{color:'red'}}>{order.orderStatus}</p>,
                actions: (

                        <Link to={`/order/${order._id}`} className='btn btn-primary'>
                            <i className='fa fa-eye'></i>
                            </Link>
                )
            })
        })
        return data;
    }


  return (
    <Fragment>
        <div className='m-5'>
           <MetaData title={"My Orders"}/>
        <h1 className='white'>My Orders</h1>
        {loading? <Loader /> : (
            <MDBDataTable
                data={setOrders()}
                className='px-3'
                bordered
                striped
                hover
                  />  )} 
        </div>
    </Fragment>
  )
}

export default ListOrders