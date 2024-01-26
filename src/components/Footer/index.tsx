import { Container } from "../Container";

export function Footer() {
  return (
    <Container>
      <footer className="absolute bottom-0 py-10">
        <div className="flex flex-col lg:flex-row justify-between">
          <p className="text-sm/normal text-center sm:text-start font-semibold text-blue-950">
            TODO LIST © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </Container>
  );
}
