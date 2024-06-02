export function encodeFileToBase64(file: File | undefined) {
  const reader = new FileReader();

  if (!file) throw new Error('File is required');

  return new Promise<string>((resolve) => {
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') resolve(event.target.result);
    };

    reader.readAsDataURL(file);
  });
}
