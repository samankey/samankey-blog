import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="pb-14 items-center">
          <h3 className="w-full text-m text-zinc-500 tracking-tighter leading-tight text-center mb-10 lg:mb-0">
            Statically Generated with Next.js.
          </h3>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
