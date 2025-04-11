// src/models/Todo.js
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Check if the model is already defined to prevent OverwriteModelError
export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);