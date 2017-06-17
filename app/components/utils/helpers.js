var axios = require('axios');

var helpers = {
	
	searchNYT: function(searchTopic, startYear, endYear) {

		var nytAPI = 'e07fb835a80a45939b9f50b1a9280627';
		
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=";
			queryURL += searchTopic;
			queryURL += "&begin_date=" + startYear + "0101";
			queryURL += "&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(nytdata) {

				var articles = nytdata.data.response.docs;

				var articles_obj_array = articles.map(function(article) {
					var articlesObj = {
						title: article.headline.main,
						pub_date: article.pub_date,
						url: article.web_url
					};
					return articlesObj;
				});

				return articles_obj_array;
		}); 

	}, 

	postArticle: function(article_to_post) {
		
		return axios.post('/api',article_to_post)
			.then(function(response) {

		});

	}, 

	getArticles: function() {
		
		return axios.get('/api')
			.then(function(response) {

				return response;
		}); 

	}, 

	deleteArticle: function(article_id) {

		
		return axios.post('/api/delete/', article_id)
			.then(function(response) {

				return response;

			}); 
	} 

} 

module.exports = helpers;