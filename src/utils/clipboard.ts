export const writeToClipboard = async (text: string) =>
  navigator.clipboard.writeText(text);
