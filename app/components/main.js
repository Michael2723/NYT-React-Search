var React = require('react');
var Search = require('./Children/Search');
var Saved = require('./Children/Saved');
var helpers = require('./utils/helpers');

var Main = React.createClass({

	socketio: io(),

	getInitialState: function() {

		return {
			topic: '',
			articles: [],
			article_deleted: {}
		}
	},

	setArticles: function(search_topic) {

		this.setState({
			topic: search_topic
		});
	}, 

	setDeleteArticles: function(article_deleted) {

		this.setState({
			article_deleted: article_deleted
		});

	}, 

	getArticlesFromHelpers: function() {
		
		helpers.getArticles()
			.then(function(response) {

				this.setState({
					articles: response.data
				})
				
		}.bind(this)); 
	}, 

	componentDidUpdate: function() {
		
		this.getArticlesFromHelpers();

	}, 

	componentDidMount: function() {
		
		this.getArticlesFromHelpers();

	}, 

	render: function() {
		
		return (

			<div>

				<div className="jumbotron">
					<div className="container">
						<h1>New York Times Article Scrubber</h1>
						<p>Search for and annotate articles of interest!</p>
					</div>
				</div>

				<div className="search">
				
					<Search setArticles={this.setArticles} />
				}
				</div>

				<div className="saved">
					<Saved 
						articles={this.state.articles}
						setDeleteArticles={this.setDeleteArticles} />
				</div>

			</div>

		);
	}

});

module.exports = Main;