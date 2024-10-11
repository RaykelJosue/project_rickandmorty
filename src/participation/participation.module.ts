/* Comentario */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { PrismaModule } from '../prisma.module'; // Importa el PrismaModule

@Module({
  imports: [PrismaModule], // Asegúrate de importar el PrismaModule aquí
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule {}
