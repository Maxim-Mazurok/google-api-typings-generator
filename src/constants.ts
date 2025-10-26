import {RestDescription} from './discovery.js';

export const fallbackDocumentationLinks: {
  [id: NonNullable<RestDescription['id']>]: NonNullable<
    RestDescription['documentationLink']
  >;
} = {
  'tasks:v1': 'https://developers.google.com/tasks',
  'observability:v1':
    'https://cloud.google.com/distributed-cloud/hosted/docs/latest/gdch/apis/service/observability/observability-api-overview',
};

export const zeroWidthJoinerCharacter = String.fromCharCode(8205);
export const fullWidthCommercialAt = String.fromCharCode(65312); // "＠"

export const revisionPrefix = '// Revision: ';
