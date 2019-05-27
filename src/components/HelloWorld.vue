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
      graph: new this.$joint.dia.Graph,
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
      let activityElements = [];

      for (let start in this.graphData) {
        this.graph.getElements().forEach(elem => {
            let textVal = elem.attributes.attrs.text.text;
            let rect = new this.$joint.shapes.standard.Rectangle();
            if (textVal !== undefined && textVal === 'Activity') {
              rect = elem;
            } else {
              rect.position(index * 200 + 100, 30);
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
              rect.addTo(this.graph);
            }
        });

        let rect = new this.$joint.shapes.standard.Rectangle();
        rect.position(index * 200 + 100, 30);
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
        rect.addTo(this.graph);
        let rect2 = rect.clone();
        rect2.translate(200, 0);
        rect2.attr('label/text', this.graphData[start][0])
        rect2.addTo(this.graph);

        let link = new this.$joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(this.graph);

        index++;
      }
    }
  },
  mounted() {
    new this.$joint.dia.Paper({
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
    // let rect = new this.$joint.shapes.standard.Rectangle();
    // rect.position(100, 30);
    // rect.resize(100, 40);
    // rect.attr({
    //     body: {
    //         fill: 'blue'
    //     },
    //     label: {
    //         text: 'Hello',
    //         fill: 'white'
    //     }
    // });
    // rect.addTo(this.graph);

    // let rect2 = new this.$joint.shapes.standard.Rectangle();
    // rect2.position(400, 30);
    // rect2.resize(100, 40);
    // rect2.attr({
    //     body: {
    //         fill: '#2C3E50',
    //         rx: 5,
    //         ry: 5,
    //         strokeWidth: 2
    //     },
    //     label: {
    //         text: 'World!',
    //         fill: '#3498DB',
    //         fontSize: 18,
    //         fontWeight: 'bold',
    //         fontVariant: 'small-caps'
    //     }
    // });
    // rect2.addTo(this.graph);

    // let link = new this.$joint.shapes.standard.Link();
    // link.source(rect);
    // link.target(rect2);
    // link.addTo(this.graph);

    // let rect3 = new this.$joint.shapes.standard.Rectangle();
    // rect3.position(100, 130);
    // rect3.resize(100, 40);
    // rect3.attr({
    //     body: {
    //         fill: '#E74C3C',
    //         rx: 20,
    //         ry: 20,
    //         strokeWidth: 0
    //     },
    //     label: {
    //         text: 'Hello',
    //         fill: '#ECF0F1',
    //         fontSize: 11,
    //         fontVariant: 'small-caps'
    //     }
    // });
    // rect3.addTo(this.graph);

    // let rect4 = new this.$joint.shapes.standard.Rectangle();
    // rect4.position(400, 130);
    // rect4.resize(100, 40);
    // rect4.attr({
    //     body: {
    //         fill: '#8E44AD',
    //         strokeWidth: 0
    //     },
    //     label: {
    //         text: 'World!',
    //         fill: 'white',
    //         fontSize: 13
    //     }
    // });
    // rect4.addTo(this.graph);

    // let link2 = new this.$joint.shapes.standard.Link();
    // link2.source(rect3);
    // link2.target(rect4);
    // link2.addTo(this.graph);

    // let rect5 = new this.$joint.shapes.standard.Rectangle();
    // rect5.position(100, 230);
    // rect5.resize(100, 40);
    // rect5.attr({
    //     body: {
    //         fill: '#2ECC71',
    //         strokeDasharray: '10,2'
    //     },
    //     label: {
    //         text: 'Hello',
    //         fill: 'black',
    //         fontSize: 13
    //     }
    // });
    // rect5.addTo(this.graph);

    // let rect6 = new this.$joint.shapes.standard.Rectangle();
    // rect6.position(400, 230);
    // rect6.resize(100, 40);
    // rect6.attr({
    //     body: {
    //         fill: '#F39C12',
    //         rx: 20,
    //         ry: 20,
    //         strokeDasharray: '1,1'
    //     },
    //     label: {
    //         text: 'World!',
    //         fill: 'gray',
    //         fontSize: 18,
    //         fontWeight: 'bold',
    //         fontVariant: 'small-caps',
    //         textShadow: '1px 1px 1px black'
    //     }
    // });
    // rect6.addTo(this.graph);

    // let link3 = new this.$joint.shapes.standard.Link();
    // link3.source(rect5);
    // link3.target(rect6);
    // link3.addTo(this.graph);
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
