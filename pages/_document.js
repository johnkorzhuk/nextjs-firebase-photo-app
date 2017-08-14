// @flow

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';
import Helmet from 'react-helmet';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
html, body {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

body, input, button, textarea {
  font: menu;
}

a.button {
  text-decoration: none;
}

button, input[type="submit"], .button {
  background-color: hsla(191, 76%, 47%, 1);
  border-radius: 3px;
  border: 1px solid hsla(191, 76%, 37%, 1);
  box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.20);
  color: white;
  font-size: 0.8rem;
  font-weight: 300;
  outline: none;
  padding: 0.5rem 1rem;
  transition: 0.2s all;
}

@media screen and (max-width: 480px) {
  button, input[type="submit"], .button {
    display: block;
    margin-bottom: 10px;
    width: 100%;
  }
}

button:not(:last-child), input[type="submit"]:not(:last-child), .button :not(:last-child) {
  margin-right: 1em;
}

button:hover, input[type="submit"]:hover, .button:hover {
  background-color: hsla(191, 76%, 57%, 1);
  border-color: hsla(191, 76%, 47%, 1);
}

button:active, input[type="submit"]:active, .button:active {
  background-color: hsla(191, 76%, 42%, 1);
  border-color: hsla(191, 76%, 32%, 1);
  box-shadow: inset 1px 1px 1px 0px rgba(0,0,0,0.20);
  transform: translate(1px, 1px);
}

button:disabled, input[type="submit"]:disabled, .button:disabled {
  background-color: white;
  border-color: #aaa;
  box-shadow: none;
  color: #aaa;
}

button.forward:after, input[type="submit"].forward:after, .button.forward:after {
  content: ' →';
}

button.back:before, input[type="submit"].back:before, .button.back:before {
  content: '← ';
}

button.secondary, input[type="submit"].secondary, .button.secondary {
  background-color: white;
  box-sizing: border-box;
  color: hsla(191, 76%, 47%, 1);
}

button.secondary:hover, input[type="submit"].secondary:hover, .button.secondary:hover {
  background-color: #F9F9F9;
  color: hsla(191, 76%, 37%, 1);
}

button.secondary:active, input[type="submit"].secondary:active, .button.secondary:active {
  background-color: #EEE;
}

button.destructive, input[type="submit"].destructive, .button.destructive {
  background-color: hsl(0, 76%, 47%);
  border-color: hsl(0, 76%, 37%);
}

button.destructive:hover, input[type="submit"].destructive:hover, .button.destructive:hover {
  background-color: hsl(0, 76%, 57%);
  border-color: hsl(0, 76%, 47%);
}

button.destructive:active, input[type="submit"].destructive:active, .button.destructive:active {
  background-color: hsl(0, 76%, 37%);
  border-color: hsl(0, 76%, 27%);
}

button.block, input[type="submit"].block, .button.block {
  display: block;
  width: 100%;
}

button.large, input[type="submit"].large, .button.large {
  font-size: 1.5em;
}

button.small, input[type="submit"].small, .button.small {
  font-size: 0.8em;
  padding: 0.5em 1em;
}

input:not([type="submit"]) {
  border: 1px solid #ccc;
  margin-bottom: 0.5em;
  padding: 1em 0.5em;
  width: 100%;
}
`;

export default class extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  // should render on <html>
  helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  helmetJsx = () =>
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title="Nextjs starter"
      meta={[{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]}
    />;

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
      <html {...this.helmetHtmlAttrComponents()}>
        <Head>
          {this.helmetJsx()}
          {this.helmetHeadComponents()}
          <link rel="apple-touch-icon" sizes="180x180" href="static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="static/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="static/favicon-16x16.png" sizes="16x16" />
          <link rel="manifest" href="static/manifest.json" />
          <link rel="mask-icon" href="static/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=PT+Serif|Open+Sans:300,400,600,700,800"
          />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          {styleTags}
        </Head>
        <body className="root" {...this.helmetBodyAttrComponents()}>
          {main}
          <NextScript />
        </body>
      </html>
    );
  }
}
