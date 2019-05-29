<template>
  <div class="hello">
    <div id="joint" style="width: 100%; height: 500px; overflow: scroll;"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      graph: new window.joint.dia.Graph,
      paper: null,
      graphData: {
        "ds3": ["union1"],
        "ds1": ["merge1"],
        "ds2": ["translate1"],
        "translate1": ["merge1"],
        "merge1": ["filter1"],
        "filter1": ["union1"],
        "union1": ["output1"]
      }
    }
  },
  methods: {
    draw() {
      let index = 0;
      for (let start in this.graphData) {
        let allElements = this.graph.getElements();
        let rect = new window.joint.shapes.devs.Model({
          position: { x: index * 200 + 100, y: (index + 1) * 100 },
          size: { width: 100, height: 40 },
          attrs: { rect: { fill: 'blue' }, '.label': { text: start, fill: 'white'} },
          inPorts: ['in1'],
          outPorts: ['out'],
          ports: {
            groups: {
              'in': {
                attrs: {
                  '.port-body': {
                    fill: 'yellow'
                  }
                }
              },
              'out': {
                attrs: {
                  '.port-body': {
                    fill: 'green'
                  }
                }
              }
            }
          }
        });
        let nodeExists = false;
        // rect.position(index * 200 + 100, (index + 1) * 100);
        // rect.resize(100, 40);
        // rect.attr({
        //   body: {
        //     fill: 'blue'
        //   },
        //   label: {
        //     text: start,
        //       fill: 'white'
        //   }
        // });
        for (let element of allElements) {
          if (start === element.attributes.attrs['.label'].text) {
            rect = element;
            nodeExists = true;
            break;
          }
        }
        if (!nodeExists)
          rect.addTo(this.graph);

        nodeExists = false;
        let rect2 = rect.clone();
        rect2.translate(200, 0);
        rect2.attr('.label/text', this.graphData[start][0]);
        for (let element of allElements) {
          if (this.graphData[start][0] === element.attributes.attrs['.label'].text) {
            rect2 = element;
            nodeExists = true;
            break;
          }
        }
        if (!nodeExists) {
          rect2.addTo(this.graph);
        }

        let link = new window.joint.shapes.uml.Transition();
        link.source(rect.outPorts);
        link.target(rect2.inPorts);
        link.attr({
              '.uml-state-body': {
                  fill: 'rgba(48, 208, 198, 0.1)',
                  stroke: 'rgba(48, 208, 198, 0.5)',
                  'stroke-width': 1.5
              },
              '.uml-state-separator': {
                  stroke: 'rgba(48, 208, 198, 0.4)'
              }
          }) 
        link.addTo(this.graph);
        index++;
      }
    }
  },
  mounted() {
    this.paper = new window.joint.dia.Paper({
        el: '#joint',
        model: this.graph,
        width: '100%',
        gridSize: 1,
        drawGrid: true,
        background: {
            color: 'rgba(225, 225, 225, 0.9)'
        },
        defaultLink: new window.joint.dia.Link({
          attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        }),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
          // Prevent linking from input ports.
          if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
          // Prevent linking from output ports to input ports within one element.
          if (cellViewS === cellViewT) return false;
          // Prevent linking to input ports.
          return magnetT && magnetT.getAttribute('port-group') === 'in';
        },
        validateMagnet: function(cellView, magnet) {
          // Note that this is the default behaviour. Just showing it here for reference.
          // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
          return magnet.getAttribute('magnet') !== 'passive';
        }
      });
    this.draw();
    this.paper.on('blank:pointerdblclick', function(eventObject, eventX, eventY) {
      let rect = new window.joint.shapes.standard.Rectangle();
      rect.position(eventX - 50, eventY - 20);
      rect.resize(100, 40);
      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: eventX + '@' + eventY,
          fill: 'white'
        }
      });
      rect.addTo(this.model);
    });

    this.paper.on('element:pointerclick', function(view, event, x, y) {
      let link = new window.joint.shapes.uml.Transition({
        fill: 'rgba(48, 208, 198, 0.1)',
        source: { id: view.model.id },
        target: { x: x + 100, y: y + 100 }
      });
      link.addTo(this.model);
    });
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../node_modules/jointjs/dist/joint.min.css";
</style>
