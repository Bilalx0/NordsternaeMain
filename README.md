This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

If you find obsolete documents in the meilisearch index, this is how you can delete them:

1. Replace API key in env vars with admin api key (normally we have the search api key)
2. Run the following with the appropriate filters anywhere the meiliclient has been initialized e.g. in search_big component
3. clean up i.e. revert back to search api key and remove this code. try not to publish it ;)
``
const killObsoleteDocFromMeiliIndex = () => {
    console.log("Log whatever that shows you that the function was called");
    meiliClient.index('propertiesIndex').deleteDocuments({
      filter: 'price = 8000000 AND listingType = sale AND propertyType = apartment AND lifestyle = Waterfront AND bedrooms = 4'
    });
  }
``
## TO DOs


