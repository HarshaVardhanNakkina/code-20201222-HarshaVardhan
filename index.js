"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSVFile = void 0;
var fs_1 = require("fs");
var parse = require('csv-parse');
/** Represents a custom error
 * @extends Error
 */
var EmptyFilePath = /** @class */ (function (_super) {
    __extends(EmptyFilePath, _super);
    /**
     * Creates a custom error: EmptyFilePath
     * @param {string} message - error message to be displayed
     */
    function EmptyFilePath(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, EmptyFilePath.prototype);
        return _this;
    }
    return EmptyFilePath;
}(Error));
/**
 * parses a csv file
 * @param {string} filePath - relative / absolute path of a file to be parsed
 * @param {Object} options - these options are provided by csv-parse package, please refer {@link https://csv.js.org/parse/options/}
 * @returns { Promise } - returns parsed data in JSON-like/Object form or as an array of strings (depends on the options passed)
 */
function parseCSVFile(filePath, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var stream, parser, output, byteCount;
        return __generator(this, function (_a) {
            // throw an exception if the filepath is empty
            if (filePath.length === 0)
                reject(new EmptyFilePath('Empty file path.'));
            stream = fs_1.createReadStream(filePath);
            parser = parse(options) // create parser
            ;
            output = [];
            byteCount = 0;
            stream.on('data', function (chunk) {
                byteCount += Buffer.byteLength(chunk);
                parser.write(chunk); // feed the stream into the parser
            });
            parser.on('readable', function () {
                var record;
                while ((record = parser.read())) {
                    output.push(record); // collect each record into output array.
                }
            });
            parser.on('end', function () {
                var _a = parser.info, lines = _a.lines, records = _a.records;
                // return the output + metadata
                resolve({
                    output: output,
                    lines: lines,
                    records: records,
                    byteCount: byteCount
                });
            });
            stream.on('end', function () {
                // close the parser
                parser.end();
            });
            parser.on('error', function (error) {
                reject(error);
            });
            stream.on('error', function (error) {
                reject(error);
            });
            return [2 /*return*/];
        });
    }); });
}
exports.parseCSVFile = parseCSVFile;
