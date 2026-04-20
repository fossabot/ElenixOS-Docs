import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Script-Driven Architecture',
    icon: 'JS',
    description: (
      <>
        ElenaOS uses a script-driven app model where JavaScript defines UI and
        interaction logic, while native code handles rendering and scheduling.
      </>
    ),
  },
  {
    title: 'LVGL + JerryScript Runtime',
    icon: 'LVGL',
    description: (
      <>
        The graphical stack is powered by LVGL, and watch faces and apps run on
        a unified JerryScript engine for consistent runtime behavior.
      </>
    ),
  },
  {
    title: 'Portable and Extensible',
    icon: 'MCU',
    description: (
      <>
        Clear abstraction layers and unified APIs make ElenaOS easier to port
        across different MCUs and hardware platforms.
      </>
    ),
  },
  {
    title: 'Wearable UX Focus',
    icon: 'UX',
    description: (
      <>
        Inspired by Apple Watch interactions, ElenaOS emphasizes gesture flow,
        smooth animations, and clear interface hierarchy on embedded devices.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <article className={clsx('col col--6', styles.featureItem)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.headerBlock}>
          <p className={styles.kicker}>Project Highlights</p>
          <Heading as="h2" className={styles.sectionTitle}>
            Built for smartwatches, engineered for developers
          </Heading>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
