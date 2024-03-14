export const sleep = (ms: number, fail: boolean = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!fail) {
        resolve(undefined);
      } else {
        reject(new Error('Sleep failed'));
      }
    }, ms);
  });
