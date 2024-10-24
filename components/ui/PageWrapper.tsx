export const PageWrapper = ({ className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex gap-4 xl:max-w-wrapper min-w-0 xl:mx-auto mx-4 xl:w-full w-auto ${className}`} {...rest} />
);
