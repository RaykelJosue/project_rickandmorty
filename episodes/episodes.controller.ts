/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from '@prisma/client';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(@Body() episodeData: Episode) {
    return this.episodesService.create(episodeData);
  }

  @Get()
  findAll(
    @Query('page') page = 1, 
    @Query('limit') limit = 10,
    @Query('name') name?: string,
    @Query('air_date') air_date?: string
  ) {
    return this.episodesService.findAll(+page, +limit, name, air_date);
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
