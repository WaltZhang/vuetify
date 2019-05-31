<template>
  <div class="hello">
    <div id="joint" style="width: 100%; height: 500px; overflow: scroll;"></div>
    <div id="attributes"></div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'HelloWorld',
  data() {
    return {
      graph: new window.joint.dia.Graph,
      paper: null,
      graphData: {
        "ds3": {"next": "union1", "props": []},
        "ds1": {"next": "merge1", "props": []},
        "ds2": {"next": "translate1", "props": []},
        "translate1": {"next": "merge1", "props": []},
        "merge1": {"next": "filter1", "props": []},
        "filter1": {"next": "union1", "props": []},
        "union1": {"next": "output1", "props": []}
      }
    }
  },
  methods: {
    draw() {
      let index = 0;
      for (let start in this.graphData) {
        let allElements = this.graph.getElements();
        let rect = new window.joint.shapes.standard.Rectangle({
          position: { x: index * 200 + 100, y: (index + 1) * 100 },
          size: { width: 100, height: 40 },
          // attrs: { body: { fill: 'blue' }, label: { text: start, fill: 'white'} },
          attrs: { label: { text: start } },
          props: {}
        });
        let nodeExists = false;
        for (let element of allElements) {
          if (start === element.attributes.attrs.label.text) {
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
        rect2.attr('label/text', this.graphData[start][0]);
        for (let element of allElements) {
          if (this.graphData[start][0] === element.attributes.attrs.label.text) {
            rect2 = element;
            nodeExists = true;
            break;
          }
        }
        if (!nodeExists) {
          rect2.addTo(this.graph);
        }

        let link = new window.joint.shapes.uml.Transition();
        link.source(rect);
        link.target(rect2);
        // link.attr({
        //   '.uml-state-body': {
        //     fill: 'rgba(48, 208, 198, 0.1)',
        //     stroke: 'rgba(48, 208, 198, 0.5)',
        //     'stroke-width': 1.5
        //   },
        //   '.uml-state-separator': {
        //     stroke: 'rgba(48, 208, 198, 0.4)'
        //   }
        // });
        link.addTo(this.graph);
        index++;
      }
    },
    generateGraphData() {

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
      // defaultLink: new window.joint.dia.Link({
      //   attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
      // }),
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
      console.log(this.model.toJSON());
    });

    this.paper.on('element:pointerclick', function(view, event, x, y) {
      let link = new window.joint.shapes.uml.Transition({
        fill: 'rgba(48, 208, 198, 0.1)',
        source: { id: view.model.id },
        target: { x: x + 100, y: y + 100 }
      });
      link.addTo(this.model);
      let attributes = $('#attributes');
      attributes.delegate('button', 'click', () => $('#attrs').hide());
      attributes.empty().append('<div id="attrs"><input type=text><button>update</button></div>');
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
