import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EstudiantesService } from '../services/ estudiantes.service';

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
}
