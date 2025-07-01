import { Injectable } from "@nestjs/common";
import { MODEL_TYPE_MAP } from "./helper";
import axios from "axios";
import { ModelResponseDto } from "./dto/ModelResponseDto";
import OpenAI from "openai";
import { InferenceClient } from "@huggingface/inference";

@Injectable()
export class LlmService {
  private readonly DIFY_API_URL = process.env.DIFY_API_URL;
  private readonly USER = process.env.DIFY_USER;  
  private readonly openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.API_KEY_Deepseek
  });

  private readonly hfClient = new InferenceClient(
    process.env.API_KEY_Hugging_Face
  );

  async getAllModels(): Promise<ModelResponseDto> {
    return { AIModels: MODEL_TYPE_MAP };
  }

  /**
   * 调用模型 API 进行聊天
   */
  async deepseekChat(userInput: string, search: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "system", content: `搜索结果：${search}\n\n问题：${userInput}` }],
      model: "deepseek-chat",
    });
  
    var res = completion.choices[0].message.content
    console.log("res: \n", res);
    return res || '';
  }

  async huggingFaceChat(userInput: string, search: string): Promise<string> {
    const response = await this.hfClient.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'user', content: `搜索结果：${search}\n\n问题：${userInput}` }
      ],
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7
      }
    });
  
    var res = response.choices[0].message.content;
    console.log('生成结果：\n', res);
    return res || '';
  }


  // /**
  //  * 调用 Dify API 进行聊天
  //  */
  // async chat(apiKey: string, userInput: string, search: string): Promise<string> {
  //   const resp = await axios.post(`${this.DIFY_API_URL}/chat-messages`, {
  //     inputs:{},
  //     query: `搜索结果：${search}\n\n问题：${userInput}`,
  //     user: this.USER,
  //   }, {
  //     headers: {Authorization: `Bearer ${apiKey}`},
  //   });

  //   return resp.data?.answer || '';
  // }
}