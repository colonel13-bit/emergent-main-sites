import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Image as ImageIcon, Type, Link as LinkIcon, MoveUp, MoveDown } from 'lucide-react';

export default function MarketingSite() {
  const [editMode, setEditMode] = useState(false);
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      type: 'hero',
      title: 'Welcome to Your Brand',
      subtitle: 'Crafting exceptional experiences that matter',
      image: null
    },
    {
      id: 2,
      type: 'text',
      content: 'We believe in the power of simplicity and elegance. Our approach combines thoughtful design with strategic thinking to create solutions that resonate with your audience and drive meaningful results.'
    },
    {
      id: 3,
      type: 'image',
      url: null,
      caption: 'Your vision, our expertise'
    },
    {
      id: 4,
      type: 'text',
      content: 'From concept to execution, we partner with forward-thinking brands to build digital experiences that stand out in today\'s crowded marketplace.'
    }
  ]);

  const [showAddMenu, setShowAddMenu] = useState(false);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type: type,
      ...(type === 'text' && { content: 'Click to edit this text...' }),
      ...(type === 'image' && { url: null, caption: 'Add a caption' }),
      ...(type === 'hero' && { title: 'New Headline', subtitle: 'Add a subtitle', image: null }),
      ...(type === 'link' && { text: 'Link Text', url: 'https://example.com' })
    };
    setBlocks([...blocks, newBlock]);
    setShowAddMenu(false);
  };

  const updateBlock = (id, updates) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (id, direction) => {
    const index = blocks.findIndex(block => block.id === id);
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const handleImageUpload = (blockId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateBlock(blockId, { url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=Inter:wght@300;400;500&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        .hero-title {
          font-family: 'Crimson Pro', serif;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .body-text {
          font-family: 'Crimson Pro', serif;
          font-weight: 400;
          line-height: 1.8;
          letter-spacing: 0.01em;
        }

        .btn-primary {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px -5px rgba(120, 60, 40, 0.3);
        }

        .edit-controls {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .block-wrapper:hover .edit-controls {
          opacity: 1;
        }

        .content-editable:focus {
          outline: none;
          background: rgba(198, 124, 78, 0.05);
          border-radius: 4px;
        }

        .image-placeholder {
          background: linear-gradient(135deg, #f5e6d3 0%, #e8d4c0 100%);
          border: 2px dashed #c67c4e;
        }

        .add-menu {
          animation: slideIn 0.2s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '-0.01em' }}>
            Your Brand
          </h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="btn-primary px-6 py-2 rounded-full text-sm transition-colors"
            style={{
              background: editMode ? '#c67c4e' : 'transparent',
              color: editMode ? 'white' : '#c67c4e',
              border: `1px solid #c67c4e`
            }}
          >
            {editMode ? 'Done Editing' : 'Edit Page'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {blocks.map((block, index) => (
          <div key={block.id} className="block-wrapper relative mb-12 fade-in">
            {/* Edit Controls */}
            {editMode && (
              <div className="edit-controls absolute -left-16 top-0 flex flex-col gap-2">
                <button
                  onClick={() => moveBlock(block.id, 'up')}
                  disabled={index === 0}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-30"
                  style={{ color: '#c67c4e' }}
                >
                  <MoveUp size={16} />
                </button>
                <button
                  onClick={() => moveBlock(block.id, 'down')}
                  disabled={index === blocks.length - 1}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-30"
                  style={{ color: '#c67c4e' }}
                >
                  <MoveDown size={16} />
                </button>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  style={{ color: '#c67c4e' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            {/* Hero Block */}
            {block.type === 'hero' && (
              <div className="text-center py-16">
                <h2
                  className="hero-title text-7xl mb-6 content-editable"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => updateBlock(block.id, { title: e.target.textContent })}
                  style={{ color: '#2d2416' }}
                >
                  {block.title}
                </h2>
                <p
                  className="hero-subtitle text-sm mb-8 content-editable"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => updateBlock(block.id, { subtitle: e.target.textContent })}
                  style={{ color: '#c67c4e' }}
                >
                  {block.subtitle}
                </p>
                {editMode && !block.image && (
                  <div className="mt-8">
                    <label className="cursor-pointer inline-block px-6 py-3 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(block.id, e)}
                      />
                      <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#c67c4e' }}>
                        Add Hero Image
                      </span>
                    </label>
                  </div>
                )}
                {block.image && (
                  <div className="mt-8 relative">
                    <img src={block.image} alt="" className="w-full max-h-96 object-cover rounded-lg shadow-lg" />
                    {editMode && (
                      <button
                        onClick={() => updateBlock(block.id, { image: null })}
                        className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-md"
                        style={{ color: '#c67c4e' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Text Block */}
            {block.type === 'text' && (
              <p
                className="body-text text-xl max-w-3xl content-editable px-4 py-2"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => updateBlock(block.id, { content: e.target.textContent })}
                style={{ color: '#4a3f35' }}
              >
                {block.content}
              </p>
            )}

            {/* Image Block */}
            {block.type === 'image' && (
              <div className="my-8">
                {!block.url ? (
                  <label className="image-placeholder cursor-pointer block w-full h-64 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(block.id, e)}
                    />
                    <div className="text-center">
                      <ImageIcon size={48} style={{ color: '#c67c4e', margin: '0 auto 12px' }} />
                      <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#c67c4e' }}>
                        Click to upload image
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="relative">
                    <img src={block.url} alt="" className="w-full rounded-lg shadow-lg" />
                    {editMode && (
                      <button
                        onClick={() => updateBlock(block.id, { url: null })}
                        className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-md"
                        style={{ color: '#c67c4e' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )}
                <p
                  className="text-center mt-4 text-sm content-editable px-4 py-1"
                  contentEditable={editMode}
                  suppressContentEditableWarning
                  onBlur={(e) => updateBlock(block.id, { caption: e.target.textContent })}
                  style={{ fontFamily: 'Inter, sans-serif', color: '#8b7355' }}
                >
                  {block.caption}
                </p>
              </div>
            )}

            {/* Link Block */}
            {block.type === 'link' && (
              <div className="my-6">
                <a
                  href={editMode ? undefined : block.url}
                  className="inline-block btn-primary px-8 py-4 rounded-full"
                  style={{
                    background: '#c67c4e',
                    color: 'white',
                    textDecoration: 'none',
                    cursor: editMode ? 'default' : 'pointer'
                  }}
                  onClick={editMode ? (e) => e.preventDefault() : undefined}
                >
                  <span
                    className="content-editable"
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => updateBlock(block.id, { text: e.target.textContent })}
                  >
                    {block.text}
                  </span>
                </a>
                {editMode && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={block.url}
                      onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                      placeholder="https://example.com"
                      className="text-sm px-4 py-2 border border-stone-300 rounded-lg w-full max-w-md"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Block Button */}
        {editMode && (
          <div className="relative mt-16">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="btn-primary px-8 py-4 rounded-full flex items-center gap-2 mx-auto"
              style={{
                background: showAddMenu ? '#c67c4e' : 'transparent',
                color: showAddMenu ? 'white' : '#c67c4e',
                border: `2px solid #c67c4e`
              }}
            >
              <Plus size={20} />
              Add Block
            </button>

            {showAddMenu && (
              <div className="add-menu absolute left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-lg shadow-xl p-4 flex gap-3 border border-stone-200">
                <button
                  onClick={() => addBlock('text')}
                  className="px-4 py-3 rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center gap-2"
                >
                  <Type size={24} style={{ color: '#c67c4e' }} />
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#4a3f35' }}>Text</span>
                </button>
                <button
                  onClick={() => addBlock('image')}
                  className="px-4 py-3 rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center gap-2"
                >
                  <ImageIcon size={24} style={{ color: '#c67c4e' }} />
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#4a3f35' }}>Image</span>
                </button>
                <button
                  onClick={() => addBlock('link')}
                  className="px-4 py-3 rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center gap-2"
                >
                  <LinkIcon size={24} style={{ color: '#c67c4e' }} />
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#4a3f35' }}>Button</span>
                </button>
                <button
                  onClick={() => addBlock('hero')}
                  className="px-4 py-3 rounded-lg hover:bg-stone-50 transition-colors flex flex-col items-center gap-2"
                >
                  <Edit3 size={24} style={{ color: '#c67c4e' }} />
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#4a3f35' }}>Hero</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white mt-32">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8b7355' }}>
            © 2026 Your Brand. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}