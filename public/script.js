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
  results = $('<ul></ul>');
  for(i=0;i<100;i++){
    item = $('<li></li>');
    name = result.items[i].venue.name;
    item.text(name);
    results.append(item);
    $('body').append(results);
  }


}

// //name of restaurant
// console.log(data.response.groups[0].items[0].venue.name)
// //address line 1, 2, 3
// console.log(data.response.groups[0].items[0].venue.location.formattedAddress[0])
// console.log(data.response.groups[0].items[0].venue.location.formattedAddress[1])
// console.log(data.response.groups[0].items[0].venue.location.formattedAddress[2])
// //icon
// console.log(data.response.groups[0].items[0].venue.categories[0].icon.prefix + data.response.groups[0].items[0].venue.categories[0].icon.suffix)
// //price
// console.log(data.response.groups[0].items[0].venue.price.currency)
// console.log(data.response.groups[0].items[0].venue.price.message)
// console.log(data.response.groups[0].items[0].venue.price.tier)
// //rating
// console.log(data.response.groups[0].items[0].venue.rating)
// console.log(data.response.groups[0].items[0].venue.ratingColor)
// //hours
// console.log(data.response.groups[0].items[0].venue.hours.status)
// console.log(data.response.groups[0].items[0].venue.hours.isOpen)



