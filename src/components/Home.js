import React from 'react';
import Transactions from '../components/Transactions/Transactions';
import Balance from './Balance';
import Form from './Form';

const Home = () => {
    return (
        <>
            <Balance />
            <Form />
            <Transactions />
        </>
    );
};

export default Home;