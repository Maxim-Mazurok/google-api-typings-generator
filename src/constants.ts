import {RestDescription} from './discovery.js';

export const fallbackDocumentationLinks: {
  [id: NonNullable<RestDescription['id']>]: NonNullable<
    RestDescription['documentationLink']
  >;
} = {
  'tasks:v1': 'https://developers.google.com/tasks',
};

export const zeroWidthJoinerCharacter = String.fromCharCode(8205);

export const revisionPrefix = '// Revision: ';
