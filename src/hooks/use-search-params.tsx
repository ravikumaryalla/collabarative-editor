import { parseAsString, useQueryState } from "nuqs";

export const useSearchParams = (key: string) => {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );
};
