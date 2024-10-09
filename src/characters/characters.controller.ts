/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
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
  findAll() {
    return this.charactersService.findAll();
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
