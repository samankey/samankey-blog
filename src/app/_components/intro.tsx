import Link from "next/link";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import { RiArrowRightUpLine } from "react-icons/ri";

export function Intro() {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between mt-16 mb-16 lg:mb-12">
      <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        samankey
      </h1>
      <ul className="flex gap-4 place-items-center text-xl md:text-3xl mt-4">
        <li>
          <Link href="/" className="hover:underline">
            post
          </Link>
        </li>
        <li>
          <Link href="resume" className="hover:underline">
            resume
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/samankey"
            target="_blank"
            className="hover:underline flex gap-0.5 items-center"
          >
            github
            <RiArrowRightUpLine />
          </Link>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>
    </section>
  );
}
