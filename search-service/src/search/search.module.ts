import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { LlmModule } from "src/llm/llm.module";

@Module({
  imports: [HttpModule.register({timeout: 5000, maxRedirects: 3}), LlmModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}