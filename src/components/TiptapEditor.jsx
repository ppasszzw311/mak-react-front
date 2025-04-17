import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import './TiptapEditor.css'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="menuBar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        粗體
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        斜體
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        刪除線
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        標題 1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        標題 2
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        項目符號
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        編號列表
      </button>
    </div>
  )
}

const TiptapEditor = () => {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // 從後端獲取內容
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content')
        const data = await response.json()
        setContent(data.content)
      } catch (error) {
        console.error('獲取內容失敗:', error)
        setContent('<p>開始編輯...</p>')
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // 自動保存到後端
      const content = editor.getJSON()
      saveContent(content)
    },
  })

  // 保存內容到後端
  const saveContent = async (content) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
    } catch (error) {
      console.error('保存內容失敗:', error)
    }
  }

  if (isLoading) {
    return <div>載入中...</div>
  }

  return (
    <div className="editor-wrapper">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="save-status">
        內容已自動保存
      </div>
    </div>
  )
}

export default TiptapEditor 