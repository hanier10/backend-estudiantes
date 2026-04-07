import { Module } from '@nestjs/common';
import { EstudiantesController } from './controllers/estudiantes.controller';
import { EstudiantesService } from './services/ estudiantes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesModule, TypeOrmModule],
})
export class EstudiantesModule {}
