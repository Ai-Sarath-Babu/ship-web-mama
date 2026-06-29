import React, { useState, useRef } from 'react';
import { Bold, Italic, Heading1, Heading2, List, Quote, Code, Eye, Edit3 } from 'lucide-react';

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function WysiwygEditor({ value, onChange, placeholder }: WysiwygEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = before + (selected || placeholder || 'text') + after;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    onChange(newValue);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selected || 'text').length);
    }, 0);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-emerald-600/20 focus-within:border-emerald-600">
      {/* Rich Editor Toolbar */}
      <div className="bg-gray-50 border-b border-gray-100 px-3 py-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertText('**', '**')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('*', '*')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
          <button
            type="button"
            onClick={() => insertText('# ', '')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('## ', '')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
          <button
            type="button"
            onClick={() => insertText('- ', '')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('> ', '')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('`', '`')}
            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
            title="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Preview toggle */}
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
            isPreview 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isPreview ? (
            <>
              <Edit3 className="w-3 h-3" />
              <span>Back to Editor</span>
            </>
          ) : (
            <>
              <Eye className="w-3 h-3" />
              <span>Live Preview</span>
            </>
          )}
        </button>
      </div>

      {/* Editor or Preview Pane */}
      <div className="relative">
        {isPreview ? (
          <div className="p-3 text-xs text-gray-800 min-h-[160px] bg-gray-50/50 prose prose-sm max-w-none overflow-y-auto">
            {value ? (
              <div className="space-y-2">
                {value.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-sm font-extrabold text-emerald-950 pt-2 border-b pb-1">{line.replace('# ', '')}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-xs font-bold text-emerald-900 pt-1.5">{line.replace('## ', '')}</h2>;
                  }
                  if (line.startsWith('> ')) {
                    return <blockquote key={idx} className="border-l-2 border-emerald-500 pl-2 italic text-gray-500 my-1">{line.replace('> ', '')}</blockquote>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="list-disc list-inside text-gray-600 ml-1">{line.replace('- ', '')}</li>;
                  }
                  return <p key={idx} className="leading-relaxed whitespace-pre-wrap">{line}</p>;
                })}
              </div>
            ) : (
              <span className="text-gray-400 italic">Nothing to preview yet. Draft your content in the editor view.</span>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={6}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 text-xs bg-white text-gray-800 focus:outline-none resize-y min-h-[160px] font-mono leading-relaxed"
            placeholder={placeholder || 'Draft article content... Use the toolbar shortcuts to style.'}
          />
        )}
      </div>
    </div>
  );
}
