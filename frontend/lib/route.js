import { useRouter } from "next/router"

const Route = () => {
  const { basePath, asPath, route } = useRouter()

  return {
    debug: () => {
      console.log(`basePath: ${basePath}`)
      console.log(`asPath: ${asPath}`)
      console.log(`route: ${route}`)
    },

    isCurrent: (path) => {
      return asPath === path
    },

    current: () => asPath,
  }
}

export default Route
