// src/app/api/todos/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/services/mongodb';
import Todo from '@/models/Todo';

export async function GET(request, { params }) {
    try {
        await connectToDatabase();
        const id = params.id;

        const todo = await Todo.findById(id);

        if (!todo) {
            return NextResponse.json(
                { message: 'Todo not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const id = params.id;
        const data = await request.json();

        const todo = await Todo.findById(id);

        if (!todo) {
            return NextResponse.json(
                { message: 'Todo not found' },
                { status: 404 }
            );
        }

        todo.title = data.title || todo.title;
        todo.description = data.description || todo.description;

        const updatedTodo = await todo.save();

        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const id = params.id;

        const todo = await Todo.findById(id);

        if (!todo) {
            return NextResponse.json(
                { message: 'Todo not found' },
                { status: 404 }
            );
        }

        await Todo.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Todo removed' });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}