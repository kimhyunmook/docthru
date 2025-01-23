import styles from "../styles/useModal.module.css";

export type ComponenetValue = {
  name?: string;
  props?: object;
  element?: React.ReactNode;
};
type UseModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component: ComponenetValue;
};
export default function UseModal({
  isOpen,
  setIsOpen,
  component,
}: UseModalProps) {
  function close(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    setIsOpen(false);
  }
  return (
    <div className={`${styles.infomation} ${isOpen && styles.display}`}>
      <div className={styles.top}>
        <h2 className={styles.name}>{component.name}</h2>
        <a className={styles.closeBtn} onClick={close}></a>
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
                if (Array.isArray(v[1])) {
                  const overlap = v[1].map((v) => {
                    return typeof v[1];
                  });
                  let setOverlap = new Set(overlap);
                  const arr = [...setOverlap];
                  value = arr.reduce((a, c, i) => {
                    a += c;
                    if (i !== arr.length - 1) a += "|";
                    else a += "[]";
                    return a;
                  }, "");
                } else {
                  const arr = Object.entries(v[1]);

                  const reactChk = arr[0].find((x) => x === "$$typeof");
                  console.log(reactChk);
                  if (!!reactChk) {
                    value = "React.ReactNode";
                    return (
                      <li className={styles.ob}>
                        <span className={styles.key}>{v[0]}</span>
                        <span className={styles.value}>{value}</span>
                      </li>
                    );
                  }
                  value = arr.map((v2, i) => {
                    return (
                      <span key={v2[0]} className={styles.ob}>
                        {i === 0 && "{"}
                        <span className={styles.key}>{v2[0]}</span>
                        <span className={styles.value}>{typeof v2[1]}</span>
                        {i === arr.length - 1 && " }"}
                      </span>
                    );
                  });
                }
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
