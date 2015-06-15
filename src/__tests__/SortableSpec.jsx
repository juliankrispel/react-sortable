jest.dontMock('../Sortable.jsx');

var React = require('react/addons');
var Sortable = require('../Sortable');
var TestUtils = React.addons.TestUtils;

var Test = React.createClass({
    displayName: 'Test',

    getInitialState: function(){
        return {
            list: [{
                name: 'Paul',
                value: 'Shabang'
            },
            {
                name: 'Fred',
                value: 'Baboom'
            },
            {
                name: 'Russ',
                value: 'Floflo'
            },
            {
                name: 'Jp',
                value: 'Habab'
            }]
        };
    },

    onSort: function(list){
        this.setState({list:list})
    },

    renderListItems: function(){
        return this.state.list.map(function(item){
            return <div>{item.name}</div>;
        });
    },

    render: function(){
        return <Sortable
            data={this.state.list}
            onSort={this.onSort}>
                {this.renderListItems()}
            </Sortable>
    }
});

describe('Sortable Component', function(){
  beforeEach(function(){
    this.component = TestUtils.renderIntoDocument(<Test/>);
  });

  describe('::render', function(){
    it('should render 4 children', function(){
      expect(this.component.getDOMNode().querySelectorAll('li').length).toBe(4);
    });

    it('should set the draggable attribute to true for all children', function(){
      expect(this.component.getDOMNode().querySelectorAll('[draggable="true"]').length).toBe(4);
    });
  });

  describe('::moveItemInArray', function(){
    it('should move an array item from one position to another', function(){
      var exampleArray = [1,2,3,4,5,6];
      var from = 3;
      var to = 1;
      expect(Sortable.prototype.moveItemInArray(from, to, exampleArray)).toEqual([1,4,2,3,5,6]);
    });
  });

  describe('::onDragEnd', function(){
    it('should fire moveItemIntoArray with the right arguments', function(){
      spyOn(this.component.prototype, 'onDragEnd');
      items = this.component.getDOMNode().querySelectorAll('li')
      TestUtils.Simulate.dragStart items[1]

    });
  });
});
