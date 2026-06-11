export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const getDayName = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
