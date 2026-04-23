import clsx from 'clsx';
import {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import styles from './index.module.css';

function HomepageHeader() {
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [buttonText, setButtonText] = useState('Click Me');
  const [logs, setLogs] = useState([]);
  const codeSnippet = translate({
    id: 'homepage.codeCard.snippet',
    message: `// 获取当前活动 View
const view = eos.view.active();

// 创建一个按钮
const button = new lv.button(view);
button.setSize(180, 64);
button.align(lv.ALIGN_CENTER, 0, 20);

// 添加标签
const label = new lv.label(button);
label.setText('Click Me');
label.center();

// 绑定点击事件
button.addEventCb((e) => {
  eos.console.log('Button clicked!');
  label.setText('Clicked!');
}, lv.EVENT_CLICKED, null);`,
  });
  const codeFooter = translate({
    id: 'homepage.codeCard.footer',
    message: 'WASM for ElenaOS is under development, and the code below has been verified on real hardware.',
  });

  const handleButtonClick = () => {
    if (buttonText === 'Click Me') {
      setButtonText('Clicked!');
      setLogs((prev) => [...prev, 'Button clicked!']);
    } else {
      setButtonText('Click Me');
      setLogs((prev) => [...prev, 'Button reset!']);
    }
  };

  return (
    <header className={styles.heroBanner}>
      <div className={clsx('container', styles.heroShell)}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Translate id="homepage.badge">开源智能手表操作系统</Translate>
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="homepage.title">ElenaOS</Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="homepage.subtitle">
              基于 LVGL 与 JerryScript 的嵌入式可穿戴系统，面向资源受限硬件打造
              流畅的智能手表体验。
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.primaryButton)}
              to="/docs/intro">
              <Translate id="homepage.cta.docs">阅读文档</Translate>
            </Link>
            <Link
              className={clsx('button button--lg', styles.secondaryButton)}
              to="https://github.com/Sab1e-dev/ElenaOS">
              <Translate id="homepage.cta.repo">查看 ElenaOS 仓库</Translate>
            </Link>
          </div>
          <div className={styles.quickLinks}>
            <Link className={styles.quickLink} to="/docs/getting_started/quick_start">
              <Translate id="homepage.quick.start">快速开始</Translate>
            </Link>
            <Link className={styles.quickLink} to="/docs/js-api/">
              <Translate id="homepage.quick.api">JS API</Translate>
            </Link>
            <Link className={styles.quickLink} to="/docs/architecture/arch">
              <Translate id="homepage.quick.arch">架构设计</Translate>
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <strong>GUI</strong>
              <span>LVGL</span>
            </div>
            <div className={styles.statItem}>
              <strong>
                <Translate id="homepage.stats.engine">脚本引擎</Translate>
              </strong>
              <span>JerryScript</span>
            </div>
            <div className={styles.statItem}>
              <strong>
                <Translate id="homepage.stats.license">许可证</Translate>
              </strong>
              <span>Apache 2.0</span>
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.orbitGlow} aria-hidden="true" />
          <div
            className={styles.demoContainer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className={clsx(
                styles.previewCard,
                isCodeFocused ? styles.previewCardActive : (isHovering ? styles.previewCardHover : styles.previewCardDefault)
              )}
            >
              <div className={styles.screenHeader}>
                <p className={styles.screenTitle}>Live preview (JS simulation)</p>
              </div>
              <div className={styles.simulatedScreen}>
                <div className={styles.simulatedButton} onClick={handleButtonClick}>
                  <span className={styles.buttonLabel}>{buttonText}</span>
                </div>
              </div>
              <div className={styles.consoleArea}>
                <div className={styles.consoleHeader}>
                  <span className={styles.consoleDot} />
                  <span className={styles.consoleDot} />
                  <span className={styles.consoleDot} />
                  <span className={styles.consoleTitle}>Console</span>
                </div>
                <div className={styles.consoleBody}>
                  {logs.length === 0 ? (
                    <span className={styles.consoleEmpty}>No output yet...</span>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className={styles.consoleLog}>
                        <span className={styles.consolePrompt}>&gt;</span>
                        <span className={styles.consoleMessage}>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div
              className={styles.codeCard}
              onClick={() => setIsCodeFocused(!isCodeFocused)}
            >
              <div className={styles.visualHeader}>
                <span className={styles.visualDot} />
                <span className={styles.visualDot} />
                <span className={styles.visualDot} />
                <p className={styles.visualTitle}>Simple button demo</p>
              </div>
              <div className={styles.visualBody}>
                <CodeBlock language="javascript">
{codeSnippet}
                </CodeBlock>
              </div>
              <div className={styles.codeFooter}>
                <p className={styles.codeFooterText}>{codeFooter}</p>
              </div>
            </div>
          </div>
          <div className={styles.stackCards}>
            <div>
              <strong>Runtime</strong>
              <span>事件循环 + UI 调度</span>
            </div>
            <div>
              <strong>Toolkit</strong>
              <span>构建、调试、打包链路</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const baseUrl = siteConfig.baseUrl || '/';
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const pathname = window.location.pathname;

    if (pathname !== normalizedBase) {
      return;
    }

    if (window.localStorage.getItem('docusaurus.locale')) {
      return;
    }

    const browserLanguage = (navigator.language || '').toLowerCase();
    const isChinaRegion = /-cn\b/.test(browserLanguage);

    if (!isChinaRegion) {
      const englishLocaleUrl = new URL(window.location.href);
      englishLocaleUrl.port = '3000';
      englishLocaleUrl.pathname = '/en/';
      englishLocaleUrl.search = '';
      englishLocaleUrl.hash = '';
      window.location.replace(englishLocaleUrl.toString());
    }
  }, [siteConfig.baseUrl]);

  return (
    <Layout
      title={`${translate({
        id: 'homepage.layoutTitle',
        message: '首页',
      })} | ${siteConfig.title}`}
      description={translate({
        id: 'homepage.layoutDescription',
        message: 'ElenaOS 构建、脚本引擎与开发工具文档站点。',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
