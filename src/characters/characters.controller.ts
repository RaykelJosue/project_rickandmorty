/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from '@prisma/client';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() characterData: Character) {
    return this.charactersService.create(characterData);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1', // Asegurar que siempre sea un string y por defecto '1'
    @Query('limit') limit: string = '10', // Lo mismo para el límite
    @Query('name') name?: string, 
    @Query('status') status?: string,
  ) {
    // Aseguramos que page y limit sean positivos
    const pageNumber = Math.max(parseInt(page, 10), 1); 
    const limitNumber = Math.max(parseInt(limit, 10), 1);

    return this.charactersService.findAll(pageNumber, limitNumber, name, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() characterData: Partial<Character>) {
    return this.charactersService.update(+id, characterData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
