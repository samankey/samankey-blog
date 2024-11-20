import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import path, { join } from "path";

export const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .filter((v) => v.published);
  return posts;
}

// export const updatePostDate = (filePath: string): void => {
//   try {
//     const fileContents = fs.readFileSync(filePath, "utf8");
//     const { data, content } = matter(fileContents);

//     const stats = fs.statSync(filePath);
//     const fileModTime = stats.mtime.toISOString();

//     // update the date in frontmatter
//     data.date = fileModTime;

//     // stringify the updated frontmatter and content
//     const updatedFileContents = matter.stringify(content, data);

//     // write the updated contents back to the file
//     fs.writeFileSync(filePath, updatedFileContents);
//     console.log(`Updated date in ${filePath} to ${fileModTime}`);
//   } catch (error) {
//     console.log(`Error processing ${filePath}: ${error}`);
//   }
// };

// export const updateAllPosts = (): void => {
//   const slugs = fs.readdirSync(postsDirectory);
//   slugs.forEach((slug) => {
//     const fullPath = path.join(postsDirectory, slug);
//     if (path.extname(fullPath) === ".md") {
//       updatePostDate(fullPath);
//     }
//   });
// };
