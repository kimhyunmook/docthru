"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import CrystalModal, { ComponenetValue } from "./crystalModal";
import type { CrystalClassName } from "./types/crystalType";
import { getDisplayName } from "next/dist/shared/lib/utils";
import cyl from "./styles/crystalLayout.module.css";

interface Crystal {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponent: React.Dispatch<React.SetStateAction<object>>;
}

const CrystalContext = createContext<Crystal>({
  setIsOpen: () => {},
  setComponent: () => {},
});

export default function Crystal({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState<ComponenetValue>({});

  return (
    <CrystalContext.Provider value={{ setIsOpen, setComponent }}>
      <div className={cyl.page}>{children}</div>
      <CrystalModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        component={component}
      />
    </CrystalContext.Provider>
  );
}

type UseLayoutProps = CrystalClassName & {
  title: string;
  width?: number | string;
};

export function CrystalLayout({ children, title, width }: UseLayoutProps) {
  const { setIsOpen, setComponent } = useCrystal();
  return (
    <div className={cyl.layout} style={{ width }}>
      <h2 className={cyl.title}>{title}</h2>
      <ul className={cyl.list}>
        {React.Children.map(children, (child, index) => {
          return (
            <li
              className={cyl.li}
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
                if (!React.isValidElement(child)) return;

                const cloneProps = Object.fromEntries(
                  Object.entries(child.props ?? {}).map((v) => {
                    const key = v[0];
                    const value = v[1];
                    return [key, value];
                  })
                );
                const clone = React.cloneElement(child, cloneProps);

                setComponent({
                  element: clone,
                  displayName:
                    typeof child.type === "string"
                      ? child.type
                      : getDisplayName(child.type),
                  name: typeof child.type === "function" ? child.type.name : "",
                  props: child.props,
                });
              }}
            >
              {child}
              <div className={cyl.cover}></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function useCrystal() {
  const context = useContext<Crystal>(CrystalContext);
  if (!context) throw new Error("Crytal Componenets 안에서 사용하세요");
  return context;
}
