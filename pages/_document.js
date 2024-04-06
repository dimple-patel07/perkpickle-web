import { Html, Head, Main, NextScript } from "next/document";
// import { GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* <!-- Google tag (gtag.js) --> */}
				{/* <script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}" /> */}
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-RQY2Y6S4XJ" />

				<title>Perk Pickle</title>
				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
