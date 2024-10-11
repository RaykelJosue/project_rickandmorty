/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationController } from './participation.controller';
import { ParticipationService } from './participation.service';
import { PrismaService } from '../prisma.service'; // Asegúrate de que la ruta sea correcta
import { mockParticipation } from './mocks/participation.mock'; // Si tienes datos mockeados

describe('ParticipationController', () => {
  let controller: ParticipationController;
  let service: ParticipationService;

  const mockPrismaService = {
    // Mockea aquí los métodos que necesites de PrismaService
    participation: {
      findMany: jest.fn().mockResolvedValue(mockParticipation),
      // Agrega otros métodos si es necesario
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationController],
      providers: [
        ParticipationService,
        { provide: PrismaService, useValue: mockPrismaService }, // Aquí inyectamos el mock
      ],
    }).compile();

    controller = module.get<ParticipationController>(ParticipationController);
    service = module.get<ParticipationService>(ParticipationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Agrega más pruebas aquí
});
