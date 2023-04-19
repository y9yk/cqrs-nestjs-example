// simple utilities
// future work
// if there are many funcs in here, then must be modulized.

import { v4 as uuidv4 } from 'uuid';

export const generateUid = (): string => {
  return uuidv4();
};
