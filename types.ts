export interface Testimonial {
  id: number;
  name: string;
  role: string;
  excerpt: string;
  fullText: string;
  date: string;
  rating: number;
}

export interface MediaItem {
  id: number;
  title: string;
  type: 'video' | 'image';
  thumbnail: string;
  duration: string;
  views: string;
}

export interface TranscriptLine {
  time: number;
  text: string;
}