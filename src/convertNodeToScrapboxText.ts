// convert a element to a Scrapbox text. This function walks through the element and its children recursively.
export function convertNodeToScrapboxText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent?.trim() || "";
  } else if (node.nodeType !== Node.ELEMENT_NODE) {
    return "";
  }

  const element = node as Element;

  switch (element.tagName) {
    case "H1":
      return `[****** ${processChildren(element)}]\n`;
    case "H2":
      return `[***** ${processChildren(element)}]\n`;
    case "H3":
      return `[**** ${processChildren(element)}]\n`;
    case "H4":
      return `[*** ${processChildren(element)}]\n`;
    case "H5":
      return `[** ${processChildren(element)}]\n`;
    case "H6":
      return `[* ${processChildren(element)}]\n`;
    case "P":
      return `${processChildren(element)}\n`;
    case "IMG":
      return `[${element.getAttribute("src")}]\n`;
    case "UL":
      return processUnorderedList(element);
    case "LI":
      return processListItem(element);
    case "OL":
      return processOrderedList(element);
    case "BLOCKQUOTE":
      return processBlockquote(element);
    case "PRE":
      return processPre(element);
    case "BR":
      return "\n";
    case "TABLE":
      return processTable(element);
    case "CODE":
      return `\`${processChildren(element)}\``;
    case "A":
      return `[${processChildren(element)} ${element.getAttribute("href")}]`;
    case "STRONG":
      return `[* ${processChildren(element)}]`;
    case "EM":
      return `[/ ${processChildren(element)}]`;
    default:
      return `${processChildren(element)}`;
  }
}

function processChildren(element: Element): string {
  let childContent = "";
  for (const child of Array.from(element.childNodes)) {
    childContent += convertNodeToScrapboxText(child);
  }
  return childContent;
}

function processUnorderedList(element: Element): string {
  const ulIndentedLines = processChildren(element)
    .trimEnd()
    .split("\n")
    .map((line) => " " + line);
  return `${ulIndentedLines.join("\n")}\n`;
}

function processListItem(element: Element): string {
  let childContent = "";
  for (const child of Array.from(element.childNodes)) {
    if (child.nodeName === "UL" || child.nodeName === "OL") {
      childContent = childContent.trimEnd() + "\n";
    }
    childContent += convertNodeToScrapboxText(child);
  }
  return `${childContent.trimEnd()}\n`;
}

function processOrderedList(element: Element): string {
  let childContent = "";
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
}

function processBlockquote(element: Element): string {
  const indentedLines = processChildren(element)
    .trimEnd()
    .split("\n")
    .map((line) => "> " + line);
  return `${indentedLines.join("\n")}\n`;
}

function processPre(element: Element): string {
  const lang =
    element.querySelector("pre > div:first-child span")?.textContent?.trim() ||
    "";
  const code = element.querySelector("code")?.textContent?.trim() || "";
  const indentedCode = code
    .split("\n")
    .map((line) => " " + line)
    .join("\n");
  return "code:" + lang + "\n" + indentedCode + "\n";
}

function processTable(element: Element): string {
  const rows = Array.from(element.querySelectorAll("tr"));
  const tsvRows = rows.map((row) =>
    Array.from(row.querySelectorAll("td, th"))
      .map((cell) => cell.textContent?.trim() || "")
      .join("\t")
  );
  const tableLines = tsvRows.map((line) => " " + line);
  return "table:table\n" + tableLines.join("\n") + "\n";
}
