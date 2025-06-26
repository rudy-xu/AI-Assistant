import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { SearchService } from "./search.service";
import { LlmService } from "../llm/llm.service";
import { SearchDto } from "./dto/search.dto";
import { getModelTypeKeyMap } from "src/llm/hlper";

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

    let apiKey = getModelTypeKeyMap().find(item => item.id === modelId)?.key;
    if (!apiKey) {
      throw new Error(`API key for model ${modelId} not found`);
    }
    
    const result = await this.searchService.search(userInput);

    // 接入算法并返回结果
    const answer = await this.llmService.chat(apiKey, userInput, result);
    return { search: result, answer };
  }
}