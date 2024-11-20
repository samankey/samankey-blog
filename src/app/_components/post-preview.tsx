import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, coverImage, date, excerpt, slug }: Props) {
  return (
    <div className="group">
      <Link href={`/posts/${slug}`}>
        <div className="mb-5 relative w-full aspect-video overflow-hidden rounded-2xl">
          <CoverImage
            title={title}
            src={coverImage}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>
        <div className="text-lg mb-4 text-zinc-500">
          <DateFormatter dateString={date} />
        </div>
        <h3 className="text-3xl mb-3 leading-snug">{title}</h3>
        <p className="text-lg leading-relaxed mb-4 text-zinc-600 dark:text-zinc-400">
          {excerpt}
        </p>
      </Link>
    </div>
  );
}
