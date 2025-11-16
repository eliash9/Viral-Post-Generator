
import React, { useState } from 'react';
import GeneratorForm from './components/GeneratorForm';
import ResultsArea from './components/ResultsArea';
import { generateViralPosts } from './services/geminiService';
import type { Post, FormData } from './types';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setPosts([]);
    try {
      const generatedPosts = await generateViralPosts(formData);
      setPosts(generatedPosts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Viral Post Generator
          </h1>
          <p className="text-lg text-gray-400">Masukkan ide Anda, biarkan AI meracik potensi viralnya.</p>
        </header>

        <main>
          <GeneratorForm isLoading={isLoading} onSubmit={handleGenerate} setError={setError} />
          <ResultsArea isLoading={isLoading} error={error} posts={posts} />
        </main>
      </div>
    </div>
  );
};

export default App;
