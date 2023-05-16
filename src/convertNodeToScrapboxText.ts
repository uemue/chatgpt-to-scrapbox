// convert a element to a Scrapbox text. This function walks through the element and its children recursively.
export function convertNodeToScrapboxText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent?.trim() || '';
  } else if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const element = node as Element;
  let childContent = '';

  switch (element.tagName) {
    case 'H1':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[****** ${childContent}]\n`;
      case 'H2':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[***** ${childContent}]\n`;
      case 'H3':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[**** ${childContent}]\n`;
      case 'H4':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[*** ${childContent}]\n`;
      case 'H5':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[** ${childContent}]\n`;
      case 'H6':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[* ${childContent}]\n`;
      case 'P':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `${childContent}\n`;
      case 'IMG':
      return `[${element.getAttribute('src')}]\n`;
    case 'UL':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child);
      }
      const ulLines = childContent.trimEnd().split('\n');
      const ulIndentedLines = ulLines.map((line) => ' ' + line);
      return `${ulIndentedLines.join('\n')}\n`;
    case 'LI':
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === 'UL' || child.nodeName === 'OL') {
          childContent += '\n';
        }
        childContent += convertNodeToScrapboxText(child);
      }
      return `${childContent.trimEnd()}\n`;
    case 'OL':
      let counter = 1;
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === 'LI') {
          const item = convertNodeToScrapboxText(child);
          const olLines = item.trimEnd().split('\n');
          const [head, ...tail] = olLines;
          childContent += ` ${counter}. ${head}\n`;
          childContent += tail.map((line) => ' ' + line).join('\n');
          counter++;
        }
      }
      return `${childContent.trimEnd()}\n`;
    case 'BLOCKQUOTE':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child);
      }
      let lines = childContent.trimEnd().split('\n');
      const indentedLines = lines.map((line) => '> ' + line);
      return `${indentedLines.join('\n')}\n`;
    case 'CODE':
      //TODO: implement
      // インラインとブロックの両方があるな
      return '';
    case 'PRE':
      //TODO: implement
      return '';
    case 'BR':
      return '\n';
    case 'TABLE':
      //TODO: implement
      return '';
      case 'A':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[${childContent} ${element.getAttribute('href')}]`;
      case 'STRONG':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[* ${childContent}]`;
      case 'EM':
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `[/ ${childContent}]`;
      case 'CODE':
        //TODO: implement
        return '';
      default:
        for (const child of Array.from(element.childNodes)) {
          childContent += convertNodeToScrapboxText(child);
        }
        return `${childContent}`;
    }
}
