/* This is stub file for gapi.client.datalabeling-v1beta1 definition tests */
// IMPORTANT
// This file was generated by https://github.com/Maxim-Mazurok/google-api-typings-generator. Please do not edit it manually.
// In case of any problems please post issue to https://github.com/Maxim-Mazurok/google-api-typings-generator

// Revision: 20240207

gapi.load('client', async () => {
  /** now we can use gapi.client */

  await gapi.client.load(
    'https://datalabeling.googleapis.com/$discovery/rest?version=v1beta1'
  );
  /** now we can use gapi.client.datalabeling */

  /** don't forget to authenticate your client before sending any request to resources: */
  /** declare client_id registered in Google Developers Console */
  const client_id = '<<PUT YOUR CLIENT ID HERE>>';
  const scope = [
    /** See, edit, configure, and delete your Google Cloud data and see the email address for your Google Account. */
    'https://www.googleapis.com/auth/cloud-platform',
  ];
  const immediate = false;
  gapi.auth.authorize({client_id, scope, immediate}, authResult => {
    if (authResult && !authResult.error) {
      /** handle successful authorization */
      void run();
    } else {
      /** handle authorization error */
    }
  });

  async function run() {
    /** Creates an annotation spec set by providing a set of labels. */
    await gapi.client.datalabeling.projects.annotationSpecSets.create(
      {
        parent: 'Test string',
      },
      {
        annotationSpecSet: {
          annotationSpecs: [
            {
              description: 'Test string',
              displayName: 'Test string',
              index: 42,
            },
          ],
          blockingResources: ['Test string'],
          description: 'Test string',
          displayName: 'Test string',
          name: 'Test string',
        },
      }
    );
    /** Deletes an annotation spec set by resource name. */
    await gapi.client.datalabeling.projects.annotationSpecSets.delete({
      name: 'Test string',
    });
    /** Gets an annotation spec set by resource name. */
    await gapi.client.datalabeling.projects.annotationSpecSets.get({
      name: 'Test string',
    });
    /** Lists annotation spec sets for a project. Pagination is supported. */
    await gapi.client.datalabeling.projects.annotationSpecSets.list({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Creates dataset. If success return a Dataset resource. */
    await gapi.client.datalabeling.projects.datasets.create(
      {
        parent: 'Test string',
      },
      {
        dataset: {
          blockingResources: ['Test string'],
          createTime: 'Test string',
          dataItemCount: 'Test string',
          description: 'Test string',
          displayName: 'Test string',
          inputConfigs: [
            {
              annotationType: 'Test string',
              bigquerySource: {
                inputUri: 'Test string',
              },
              classificationMetadata: {
                isMultiLabel: true,
              },
              dataType: 'Test string',
              gcsSource: {
                inputUri: 'Test string',
                mimeType: 'Test string',
              },
              textMetadata: {
                languageCode: 'Test string',
              },
            },
          ],
          lastMigrateTime: 'Test string',
          name: 'Test string',
        },
      }
    );
    /** Deletes a dataset by resource name. */
    await gapi.client.datalabeling.projects.datasets.delete({
      name: 'Test string',
    });
    /** Exports data and annotations from dataset. */
    await gapi.client.datalabeling.projects.datasets.exportData(
      {
        name: 'Test string',
      },
      {
        annotatedDataset: 'Test string',
        filter: 'Test string',
        outputConfig: {
          gcsDestination: {
            mimeType: 'Test string',
            outputUri: 'Test string',
          },
          gcsFolderDestination: {
            outputFolderUri: 'Test string',
          },
        },
        userEmailAddress: 'Test string',
      }
    );
    /** Gets dataset by resource name. */
    await gapi.client.datalabeling.projects.datasets.get({
      name: 'Test string',
    });
    /** Imports data into dataset based on source locations defined in request. It can be called multiple times for the same dataset. Each dataset can only have one long running operation running on it. For example, no labeling task (also long running operation) can be started while importing is still ongoing. Vice versa. */
    await gapi.client.datalabeling.projects.datasets.importData(
      {
        name: 'Test string',
      },
      {
        inputConfig: {
          annotationType: 'Test string',
          bigquerySource: {
            inputUri: 'Test string',
          },
          classificationMetadata: {
            isMultiLabel: true,
          },
          dataType: 'Test string',
          gcsSource: {
            inputUri: 'Test string',
            mimeType: 'Test string',
          },
          textMetadata: {
            languageCode: 'Test string',
          },
        },
        userEmailAddress: 'Test string',
      }
    );
    /** Lists datasets under a project. Pagination is supported. */
    await gapi.client.datalabeling.projects.datasets.list({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Deletes an annotated dataset by resource name. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.delete({
      name: 'Test string',
    });
    /** Gets an annotated dataset by resource name. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.get({
      name: 'Test string',
    });
    /** Lists annotated datasets for a dataset. Pagination is supported. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.list({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Gets a data item in a dataset by resource name. This API can be called after data are imported into dataset. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.dataItems.get(
      {
        name: 'Test string',
      }
    );
    /** Lists data items in a dataset. This API can be called after data are imported into dataset. Pagination is supported. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.dataItems.list(
      {
        filter: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Gets an example by resource name, including both data and annotation. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.examples.get(
      {
        filter: 'Test string',
        name: 'Test string',
      }
    );
    /** Lists examples in an annotated dataset. Pagination is supported. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.examples.list(
      {
        filter: 'Test string',
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Delete a FeedbackThread. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.delete(
      {
        name: 'Test string',
      }
    );
    /** Get a FeedbackThread object. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.get(
      {
        name: 'Test string',
      }
    );
    /** List FeedbackThreads with pagination. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.list(
      {
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Create a FeedbackMessage object. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.feedbackMessages.create(
      {
        parent: 'Test string',
      },
      {
        body: 'Test string',
        createTime: 'Test string',
        image: 'Test string',
        name: 'Test string',
        operatorFeedbackMetadata: {},
        requesterFeedbackMetadata: {},
      }
    );
    /** Delete a FeedbackMessage. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.feedbackMessages.delete(
      {
        name: 'Test string',
      }
    );
    /** Get a FeedbackMessage object. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.feedbackMessages.get(
      {
        name: 'Test string',
      }
    );
    /** List FeedbackMessages with pagination. */
    await gapi.client.datalabeling.projects.datasets.annotatedDatasets.feedbackThreads.feedbackMessages.list(
      {
        pageSize: 42,
        pageToken: 'Test string',
        parent: 'Test string',
      }
    );
    /** Gets a data item in a dataset by resource name. This API can be called after data are imported into dataset. */
    await gapi.client.datalabeling.projects.datasets.dataItems.get({
      name: 'Test string',
    });
    /** Lists data items in a dataset. This API can be called after data are imported into dataset. Pagination is supported. */
    await gapi.client.datalabeling.projects.datasets.dataItems.list({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Gets an evaluation by resource name (to search, use projects.evaluations.search). */
    await gapi.client.datalabeling.projects.datasets.evaluations.get({
      name: 'Test string',
    });
    /** Searches example comparisons from an evaluation. The return format is a list of example comparisons that show ground truth and prediction(s) for a single input. Search by providing an evaluation ID. */
    await gapi.client.datalabeling.projects.datasets.evaluations.exampleComparisons.search(
      {
        parent: 'Test string',
      },
      {
        pageSize: 42,
        pageToken: 'Test string',
      }
    );
    /** Starts a labeling task for image. The type of image labeling task is configured by feature in the request. */
    await gapi.client.datalabeling.projects.datasets.image.label(
      {
        parent: 'Test string',
      },
      {
        basicConfig: {
          annotatedDatasetDescription: 'Test string',
          annotatedDatasetDisplayName: 'Test string',
          contributorEmails: ['Test string'],
          instruction: 'Test string',
          labelGroup: 'Test string',
          languageCode: 'Test string',
          questionDuration: 'Test string',
          replicaCount: 42,
          userEmailAddress: 'Test string',
        },
        boundingPolyConfig: {
          annotationSpecSet: 'Test string',
          instructionMessage: 'Test string',
        },
        feature: 'Test string',
        imageClassificationConfig: {
          allowMultiLabel: true,
          annotationSpecSet: 'Test string',
          answerAggregationType: 'Test string',
        },
        polylineConfig: {
          annotationSpecSet: 'Test string',
          instructionMessage: 'Test string',
        },
        segmentationConfig: {
          annotationSpecSet: 'Test string',
          instructionMessage: 'Test string',
        },
      }
    );
    /** Starts a labeling task for text. The type of text labeling task is configured by feature in the request. */
    await gapi.client.datalabeling.projects.datasets.text.label(
      {
        parent: 'Test string',
      },
      {
        basicConfig: {
          annotatedDatasetDescription: 'Test string',
          annotatedDatasetDisplayName: 'Test string',
          contributorEmails: ['Test string'],
          instruction: 'Test string',
          labelGroup: 'Test string',
          languageCode: 'Test string',
          questionDuration: 'Test string',
          replicaCount: 42,
          userEmailAddress: 'Test string',
        },
        feature: 'Test string',
        textClassificationConfig: {
          allowMultiLabel: true,
          annotationSpecSet: 'Test string',
          sentimentConfig: {
            enableLabelSentimentSelection: true,
          },
        },
        textEntityExtractionConfig: {
          annotationSpecSet: 'Test string',
        },
      }
    );
    /** Starts a labeling task for video. The type of video labeling task is configured by feature in the request. */
    await gapi.client.datalabeling.projects.datasets.video.label(
      {
        parent: 'Test string',
      },
      {
        basicConfig: {
          annotatedDatasetDescription: 'Test string',
          annotatedDatasetDisplayName: 'Test string',
          contributorEmails: ['Test string'],
          instruction: 'Test string',
          labelGroup: 'Test string',
          languageCode: 'Test string',
          questionDuration: 'Test string',
          replicaCount: 42,
          userEmailAddress: 'Test string',
        },
        eventConfig: {
          annotationSpecSets: ['Test string'],
          clipLength: 42,
          overlapLength: 42,
        },
        feature: 'Test string',
        objectDetectionConfig: {
          annotationSpecSet: 'Test string',
          extractionFrameRate: 42,
        },
        objectTrackingConfig: {
          annotationSpecSet: 'Test string',
          clipLength: 42,
          overlapLength: 42,
        },
        videoClassificationConfig: {
          annotationSpecSetConfigs: [
            {
              allowMultiLabel: true,
              annotationSpecSet: 'Test string',
            },
          ],
          applyShotDetection: true,
        },
      }
    );
    /** Creates an evaluation job. */
    await gapi.client.datalabeling.projects.evaluationJobs.create(
      {
        parent: 'Test string',
      },
      {
        job: {
          annotationSpecSet: 'Test string',
          attempts: [
            {
              attemptTime: 'Test string',
              partialFailures: [
                {
                  code: 42,
                  details: [
                    {
                      A: 42,
                    },
                  ],
                  message: 'Test string',
                },
              ],
            },
          ],
          createTime: 'Test string',
          description: 'Test string',
          evaluationJobConfig: {
            bigqueryImportKeys: {
              A: 'Test string',
            },
            boundingPolyConfig: {
              annotationSpecSet: 'Test string',
              instructionMessage: 'Test string',
            },
            evaluationConfig: {
              boundingBoxEvaluationOptions: {
                iouThreshold: 42,
              },
            },
            evaluationJobAlertConfig: {
              email: 'Test string',
              minAcceptableMeanAveragePrecision: 42,
            },
            exampleCount: 42,
            exampleSamplePercentage: 42,
            humanAnnotationConfig: {
              annotatedDatasetDescription: 'Test string',
              annotatedDatasetDisplayName: 'Test string',
              contributorEmails: ['Test string'],
              instruction: 'Test string',
              labelGroup: 'Test string',
              languageCode: 'Test string',
              questionDuration: 'Test string',
              replicaCount: 42,
              userEmailAddress: 'Test string',
            },
            imageClassificationConfig: {
              allowMultiLabel: true,
              annotationSpecSet: 'Test string',
              answerAggregationType: 'Test string',
            },
            inputConfig: {
              annotationType: 'Test string',
              bigquerySource: {
                inputUri: 'Test string',
              },
              classificationMetadata: {
                isMultiLabel: true,
              },
              dataType: 'Test string',
              gcsSource: {
                inputUri: 'Test string',
                mimeType: 'Test string',
              },
              textMetadata: {
                languageCode: 'Test string',
              },
            },
            textClassificationConfig: {
              allowMultiLabel: true,
              annotationSpecSet: 'Test string',
              sentimentConfig: {
                enableLabelSentimentSelection: true,
              },
            },
          },
          labelMissingGroundTruth: true,
          modelVersion: 'Test string',
          name: 'Test string',
          schedule: 'Test string',
          state: 'Test string',
        },
      }
    );
    /** Stops and deletes an evaluation job. */
    await gapi.client.datalabeling.projects.evaluationJobs.delete({
      name: 'Test string',
    });
    /** Gets an evaluation job by resource name. */
    await gapi.client.datalabeling.projects.evaluationJobs.get({
      name: 'Test string',
    });
    /** Lists all evaluation jobs within a project with possible filters. Pagination is supported. */
    await gapi.client.datalabeling.projects.evaluationJobs.list({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Updates an evaluation job. You can only update certain fields of the job's EvaluationJobConfig: `humanAnnotationConfig.instruction`, `exampleCount`, and `exampleSamplePercentage`. If you want to change any other aspect of the evaluation job, you must delete the job and create a new one. */
    await gapi.client.datalabeling.projects.evaluationJobs.patch(
      {
        name: 'Test string',
        updateMask: 'Test string',
      },
      {
        annotationSpecSet: 'Test string',
        attempts: [
          {
            attemptTime: 'Test string',
            partialFailures: [
              {
                code: 42,
                details: [
                  {
                    A: 42,
                  },
                ],
                message: 'Test string',
              },
            ],
          },
        ],
        createTime: 'Test string',
        description: 'Test string',
        evaluationJobConfig: {
          bigqueryImportKeys: {
            A: 'Test string',
          },
          boundingPolyConfig: {
            annotationSpecSet: 'Test string',
            instructionMessage: 'Test string',
          },
          evaluationConfig: {
            boundingBoxEvaluationOptions: {
              iouThreshold: 42,
            },
          },
          evaluationJobAlertConfig: {
            email: 'Test string',
            minAcceptableMeanAveragePrecision: 42,
          },
          exampleCount: 42,
          exampleSamplePercentage: 42,
          humanAnnotationConfig: {
            annotatedDatasetDescription: 'Test string',
            annotatedDatasetDisplayName: 'Test string',
            contributorEmails: ['Test string'],
            instruction: 'Test string',
            labelGroup: 'Test string',
            languageCode: 'Test string',
            questionDuration: 'Test string',
            replicaCount: 42,
            userEmailAddress: 'Test string',
          },
          imageClassificationConfig: {
            allowMultiLabel: true,
            annotationSpecSet: 'Test string',
            answerAggregationType: 'Test string',
          },
          inputConfig: {
            annotationType: 'Test string',
            bigquerySource: {
              inputUri: 'Test string',
            },
            classificationMetadata: {
              isMultiLabel: true,
            },
            dataType: 'Test string',
            gcsSource: {
              inputUri: 'Test string',
              mimeType: 'Test string',
            },
            textMetadata: {
              languageCode: 'Test string',
            },
          },
          textClassificationConfig: {
            allowMultiLabel: true,
            annotationSpecSet: 'Test string',
            sentimentConfig: {
              enableLabelSentimentSelection: true,
            },
          },
        },
        labelMissingGroundTruth: true,
        modelVersion: 'Test string',
        name: 'Test string',
        schedule: 'Test string',
        state: 'Test string',
      }
    );
    /** Pauses an evaluation job. Pausing an evaluation job that is already in a `PAUSED` state is a no-op. */
    await gapi.client.datalabeling.projects.evaluationJobs.pause(
      {
        name: 'Test string',
      },
      {}
    );
    /** Resumes a paused evaluation job. A deleted evaluation job can't be resumed. Resuming a running or scheduled evaluation job is a no-op. */
    await gapi.client.datalabeling.projects.evaluationJobs.resume(
      {
        name: 'Test string',
      },
      {}
    );
    /** Searches evaluations within a project. */
    await gapi.client.datalabeling.projects.evaluations.search({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Creates an instruction for how data should be labeled. */
    await gapi.client.datalabeling.projects.instructions.create(
      {
        parent: 'Test string',
      },
      {
        instruction: {
          blockingResources: ['Test string'],
          createTime: 'Test string',
          csvInstruction: {
            gcsFileUri: 'Test string',
          },
          dataType: 'Test string',
          description: 'Test string',
          displayName: 'Test string',
          name: 'Test string',
          pdfInstruction: {
            gcsFileUri: 'Test string',
          },
          updateTime: 'Test string',
        },
      }
    );
    /** Deletes an instruction object by resource name. */
    await gapi.client.datalabeling.projects.instructions.delete({
      name: 'Test string',
    });
    /** Gets an instruction by resource name. */
    await gapi.client.datalabeling.projects.instructions.get({
      name: 'Test string',
    });
    /** Lists instructions for a project. Pagination is supported. */
    await gapi.client.datalabeling.projects.instructions.list({
      filter: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
      parent: 'Test string',
    });
    /** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
    await gapi.client.datalabeling.projects.operations.cancel({
      name: 'Test string',
    });
    /** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
    await gapi.client.datalabeling.projects.operations.delete({
      name: 'Test string',
    });
    /** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
    await gapi.client.datalabeling.projects.operations.get({
      name: 'Test string',
    });
    /** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
    await gapi.client.datalabeling.projects.operations.list({
      filter: 'Test string',
      name: 'Test string',
      pageSize: 42,
      pageToken: 'Test string',
    });
  }
});