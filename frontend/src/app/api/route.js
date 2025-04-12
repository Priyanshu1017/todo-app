import { NextResponse } from 'next/server';
import ConnectDB from '../lib/config/db';
import Todo from '../lib/models/Todo';

// Ensure DB connection is established
let dbPromise = ConnectDB().catch(console.error);

// Default todo
const defaultTodo = {
  title: 'Default Todo',
  description: 'This is a default todo created automatically.',
};

// GET handler - Fetch all todos
export async function GET() {
  try {
    await dbPromise;
    let todos = await Todo.find({}).sort({ createdAt: -1 });

    // If no todos exist, create a default todo
    if (todos.length === 0) {
      const createdTodo = await Todo.create(defaultTodo);
      todos = [createdTodo];
    }

    return NextResponse.json({ success: true, todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new todo
export async function POST(request) {
  try {
    await dbPromise;
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = await Todo.create({
      title,
      description: description || 'No description provided',
    });

    return NextResponse.json({ success: true, todo }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create todo' },
      { status: 500 }
    );
  }
}

// PUT handler - Update a todo
export async function PUT(request) {
  try {
    await dbPromise;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Todo ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, isCompleted } = body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (isCompleted !== undefined) updateData.isCompleted = isCompleted;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No update data provided' },
        { status: 400 }
      );
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, todo: updatedTodo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE handler - Delete a todo
export async function DELETE(request) {
  try {
    await dbPromise;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Todo ID is required' },
        { status: 400 }
      );
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return NextResponse.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Todo deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
