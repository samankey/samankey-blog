import fs from "fs";
import matter from "gray-matter";
import path, { join } from "path";

export const postsDirectory = join(process.cwd(), "_posts");

const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    Math.floor(date1.getTime() / 1000) === Math.floor(date2.getTime() / 1000)
  );
};

const updateDateInFrontmatter = (
  filePath: string,
  content: string,
  data: Record<string, any>,
  dateField: string,
  newDate: string
): void => {
  data[dateField] = newDate;
  const updatedFileContents = matter.stringify(content, data);

  if (updatedFileContents !== fs.readFileSync(filePath, "utf8")) {
    fs.writeFileSync(filePath, updatedFileContents);
    console.log(`Updated ${dateField} in ${filePath} to ${newDate}`);
  } else {
    console.log(`No changes needed for ${dateField} in ${filePath}`);
  }
};

const updatePostDate = (filePath: string): void => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = fs.statSync(filePath);

    const dates = [
      { field: "createDate", stat: stats.birthtime },
      { field: "date", stat: stats.mtime },
    ];

    dates.forEach(({ field, stat }) => {
      if (!data[field] || !isSameDate(new Date(data[field]), stat)) {
        updateDateInFrontmatter(
          filePath,
          content,
          data,
          field,
          stat.toISOString()
        );
      } else {
        console.log(`${field} already up to date in ${filePath}`);
      }
    });
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
