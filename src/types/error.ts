export interface AuthError extends Error {
  status?: number;
  code?: string;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof Error;
}

export function getErrorMessage(error: unknown): string {
  if (isAuthError(error)) {
    return error.message;
  }
  return 'An unexpected error occurred';
} 