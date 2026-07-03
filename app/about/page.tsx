"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  // On desktop the photo matches the paragraphs' height exactly. We measure the
  // text block and size the image from it (native ratio is 3:4, so no cropping).
  const [imgSize, setImgSize] = useState<{ height: number; width: number } | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (mq.matches) {
        const height = el.offsetHeight;
        setImgSize((prev) =>
          prev && prev.height === height ? prev : { height, width: (height * 3) / 4 }
        );
      } else {
        setImgSize((prev) => (prev === null ? prev : null));
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    mq.addEventListener("change", update);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16 roboto text-sm font-medium text-[#1a1a1a]"
      style={{ backgroundColor: "#f8f6f1" }}
    >
      <div className="w-full max-w-3xl lg:max-w-none lg:w-fit flex flex-col gap-10">
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 lg:gap-10">
          {/* Photo — same height as the paragraphs on desktop */}
          <div
            className="relative shrink-0 w-full aspect-[3/4] lg:aspect-auto shadow-2xl"
            style={imgSize ?? undefined}
          >
            <Image
              src="/me.jpg"
              alt="Marius Frohnhofen"
              fill
              sizes="(max-width: 768px) 176px, 300px"
              className="object-cover"
              priority
            />
          </div>

          {/* Paragraphs, stacked */}
          <div ref={textRef} className="w-full md:w-[24rem] md:flex-none flex flex-col gap-6 leading-relaxed">
            <p>
              I build things end to end. My days move between kicking off new
              ideas, building them out, running them once they&apos;re live, and
              figuring out how to get them in front of the right people. Over the
              years that&apos;s spanned the full stack, from large community
              platforms used by hundreds of thousands to smaller tools made to
              solve one specific problem really well. What keeps me interested
              isn&apos;t code that looks good in a repo, but products that
              actually make it into the world and get used by real people.
            </p>
            <p>
              Most of my work happens through 248 Studios, a venture studio I
              founded together with Patrick and Luis. It&apos;s our home for
              building digital products we genuinely stand behind - small,
              focused teams, real problems, and models that can sustain
              themselves on their own terms. I care less about chasing trends and
              more about making things that are useful, that last, and that are
              enjoyable to build.
            </p>
          </div>
        </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 self-center roboto text-sm font-medium text-[#1a1a1a] transition-colors"
          >
              &larr; Go Back
          </Link>
      </div>
    </main>
  );
}
