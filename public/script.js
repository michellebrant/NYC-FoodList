getAllInfo = function(data) {
    $.ajax({
            url: "https://api.foursquare.com/v2/venues/explore?client_id=ZNEGNE4KLQ5OW03GEGIIDCS0XCZFCQE01S04NJVAN5R5LPCY&client_secret=CYYND5AXCAJ1SMQDNPZBHODBX1OEX3SQY4RBLPQKDAPXHQGT&near="+ll+",NY &sortByDistance=1&radius=500&query=+"+restaurant+"&v=20161124&m=foursquare",
            method: 'GET'
        })
        .done(function(data) {
          appendResults(data);
        })
}
$('#submit_button').click(function(event) {
    event.preventDefault();
    restaurant = $('#restaurant-entered').val()
    restaurant = restaurant.split(' ');
    restaurant = restaurant.join('%20')
    ll = $('select').val();
    ll = ll.split(' ');
    ll = ll.join("%20")
    getAllInfo(restaurant);
})

$('#clear').click(function(event) {
   $('.col-md-6').remove();
})

// $('.dropdown-toggle').dropdown()

$('li').mouseover(function(event){
  $(this).addClass('active')
})

$('li').mouseout(function(event){
  $('li').removeClass('active')
})

appendResults = function(data){
  result = data.response.groups[0]
  for(i=0;i<10;i++){
    resultDiv = $('<div class="col-md-6"></div>')
    results = $('<ul></ul>');
    item = $('<li></li>');
    itemAddress1 = $('<li></li>');
    itemAddress2 = $('<li></li>');
    itemAddress3 = $('<li></li>');
    itemPrice = $('<li></li>');
    itemRating = $('<li></li>');
    itemHours = $('<li></li>');
    name = result.items[i].venue.name;
    namer = JSON.stringify(name)
    namer = namer.split(' ');
    namer = namer.join('%20');
    namer = namer.replace('"', '');
    namer = namer.replace('"', '');
    address1 = data.response.groups[0].items[i].venue.location.formattedAddress[0];
    address2 = data.response.groups[0].items[i].venue.location.formattedAddress[1];
    address3 = data.response.groups[0].items[i].venue.location.formattedAddress[2];
    // src = data.response.groups[0].items[i].venue.categories[0].icon.prefix+ data.response.groups[0].items[i].venue.categories[0].icon.suffix
    // icon = $('<img src='+src+'>')
    // price = data.response.groups[0].items[i].venue.price.message + data.response.groups[0].items[i].venue.price.tier;
    rating = data.response.groups[0].items[i].venue.rating
    ratingColor = data.response.groups[0].items[i].venue.ratingColor;
    // item.text(name);
    itemAddress1.text(address1 + ' ');
    itemAddress2.text(address2 + ' ');
    itemAddress3.text(address3 + ' ');
    // itemPrice.text(price);
    itemRating.text('Rating: '+rating);
    itemRating.css('color', '#'+ratingColor)
    addMeLink = $("<a href=/"+ll+'/'+namer+'>'+name+"</a>");
    results.append(addMeLink);
    results.append(item);
    results.append(itemAddress1);
    results.append(itemAddress2);
    results.append(itemAddress3);
    // results.append(itemPrice);
    results.append(itemRating);
    results.append(itemHours);
    resultDiv.append(results);
    $('body').append(resultDiv);
  }


}





