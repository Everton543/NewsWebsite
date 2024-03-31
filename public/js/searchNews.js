$(document).ready(function() {
    searchNews();
    $("#searchButton").click(searchNews);
});

function searchNews(){
    const country = $('#country').val();
    const query = $('#query').val();
    const requestUrl = baseUrl(`api/news/${country}`);
    $('#newsList').html('loading...');
    $.ajax({
        url: requestUrl,
        type: 'GET',
        data: {
            query: query
        },
        success: function(data) {
            let html = '';
            if(data){
                let author = '';
                let image = '';
                let date = '';
                let subtitle = '';
                data.forEach((news, index) => {
                    author = '';
                    image = '';
                    date = '';
                    subtitle = '';
                    if(news.author != null){
                        subtitle = `${news.author}: `;
                    }
    
                    if(news.publishedAt != null){
                        const publishedDate = new Date(news.publishedAt);
                        const year = publishedDate.getFullYear();
                        const month = publishedDate.getMonth() + 1; 
                        const day = publishedDate.getDate();
                    
                        if (country != 'br') {
                            date = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
                        } else {
                            date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                        }
                        subtitle += `${date}`;
                    }
    
                    if(news.urlToImage != null){
                        image = `<img src="${news.urlToImage}" loading="lazy"/>`;
                    }
    
                    if(news.description  == null){
                        if (news.content != null && news.content.length <= 100) {
                            news.description = news.content;
                        } else if(news.content != null) {
                            news.description = news.content.substring(0, 100) + '...';
                        } else{
                            news.description = '';
                        }
                    }
                    html += `
                        <div id="new_${index}">
                            <h2>${news.title}</h2>
                            <h3>${subtitle}</h3>
                            ${image}
                            <p>${news.description}</p>
                        </div>
                    `;
                });
            }

            if(html == ''){
                html = 'No result';
            }

            $('#newsList').html(html);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching news:', error);
            $('#newsList').html('Sorry we got an error...');
        }
    });
}

function baseUrl(parameters = ''){
    const protocol = window.location.protocol;
    const host = window.location.host;
    let baseUrl = `${protocol}//${host}`;
    if(parameters != ''){
        baseUrl += `/${parameters}`;
    }
    return baseUrl;
}