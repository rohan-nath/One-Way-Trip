export const extractStartTime = (stime) => {
  return stime.split(" - ")[0];
};

export const firstLetterCapitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

