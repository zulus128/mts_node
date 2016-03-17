/**
 * Created by vadimkassin on 2/26/16.
 */

var mysql = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

    router.get("/",function(req,res) {

        res.json({"Message" : "Hello World !"});
        console.log("Hello World !");
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["user_login"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.get("/instruments",function(req, res) {
        var query = "SELECT * FROM ?? WHERE visible = 1";
        var table = ["instrument"];
        query = mysql.format(query, table);
        connection.query(query,function(err, rows) {
            //console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/marketbook/:instr_id",function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["market_book", "instr_id", req.params.instr_id];
        query = mysql.format(query, table);
        connection.query(query,function(err, rows) {
            //console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/marketbook",function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["market_book", "instr_id", 1];
        //console.log(req.params)
        query = mysql.format(query, table);
        connection.query(query,function(err, rows) {
            //console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/daychart/:instr_id",function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=? limit 30";
        var table = ["chart_day", "instr_id", req.params.instr_id];
        query = mysql.format(query, table);
        connection.query(query,function(err, rows) {
            //console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/weekchart/:instr_id",function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=? limit 30";
        var table = ["chart_week", "instr_id", req.params.instr_id];
        query = mysql.format(query, table);
        connection.query(query,function(err, rows) {
            //console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

    router.get("/monthchart/:instr_id",function(req, res) {
        var query = "SELECT * FROM ?? WHERE ??=? limit 30";
        var table = ["chart_month", "instr_id", req.params.instr_id];
        query = mysql.format(query, table);
        connection.query(query,function(err, rows) {
            //console.log(rows);
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "data" : rows});
            }
        });
    });

}

module.exports = REST_ROUTER;