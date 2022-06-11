# @CerebralFart/Cookies

### _Simple interaction with cookies in the browser_

This library, as the name suggests, allows you to easily interact with cookies in the browser. No longer do you need to
parse some complicated URI encoded string, instead, we've collected them already for you. Below we'll quickly go over
how you can use this library.

#### Getting a cookie

```js
const id = Cookie.trackingID;
```

#### Setting a cookie

```js
Cookie.trackingID = id;
```

#### Removing a cookie

```js
delete Cookie.trackingID;
```

#### Checking if a cookie exists

```js
"trackingID" in Cookie;
```

#### Enumerating all cookies

```js
for (const name in Cookie) {
  console.log(name);
}
```

There you have it, that's most there is to this library. If you need some more customization options, do keep reading.

### Advanced configuration

It is also possible to customize the options of cookies, but we have provided sane defaults so you will rarely need this.

```js
Cookie.trackingID = new Cookie(id, {
  path: "/subfolder/",
});
```

The the following options are available:

| Key        | Type                           | Default                                 |                                                                                                                                                       |
| ---------- | ------------------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `path`     | `string`                       | `'/'`                                   | The path for this cookie.                                                                                                                             |
| `domain`   | `string`                       | `location.hostname`                     | The domain to which this cookie belongs, check [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) for some implementation notes. |
| `secure`   | `boolean`                      | `true` if the page is served over https | Set to true if this cookie should only be available in secure contexts.                                                                               |
| `sameSite` | `'lax'`,`'strict'` or `'none'` | `'lax'`                                 | The [same site behaviour](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#samesite_cookies) of this cookie.                                 |
| `maxAge`   | `number`                       | `14 * 24 * 60 * 60`, 14 days            | The maximum age in seconds before this cookie should be removed, mutually exclusive with the `expires` parameter.                                     |
| `expires`  | `Date`                         |                                         | The date this cookie should expire, mutually exclusive with the `maxAge` parameter.                                                                   |
