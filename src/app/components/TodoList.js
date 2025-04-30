import TodoItem from './TodoItem';

export default function TodoList({ todos, onTodoSelect, selectedTodoId }) {
    if (!todos || todos.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                <p>No todos available. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onTodoClick={onTodoSelect}
                    isActive={selectedTodoId === todo._id}
                />
            ))}
        </div>
    );
}