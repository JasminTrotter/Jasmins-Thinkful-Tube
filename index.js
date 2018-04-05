const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

let nextPageToken;

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyA5NnIDB0l9w9btT3Q4XiA3pDh0EpOrfP4',
    q: `${searchTerm}`, 
    //pageToken: nextPageToken
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


/* will come back to this
function watchNextPage() {
  $("button").on("click", function() {
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    getDataFromApi(query);
  });
}*/

function renderResult(result) {
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="blank"> <img src="${result.snippet.thumbnails.default.url}"></a><a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="blank"><p>More from this channel</p></a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  //let nextPageToken = data.nextPageToken;
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);