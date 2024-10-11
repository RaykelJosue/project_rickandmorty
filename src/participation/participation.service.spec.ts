/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationService } from './participation.service';
import { PrismaService } from '../prisma.service'; // Asegúrate de importar PrismaService

describe('ParticipationService', () => {
  let service: ParticipationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationService,
        {
          provide: PrismaService,
          useValue: {}, // Simulación de PrismaService
        },
      ],
    }).compile();

    service = module.get<ParticipationService>(ParticipationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
