// src/app/components/TodoEditor.js
'use client';

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function TodoEditor({ todo, onUpdate, onDelete }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || '');
            setDescription(todo.description || '');
        }
    }, [todo]);

    if (!todo) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-black-500">Select a todo to view details</p>
            </div>
        );
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        // Auto-save after a brief delay
        setTimeout(() => {
            onUpdate({
                ...todo,
                title: e.target.value,
                description
            });
        }, 500);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        // Auto-save after a brief delay
        setTimeout(() => {
            onUpdate({
                ...todo,
                title,
                description: e.target.value
            });
        }, 500);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            onDelete(todo._id);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `July ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-green-200 shadow-sm">
                <div className="flex justify-between items-center mb-4 text-black">
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="text-2xl font-bold w-full focus:outline-none"
                        placeholder="Title"
                    />
                    <button
                        onClick={handleDelete}
                        className="p-2 text-green-500 hover:text-red-500"
                        title="Delete todo"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center space-x-1 mb-4 text-black">
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span className="font-bold ">B</span>
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span className="italic">I</span>
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span className="underline">U</span>
                    </button>
                    <span className="mx-1 text-black-300">|</span>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span>⟹</span>
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span>≡</span>
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span>⋮</span>
                    </button>
                    {/* <button className="p-2 hover:bg-green-100 rounded">
                        <span>⦿</span>
                    </button>
                    <span className="mx-1 text-black-300">|</span>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span>A↓</span>
                    </button>
                    <button className="p-2 hover:bg-green-100 rounded">
                        <span>↑</span>
                    </button> */}
                </div>

                <div className="border-t border-green-200 pt-4 text-black">
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full min-h-[200px] focus:outline-none resize-none"
                        placeholder="Add description here..."
                    />

                
                </div>

               
            </div>
        </div>
    );
}