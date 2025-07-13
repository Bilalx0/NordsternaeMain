export default function Head({ canonical, metaDescription = "Exquisite Homes Meet Inspired Service | Nordstern Real Estate", title = "Luxury Property Brokers in Dubai | Nordstern Real Estate", imageLink = "https://nordstern.ae/logo_nordstern.svg" }) {
  return (
    <>
      <title key="title">{title}</title>
      <meta name="description" content={metaDescription} key="description" />
      <meta name="facebook-domain-verification" content="a8yhoo3etdbw8ehdivwmuq7gyikntc" />
      <meta
        name="twitter:description"
        content={metaDescription}
        key="twitter:description"
      />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:url" content={canonical} key="twitter:url" />
      <meta
        property="og:description"
        content={metaDescription}
        key="og:description"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta
            property="og:image"
            content={imageLink}
          />
    </>
  );
}
