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
    {
      type: 'category',
      label: '总览',
      items: ['introduction'],
    },
    {
      type: 'category',
      label: '入门',
      items: [
        'quick_start',
        'build',
        'getting_started/environment',
        'getting_started/faq',
      ],
    },
    {
      type: 'category',
      label: '系统架构',
      items: [
        'arch',
        'script_engine',
        'sni/sni',
        'architecture/runtime',
      ],
    },
    {
      type: 'category',
      label: 'JS API',
      items: ['js-api/elena_os', 'js-api/lvgl'],
    },
    {
      type: 'category',
      label: '系统服务',
      items: ['core/services', 'core/events'],
    },
    {
      type: 'category',
      label: '开发工具',
      items: [
        'dev_tools',
        'development/package_builder',
        'development/binding_generation',
      ],
    },
  ],
};

export default sidebars;
