interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
};

export type { User };