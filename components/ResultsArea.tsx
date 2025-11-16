
import React from 'react';
import PostCard, { PostCardStyle } from './PostCard';
import type { Post } from '../types';

interface LoadingSpinnerProps {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <div className="loading-spinner w-12 h-12 rounded-full mb-4 border-4 border-gray-600 border-t-blue-500"></div>
        <p className="text-lg font-semibold text-blue-400">AI sedang meracik formula viral...</p>
        <p className="text-gray-400">Mohon tunggu sebentar, ini butuh pemikiran mendalam!</p>
    </div>
);


interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded-lg text-center">
        <p><strong>Oops! Terjadi kesalahan.</strong> {message}</p>
    </div>
);


interface ResultsAreaProps {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
}

const ResultsArea: React.FC<ResultsAreaProps> = ({ isLoading, error, posts }) => {
  return (
    <div className="mt-10">
      <PostCardStyle />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsArea;
