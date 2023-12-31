import './globals.css'
import { Inter } from 'next/font/google'
import { Providers} from '../redux/Providers.jsx'
import ProviderSession from './Provider.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IME Soft',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <ProviderSession>
            {children}
          </ProviderSession>
        </Providers>
      </body>
    </html>
  )
}
