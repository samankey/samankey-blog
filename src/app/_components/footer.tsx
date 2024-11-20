import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="pb-14 items-center">
          <h3 className="text-m text-zinc-500 tracking-tighter leading-tight text-center mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js.
          </h3>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
