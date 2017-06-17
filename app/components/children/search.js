var React = require('react');
var helpers = require('../utils/helpers');

var socket = io();

var Search = React.createClass({

	getInitialState: function() {

		return {
			search_topic: '',
			start_year: '',
			end_year: '',
			nytdata: []
		}
		
	}, 

	changedData: function(event) {
		
		this.setState({[event.target.id]: event.target.value});

	}, 

	queryData: function(event) {

		event.preventDefault();
		
		helpers.searchNYT(this.state.search_topic, this.state.start_year, this.state.end_year)
			.then(function(data) {

				this.setState({nytdata: data});

		}.bind(this));

	}, 

	clickHandler: function(event) {

		event.preventDefault();	

		var socket_article_title = event.target.parentElement.children[2].innerHTML;

		socket.emit('message', socket_article_title);

		this.setState({
			article_to_save: {
				article_title: event.target.parentElement.children[2].innerHTML,
				article_url: event.target.parentElement.children[2].href,
				article_pub_date: event.target.parentElement.children[4].innerHTML
			}

		}, function() {
			
			helpers.postArticle(this.state.article_to_save);

			this.props.setArticles(this.state.search_topic);

		});	
	
	}, 

	socketIoConnection: function() {

		socket.on('message', function(article_to_emit) {

			var just_added = document.getElementById('just-added');

			just_added.innerHTML = '';

			var title_text_node = document.createTextNode('Title Added: ' + article_to_emit);

			just_added.appendChild(title_text_node);

		}); 

	}(),

	render: function() {
		
		return (

			<div className="container">

				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h2 id="testing">Search</h2>
								<span id="just-added"></span>
							</div>
							<div className="panel-body">
								<form>
									<div className="form-group">
										<label>Topic</label>
										<input type="text" className="form-control" id="search_topic" onChange={this.changedData} />
									</div>
									<div className="form-group">
										<label>Start Year</label>
										<input type="text" className="form-control" id="start_year" onChange={this.changedData} />
									</div>
									<div className="form-group">
										<label>End Year</label>
										<input type="text" className="form-control" id="end_year" onChange={this.changedData} />
									</div>
									<a href="" className="btn btn-primary" onClick={this.queryData} >Submit</a>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h2>Results</h2>
							</div>
							<div className="panel-body" onClick={this.clickHandler}>

								{this.state.nytdata.map(function(article, i) {

									return <p key={i}><a href="" className="btn btn-primary">Save</a> <a href={article.url}>{article.title}</a> <span>{article.pub_date}</span></p>

								})}

							</div>
						</div>
					</div>
				</div>

			</div>

		)

	} 

}); 

module.exports = Search;