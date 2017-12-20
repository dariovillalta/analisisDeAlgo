import './main.html';

var networkTSP, nodesTSP, edgesTSP;
var networkVC, nodesVC, edgesVC;
var networkKC, nodesKC, edgesKC, nodesDataSetKC;
var networkCli, nodesCli, edgesCli, clique = [];
var totalPathCost, bandera = 0, seconds, recorrido = [];
var timerDepen = new Tracker.Dependency();
var recorridoDepen = new Tracker.Dependency();
var totalDepen = new Tracker.Dependency();

Template.main.helpers({
    tiempo(){
        timerDepen.depend();
        return seconds;
    },
    recorrido(){
        recorridoDepen.depend();
        return recorrido;
    },
    total(){
        totalDepen.depend();
        return total;
    }
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

function getEdgesOfNodeVC(nodeId) {
    return edgesVC.filter(function (edge) {
        return edge.from === nodeId || edge.to === nodeId;
    });
}

function getEdgesOfNodeKC(nodeId) {
    return edgesKC.filter(function (edge) {
        return edge.from === nodeId || edge.to === nodeId;
    });
}

function getEdgesOfNodeCli(Vertices, nodeId) {
    var nodoIDBefore = edgesCli.filter(function (edge) {
        return edge.from === nodeId || edge.to === nodeId;
    });
    var nodoIDAfter = [];
    for (var j = 0; j < Vertices.length; j++) {
        for (var i = 0; i < nodoIDBefore.length; i++) {
            /*console.log('>>>>>>>>>>');
            console.log(nodoIDBefore[i]);
            console.log("nodeId = "+nodeId);
            console.log(Vertices[j]);
            console.log(nodoIDBefore[i].from == nodeId);
            console.log(Vertices[j] == nodoIDBefore[i].to);
            console.log(nodoIDBefore[i].to != nodeId);
            console.log('>>>');
            console.log(Vertices[j] == nodoIDBefore[i].from);
            console.log(nodoIDBefore[i].from != nodeId);
            console.log('>>>>>>>>>>');*/
            if(nodoIDBefore[i].from == nodeId && Vertices[j] == nodoIDBefore[i].to && nodoIDBefore[i].to != nodeId)
                nodoIDAfter.push(nodoIDBefore[i].to);
            else if(Vertices[j] == nodoIDBefore[i].from && nodoIDBefore[i].from != nodeId)
                nodoIDAfter.push(nodoIDBefore[i].from);
        };
    };
    /*console.log('----->');
    console.log('nodeId = '+nodeId);
    console.log('Vertices');
    console.log(Vertices);
    console.log('nodoIDBefore');
    console.log(nodoIDBefore);
    console.log('nodoIDAfter');
    console.log(nodoIDAfter);
    console.log('----->');*/
    return nodoIDAfter;
}

function BronKerbosch1(maxClique, Vertices, ningunVertice) { // R, P, X
    bandera++;
    //console.log('Sumado bandera = '+bandera);
    /*console.log(bandera);
    console.log('//////////');*/
    console.log('//////////');
    console.log('R = ');
    console.log(maxClique);
    console.log('P = ');
    console.log(Vertices);
    console.log('X = ');
    console.log(ningunVertice);
    console.log('//////////');
    /*if(bandera == 10)
        return;*/
    if(Vertices.length == 0 && ningunVertice.length == 0){
        console.log('---->');
        console.log(maxClique);
        console.log(Vertices);
        console.log(ningunVertice);
        console.log('---->');
        clique.push(maxClique);
        //return maxClique;
    }
    for (var i = 0; i < Vertices.length; i++) {
        /*console.log('Nodos Hermanos de i = '+Vertices[i]);
        console.log(VerticesCopia);
        console.log(edgesCli);*/
        /*console.log('\t');
        console.log('nodo = '+Vertices[i]+ '    i = '+i);
        console.log('Vertices.length = '+Vertices.length);
        console.log('P = ');
        console.log(Vertices);
        console.log(maxClique);
        console.log('\tclique');*/
        /*console.log('---->');
        console.log('R = ');
        console.log(maxClique);
        console.log(maxClique.concat(Vertices[i]));
        console.log('P = ');
        console.log(Vertices);
        console.log(getEdgesOfNodeCli(Vertices, Vertices[i]));
        console.log('X = ');
        console.log(ningunVertice);
        console.log(getEdgesOfNodeCli(ningunVertice, Vertices[i]));
        console.log('---->');*/
        BronKerbosch1(maxClique.concat(Vertices[i]), getEdgesOfNodeCli(Vertices, Vertices[i]), getEdgesOfNodeCli(ningunVertice, Vertices[i]));
        bandera--;
        //console.log('Restado bandera = '+bandera);
        /*console.log('antes');
        console.log(Vertices);*/
        //ningunVertice = ningunVerticeCopia;
        ningunVertice.push(Vertices[i]);
        for (var j = 0; j < Vertices.length; j++) {
            if(Vertices[j] == Vertices[i]){
                Vertices.splice(j, 1);
            }
        };
        /*console.log('despues');
        console.log(Vertices);*/
        /*for (var j = 0; j < maxClique.length; j++) {
            if(maxClique[j] == Vertices[i])
                maxClique.splice(j, 1);
        };*/
        /*console.log('fin');
        console.log('R = ');
        console.log(maxClique);*/
        /*console.log('nodo = '+Vertices[i]+ '    i = '+i);
        console.log('Vertices.length = '+Vertices.length);
        console.log('P = ');
        console.log(Vertices);
        console.log(maxClique);*/
        /*console.log(maxClique);
        console.log(Vertices);
        console.log(ningunVertice);
        console.log('---->');
        console.log('R = ');
        console.log(maxCliqueCopia);
        console.log('P = ');
        console.log(VerticesCopia);
        console.log('X = ');
        console.log(ningunVerticeCopia);
        console.log('---->');
        console.log('END= '+node+ '    i = '+i+' Vertices.length = '+Vertices.length);
        console.log('//////////');*/
        console.log('fin for = '+ i + ' bandera = '+bandera);
    };
    /*console.log('//////////');
    console.log('END');
    console.log('R = ');
    console.log(maxClique);
    console.log('P = ');
    console.log(Vertices);
    console.log('X = ');
    console.log(ningunVertice);
    console.log('END');
    console.log('//////////');*/
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
        $("#myModal").modal('toggle');
        var startDate = new Date();
        var currentNode = 0;
        var visitedNodes = [];
        var unvisitedNodes = [];
        totalPathCost = 0;
        //llenando nodos no visitados
        for (var i = 0; i < nodesTSP.length; i++) {
            unvisitedNodes.push(nodesTSP[i].id);
        };
        //Mientras no se hayan visitados todos los nodos
        while(visitedNodes.length != nodesTSP.length){
            visitedNodes.push(currentNode);
            var arr = $.map(networkTSP.edges, function(value, index) {
                return [value];
            });
            for (var i = 0; i < unvisitedNodes.length; i++) {
                if(unvisitedNodes[i] == currentNode){
                    unvisitedNodes.splice(i, 1);
                    break;
                }
            };
            var edges = getEdgesOfNodeTSP(currentNode);
            for (var i = 0; i < visitedNodes.length; i++) {
                for (var j = 0; j < edges.length; j++) {
                    if((visitedNodes[i] == edges[j].to && currentNode != edges[j].to) || (visitedNodes[i] == edges[j].from && currentNode != edges[j].from))
                        edges.splice(j,1);
                };
            };
            currentNode = shortestDistanceFromNode(edges, currentNode);
        }
        console.log(visitedNodes);
        console.log(totalPathCost);
        var endDate = new Date();
        seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        console.log(seconds);
        recorrido = visitedNodes;
        total = totalPathCost;
        timerDepen.changed();
        totalDepen.changed();
        recorridoDepen.changed();
    },
    'click #recorrerVC'(e){
        var startDate = new Date();
        $("#myModal").modal('toggle');
        var currentNode = 0;
        var visitedNodes = [];
        var visitedNodesPath = [];
        totalPathCost = 0;
        //llenando nodos de posiciones en falso
        for (var i = 0; i < nodesVC.length; i++) {
            visitedNodes.push(false);
        };
        //Verificar todos los nodos
        for (var i = 0; i < nodesVC.length; i++) {
            if(visitedNodes[i] == false){
                var verticesAdjuntos = getEdgesOfNodeVC(i);
                for (var j = 0; j < verticesAdjuntos.length; j++) {
                    var yaExisteRelacion = visitedNodesPath.filter(function (edge) {
                        return edge === i;
                    });
                    if(verticesAdjuntos[j].to == i && yaExisteRelacion.length == 0){
                        if(visitedNodes[verticesAdjuntos[j].from] == false){
                            visitedNodes[verticesAdjuntos[j].from] = true;
                            visitedNodes[i] = true;
                            visitedNodesPath.push(i);
                            visitedNodesPath.push(verticesAdjuntos[j].from);
                        }
                    } else if(verticesAdjuntos[j].from == i && yaExisteRelacion.length == 0){
                        if(visitedNodes[verticesAdjuntos[j].to] == false){
                            visitedNodes[verticesAdjuntos[j].to] = true;
                            visitedNodes[i] = true;
                            visitedNodesPath.push(i);
                            visitedNodesPath.push(verticesAdjuntos[j].to);
                        }
                    }
                };
            }
        };
        var endDate = new Date();
        seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        console.log(seconds);
        for (var i = 0; i < visitedNodes.length; i++) {
            if(visitedNodes[i])
                console.log(i);
        };
        console.log('Nodos Visitados = ');
        console.log(visitedNodesPath);
        console.log('Cantidad mínima de vértices = '+ visitedNodesPath.length);
        recorrido = visitedNodesPath;
        total = visitedNodesPath.length;
        timerDepen.changed();
        totalDepen.changed();
        recorridoDepen.changed();

    },
    'click #recorrerKC'(e){
        var startDate = new Date();
        $("#myModal").modal('toggle');
        var currentNode = 0;
        var resultNodes = [];
        var disponibles = [];
        var cantidadColores = 8;
        var arregloColoresFondo = ['#e57373','#8c9eff','#c8e6c9','#b3e5fc','#f48fb1','#ce93d8','#2196f3','#80deea','#dcedc8','#cddc39','#512da8','#80cbc4','#fff9c4','#f57c00','#bcaaa4'];
        var arregloColoresBorde = ['#f44336','#283593','#66bb6a','#03a9f4','#ec407a','#ab47bc','#1976d2','#4dd0e1','#9ccc65','#afb42b','#311b92','#26a69a','#ffeb3b','#e65100','#8d6e63'];
        //Asignando primer color
        for (var i = 0; i < nodesKC.length; i++) {
            if(i == 0)
                resultNodes.push(0);
            else
                resultNodes.push(-1);
        };
        //Colores Disponibles
        for (var i = 0; i < nodesKC.length; i++) {
            disponibles.push(false);
        };
        //Asignando al resto de vertices
        for (var i = 1; i < nodesKC.length; i++) {
            var verticesAdjuntos = getEdgesOfNodeKC(i);
            for (var j = 0; j < verticesAdjuntos.length; j++) {
                if(resultNodes[verticesAdjuntos[j].from] != -1 && verticesAdjuntos[j].from != i){
                    disponibles[verticesAdjuntos[j].from] = true;
                }
                else if(resultNodes[verticesAdjuntos[j].to] != -1 && verticesAdjuntos[j].to != i){
                    disponibles[verticesAdjuntos[j].to] = true;
                }
            }
            var colorDisponible;
            for (colorDisponible = 0; colorDisponible < nodesKC.length; colorDisponible++){
                if (disponibles[colorDisponible] == false)
                    break;
            }
            resultNodes[i] = colorDisponible;

            //Reseteando valores para siguiente iteracion
            verticesAdjuntos = getEdgesOfNodeKC(i);
            for (var j = 0; j < verticesAdjuntos.length; j++) {
                if(resultNodes[verticesAdjuntos[j].from] != -1){
                    disponibles[verticesAdjuntos[j].from] = false;
                }
                else if(resultNodes[verticesAdjuntos[j].to] != -1){
                    disponibles[verticesAdjuntos[j].to] = false;
                }
            }
        };

        //nodesDataSetKC = new vis.DataSet(nodesKC);
        for (var i = 0; i < nodesKC.length; i++) {
            var currentnode = nodesDataSetKC.get(i);
            currentnode.color = {
                border: arregloColoresBorde[i],
                background: arregloColoresFondo[i]
            }
            nodesDataSetKC.update(currentnode);
        };
        var endDate = new Date();
        seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        console.log(seconds);
        for (var i = 0; i < nodesKC.length; i++) {
            recorrido.push(nodesKC[i].id);
        };
        total = 0;
        timerDepen.changed();
        totalDepen.changed();
        recorridoDepen.changed();
        console.log(disponibles);
        console.log('Nodos Visitados = ');
        console.log(nodesKC);
    },
    'click #recorrerClique'(e){
        clique = [];
        var startDate = new Date();
        $("#myModal").modal('toggle');

        var R = [];
        var X = [];
        var nodosIDArray = [];
        //nodesDataSetKC = new vis.DataSet(nodesKC);
        for (var i = 0; i < nodesCli.length; i++) {
            nodosIDArray.push(nodesCli[i].id);
        };
        /*console.log(R);
        console.log(nodosIDArray);
        console.log(X);*/
        //console.log('///////////');
        console.log(BronKerbosch1(R, nodosIDArray, X));
        var endDate = new Date();
        seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        console.log(seconds);
        recorrido = clique;
        total = clique[0].length;
        timerDepen.changed();
        totalDepen.changed();
        recorridoDepen.changed();
        console.log('clique');
        console.log(clique);
        var temp;
        for (var i = 0; i < clique.length; i++) {
            if (i ==0)
                temp = clique[i].length;
            if(temp < clique[i].length)
                temp = clique[i].length;
        };
        clique = clique[temp];
    }
});

Template.main.onCreated(function () {
});

Template.main.onRendered(function () {
        nodesTSP = [];
        edgesTSP = [];
        nodesVC = [];
        edgesVC = [];
        nodesKC = [];
        edgesKC = [];
        nodesCli = [];
        edgesCli = [];
        nodesDataSetKC =  new vis.DataSet();

        var connectionCount = [];
        var connectionCountVC = [];
        var connectionCountKB = [];
        var connectionCountCli = [];

        // randomly create some nodes and edges
        //var nodeCount = document.getElementById('nodeCount').value;

        var nodeCount = 10; //TSP
        var nodeCount2 = 6; //Vertex Cover
        var nodeCount3 = 8; //K-coloreabilidad
        var nodeCount4 = 10; //Clique
        for (var i = 0; i < nodeCount; i++) {
            nodesTSP.push({
                id: i,
                label: String(i)
            });
            connectionCount[i] = 0;
        }

        /*for (var i = 0; i < nodeCount2; i++) {
            nodesVC.push({
                id: i,
                label: String(i)
            });
            connectionCountVC[i] = 0;
        }*/

        /*for (var i = 0; i < nodeCount3; i++) {
            nodesKC.push({
                id: i,
                label: String(i)
            });
            connectionCountKB[i] = 0;
        }*/

        /*for (var i = 0; i < nodeCount4; i++) {
            nodesCli.push({
                id: i,
                label: String(i)
            });
            connectionCountCli[i] = 0;
        }*/


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

        /*for (var i = 0; i < nodesVC.length; i++) {
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
        }*/

        /*for (var i = 0; i < nodesKC.length; i++) {
            for (var j = 0; j < nodesKC.length; j++) {
                var edgeVerfifiacion1 = {from: i, to: j};
                var edgeVerfifiacion2 = {from: j, to: i};
                var foundEdgeVerfifiacion = edgesKC.filter(function( edge ) {
                    return (edge.from == edgeVerfifiacion1.from && edge.to == edgeVerfifiacion1.to) || (edge.from == edgeVerfifiacion2.from && edge.to == edgeVerfifiacion2.to);
                });
                if(nodesKC[i] != nodesKC[j] && foundEdgeVerfifiacion.length == 0 ){
                    var from = i;
                    var to = j;
                    //console.log('from = ' + i + ' to = ' + j);
                    var conn = edgesKC.length * 2;
                    var rand = Math.floor(Math.random() * conn);
                    edgesKC.push({
                        from: from,
                        to: to,
                        value: rand,
                        label: rand
                    });
                    connectionCountKB[from]++;
                    connectionCountKB[to]++;
                }
            }
        }*/

        /*for (var i = 0; i < nodesCli.length; i++) {
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
        }*/

        /********* VERTEX GRAPH *********/

        for (var i = 0; i < nodeCount2; i++) {
            nodesVC.push({
                id: i,
                label: String(i)
            });

            connectionCountVC[i] = 0;

            // create edges in a scale-free-network way
            if (i == 1) {
                var from = i;
                var to = 0;
                var conn = nodeCount2 * 2;
                var rand = Math.floor(Math.random() * conn);
                edgesVC.push({
                    from: from,
                    to: to,
                    value: rand
                });
                connectionCountVC[from]++;
                connectionCountVC[to]++;
            }
            else if (i > 1) {
                var conn = edgesVC.length * 2;
                var rand = Math.floor(Math.random() * conn);
                var cum = 0;
                var j = 0;
                while (j < connectionCountVC.length && cum < rand) {
                    cum += connectionCountVC[j];
                    j++;
                }


                var from = i;
                var to = j;
                edgesVC.push({
                    from: from,
                    to: to,
                    value: 3
                });
                connectionCountVC[from]++;
                connectionCountVC[to]++;
            }
        }

        /********* AGREGANDO NODOS ALEATORIOS EXTRAS *********/
        var randSize = Math.floor(Math.random() * nodeCount2);
        var randStart = Math.floor(Math.random() * randSize);
        for (var i = randStart; i < nodeCount2; i++) {
            // create edges in a scale-free-network way
            var conn = edgesVC.length * 2;
            var rand = Math.floor(Math.random() * conn);
            var cum = 0;
            var j = 0;
            while (j < connectionCountVC.length && cum < rand) {
                cum += connectionCountVC[j];
                j++;
            }

            var existeRelacion = edgesVC.filter(function (edge) {
                return (i == edge.to && j == edge.from) || (i == edge.from && j == edge.to);
            });
            if(existeRelacion.length == 0 && i != j){
                var from = i;
                var to = j;
                var conn = edgesVC.length * 2;
                var randValue = Math.floor(Math.random() * conn);
                edgesVC.push({
                    from: from,
                    to: to,
                    value: randValue
                });
                connectionCountVC[from]++;
                connectionCountVC[to]++;
            }
        }

        /********* FIN VERTEX GRAPH *********/

        /********* COLOREABILIDAD GRAPH *********/

        for (var i = 0; i < nodeCount3; i++) {
            nodesKC.push({
                id: i,
                label: String(i)
            });
            nodesDataSetKC.add({
                id: i,
                label: String(i)
            });

            connectionCountKB[i] = 0;

            // create edges in a scale-free-network way
            if (i == 1) {
                var from = i;
                var to = 0;
                var conn = nodeCount3 * 2;
                var rand = Math.floor(Math.random() * conn);
                edgesKC.push({
                    from: from,
                    to: to,
                    value: rand
                });
                connectionCountKB[from]++;
                connectionCountKB[to]++;
            }
            else if (i > 1) {
                var conn = edgesKC.length * 2;
                var rand = Math.floor(Math.random() * conn);
                var cum = 0;
                var j = 0;
                while (j < connectionCountKB.length && cum < rand) {
                    cum += connectionCountKB[j];
                    j++;
                }


                var from = i;
                var to = j;
                edgesKC.push({
                    from: from,
                    to: to,
                    value: 3
                });
                connectionCountKB[from]++;
                connectionCountKB[to]++;
            }
        }

        /********* AGREGANDO NODOS ALEATORIOS EXTRAS *********/
        var randSize1 = Math.floor(Math.random() * nodeCount3);
        var randStart1 = Math.floor(Math.random() * randSize1);
        for (var i = randStart1; i < nodeCount3; i++) {
            // create edges in a scale-free-network way
            var conn = edgesKC.length * 2;
            var rand = Math.floor(Math.random() * conn);
            var cum = 0;
            var j = 0;
            while (j < connectionCountKB.length && cum < rand) {
                cum += connectionCountKB[j];
                j++;
            }

            var existeRelacion = edgesKC.filter(function (edge) {
                return (i == edge.to && j == edge.from) || (i == edge.from && j == edge.to);
            });
            if(existeRelacion.length == 0 && i != j){
                var from = i;
                var to = j;
                var conn = edgesKC.length * 2;
                var randValue = Math.floor(Math.random() * conn);
                edgesKC.push({
                    from: from,
                    to: to,
                    value: randValue
                });
                connectionCountKB[from]++;
                connectionCountKB[to]++;
            }
        }

        /********* FIN COLOREABILIDAD GRAPH *********/

        /********* CLIQUE GRAPH *********/

        for (var i = 0; i < nodeCount4; i++) {
            nodesCli.push({
                id: i,
                label: String(i)
            });

            connectionCountCli[i] = 0;

            // create edges in a scale-free-network way
            if (i == 1) {
                var from = i;
                var to = 0;
                var conn = nodeCount2 * 2;
                var rand = Math.floor(Math.random() * conn);
                edgesCli.push({
                    from: from,
                    to: to,
                    value: rand
                });
                connectionCountCli[from]++;
                connectionCountCli[to]++;
            }
            else if (i > 1) {
                var conn = edgesCli.length * 2;
                var rand = Math.floor(Math.random() * conn);
                var cum = 0;
                var j = 0;
                while (j < connectionCountCli.length && cum < rand) {
                    cum += connectionCountCli[j];
                    j++;
                }


                var from = i;
                var to = j;
                edgesCli.push({
                    from: from,
                    to: to,
                    value: 3
                });
                connectionCountCli[from]++;
                connectionCountCli[to]++;
            }
        }

        /********* AGREGANDO NODOS ALEATORIOS EXTRAS *********/
        var randSize2 = Math.floor(Math.random() * nodeCount4);
        var randStart2 = Math.floor(Math.random() * randSize2);
        for (var i = randStart2; i < nodeCount4; i++) {
            // create edges in a scale-free-network way
            var conn = edgesCli.length * 2;
            var rand = Math.floor(Math.random() * conn);
            var cum = 0;
            var j = 0;
            while (j < connectionCountCli.length && cum < rand) {
                cum += connectionCountCli[j];
                j++;
            }

            var existeRelacion = edgesCli.filter(function (edge) {
                return (i == edge.to && j == edge.from) || (i == edge.from && j == edge.to);
            });
            if(existeRelacion.length == 0 && i != j){
                var from = i;
                var to = j;
                var conn = edgesCli.length * 2;
                var randValue = Math.floor(Math.random() * conn);
                edgesCli.push({
                    from: from,
                    to: to,
                    value: randValue
                });
                connectionCountCli[from]++;
                connectionCountCli[to]++;
            }
        }
        edgesCli.push({from: 0, to: 1, value: 1});
        edgesCli.push({from: 0, to: 2, value: 1});
        edgesCli.push({from: 0, to: 3, value: 1});
        edgesCli.push({from: 1, to: 2, value: 1});
        edgesCli.push({from: 1, to: 3, value: 1});
        edgesCli.push({from: 2, to: 3, value: 1});
        /*nodesCli.push({id: 1, label: String(1)});
        nodesCli.push({id: 2, label: String(2)});
        nodesCli.push({id: 3, label: String(3)});
        nodesCli.push({id: 4, label: String(4)});

        edgesCli.push({from: 1, to: 2, value: 1});
        edgesCli.push({from: 1, to: 3, value: 1});
        edgesCli.push({from: 2, to: 3, value: 1});
        edgesCli.push({from: 2, to: 4, value: 1});
        console.log(edgesCli);*/

        /********* FIN CLIQUE GRAPH *********/


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
            nodes: nodesDataSetKC,
            edges: edgesKC
        };
        var options = {
            stabilize:true,
            edges : {
                fontStrokeWidth : 1,
                fontStrokeColor : '#d1d1d1',
                fontFill        : 'none'
            }
        };
        networkKC = new vis.Network(container, data, options);

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
        networkKC.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });
        networkCli.on('select', function(params) {
            document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        });

});


Template.main.onDestroyed(function () {
});
