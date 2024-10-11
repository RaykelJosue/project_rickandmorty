/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { EpisodeCharacter } from '@prisma/client';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  // Crear una nueva participación
  @Post()
  async create(@Body() createParticipationDto: Omit<EpisodeCharacter, 'id'>) {
    return this.participationService.create(createParticipationDto);
  }

  // Obtener todas las participaciones con filtrado y paginación
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('characterName') characterName?: string,
    @Query('episodeName') episodeName?: string,
  ) {
    return this.participationService.findAll(+page, +limit, characterName, episodeName);
  }

  // Obtener una participación específica
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.participationService.findOne(+id);
  }

  // Actualizar una participación
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipationDto: Partial<EpisodeCharacter>,
  ) {
    return this.participationService.update(+id, updateParticipationDto);
  }

  // Eliminar una participación
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participationService.remove(+id);
  }
}
