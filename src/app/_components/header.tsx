import Link from "next/link";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex justify-between items-center">
      <Link href="/" className="hover:underline">
        samankey
      </Link>
      <ThemeSwitcher />
    </h2>
  );
};

export default Header;
