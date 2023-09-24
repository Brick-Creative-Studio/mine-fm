import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
      return (
        <Html className={'dark'}>
          <Head />
            <Main />
            <NextScript />
        </Html>
      )
    }
  }
  