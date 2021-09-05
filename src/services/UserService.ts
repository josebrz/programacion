import {getCustomRepository} from "typeorm";
import {UsersRepository} from "../repositories/UsersRepository";
import {User} from "../entities/User";

interface IUser {
    id?: string
    username: string;
    email: string;
    phone: string;
    city: string;
    state: string;
}

class UserService {
    async create({ username, email, phone, city, state }: IUser) {
        if (!username || !email || !phone || !city || !state) {
            throw new Error("Por favor llena todos los campos");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const usernameAlreadyExists = await usersRepository.findOne({ username });

        if (usernameAlreadyExists) {
            throw new Error("Username ya esta registrado");
        }

        const emailAlreadyExists = await usersRepository.findOne({ email });

        if (emailAlreadyExists) {
            throw new Error("Email ya esta registrado");
        }

        const user = usersRepository.create({ username, email, phone, city, state });

        await usersRepository.save(user);

        return user;

    }

    async list() {
        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository.find();
    }

    async search(search: string) {
        if (!search) {
            throw new Error("Por favor preencha o campo de busca");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository
            .createQueryBuilder()
            .where("username like :search", {search: `%${search}%`})
            .orWhere("email like :search", {search: `%${search}%`})
            .orWhere("telefone like :search", {search: `%${search}%`})
            .orWhere("cidade like :search", {search: `%${search}%`})
            .orWhere("estado like :search", {search: `%${search}%`})
            .getMany();

    }

    async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", {id})
            .execute();

    }

    async getData(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository.findOne(id);
    }

    async update({ id, username, email, phone, city, state }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository
            .createQueryBuilder()
            .update(User)
            .set({username, email, phone, city, state})
            .where("id = :id", {id})
            .execute();

    }
}
export { UserService };