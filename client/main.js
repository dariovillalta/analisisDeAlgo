import './main.html';

var networkTSP, nodesTSP, edgesTSP;
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
        var connectionCount = [];

        // randomly create some nodes and edges
        //var nodeCount = document.getElementById('nodeCount').value;
        var nodeCount = 10;
        for (var i = 0; i < nodeCount; i++) {
            nodesTSP.push({
                id: i,
                label: String(i)
            });

            connectionCount[i] = 0;

            // create edges in a scale-free-network way
            /*if (i == 1) {
                var from = i;
                var to = 0;
                edgesTSP.push({
                    from: from,
                    to: to,
                    value: 3
                });
                connectionCount[from]++;
                connectionCount[to]++;
            }
            else if (i > 1) {
                var conn = edgesTSP.length * 2;
                var rand = Math.floor(Math.random() * conn);
                var cum = 0;
                var j = 0;
                while (j < connectionCount.length && cum < rand) {
                    cum += connectionCount[j];
                    j++;
                }


                var from = i;
                var to = j;
                edgesTSP.push({
                    from: from,
                    to: to,
                    value: 3
                });
                connectionCount[from]++;
                connectionCount[to]++;
            }*/
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
                fontStrokeColor : '#d1d1d1',
                fontFill        : 'none'
            }
        };
        networkTSP = new vis.Network(container, data, options);

        // add event listeners
        networkTSP.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });
        /*networkTSP.on('stabilized', function (params) {
            document.getElementById('stabilization').innerHTML = 'Stabilization took ' + params.iterations + ' iterations.';
        });
        networkTSP.on('startStabilization', function (params) {
            document.getElementById('stabilization').innerHTML = 'Stabilizing...';
        });*/
});

Template.main.onDestroyed(function () {
});

