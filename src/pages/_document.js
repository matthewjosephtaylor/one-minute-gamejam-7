import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Normalize } from 'styled-normalize'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en-US">
				<Head>
					<meta charSet="utf-8" />
					<Normalize />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
