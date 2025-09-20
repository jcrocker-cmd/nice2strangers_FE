import { Editor } from "@tinymce/tinymce-react";

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  menubar?: string | boolean;
}

const TinyEditor = ({
  value,
  onChange,
  height = 400,
  menubar = false,
}: TinyEditorProps) => {
  return (
    <Editor
      apiKey="mwhafpqj39avw3cyd57rt1r1aakpguhk1yi5fx36ry762j78"
      value={value}
      onEditorChange={onChange}
      init={{
        height,
        menubar,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
          "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "code", "help", "wordcount"
        ],
        toolbar:
          "undo redo | blocks | fontsizeselect | bold italic underline | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | help | image",
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
      }}
    />
  );
};

export default TinyEditor;
