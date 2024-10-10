/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import { Episode } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class EpisodesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Episode, 'createdAt'>) {
    return this.prisma.episode.create({
      data,
    });
  }

  // Método para importar episodios desde la API de Rick and Morty
  async importEpisodes() {
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/episode');
      const episodes = response.data.results;

      const episodePromises = episodes.map(async (episode) => {
        // Verificar si el episodio ya existe
        const existingEpisode = await this.prisma.episode.findUnique({
          where: { id: episode.id },
        });

        if (!existingEpisode) {
          // Solo crear el episodio si no existe
          return this.create({
            id: episode.id,
            name: episode.name,
            air_date: episode.air_date,
            episode: episode.episode,
          });
        }
      });

      await Promise.all(episodePromises);
      return { message: 'Episodios importados exitosamente' };
    } catch (error) {
      console.error('Error al importar episodios:', error);
      throw new Error('No se pudieron importar los episodios');
    }
  }

  // Métodos CRUD adicionales
  async findAll() {
    return this.prisma.episode.findMany();
  }

  async findOne(id: number) {
    return this.prisma.episode.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<Episode>) {
    return this.prisma.episode.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.episode.delete({
      where: { id },
    });
  }
}
