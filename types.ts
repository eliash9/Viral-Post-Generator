
export interface Post {
  platform: string;
  postText: string;
  hashtags: string[];
  analysis: string;
}

export interface FormData {
  topic: string;
  platform: string;
  audience: string;
  emotion: string;
  tone: string;
}