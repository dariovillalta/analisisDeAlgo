import './main.html';

var networkTSP, nodesTSP, edgesTSP;

Template.main.helpers({
});

function loadReservacionesArreglo() {
}

Template.main.events({
    'click #recorrerTSP'(e){
        //
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

