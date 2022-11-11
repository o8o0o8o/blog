export interface Author {
  name: string;
  authorId: string;
  photo: string;
  about: string;
  url: string;
}

export interface RelatedPosts {
  title: string;
  permalink: string;
  formattedDate: string;
  authors: string;
  readingTime: string;
  date: string;
  tags: string[];
}
