import { z } from "zod";

export const paginationSchema = z.object({
  current_page: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  total_pages: z.number(),
  total_elements: z.number(),
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    data: z.array(dataSchema),
    pagination: paginationSchema,
  });

export type Pagination = z.infer<typeof paginationSchema>;
export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};
