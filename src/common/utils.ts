// simple utilities
// future work
// if there are many funcs in here, then must be modulized.

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment-timezone';
moment.tz.setDefault('Asia/Seoul');

export const generateUid = (): string => {
  return uuidv4();
};

export const getHashedPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const isSamePassword = async (
  password: string,
  hashed: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};

export const getCurrentTime = (): string => {
  return moment().format('YYYYMMDDHHmmSS');
};
