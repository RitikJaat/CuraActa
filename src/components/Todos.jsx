import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todos = () => {
    const [Todo, setTodo] = useState(""); // for input todo
    const [Todos, setTodos] = useState([]); // for stored todos
    const [showFinished, setshowFinished] = useState(true); // Toggle to show/hide completed todos

    // Fetch Todos from localStorage on component mount
    useEffect(() => {
        let todoString = localStorage.getItem("Todos");
        if (todoString) {
            let todos = JSON.parse(todoString);
            setTodos(todos);
        }
    }, []);

    // Save Todos to localStorage whenever Todos state changes
    useEffect(() => {
        if (Todos.length > 0) {
            localStorage.setItem("Todos", JSON.stringify(Todos));
        }
    }, [Todos]);

    const clearAll = () => {
        setTodos([]);
        localStorage.removeItem("Todos"); // Clear localStorage
    };

    const handleEdit = (e, id) => {
        let t = Todos.filter(i => i.id === id);
        setTodo(t[0].Todo);

        let newTodos = Todos.filter(item => item.id !== id);
        setTodos(newTodos);
    };

    const handleDelete = (e, id) => {
        let newTodos = Todos.filter(item => item.id !== id);
        setTodos(newTodos);
    };

    const handleAdd = () => {
        if (Todo.trim() === "") return; // Prevent adding empty todos
        setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
        setTodo("");
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    // Handle Enter key press to add a todo
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = Todos.findIndex(item => item.id === id);
        let newTodos = [...Todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const toggleHideCompleted = () => {
        setshowFinished(!showFinished);
    };

    return (
        <div>
            <div className='input bg-black/40 backdrop-blur-[1px] rounded-lg hover:backdrop-blur-[2px] hover:bg-black/60 duration-300 text-white px-2 mt-2'>
                <div className='flex items-center'>
                    <input
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} // Trigger handleAdd on Enter key press
                        value={Todo}
                        type="text"
                        name="add a todo"
                        id="todoinput"
                        placeholder='Add a Todo'
                        className='bg-black/40 rounded-lg p-2 text-center w-11/12 m-2 outline-none'
                    />
                    <button
                        onClick={handleAdd}
                        className='m-auto text-slate-300 bg-slate-950/50 rounded-xl px-2 py-2 hover:bg-slate-800/60 hover:text-green-400 duration-300 hover:rounded-2xl'>
                        Add Todo
                    </button>
                </div>
            </div>

            <div className='todos bg-black/40 backdrop-blur-[1px] rounded-lg hover:backdrop-blur-[2px] hover:bg-black/60 duration-300 text-white mt-2 min-h-[75vh]'>
                <div className="heading text-2xl font-bold flex items-center justify-between px-7 pt-2">
                    <span>Your Todos</span>
                    <div className="btns flex items-center gap-2">
                        <span
                            onClick={toggleHideCompleted}
                            className='font-normal hover:font-bold text-base bg-black/30 hover:bg-black/70 cursor-pointer rounded-md hover:rounded-2xl p-1 px-2 duration-150'>
                            {showFinished ? 'Hide Completed' : 'Show Completed'}
                        </span>
                        <span
                            onClick={clearAll}
                            className='flex items-center font-normal hover:font-bold text-base bg-black/30 hover:bg-black/70 cursor-pointer rounded-md hover:rounded-2xl p-1 px-2 duration-150'>
                            Clear <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                </div>

                {Todos.filter(item => showFinished || !item.isCompleted).map(item => (
                    <div key={item.id} className="displaytodo flex items-center justify-between px-4 pl-6 hover:bg-black/60 p-2 mt-1 duration-300">
                        <div className="rightSideText flex items-center gap-4">
                            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                            <div className={item.isCompleted ? "line-through decoration-double" : ""}>{item.Todo}</div>
                        </div>

                        <div className="buttons flex">
                            <button
                                onClick={(e) => handleEdit(e, item.id)}
                                className="edit group text-slate-800 hover:text-green-500 text-sm bg-white/50 hover:bg-slate-100/80 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center duration-300">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </span>
                                <span className="group-hover:inline-block hidden">Edit</span>
                            </button>

                            <button
                                onClick={(e) => { handleDelete(e, item.id) }}
                                className="delete group text-slate-800 hover:text-blue-600 text-sm bg-white/50 hover:bg-slate-100/80 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center duration-300">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </span>
                                <span className="group-hover:inline-block hidden">Delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todos;
