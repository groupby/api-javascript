export const rayify = <T>(arr: T | T[]): T[] => Array.isArray(arr) ? arr : [arr];
