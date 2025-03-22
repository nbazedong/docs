# 基础配置

本章节将介绍 Kirara 的基础配置选项，帮助你快速设置和运行机器人。

## 配置文件

Kirara 使用 YAML 格式的配置文件，默认为 `config.yml`。以下是主要配置项的说明：

## Midjourney 配置

```yaml
midjourney:
  api_key: "your-api-key"  # Midjourney API 密钥
  proxy_url: "http://your-proxy-url"  # Midjourney Proxy 地址
  max_retries: 3  # API 请求失败重试次数
  timeout: 30  # API 请求超时时间（秒）
```

## 平台配置

### QQ 平台

```yaml
platforms:
  - type: qq
    account: 123456789  # QQ 账号
    password: "your-password"  # 密码
    protocol: 5  # 登录协议，可选值：1-5
    command_prefix: "/"  # 命令前缀
```

### Telegram 平台

```yaml
platforms:
  - type: telegram
    token: "your-bot-token"  # Telegram Bot Token
    command_prefix: "/"  # 命令前缀
```

### Discord 平台

```yaml
platforms:
  - type: discord
    token: "your-bot-token"  # Discord Bot Token
    command_prefix: "/"  # 命令前缀
```

## 基础设置

```yaml
settings:
  language: "zh_CN"  # 机器人语言，可选：zh_CN, en_US
  timezone: "Asia/Shanghai"  # 时区设置
  log_level: "INFO"  # 日志级别：DEBUG, INFO, WARNING, ERROR
```

## 存储配置

```yaml
storage:
  type: "local"  # 存储类型：local, s3
  path: "./data"  # 本地存储路径
```

## 命令配置

```yaml
commands:
  draw:
    cooldown: 60  # 命令冷却时间（秒）
    max_queue: 10  # 最大排队数量
  upscale:
    cooldown: 30
    max_queue: 5
  variation:
    cooldown: 30
    max_queue: 5
```

## 权限配置

```yaml
permissions:
  admin_users: [123456789]  # 管理员用户列表
  blocked_users: []  # 黑名单用户列表
  user_limits:
    default:
      daily_usage: 50  # 每日使用次数限制
      concurrent_tasks: 2  # 同时进行的任务数限制
```

## 下一步

- 查看[高级配置](./advanced.md)了解更多配置选项
- 返回[快速开始](../guide/getting-started.md)继续设置
- 了解[插件系统](../guide/plugins.md)扩展功能