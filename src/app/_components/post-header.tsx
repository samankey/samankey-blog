import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type Props = {
  title: string;
  coverImage?: string;
  date: string;
};

export function PostHeader({ title, coverImage, date }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12"></div>
      <div className="w-full">
        <div className="block md:hidden mb-6"></div>
        <div className="mb-6 text-lg text-zinc-500">
          <DateFormatter dateString={date} />
        </div>
      </div>
      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0 relative w-full aspect-video">
          <CoverImage
            title={title}
            src={coverImage}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}
    </>
  );
}
