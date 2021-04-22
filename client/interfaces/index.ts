export interface Blog {
  _id: number;
  title: string;
  snippet: string;
  body: string;
}

export interface Props {
  blogs: Blog[];
}

export interface BlogProps {
  blog: Blog;
}
