export type Post = {
  slug: string;
  title: string;
  date: string;
  createDate: string;
  coverImage?: string;
  coverAlt?: string;
  excerpt: string;
  ogImage?: {
    url?: string;
  };
  content: string;
  preview?: boolean;
  published: boolean;
};
