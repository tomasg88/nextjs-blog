/**
 * Este archivo nos sirve para hacer un GET de todas las notas que yo tenga localmente.
 * Seguro será parecido si en lugar de tener las notas aca locales las tengo en Contentful, Sanity, WordPress, etc.
 */

import fs, { readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'data/posts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {

        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    const result = fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
    return result; 
}


export async function getPostById(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = readFileSync(fullPath, 'utf8');
    console.log("getPostById -> fileContent", fileContent)
    const parsedFile = matter(fileContent);
    console.log("getPostById -> parsedFile", parsedFile)

    const processedContent = await remark().use(html).process(parsedFile.content);
    const content = processedContent.toString()

    return {id, content, ...parsedFile.data};
}