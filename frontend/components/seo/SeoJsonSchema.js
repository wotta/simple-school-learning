import Head from "next/head"
import SeoJsonOrgSchema from "./SeoJsonOrgSchema"
import SeoJsonPersonSchema from "./SeoJsonPersonSchema"

const SeoJsonSchema = ({ seo }) => {
  if (seo.type === "none") {
    return null
  }

  if (seo.type === "person") {
    return <SeoJsonPersonSchema seo={seo} />
  }

  if (seo.type === "org") {
    return <SeoJsonOrgSchema seo={seo} />
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(seo.custom)}</script>
    </Head>
  )
}

export default SeoJsonSchema
