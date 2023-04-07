import { Type } from "../../components/TodoList/TodoList";

export interface UpdateTodoTypeDto {
    userId: number;
    todoId: number;
    type: Type;
}