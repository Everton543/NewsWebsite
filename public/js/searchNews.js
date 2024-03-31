$(document).ready(function() {
    searchNews();
});

function searchNews(){
    const country = $('#country').val();
    const requestUrl = baseUrl(`api/news/${country}`);
    $('#newsList').html('loading...');
    $.ajax({
        url: requestUrl,
        type: 'GET',
        success: function(data) {
            console.log('Success:', data);
            let html = '';
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
                    const month = publishedDate.getMonth() + 1; // getMonth() retorna um valor de 0 a 11
                    const day = publishedDate.getDate();
                
                    if (country != 'br') {
                        // Formato americano: MM/DD/YYYY
                        date = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
                    } else {
                        // Formato brasileiro: DD/MM/YYYY
                        date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
                    }
                    subtitle += `${date}`;
                }


                

                if(news.urlToImage != null){
                    image = `<img src="${news.urlToImage}"/>`;
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
                $('#newsList').html(html);
            });
            
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