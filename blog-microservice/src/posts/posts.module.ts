import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: { port: 3000 },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
