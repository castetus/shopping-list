import { StateInterface } from './index';

type Payload = StateInterface[keyof StateInterface];

export default class Api {
  key = 'shop_list';

  write(content: string, data: Payload): boolean {
    const ls = JSON.stringify(data);
    try {
      localStorage.setItem(`${this.key}-${content}`, ls);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  read(content: string): StateInterface | null {
    try {
      const ls = localStorage.getItem(`${this.key}-${content}`);
      if (ls) {
        return JSON.parse(ls);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
