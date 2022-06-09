import fs from "fs";
import path from "path";
import superagent from "superagent";
import Analyzer from "./analyzer";

export interface IAnalyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crawler {
  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(
    private url: string,
    private analyzer: IAnalyzer,
    private filePath: string
  ) {
    this.initSpiderProcess();
  }
}

//
const secret = "this is my super secret";
const url = `https://laminasolutions.com/services?secure=${secret}`;
const analyzer = new Analyzer();
const crawler = new Crawler(
  url,
  analyzer,
  path.resolve(__dirname, "../data/course.json")
);
