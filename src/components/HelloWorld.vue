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
        let rect = new window.joint.shapes.standard.Rectangle();
        let nodeExists = false;
        rect.position(index * 200 + 100, (index + 1) * 100);
        rect.resize(100, 40);
        rect.attr({
          body: {
            fill: 'blue'
          },
          label: {
            text: start,
              fill: 'white'
          }
        });
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

        let link = new window.joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
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
        gridSize: 10,
        drawGrid: true,
        background: {
            color: 'rgba(225, 225, 225, 0.9)'
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
    this.paper.on('element:pointerclick', function(cellView, eventObject, eventX, eventY) {
      console.log('')
    });
    this.graph.on('change:position', function(cell) {
      var center = cell.getBBox().center();
      var label = center.toString();
      cell.attr('label/text', label);
    });
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
