import { Trash2, Edit } from 'lucide-react';

export default function TodoShow({ todo, onEdit, onDelete }) {
    if (!todo) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a todo to view details</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })}`;
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h3 className="flex  justify-center items-center text-2xl font-larger w-full focus:outline-none">Your Todo&apos;s</h3>
            <div className="bg-white p-6 rounded-lg border border-green-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-black">{todo.title}</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={onEdit}
                            className="p-2 text-green-500 hover:text-green-700"
                            title="Edit todo"
                        >
                            <Edit className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onDelete(todo._id)}
                            className="p-2 text-green-500 hover:text-red-500"
                            title="Delete todo"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                    Created: {formatDate(todo.createdAt)}
                </div>

                <div className="border-t border-green-200 pt-4 text-black">
                    <p>Here&apos;s the content of the selected todo:</p>
                    <p className="whitespace-pre-wrap">{todo.description}</p>
                </div>
            </div>
        </div>
    );
}