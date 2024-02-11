export type Variants = 'info' | 'success' | 'warning' | 'error'
export type NestCommonRes = {
  message: string;
  type: Variants;
  status: boolean;
}