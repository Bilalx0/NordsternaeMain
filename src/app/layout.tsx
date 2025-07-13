import { Providers } from "./providers"
import Header from './components/header_main'
import Footer from './components/footer'
import GoogleAnalytics from "../utils/analytics"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GoogleAnalytics />
          <Header />
            {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
