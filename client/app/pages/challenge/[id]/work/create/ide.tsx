"use client";
import React, { useEffect, useState } from "react";
import Editor, { OnMount, OnChange, Monaco } from "@monaco-editor/react";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("// 로딩중...");
  const [loading, setLoading] = useState(true);

  // 에디터가 마운트될 때 호출되는 함수
  const handleEditorDidMount: OnMount = (editor, monaco: Monaco) => {
    // 커스텀 테마를 정의할 수 있음
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [{ token: "comment", foreground: "ffa500", fontStyle: "italic" }],
      colors: {
        "editor.background": "#1e1e1e",
      },
    });
    editor.focus();
  };

  // 에디터 내용 변경 시 - 이 예제에서는 상태에 저장하고, 버튼 클릭시 POST로 DB에 저장하는 식으로 구현할 수 있음
  const handleChange: OnChange = (value, event) => {
    if (typeof value === "string") {
      setCode(value);
    }
  };

  // 컴포넌트 마운트 시 DB에서 코드 값을 가져오기
  useEffect(() => {
    async function fetchCode() {
      try {
        const res = await fetch("/api/code", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.code) {
            setCode(data.code);
          }
        }
      } catch (error) {
        console.error("코드 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCode();
  }, []);

  // DB에 업데이트하는 예제: 저장 버튼 클릭 시 호출
  const handleSave = async () => {
    try {
      const res = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        throw new Error("저장 오류 발생");
      }
      alert("저장되었습니다.");
    } catch (error) {
      console.error(error);
      alert("저장 실패");
    }
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
  };

  if (loading) return <p>로딩중...</p>;

  return (
    <>
      <Editor
        height="500px"
        defaultLanguage="javascript"
        value={code}
        theme="custom-dark"
        onMount={handleEditorDidMount}
        onChange={handleChange}
        options={editorOptions}
      />
      <button onClick={handleSave}>저장하기</button>
    </>
  );
};

export default CodeEditor;
