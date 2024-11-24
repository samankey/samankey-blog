import markdownStyles from "./markdown-styles.module.css";
import { optimizeImage } from "@/lib/optimizeImage";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  const optimizedContent = optimizeImage(content);

  return (
    <div className="w-full">
      <div
        className={`${markdownStyles.markdown} prose dark:prose-invert max-w-none`}
        dangerouslySetInnerHTML={{ __html: optimizedContent }}
      />
    </div>
  );
}
