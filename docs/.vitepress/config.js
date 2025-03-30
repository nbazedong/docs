import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  ignoreDeadLinks: true,
  title: "STAR",
  description: "STAR Documentation",
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }],
    ['link', { rel: 'shortcut icon', href: '/docs/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/docs/favicon.ico' }]
  ],

  vite: {
    server: {
      port: 5174,
      host: '0.0.0.0',
      allowedHosts: ['www.3207778.xyz','ai.3207778.xyz','star.110200.xyz','docs.110200.xyz']
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'AIGC', link: '/aigc/' },
      { text: '技术开发', link: '/td/' },
      { text: '智能家居', link: '/smart-home/' },
      { text: '开源项目', link: '/open-source/' }
    ],
    sidebar: {
      '/aigc/': [
        {
          // text: 'AI项目',
          items: [
            { text: 'AIGC', link: '/aigc/' },
            { text: '数据大屏', link: '/aigc/ZTDataSphere' },
            { text: 'SD大屏', link: '/aigc/SD-Monitor' },
            { text: '硬件API', link: '/aigc/SystemInfo' },
            { text: '内容生成', link: '/aigc/content-generation' },
            { text: '图像处理', link: '/aigc/image-processing' },
            { text: '自然语言处理', link: '/aigc/nlp' }
          ]
        }
      ],
      '/td/': [
        {
          text: '技术开发',
          items: [
            { text: '简介', link: '/td/' },
            { text: '软件开发', link: '/td/software' },
            { text: '系统架构', link: '/td/architecture' },
            { text: '数据库', link: '/td/database' },
            { text: '云原生', link: '/td/cloud-native' },
            { text: 'DevOps', link: '/td/devops' }
          ]
        }
      ],
      '/smart-home/': [
        {
          text: '智能家居',
          items: [
            { text: '简介', link: '/smart-home/' },
            { text: '智能设备', link: '/smart-home/devices' },
            { text: '自动化场景', link: '/smart-home/automation' },
            { text: '设备联动', link: '/smart-home/integration' },
            { text: '家居安全', link: '/smart-home/security' },
            { text: '能源管理', link: '/smart-home/energy' }
          ]
        }
      ],
      '/open-source/': [
        {
          text: '开源项目',
          items: [
            { text: '简介', link: '/open-source/' },
            { text: '项目展示', link: '/open-source/projects' },
            { text: '技术分享', link: '/open-source/tech-sharing' },
            { text: '最佳实践', link: '/open-source/best-practices' },
            { text: '社区贡献', link: '/open-source/contribution' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nbazedong' }
    ],
    outline: {
      level: [2, 3, 4],
      // label: '页面导航'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outlineTitle: '本页目录',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
