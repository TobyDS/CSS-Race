import type { FallbackProps } from 'react-error-boundary';

export default function ErrorBoundaryFallbackBasic ({ error }: FallbackProps) {
  return (
    <>
      <h1>Something went wrong</h1>
      <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
        {error.message}
      </pre>
    </>
  );
}
