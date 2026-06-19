export function OnnePlaceholder({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <span className={`onne-placeholder onne-placeholder-${size}`} aria-label="Logo placeholder Onne">O</span>;
}
