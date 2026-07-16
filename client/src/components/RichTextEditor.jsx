import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";

const RichTextEditor = ({ input, setInput }) => {
  // Update Parent State
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };

  // Tiptap Editor
  const editor = useEditor({
    extensions: [StarterKit],

    content: input.description || "",

    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "tiptap min-h-[300px] w-full px-6 py-5 outline-none text-base leading-7 text-foreground",
      },
    },
  });

  // IMPORTANT FOR API DATA
  useEffect(() => {
    if (editor && input.description !== editor.getHTML()) {
      editor.commands.setContent(input.description || "");
    }
  }, [input.description, editor]);
  if (!editor) return null;

  // Toolbar Button Style
  const buttonClass = (active) =>
    `rounded-xl p-2 transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg"
        : "hover:bg-white/10 dark:hover:bg-white/5"
    }`;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          <Bold size={18} />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          <Italic size={18} />
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={buttonClass(editor.isActive("strike"))}
        >
          <Strikethrough size={18} />
        </button>

        {/* H1 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 size={18} />
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 size={18} />
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <List size={18} />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <ListOrdered size={18} />
        </button>

        {/* Quote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive("blockquote"))}
        >
          <Quote size={18} />
        </button>

        {/* Undo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded-xl p-2 transition-all duration-200 hover:bg-white/10"
        >
          <Undo2 size={18} />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded-xl p-2 transition-all duration-200 hover:bg-white/10"
        >
          <Redo2 size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
