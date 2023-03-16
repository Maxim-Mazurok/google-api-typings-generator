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

/**
 * Always `0.0` because we can't reliably parse versions;
 * and we'll have one package per version anyway, @see https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/652
 * and it won't be right to have `1.2` for both `v1.2beta3` and `v1.2alpha1` for example
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped#how-do-definitely-typed-package-versions-relate-to-versions-of-the-corresponding-library
 */
export const majorAndMinorVersion = '0.0';
