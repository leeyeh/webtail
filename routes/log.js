
/*
 * get log & add log
 */

module.exports = function(io) {
    return {
        show: function(req, res){
            res.render('index', { title: req.params.key });
        },

        add: function(req, res){
            console.log("Log Recieved: [" + req.params.key + "]", req.body.content);
            res.send(req.params.key + " recieved\r\n");
            io.sockets.clients().forEach(function(client) {
                client.emit('log', req.body.content);
            });
        }
    };
};
