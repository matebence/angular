export class DataService {
  getDetails(): Promise<String> {
    const resultPromise = new Promise<String>((resolve, reject) => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    });
    return resultPromise;
  }
}
