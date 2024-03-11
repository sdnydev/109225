export const spreadSearchParams = (params?: URLSearchParams) => {
  if (!params) return {};

  const obj: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
};
