import { ObjectT } from '../types/common';

export const isEmptyObj = (inputObj?: ObjectT): boolean => {
  return !inputObj || Object.keys(inputObj).length == 0;
};

export const isEmptyStr = (inputStr?: string): boolean => {
  return !inputStr || inputStr.length == 0;
};
