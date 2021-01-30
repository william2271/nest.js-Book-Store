import {TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule } from '../config/config.module';
import {ConfigService } from '../config/config.service';
import {ConnectionOptions, TreeRepository } from 'typeorm';
import {Configuration } from '../config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){
            return {
                
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                username: config.get(Configuration.USERNAME),
                port: 5444,
                
                database: config.get(Configuration.DATABASE),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations:[__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
        },
    }),
];