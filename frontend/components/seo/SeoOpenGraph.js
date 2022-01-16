import Head from "next/head"
import { getStrapiMedia } from "../../lib/media"
import TwitterOpenGraph from "./TwitterOpenGraph"

const SeoOpenGraph = ({ seo }) => {
  return (
    <>
      <Head>
        {seo.social_title && (
          <meta property="og:title" content={seo.social_title} />
        )}
        {seo.social_description && (
          <meta property="og:description" content={seo.social_description} />
        )}
        {seo.social_image?.data && (
          <meta
            property="og:image"
            content={getStrapiMedia(seo.social_image, "Social Image")}
          />
        )}
      </Head>
      <TwitterOpenGraph seo={seo} />
    </>
  )
}

export default SeoOpenGraph
