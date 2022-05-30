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

There you have it, that's all there is to this library. In the future, we hope to expand it to be more flexible in the
details you can get and set for a cookie.
