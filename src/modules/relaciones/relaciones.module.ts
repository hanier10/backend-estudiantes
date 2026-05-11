import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sexo } from './entities/sexo.entity';
import { Etnia } from './entities/etnia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sexo, Etnia])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule, RelacionesModule],
})
export class RelacionesModule {}
