"use server";

import { searchApi } from "@/api/search.api";
import type { SearchData } from "@/types/search.types";

export async function searchAction(query: string): Promise<SearchData> {
  return await searchApi(query);
}
