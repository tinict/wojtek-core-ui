import { api } from "@/lib/axios";
import { Response } from "@/types/api/axios.types"
import { ITodo } from "@/types/models/todo.model";

class TodoService {
    async getTodos(): Promise<Response<ITodo[]>> {
        try {
            const res = await api.get("/posts")
            return {
                message: "Success",
                statusCode: 200,
                data: res.data,
            }
        } catch (error: any) {
            return {
                success: false,
                data: error.message,
            }
        }
    }
}

export default new TodoService();
