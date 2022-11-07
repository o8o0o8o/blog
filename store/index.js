import React from "react";

const getHashtag = () => {
  if (!window || !window.location) return null;
  const { hash } = window.location;
  const isTag = /^#[^(#|/|.)]/.test(hash);
  if (!isTag) return null;
  const tag = decodeURIComponent(hash).replace("#", "");
  return tag;
};

const initStore = {
  tags: [],
  allTags: [],
};

export const Store = React.createContext(initStore);

export const Provider = ({ children }) => {
  const posts = { edges: [] };
  const tagsPerPost = posts.edges.map(({ node }) => node.frontmatter.tags);
  const tags = new Set();
  tagsPerPost.forEach((tagsOfPost) =>
    tagsOfPost.forEach((tag) => tags.add(tag))
  );
  const [state, setState] = React.useState({
    tags: [...tags],
    allTags: [...tags],
  });

  const store = {
    ...state,
    setTags: (tags) => setState({ ...state, tags }),
  };

  React.useEffect(() => {
    const updateSelectedTag = () => {
      const hashtag = getHashtag();
      if (hashtag) {
        if (state.tags.length === 1 && state.tags[0] === hashtag) return;
        store.setTags([hashtag]);
        return;
      }
      if (state.tags.length !== state.allTags.length) {
        store.setTags(state.allTags);
      }
    };
    updateSelectedTag();
  });

  return <Store.Provider value={store}>{children}</Store.Provider>;
};
