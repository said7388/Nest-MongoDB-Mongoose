import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nest_said:WPxQTycXL9l9tFuo@cluster0.ha2x2.mongodb.net/luxury_living?retryWrites=true&w=majority',
    ),
    ProductsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
