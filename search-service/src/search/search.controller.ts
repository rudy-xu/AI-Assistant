import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SearchService } from "./search.service";
import { LlmService } from "../llm/llm.service";
import { SearchDto } from "./dto/search.dto";
import { ModelType } from "src/llm/helper";

@Controller('api')
export class SearchController {
  constructor(
    private  searchService: SearchService,
    private llmService: LlmService
  ) {}


  @ApiOperation({ summary: 'Search for a query' })
  @ApiParam({
    name: 'userInput',
    required: true,
    example: "Hello",
    type: 'string',
  })
  @ApiParam({
    name: 'modelId',
    required: true,
    example: 'deepseek-xxx-xxx',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Returns search results.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('search')
  async search(@Body() body: SearchDto) {
    const { userInput, modelId } = body;
    if (!userInput || !modelId) {
      throw new Error('Invalid input');
    }
    
    const result = await this.searchService.search(userInput);

    // 接入算法并返回结果
    var answer = '';
    switch (modelId) {
      case ModelType.HuggingFace:
        {
          answer = await this.llmService.huggingFaceChat(userInput, result);
          break;
        }
      case ModelType.Deepseek:
        {
          answer = await this.llmService.deepseekChat(userInput, result);
          break;
        }
    }
    return { search: result, answer };
  }
}