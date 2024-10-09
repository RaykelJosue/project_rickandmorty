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

  async findAll() {
    return this.prisma.character.findMany();
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
