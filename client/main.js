import './main.html';

var networkTSP, nodesTSP, edgesTSP;
var networkVC, nodesVC, edgesVC;
var networkKB, nodesKB, edgesKB;
var networkCli, nodesCli, edgesCli;
var totalPathCost;

Template.main.helpers({
});

function print(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    };
}

function getEdgesOfNodeTSP(nodeId) {
    return edgesTSP.filter(function (edge) {
        return edge.from === nodeId || edge.to === nodeId;
    });
}

function shortestDistanceFromNode(edges, node) {
    var shortestPathNode, shortestPathValue;
    console.log('***************');
    console.log(edges);
    //Validar cuando el tamano del arreglo es 1
    var longitud;
    for (var i = 0; i < edges.length-1; i++) {
        if(i == 0){
            shortestPathValue = edges[i].value;
            if(node != edges[i].to)
                shortestPathNode = edges[i].to;
            else
                shortestPathNode = edges[i].from;
        }
        if(shortestPathValue > edges[i+1].value){
            if(node != edges[i+1].to)
                shortestPathNode = edges[i+1].to;
            else
                shortestPathNode = edges[i+1].from;
            shortestPathValue = edges[i+1].value;
        }
    };
    if(edges.length == 1){
        for (var i = 0; i < edges.length; i++) {
            if(node != edges[i].to)
                shortestPathNode = edges[i].to;
            else
                shortestPathNode = edges[i].from;
            shortestPathValue = edges[i].value;
        };
    }
    console.log('shortestPathValue');
    console.log(shortestPathValue);
    console.log(shortestPathValue+shortestPathValue);
    console.log('shortestPathNode');
    console.log(shortestPathNode);
    if(!isNaN(shortestPathValue))
        totalPathCost+=parseInt(shortestPathValue);
    return shortestPathNode;
}

Template.main.events({
    'click #recorrerTSP'(e){
        console.log(networkTSP.getConnectedNodes(0));
        console.log(getEdgesOfNodeTSP(3));
        console.log(shortestDistanceFromNode(getEdgesOfNodeTSP(3), 3));
        console.log(edgesTSP);
        var currentNode = 0;
        var visitedNodes = [];
        var unvisitedNodes = [];
        totalPathCost = 0;
        //llenando nodos no visitados
        for (var i = 0; i < nodesTSP.length; i++) {
            unvisitedNodes.push(nodesTSP[i].id);
        };
        //Mientras no se hayan visitados todos los nodos
        console.log('/////////');
        console.log('/////////');
        while(visitedNodes.length != nodesTSP.length){
            visitedNodes.push(currentNode);
            /*console.log('visitedNodes');
            console.log(visitedNodes);
            console.log(networkTSP);
            console.log(networkTSP.edges);*/
            // arr = arreglo de vertices
            var arr = $.map(networkTSP.edges, function(value, index) {
                return [value];
            });
            // consiguiendo el nodo
            /*console.log('nodo');
            console.log(nodo);*/
            //totalPathCost+=nodo.value;
            /*console.log('totalPathCost');
            console.log(totalPathCost);
            console.log(unvisitedNodes);*/
            for (var i = 0; i < unvisitedNodes.length; i++) {
                if(unvisitedNodes[i] == currentNode){
                    unvisitedNodes.splice(i, 1);
                    break;
                }
            };
            //console.log(unvisitedNodes);
            var edges = getEdgesOfNodeTSP(currentNode);
            console.log('currentNode');
            console.log(currentNode);
            /*console.log('edges');
            console.log(edges);
            print(edges);
            console.log('visitedNodes');
            console.log(visitedNodes);
            print(visitedNodes);*/
            for (var i = 0; i < visitedNodes.length; i++) {
                for (var j = 0; j < edges.length; j++) {
                    if((visitedNodes[i] == edges[j].to && currentNode != edges[j].to) || (visitedNodes[i] == edges[j].from && currentNode != edges[j].from))
                        edges.splice(j,1);
                };
            };
            /*console.log('edges');
            console.log(edges);
            print(edges);*/
            /*console.log('currentNode');
            console.log(currentNode);*/
            currentNode = shortestDistanceFromNode(edges, currentNode);
            //console.log(currentNode);
            /*while( jQuery.inArray( currentNode, visitedNodes ) != -1 ){
                console.log(jQuery.inArray( currentNode, visitedNodes ));
                currentNode = shortestDistanceFromNode(getEdgesOfNodeTSP(currentNode), currentNode);
            }*/
        }
        console.log(visitedNodes);
        console.log(totalPathCost);
    }
});

Template.main.onCreated(function () {
});

Template.main.onRendered(function () {
        nodesTSP = [];
        edgesTSP = [];
        nodesVC = [];
        edgesVC = [];
        nodesKB = [];
        edgesKB = [];
        nodesCli = [];
        edgesCli = [];

        var connectionCount = [];
        var connectionCountVC = [];
        var connectionCountKB = [];
        var connectionCountCli = [];

        // randomly create some nodes and edges
        //var nodeCount = document.getElementById('nodeCount').value;

        var nodeCount = 10; //TSP
        var nodeCount2 = 6; //Vertex Cover
        var nodeCount3 = 8; //K-biconexo
        var nodeCount4 = 5; //Clique
        for (var i = 0; i < nodeCount; i++) {
            nodesTSP.push({
                id: i,
                label: String(i)
            });
            connectionCount[i] = 0;
        }

        for (var i = 0; i < nodeCount2; i++) {
            nodesVC.push({
                id: i,
                label: String(i)
            });
            connectionCountVC[i] = 0;
        }

        for (var i = 0; i < nodeCount3; i++) {
            nodesKB.push({
                id: i,
                label: String(i)
            });
            connectionCountKB[i] = 0;
        }

        for (var i = 0; i < nodeCount4; i++) {
            nodesCli.push({
                id: i,
                label: String(i)
            });
            connectionCountCli[i] = 0;
        }


        for (var i = 0; i < nodesTSP.length; i++) {
            for (var j = 0; j < nodesTSP.length; j++) {
                var edgeVerfifiacion1 = {from: i, to: j};
                var edgeVerfifiacion2 = {from: j, to: i};
                var foundEdgeVerfifiacion = edgesTSP.filter(function( edge ) {
                    return (edge.from == edgeVerfifiacion1.from && edge.to == edgeVerfifiacion1.to) || (edge.from == edgeVerfifiacion2.from && edge.to == edgeVerfifiacion2.to);
                });
                if(nodesTSP[i] != nodesTSP[j] && foundEdgeVerfifiacion.length == 0 ){
                    var from = i;
                    var to = j;
                    //console.log('from = ' + i + ' to = ' + j);
                    var conn = edgesTSP.length * 2;
                    var rand = Math.floor(Math.random() * conn);
                    edgesTSP.push({
                        from: from,
                        to: to,
                        value: rand,
                        label: rand
                    });
                    connectionCount[from]++;
                    connectionCount[to]++;
                }
            }
        }

        for (var i = 0; i < nodesVC.length; i++) {
            for (var j = 0; j < nodesVC.length; j++) {
                var edgeVerfifiacion1 = {from: i, to: j};
                var edgeVerfifiacion2 = {from: j, to: i};
                var foundEdgeVerfifiacion = edgesVC.filter(function( edge ) {
                    return (edge.from == edgeVerfifiacion1.from && edge.to == edgeVerfifiacion1.to) || (edge.from == edgeVerfifiacion2.from && edge.to == edgeVerfifiacion2.to);
                });
                if(nodesTSP[i] != nodesTSP[j] && foundEdgeVerfifiacion.length == 0 ){
                    var from = i;
                    var to = j;
                    //console.log('from = ' + i + ' to = ' + j);
                    var conn = edgesVC.length * 2;
                    var rand = Math.floor(Math.random() * conn);
                    edgesVC.push({
                        from: from,
                        to: to,
                        value: rand,
                        label: rand
                    });
                    connectionCountVC[from]++;
                    connectionCountVC[to]++;
                }
            }
        }

        for (var i = 0; i < nodesKB.length; i++) {
            for (var j = 0; j < nodesKB.length; j++) {
                var edgeVerfifiacion1 = {from: i, to: j};
                var edgeVerfifiacion2 = {from: j, to: i};
                var foundEdgeVerfifiacion = edgesKB.filter(function( edge ) {
                    return (edge.from == edgeVerfifiacion1.from && edge.to == edgeVerfifiacion1.to) || (edge.from == edgeVerfifiacion2.from && edge.to == edgeVerfifiacion2.to);
                });
                if(nodesKB[i] != nodesKB[j] && foundEdgeVerfifiacion.length == 0 ){
                    var from = i;
                    var to = j;
                    //console.log('from = ' + i + ' to = ' + j);
                    var conn = edgesKB.length * 2;
                    var rand = Math.floor(Math.random() * conn);
                    edgesKB.push({
                        from: from,
                        to: to,
                        value: rand,
                        label: rand
                    });
                    connectionCountKB[from]++;
                    connectionCountKB[to]++;
                }
            }
        }

        for (var i = 0; i < nodesCli.length; i++) {
            for (var j = 0; j < nodesCli.length; j++) {
                var edgeVerfifiacion1 = {from: i, to: j};
                var edgeVerfifiacion2 = {from: j, to: i};
                var foundEdgeVerfifiacion = edgesCli.filter(function( edge ) {
                    return (edge.from == edgeVerfifiacion1.from && edge.to == edgeVerfifiacion1.to) || (edge.from == edgeVerfifiacion2.from && edge.to == edgeVerfifiacion2.to);
                });
                if(nodesCli[i] != nodesCli[j] && foundEdgeVerfifiacion.length == 0 ){
                    var from = i;
                    var to = j;
                    //console.log('from = ' + i + ' to = ' + j);
                    var conn = edgesCli.length * 2;
                    var rand = Math.floor(Math.random() * conn);
                    edgesCli.push({
                        from: from,
                        to: to,
                        value: rand,
                        label: rand
                    });
                    connectionCountCli[from]++;
                    connectionCountCli[to]++;
                }
            }
        }


        // create a network
        var container = document.getElementById('visualizationTSP');
        var data = {
            nodes: nodesTSP,
            edges: edgesTSP
        };
        var options = {
            stabilize:true,
            edges : {
                fontStrokeWidth : 1,
                fontStrokeColor : '#FFFFFF',
                fontFill        : 'none',
                color: "#000000"
            }
        };
        networkTSP = new vis.Network(container, data, options);

        var container = document.getElementById('visualizationVC');
        var data = {
            nodes: nodesVC,
            edges: edgesVC
        };
        var options = {
            stabilize:true,
            edges : {
                fontStrokeWidth : 1,
                fontStrokeColor : '#d1d1d1',
                fontFill        : 'none'
            }
        };
        networkVC = new vis.Network(container, data, options);

        var container = document.getElementById('visualizationKB');
        var data = {
            nodes: nodesKB,
            edges: edgesKB
        };
        var options = {
            stabilize:true,
            edges : {
                fontStrokeWidth : 1,
                fontStrokeColor : '#d1d1d1',
                fontFill        : 'none'
            }
        };
        networkKB = new vis.Network(container, data, options);

        var container = document.getElementById('visualizationCli');
        var data = {
            nodes: nodesCli,
            edges: edgesCli
        };
        var options = {
            stabilize:true,
            edges : {
                fontStrokeWidth : 1,
                fontStrokeColor : '#d1d1d1',
                fontFill        : 'none'
            }
        };
        networkCli = new vis.Network(container, data, options);

        // add event listeners
        networkTSP.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });

        networkVC.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });
        networkKB.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });
        networkCli.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });

});


Template.main.onDestroyed(function () {
});
