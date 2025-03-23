# 任务统计系统

## 项目说明
这是一个基于 Flask 的任务统计系统，用于展示和分析任务数据。

## 功能特点
- 任务完成情况统计
- 项目分布分析
- 人员工作量统计
- 实时数据更新

## 安装与配置

### 环境要求
- Python 3.7+
- PostgreSQL 10+
- Redis

### 本地运行安装步骤
1. 克隆代码库
2. 安装依赖：`pip install -r requirements.txt`
3、创建一个 `.env` 文件，并设置环境变量
4. 初始化数据库：`python manage.py init_db`
5. 启动应用：`python app.py`

### Docker 部署安装步骤
1. 确保已安装 Docker 和 Docker Compose。
2. 在项目根目录下，使用以下命令构建 Docker 镜像：
   ```bash
   docker-compose build
   ```
3. 参考 `.env.template` 文件，创建 `.env` 文件，并设置正确的参数，放置在项目根目录下和config目录下。

4. 使用docker-compose启动应用，挂载正确的目录：
   ```bash
   docker-compose up
   ```


### 配置文件
在运行 Docker 容器时，您需要创建一个 `.env` 文件，以便应用能够读取配置。请确保在项目根目录下创建 `.env` 文件，并在其中设置必要的环境变量。

例如，您可以使用以下命令来创建 `.env` 文件：
```bash
touch .env
```

然后根据需要添加环境变量配置。

### 日志文件夹
在运行 Docker 容器时，您还可以挂载本地的 `logs` 文件夹，以便应用能够记录日志。请确保在本地创建一个 `logs` 文件夹。

例如，您可以使用以下命令来挂载日志文件夹：
```bash
docker run -v /path/to/your/logs:/app/logs your_image_name
```

### 环境变量配置说明
在运行应用之前，您需要设置一些环境变量。以下是环境变量及其说明：

1. **数据库配置**
   - `DB_USER`: 数据库用户名。
   - `DB_PASSWORD`: 数据库密码。
   - `DB_NAME`: 数据库名称。
   - `DB_HOST`: 数据库主机地址，通常为 `localhost`，docker部署使用 `postgres`。
   - `DB_PORT`: 数据库端口，默认 PostgreSQL 端口为 `5432`。

2. **Redis 配置**
   - `REDIS_HOST`: Redis 服务器主机地址，通常为 `localhost`，docker部署使用 `redis`。
   - `REDIS_PORT`: Redis 端口，默认为 `6379`。
   - `CACHE_TIMEOUT`: 缓存超时时间，单位为秒。

3. **Teambition 配置**
   - `SECRET_KEY`: 用于加密的密钥。
   - `APP_ID`: Teambition 应用的 ID。
   - `X_OPERATOR_ID`: 操作员 ID。
   - `ORG_ID`: 组织 ID。

4. **调度器配置**
   - `UPDATE_INTERVAL`: TB 任务元数据抓取时间，默认每 `30` 分钟。
   - `DAILY_UPDATE_TIME`: TB 组员信息、流程信息等更新时间，默认每天凌晨 `2` 点。
   - `UPDATE_STATS_INTERVAL`: 网页显示缓存数据更新时间，默认每 `5` 分钟（目前不用，拉取完数据后自动更新）。

5. **项目 ID 配置**
   - `PROJECT_IDS`: 项目 ID 的字典配置，包含多个项目的 ID。

6. **项目别名配置**
   - `PROJECT_ALIASES`: 项目别名的字典配置，包含多个项目的别名。

7. **任务状态显示配置**
   - `STATUS_ORDER`: 任务状态的显示顺序，包含多个状态。

8. **状态黑名单**
   - `STATUS_BLACKLIST`: 不显示的任务状态，包含多个状态。

请确保在启动应用之前设置所有必需的环境变量。

## 数据库初始化
系统提供了两种数据库初始化方式：

### 自动初始化
应用在启动时会自动检查数据库是否存在，如果不存在会自动创建数据库和所需的表。

### 手动初始化
可以使用管理工具手动初始化数据库：
```bash
# 初始化数据库
python manage.py init_db

# 优化数据库
python manage.py optimize_db
```

## 数据更新
系统每30分钟自动从Teambition获取最新数据，无需手动干预。
