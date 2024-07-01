const stringToEnum = <T extends Record<string, string>>(enumObj: T, value: string): T[keyof T] => {
  if (Object.values(enumObj).includes(value as T[keyof T])) {
    return value as T[keyof T];
  }
  throw new Error(`Invalid value ${value} for enum ${JSON.stringify(enumObj)}`);
};

export const stringArrayToEnum = <T extends Record<string, string>>(enumObj: T, values: string[]): (T[keyof T] )[] => {
  return values
    .map(value => stringToEnum(enumObj, value))
    .filter((enumValue): enumValue is T[keyof T] => enumValue !== null);
}