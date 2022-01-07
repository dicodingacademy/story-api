export const getLastPathInUrl = (url: string) => {
  const urlParts = url.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  const lastPartParts = lastPart.split('?');
  return lastPartParts[0];
};
