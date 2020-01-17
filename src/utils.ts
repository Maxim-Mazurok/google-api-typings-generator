import * as _ from 'lodash';
import RestResource = gapi.client.discovery.RestResource;
import RestDescription = gapi.client.discovery.RestDescription;

/**
 * Sorts the methods and nested resources on the specified resource.
 *
 * @return reference to resource object
 */
export function sortResource(resource: RestDescription|RestResource) {
  if (resource.methods) {
    resource.methods = sortKeys(resource.methods)
  }

  if (resource.resources) {
    resource.resources = _.mapValues(sortKeys(resource.resources), sortResource);
  }

  return resource
}

/**
 * Sorts the properties on the specified record.
 *
 * @return new sorted object
 */
export function sortKeys<T>(record: Record<string, T>): Record<string, T> {
  const sorted = {};

  Object.keys(record).sort().forEach(function (property) {
    sorted[property] = record[property]
  });

  return sorted;
}
