/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateParticipationDto {
  @IsInt()
  @IsNotEmpty()
  characterId: number;

  @IsInt()
  @IsNotEmpty()
  episodeId: number;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;
}
