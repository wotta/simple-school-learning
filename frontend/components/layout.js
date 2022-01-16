import Nav from "./nav"

const Layout = ({ children, navigation, seo }) => (
  <>
    <Nav navigation={navigation} />
    {children}
  </>
)

export default Layout
