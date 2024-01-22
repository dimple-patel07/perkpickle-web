import Head from "next/head";
import styles from "../styles/Home.module.css";
export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Perk Pickle</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className={styles.title}>Welcome to Perk Pickle</h1>

				<p className={styles.description}>Explore your offers</p>

				<div className={styles.grid}>
					<a href="https://rewardsccapi.blob.core.windows.net/ccr1212/1229172325.png" className={styles.card}>
						<h3>SAFE Cash Rewards Visa Signature</h3>
						<p>SAFE Cash Rewards Visa Signature®</p>
					</a>
				</div>
			</main>

			<footer>
				{/* add perkpickle logo */}
				<a href="https://rewardsccapi.blob.core.windows.net/ccr1212/1229172325.png" target="_blank" rel="noopener noreferrer">
					Powered by <img src="/perkpickel.svg" alt="Perk Pickel" className={styles.logo} />
				</a>
			</footer>

			<style jsx>{`
				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				footer img {
					margin-left: 0.5rem;
				}
				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
					text-decoration: none;
					color: inherit;
				}
				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
				}
				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}
