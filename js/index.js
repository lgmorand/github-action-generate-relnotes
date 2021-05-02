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
exports.start = void 0;
const core = __importStar(require("@actions/core"));
const git = __importStar(require("./git"));
const release = __importStar(require("./release"));
const text = __importStar(require("./text"));
const io = __importStar(require("./io"));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // retrieving parameters
            const token = core.getInput("githubToken");
            const newTag = core.getInput("newTag");
            const isChangeLogEnabled = core.getInput("generateArtifact");
            core.debug("Token: ${token}");
            core.debug("Tag: ${newTag}");
            core.debug("Generate changelog: ${isChangeLogEnabled}");
            // retrieving tag
            const tag = yield git.getLastTag();
            // retrieving history message
            if (tag != '') {
                const messages = yield git.getCommits(tag);
                const releaseNotes = text.toList(messages);
                core.debug("Releases notes: ${releaseNotes}");
                // create release
                release.createReleaseDraft(newTag, token, releaseNotes);
                if (isChangeLogEnabled) {
                    io.writeOutput("changelog.txt", releaseNotes);
                }
                // set output variable 
                core.setOutput("relnotes", releaseNotes);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
exports.start = start;
start();
