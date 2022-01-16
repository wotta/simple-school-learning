import Head from "next/head"
import Route from "../../lib/route"
import { getStrapiMedia } from "../../lib/media"

const SeoJsonOrgSchema = ({ seo }) => {
  let orgData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: seo.name,
    url: Route().current(),
  }

  if (seo.logo) {
    orgData.logo = getStrapiMedia(seo.logo, "json org schema logo")
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(orgData)}</script>
    </Head>
  )
}

export default SeoJsonOrgSchema
