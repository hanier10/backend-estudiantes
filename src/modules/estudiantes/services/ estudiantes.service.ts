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

  async getOne(id: number) {
    try {
      const row = await this.dataSource
        .getRepository(Estudiante)
        .createQueryBuilder('estudiante')
        .leftJoinAndSelect('estudiante.etnia', 'etnia')
        .leftJoinAndSelect('estudiante.sexo', 'sexo')
        .where('estudiante.id = :id', { id })
        .getOne();

      if (!row) {
        throw new Error(`No existe el id ${id}`);
      }

      return row;
    } catch (error) {
      console.log(error);
    }
  }

  async create(estudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudianteRepo.create(estudianteDto);

      return await this.estudianteRepo.save(estudiante);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number, payload: CreateEstudianteDto) {
    const row = await this.estudianteRepo.findOne({ where: { id } });

    if (!row) {
      throw new Error(`No existe el id ${id}`);
    }

    const mergeData = this.estudianteRepo.merge(row, payload);

    const updateData = await this.estudianteRepo.save(mergeData);

    await this.estudianteRepo.remove(updateData);

    return row;
  }
}
