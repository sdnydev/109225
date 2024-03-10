import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response, Router } from 'express';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
  private readonly appRoutes: string[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (this.appRoutes.length === 0) {
      const router = req.app._router as Router;

      router.stack.forEach((layer) => {
        if (layer.route) {
          this.appRoutes.push(layer.route.path);
        }
      });
    }

    if (this.appRoutes.indexOf(req.path) > -1)
      await this.prisma.requestLog.create({
        data: {
          path: req.path,
        },
      });

    next();
  }
}
