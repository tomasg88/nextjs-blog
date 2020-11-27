import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostById } from "../../lib/posts";
import utilStyles from '../../styles/utils.module.css';

export default function Post ({post}) {
    return (
        <Layout>
            <Head>
                <title>
                    {post.title}
                </title>
            </Head>
            <h1 className={utilStyles.headingXl}>
                {post.title}
            </h1>
            <div className={utilStyles.lightText}>
                <Date dateString={post.date} />   
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Layout>
    )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    console.log("getStaticPaths -> data", paths);
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { id } }) {
    // Fetch necessary data for the blog post using params.id
    const post = await getPostById(id);
    console.log("getStaticProps -> post", post)
    
    return {
        props: {
            post
        }
    }
}

