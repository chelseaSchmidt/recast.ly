import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = (options = {}, callback = () => {}) => {
  options.videoEmbeddable = true;
  options.type = 'video';
  options.part = 'id,snippet';
  options.fields = 'items(kind,etag,id,snippet)';

  $.get({
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: options,
    contentType: 'application/json',
    dataFilter: data => JSON.stringify(JSON.parse(data).items),
    success: callback,
    error: () => console.error('Sumthin went wrong')
  });

};

export default searchYouTube;

//https://www.googleapis.com/youtube/v3/search
//Returns a collection of search results that match the query parameters
//specified in the API request. By default, a search result set
//identifies matching video, channel, and playlist resources, but you can
//also configure queries to only retrieve a specific type of resource.

//If successful, this method returns a response body with the following structure:

// {
//   "kind": "youtube#searchListResponse",
//   "etag": etag,
//   "nextPageToken": string,
//   "prevPageToken": string,
//   "regionCode": string,
//   "pageInfo": {
//     "totalResults": integer,
//     "resultsPerPage": integer
//   },
//   "items": [
//     search Resource
//   ]
// }

//Youtube provided example:
// function searchByKeyword() {
//   var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});

//   for(var i in results.items) {
//     var item = results.items[i];
//     Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
//   }
// }