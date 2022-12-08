import { UnrealBloomPass } from 'https://unpkg.com/three@0.118.1/examples/jsm/postprocessing/UnrealBloomPass.js'
const deg2rad = deg => { return deg * Math.PI / 180; };
const N = 500;
const nodes = [...Array(N).keys()].map(i => {
    return {
        id: i,
        val: (Math.random() * 1.25) + 1
    };
});

function generateLinks(nodes) {
    let links = [];
    nodes.forEach(node => {
        let numNodeLinks = Math.round(Math.random() * (0.5 + Math.random())) + 1;
        for(let i = 0; i < numNodeLinks; i++) {
            links.push({
                source: node.id,
                target: Math.round(Math.random() * (node.id > 0 ? node.id - 1 : node.id))
            });
        }
    });
    return links;
}
const links = generateLinks(nodes);
const gData = {nodes, links};

const distance = 1500;

const graphElem = document.getElementById("3d-graph");

const Graph = ForceGraph3D()(graphElem);
Graph.enableNodeDrag(false);
Graph.enableNavigationControls(false);
Graph.enablePointerInteraction(false);
Graph.showNavInfo(false);

Graph.cameraPosition({ z: distance });

Graph.nodeRelSize(4);
Graph.nodeOpacity(1);

Graph.linkWidth(5);
Graph.linkDirectionalParticles(5);
Graph.linkDirectionalParticleWidth(5);

const bloomPass = new UnrealBloomPass();
bloomPass.strength = 3;
bloomPass.radius = 1;
bloomPass.threshold = 0.5;
Graph.postProcessingComposer().addPass(bloomPass);

Graph.graphData(gData);

let currentAngle = 0;
setInterval(() => {
    Graph.cameraPosition({
        x: distance * Math.sin(deg2rad(currentAngle)),
        z: distance * Math.cos(deg2rad(currentAngle))
    });

    currentAngle += 0.5;
}, 10);

window.addEventListener('resize', () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    Graph.width(width);
    Graph.height(height);
    Graph.refresh();
});

function onClick(e) {
    e.preventDefault();

    const links = generateLinks(nodes);
    const gData = {nodes, links};
    Graph.graphData(gData);
}

window.addEventListener('click', onClick, false);
window.addEventListener('touchstart', onClick, false);