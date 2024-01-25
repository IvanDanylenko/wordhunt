export const wordKeys = {
  all: ['word'] as const,
  lists: () => [...wordKeys.all, 'list'] as const,
  list: (params: unknown) => [...wordKeys.lists(), params] as const,
  details: () => [...wordKeys.all, 'detail'] as const,
  detail: (id: string) => [...wordKeys.details(), id || null] as const,
};

export const chineseSuggestionsKeys = {
  all: ['chineseSuggestions'] as const,
  lists: () => [...chineseSuggestionsKeys.all, 'list'] as const,
  list: (params: unknown) => [...chineseSuggestionsKeys.lists(), params] as const,
  details: () => [...chineseSuggestionsKeys.all, 'detail'] as const,
  detail: (id: string) => [...chineseSuggestionsKeys.details(), id || null] as const,
};
