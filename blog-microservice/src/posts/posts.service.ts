/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { ClientProxy } from '@nestjs/microservices';
import { DataUserDTO, UserDto } from './dto/user.dto';
import { I18nService } from 'nestjs-i18n';



@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    @Inject('AUTH') private readonly authClient: ClientProxy,
    private readonly i18n: I18nService
  ) { }

  async create(data: CreatePostDto, user: DataUserDTO): Promise<object> {
    const { content, link, title } = data
    const post = await this.PostModel.findOne({ link })
    if (post) {
      throw new BadRequestException(this.i18n.t('duplicated.link'))
    }
    const newPost = await this.PostModel.create({ content, link, title, author: user.user._id })
    return { msg: this.i18n.t('response.success_save'), data: newPost }
  }

  async findAll(): Promise<object> {
    return await this.PostModel.find({});
  }

  async findOne(link: string): Promise<object> {
  
    const post = await this.PostModel.findOne({ link })
    if (!post) {
      throw new NotFoundException(this.i18n.t('noFound.item_id'))
    }
    return new Promise((resolve, reject) => {
      const paylod = { userId: post.author }
      this.authClient.send<UserDto>({ cmd: 'popUser' }, paylod).pipe().subscribe((data: UserDto) => {
        post.author = data.fullName
        resolve(post)
      })
    })
  }
  async update(linkO: string, data: UpdatePostDto): Promise<object> {
    const { title, link, content } = data
    const post = await this.PostModel.findOne({ link: linkO })
    if (!post) {
      throw new NotFoundException(this.i18n.t('noFound.item_id'))
    }
    const postLink = await this.PostModel.findOne({ link })
    if (postLink && postLink.link !== linkO) {
      throw new BadRequestException(this.i18n.t('duplicated.link'))
    }
    post.title = title;
    post.link = link;
    post.content = content;
    post.save()

    return { msg: this.i18n.t('response.success_save'), data:post };
  }

}
