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

    public async getLocations(str: string): Promise<string[]> {
        const nouns = await wordpos.getNouns(str);
        const defs = await Promise.all(nouns.map(n => wordpos.lookupNoun(n)));
        return _.uniq(_.flatten(defs))
            .filter((def: any) => def?.lexName === 'noun.location')
            .map((def: any) => def.lemma)
            .filter(loc => str.includes(loc));
    }

    public getPreposition(): string {
        const prepostions = ['at', 'on', 'in'];

        return prepostions[_.random(prepostions.length, false)];
    }
}
