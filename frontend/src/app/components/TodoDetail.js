// src/app/components/TodoDetail.js
'use client';

import { useState, useEffect } from 'react';

export default function TodoDetail({ todo, onUpdate, onDelete }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || '');
            setDescription(todo.description || '');
            setError('');
        }
    }, [todo]);

    if (!todo) {
        return (
            <div className="h-full flex items-center justify-center bg-white rounded-lg shadow p-6 text-black">
                <p className="text-gray-500">Select a todo to view details</p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title || !description) {
            setError('Title and description are required');
            return;
        }

        // Create updated todo
        const updatedTodo = {
            ...todo,
            title,
            description
        };

        onUpdate(updatedTodo);
        setIsEditing(false);
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
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="h-full bg-white p-6 rounded-lg shadow">
            {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-black">
                    {error}
                </div>
            )}

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="edit-title" className="block text-sm font-medium text-black-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="edit-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="edit-description" className="block text-sm font-medium text-black-700 mb-1 text-black">
                            Description
                        </label>
                        <textarea
                            id="edit-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            rows="6"
                            required
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setTitle(todo.title);
                                setDescription(todo.description);
                                setError('');
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-black">{todo.title}</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                        <div className="text-sm text-black-500 mb-4 text-black">
                        Created: {formatDate(todo.createdAt || todo.date)}
                    </div>

                        <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-black">
                        {todo.description}
                    </div>
                </>
            )}
        </div>
    );
}