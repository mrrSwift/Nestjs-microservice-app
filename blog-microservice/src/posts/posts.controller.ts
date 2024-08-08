import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from './posts.guard';
import { UserData } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/common/eNums/role.enum';
import { DataUserDTO } from './dto/user.dto';
import { NewPost, PostInter } from './interfaces/post.interface';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Post()
  async create(@UserData() user: DataUserDTO, @Body() createPostDto: CreatePostDto): Promise<NewPost> {
    return await this.postsService.create(createPostDto, user);
  }
  @Roles(Role.User)
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<PostInter[]> {
    return await this.postsService.findAll();
  }

  @Roles(Role.User)
  @UseGuards(AuthGuard)
  @Get(':link')
  async findOne(@Param('link') link: string): Promise<PostInter> {
    return await this.postsService.findOne(link);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Put(':link')
  async update(@Param('link') link: string, @Body() updatePostDto: UpdatePostDto): Promise<NewPost> {
    return await this.postsService.update(link, updatePostDto);
  }


}
