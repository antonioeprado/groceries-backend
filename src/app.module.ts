import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { FamiliesModule } from './families/families.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';

@Module({
  imports: [
    UsersModule,
    MembersModule,
    FamiliesModule,
    ProductsModule,
    PrismaModule,
    SessionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
