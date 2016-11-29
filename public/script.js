console.log('script loaded!')


getSingleInfo = function(data) {
    $.ajax({
            url: "https:api.foursquare.com/v2/venues/explore?client_id=ZNEGNE4KLQ5OW03GEGIIDCS0XCZFCQE01S04NJVAN5R5LPCY&client_secret=CYYND5AXCAJ1SMQDNPZBHODBX1OEX3SQY4RBLPQKDAPXHQGT&near="+ll+",NY &sortByDistance=1&radius=500&query=+"+restaurant+"&v=20161124&m=foursquare",
            method: 'GET'
        })
        .done(function(data) {
          appendResults(data);
          URL =  "https:api.foursquare.com/v2/venues/explore?client_id=ZNEGNE4KLQ5OW03GEGIIDCS0XCZFCQE01S04NJVAN5R5LPCY&client_secret=CYYND5AXCAJ1SMQDNPZBHODBX1OEX3SQY4RBLPQKDAPXHQGT&near="+ll+",NY &sortByDistance=1&radius=500&query=+"+restaurant+"&v=20161124&m=foursquare"
          console.log(URL)
        })
}
$('#submit_button').click(function(event) {
    event.preventDefault();
    restaurant = $('input').val();
    ll = $('select').val();
    getSingleInfo(restaurant);
})


appendResults = function(data){
  result = data.response.groups[0]
  for(i=0;i<10;i++){
    resultDiv = $('<div></div>')
    results = $('<ul></ul>');
    item = $('<li></li>');
    itemAddress = $('<li></li>');
    itemPrice = $('<li></li>');
    itemRating = $('<li></li>');
    itemHours = $('<li></li>');
    name = result.items[i].venue.name;
    address = data.response.groups[0].items[i].venue.location.formattedAddress[0] + data.response.groups[0].items[i].venue.location.formattedAddress[1] + data.response.groups[0].items[i].venue.location.formattedAddress[2];
    //ADD ICON!
    price = data.response.groups[0].items[i].venue.price.message + data.response.groups[0].items[i].venue.price.tier;
    rating = data.response.groups[0].items[i].venue.rating + data.response.groups[0].items[i].venue.ratingColor;
    item.text(name);
    itemAddress.text(address);
    itemPrice.text(price);
    itemRating.text(rating);
    addMeButton = $('<button class="addme">Add Me!</button>');
    results.append(addMeButton);
    results.append(item);
    results.append(itemAddress);
    results.append(itemPrice);
    results.append(itemRating);
    results.append(itemHours);
    resultDiv.append(results);
    $('body').append(resultDiv);
  }
  $('.addme').click(function(event){
    console.log('you clicked')
  })

}

