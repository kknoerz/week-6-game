$(document).ready(function() {
    // debugger;
    var buttonDepot = [
        'monkey',
        'owl',
        'koala',
        'deer',
        'seal',
        'hummingbird',
        'killer whale',
        'chameleon',
        'horse',
        'coyote',
        'brown bear',
        'gazelle',
        'bear',
        'ocelot',
        'reindeer',
        'turtle',
        'rabbit',
        'cat',
        'gorilla',
        'pig',
        'dog',
        'chipmunk',
        'beaver',
        'antelope',
        'squirrel',
        'black bear',
        'raccoon',
        'rhinoceros',
        'moose',
        'blue Jay',
        'iguana'
        ]

    var buttonMaker = function() {
        for (j=0;j<buttonDepot.length;j++) {
            var button = $('<button class="another">').text(buttonDepot[j]);
            $('#button-field').append(button);  
        }
    }

    buttonMaker();

    

    $('#click').on('click', function(){
        debugger;
        var another = $('#guess').val();
        buttonDepot.push(another)
        var button = $('<button class="another">').text(another);
        $('#button-field').append(button);
    })

    
    $(document).on('click','.another', function(){

        $('.gif').remove()
	
    debugger;
        
        var select = $(this).text()
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + select + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

            	console.log(response)
            	var results = response.data

               
                for (i=0; i<results.length; i++){
            		// debugger;

                    var gif = $('<div class=gif>').attr('data-value', i);
                   
                    
                    var p = $('<p class="rating">').text('rating: '+results[i].rating);

                    var searchImage = $('<img class="image">').attr('src',results[i].images.fixed_height_small_still.url);
            		searchImage.css('margin', '2px').attr('data-name', results[i].id);
                    
                     $('#GIF-field').prepend(gif.append(searchImage).append(p));
                     console.log('initial still for image# '+i+' url: '+results[i].images.fixed_height_small_still.url)

            	}
                
            })

        });

    $('#clear').on('click', function(){
        
        $('.gif').remove()
    });
    
    $(document).on('click', '.image', function() { //api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&ids=feqkVgjJpYtjy,7rzbxdu0ZEXLy
        // debugger;
        var queryURL = "http://api.giphy.com/v1/gifs?&api_key=dc6zaTOxFJmzC&limit=10&ids="+ $(this).attr('data-name');
        var thisImageUrl = $(this).attr('src')
        var parentDivValue = $(this).parent('div').attr('data-value')
        $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .done(function(response) {
                    debugger;
            var still = response.data[0].images.fixed_height_small_still.url
            var moving = response.data[0].images.fixed_height_small.url
            
            if(thisImageUrl == still) {
                // debugger
                thisImageUrl = moving
                $('div[data-value='+parentDivValue+']').children('.image').attr('src', thisImageUrl)
            }else if (thisImageUrl == moving){
                thisImageUrl = still
                $('div[data-value='+parentDivValue+']').children('.image').attr('src', thisImageUrl)
            }



                
        });
    });







}); // *********************jQuery closing tag do not delete 