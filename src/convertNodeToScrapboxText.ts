// convert a element to a Scrapbox text. This function walks through the element and its children recursively.
export function convertNodeToScrapboxText(node: Node, indent: string): string {
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
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `[****** ${childContent}]\n`;
    case 'H2':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `[***** ${childContent}]\n`;
    case 'H3':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `[**** ${childContent}]\n`;
    case 'H4':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `[*** ${childContent}]\n`;
    case 'H5':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `[** ${childContent}]\n`;
    case 'H6':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `[* ${childContent}]\n`;
    case 'P':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `${childContent}\n`;
    case 'IMG':
      return `[${element.getAttribute('src')}]\n`;
    case 'UL':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent + ' ');
      }
      return `${childContent}`;
    case 'LI':
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === 'UL' || child.nodeName === 'OL') {
          childContent += '\n';
        }
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return indent + `${childContent.trimEnd()}\n`;
    case 'OL':
      let counter = 1;
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === 'LI') {
          const childIndent = indent + ' ';
          const item = convertNodeToScrapboxText(child, childIndent);
          childContent += item.replace(
            childIndent,
            `${childIndent}${counter}. `
          );
          counter++;
        }
      }
      return `${childContent}`;
    case 'BLOCKQUOTE':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent + '>');
      }
      return `${childContent}\n`;
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
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return `[${childContent} ${element.getAttribute('href')}]`;
    case 'STRONG':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return `[* ${childContent}]`;
    case 'EM':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return `[/ ${childContent}]`;
    case 'CODE':
      //TODO: implement
      return '';
    default:
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return `${childContent}`;
  }
}
