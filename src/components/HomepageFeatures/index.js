import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '脚本驱动架构',
    icon: 'JS',
    description: (
      <>
        ElenaOS 采用脚本驱动的应用模型，由 JavaScript 定义 UI 与交互逻辑，
        由原生代码负责渲染与调度。
      </>
    ),
  },
  {
    title: 'LVGL + JerryScript 运行时',
    icon: 'LVGL',
    description: (
      <>
        图形栈由 LVGL 提供能力，表盘与应用统一运行在 JerryScript 引擎之上，
        保障一致的运行时行为。
      </>
    ),
  },
  {
    title: '可移植与可扩展',
    icon: 'MCU',
    description: (
      <>
        清晰的抽象分层与统一 API，让 ElenaOS 更容易在不同 MCU 与硬件平台
        之间迁移与复用。
      </>
    ),
  },
  {
    title: '专注可穿戴交互体验',
    icon: 'UX',
    description: (
      <>
        借鉴 Apple Watch 的交互理念，ElenaOS 强调手势流程、动画连贯性与
        嵌入式界面的信息层级。
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
          <p className={styles.kicker}>项目亮点</p>
          <Heading as="h2" className={styles.sectionTitle}>
            为智能手表而生，为开发者而设计
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
