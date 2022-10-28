export const downloadBlob = (name: string, blob: Blob) => {
  // if ((window.navigator as any).standalone) {
  //   if ((window.navigator as any).share) {
  //     navigator.share({
  //  only suffix = .csv && type = text/csv for config file is accepted for browser
  //       files: [new File([blob], name + ".csv", { type: "text/csv" })],
  //       title: name,
  //     });
  //     return;
  //   }
  // }
  const a = document.createElement("a");
  a.target = "_blank";
  a.download = name;
  a.href = URL.createObjectURL(blob);
  a.click();
};
