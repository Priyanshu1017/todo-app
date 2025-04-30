export default function TodoItem({ todo, onTodoClick, isActive }) {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `July ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <div
            onClick={() => onTodoClick(todo)}
            className={`px-4 py-3 cursor-pointer transition-all ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
        >
            <h3 className="font-medium text-md text-black">{todo.title}</h3>
            <p className="text-black-600 text-sm truncate text-black">{todo.description}</p>
            <div className="text-xs text-black-400 mt-1 text-black">
                {formatDate(todo.date || todo.createdAt)}
            </div>
        </div>
    );
}