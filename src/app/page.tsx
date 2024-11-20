import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts;

  return (
    <main>
      <Container>
        <Intro />
        {morePosts.length > 0 ? (
          <MoreStories posts={morePosts} />
        ) : (
          <p className="text-base flex justify-center p-4">포스트가 없어요</p>
        )}
      </Container>
    </main>
  );
}
