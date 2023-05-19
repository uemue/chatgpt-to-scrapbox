import { convertNodeToScrapboxText } from "./convertNodeToScrapboxText";

describe("convertNodeToScrapboxText", () => {
  test("converts a simple text node", () => {
    const node = document.createTextNode("hello");
    expect(convertNodeToScrapboxText(node)).toBe("hello");
  });

  test("converts a <h1> node", () => {
    const node = document.createElement("h1");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[****** hello]\n");
  });

  test("converts a <h2> node", () => {
    const node = document.createElement("h2");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[***** hello]\n");
  });

  test("converts a <h3> node", () => {
    const node = document.createElement("h3");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[**** hello]\n");
  });

  test("converts a <h4> node", () => {
    const node = document.createElement("h4");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[*** hello]\n");
  });

  test("converts a <h5> node", () => {
    const node = document.createElement("h5");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[** hello]\n");
  });

  test("converts a <h6> node", () => {
    const node = document.createElement("h6");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[* hello]\n");
  });

  test("converts a <p> node", () => {
    const node = document.createElement("p");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("hello\n");
  });

  test("converts a <img> node", () => {
    const node = document.createElement("img");
    node.setAttribute("src", "https://example.com/image.png");
    expect(convertNodeToScrapboxText(node)).toBe(
      "[https://example.com/image.png]\n"
    );
  });

  test("converts <ul> and <li> nodes", () => {
    const node = document.createElement("div");
    node.innerHTML = `
      <ul>
        <li>item1</li>
        <li>item2</li>
      </ul>
    `;

    // expected:
    //  item1
    //  item2

    expect(convertNodeToScrapboxText(node)).toBe(" item1\n item2\n");
  });

  test("converts <ul> and <li> nodes with nested <ul> and <li> nodes", () => {
    const node = document.createElement("div");
    node.innerHTML = `
      <ul>
        <li>item1</li>
        <li>item2
          <ul>
            <li>nestedItem1</li>
            <li>nestedItem2</li>
          </ul>
        </li>
      </ul>
    `;

    // expected:
    //  item1
    //  item2
    //   nestedItem1
    //   nestedItem2

    expect(convertNodeToScrapboxText(node)).toBe(
      " item1\n item2\n  nestedItem1\n  nestedItem2\n"
    );
  });

  test("converts <ol> and <li> nodes", () => {
    const node = document.createElement("div");
    node.innerHTML = `
      <ol>
        <li>item1</li>
        <li>item2</li>
      </ol>
    `;

    // expected:
    //  1. item1
    //  2. item2

    expect(convertNodeToScrapboxText(node)).toBe(" 1. item1\n 2. item2\n");
  });

  test("converts <ol> and <li> nodes with nested <ol> and <li> nodes", () => {
    const node = document.createElement("div");
    node.innerHTML = `
      <ol>
        <li>item1</li>
        <li>item2
          <ol>
            <li>nestedItem1</li>
            <li>nestedItem2</li>
          </ol>
        </li>
      </ol>
    `;

    // expected:
    //  1. item1
    //  2. item2
    //     1. nestedItem1
    //     2. nestedItem2

    expect(convertNodeToScrapboxText(node)).toBe(
      " 1. item1\n 2. item2\n  1. nestedItem1\n  2. nestedItem2\n"
    );
  });

  test("converts <blockquote> nodes", () => {
    const node = document.createElement("div");
    node.innerHTML = `
      <blockquote>
        <p>hello</p>
      </blockquote>
    `;
    expect(convertNodeToScrapboxText(node)).toBe("> hello\n");
  });

  test("converts <pre> nodes", () => {
    const node = document.createElement("div");
    node.innerHTML = `
<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>typescript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">sayHello</span>(<span class="hljs-params">name: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Hello, <span class="hljs-subst">\${name}</span>!\`</span>);
}

<span class="hljs-title function_">sayHello</span>(<span class="hljs-string">'World'</span>);
</code></div></div></pre>
    `;

    const expected = `code:typescript
 function sayHello(name: string) {
     console.log(\`Hello, \${name}!\`);
 }
 
 sayHello('World');
`;

    expect(convertNodeToScrapboxText(node)).toBe(expected);
  });

  test("converts <code> nodes", () => {
    const node = document.createElement("code");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("`hello`");
  });

  test("converts <a> nodes", () => {
    const node = document.createElement("a");
    node.setAttribute("href", "https://example.com");
    node.appendChild(document.createTextNode("example"));
    expect(convertNodeToScrapboxText(node)).toBe(
      "[example https://example.com]"
    );
  });

  test("converts <strong> nodes", () => {
    const node = document.createElement("strong");
    node.appendChild(document.createTextNode("hello"));
    expect(convertNodeToScrapboxText(node)).toBe("[* hello]");
  });
});
