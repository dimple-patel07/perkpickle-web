import { Html, Head, Main, NextScript } from "next/document";
// import { GoogleAnalytics } from "@next/third-parties/google";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* <!-- Google tag (gtag.js) --> */}
				{/* <script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}" /> */}
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-RQY2Y6S4XJ" />

				<title>perkpickle | https://www.perkpickle.com/ </title>
				<meta name="description" content="Gain Easy Access To All Your Credit Card Rewards, With PerkPickle, you will no longer miss out on a single reward again" key="desc" />
				<meta name="keywords" content="Perkpickle, Credit Card Rewards, credit card points, bank credit card credit card options for beginners" />

				<link rel="shortcut icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
