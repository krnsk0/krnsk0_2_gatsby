import React, { FunctionComponent } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

type Props = {
  pageTitlePrefix?: string;
  customDescription?: string;
  urlSuffix?: string;
};

const Layout: FunctionComponent<Props> = ({
  children,
  pageTitlePrefix = null,
  customDescription = null,
  urlSuffix = null,
}) => {
  const {
    site: {
      siteMetadata: { title: metadataTitle, siteUrl: metadataUrl, description: metadataDescripiton },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
      }
    `,
  );

  // use default title or title from props?
  const title = pageTitlePrefix ? pageTitlePrefix + ' | ' + metadataTitle : metadataTitle;

  // use default description or title from props?
  const description = customDescription || metadataDescripiton;

  // use default url or url from props?
  const url = urlSuffix ? metadataUrl + '/' + urlSuffix : metadataUrl;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="" />

        {/* Twitter */}
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />

        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
