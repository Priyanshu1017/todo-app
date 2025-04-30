// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Todo App',
  description: 'A Next.js Todo Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}