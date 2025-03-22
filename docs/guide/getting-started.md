# 快速开始

本指南将帮助你快速部署和使用 Kirara。

## 环境要求

- Docker 和 Docker Compose
- Node.js 16+ (如果不使用 Docker)

## 使用 Docker 部署

1. 克隆项目代码：
```bash
git clone https://github.com/lss233/kirara.git
cd kirara
```

2. 复制并修改配置文件：
```bash
cp config.example.yml config.yml
```

3. 编辑 `config.yml`，配置必要的参数：
```yaml
midjourney:
  api_key: "your-api-key"  # 你的 Midjourney API 密钥
  proxy_url: "http://your-proxy-url"  # Midjourney Proxy 地址

platforms:
  - type: qq  # 启用 QQ 平台
    account: 123456789  # QQ 账号
    password: "your-password"  # 密码
```

4. 启动服务：
```bash
docker-compose up -d
```

## 手动部署

1. 克隆项目并安装依赖：
```bash
git clone https://github.com/lss233/kirara.git
cd kirara
pip install -r requirements.txt
```

2. 按照上述步骤配置 `config.yml`

3. 启动服务：
```bash
python main.py
```

## 基本使用

### 绘图命令

- 生成图片：`/draw 一只可爱的猫咪`
- 放大图片：`/upscale 1` (选择第1张图片进行放大)
- 变体生成：`/variation 2` (基于第2张图片生成变体)

### 参数设置

- 设置图片比例：`/draw 一只可爱的猫咪 --aspect 16:9`
- 设置生成数量：`/draw 一只可爱的猫咪 --number 4`
- 设置风格参数：`/draw 一只可爱的猫咪 --style cute`

## 常见问题

### Q: 如何获取 Midjourney API 密钥？
A: 请访问 Midjourney 官网，注册账号并订阅服务后即可获取 API 密钥。

### Q: 支持哪些聊天平台？
A: 目前支持 QQ、Telegram 和 Discord，后续会增加更多平台支持。

### Q: 如何自定义命令前缀？
A: 在 `config.yml` 中的 `command_prefix` 字段可以设置自定义前缀。

## 下一步

- 阅读[基本概念](./concepts.md)了解更多核心功能
- 查看[配置参考](../config/)了解详细配置选项
- 探索[插件系统](./plugins.md)扩展机器人功能