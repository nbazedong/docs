# AIGC

中台AIGC模块，涵盖大模型聊天、图像生成、视频生成、音频生成、agent应用

![ai_flow](https://minio.110200.xyz:443/picgo/docs/2025/03/24/ai_flow.png)

## 一、主要内容

- AI模型聊天 
  - [lobe-chat](http://192.168.14.203:3210/chat) 

  - [AIGC-WEB](http://192.168.14.203:6055/#/chat) 

  - Dify-聊天应用
    - [DeepSeek-V3](http://192.168.14.243/chat/GXplWQ24dpvY3nHF)

    - [DeepSeek-R1](http://192.168.14.243/chat/6Mi0olXheyTmbGXD)

- 图像生成
  - [stable *diffusion*](http://192.168.14.203:5000/)
  - [Midjourney](http://192.168.14.203:6055/#/draw)
- 视频生成
  - [可灵官网](https://klingai.kuaishou.com/)
- 音频生成
  - [文本转语音系统](http://192.168.14.203:5003)
- agent应用
  - [中台全能助手](http://192.168.14.243/chat/5CnIexjrVBoN81ud)


## 二、应用介绍

###  内网MJ绘图  

入口：http://192.168.14.203:6055/

   **解决的问题**

  discord需要翻墙使用、提示词和参数配置使用门槛较高、没有一个专门的网页端

   **部署方式**

  1、使用[midjourney-proxy](https://github.com/trueai-org/midjourney-proxy)项目，将discord频道的MJ绘图部署成[api](http://192.168.14.203:8086)

  2、使用开源web部署融合[AIGC-WEB](http://192.168.14.203:6055/)，绘图接入上述api



   **支持功能**

------


#####    AI聊天

   大模型接入华为提供的DeepSeek-R1和DeepSeek-V3

![image-20250327151821592](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327151821592.png)

#####    绘图

   接入MJ的api，支持MJ所有功能，同时优化如下：

   1、写入的中文描述词可以后台调用模型翻译英文

   2、可以直接通过UI上传参考图、风格图

   3、所有参数可以通过UI界面选择后自动传入

![image-20250327151921997](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327151921997.png)

#####    视频、音乐

   项目还可以接入主流音乐生成、视频生成、例如：可灵、runway等的api。

###  new-api

 入口：http://192.168.14.203:4003

- 解决不同大模型提供商接入标准不同的问题，可以把所有渠道的大模型转换成openai兼容的格式，方便调用。
- 目前已经接入了华为提供的DeepSeep-V3和DeepSeep-R3，后续可以支持接入其它供应商大模型。
- 同时支持分发api-key，如果后续有需要拓展管理员工使用额度等，都可以方便管理。

![image-20250327152037866](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152037866.png)

![image-20250327152107263](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152107263.png)

###  lobe-chat

 入口：http://192.168.14.203:3210/

 内网部署了lobe-chat聊天应用，后台接入了new-api提供的大模型

- 后台已经配置好api和接口，直接在设置界面获取一下模型即可使用

![image-20250327152130408](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152130408.png)

![image-20250327152236763](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152236763.png)

###   Dify

 入口：http://192.168.14.243/

 目前主流的agent开发平台，支持chat、flow、agent，可以用来开发机器人、聊天功能等。

![image-20250327152310166](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152310166.png)

- **【中台知识库】**
  - dify中配置了中台知识库，后续可以拓展各个小组知识文档，开发内外部的服务AI助理
  
    ![image-20250327152328693](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152328693.png)
  
- **【全能助手】**
  -   网页访问入口：[点击跳转](http://192.168.14.243/chat/5CnIexjrVBoN81ud)

 集成了大模型聊天、知识库搜索、中台任务数据分析、AI绘图、联网搜索。更多功能可以根据需要拓展。

![image-20250327152348643](https://minio.110200.xyz:443/picgo/docs/2025/03/27/image-20250327152348643.png)

###  文本转语音系统

本地部署了GPT-SoVITS，提供api服务。前端搭建更加便利的web，提供使用。

目前支持：

- 自定义预设（可以大家一起添加不同的音色，用于后续克隆使用）
- 支持在线预览

![image-20250328133337109](https://minio.110200.xyz:443/picgo/docs/2025/03/28/image-20250328133337109.png)

