import Head from "next/head"
import Route from "../../lib/route"

const SeoJsonPersonSchema = ({ seo }) => {
  let personData = {
    "@context": "http://schema.org",
    "@type": "Person",
    url: Route().current(),
    name: seo.name,
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(personData)}</script>
    </Head>
  )
}

export default SeoJsonPersonSchema
