import { convertNodeToScrapboxText } from './convertNodeToScrapboxText';

describe('convertNodeToScrapboxText', () => {
  test('converts a simple text node', () => {
    const node = document.createTextNode('hello');
    expect(convertNodeToScrapboxText(node, '')).toBe('hello');
  });

  test('converts a <h1> node', () => {
    const node = document.createElement('h1');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('[****** hello]\n');
  });

  test('converts a <h2> node', () => {
    const node = document.createElement('h2');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('[***** hello]\n');
  });

  test('converts a <h3> node', () => {
    const node = document.createElement('h3');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('[**** hello]\n');
  });

  test('converts a <h4> node', () => {
    const node = document.createElement('h4');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('[*** hello]\n');
  });

  test('converts a <h5> node', () => {
    const node = document.createElement('h5');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('[** hello]\n');
  });

  test('converts a <h6> node', () => {
    const node = document.createElement('h6');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('[* hello]\n');
  });

  test('converts a <p> node', () => {
    const node = document.createElement('p');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('hello\n');
  });

  test('converts a <img> node', () => {
    const node = document.createElement('img');
    node.setAttribute('src', 'https://example.com/image.png');
    expect(convertNodeToScrapboxText(node, '')).toBe(
      '[https://example.com/image.png]\n'
    );
  });

  test('converts <ul> and <li> nodes', () => {
    const node = document.createElement('div');
    node.innerHTML = `
      <ul>
        <li>item1</li>
        <li>item2</li>
      </ul>
    `;

    // expected:
    //  item1
    //  item2

    expect(convertNodeToScrapboxText(node, '')).toBe(' item1\n item2\n');
  });

  test('converts <ul> and <li> nodes with nested <ul> and <li> nodes', () => {
    const node = document.createElement('div');
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

    expect(convertNodeToScrapboxText(node, '')).toBe(
      ' item1\n item2\n  nestedItem1\n  nestedItem2\n'
    );
  });

  test('converts <ol> and <li> nodes', () => {
    const node = document.createElement('div');
    node.innerHTML = `
      <ol>
        <li>item1</li>
        <li>item2</li>
      </ol>
    `;

    // expected:
    //  1. item1
    //  2. item2

    expect(convertNodeToScrapboxText(node, '')).toBe(' 1. item1\n 2. item2\n');
  });

  test('converts <ol> and <li> nodes with nested <ol> and <li> nodes', () => {
    const node = document.createElement('div');
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

    expect(convertNodeToScrapboxText(node, '')).toBe(
      ' 1. item1\n 2. item2\n  1. nestedItem1\n  2. nestedItem2\n'
    );
  });

  test('converts <blockquote> nodes', () => {
    const node = document.createElement('blockquote');
    node.appendChild(document.createTextNode('hello'));
    expect(convertNodeToScrapboxText(node, '')).toBe('>hello\n');
  });

  test('converts <a> nodes', () => {
    const node = document.createElement('a');
    node.setAttribute('href', 'https://example.com');
    node.appendChild(document.createTextNode('example'));
    expect(convertNodeToScrapboxText(node, '')).toBe(
      '[example https://example.com]'
    );
  });
});

test('converts <strong> nodes', () => {
  const node = document.createElement('strong');
  node.appendChild(document.createTextNode('hello'));
  expect(convertNodeToScrapboxText(node, '')).toBe('[* hello]');
});
