(async function () {
  // replace your_user_name to your Scrapbox user name
  const userName = 'your_user_name';

  function getMessageContents(body: HTMLElement): HTMLElement[] {
    // TODO: implement
    const messageContents = Array.from(
      body.querySelectorAll('.message-content')
    );
    return messageContents;
  }

  function parseHTML(messageContents: HTMLElement[]): string[] {
    // TODO: implement
  }

  function convertToScrapbox(input): string {
    // TODO: implement
  }

  async function copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const messageContents = getMessageContents(document.body);
  const parseResult = parseHTML(messageContents);
  const scrapboxText = convertToScrapbox(parseResult);
  await copyToClipboard(scrapboxText);

  alert('Copied to clipboard!');
})();
