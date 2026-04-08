import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EstudiantesService } from '../services/ estudiantes.service';
import { CreateEstudianteDto } from '../dto/estudiante.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudianteService: EstudiantesService) {}

  @Get()
  getAll() {
    return this.estudianteService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudianteService.getOne(id);
  }

  // @Post()
  @MessagePattern({ cmd: 'create_student' })
  async create(@Payload() estudianteDto: CreateEstudianteDto) {
    const estudiante = await this.estudianteService.create(estudianteDto);

    const datos = {
      data: estudiante,
      message: 'Registro agregado con exito',
    };

    return datos;
  }
}
