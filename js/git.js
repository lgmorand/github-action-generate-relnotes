"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommits = exports.getLastTag = void 0;
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
/**
 * Finds the last tag in history
 */
function getLastTag() {
    return __awaiter(this, void 0, void 0, function* () {
        let lastTag = "";
        const options = {
            listeners: {
                stdout: (data) => {
                    lastTag += data.toString().trim();
                }
            },
            silent: true,
            ignoreReturnCode: true
        };
        yield exec.exec('git', ['describe',
            '--abbrev=0',
            '--tags'], options);
        if (lastTag == null || lastTag == '') {
            core.setFailed(`No tag has been found`);
        }
        core.debug(`The last tag is ${lastTag}`);
        return lastTag;
    });
}
exports.getLastTag = getLastTag;
/**
 * List all commit messages since last tag
 */
function getCommits(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        let messages = '';
        let tagFilter = tag + '..HEAD';
        const options = {
            listeners: {
                stdout: (data) => {
                    messages += data.toString();
                }
            },
            silent: true,
            ignoreReturnCode: true
        };
        yield exec.exec('git', ['log',
            tagFilter,
            '--oneline',
            '--pretty=format:"%s"'], options);
        core.debug(`The commit messages are ${messages}`);
        if (messages == null || messages == '') {
            core.warning(`No messages have been found`);
            messages = 'N/A';
        }
        return messages;
    });
}
exports.getCommits = getCommits;
