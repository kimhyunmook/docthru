// FontSize.ts
import { Extension, RawCommands } from "@tiptap/core";

const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              const size = element.style.fontSize;
              return size ? size.replace(/['"]+/g, "") : null;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands(): Partial<RawCommands> {
    return {
      //   setFontSize:
      //     (fontSize: string) =>
      //     ({ chain }) => {
      //       return chain().setMark("textStyle", { fontSize }).run();
      //     },
    };
  },
});

export default FontSize;
