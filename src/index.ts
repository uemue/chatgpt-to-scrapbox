import { convertNodeToScrapboxText } from "./convertNodeToScrapboxText";

(async function () {
  // Edit userName and chatGPTName according to your preference.
  const userName = "/icons/talker";
  const chatGPTName = "/icons/ChatGPT";

  function getMessageElements(page: Element): Element[] {
    const messageElements = page.querySelectorAll("div.flex-1.text-base");
    return Array.from(messageElements);
  }

  function convertToScrapbox(messageElements: Element[]): string {
    const scrapboxTexts = messageElements.map((messageElement) => {
      let scrapboxText = "";

      if (isUserMessage(messageElement)) {
        scrapboxText += `[${userName}.icon]`;
      } else {
        scrapboxText += `[${chatGPTName}.icon]`;
      }

      const messageContentElement = messageElement.querySelector(
        ".text-base > div:nth-child(2)"
      );

      if (!messageContentElement) {
        return "";
      }

      scrapboxText += convertNodeToScrapboxText(messageContentElement);
      return scrapboxText;
    });

    return scrapboxTexts.join("\n");
  }

  function isUserMessage(messageElement: Element): boolean {
    const userIconElement = messageElement.querySelector('img[alt="User"]');
    if (!userIconElement) {
      return false;
    }
    return true;
  }

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  const messageElements = getMessageElements(document.body);
  const scrapboxText = convertToScrapbox(messageElements);
  await copyToClipboard(scrapboxText);

  alert("Copied to clipboard!");
})();
