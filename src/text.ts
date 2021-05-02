
export function toList(text: string): string {
    return text
      .split('\n')
      .map(line => (line ? `- ${line}` : ''))
      .join('\n')
}