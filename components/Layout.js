import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';

const Layout = ({ children, title, description, background }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta name="description" content={description} />
    </Head>

    <div className="container">
      <nav>
        { background && <span onClick={() => Router.back()} className="back-button">&#x2b05;</span> }
        <Link href="/">
          <a><span className="main-title">Hacker News</span></a>
        </Link>
      </nav>

      { children }
    </div>
    <style jsx>{`
      .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: #f6f6ef;
      }
      nav {
        background-color: #f60;
        padding: 1em;
      }
      nav > * {
        display: inline-block;
        color: #000;
      }
      nav a {
        text-decoration: none;
      }
      nav .main-title {
        font-weight: bold;
      }
      nav .back-button {
        font-size: 0.9rem;
        padding-right: 1em;
        cursor: pointer;
      }
    `}</style>

    <style global jsx>{`
      body {
        background-color: #fff;
        font-family: Verdana, Geneva, sans-serif;
      }
    `}</style>
  </div>
);

export default Layout;
