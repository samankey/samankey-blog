import rehypePrettyCode from "rehype-pretty-code";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      // 다른 옵션들을 여기에 추가할 수 있습니다.
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
