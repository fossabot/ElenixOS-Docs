import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: translate({
      id: 'homepage.features.scriptDriven.title',
      message: '脚本驱动架构',
    }),
    icon: 'JS',
    description: translate({
      id: 'homepage.features.scriptDriven.description',
      message:
        'ElenaOS 采用脚本驱动的应用模型，由 JavaScript 定义 UI 与交互逻辑，由原生代码负责渲染与调度。',
    }),
  },
  {
    title: translate({
      id: 'homepage.features.runtime.title',
      message: 'LVGL + JerryScript 运行时',
    }),
    icon: 'LVGL',
    description: translate({
      id: 'homepage.features.runtime.description',
      message:
        '图形栈由 LVGL 提供能力，表盘与应用统一运行在 JerryScript 引擎之上，保障一致的运行时行为。',
    }),
  },
  {
    title: translate({
      id: 'homepage.features.portable.title',
      message: '可移植与可扩展',
    }),
    icon: 'MCU',
    description: translate({
      id: 'homepage.features.portable.description',
      message:
        '清晰的抽象分层与统一 API，让 ElenaOS 更容易在不同 MCU 与硬件平台之间迁移与复用。',
    }),
  },
  {
    title: translate({
      id: 'homepage.features.ux.title',
      message: '专注可穿戴交互体验',
    }),
    icon: 'UX',
    description: translate({
      id: 'homepage.features.ux.description',
      message:
        '借鉴 Apple Watch 的交互理念，ElenaOS 强调手势流程、动画连贯性与嵌入式界面的信息层级。',
    }),
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
          <p className={styles.kicker}>
            <Translate id="homepage.features.kicker">项目亮点</Translate>
          </p>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="homepage.features.heading">
              为智能手表而生，为开发者而设计
            </Translate>
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
