import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';

const AlertTest = () => {
    const alert = useAlert();

    useEffect(() => {
        alert.success('This is a test success alert!');
        alert.error('This is a test error alert!');
        alert.info('This is a test info alert!');
    }, [alert]);

    return (
        <div>
            <h1>Check your alerts</h1>
        </div>
    );
};

export default AlertTest;
