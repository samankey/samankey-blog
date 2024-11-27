import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export const PostContent = ({ post, content }: { post: any; content: any }) => {
  return (
    <article className="mb-32">
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
      />
      <PostBody content={content} />
    </article>
  );
};
