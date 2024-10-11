/* eslint-disable prettier/prettier */
/* RECORDATORIO: En esta rama de filter-pagination-episodes, cambié el directorio de
 ../prisma.service a ..src/prisma.service y me funcionó.*/
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import { Episode } from '@prisma/client';

@Injectable()
export class EpisodesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Episode) {
    return this.prisma.episode.create({
      data,
    });
  }

  async findAll(page: number, limit: number, name?: string, air_date?: string) {
    const whereClause = {
      AND: [
        name ? { name: { contains: name } } : {},
        air_date ? { air_date: { equals: air_date } } : {},
      ],
    };

    const episodes = await this.prisma.episode.findMany({
      where: whereClause,
      skip: (page - 1) * limit, // Calcula el desplazamiento
      take: limit, // Número de elementos a retornar
    });

    const total = await this.prisma.episode.count({ where: whereClause }); // Cuenta el total de episodios filtrados

    return {
      data: episodes,
      total,
      page,
      lastPage: Math.ceil(total / limit), // Calcula el total de páginas
    };
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
