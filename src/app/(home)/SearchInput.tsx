import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearchParams } from "../../hooks/use-search-params";
import React, { useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState("");

  const [search, setSearch] = useSearchParams("search");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
    setSearch("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    setValue("");
    inputRef.current?.blur();
  };
  return (
    <div className="flex justify-center w-full items-center">
      <div className="relative w-full max-w-[700px] min-w-[500px]">
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute left-1.5 top-0.5 rounded-full bg-transparent hover:bg-[#dfe8f5]"
          >
            <SearchIcon size={18} />
          </Button>
          <Input
            value={value}
            ref={inputRef}
            onChange={handleInputchange}
            placeholder="Search"
            className="md:text-base placeholder:text-neutral-800 border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] max-w-[650px] w-full px-12 rounded-full bg-[#f0f4f9] h-10 focus-visible:ring-0 focus:bg-white"
          />
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
