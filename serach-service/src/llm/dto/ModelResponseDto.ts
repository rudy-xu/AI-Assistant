import { ApiProperty } from "@nestjs/swagger";
import { ModelResponse } from "../hlper";

export class ModelResponseDto {
  @ApiProperty({ 
    description: 'List of AI models available for use. '
  })
  AIModels: ModelResponse[];
}