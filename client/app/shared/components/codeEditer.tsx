"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { OnMount, OnChange, Monaco } from "@monaco-editor/react";
import s from "../styles/editer.module.css";
// 다이나믹 임포트: SSR 비활성화
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface CodeEditerProps {
  dispatch?: React.Dispatch<React.SetStateAction<string>>;
  height?: string;
  readonly?: boolean;
  label?: boolean;
  style?: React.CSSProperties;
  bgColor?: string;
  value?: string;
}

function CodeEditor({
  dispatch,
  height,
  readonly,
  label = true,
  style,
  value,
  bgColor = "#ffffff",
}: CodeEditerProps) {
  // const [code, setCode] = useState<string>("// 로딩중...");
  const [focused, setFocused] = useState<React.CSSProperties>({});

  // 에디터가 마운트될 때 호출되는 함수
  const handleEditorDidMount: OnMount = (editor, monaco: Monaco) => {
    // 커스텀 테마를 정의할 수 있음
    monaco.editor.defineTheme("custom-dark", {
      base: "vs",
      inherit: true,
      rules: [{ token: "comment", fontStyle: "italic" }],
      colors: {
        "editor.background": bgColor,
      },
    });
    // 포커스 되었을 때
    editor.onDidFocusEditorText(() => {
      console.log("Editor Focused");
      setFocused({
        border: "2px solid #000",
      });
    });

    // 포커스 해제되었을 때
    editor.onDidBlurEditorText(() => {
      console.log("Editor Blurred");
      setFocused({
        border: "2px solid #e5e5e5",
      });
    });
  };

  // 에디터 내용 변경 시 - 이 예제에서는 상태에 저장하고, 버튼 클릭시 POST로 DB에 저장하는 식으로 구현할 수 있음
  const handleChange: OnChange = (value) => {
    if (typeof value === "string") {
      // setCode(value);
      console.log(value);
      if (dispatch) dispatch(value);
    }
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    readOnly: !!readonly,
  };

  return (
    <div className={s.codeContainer}>
      {label && <h4 className={s.title}>코드</h4>}
      <div
        className={s.editer}
        style={{ ...focused, ...style, background: bgColor }}
      >
        <Editor
          height={height ? height : "300px"}
          defaultLanguage="javascript"
          value={value}
          theme="custom-dark"
          onMount={handleEditorDidMount}
          onChange={handleChange}
          options={editorOptions}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
