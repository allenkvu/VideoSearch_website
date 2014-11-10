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

        var nicoJsonData =
        {
          "query":"初音ミク",
          "service":[
            "video"
          ],
          "search":[
            "title"
          ],
          "join":[
            "cmsid",
            "title",
            "view_counter"
          ],
          "filters":[
            {
              "type":"equal",
              "field":"music_download",
              "value":true
            }
          ],
          "from":0,
          "size":3,
          "sort_by":"view_counter",
          "issuer":"apiguide",
          "reason":"ma10"
        };

        var nicoData = '';

        console.log(JSON.stringify(nicoJsonData));
        $.ajax({
            type: 'POST',
            url: 'http://api.search.nicovideo.jp/api/',
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
                console.log(data);
                nicoData = data;
            },
 
        });

        console.log(nicoData);
        var nicoVideoURL = 'http://www.nicovideo.jp/watch/';
        var thumbURL = 'http://tn-skr3.smilevideo.jp/smile?i=';
            $.getJSON(JSON.stringify(nicoData), function (data) {
                alert(data);
            });
    });
	
}

