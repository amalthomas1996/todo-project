import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoForm = ({ projectId, onTodoAdded, todoToEdit, setTodoToEdit }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (todoToEdit) {
            setDescription(todoToEdit.description);
        } else {
            setDescription('');
        }
    }, [todoToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!description) {
            setError('Description is required');
            return;
        }

        try {
            if (todoToEdit) {
                await axios.put(`http://localhost:5000/api/todos/${todoToEdit._id}`, { description });
                setSuccess('Todo updated successfully');
            } else {
                await axios.post(`http://localhost:5000/api/projects/${projectId}/todos`, { description });
                setSuccess('Todo added successfully');
            }
            setDescription('');
            setTodoToEdit(null); // Reset the editing state
            onTodoAdded(); // Notify parent to refresh project details
        } catch (error) {
            setError('Failed to save todo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{success}</div>}
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Todo description"
                className="border rounded p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {todoToEdit ? 'Update Todo' : 'Add Todo'}
            </button>
        </form>
    );
};

export default TodoForm;
