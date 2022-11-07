const fs = require("fs");

module.exports = async function (context) {
  const { siteConfig } = context; // Siteconfig is the content of docusaurus.config.js
  const { themeConfig } = siteConfig;

  //   if (!themeConfig.goatcounter) {
  //     throw new Error(
  //       "You need to specify `goatcounter` object in `themeConfig` " +
  //         "with `code` field in it to use docusaurus-plugin-goatcounter"
  //     );
  //   }
  //   if (!themeConfig.goatcounter.code) {
  //     throw new Error(
  //       "You specified the `goatCounter` object in `themeConfig`, " +
  //         "but the `code` field was missing. "
  //     );
  //   }

  //   const analyticsDomain = `https://${themeConfig.goatcounter.code}.goatcounter.com`;

  const dirs = await fs.promises.readdir("./blog");

  console.log(dirs);

  return {
    name: "docusaurus-plugin-my-plugin",
    injectHtmlTags: () => {
      // Adds additional HTLM to every page
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              async: true,
              src: "//gc.zgo.at/count.js",
              //   "data-goatcounter": `${analyticsDomain}/count`,
            },
          },
        ],
      };
    },
  };
};
