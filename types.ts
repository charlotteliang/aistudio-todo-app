
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}
