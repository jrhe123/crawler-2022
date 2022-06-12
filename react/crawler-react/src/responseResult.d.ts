declare namespace responseResult {
  interface Item {
    title: string;
    count: number;
  }

  interface Data {
    [key: string]: Item[];
  }

  //
  export type index = string;
  export type isLogin = boolean;
  export type login = boolean;
  export type logout = boolean;
  //
  export type getData = boolean;
  export type showData = Data | boolean;
}
