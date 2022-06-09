"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.prototype.getTargetInfo = function (html) {
        var courses = [];
        // cheerio jquery search
        var $ = cheerio_1.default.load(html);
        // get target items
        var courseItems = $(".et_pb_text_inner");
        courseItems.map(function (_, element) {
            var course = $(element).find("li");
            var title = course.eq(0).text();
            var count = Math.floor(Math.random() * 50);
            if (title !== "") {
                courses.push({
                    title: title,
                    count: count,
                });
            }
        });
        return {
            time: new Date().getTime(),
            data: courses,
        };
    };
    Analyzer.prototype.generateJsonContent = function (courses, filePath) {
        var fileContent = {};
        // load existing content
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[courses.time] = courses.data;
        return fileContent;
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var items = this.getTargetInfo(html);
        var fileContent = this.generateJsonContent(items, filePath);
        return JSON.stringify(fileContent);
    };
    Analyzer.getInstance = function () {
        if (!this.instance) {
            this.instance = new Analyzer();
        }
        return this.instance;
    };
    return Analyzer;
}());
exports.default = Analyzer;
