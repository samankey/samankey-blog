import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { postsDirectory } from "@/lib/api";

const updatePostDate = (filePath: string): void => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const stats = fs.statSync(filePath);
    const fileModTime = stats.mtime.toISOString();

    // update the date in frontmatter
    data.date = fileModTime;

    // stringify the updated frontmatter and content
    const updatedFileContents = matter.stringify(content, data);

    // write the updated contents back to the file
    fs.writeFileSync(filePath, updatedFileContents);
    console.log(`Updated date in ${filePath} to ${fileModTime}`);
  } catch (error) {
    console.log(`Error processing ${filePath}: ${error}`);
  }
};

const updateAllPosts = (): void => {
  const slugs = fs.readdirSync(postsDirectory);
  slugs.forEach((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    if (path.extname(fullPath) === ".md") {
      updatePostDate(fullPath);
    }
  });
};

updateAllPosts();
