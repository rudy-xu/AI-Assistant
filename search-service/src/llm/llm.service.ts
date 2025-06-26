import { Injectable } from "@nestjs/common";
import { MODEL_TYPE_MAP } from "./hlper";
import axios from "axios";
import { ModelResponseDto } from "./dto/ModelResponseDto";

@Injectable()
export class LlmService {
  private readonly DIFY_API_URL = process.env.DIFY_API_URL;
  private readonly USER = process.env.DIFY_USER;

  async chat(apiKey: string, userInput: string, search: string): Promise<string> {
    const resp = await axios.post(`${this.DIFY_API_URL}/chat-messages`, {
      inputs:{},
      query: `搜索结果：${search}\n\n问题：${userInput}`,
      user: this.USER,
    }, {
      headers: {Authorization: `Bearer ${apiKey}`},
    });

    return resp.data?.answer || '';
  }

  async getAllModels(): Promise<ModelResponseDto> {
    return { AIModels: MODEL_TYPE_MAP };
  }
}