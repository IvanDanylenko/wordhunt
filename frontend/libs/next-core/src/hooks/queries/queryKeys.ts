export const wordKeys = {
  all: ['word'] as const,
  lists: () => [...wordKeys.all, 'list'] as const,
  list: (params: unknown) => [...wordKeys.lists(), params] as const,
  details: () => [...wordKeys.all, 'detail'],
  detail: (id: string) => [...wordKeys.details(), id || null],
};
