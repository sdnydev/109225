import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FireController } from './fire.controller';
import { FireService } from './fire.service';

@Module({
  imports: [HttpModule],
  controllers: [FireController],
  providers: [FireService],
})
export class FireModule {}
