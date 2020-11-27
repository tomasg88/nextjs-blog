import { useEffect } from "react";
import Head from 'next/head'
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css'


export default function Home(props) {
	const aux = useEffect(() => {
		const doFetch = async () => {
			const res = await fetch('http://localhost:3000/api/helloWorldLambda')
			const json = await res.json();
            console.log("doFetch -> res", json);
			
		}
		doFetch();
	});
    console.log("Home -> aux", aux)
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hola desde un párrafo en Next.js</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
			<section>
				<h4>Mis notas</h4>
				<ul className={utilStyles.list}>
					{
						props.data.map(p => (
							<li className={utilStyles.listItem} key={p.id}>
								<Link href={`/posts/${p.id}`}>
									<a>
										{p.title}
									</a>
								</Link>
								<br />
								<small className={utilStyles.lightText}>
									<Date dateString={p.date} />
								</small>
							</li>
						)) 
					}
				</ul>
			</section>
        </Layout>
    )
}

export async function getStaticProps() {
	const data = getSortedPostsData();
	// const db = getFromMongo();

	return {
		props: {
			data
		}
	}
}