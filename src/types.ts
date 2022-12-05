export type CustomResponse<T> = {
  success: boolean;
  data: T | T[] | null;
  message: string;
};
