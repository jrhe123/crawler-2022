import fs from "fs";
import cheerio from "cheerio";

import { IAnalyzer } from "./crawler";

export interface Course {
  title: string;
  count: number;
}

export interface CourseResult {
  time: number;
  data: Course[];
}

export interface Content {
  [propName: number]: Course[];
}

class Analyzer implements IAnalyzer {
  private static instance: Analyzer;

  private getTargetInfo(html: string) {
    const courses: Course[] = [];
    // cheerio jquery search
    const $ = cheerio.load(html);
    // get target items
    const courseItems = $(".et_pb_text_inner");
    courseItems.map((_, element) => {
      const course = $(element).find("li");
      const title = course.eq(0).text();
      const count = Math.floor(Math.random() * 50);
      if (title !== "") {
        courses.push({
          title,
          count,
        });
      }
    });
    return {
      time: new Date().getTime(),
      data: courses,
    };
  }

  private generateJsonContent(courses: CourseResult, filePath: string) {
    let fileContent: Content = {};
    // load existing content
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courses.time] = courses.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const items = this.getTargetInfo(html);
    const fileContent = this.generateJsonContent(items, filePath);
    return JSON.stringify(fileContent);
  }

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Analyzer();
    }
    return this.instance;
  }
}

export default Analyzer;
