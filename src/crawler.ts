import fs from "fs";
import path from "path";
import superagent from "superagent";
import cheerio from "cheerio";

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crawler {
  private secret = "this is my super secret";
  private url = `https://laminasolutions.com/services?secure=${this.secret}`;
  private filePath = path.resolve(__dirname, "../data/course.json");

  getServiceInfo(rawHtml: string) {
    const courseInfos: Course[] = [];
    // cheerio
    const $ = cheerio.load(rawHtml);
    // get target items
    const serviceItems = $(".et_pb_text_inner");
    serviceItems.map((_, element) => {
      const service = $(element).find("li");
      const title = service.eq(0).text();
      const count = Math.floor(Math.random() * 50);
      if (title !== "") {
        courseInfos.push({
          title,
          count,
        });
      }
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  generateJsonContent(courses: CourseResult) {
    let fileContent: Content = {};
    // load existing content
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    fileContent[courses.time] = courses.data;
    return fileContent;
  }

  writeFile(fileContent: Content) {
    // save back
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent));
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const services = this.getServiceInfo(html);
    const fileContent = this.generateJsonContent(services);
    this.writeFile(fileContent);
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const crawler = new Crawler();
