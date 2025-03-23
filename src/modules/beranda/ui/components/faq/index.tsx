import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FAQ } from "@/modules/shared/data/faq";
import Link from "next/link";

const Faq = () => {
  return (
    <div className="w-full py-8 px-8 md:px-8 bg-zinc-100  flex flex-col gap-2 items-center justify-center border-t border-zinc-200">
      <h1 className="text-3xl font-bold z-20 text-center">
        FAQ / Tanya Jawab Umum
      </h1>
      <div className="flex flex-col w-full h-auto items-stretch  justify-between  gap-2 px-2">
        <Accordion type="single" collapsible>
          {FAQ.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">
                {faq.pertanyaan}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 gap-1 flex flex-col">
                <div>
                  <span className="text-base">{faq.jawaban}</span>
                </div>
                {faq.url && (
                  <Link
                    href={faq.url}
                    target="_blank"
                    className="text-blue-500 mt-2 underline"
                  >
                    {faq.linkText || "Baca Selengkapnya"}
                  </Link>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
