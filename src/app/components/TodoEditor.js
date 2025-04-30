import { useState, useEffect } from 'react';
import { Trash2, X } from 'lucide-react';

export default function TodoEditor({ todo, onUpdate, onDelete, onSubmit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || '');
            setDescription(todo.description || '');
        }
    }, [todo]);
    const handleDelete = () => setShowConfirm(true);
    const confirmDelete = () => {
        onDelete(todo._id);
        setShowConfirm(false);
    };
    const cancelDelete = () => setShowConfirm(false);

    if (!todo) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a todo to edit</p>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-3xl mx-auto">
                <h3 className='flex  justify-center items-center text-2xl font-larger w-full focus:outline-none'>Save something important</h3>
                <div className="bg-white p-6 rounded-lg border border-green-200 shadow-sm">
                    <div className="flex justify-between items-center mb-4 text-black">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-2xl font-bold w-full focus:outline-none"
                            placeholder="Write the Title here"
                        />
                        <button
                            onClick={handleDelete}
                            className="p-2 text-green-500 hover:text-red-500"
                            title="Delete todo"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="border-t border-green-200 pt-4 text-black">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[200px] focus:outline-none resize-none"
                            placeholder="Add description here..."
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => {
                                if (!title.trim() || !description.trim()) {
                                    alert('Title and description are required');
                                    return;
                                }

                                onSubmit({
                                    ...todo,
                                    title,
                                    description,
                                    createdAt: todo.createdAt || new Date().toISOString()
                                });
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                {showConfirm && (
                    <div className=" bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
                        <span>Are you sure you want to delete this todo?</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}