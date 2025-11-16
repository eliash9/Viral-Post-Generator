
import React, { useState } from 'react';
import type { FormData } from '../types';

interface GeneratorFormProps {
  isLoading: boolean;
  onSubmit: (formData: FormData) => void;
  setError: (error: string | null) => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ isLoading, onSubmit, setError }) => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'Twitter/X',
    audience: '',
    emotion: 'Tertawa',
    tone: 'Humoris',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.topic || !formData.audience) {
      setError("Topik dan Target Audiens tidak boleh kosong.");
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 shadow-2xl rounded-xl p-6 md:p-8 space-y-6">
      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-gray-300 mb-2">Topik Utama / Ide Dasar</label>
        <textarea
          id="topic"
          name="topic"
          rows={3}
          value={formData.topic}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Misal: 'Susahnya cari kerja setelah lulus' atau 'Resep mie instan level sultan'"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="platform" className="block text-sm font-semibold text-gray-300 mb-2">Platform Tujuan</label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="Twitter/X">Twitter / X</option>
            <option value="Instagram Reels">Instagram Reels</option>
            <option value="TikTok">TikTok</option>
            <option value="Threads">Threads</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
          </select>
        </div>

        <div>
          <label htmlFor="audience" className="block text-sm font-semibold text-gray-300 mb-2">Target Audiens</label>
          <input
            type="text"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Misal: 'Profesional muda'"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="emotion" className="block text-sm font-semibold text-gray-300 mb-2">Tujuan / Emosi</label>
          <select
            id="emotion"
            name="emotion"
            value={formData.emotion}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="Tertawa">Tertawa</option>
            <option value="Terinspirasi">Terinspirasi</option>
            <option value="Marah/Debat">Marah / Debat</option>
            <option value="Haru">Haru</option>
            <option value="Penasaran">Penasaran</option>
          </select>
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-semibold text-gray-300 mb-2">Nada / Tone</label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="Humoris">Humoris</option>
            <option value="Profesional">Profesional</option>
            <option value="Santai">Santai</option>
            <option value="Inspiratif">Inspiratif</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        <span>{isLoading ? 'Sedang Berpikir...' : 'Buat Postingan Viral!'}</span>
      </button>
    </form>
  );
};

export default GeneratorForm;