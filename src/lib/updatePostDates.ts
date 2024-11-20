import fs from "fs";
import matter from "gray-matter";
import path, { join } from "path";

export const postsDirectory = join(process.cwd(), "_posts");

const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    Math.floor(date1.getTime() / 1000) === Math.floor(date2.getTime() / 1000)
  );
};

const updatePostDate = (filePath: string): void => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const stats = fs.statSync(filePath);
    const fileModTime = stats.mtime.toISOString();

    // 프론트매터의 date와 파일의 실제 수정 시간을 비교
    console.log(new Date(data.date).toISOString(), stats.mtime.toISOString());
    if (!data.date || !isSameDate(new Date(data.date), stats.mtime)) {
      const copy = JSON.parse(JSON.stringify(data));
      copy.date = fileModTime;
      const updatedFileContents = matter.stringify(content, copy);

      // 파일 내용이 실제로 변경되었는지 확인
      if (updatedFileContents !== fileContents) {
        fs.writeFileSync(filePath, updatedFileContents);
        // console.log(`Updated date in ${filePath} to ${fileModTime}`);
      } else {
        console.log(`No changes needed in ${filePath}`);
      }
    } else {
      console.log(`Date already up to date in ${filePath}`);
    }
  } catch (error) {
    console.log(`Error processing ${filePath}: ${error}`);
  }
};

export const updateAllPosts = (): void => {
  const slugs = fs.readdirSync(postsDirectory);
  slugs.forEach((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    if (path.extname(fullPath) === ".md") {
      updatePostDate(fullPath);
    }
  });
};

updateAllPosts();
