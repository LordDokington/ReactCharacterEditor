export const loadFileAsText = (file: File, afterLoading: (e: Event) => void) => {
  if (!file) return;

  let reader = new FileReader();
  // add function that happens after loading
  reader.onload = afterLoading;

  // actually read the text)
  reader.readAsText(file);
};

export const loadFileAsData = (file: File, afterLoading: (e: Event) => void) => {
  if (!file) return;

  let reader = new FileReader();
  // add function that happens after loading
  reader.onload = afterLoading;

  // actually read the text)
  reader.readAsDataURL(file);
};