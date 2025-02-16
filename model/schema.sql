DROP DATABASE IF EXISTS modelTodos_db;
CREATE DATABASE modelTodos_db;

USE modelTodos_db;

CREATE TABLE todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(255),
    isCompleted BOOLEAN DEFAULT 0,
);