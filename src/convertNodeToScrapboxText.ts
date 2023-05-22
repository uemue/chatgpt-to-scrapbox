// convert a element to a Scrapbox text. This function walks through the element and its children recursively.
export function convertNodeToScrapboxText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent?.trim() || "";
  } else if (node.nodeType !== Node.ELEMENT_NODE) {
    return "";
  }

  const element = node as Element;
  let childContent = "";

  switch (element.tagName) {
    case "H1":
      childContent = processChildren(element);
      return `[****** ${childContent}]\n`;
    case "H2":
      childContent = processChildren(element);
      return `[***** ${childContent}]\n`;
    case "H3":
      childContent = processChildren(element);
      return `[**** ${childContent}]\n`;
    case "H4":
      childContent = processChildren(element);
      return `[*** ${childContent}]\n`;
    case "H5":
      childContent = processChildren(element);
      return `[** ${childContent}]\n`;
    case "H6":
      childContent = processChildren(element);
      return `[* ${childContent}]\n`;
    case "P":
      childContent = processChildren(element);
      return `${childContent}\n`;
    case "IMG":
      return `[${element.getAttribute("src")}]\n`;
    case "UL":
      childContent = processChildren(element);
      const ulLines = childContent.trimEnd().split("\n");
      const ulIndentedLines = ulLines.map((line) => " " + line);
      return `${ulIndentedLines.join("\n")}\n`;
    case "LI":
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === "UL" || child.nodeName === "OL") {
          childContent += "\n";
        }
        childContent += convertNodeToScrapboxText(child);
      }
      return `${childContent.trimEnd()}\n`;
    case "OL":
      let counter = 1;
      for (const child of Array.from(element.childNodes)) {
        if (child.nodeName === "LI") {
          const item = convertNodeToScrapboxText(child);
          const olLines = item.trimEnd().split("\n");
          const [head, ...tail] = olLines;
          const headText = ` ${counter}. ${head}`;
          const tailText = tail.map((line) => " " + line);
          childContent += [headText, ...tailText].join("\n") + "\n";
          counter++;
        }
      }
      return `${childContent.trimEnd()}\n`;
    case "BLOCKQUOTE":
      childContent = processChildren(element);
      let lines = childContent.trimEnd().split("\n");
      const indentedLines = lines.map((line) => "> " + line);
      return `${indentedLines.join("\n")}\n`;
    case "PRE":
      const lang =
        element
          .querySelector("pre > div:first-child span")
          ?.textContent?.trim() || "";
      const code = element.querySelector("code")?.textContent?.trim() || "";
      const indentedCode = code
        .split("\n")
        .map((line) => " " + line)
        .join("\n");
      return "code:" + lang + "\n" + indentedCode + "\n";
    case "BR":
      return "\n";
    case "TABLE":
      const rows = Array.from(element.querySelectorAll("tr"));
      const tsvRows = rows.map((row) =>
        Array.from(row.querySelectorAll("td, th"))
          .map((cell) => cell.textContent?.trim() || "")
          .join("\t")
      );
      const tableLines = tsvRows.map((line) => " " + line);
      return "table:table\n" + tableLines.join("\n") + "\n";
    case "CODE":
      childContent = processChildren(element);
      return `\`${childContent}\``;
    case "A":
      childContent = processChildren(element);
      return `[${childContent} ${element.getAttribute("href")}]`;
    case "STRONG":
      childContent = processChildren(element);
      return `[* ${childContent}]`;
    case "EM":
      childContent = processChildren(element);
      return `[/ ${childContent}]`;
    default:
      childContent = processChildren(element);
      return `${childContent}`;
  }
}

function processChildren(element: Element): string {
  let childContent = "";
  for (const child of Array.from(element.childNodes)) {
    childContent += convertNodeToScrapboxText(child);
  }
  return childContent;
}
