const router = require('express').Router();
const connection = require('./../../../db/connection');


// const isEven = function(number) {
//     return new Promise((resolve, reject) => {
//         if(number % 2 === 0) {
//             resolve('Is Even');
//         } else {
//           reject('Is Odd');
//         }

//     });
// };

router.get('/', async (req, res) => {

    // run as much code as possible inside the try blcok
    // if it throws an error, immediately go into the catch block with he specific
    // error and exit thcde try block
    try {
        const getTodos = 'SELECT * FROM todos;';
        const [ todos ] = await connection.query(getTodos);
        res.json(todos);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.post('/',async (req, res) => {
    const { todo } = req.body;
    if(todo.trim().length === 0) {
        return res.status(400).json({ error: "Todo not valid"});  
    }

    const insertTodoQuery = 'INSERT INTO todos (todo) VALUES(?);';
    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';

    try {
        const [ queryResult] = await connection.query(insertTodoQuery, [todo]);

        const [todos] = await connection.query(getTodoById, [ queryResult.insertId ]);
        res.json(todos[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete
router.delete('/:todoId',async (req, res) => {
    const { todoId } = req.params;

    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
    const deleteTodoById = 'DELETE FROM todos WHERE id = ?;';
    

    try {
        const [todos] = await connection.query(getTodoById, todoId);
        if(todos.length === 0) {
            return res.status(404).json({error: 'Todo ID not valid'});
        }

        await connection.query(deleteTodoById, todoId);
       
        res.json(todos[0]);

    } catch (error) {
        res.status(500).json({error});
    }
});


// Update
router.patch('/:todoId',async (req, res) => {
    const { todo } = req.body;
    const { todoId } = req.params;

    if(todo.trim().length === 0) {
        return res.status(400).json({error: 'Todo must be submitted'});

    }

    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
    const updateTodoById = 'UPDATE todos SET todo = ? WHERE id = ?;';
    

    try {
        await connection.query(updateTodoById, [todo, todoId]);
        const [todos] = await connection.query(getTodoById, todoId); 
        res.json(todos[0]);
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = router;