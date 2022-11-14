export interface BlogApiAuthor {
  name: string;
  authorId: string;
  photo: string;
  about: string;
  url: string;
}

export interface BlogApiTag {
  label: string;
  permalink: string;
}

export interface BlogApiRelatedPost {
  title: string;
  permalink: string;
  formattedDate: string;
  authors: string[];
  readingTime: string;
  date: string;
  tags: BlogApiTag[];
}

export interface BlogApiPost {
  title: string;
  permalink: string;
  formattedDate: string;
  authors: string[];
  readingTime: string;
  date: string;
  tags: BlogApiTag[];
}
