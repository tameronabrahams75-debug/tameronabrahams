import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none
      prose-headings:font-display prose-headings:tracking-tight
      prose-h2:text-base prose-h2:mt-4 prose-h2:mb-2
      prose-p:my-2 prose-li:my-0.5
      prose-strong:text-foreground prose-a:text-primary">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
