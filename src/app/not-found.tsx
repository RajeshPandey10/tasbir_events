import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Flourish from "@/components/ui/Flourish";
import FullBleedImage from "@/components/ui/FullBleedImage";
import { PAGE_IMAGES } from "@/lib/stockImages";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <FullBleedImage
            src={PAGE_IMAGES.gallery}
            alt="Elegant wedding reception decoration"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-ink/70" />

          <Container className="relative z-10 flex flex-col items-center gap-6 py-32 text-center">
            <Flourish align="center" />
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">Error 404</p>
            <h1 className="font-display text-4xl text-white md:text-5xl">This page hasn&apos;t been decorated yet.</h1>
            <p className="max-w-md text-white/80">
              The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to
              something beautiful.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <Button href="/" size="lg">
                Back to home
              </Button>
              <Button href="/gallery" variant="outline" size="lg" className="text-white">
                View our work
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
