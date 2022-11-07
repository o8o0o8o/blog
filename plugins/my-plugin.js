const blogPluginExports = require("@docusaurus/plugin-content-blog");
const utils = require("@docusaurus/utils");
const path = require("path");

const defaultBlogPlugin = blogPluginExports.default;

async function blogPluginExtended(...pluginArgs) {
  const blogPluginInstance = await defaultBlogPlugin(...pluginArgs);
  console.log(blogPluginInstance);
  const { blogTitle, blogDescription, postsPerPage } = pluginArgs[1];

  return {
    // Add all properties of the default blog plugin so existing functionality is preserved
    ...blogPluginInstance,
    /**
     * Override the default `contentLoaded` hook to access blog posts data
     */
    // contentLoaded: async function (data) {
    //   const { content: blogContents, actions } = data;
    // },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginExtended,
};
