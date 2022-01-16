import { useContext } from "react"
import { GlobalContext } from "../pages/_app"
import SeoBasic from "./seo/SeoBasic"
import SeoFull from "./seo/SeoFull"
import SeoAdvanced from "./seo/SeoAdvanced"
import SeoOpenGraph from "./seo/SeoOpenGraph"
import SeoJsonSchema from "./seo/SeoJsonSchema"

const componentMap = {
  "seo.basic": SeoBasic,
  "seo.advanced": SeoAdvanced,
  "seo.open-graph": SeoOpenGraph,
  "seo.json-ld-schema": SeoJsonSchema,
}

const Seo = ({ seo }) => {
  const { siteName } = useContext(GlobalContext)

  // Strapi has the option to set up multiple SEO blocks for the homepage
  // This takes care of that
  if (seo instanceof Array && seo.length > 0) {
    return (
      <>
        {seo.map((seoItem, index) => {
          const Component = componentMap[seoItem.__component]

          return <Component key={index} seo={seoItem} />
        })}
      </>
    )
  }

  // For articles, the SEO is a single object, unfortunately typeof null is also "object"
  // hence we check if it's a truthy value
  if (typeof seo === "object" && Boolean(seo)) {
    const seoWithDefaults = {
      ...seo,
    }
    const fullSeo = {
      ...seoWithDefaults,
      // Add title suffix
      metaTitle: siteName,
    }

    return <SeoFull seo={fullSeo} />
  }

  // If it's not an array or an object, we don't know what to do. Yet.
  return null
}

export default Seo
