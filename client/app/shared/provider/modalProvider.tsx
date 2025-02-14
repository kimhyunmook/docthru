import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "../components/modal/modal";
import { JSX } from "react";
import s from "./styles/modalProvider.module.css";
import { usePathname } from "next/navigation";

interface ModalContext {
  modalOepn: () => void;
  modalClose: () => void;
  title: (text: string) => void;
  buttons: React.Dispatch<React.SetStateAction<JSX.Element>>;
}
const ModalContext = createContext<ModalContext>({
  modalOepn: () => {},
  modalClose: () => {},
  title: () => {},
  buttons: () => <></>,
});

export function ModalProvider({ children }: PropsWithChildren) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [buttons, setButtons] = useState(<></>);
  const pathname = usePathname();
  useEffect(() => {
    return setOpen(false);
  }, [pathname]);

  function title(text: string) {
    setText(text);
  }
  function modalOepn() {
    setOpen(true);
  }
  function modalClose() {
    setOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{ modalOepn, modalClose, title, buttons: setButtons }}
    >
      {children}
      {open && (
        <div className={s.modalContainer}>
          <Modal.Popup
            className={s.modal}
            btnFree={
              <div className={s.btnArea}>
                {buttons}
                {/* <Btn.Filled.Regular onClick={modalClose}>
                  취소
                </Btn.Filled.Regular>
                <Btn.Solid.Regular>신청</Btn.Solid.Regular> */}
              </div>
            }
          >
            {text}
          </Modal.Popup>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("ModalProvider안에서 사용해주세요");
  }
  return context;
}
