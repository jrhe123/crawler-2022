import superagent from "superagent";

class Crawler {
  private secret = "this is my super secret";
  private url = "https://laminasolutions.com/services";
  private rawHtml = "";

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.rawHtml = result.text;
  }

  constructor() {
    this.getRawHtml();
  }
}

const crawler = new Crawler();
