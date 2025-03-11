import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
