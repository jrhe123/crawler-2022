declare namespace responseResult {
  interface Item {
    title: string;
    count: number;
  }

  interface Data {
    [key: string]: Item[];
  }

  //
  type index = string;
  type isLogin = boolean;
  type login = boolean;
  type logout = boolean;
  //
  type getData = boolean;
  type showData = Data | boolean;
}
