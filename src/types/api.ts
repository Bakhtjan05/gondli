export interface SurveyQuestion {
  key: string;
  content: string;
  options: string[];
  type: 'radio' | 'multiselect';
}

export interface SurveyQuestions {
  data: {
    name: string;
    sections: ['Wellness Enthusiast', 'Business Owner'];
    questions: SurveyQuestion[];
    'Wellness Enthusiast': SurveyQuestion[];
    'Business Owner': SurveyQuestion[];
  };
}

export type Categories = {
  id: number;
  slug: string;
  name: string;
  updated_at: string;
  created_at: string;
}[];

export interface Blog {
  data: {
    slug: string;
    thumbnail: string;
    category: string;
    title: string;
    body: string;
    images: string[];
    tags: string[];
  }[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    path: string;
    total: number;
    from: number;
    to: number;
    per_page: number;
    last_page: number;
    current_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
}
