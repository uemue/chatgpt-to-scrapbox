// convert a element to a Scrapbox text. This function walks through the element and its children recursively.
export function convertNodeToScrapboxText(node: Node, indent: string): string {
  let output = '';
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? '';
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
      return output + indent + `[****** ${childContent}]\n`;
    case 'H2':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `[***** ${childContent}]\n`;
    case 'H3':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `[**** ${childContent}]\n`;
    case 'H4':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `[*** ${childContent}]\n`;
    case 'H5':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `[** ${childContent}]\n`;
    case 'H6':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `[* ${childContent}]\n`;
    case 'P':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `${childContent}\n`;
    case 'IMG':
      return output + `[${element.getAttribute('src')}]\n`;
    case 'UL':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent + ' ');
      }
      return output + `${childContent}\n`;
    case 'LI':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + indent + `${childContent}\n`;
    case 'OL':
      let counter = 1;
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === 'LI') {
          childContent += `${indent}${counter}. ${convertNodeToScrapboxText(
            child,
            indent
          )}\n`;
          counter++;
        }
      }
    case 'BLOCKQUOTE':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent + '>');
      }
      return output + `${childContent}\n`;
    case 'CODE':
      //TODO: implement
      // インラインとブロックの両方があるな
      return output;
    case 'PRE':
      //TODO: implement
      return output;
    case 'BR':
      return output + '\n';
    case 'TABLE':
      //TODO: implement
      return output;
    case 'A':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + `[${childContent} ${element.getAttribute('href')}]`;
    case 'STRONG':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + `[* ${childContent}]`;
    case 'EM':
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + `[/ ${childContent}]`;
    case 'CODE':
      //TODO: implement
      return output;
    default:
      for (const child of Array.from(element.childNodes)) {
        childContent += convertNodeToScrapboxText(child, indent);
      }
      return output + `${childContent}`;
  }
}
