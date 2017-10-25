function returnCard(title,content,link){
    return '<div class="card bg-dark mb-3">'+
            '<div class="card-body text-light">'+
            '<h4 class="card-title text-center">'+title+'</h4>'+                           
            '<p class="card-text text-justify">'+content+'</p>'+
            '<a href="'+link+'"class="card-link" target="_blanck">See more ...</a></div></div>'
}

function getResult(){
    var searchText = $('#search-box').val();
    if(searchText){
        $.ajax({
            url:'https://en.wikipedia.org/w/api.php?action=opensearch&search='+searchText+'&format=json&callback=?',
            type:"GET",
            dataType:'json',
            success:function(data){ 
                for(var i=0;i<data[1].length;i++){
                    $('#results').append(returnCard(data[1][i],data[2][i],data[3][i])) ; 
                }
            }
        });
    }else{
        $('#exampleModal').modal();
    }  
}
function resetSearch(){
    $('#results').empty();
    getResult();
}

$(function(){
    $('#btn-search').on('click',getResult);
    $('#search-box').keypress(function(event){
        if(event.keyCode==13){
           resetSearch();
        }
    });
});