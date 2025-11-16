
import React, { useState, useCallback } from 'react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const hashtagsForCopy = post.hashtags.join(' ');
    const textForCopy = `${post.postText}\n\n${hashtagsForCopy}`;
    navigator.clipboard.writeText(textForCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }, [post]);

  return (
    <div
      className="post-card rounded-lg shadow-xl overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="p-5 md:p-6 post-card-content" style={{ background: '#1f2937', borderRadius: '7px', margin: '1px' }}>
        <span className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          Opsi {index + 1} ({post.platform})
        </span>
        <div className="space-y-4 text-gray-200">
          <div className="relative">
            <button
              onClick={handleCopy}
              className={`absolute top-2 right-2 text-white text-xs font-medium px-2 py-1 rounded-md transition duration-200 ${
                isCopied
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <p className="bg-gray-700 p-4 rounded-md pr-14 whitespace-pre-wrap">{post.postText}</p>
          </div>
          <p>
            <strong>#️⃣ Hashtags:</strong>{' '}
            {post.hashtags.map(h => (
              <span key={h} className="text-blue-400 mr-2">{h}</span>
            ))}
          </p>
          <hr className="border-gray-600 my-4" />
          <p className="text-gray-400">
            <strong>🧠 Analisis AI:</strong> <i>{post.analysis}</i>
          </p>
        </div>
      </div>
    </div>
  );
};

// Custom styles for the gradient border effect
const PostCardStyle = () => (
    <style>{`
      .post-card {
        border: 1px solid transparent;
        background-clip: padding-box;
        background: linear-gradient(135deg, #1f2937, #111827);
      }
    `}</style>
);
// Export style separately to include once in App.tsx
export { PostCardStyle };
export default PostCard;
