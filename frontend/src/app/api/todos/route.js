// src/app/api/todos/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/services/mongodb';
import Todo from '@/models/Todo';

export async function GET(request) {
    try {
        await connectToDatabase();

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const todos = await Todo.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalTodos = await Todo.countDocuments();
        const totalPages = Math.ceil(totalTodos / limit);

        return NextResponse.json({
            todos,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalTodos,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectToDatabase();
        const data = await request.json();

        if (!data.title || !data.description) {
            return NextResponse.json(
                { message: 'Please provide title and description' },
                { status: 400 }
            );
        }

        const newTodo = await Todo.create({
            title: data.title,
            description: data.description,
            date: new Date()
        });

        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}