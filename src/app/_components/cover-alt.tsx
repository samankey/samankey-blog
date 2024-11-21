import cn from "classnames";
import Image from "next/image";

type Props = {
  coverAlt?: string;
  className?: string;
};

const CoverImage = ({ coverAlt, className }: Props) => {
  return (
    <div className="sm:mx-0 flex justify-center items-center h-full text-4xl px-4 text-zinc-200 bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-800">
      {coverAlt}
    </div>
  );
};

export default CoverImage;
