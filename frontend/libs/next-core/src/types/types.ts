export interface Example {
  id: string;
  name: string;
  transcription?: string;
  translation: string;
}

export interface Translation {
  id: string;
  word_transcription: string;
  name: string;
  part_of_speech: string;
  description?: string;
  tag?: string;
}

export interface Word {
  id: 'string';
  // TODO: return status in response?
  status?: 'new' | 'in_progress' | 'learned' | 'skipped' | 'paused' | 'unknown';
  name: 'string';
  translations?: Translation[];
  examples?: Example[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  word_statistics?: {
    level: number;
    count: number;
  }[];
}
