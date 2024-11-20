import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="w-full">
      <div
        className={(markdownStyles["markdown"], "prose max-w-none")}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
