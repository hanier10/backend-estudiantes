import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from '../entities/estudiante.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateEstudianteDto } from '../dto/estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    private readonly dataSource: DataSource,
  ) {}

  async getAll() {
    const rows = this.dataSource
      .getRepository(Estudiante)
      .createQueryBuilder('estudiantes')
      .where('estudiantes.id is not null');

    return await rows.getMany();
  }

  getOne(id: number) {
    return `Esto retorna el id ${id}`;
  }

  async create(estudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudianteRepo.create(estudianteDto);

      return await this.estudianteRepo.save(estudiante);
    } catch (error) {
      console.log(error);
    }
  }
}
