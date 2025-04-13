import localFont from 'next/font/local'

export const soDoSans = localFont({
  src: [
    {
      path: "../public/fonts/sodo-sans/SoDoSans-Regular.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/sodo-sans/SoDoSans-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/sodo-sans/SoDoSans-Bold.woff2",
      weight: "700",
    },
  ]
})