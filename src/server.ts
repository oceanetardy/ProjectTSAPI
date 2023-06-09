import express, { Application} from 'express';
import {connect} from 'mongoose';
import {getAllUsers, getUserById, addUser, deleteUser} from "./handlers/User";
import {getAllTasks, getTaskById, addTask, deleteTask, getTasksByUser, updateTask} from "./handlers/Task";
import cors from 'cors';

const port : number = 8080;

const app :Application = express();
app.use(express.json());
app.use(cors());


//Routes pour users
app.get('/users/:id', getUserById);
app.get('/users',  getAllUsers );
app.post('/users', addUser);
app.get('/users/delete/:id', deleteUser);


//Routes pour tasks
app.get('/tasks/:id', getTaskById);
app.get('/tasks/',  getAllTasks );
app.put('/tasks/:id', updateTask);
app.post('/tasks', addTask);
app.get('/tasks/delete/:id', deleteTask);
app.get('/users/:id/tasks', getTasksByUser);




const dbConnect = async ():Promise<void> =>{
    const uri : string = "mongodb+srv://oceane:7XHQCopt3B7PbxNN@cluster0.av0pf2z.mongodb.net/DatabaseTSProject?retryWrites=true&w=majority"
    try {
        const cnx = await connect(uri);
        console.log('Mongo connecté')
    } catch (error){
        console.log(error);
    }
}


//Start server
app.listen(port,() => {
    //Connection base
    dbConnect();
    console.log('server listening on port', port);

});