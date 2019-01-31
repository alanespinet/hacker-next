import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';

class Index extends React.Component {

  static async getInitialProps({ req, res, query }){
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;
      const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      stories = await response.json();
    } catch( err ){
      stories = [];
    }

    return { page, stories }
  }

  componentDidMount(){
    if("serviceWorker" in navigator){
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('cache working');
        })
        .catch(err => {
          console.warn('cache not working');
        });
    }
  }

  render(){
    const { stories, page } = this.props;

    if( stories.length === 0 ){
      return <Error statusCode={503}/>
    }

    return (
      <Layout title="Hacker Next" description="A Hacker News clone created with Next.js">
        <h1>Hacker News Application</h1>
        <StoryList stories={stories} />

        <footer>
          <nav>
            { page > 1 &&
              <Link href={`/?page=${page - 1}`}>
                <a>Prev page</a>
              </Link>
            }
            <Link href={`/?page=${page + 1}`}>
              <a>Next page</a>
            </Link>
          </nav>
        </footer>

        <style jsx>{`
          h1 {
            padding: 1rem;
          }
          footer {
            padding-top: 20px;
          }
          footer nav {
            padding: 24px 1rem;
            text-align: center;
            background-color: #2f2f2f;
          }
          footer nav a {
            margin: 0 10px;
            color: #f2f2f2;
            text-decoration: none;
            border: 1px solid #f2f2f2;
            padding: 8px 12px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
