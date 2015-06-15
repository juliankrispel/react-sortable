var React = require('react/addons');
var DragDropList = require('./Sortable.jsx');
window.React = React;

var Demo = React.createClass({
    displayName: 'Demo',

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
        console.log('yo', list);
        this.setState({list:list})
    },

    renderListItems: function(){
        return this.state.list.map(function(item){
            console.log(item);
            return <div>{item.name}</div>;
        });
    },

    render: function(){
        return <DragDropList
            data={this.state.list}
            onSort={this.onSort}>
                {this.renderListItems()}
            </DragDropList>
    }
});

React.render( React.createElement(Demo), document.getElementById('content')
);
