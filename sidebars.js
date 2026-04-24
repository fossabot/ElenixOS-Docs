// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'introduction',
    {
      type: 'category',
      label: '入门',
      items: [
        'getting_started/quick_start',
        'getting_started/build',
        'getting_started/environment',
        'getting_started/faq',
      ],
    },
    {
      type: 'category',
      label: '集成指南',
      items: [
        'integration/overview',
      ],
    },
    {
      type: 'category',
      label: '系统架构',
      items: [
        'architecture/arch',
        'architecture/script_engine',
        'architecture/runtime',
        'sni/sni',
      ],
    },
    {
      type: 'category',
      label: '核心模块',
      items: [
        'core/app',
        'core/services',
        'core/events',
        'core/fs',
        {
          type: 'category',
          label: 'UI',
          items: [
            'core/ui',
            'core/card_pager',
            'core/slide_widget',
          ],
        },
        'core/activity',
        'core/dispatcher'],
    },
    {
      type: 'category',
      label: 'JS API',
      items: [
        'js-api/index',
        'js-api/elenix_os',
        'js-api/lvgl',
        'js-api/special',
        {
          type: 'category',
          label: '特殊组件',
          items: [
            'js-api/widgets/anim',
            'js-api/widgets/btnm',
            'js-api/widgets/calendar',
            'js-api/widgets/canvas',
            'js-api/widgets/dropdown',
            'js-api/widgets/image',
            'js-api/widgets/obj',
            'js-api/widgets/timer',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '开发指南',
      items: [
        'development/dev_tools',
        'development/package_builder',
      ],
    },
    'contributing',
    'CHANGELOG',
  ],
};

export default sidebars;
