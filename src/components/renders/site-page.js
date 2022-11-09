import React from 'react';

import Layout from '../components/Layout/Layout';

class SitePageTemplate extends React.Component {
  render() {
    const menu = this.props.pageContext.data.menu;
    const name = this.props.pageContext.name;

    return (
      <Layout page={name} menu={menu} context={this.props.pageContext}>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.pageContext.content,
          }}
        />
      </Layout>
    );
  }
}

export default SitePageTemplate;
