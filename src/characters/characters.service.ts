/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Character } from '@prisma/client';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Character) {
    return this.prisma.character.create({
      data,
    });
  }

  async findAll(page: number, limit: number, name?: string, status?: string) {
    const where: any = {}; // Inicializamos un objeto para los filtros
    
    if (name) {
      where.name = { contains: name, mode: 'insensitive' }; // Filtro por nombre
    }
    
    if (status) {
      where.status = status; // Filtro por estado
    }

    const characters = await this.prisma.character.findMany({
      skip: (page - 1) * limit, // Calcula el desplazamiento
      take: limit, // Número de elementos a retornar
      where, // Aplica los filtros
    });

    const total = await this.prisma.character.count({
      where, // Aplica los filtros al contar el total
    });

    return {
      data: characters,
      total,
      page,
      lastPage: Math.ceil(total / limit), // Calcula el total de páginas
    };
  }

  async findOne(id: number) {
    return this.prisma.character.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<Character>) {
    return this.prisma.character.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.character.delete({
      where: { id },
    });
  }
}
