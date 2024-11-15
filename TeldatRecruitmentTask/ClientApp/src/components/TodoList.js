import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        axios.get("/api/todo").then((response) => setTodos(response.data));

        const interval = setInterval(() => {
            checkUpcomingTasks();
        }, 60000); // Sprawdzaj co minutę nadchodzące zadania

        return () => clearInterval(interval); // Sprzątanie po odmontowaniu komponentu
    }, [todos]); // Dodajemy `todos` do zależności, by sprawdzać zadania po każdej zmianie

    const addTodo = () => {
        axios
            .post("/api/todo", { title: newTodo, isCompleted: false, dueDate })
            .then((response) => {
                setTodos([...todos, response.data]);
                setNewTodo("");
                setDueDate("");
            })
            .catch((error) => {
                console.error("Błąd podczas dodawania zadania", error);
            });
    };

    const checkUpcomingTasks = () => {
        const now = new Date();
        todos.forEach((todo) => {
            const taskTime = new Date(todo.dueDate);
            // Sprawdzanie, czy zadanie ma przypisaną datę i czas w ciągu następnej godziny
            if (taskTime - now < 3600000 && taskTime - now > 0) {
                console.log(`Nadchodzące zadanie: ${todo.title}`);
            }
        });
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Tytuł zadania"
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={addTodo}>Dodaj</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} - {new Date(todo.dueDate).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
