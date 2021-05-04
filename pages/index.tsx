import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'

 export default function Home({ file }) {
  const data = file.data

   return (
     <div className="container">
       <Head>
         <title>Create Next App</title>
         <link rel="icon" href="/favicon.ico" />
       </Head>

       <main>
         <h1 className="title">
           {/**
            * Render the title from `home.json`
            */}
          Welcome to <a href="https://nextjs.org">Next.js!</a>
          {data.title}
         </h1>
       </main>
     </div>
   )
 }

 /**
  * Fetch data with getStaticProps based on 'preview' mode
  */
 export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
 }) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
 }
// export default function Index({ allPosts }) {
//   const heroPost = allPosts[0]
//   const morePosts = allPosts.slice(1)
//   return (
//     <>
//       <Layout>
//         <Head>
//           <title>Next.js Blog Example with {CMS_NAME}</title>
//         </Head>
//         <Container>
//           <Intro />
//           {heroPost && (
//             <HeroPost
//               title={heroPost.title}
//               coverImage={heroPost.coverImage}
//               date={heroPost.date}
//               author={heroPost.author}
//               slug={heroPost.slug}
//               excerpt={heroPost.excerpt}
//             />
//           )}
//           {morePosts.length > 0 && <MoreStories posts={morePosts} />}
//         </Container>
//       </Layout>
//     </>
//   )
// }

// export async function getStaticProps() {
//   const allPosts = getAllPosts([
//     'title',
//     'date',
//     'slug',
//     'author',
//     'coverImage',
//     'excerpt',
//   ])

//   return {
//     props: { allPosts },
//   }
// }
