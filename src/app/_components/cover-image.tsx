import cn from "classnames";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  className?: string;
};

const CoverImage = ({ title, src, className }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full", className)}
      width={1300}
      height={630}
    />
  );
  return <div className="sm:mx-0">{image}</div>;
};

export default CoverImage;
