// pages/todos.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header'
import AddTask from '@/components/AddTask'
import ShowTaskIncomplete from '@/components/ShowTaskIncomplete'
import ShowTaskComplete from '@/components/ShowTaskComplete'



const TodosPage = () => {
    const router = useRouter();

    useEffect (() => {
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            router.push('/login')
        }
    }, [])
    


    return (
        <div className="container">
            <Header/>
            <AddTask/>
            <ShowTaskIncomplete/>
            <ShowTaskComplete/>
        </div>         
    );
};

export default TodosPage;
