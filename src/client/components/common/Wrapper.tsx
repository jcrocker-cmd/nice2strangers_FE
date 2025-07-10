interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function Wrapper({ children, ...props }: WrapperProps) {
  return <section {...props}>{children}</section>;
}
