import { ResourceProps } from '@wordhunt/admin-core';
import { WordCreate } from './WordCreate';
import { WordEdit } from './WordEdit';
import { WordList } from './WordList';

export default {
  list: WordList,
  create: WordCreate,
  edit: WordEdit,
} as Omit<ResourceProps, 'name'>;
