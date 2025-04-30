'use client';

import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import TodoShow from './components/TodoShow';
import { Search } from 'lucide-react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('list'); // 'list', 'editor', 'show'

  const fetchTodos = async () => {
    try {
      // const response = await axios.get("/api");
      // setTodos(response.data.todos);
      localStorage.setItem("todos", JSON.stringify(response.data.todos));
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
    } else {
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTodoSelect = (todo) => {
    setSelectedTodo(todo);
    setCurrentView('show'); // Switch to show view when a todo is selected
  };

  const handleAddTodo = () => {
    const newTodo = {
      _id: Date.now().toString(),
      title: '',
      description: '',
      createdAt: new Date().toISOString(),
      isNew: true
    };
    setSelectedTodo(newTodo);
    setCurrentView('editor'); // Switch to editor view when adding a new todo
  };

  const handleTodoUpdate = (updatedTodo) => {
    const exists = todos.some(todo => todo._id === updatedTodo._id);
    const updatedTodos = exists
      ? todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo)
      : [updatedTodo, ...todos];

    setTodos(updatedTodos);
    setSelectedTodo(updatedTodo);
    setCurrentView('show'); // Return to show view after update
  };

  const handleTodoDelete = (todoId) => {
    const updatedTodos = todos.filter(todo => todo._id !== todoId);
    setTodos(updatedTodos);

    if (selectedTodo && selectedTodo._id === todoId) {
      setSelectedTodo(updatedTodos.length > 0 ? updatedTodos[0] : null);
      setCurrentView('list'); // Go back to list view if the selected todo is deleted
    }
  };

  const handleSubmitTodo = (updatedTodo) => {
    if (!updatedTodo.title.trim() || !updatedTodo.description.trim()) return;
    handleTodoUpdate(updatedTodo);
    setCurrentView('show'); // Show the todo after submitting
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render the appropriate content based on currentView
  const renderContent = () => {
    switch (currentView) {
      case 'editor':
        return (
          <TodoEditor
            todo={selectedTodo}
            onUpdate={handleTodoUpdate}
            onDelete={handleTodoDelete}
            onSubmit={handleSubmitTodo}
          />
        );
      case 'show':
        return (
          <TodoShow
            todo={selectedTodo}
            onEdit={() => setCurrentView('editor')}
            onDelete={handleTodoDelete}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">Select a todo to view details or add a new one by clicking on "+Todo"</p>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Left sidebar - fixed */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
        {/* Fixed header section */}
        <div className="flex-shrink-0">
          <div className="p-4 flex items-center">
            <div className="bg-green-500 w-6 h-6 rounded-md flex items-center justify-center mr-2">
              <div className="w-3 h-3 bg-white rotate-45"></div>
            </div>
            <span className="font-bold text-lg">TODO</span>
          </div>

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
                <Search className="h-4 w-4 text-gray-400" />
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
        </div>

        {/* Scrollable todo list */}
        <div className="flex-1 overflow-y-auto">
          <TodoList
            todos={filteredTodos}
            onTodoSelect={handleTodoSelect}
            selectedTodoId={selectedTodo?._id}
          />
        </div>
      </div>

      {/* Main content area - changes based on routing */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </main>
  );
}