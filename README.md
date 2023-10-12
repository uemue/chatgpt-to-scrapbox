# Bookmarklet: chatgpt-to-scrapbox

Copy [ChatGPT](https://chat.openai.com/) conversation to clipboard in Scrapbox format.

## Usage

Use the code below as bookmarklet.

Run this bookmarklet on ChatGPT conversation page to copy the conversation to clipboard in Scrapbox format.

```js
javascript:(function(){%22use%20strict%22%3B(()%3D%3E%7Bfunction%20l(t)%7Bif(t.nodeType%3D%3D%3DNode.TEXT_NODE)return%20t.textContent%3F.trim()%7C%7C%22%22%3Bif(t.nodeType!%3D%3DNode.ELEMENT_NODE)return%22%22%3Blet%20e%3Dt%3Bswitch(e.tagName)%7Bcase%22H1%22%3Areturn%60%5B******%20%24%7Br(e)%7D%5D%0A%60%3Bcase%22H2%22%3Areturn%60%5B*****%20%24%7Br(e)%7D%5D%0A%60%3Bcase%22H3%22%3Areturn%60%5B****%20%24%7Br(e)%7D%5D%0A%60%3Bcase%22H4%22%3Areturn%60%5B***%20%24%7Br(e)%7D%5D%0A%60%3Bcase%22H5%22%3Areturn%60%5B**%20%24%7Br(e)%7D%5D%0A%60%3Bcase%22H6%22%3Areturn%60%5B*%20%24%7Br(e)%7D%5D%0A%60%3Bcase%22P%22%3Areturn%60%24%7Br(e)%7D%0A%60%3Bcase%22IMG%22%3Areturn%60%5B%24%7Be.getAttribute(%22src%22)%7D%5D%0A%60%3Bcase%22UL%22%3Areturn%20E(e)%3Bcase%22LI%22%3Areturn%20x(e)%3Bcase%22OL%22%3Areturn%20T(e)%3Bcase%22BLOCKQUOTE%22%3Areturn%20%24(e)%3Bcase%22PRE%22%3Areturn%20b(e)%3Bcase%22BR%22%3Areturn%60%0A%60%3Bcase%22TABLE%22%3Areturn%20g(e)%3Bcase%22CODE%22%3Areturn%60%5C%60%24%7Br(e)%7D%5C%60%60%3Bcase%22A%22%3Areturn%60%5B%24%7Br(e)%7D%20%24%7Be.getAttribute(%22href%22)%7D%5D%60%3Bcase%22STRONG%22%3Areturn%60%5B*%20%24%7Br(e)%7D%5D%60%3Bcase%22EM%22%3Areturn%60%5B%2F%20%24%7Br(e)%7D%5D%60%3Bdefault%3Areturn%60%24%7Br(e)%7D%60%7D%7Dfunction%20r(t)%7Blet%20e%3D%22%22%3Bfor(let%20n%20of%20Array.from(t.childNodes))e%2B%3Dl(n)%3Breturn%20e%7Dfunction%20E(t)%7Breturn%60%24%7Br(t).trimEnd().split(%60%0A%60).map(n%3D%3E%22%20%22%2Bn).join(%60%0A%60)%7D%0A%60%7Dfunction%20x(t)%7Blet%20e%3D%22%22%3Bfor(let%20n%20of%20Array.from(t.childNodes))(n.nodeName%3D%3D%3D%22UL%22%7C%7Cn.nodeName%3D%3D%3D%22OL%22)%26%26(e%3De.trimEnd()%2B%60%0A%60)%2Ce%2B%3Dl(n)%3Breturn%60%24%7Be.trimEnd()%7D%0A%60%7Dfunction%20T(t)%7Blet%20e%3D%22%22%2Cn%3D1%3Bfor(let%20c%20of%20Array.from(t.childNodes))if(c.nodeName%3D%3D%3D%22LI%22)%7Blet%20a%3Dl(c).trimEnd().split(%60%0A%60)%2C%5Bm%2C...f%5D%3Da%2Co%3D%60%20%24%7Bn%7D.%20%24%7Bm%7D%60%2Ci%3Df.map(u%3D%3E%22%20%22%2Bu)%3Be%2B%3D%5Bo%2C...i%5D.join(%60%0A%60)%2B%60%0A%60%2Cn%2B%2B%7Dreturn%60%24%7Be.trimEnd()%7D%0A%60%7Dfunction%20%24(t)%7Breturn%60%24%7Br(t).trimEnd().split(%60%0A%60).map(n%3D%3E%22%3E%20%22%2Bn).join(%60%0A%60)%7D%0A%60%7Dfunction%20b(t)%7Blet%20e%3Dt.querySelector(%22pre%20%3E%20div%3Afirst-child%20span%22)%3F.textContent%3F.trim()%7C%7C%22%22%2Cc%3D(t.querySelector(%22code%22)%3F.textContent%3F.trim()%7C%7C%22%22).split(%60%0A%60).map(s%3D%3E%22%20%22%2Bs).join(%60%0A%60)%3Breturn%22code%3A%22%2Be%2B%60%0A%60%2Bc%2B%60%0A%60%7Dfunction%20g(t)%7Breturn%60table%3Atable%0A%60%2BArray.from(t.querySelectorAll(%22tr%22)).map(s%3D%3EArray.from(s.querySelectorAll(%22td%2C%20th%22)).map(a%3D%3Ea.textContent%3F.trim()%7C%7C%22%22).join(%22%09%22)).map(s%3D%3E%22%20%22%2Bs).join(%60%0A%60)%2B%60%0A%60%7D(async%20function()%7Blet%20t%3D%22%2Ficons%2Ftalker%22%2Ce%3D%22%2Ficons%2FChatGPT%22%3Bfunction%20n(o)%7Blet%20i%3Do.querySelectorAll(%22div.flex-1.text-base%22)%3Breturn%20Array.from(i)%7Dfunction%20c(o)%7Breturn%20o.map(u%3D%3E%7Blet%20d%3D%22%22%3Bs(u)%3Fd%2B%3D%60%5B%24%7Bt%7D.icon%5D%60%3Ad%2B%3D%60%5B%24%7Be%7D.icon%5D%60%3Blet%20p%3Du.querySelector(%22.text-base%20%3E%20div%3Anth-child(2)%22)%3Breturn%20p%3F(d%2B%3Dl(p)%2Cd)%3A%22%22%7D).join(%60%0A%60)%7Dfunction%20s(o)%7Breturn!!o.querySelector('img%5Balt%3D%22User%22%5D')%7Dasync%20function%20a(o)%7Btry%7Bawait%20navigator.clipboard.writeText(o)%7Dcatch(i)%7Bconsole.error(%22Failed%20to%20copy%3A%20%22%2Ci)%7D%7Dlet%20m%3Dn(document.body)%2Cf%3Dc(m)%3Bawait%20a(f)%2Calert(%22Copied%20to%20clipboard!%22)%7D)()%3B%7D)()%3B%0A})()
```

If you want to change the user or ChatGPT icon, please refer to the Build bookmarklet section.

## Build bookmarklet

1. Edit `src/index.ts` and set your Scrapbox username.
2. Run build script.

   ```bash
   $ npm run build
   ```

3. Use `dist/bookmarklet.js` as bookmarklet.

## License

MIT

## Author

uemue: [GitHub](https://github.com/uemue), [Twitter](https://twitter.com/uemue)
