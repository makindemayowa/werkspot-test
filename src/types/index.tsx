export interface IListData {
  id: string;
  title: string;
  description: string;
  tag: string;
  assignee: string;
  dueDate: string;
}

export interface ITodoData {
  columnName: string;
  rows: IListData[];
}

export const tags = ['Long Form', 'SEO Article', 'Blog Post'];


export const colors = ['#D8D8D8', '#FBEDCE', '#90eebf'];
