export enum ModelType {
  HuggingFace = 'HuggingFace',
  Deepseek = 'Deepseek'
};

export interface ModelResponse {
  id: string;
  name: string;
}

export const MODEL_TYPE_MAP: ModelResponse[] = [
  { id: ModelType.HuggingFace, name: 'Hugging Face' },
  { id: ModelType.Deepseek, name: 'Deepseek' }
];

export const getModelTypeKeyMap = () => {
  return [
    { id: ModelType.HuggingFace, key: process.env.DIFY_API_KEY_Hugging_Face },
    { id: ModelType.Deepseek, key: process.env.DIFY_API_KEY_Deepseek }
  ];
}