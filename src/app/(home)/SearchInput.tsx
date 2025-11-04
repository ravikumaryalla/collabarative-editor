import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon, SearchIcon, XIcon } from "lucide-react";
import { useSearchParams } from "../../hooks/use-search-params";
import React, { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { api } from "../../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { SiGoogledocs } from "react-icons/si";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [openPopover, setOpenPopover] = useState(false);
  const [search, setsearch] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // ✅ Only runs when searchQuery is set (after submit)
  const { results, loadMore, status } = usePaginatedQuery(
    api.document.getDocuments,
    search ? { search: search } : "skip", // skip query when empty
    { initialNumItems: 5 }
  );
  console.log(results, "results");

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setsearch(value);

    setOpenPopover(true);
    setValue("");
    // inputRef.current?.blur();
  };
  return (
    <div className="flex justify-center w-full items-center">
      <div className="relative w-full max-w-[700px] min-w-[500px] w-650px ">
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute left-1.5 top-0.5 rounded-full bg-transparent hover:bg-[#dfe8f5]"
          >
            <SearchIcon size={18} />
          </Button>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverAnchor asChild>
              <Input
                value={value}
                ref={inputRef}
                onChange={handleInputchange}
                placeholder="Search"
                className="md:text-base placeholder:text-neutral-800 border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] max-w-[650px] w-full px-12 rounded-full bg-[#f0f4f9] h-10 focus-visible:ring-0 focus:bg-white"
              />
            </PopoverAnchor>

            <PopoverContent className="w-full max-w-[700px] min-w-[650px] p-1 rounded-xl">
              <div className="w-full bg-[#f0f4f9] rounded flex flex-col gap-2 ">
                {status === "loading" ? (
                  <LoaderIcon className="size-4 animate-spin" />
                ) : results.length > 0 ? (
                  results.map((doc, index) => (
                    <div
                      key={doc._id}
                      className="flex flex-col gap-2 items-center justify-between py-2 px-4 hover:bg-[#dfe8f5] cursor-pointer rounded-xl"
                      onClick={() => {
                        setOpenPopover(false);
                        window.open(`/documents/${doc._id}`, "_blank");
                      }}
                    >
                      <div className="w-full flex gap-2">
                        <SiGoogledocs className="fill-blue-500 size-6" />

                        <div>{doc.title}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-2 px-4 hover:bg-[#dfe8f5] cursor-pointer">
                    <div>No results found</div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-14 top-0.5 rounded-full bg-transparent hover:bg-[#dfe8f5] "
              onClick={handleClear}
            >
              <XIcon size={18} />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
