import styles from "../styles/use.module.css";
export type ComponenetValue = {
  name?: string;
  props?: object;
  element?: React.ReactNode;
};
type UseModalProps = {
  isOpen: boolean;
  component: ComponenetValue;
};
export default function UseModal({ isOpen, component }: UseModalProps) {
  return (
    <div className={`${styles.infomation} ${isOpen && styles.display}`}>
      <div className={styles.top}>
        <h2 className={styles.name}>{component.name}</h2>
        <a className={styles.closeBtn}></a>
      </div>
      <div className={styles.elements}>{component.element}</div>
      <div className={styles.lists}>
        <h2 className={styles.title}>Props</h2>
        <ul>
          {Object.entries(component?.props ?? {}).map((v, index) => {
            let value = typeof v[1] as React.ReactNode;

            if (v[1] === null) value = "null";
            switch (value) {
              case "function":
                value = "() => void";
                break;
              case "object":
                const arr = Object.entries(v[1]);
                value = arr.map((v2, i) => {
                  return (
                    <span key={v2[0]} className={styles.ob}>
                      {i === 0 && "{"}
                      <span className={styles.key}>{v2[0]}</span>
                      <span className={styles.value}>
                        {typeof v2[1]}
                        <b className={styles.trans}>;</b>
                      </span>
                      {i === arr.length - 1 && " }"}
                    </span>
                  );
                });
                break;
            }
            return (
              <li key={index}>
                <h3 className={styles.key}>{v[0]}</h3>
                <p className={styles.value}>{value}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
