import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async createUser(request: Request, response: Response) {
        const { username, email, phone, city, state } = request.body;
        try {
            await this.service.create({
                username,
                email,
                phone,
                city,
                state
            }).then(() => {
                response.render("message", {
                    message: "Usuario registrado con exito"
                });
            });
        } catch (err) {
            response.render("message", {
                message: `Error al registrar el usuario: ${err.message}`
            });
        }

    }

    async listUsers(request: Request, response: Response) {
        const users = await this.service.list();

        return response.render("user_table", {
            users: users
        });
    }

    async searchUser(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

        try {
            const users = await this.service.search(search);
            response.render("search", {
                users: users,
                search: search
            });
        } catch (err) {
            response.render("message", {
                message: `Erro ao buscar usuário: ${err.message}`
            });
        }
    }

    async getUserData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const user = await this.service.getData(id);

        return response.render("edit", {
            user: user
        });
    }

    async updateUser(request: Request, response: Response) {
        const { id, username, email, phone, city, state } = request.body;

        try {
            await this.service.update({ id, username, email, phone, city, state }).then(() => {
                response.render("message", {
                    message: "Usuário actualizado con exito"
                });
            });
        } catch (err) {
            response.render("message", {
                message: `Error al actualizar usuario: ${err.message}`
            });
        }

    }

    async deleteUser(request: Request, response: Response) {
        const { id } = request.body;

        try {
            await this.service.delete(id).then(() => {
                response.render("message", {
                    message: "Usuário deletado com sucesso"
                });
            });
        } catch (err) {
            response.render("message", {
                message: `Erro ao deletar usuário: ${err.message}`
            });
        }
    }
}


export { UserController };