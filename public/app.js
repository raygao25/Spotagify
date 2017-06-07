"use strict";

// An anonymous function that is executed passing "window" to the
// parameter "exports".  That is, it exports startApp to the window
// environment.
(function(exports) {
	var client_id = 'c0d13380ce1c4c7b9a9438b9bd5f8cb9';		// Fill in with your value from Spotify
	var redirect_uri = 'http://localhost:3000/index.html';
	var g_access_token = '';
	var playlists_id = [];
	var songs = [];
	//var songs_rating = [];
	var tags = [];
	//var song_to_tag = [];
	var loaded = false;
	var all = true;
	/*
	 * Get the playlists of the logged-in user.
	 */
	function getPlaylists(callback) {
		console.log('getPlaylists');
		var url = 'https://api.spotify.com/v1/users/cs349/playlists';

		$.ajax(url, {
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + g_access_token
			},
			success: function(r) {
				console.log('got playlist response', r);
				callback(r.items);
			},
			error: function(r) {
				callback(null);
			}
		});
	}

	function getTracks(callback, s) {
	    console.log('getTracks');
	    var url = 'https://api.spotify.com/v1/users/cs349/playlists/';
	    url += s;
		$.ajax(url, {
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + g_access_token
			},
			success: function(r) {
				console.log('got tracks response', r);
				callback(r.tracks.items);
			},
			error: function(r) {
				callback(null);
			}
		});
	}

	/*
	 * Redirect to Spotify to login.  Spotify will show a login page, if
	 * the user hasn't already authorized this app (identified by client_id).
	 * 
	 */
	var doLogin = function(callback) {
		var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
			'&response_type=token' +
			'&scope=playlist-read-private' +
			'&redirect_uri=' + encodeURIComponent(redirect_uri);
		console.log("doLogin url = " + url);
		window.location = url;
	}


    function seperate_playlist(item) {
        playlists_id.push(item.id);
        $('#playlists').append('<li>' + item.name + '</li>');
    }

    function seperate_items(items) {
        console.log('items = ', items);
        items.forEach(seperate_playlist);
        var counter = 0;
        for (var d = 0; d < playlists_id.length; d++) {
    		getTracks(function(items) {
    		    counter++;
    		    console.log('items = ', items);
    		    for (var i = 0; i < items.length; i++) {
    		        songs.push({"name": items[i].track.name, "rating": 0, "tags": []});
    		        //$.post("http://localhost:3000/Songs", songs[i], null, "json");
    		    }
        		if (counter == playlists_id.length) {
        		    load_all_song();
        		}
    		}
    		, playlists_id[d]);
        }
    }

	function load() {
	    if (loaded) return;
	    document.getElementById("Songs").innerHTML = null;
	    for (var i = 0; i < songs.length; i++) {
	        build_songs(i);
	    }
	    loaded = true;
	}
	/*
	 * What to do once the user is logged in.
	 */
	function loggedIn() {
		$('#login').hide();
		$('#loggedin').show();
		getPlaylists(seperate_items);
		// Post data to a server-side database.  See 
		// https://github.com/typicode/json-server
		var now = new Date();
		//$.post("http://localhost:3000/demo", {"msg": "accessed at " + now.toISOString(), "array": "[1,2,3,4,5,6]"}, null, "json");
	}
	function load_all_song() {
	    $.get("http://localhost:3000/tags", function(tag_list){
	        tags = tag_list['tag[]'];
	        if (!(Object.prototype.toString.call(tags) === '[object Array]')) tags = [];
	   	    document.getElementById("tag").innerHTML = null;
    	   	for (var i in tags) {
    	   	    if (!tags[i]) continue;
    	   	    $('#tag').append(tags[i]);
    		    var checkbox = document.createElement('input');
        	    checkbox.type = 'checkbox';
        	    checkbox.id = "check" + i;
        	    document.getElementById('tag').appendChild(checkbox);
        	    $('#tag').append('  ');
    	   	}
	    });
	    $.get("http://localhost:3000/Songs", function(songs_list) {
	        for (var j = 0; j < songs.length; j++) {
	            var flag = true;
	            for (var i = 0; i < songs_list.length; i++) {
	                if (songs_list[i].name == songs[j].name) {
	                    flag = false;
	                    songs[j].rating = parseInt(songs_list[i].rating);
	                    if (songs_list[i]['tags[]'] == null) break;
	                    songs[j].tags = songs_list[i]['tags[]'];
	                    for (var b = 0; b < songs[j].tags.length; b++) {
	                        if (songs[j].tags[b] == "true") {
	                            songs[j].tags[b] = true;
	                        } else if (songs[j].tags[b] == "false") {
	                            songs[j].tags[b] = false;
	                        }
	                    }
	                    break;
	                }
	            }
	            if (flag) $.post("http://localhost:3000/Songs", songs[j], null, "json");
	            if (j == songs.length - 1) load();
	        }
	    });
	}
	function update_song(index) {
	    $.get("http://localhost:3000/Songs", function(songs_list) {
	        var id = -1;
	        for (var i = 0; i < songs_list.length; i++) {
	            if (songs_list[i].name == songs[index].name) {
	                id = songs_list[i].id;
	                break;
	            }
	        }
	        if (id >= 0) {
	            $.ajax({
	                url: "http://localhost:3000/Songs/" + id,
	                type: 'DELETE'
	            });
	        }
	        $.post("http://localhost:3000/Songs", songs[index], null, "json");
	    });
	}

	function build_songs(i) {
	        var div = document.createElement('div');
	        div.id = 'block' + i;
	        document.getElementById('Songs').appendChild(div);
	        $('#block' + i).append('<li>' + songs[i].name + '</li>');

	        for (var j = 0; j < 5; j++) {
	            var radio = document.createElement('input');
	            radio.type = 'radio';
	            radio.id = "radio" + i + j;
	            if (songs[i].rating > j) radio.checked = true;
	            radio.onclick= function () {
	                var idstr = this.id;
	                var indexstr = this.id.substring(5, idstr.length - 1);
	                var index = parseInt(indexstr);
	                var rating = parseInt(idstr[idstr.length - 1]);
	                for (var k = 0; k < 5; k++) {
	                    if (k > rating) {
	                        document.getElementById("radio" + index + k).checked = false;
	                        continue;
	                    }
	                    document.getElementById("radio" + index + k).checked = true;
	                }
	                songs[index].rating = rating + 1;
	                update_song(i);
	            }
	            document.getElementById('block' + i).appendChild(radio);
	        }

	        var manage_tag = document.createElement('input');
	        manage_tag.type = 'button';
	        manage_tag.id = "managetag" + i;
	        manage_tag.value = "Manage tag";
	        manage_tag.className = "button";
	        manage_tag.onclick = function () {
	            document.getElementById('songdiv' + i).innerHTML = null;
	        	for (var j = 0; j < tags.length; j++) {
	        	    if (!tags[j]) continue;
            	    $('#songdiv' + i).append(tags[j]);
            		var checkbox = document.createElement('input');
                	checkbox.type = 'checkbox';
                	checkbox.id = "songtag" + i + j;
                	checkbox.checked = false;
                	if (songs[i].tags[j]) {
                	    checkbox.checked = true;
                	}
                	document.getElementById('songdiv' + i).appendChild(checkbox);
                	$('#songdiv' + i).append('  ');
            	}
            	var apply = document.createElement('input');
            	apply.type = 'button';
            	apply.value = "Apply";
            	apply.id = "apply" + i;
            	apply.className = "button";
            	apply.onclick = function () {
            	    songs[i].tags = new Array(tags.length);
            	    for (var j = 0; j < tags.length; j++) {
            	        songs[i].tags[j] = false;
            	        if (!tags[j]) continue;
            	        if (document.getElementById('songtag' + i + j).checked) {
            	            songs[i].tags[j] = true;
            	        }
            	    }
            	    document.getElementById('songdiv' + i).innerHTML = null;
            	    update_song(i);
            	}
            	document.getElementById("songdiv" + i).appendChild(apply);
	        };

	        var hidetag = document.createElement('input');
	        hidetag.type = 'button';
	        hidetag.id = "deletetag" + i;
	        hidetag.value = "Hide tag";
	        hidetag.className = "button";
	        hidetag.onclick = function () {
	            document.getElementById('songdiv' + i).innerHTML = null;
	        };

	        document.getElementById('block' + i).appendChild(manage_tag);
	        document.getElementById('block' + i).appendChild(hidetag);
	        var songdiv = document.createElement('div');
	        songdiv.id = "songdiv" + i;
	        document.getElementById('block' + i).appendChild(songdiv);
	        //$('#songdiv' + i).append('<br>');

	}
	function rating_filter(rating) {
	    //document.getElementById("Songs").innerHTML = null;
	    for (var i = 0; i < songs.length; i++) {
	        $('#block' + i).hide();
	        if (/*songs_rating[i]*/songs[i].rating >= rating) {
	            $('#block' + i).show();
	        }
	    }
	}
	function filter_all_tags(index) {
	    //document.getElementById("Songs").innerHTML = null;
	    for (var i = 0; i < songs.length; i++) {
	        //if (!song_to_tag[i] || !song_to_tag[i][index]) {
	        if (!songs[i].tags || !songs[i].tags[index]) {
	            $('#block' + i).hide();
	        }
	    }
	}
	function filter_any_tags(index) {
	    //document.getElementById("Songs").innerHTML = null;
	    for (var i = 0; i < songs.length; i++) {
	        //if (song_to_tag[i] && song_to_tag[i][index]) {
	        if (songs[i].tags && songs[i].tags[index]) {
	            $('#block' + i).show();
	        }
	    }
	}
	/*
	 * Export startApp to the window so it can be called from the HTML's
	 * onLoad event.
	 */
	exports.startApp = function() {
		console.log('start app.');

		console.log('location = ' + location);

		// Parse the URL to get access token, if there is one.
		var hash = location.hash.replace(/#/g, '');
		var all = hash.split('&');
		var args = {};
		all.forEach(function(keyvalue) {
			var idx = keyvalue.indexOf('=');
			var key = keyvalue.substring(0, idx);
			var val = keyvalue.substring(idx + 1);
			args[key] = val;
		});
		console.log('args', args);

		if (typeof(args['access_token']) == 'undefined') {
			$('#start').click(function() {
				doLogin(function() {});
			});
			$('#login').show();
			$('#loggedin').hide();
		} else {
			g_access_token = args['access_token'];
			loggedIn();
		}
	}

	exports.newtag = function() {
	   var tag_name = document.getElementById("num_text").value;
	   var not_exist = $.inArray(tag_name, tags) == -1;
	   if (tag_name && not_exist) {
	   	   tags.push(tag_name);
	   	   document.getElementById("tag").innerHTML = null;
	   	   for (var i = 0; i < tags.length; i++) {
	   	       if (!tags[i]) continue;
	   	       $('#tag').append(tags[i]);
	   	       //$('#tag').append(': ');
		       var checkbox = document.createElement('input');
    	       checkbox.type = 'checkbox';
    	       checkbox.id = "check" + i;
    	       document.getElementById('tag').appendChild(checkbox);
    	       $('#tag').append('  ');
	   	   }
       	   document.getElementById("num_text").value = null;
       	   $.post("http://localhost:3000/tags", {"tag[]": tags}, null, "json");
	   } else {
	       alert('Empty or duplicate tag');
	   }
	}

	exports.deletetag = function() {
   	    var tag_name = document.getElementById("num_text").value;
   	    var index = $.inArray(tag_name, tags);
   	    if (index >= 0) {
   	        tags[index] = null;
   	    }
   	    document.getElementById("tag").innerHTML = null;
	   	for (var i in tags) {
	   	    if (!tags[i]) continue;
	   	    $('#tag').append(tags[i]);
	   	    //$('#tag').append(': ');
		    var checkbox = document.createElement('input');
    	    checkbox.type = 'checkbox';
    	    checkbox.id = "check" + i;
    	    document.getElementById('tag').appendChild(checkbox);
    	    $('#tag').append('  ');
	   	}
	   	document.getElementById("num_text").value = null;
	   	$.post("http://localhost:3000/tags", {"tag[]": tags}, null, "json");
   	}
   	exports.applyrating = function() {
   	    for (var i = 0; i < 6; i++) {
   	        var checked = document.getElementById("r" + i).checked;
   	        if (checked) {
   	            rating_filter(i);
   	            return;
   	        }
   	    }
   	    rating_filter(0);
   	}
   	exports.applyalltags = function() {
   	    all = true;
	    for (var i = 0; i < songs.length; i++) {
	       $('#block' + i).show();
	    }
   	    for (var i = 0; i < tags.length; i++) {
   	        if (!tags[i]) continue;
   	        var chose = document.getElementById("check" + i).checked;
   	        if (chose) filter_all_tags(i);
   	    }
   	}
   	exports.applyanytags = function() {
   	    all = false;
	    for (var i = 0; i < songs.length; i++) {
	       $('#block' + i).hide();
	    }
	    var flag = true;
   	    for (var i = 0; i < tags.length; i++) {
   	        if (!tags[i]) continue;
   	        var chose = document.getElementById("check" + i).checked;
   	        if (chose) {
   	            filter_any_tags(i);
   	            flag = false;
   	        }
   	    }
   	    if (flag) {
   		    for (var i = 0; i < songs.length; i++) {
    	       $('#block' + i).show();
    	    }
   	    }
   	}
})(window);
