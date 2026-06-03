import clsx from 'clsx';
import {useEffect, useState, useRef} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import {Highlight, themes} from 'prism-react-renderer';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './index.module.css';

// 模拟器URL常量
const SIMULATOR_URL = 'https://simulator.elenixos.com/wasm/latest/main.html';
// 本地调试URL
// const SIMULATOR_URL = 'http://127.0.0.1:5500/build-wasm/bin/main.html';

// Demo应用ID常量
const DEMO_APP_ID = 'com.elenixos.demo';

function HomepageHeader() {
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [commandId, setCommandId] = useState(1);
  const [demoCode, setDemoCode] = useState('');
  const [canWrite, setCanWrite] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const codeCardRef = useRef(null);
  const previewCardRef = useRef(null);

  const codeHighlighterRef = useRef(null);
  const {colorMode} = useColorMode();
  const prismTheme = colorMode === 'dark' ? themes.dracula : themes.github;

  const handleEditorScroll = (e) => {
    if (codeHighlighterRef.current) {
      codeHighlighterRef.current.scrollTop = e.target.scrollTop;
      codeHighlighterRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const defaultCode = translate({
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

  useEffect(() => {
    console.log('Adding message event listener');
    const handleMessage = (event) => {
      console.log('Received message event:', event);
      console.log('Message data:', event.data);
      const message = event.data;
      if (message && message.namespace === 'ElenixOS') {
        console.log('Received ElenixOS message:', message);
        if (message.type === 'ready') {
          console.log('Received ready message:', message);
          setIsReady(true);
          console.log('Set isReady to true');
        } else if (message.type === 'response') {
          console.log('Received response:', message);
          if (message.action === 'readAppMainJs' && message.ok) {
            console.log('Read success:', message.result);
            setDemoCode(message.result || defaultCode);
            setCanWrite(true);
          } else if (message.action === 'readAppMainJs' && !message.ok) {
            console.log('Read failed:', message.error);
            setDemoCode(defaultCode);
            setCanWrite(false);
          }
        }
      } else {
        console.log('Received non-ElenixOS message:', message);
      }
    };

    window.addEventListener('message', handleMessage);
    console.log('Message event listener added');
    return () => {
      console.log('Removing message event listener');
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // 当 isReady 变为 true 时，调用 readDemoCode
  useEffect(() => {
    if (isReady) {
      console.log('isReady is true, calling readDemoCode');
      readDemoCode();
    }
  }, [isReady]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isCodeFocused) return;

      const codeCard = codeCardRef.current;
      const previewCard = previewCardRef.current;

      if (
        codeCard && !codeCard.contains(e.target) &&
        previewCard && !previewCard.contains(e.target)
      ) {
        setIsCodeFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCodeFocused]);

  const sendCommand = (action, payload = {}, callback = null) => {
    if (!iframeRef.current || !isReady) {
      console.log('Cannot send command:', { action, isReady: isReady, iframeExists: !!iframeRef.current });
      return;
    }

    const id = commandId;
    setCommandId(id + 1);

    const message = {
      namespace: 'ElenixOS',
      type: 'command',
      id: id.toString(),
      action: action,
      payload: payload,
    };

    console.log('Sending command:', message);

    const handleResponse = (event) => {
      console.log('Handling response for command', id, ':', event.data);
      const response = event.data;
      if (
        response.namespace === 'ElenixOS' &&
        response.type === 'response'
      ) {
        // 修复：如果响应的 id 为空，使用 action 来匹配
        if (response.id === id.toString() || (response.id === '' && response.action === action)) {
          console.log('Response matched command', id);
          if (callback) {
            callback(response);
          }
          window.removeEventListener('message', handleResponse);
        }
      }
    };

    window.addEventListener('message', handleResponse);
    console.log('Posting message to iframe:', iframeRef.current);
    iframeRef.current.contentWindow.postMessage(message, '*');
  };

  const readDemoCode = () => {
    console.log("Reading...");
    sendCommand('readAppMainJs', { appId: DEMO_APP_ID });
  };

  const writeDemoCode = () => {
    sendCommand(
      'writeAppMainJs',
      {
        appId: DEMO_APP_ID,
        code: demoCode,
      },
      (response) => {
        if (response.ok) {
          sendCommand('launchAppById', { appId: DEMO_APP_ID });
        }
      },
    );
  };

  return (
    <header className={styles.heroBanner}>
      <div className={clsx('container', styles.heroShell)}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Translate id="homepage.badge">开源智能手表操作系统</Translate>
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="homepage.title">ElenixOS</Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="homepage.subtitle">
              基于 LVGL 与 JerryScript 的嵌入式可穿戴系统，面向资源受限硬件打造流畅的智能手表体验。
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.primaryButton)}
              to="/docs/intro"
            >
              <Translate id="homepage.cta.docs">阅读文档</Translate>
            </Link>
            <Link
              className={clsx('button button--lg', styles.secondaryButton)}
              to="https://github.com/ElenixOS/ElenixOS"
            >
              <Translate id="homepage.cta.repo">查看 ElenixOS 仓库</Translate>
            </Link>
          </div>
          <div className={styles.quickLinks}>
            <Link
              className={styles.quickLink}
              to="/docs/getting_started/quick_start"
            >
              <Translate id="homepage.quick.start">快速开始</Translate>
            </Link>
            <Link className={styles.quickLink} to="/docs/architecture/script_engine/elenix_os">
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
          <div className={styles.demoContainer} ref={containerRef}>
            <div
              ref={codeCardRef}
              className={clsx(
                styles.codeCard,
                isCodeFocused && styles.codeCardActive,
              )}
              onClick={(e) => {
                if (!isCodeFocused) {
                  e.stopPropagation();
                  setIsCodeFocused(true);
                }
              }}
            >
              <div className={styles.visualHeader}>
                <span className={styles.visualDot} />
                <span className={styles.visualDot} />
                <span className={styles.visualDot} />
                <p className={styles.visualTitle}>ElenixOS Demo App</p>
                <button
                  className={clsx(
                    styles.codeButton,
                    !canWrite && styles.codeButtonDisabled,
                  )}
                  onClick={writeDemoCode}
                  disabled={!canWrite || !isReady}
                  
                >
                  <svg  style={{marginLeft: 2}}  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
                <div className={styles.simulatorStatus}>
                  <span
                    className={clsx(
                      styles.statusIndicator,
                      isReady ? styles.statusReady : styles.statusNotReady,
                    )}
                  ></span>
                  <span className={styles.statusText}>
                    {isReady ? translate({ id: 'homepage.simulator.status.ready', message: '已就绪' }) : translate({ id: 'homepage.simulator.status.connecting', message: '连接中...' })}
                  </span>
                </div>
              </div>
              <div className={styles.visualBody}>
                <div className={styles.editorContainer}>
                  <pre ref={codeHighlighterRef} className={styles.codeHighlighter} aria-hidden="true">
                    <Highlight code={demoCode || ''} language="javascript" theme={prismTheme}>
                      {({className, style, tokens, getLineProps, getTokenProps}) => (
                        <code className={className} style={{...style, background: 'none'}}>
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({line})}>
                              {line.map((token, key) => (
                                <span key={key} {...getTokenProps({token})} />
                              ))}
                            </div>
                          ))}
                        </code>
                      )}
                    </Highlight>
                  </pre>
                  <textarea
                    className={styles.codeEditor}
                    value={demoCode}
                    onChange={(e) => setDemoCode(e.target.value)}
                    onScroll={handleEditorScroll}
                    placeholder={translate({ id: 'homepage.codeEditor.placeholder', message: '输入你的代码...' })}
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
            <div ref={previewCardRef} className={styles.previewCard} style={{background: `url('/img/WatchCard.png') no-repeat center`, backgroundSize: 'contain'}}>
              <div className={styles.simulatedScreen}>
                <iframe
                  ref={iframeRef}
                  src={SIMULATOR_URL}
                  className={styles.simulatorFrame}
                  title="ElenixOS WASM Simulator"
                />
              </div>
            </div>
          </div>
          <div className={styles.stackCards}>
            <div>
              <strong>Runtime</strong>
              <span>{translate({ id: 'homepage.stackCards.runtime', message: '事件循环 + UI 调度' })}</span>
            </div>
            <div>
              <strong>Toolkit</strong>
              <span>{translate({ id: 'homepage.stackCards.toolkit', message: '构建、调试、打包链路' })}</span>
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
        message: 'ElenixOS 构建、脚本引擎与开发工具文档站点。',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
