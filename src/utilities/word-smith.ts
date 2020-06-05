import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WordPOS = require('wordpos');
const wordpos = new WordPOS();


@Injectable()
export class WordSmith {
    public async getNouns(str: string): Promise<string[]> {
        const pos = await wordpos.getPOS(str);
        return _.difference(pos.nouns, pos.verbs, pos.adjectives, pos.adverbs);
    }
}
