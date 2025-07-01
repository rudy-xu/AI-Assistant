<div align="center">

# AI-Assistant
![AI 支持](https://img.shields.io/badge/AI-支持多模型-blue?style=flat&logo=openai&logoColor=white) ![全平台](https://img.shields.io/badge/平台-Windows%20%7C%20macOS%20%7C%20Linux-purple?style=flat&logo=electron&logoColor=white)

Support to change model and search in network (https://api.duckduckgo.com/)
</div>

## Environment
- [Dify in docker](https://docs.dify.ai/en/getting-started/install-self-hosted/docker-compose)
- nodeJs + NestJs
- React + typescript + vite

## Version
- Node V22.16.0

## Design
![alt text](./resource/design.png)

## Demo
### Service
![alt text](./resource/swagger.png)
### View
![alt text](./resource/demo.png)


## Set up
```bash
# View
cd rudy-assist
yarn install
yarn dev

# Service
Apply Model Key
  - deepseek
  - hugging face

cd search-service
cp .env.example .env
Update env key

yarn install
yarn start
```

## Optimization Points
- [ ] Performance
- [ ] Page Style
- [ ] Authentication
- [ ] Log
- [x] Remove Dify
- [ ] Database