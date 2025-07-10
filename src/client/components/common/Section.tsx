interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Section({ children, ...props }: SectionProps) {
  return <section {...props}>{children}</section>;
}
