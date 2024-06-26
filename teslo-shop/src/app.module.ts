import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      //Para cargar automaticamente entidades que vamos definiendo
      autoLoadEntities: true,
      //Sincroniza automaticamente los cambios en la bd
      synchronize: true
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule
  ]
})
export class AppModule { }
