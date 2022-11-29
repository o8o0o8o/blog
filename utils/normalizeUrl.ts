function normalizeUrl(rawUrls) {
  const urls = [...rawUrls];
  const resultArray = [];

  let hasStartingSlash = false;
  let hasEndingSlash = false;

  const isNonEmptyArray = (arr) => arr.length > 0;

  if (!isNonEmptyArray(urls)) {
    return "";
  }

  // If the first part is a plain protocol, we combine it with the next part.
  if (urls[0].match(/^[^/:]+:\/*$/) && urls.length > 1) {
    const first = urls.shift();
    if (first.startsWith("file:") && urls[0].startsWith("/")) {
      // Force a double slash here, else we lose the information that the next
      // segment is an absolute path
      urls[0] = `${first}//${urls[0]}`;
    } else {
      urls[0] = first + urls[0];
    }
  }

  // There must be two or three slashes in the file protocol,
  // two slashes in anything else.
  const replacement = urls[0].match(/^file:\/\/\//) ? "$1:///" : "$1://";
  urls[0] = urls[0].replace(/^(?<protocol>[^/:]+):\/*/, replacement);

  for (let i = 0; i < urls.length; i += 1) {
    let component = urls[i];

    if (typeof component !== "string") {
      throw new TypeError(`Url must be a string. Received ${typeof component}`);
    }

    if (component === "") {
      if (i === urls.length - 1 && hasEndingSlash) {
        resultArray.push("/");
      }
      continue;
    }

    if (component !== "/") {
      if (i > 0) {
        // Removing the starting slashes for each component but the first.
        component = component.replace(
          /^\/+/,
          // Special case where the first element of rawUrls is empty
          // ["", "/hello"] => /hello
          component.startsWith("/") && !hasStartingSlash ? "/" : ""
        );
      }

      hasEndingSlash = component.endsWith("/");
      // Removing the ending slashes for each component but the last. For the
      // last component we will combine multiple slashes to a single one.
      component = component.replace(/\/+$/, i < urls.length - 1 ? "" : "/");
    }

    hasStartingSlash = true;
    resultArray.push(component);
  }

  let str = resultArray.join("/");
  // Each input component is now separated by a single slash except the possible
  // first plain protocol part.

  // Remove trailing slash before parameters or hash.
  str = str.replace(/\/(?<search>\?|&|#[^!])/g, "$1");

  // Replace ? in parameters with &.
  const parts = str.split("?");
  str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");

  // Dedupe forward slashes in the entire path, avoiding protocol slashes.
  str = str.replace(/(?<textBefore>[^:/]\/)\/+/g, "$1");

  // Dedupe forward slashes at the beginning of the path.
  str = str.replace(/^\/+/g, "/");

  return str;
}

module.exports = normalizeUrl;
