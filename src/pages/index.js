import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroBadge}>开源智能手表操作系统</div>
        <Heading as="h1" className={styles.heroTitle}>
          ElenaOS 文档
        </Heading>
        <p className={styles.heroSubtitle}>
          基于 LVGL 与 JerryScript 的嵌入式可穿戴系统，面向资源受限硬件打造
          流畅的智能手表体验。
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.primaryButton)}
            to="/docs/intro">
            阅读文档
          </Link>
          <Link
            className={clsx('button button--lg', styles.secondaryButton)}
            to="https://github.com/Sab1e-dev/ElenaOS">
            查看 ElenaOS 仓库
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <strong>GUI</strong>
            <span>LVGL</span>
          </div>
          <div className={styles.statItem}>
            <strong>脚本引擎</strong>
            <span>JerryScript</span>
          </div>
          <div className={styles.statItem}>
            <strong>许可证</strong>
            <span>Apache 2.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`首页 | ${siteConfig.title}`}
      description="ElenaOS 构建、脚本引擎与开发工具文档站点。">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
