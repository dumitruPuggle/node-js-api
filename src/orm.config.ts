import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./db-model/User.entity";

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "dumitru",
    password: "root",
    database: "dumitru",
    synchronize: true,
    logging: false,
    entities: [User]
}