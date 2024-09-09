import React from 'react';
import {BsGrid1X2Fill,BsFillArchiveFill,BsFillGrid3X3GapFill
    ,BsPeopleFill,BsListCheck,BsMenuButtonWideFill,BsFillGearFill
} from 'react-icons/bs'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return(
        <aside id="sidebar">
            <div className="sidebar-title">

                <span className='icon close_icon'>span</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to={`/dashboard/`}>
                        <BsGrid1X2Fill className='icon'/>Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/admin/products`}>
                        <BsFillArchiveFill className='icon'/>Products
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`#/product/`}>
                        <BsFillGrid3X3GapFill className='icon'/>Categories
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`#/product/`}>
                        <BsPeopleFill className='icon'/>Customers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`#/product/`}>
                        <BsListCheck className='icon'/>Inventory
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`#/product/`}>
                        <BsMenuButtonWideFill className='icon'/>Reports
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`#/product/`}>
                        <BsFillGearFill className='icon'/>Setting
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
export default Sidebar;