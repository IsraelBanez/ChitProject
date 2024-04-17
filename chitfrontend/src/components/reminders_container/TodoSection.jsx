import React from 'react'
import './TodoSection.css';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

function TodoSection() {
    return (
        <section className='todo-section'>
            <TodoHeader/>
            <TodoList/>
        </section>
    )
}

export default TodoSection