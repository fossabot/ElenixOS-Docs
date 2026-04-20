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
        <div className={styles.heroBadge}>Open Source Smartwatch OS</div>
        <Heading as="h1" className={styles.heroTitle}>
          ElenaOS Documentation
        </Heading>
        <p className={styles.heroSubtitle}>
          An embedded wearable system powered by LVGL and JerryScript, designed
          for fluid smartwatch experiences on resource-constrained hardware.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.primaryButton)}
            to="/docs/intro">
            Read Docs
          </Link>
          <Link
            className={clsx('button button--lg', styles.secondaryButton)}
            to="https://github.com/Sab1e-dev/ElenaOS">
            View ElenaOS Repo
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <strong>GUI</strong>
            <span>LVGL</span>
          </div>
          <div className={styles.statItem}>
            <strong>Script Engine</strong>
            <span>JerryScript</span>
          </div>
          <div className={styles.statItem}>
            <strong>License</strong>
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
      title={`Home | ${siteConfig.title}`}
      description="ElenaOS documentation for build, scripting, and developer tooling.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
