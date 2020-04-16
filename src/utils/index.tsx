import axios from "axios";

export const downloadBlob = (url: string) =>
  fetch(url)
    .then((r) => r.blob())
    .then(
      (blob) =>
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

export const getCurrentIp = () =>
  new Promise<string>((resolve) => {
    axios
      .get(`https://www.cloudflare.com/cdn-cgi/trace`)
      .then((r) => r.data)
      .then((data: string) => {
        const lines = data.split(`\n`).filter((s) => s.startsWith(`ip=`));
        if (lines.length > 0) {
          const line = lines[0];
          const parts = line.split(`=`);
          if (parts.length === 2) {
            resolve(parts[1]);
          } else {
            console.log(`Could not get ip from ${line}, ${parts}`);
            resolve(undefined);
          }
        } else {
          console.warn(`Could not find IP line in ${data}`);
          resolve(undefined);
        }
      })
      .catch((e) => {
        console.error(e);
        resolve(undefined);
      });
  });
