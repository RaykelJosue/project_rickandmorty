/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service'; // Asegúrate de importar CharactersService
import { PrismaService } from '../prisma.service'; // Asegúrate de importar PrismaService

describe('CharactersController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        CharactersService,
        {
          provide: PrismaService,
          useValue: {}, // Simulación de PrismaService
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
