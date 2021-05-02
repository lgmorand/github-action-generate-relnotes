"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toList = void 0;
function toList(text) {
    return text
        .split('\n')
        .map(line => (line ? `- ${line}` : ''))
        .join('\n');
}
exports.toList = toList;
