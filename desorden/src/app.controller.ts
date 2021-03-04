import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { create } from 'domain';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(@Req() req: Request): string {
    console.log(req.body);
    return this.appService.getHello();
  }

  @Get('/playground/:id')
  getParams(@Res() res, @Param('id') params: { id: string }): string {
    return res.json({
      data: params.id,
    });
  }

  @Post('/playground')
  @HttpCode(200)
  @Header('Authorization', 'hello')
  createSomething(
    @Headers() headers,
    @Body() createSthDTO: CreateSthDTO,
  ): number {
    console.log(headers);
    return this.appService.getBy10(createSthDTO.data);
  }
}

interface CreateSthDTO {
  data: number;
}
