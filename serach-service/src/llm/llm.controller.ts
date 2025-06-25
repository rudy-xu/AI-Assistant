import { Controller, Get } from "@nestjs/common";
import{ ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { LlmService } from "./llm.service";
import { ModelResponseDto } from "./dto/ModelResponseDto";

@Controller('api')
export class LlmController {
  constructor(private llmService: LlmService) {}

  @ApiOperation({ summary: 'Get models' })
  @ApiResponse({ status: 200, description: 'Returns chat response.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Get('/models')
  async models(): Promise<ModelResponseDto> {
    return await this.llmService.getAllModels();
  }
}