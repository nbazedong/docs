import { defineConfig } from 'vitepress'

export default defineConfig({
  gnoreDeadLinks: true,
  title: "STAR",
  description: "STAR Documentation",

  vite: {
    server: {
      port: 5174,
      host: '0.0.0.0',
      allowedHosts: ['ai.3207778.xyz','docs.110200.xyz']
    }
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/config/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '基本概念', link: '/guide/concepts' }
          ]
        },
        {
          text: '进阶使用',
          items: [
            { text: '自定义配置', link: '/guide/configuration' },
            { text: '插件系统', link: '/guide/plugins' },
            { text: 'API 使用', link: '/guide/api' }
          ]
        }
      ],
      '/config/': [
        {
          text: '配置参考',
          items: [
            { text: '基础配置', link: '/config/' },
            { text: '高级配置', link: '/config/advanced' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nbazedong' }
    ]
  }
})
