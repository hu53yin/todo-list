import axios, { AxiosResponse } from 'axios';
import { Task } from '../components/TodoList/TodoList';
import { AddTodoDto } from './dtos/addTodoDto';
import { UpdateTodoTypeDto } from './dtos/updateTodoTypeDto';

export class ApiService {
    private static instance: ApiService;

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }

        return ApiService.instance;
    }
    
    async getUserTodoList(userId: number): Promise<AxiosResponse<Task[]>> {
        return await axios.get(`/api/todo/user/${userId}`);
    }

    async addTodo(todo: AddTodoDto): Promise<AxiosResponse<void>> {
        return await axios.post('/api/todo', todo);
    }

    async updateTodoType(todo: UpdateTodoTypeDto): Promise<AxiosResponse<void>> {
        return await axios.put('/api/todo', todo);
    }
}