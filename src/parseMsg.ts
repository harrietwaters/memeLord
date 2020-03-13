const WordPOS = require('wordpos');
const wordpos = new WordPOS();

export async function getNouns(str: string): Promise<string[]>{
    return await wordpos.getNouns(str);
}