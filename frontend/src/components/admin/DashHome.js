import React, { useState ,useEffect} from 'react';
import { Link} from 'react-router-dom';
import { 
  BsFillArchiveFill, 
  BsBox   , 
  BsPeopleFill, 
  BsFillBellFill 
} from 'react-icons/bs';
import { 
  BarChart, 
  Bar,  
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions';



const DashHome = () => {
  const data = [
    { name: 'Page D', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page H', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page I', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page A', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];
  const [B_sidebar, setB_sidebar] = useState(false);


  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);
  
  let outOfStock = 0;

  products.forEach(product => {
    if (product.stock <= 0) {
      outOfStock++;
    }
  });


  return (
    <main className='main-container'>
      <div className='main-title'>
        {/* Utilisation d'une fonction fléchée pour le gestionnaire d'événements */}
        <i 
          onClick={() => setB_sidebar(!B_sidebar)} 
          className={`B-sidebar fa ${B_sidebar ? "fa-close" : "fa-bars"}`}
        ></i>
        <h3>DASHBOARD</h3>
      </div>

      <div className='p-4 main-cards'>
        
          <Link to={`/admin/products`}>
            <div className='card'>
              <div className='card-inner'>
                <h3>PRODUCTS</h3>
                <BsFillArchiveFill className='card_icon' />
              </div>
              <h1>{products&& products.length}</h1>
            </div>
          </Link>

        <div className='card'>
          <div className='card-inner'>
            <h3>ORDERS</h3>
            <BsBox className='card_icon' />
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>33</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>OUT OF STOCK</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>{outOfStock}</h1>
        </div>
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#50E3C2" /> 
              <Bar dataKey="uv" fill="#3DC6C3" />
              <Bar dataKey="amt" fill="#3AC0DA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='chart-container'>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default DashHome;
