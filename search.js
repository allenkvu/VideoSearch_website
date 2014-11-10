// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
  	q: q,
  	part: 'snippet',
    });

    request.execute(function (response) {
		$(".cont").empty();
		var playListURL = 'http://gdata.youtube.com/feeds/api/videos?q='+ q + '&alt=json&orderby=published';
        var videoURL = 'http://www.youtube.com/watch?v=';
		$.getJSON(playListURL, function (data) {
            var list_data = "";
            $.each(data.feed.entry, function (i, item) {
                var feedTitle = item.title.$t;
                var feedURL = item.link[1].href;
                var fragments = feedURL.split("/");
                var videoID = fragments[fragments.length - 2];
                var url = videoURL + videoID;
                var thumb = "http://img.youtube.com/vi/" + videoID + "/default.jpg";
                list_data += '<li><a href="' + url + '" title=""><img alt="' + feedTitle + '" src="' + thumb + '">' + feedTitle.fontcolor("white") +'</a></li>';
            });
            $(list_data).appendTo(".cont");
        });

    });

  //return Nico search data from ajax
  function getData(){
      var nicoJsonData =
        {
          "query":q,
          "service":[
            "video"
          ],
          "search":[
            "title",
            "tags"
          ],
          "join":[
            "cmsid",
            "title",
            "view_counter"
          ],
          "from":0,
          "size":25,
          "sort_by":"start_time",
          "order": "desc",
          "issuer":"apiguide",
          "reason":"ma10"
        };

        var result ="";
        return $.ajax({
            type: 'POST',
            url: 'http://api.search.nicovideo.jp/api',
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            data: JSON.stringify(nicoJsonData),
            success: function(data) {
                successmessage = 'Data was succesfully captured';
                alert(successmessage);
            },
            error: function(data) {
                successmessage = 'Error';
                alert(successmessage);
            },
 
        });;

  }



  var nicoDataResult = getData().done();
  //get data from nicoData so that it could extract responseText
  nicoDataResult.error(function (data) {
    nicoDataPartJson = data.responseText;

    //since the returned data is only partially JSON we need to do some splitting and remove the unneeded info
    var lines = nicoDataPartJson.split('\n');
    //split and delete the first two lines
    lines.splice(0,2);
    //delete the last line
    lines.splice(1,2);
    //now the one line that is left is the one needed and it is in JSON format
    var nicoDataJson = lines;

    //now parse and appened to html
    var nicoDataParsed = JSON.parse(nicoDataJson);
    var nicoVideoURL = 'http://www.nicovideo.jp/watch/';
    var thumbURL = 'http://tn-skr3.smilevideo.jp/smile?i=';
    var nlist_data = "";

    for(i = 0; i < 25; i++){

      var nfeedTitle = nicoDataParsed.values[i].title;
      var nvideoID = nicoDataParsed.values[i].cmsid;
      var thumbID = nvideoID.replace('sm','');
      var nurl = nicoVideoURL + nvideoID;
      var nthumb = thumbURL + thumbID;

      nlist_data += '<li><a href="' + nurl + '" title=""><img alt="' + nfeedTitle + '" src="' + nthumb + '">' + nfeedTitle.fontcolor("black") +'</a></li>';
      
      }    
      $(nlist_data).appendTo(".nicoCont");
  });

}

