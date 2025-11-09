"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/FullScreenLoader";

const templates = [
  {
    id: 1,
    label: "Blank Document",
    imgUrl: "/blank-document.svg",
  },
  {
    id: 2,
    label: "Business Letter",
    imgUrl: "/business-letter.svg",
  },
  {
    id: 3,
    label: "Cover Letter",
    imgUrl: "/cover-letter.svg",
  },
  {
    id: 4,
    label: "Letter",
    imgUrl: "/letter.svg",
  },
  {
    id: 5,
    label: "Resume",
    imgUrl: "/resume.svg",
  },
  {
    id: 6,
    label: "Software Proposal",
    imgUrl: "/software-proposal.svg",
  },
];

const TemplateGallery = () => {
  const router = useRouter();
  const { results, loadMore, status } = usePaginatedQuery(
    api.document.getDocuments,
    {},
    { initialNumItems: 3 }
  );
  const [isCreating, setIsCreating] = useState(false);
  console.log(results, "results");

  const createDocument = useMutation(api.document.createDocument);

  const handleTemplateClick = (
    title: string,
    initialContent: string | undefined
  ) => {
    setIsCreating(true);
    createDocument({
      title,
      initialContent,
    }).then((data) => {
      router.push(`/documents/${data}`);
    });
  };

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-2  px-4 py-2 h-full ">
      {isCreating && <FullScreenLoader />}
      <h1>Start a new document</h1>
      <Carousel>
        <CarouselContent>
          {templates.map((template) => {
            return (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.28%] "
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2",
                    isCreating && "pointer-events-none"
                  )}
                >
                  <button
                    onClick={() =>
                      handleTemplateClick(template.label, undefined)
                    }
                    style={{
                      backgroundImage: `url('${template.imgUrl}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "170px",
                      height: "200px",
                      opacity: isCreating ? 0.5 : 1,
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border bg-white"
                  ></button>
                  <p className="text-sm font-medium truncate pl-3">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default TemplateGallery;
