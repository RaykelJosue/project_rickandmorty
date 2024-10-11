/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EpisodeCharacter } from '@prisma/client';

@Injectable()
export class ParticipationService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una nueva participación
  async create(data: Omit<EpisodeCharacter, 'id'>): Promise<EpisodeCharacter> {
    return this.prisma.episodeCharacter.create({
      data,
    });
  }

  // Obtener todas las participaciones
  async findAll(): Promise<EpisodeCharacter[]> {
    return this.prisma.episodeCharacter.findMany({
      include: {
        character: true, // Incluye detalles del personaje
        episode: true, // Incluye detalles del episodio
      },
    });
  }

  // Obtener una participación específica por ID
  async findOne(id: number): Promise<EpisodeCharacter> {
    return this.prisma.episodeCharacter.findUnique({
      where: { id },
      include: {
        character: true,
        episode: true,
      },
    });
  }

  // Actualizar una participación
  async update(id: number, data: Partial<EpisodeCharacter>): Promise<EpisodeCharacter> {
    return this.prisma.episodeCharacter.update({
      where: { id },
      data,
    });
  }

  // Eliminar una participación
  async remove(id: number): Promise<EpisodeCharacter> {
    return this.prisma.episodeCharacter.delete({
      where: { id },
    });
  }
}
