angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getArtist = function (artist, typeFilter) {
    	var defer = $q.defer();
      var media = typeFilter ? '&media='+typeFilter : '&media=all';

    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artist + media + '&callback=JSON_CALLBACK'
    	}).then(function (response) {
    		var result = response.data.results;
        // console.log(result);
    		var formattedResult = [];
    		
    		for (var obj in result) {
    			formattedResult.push(new FormattedArtist(result[obj]))
          // console.log(formattedResult);
    		}

    		defer.resolve(formattedResult);
    	})
    	return defer.promise;
    }


    var FormattedArtist = function (artistInfo) {
      this.AlbumArt = artistInfo.artworkUrl60;
      this.Artist = artistInfo.artistName;
      this.Collection = artistInfo.collectionName;
      this.CollectionPrice = artistInfo.collectionPrice;
      this.Play = artistInfo.previewUrl;
      this.Type = artistInfo.kind;
      this.TrackPrice = artistInfo.trackPrice;
      this.Explicit = artistInfo.trackExplicitness;
      this.Genre = artistInfo.primaryGenreName;
      this.Song = artistInfo.trackName;

    }
    
});
