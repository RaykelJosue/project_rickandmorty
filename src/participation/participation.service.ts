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

  // Obtener todas las participaciones con filtrado y paginación
  async findAll(page: number, limit: number, characterName?: string, episodeName?: string): Promise<{ data: EpisodeCharacter[]; total: number; page: number; lastPage: number }> {
    const filter = {
      ...(characterName && { character: { name: { contains: characterName } } }),
      ...(episodeName && { episode: { name: { contains: episodeName } } }),
    };

    const participations = await this.prisma.episodeCharacter.findMany({
      where: filter,
      skip: (page - 1) * limit, // Desplazamiento
      take: limit, // Cantidad de resultados
      include: {
        character: true, // Incluye detalles del personaje
        episode: true, // Incluye detalles del episodio
      },
    });

    const total = await this.prisma.episodeCharacter.count({
      where: filter, // Contar según los filtros
    });

    return {
      data: participations,
      total,
      page,
      lastPage: Math.ceil(total / limit), // Calcular última página
    };
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
