import fs from "fs";
import superagent from "superagent";

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

export default Crawler;
