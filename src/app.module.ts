import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from './config/envConfig';
import { TypeOrmConfigService } from './database/typeorm/typeorm.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envConfiguration], isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    ProductModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
