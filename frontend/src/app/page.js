// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import { Search } from 'lucide-react';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Use local storage to persist todos
    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            const parsedTodos = JSON.parse(storedTodos);
            setTodos(parsedTodos);

            // Select first todo if available
            if (parsedTodos.length > 0 && !selectedTodo) {
                setSelectedTodo(parsedTodos[0]);
            }
        } else {
            // Initialize with a sample todo
            const sampleTodo = {
                _id: Date.now().toString(),
                title: 'New Additions',
                placeholder: "",
                createdAt: new Date().toISOString()
            };
            setTodos([sampleTodo]);
            setSelectedTodo(sampleTodo);
            localStorage.setItem('todos', JSON.stringify([sampleTodo]));
        }
    }, []);

    // Save todos to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleTodoSelect = (todo) => {
        setSelectedTodo(todo);
    };

    const handleAddTodo = () => {
        const newTodo = {
            _id: Date.now().toString(),
            title: 'New Additions',
            description: '',
            createdAt: new Date().toISOString()
        };

        const updatedTodos = [newTodo, ...todos];
        setTodos(updatedTodos);
        setSelectedTodo(newTodo);
    };

    const handleTodoUpdate = (updatedTodo) => {
        const updatedTodos = todos.map(todo =>
            todo._id === updatedTodo._id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
        setSelectedTodo(updatedTodo);
    };

    const handleTodoDelete = (todoId) => {
        const updatedTodos = todos.filter(todo => todo._id !== todoId);
        setTodos(updatedTodos);

        // If the deleted todo was selected, select first available todo
        if (selectedTodo && selectedTodo._id === todoId) {
            setSelectedTodo(updatedTodos.length > 0 ? updatedTodos[0] : null);
        }
    };

    // Filter todos based on search query
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex min-h-screen bg-gray-50">
            {/* Left Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* App Logo */}
                <div className="p-4 flex items-center">
                    <div className="bg-green-500 w-6 h-6 rounded-md flex items-center justify-center mr-2">
                        <div className="w-3 h-3 bg-white rotate-45"></div>
                    </div>
                    <span className="font-bold text-lg">TODO</span>
                </div>

                {/* Create Todo Button */}
                <div className="px-4 py-2">
                    <button
                        onClick={handleAddTodo}
                        className="px-4 py-2 bg-black text-white rounded-md flex items-center justify-center w-28"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        TODO
                    </button>
                </div>

                <div className="px-4 py-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-black-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-100 w-full rounded-full text-sm focus:outline-none text-black"
                        />
                    </div>
                </div>

                {/* Todo List */}
                <div className="flex-1 overflow-y-auto">
                    <TodoList
                        todos={filteredTodos}
                        onTodoSelect={handleTodoSelect}
                        selectedTodoId={selectedTodo?._id}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <TodoEditor
                    todo={selectedTodo}
                    onUpdate={handleTodoUpdate}
                    onDelete={handleTodoDelete}
                />
            </div>
        </main>
    );
}