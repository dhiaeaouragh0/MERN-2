import React, { Fragment } from 'react';
import { Link} from 'react-router-dom';
import './user.css';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useSelector } from 'react-redux';


const Profile = () => {

    const {user , loading } = useSelector(state => state.auth)
  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={'Your Profile'}/>

                <div className='full-page-login'>
                <div className='backg'>
                    <div className='left-panel'>
                        <figure className='avatar avatar-profile'>
                            <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                        </figure>
                        <div className='buttons'>

                               <Link to="/me/update">
                                    <div className="btn-left edit_profile">Edit Profile</div>  
                                </Link> 

                                <Link to="/password/update">
                                    <div className="btn-left edit_profile">
                                        Change Password
                                    </div>
                                    
                                </Link>  
            
                            
                        </div>
                    </div>
                    <div className='right-panel'>
                        <h4>Full Name</h4>
                        <h3>    {user.name}</h3>

                        <h4>Email Address</h4>
                        <h3>    {user.email}</h3>

                        <h4>Role</h4>
                        <h3>    {user.role}</h3>

                        <h4 className='closeed'>Joined On</h4>
                        <h3 className='closeed'>{String(user.createdAt).substring(0, 10)}</h3>
                    </div>
                </div>
                </div>


            </Fragment>
        )}
    </Fragment>
  )
}

export default Profile