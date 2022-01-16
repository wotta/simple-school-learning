import Head from "next/head"

const SeoBasic = ({ seo }) => {
  if (!seo.title && !seo.description) return null

  return (
    <Head>
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}
    </Head>
  )
}

export default SeoBasic
