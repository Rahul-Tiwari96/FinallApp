var express = require('express');
var router = express.Router();
var Repositories=require("../models/Repositories");
var DBConnection=require('../Connection/DBConnection');
DBConnection();

//Adding the repositories in the database

router.route('/AddRepositories').post(isLoggedIn, function(req,res,next){
	if(req.body){
		var RepositoryVar = new Repositories(req.body);
		console.log(req.body);
		console.log(RepositoryVar);
		RepositoryVar.save(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("Repository added");
				res.send("Repository Added");
			}
		});
	}
});

router.route('/GetCategoryOptions').get(isLoggedIn, function(req,res,next){
	var List=[];
	Repositories.find({}, {Category:true, _id:false}, function(err,docs){
		if(err){
			res.send(err);
		}
		else{
			var index=0;
			docs.forEach(function(data,err){
				 index=List.findIndex(function(element){
				 	return element===data.Category;
				});
				 console.log(index);
				 if(index===-1){
				List.push(data.Category);
				console.log(List);
			}
			});
			res.send(List);
			}
	});
});

router.route('/GetCategoryFavourites').post(isLoggedIn, function(req,res,next){
	if(req.body){
	console.log(typeof req.body.category);
	Repositories.find({Category:req.body.category}, function(err, docs){
		if(err){
			console.log('error');
			res.send(err);
		}
		else{
			console.log(docs);
			res.json(docs);
		}
	});

	}
});
function isLoggedIn(req,res,next){

 if(req.isAuthenticated()){
 	console.log("Inside isLoggedIn");
   return next();
 }
 else{
 	console.log("Inside isLoggedIn Notlogin");
   res.json('not authenticated');
 }
}
module.exports=router;
