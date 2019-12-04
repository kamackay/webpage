export const downloadBlob = (url: string) =>
  fetch(url)
    .then(r => r.blob())
    .then(
      blob =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export const randomInt = (low: number, high: number): number =>
  Math.floor(Math.random() * (high - low + 1) + low);

export function remove<T>(list: T[], item: T): T[] {
  const tempList = [...list];
  for (let i = 0; i < tempList.length; i++) {
    if (tempList[i] === item) {
      tempList.splice(i, 1);
    }
  }
  return tempList;
}
