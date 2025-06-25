import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
  @ApiProperty({
    description: 'User input for the search query. Must be a non-empty string. Example: "Hello"'
  })
  userInput: string;

  @ApiProperty()
  modelId: string;
}