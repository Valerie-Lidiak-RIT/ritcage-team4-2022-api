// This document has several examples for how to make different kinds of routes. For most routes, you should just be able to copy these and replace the info in the brackets [] according to what you need. The original files don't use ay [] characters except in "results:object[])" and in "req.params['variable']", so other than that its definitely from me. At the end is an example without all my bracket additions, so that you have a clear idea of how it needs to be in the final file.

// this example is if you aren't taking any variable from the request.
app.get("[path. This can be anything, as long as it doesn't intake a variable (a variable is a colon and text after it, such as :typeID) For example: /item_type]", async (req, res) => {
	const query = '[This is where the mysql query goes. If you don't know what mysql query to put, consult Rachel, Valerie, or any online resource. Example: SELECT * FROM item_type]';
	mysql.query(query, (err:Error, results:object[])=>{
		if(err){
			res.status(400).json({
				ok: false,
				err,
			});
		}
		else {
			res.json({
				ok: true,
				[You can make this anything. I'll just make it the name of the table. For example: item_type]: results
			});
		}
	});
})

// This example is if you're taking in eactly one variable on the route
app.get("[path. This one should intake a variable, so you will want to have the unique path and then a /: and the name of the variable. for example: /item_type/type/all/:typeID]", async (req, res) => {
	let id = req.params["[this would be the name of the variable, and it has to match the path. For example: typeID]"];
	const query = '[Mysql query. In this case you probably want to do something with the variable taken in. For Example: SELECT * FROM item_type WHERE typeid = ' + id];
	mysql.query(query, (err:Error, results:object[])=>{
		if(err){
			res.status(400).json({
				ok: false,
				err,
			});
		}
		else {
			res.json({
				ok: true,
				[You can make this anything. I'll just make it the name of the table. For example: item_type: results
			});
		}
	});
})

// This exmaple is if you want to pass multiple variables to a route, such as if you want to search by multiple categories, or of you want to add an entry to a page. 
app.post("[Here goes the path. You don't take in any variables here, so no /: variable name. For Example: /item_type/addItem]", async (req, res) => {
	const query = '[MySQL Query. When you want to use the variables taken in, you have to use 'req.body.[variable name]'. For example: INSERT INTO item_type (name, model, description, cost) VALUES ("' + req.body.name + '", "' + req.body.model + '", "' + req.body.description + '", "' + req.body.cost + '")]'
	mysql.query(query, (err:Error, results:object[])=>{
		if(err){
			res.status(400).json({
				ok: false,
				err,
			});
		}
		else {
			res.json({
				ok: true,
				[You can make this anything. I'll just make it the name of the table. For example: item_type]: results
			});
		}
	});
})

// This path is for if you want to update an existing entry
app.patch("[path. You won't take in a variable in the path. For example: /borrower_item/pickup]", async (req, res) => {
	const query = '[Mysql Query. You'll use update. SET specifies the variable or variables you want to update, and Where is how you specify which entry to update. Use the req.body.[variable] variables. For example: UPDATE borrower_item SET checkout = "' + req.body.checkout + '" WHERE reservationID = ' + req.body.reservationID];
	mysql.query(query, (err:Error, results:object[])=>{
		if(err){
			res.status(400).json({
				ok:false,
				err,
			});
		}
		else { 
			res.json({
				ok:true,
				[You can make this anything. I'll just make it the name of the table. For example: borrower_item]: results
			});
		}
	});
})

// This path is for if you want to delete an entry with a route
app.delete("[path. This won't have a variable since you will likely be taking in multiple variables. For example: /itemKitContent/removeItem]", async (req, res) => {
	const query = '[Mysql query. You're gonna use DELETE FROM for this and specify the entry you want to delete with the req.body.[variale] variables. For example: DELETE FROM itemKitContent WHERE typeID = ' + req.body.typeID + ' AND kitID = ' + req.body.kitID];
	mysql.query(query, (err:Error, results:object[])=>{
		if(err){
			res.status(400).json({
				ok: false,
				err,
			});
		}
		else {
			res.json({
				ok: true,
				[You can make this anything. I'll just make it the name of the table. For example: itemkitContent]: results
			});
		}
	});
})

// ______________________________________________________________________________________________________________________________
// Ok here is what these routes would look like without my comments. This section is syntactly correct and would work if copy and pasted into a routes.ts file.

	app.get("/item_type", async (req, res) => {
		const query = 'SELECT * FROM item_type';
		mysql.query(query, (err:Error, results:object[])=>{
			if(err){
				res.status(400).json({
					ok: false,
					err,
				});
			}
			else {
				res.json({
					ok: true,
					item_type: results
				});
			}
		});
	})

	app.get("/item_type/type/all/:typeID", async (req, res) => {
		let id = req.params["typeID"];
		const query = 'SELECT * FROM item_type WHERE typeid = ' + id;
		mysql.query(query, (err:Error, results:object[])=>{
			if(err){
				res.status(400).json({
					ok: false,
					err,
				});
			}
			else {
				res.json({
					ok: true,
					item_type: results
				});
			}
		});
	})

	app.post("/item_type/addItem", async (req, res) => {
		const query = 'INSERT INTO item_type (name, model, description, cost) VALUES ("' + req.body.name + '", "' + req.body.model + '", "' + req.body.description + '", "' + req.body.cost + '")'
		mysql.query(query, (err:Error, results:object[])=>{
			if(err){
				res.status(400).json({
					ok: false,
					err,
				});
			}
			else {
				res.json({
					ok: true,
					item_type: results
				});
			}
		});
	})
	
	app.patch("/borrower_item/pickup", async (req, res) => {
		const query = 'UPDATE borrower_item SET checkout = "' + req.body.checkout + '" WHERE reservationID = ' + req.body.reservationID;
		mysql.query(query, (err:Error, results:object[])=>{
			if(err){
				res.status(400).json({
					ok:false,
					err,
				});
			}
			else { 
				res.json({
					ok:true,
					borrower_item: results
				});
			}
		});
	})
	
	app.delete("/itemKitContent/removeItem", async (req, res) => {
		const query = 'DELETE FROM itemKitContent WHERE typeID = ' + req.body.typeID + ' AND kitID = ' + req.body.kitID;
		mysql.query(query, (err:Error, results:object[])=>{
			if(err){
				res.status(400).json({
					ok: false,
					err,
				});
			}
			else {
				res.json({
					ok: true,
					itemkitContent: results
				});
			}
		});
	})
