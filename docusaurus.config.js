// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const mockResponse = {
  footer: {
    _createdAt: "2022-03-23T09:42:19Z",
    _id: "8a3b568c-3b94-47c1-81c3-364899d712d7",
    _rev: "7xovLrdFPKAzdDyvzc7xZ3",
    _type: "footer",
    _updatedAt: "2022-07-13T09:15:01Z",
    contactInfo: " London, Amsterdam, Warsaw, Remote.",
    copyInfo: "© 2022 FocusReactive",
    documentTitle: "Default footer",
    navigation: [
      {
        _key: "03f804ec9332",
        links: [
          {
            _key: "e332713922a2",
            link: "/",
            title: "Home",
          },
          {
            _key: "b7576afb1e32",
            link: "/our-work",
            title: "Our work",
          },
          {
            _key: "aff7601cf764",
            link: "/about",
            title: "About",
          },
          {
            _key: "0110ee1c4379",
            link: "/blog",
            title: "Blog",
          },
          {
            _key: "08104bba7e93",
            link: "https://careers.smartrecruiters.com/FocusReactive",
            title: "Careers",
          },
        ],
        title: "COMPANY",
      },
      {
        _key: "3e02eccdecef",
        links: [
          {
            _key: "6717bfd1505e",
            link: "/#mail-us",
            title: "Contact us",
          },
          {
            _key: "bc6ac1cc01ef",
            link: "https://www.linkedin.com/company/focusreactive",
            title: "LinkedIn",
          },
          {
            _key: "4cb16586719e",
            link: "https://twitter.com/FocusReactive",
            title: "Twitter",
          },
        ],
        title: "GET IN TOUCH",
      },
      {
        _key: "76253d6a0b2c",
        links: [
          {
            _key: "41308efca5f9",
            link: "headless-ecommerce-experts",
            title: "Headless eCommerce experts",
          },
          {
            _key: "6ced0427ec1e",
            link: "headless-cms-experts",
            title: "Headless CMS experts",
          },
          {
            _key: "a702e0464874",
            link: "/shopify-hydrogen-agency-experts",
            title: "Shopify Hydrogen agency experts ",
          },
          {
            _key: "fb580f23ac1f",
            link: "/sanity-experts",
            title: "Sanity experts",
          },
          {
            _key: "9103a1dfef22",
            link: "/next-js-experts",
            title: "NextJS experts",
          },
        ],
        title: "SERVICES",
      },
    ],
    phone: "+44 208 935 5328",
  },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title:
    "Blog | FocusReactive - Next.js, Headless CMS and eCommerce expert agency",
  tagline: "Next.js, Headless CMS and eCommerce expert agency",
  url: "https://focusreactive.com/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "icons/favicon.png",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "FocusReactive", // Usually your GitHub org/user name.
  projectName: "FocusReactiveBlog", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/focusreactive/FocusReactive.com/tree/master/content/blog",
        },
        blog: {
          showReadingTime: true,
          readingTime: ({ content, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          // routeBasePath: "/",
          editUrl:
            "https://github.com/focusreactive/FocusReactive.com/tree/master/content/blog",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            type: "custom-FRLogo",
            position: "left",
            to: "/",
          },
          { to: "/", label: "Home", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          {
            to: "/",
            label: "Contact Us",
            position: "right",
          },
        ],
      },
      footer: {
        copyright: mockResponse.footer.copyInfo,
        links: mockResponse.footer.navigation.map((group) => ({
          title: group.title,
          items: group.links.map((link) => ({
            label: link.title,
            to: link.link,
          })),
        })),
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
