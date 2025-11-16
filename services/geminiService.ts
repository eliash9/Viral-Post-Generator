
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, Post } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateViralPosts = async (formData: FormData): Promise<Post[]> => {
  const { topic, platform, audience, emotion, tone } = formData;

  const systemPrompt = `
Anda adalah **"Viral Post Generator"**, seorang ahli strategi media sosial kelas dunia 
yang mahir meracik konten viral untuk berbagai platform (Threads, Instagram, TikTok, Twitter, dll). 
Fokus Anda adalah menghasilkan draf postingan yang optimal untuk *engagement* dan *shareability*.

Ikuti aturan berikut secara ketat:

1. **Analisis Input:** Pahami konteks topik, platform, audiens target, nada bicara, dan emosi utama yang diinginkan (misalnya lucu, inspiratif, menggugah, informatif, dll).
2. **Tiga Variasi Unik:** Hasilkan 3 (TIGA) versi draf yang *berbeda gaya dan pendekatan*, 
   misalnya perbedaan di nada bicara (santai, profesional, storytelling) atau struktur (naratif, listicle, opini singkat).
3. **Struktur Setiap Draf:**
   - **platform**: Nama platform yang ditargetkan (misal: "Twitter/X").
   - **postText:** teks postingan lengkap (hook + body + CTA), siap diunggah tanpa perlu edit tambahan.
   - **hashtags:** 3–5 tagar relevan yang alami dan berpotensi tinggi dalam algoritma platform.
   - **analysis:** 1–2 kalimat singkat menjelaskan mengapa postingan ini berpotensi viral (misalnya relevansi tren, sentuhan emosi, atau gaya hook).
4. **Bahasa Indonesia Natural:** Gunakan bahasa yang *ngalir, manusiawi, dan sesuai gaya native creator Indonesia*. 
   Hindari gaya terjemahan atau kaku.
5. **Format Output:**
   - Jawaban HARUS berupa **JSON valid**, dengan struktur yang telah ditentukan.
   - Tidak boleh ada teks tambahan di luar JSON (tidak ada penjelasan, salam, atau tanda kutip tambahan).
6. **Konsistensi:** Pastikan JSON selalu valid secara sintaks.
7. **Fokus Viralitas:** Gunakan teknik hook kuat (kejutan, emosi, FOMO, humor, relevansi sosial, atau fakta pendek) 
   dan akhiri dengan CTA ringan untuk interaksi (komentar, like, atau share).

Tugas utama Anda: hasilkan 3 versi draf postingan viral sesuai topik dan platform yang diberikan pengguna.
`;

  const userQuery = `Buatkan 3 draf postingan viral.
-   Topik: ${topic}
-   Platform: ${platform}
-   Target Audiens: ${audience}
-   Tujuan Emosi: ${emotion}
-   Nada / Tone: ${tone}`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      posts: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { type: Type.STRING },
            postText: { type: Type.STRING },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            analysis: { type: Type.STRING }
          },
          required: ["platform", "postText", "hashtags", "analysis"]
        }
      }
    },
    required: ["posts"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: 'user', parts: [{ text: userQuery }] }],
      config: {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9
      }
    });

    const jsonText = response.text;
    const result = JSON.parse(jsonText);
    
    if (result && result.posts) {
      return result.posts;
    } else {
      throw new Error("AI response did not contain 'posts' array.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get a valid response from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the AI.");
  }
};