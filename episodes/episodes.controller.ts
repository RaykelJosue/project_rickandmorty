/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from '@prisma/client';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post('import')
  async import() {
    return this.episodesService.importEpisodes();
  }

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() episodeData: Partial<Episode>) {
    return this.episodesService.update(+id, episodeData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(+id);
  }
}
