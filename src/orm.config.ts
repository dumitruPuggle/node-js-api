import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "dumitru",
    password: "root",
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
}