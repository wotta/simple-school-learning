import Head from "next/head"
import Str from "../../lib/str"
import { useContext } from "react"
import { GlobalContext } from "../../pages/_app"
import { getStrapiMedia } from "../../lib/media"

const TwitterOpenGraph = ({ seo }) => {
  const { twitterUsername } = useContext(GlobalContext)
  console.log(seo)

  let twitterHandle = Str(twitterUsername)
    .when(twitterUsername.charAt(0) === "@", () => twitterUsername.substr(1))
    .value()

  return (
    <Head>
      {seo.social_title && (
        <meta property="twitter:title" content={seo.social_title} />
      )}

      {seo.social_description && (
        <meta property="twitter:description" content={seo.social_description} />
      )}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterHandle && (
        <>
          <meta name="twitter:site" content={`@${twitterHandle}`} />
          <meta name="twitter:creator" content={`@${twitterHandle}`} />
        </>
      )}

      {seo.twitter_image?.data && (
        <meta
          property="twitter:image"
          content={getStrapiMedia(seo.twitter_image, "twitter_image")}
        />
      )}

      {seo.twitter_image &&
        seo.twitter_image.data?.attributes?.alternativeText && (
          <meta
            property="twitter:image:alt"
            content={seo.twitter_image.data.attributes.alternativeText}
          />
        )}
    </Head>
  )
}

export default TwitterOpenGraph
