import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext';
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'easyJOB',
  description: ''
}

const poppins = Poppins({
  weight: ['200', '400', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
