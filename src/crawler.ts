import superagent from "superagent";
import cheerio from "cheerio";

interface Course {
  title: string;
  count: number;
}

class Crawler {
  private secret = "this is my super secret";
  private url = "https://laminasolutions.com/services";

  getServiceInfo(rawHtml: string) {
    const courseInfos: Course[] = [];

    const $ = cheerio.load(rawHtml);
    const serviceItems = $(".et_pb_text_inner");

    serviceItems.map((_, element) => {
      const service = $(element).find("li");
      const title = service.eq(0).text();
      const count = Math.floor(Math.random() * 50);
      courseInfos.push({
        title,
        count,
      });
    });

    const result = {
      time: new Date().getTime(),
      data: courseInfos,
    };
    console.log("result: ", result);
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.getServiceInfo(result.text);
  }

  constructor() {
    this.getRawHtml();
  }
}

const crawler = new Crawler();
