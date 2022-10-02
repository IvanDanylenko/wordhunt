import { ResourceProps } from '@wordhunt/admin-core';
import { WordList } from './WordList';

export default {
  list: WordList,
} as Omit<ResourceProps, 'name'>;
