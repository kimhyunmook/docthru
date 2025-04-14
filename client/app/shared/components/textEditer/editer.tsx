// components/Editor.js
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
// import FontSize from '../extensions/FontSize' // 위에서 정의한 FontSize 확장

function TextEditer() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      // FontSize, // 커스텀 폰트 사이즈 익스텐션
    ],
    content: "<p>텍스트를 선택해서 굵게 또는 글자 크기를 조절해보세요.</p>",
  });
  if (!editor) {
    return <div>에디터 로딩중...</div>;
  }

  return (
    <div>
      {/* 툴바 */}
      <div style={{ marginBottom: "1rem" }}>
        {/* Bold 버튼 */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{
            fontWeight: editor.isActive("bold") ? "bold" : "normal",
            marginRight: "1rem",
          }}
        >
          굵게
        </button>
        {/* Font size 증가 버튼 */}
        <button
          onClick={
            () => {}
            // editor.chain().focus().setFontSize('20px').run()
          }
          style={{ marginRight: "1rem" }}
        >
          글자 키우기
        </button>
        {/* 폰트 사이즈 초기화 또는 감소하는 버튼도 추가 가능 */}
        <button
          onClick={
            () => {}
            // editor.chain().focus().setFontSize('16px').run()
          }
        >
          원래대로
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default TextEditer;
